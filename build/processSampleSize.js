/**
 * > As of Jack's July 3rd 2018 nightly dump <
 * 1089 total LPCC combinations (839 have sample sizes and 250 don't)
 * Total sample size: 24459604
 *
 * Average scores factor in 0's and cap at 100 to prevent outliers
 *  (e.g. from LPCC with one mouse attracted)
 *
 * Sample size score requirement phases
 * Phase 1 (current): Location minimum 0, average >= 15
 * Phase 2: Location minimum 15, average >= 25
 * Phase 3: Location minimum 25, average >= 40
 */

const fs = require("fs");
const fileUtils = require("./modules/fileUtils");
const request = require("request");
const puppeteer = require("puppeteer");

// GitHub-served raw JSON file URLs from gh-pages branch
const overallURL =
  "https://raw.githubusercontent.com/tsitu/MH-Tools/gh-pages/data/sample-summary-overall.json";
const conciseURL =
  "https://raw.githubusercontent.com/tsitu/MH-Tools/gh-pages/data/sample-summary-concise.json";
const detailedURL =
  "https://raw.githubusercontent.com/tsitu/MH-Tools/gh-pages/data/sample-summary-detailed.json";

/**
 * Returns ideal sample size for 10% relative uncertainty at 95% level
 * Formula: n = 4 * z^2 * (1 - p) / (p * x^2)
 * @param {number} p Adjusted empirical AR (e.g. 0.01 for Black Widow)
 * @returns {number}
 */
function AgrestiCoull(p) {
  return Math.ceil(4 * 1.96 * 1.96 * ((1 - p) / (p * 0.1 * 0.1)));
}

/**
 * Returns +/- margin of error at 95% level for a given empirical AR and sample size
 * Formula: z * sqrt(pq/n)
 * @param {number} p Empirical AR
 * @param {number} n Empirical sample size
 * @returns {number}
 */
function MarginOfError(p, n) {
  // 1.96 is z for an alpha of 5%
  return 1.96 * Math.sqrt(p * (1 - p) / n);
}

/**
 * Returns normalized score for combined average raw/relative margin of errors
 * 1. Calculate average raw margin of error
 * 2. Calculate average relative error
 * 3. Average the two averages
 * 4. Divide into 100 to get an inverse normalized result (higher is better)
 * @param {object} obj Input population object (stripped of 'SampleSize' prop)
 * @param {number} sampleSize Number from 'SampleSize' prop
 * @return {number}
 */
function calculateNormalizedMoE(obj, sampleSize) {
  const keys = Object.keys(obj);
  const popNum = keys.length;
  let marginE = 0;
  let relativeE = 0;

  for (let key of keys) {
    const percent = obj[key];
    const moe = MarginOfError(percent / 100, sampleSize) * 100;
    marginE += moe;
    relativeE += moe / percent * 100;
  }

  const averageM = marginE / popNum;
  const averageR = relativeE / popNum;
  const overallAverage = averageM + averageR / 2;

  return +(100 / overallAverage).toFixed(2); // Inverse normalized result
}

/**
 * Returns normalized Agresti-Coull score for current sample size as compared to ideal
 * 1. Calculate average and median empirical ARs for a specific LPCC point
 * 2. (Take average of these two ARs and run thru AC or run AC thru both and average the results)
 * 3. Divide existing sample size by this 'ideal' value and multiply by 25
 * @param {object} obj Input population object (stripped of 'SampleSize' prop)
 * @param {number} sampleSize Number from 'SampleSize' prop
 * @return {number}
 */
function calculateACScore(obj, sampleSize) {
  const keys = Object.keys(obj);
  const popNum = keys.length;

  const sortedArray = [];
  let sum = 0;
  for (let key of keys) {
    sum += obj[key];
    sortedArray.push(obj[key]);
  }
  const averageAR = sum / popNum;

  // Sort from lowest to highest AR first
  sortedArray.sort((a, b) => a - b);

  // Calculate median position based on keys length
  let medianAR;
  if (popNum % 2 === 0) {
    // Average of 2 middles
    medianAR = (sortedArray[popNum / 2] + sortedArray[popNum / 2 - 1]) / 2;
  } else {
    medianAR = sortedArray[(popNum - 1) / 2];
  }

  // Average of average/median
  const averageAM = (averageAR + medianAR) / 200;
  const preIdeal1 = AgrestiCoull(averageAM);

  // AC on both and average results (1.5x greater)
  const preIdeal2 =
    AgrestiCoull(averageAR / 100) + AgrestiCoull(medianAR / 100) / 2;

  // Average both :P
  const idealSize = preIdeal1 + preIdeal2 / 2; // roughly 1.25x preIdeal1

  // Divide existing sample size into calculated 'ideal' and normalize
  return +(sampleSize / idealSize * 25).toFixed(2);
}

/**
 * Assign a rating to the provided score
 * Threshold for acceptance is Decent or >= 15 (for Phase 1 location average)
 * @param {number} score Normalized MoE + AC Score
 * @returns {string} Rating
 */
function scoreLabel(score) {
  let rating = "";

  if (score === 0) {
    rating = "N/A";
  } else if (score < 5) {
    rating = "Very Bad";
  } else if (score < 10) {
    rating = "Bad";
  } else if (score < 15) {
    rating = "Not Good";
  } else if (score < 25) {
    rating = "Decent";
  } else if (score < 50) {
    rating = "Good";
  } else if (score < 75) {
    rating = "Great";
  } else if (score >= 75) {
    rating = "Excellent";
  }

  return rating;
}

// Global scope objects for summary data
const detailedObj = {};
const conciseObj = {};
const overallObj = {};

/**
 * Parse the full population JSON file
 */
function parseJSON() {
  fs.readFile("data/populations-cre.json", "utf8", function(err, data) {
    if (err) throw err;
    let obj = JSON.parse(data);

    let overallSummaryScore = 0;
    for (let location in obj) {
      detailedObj[location] = {};

      for (let phase in obj[location]) {
        for (let cheese in obj[location][phase]) {
          for (let charm in obj[location][phase][cheese]) {
            const point = obj[location][phase][cheese][charm];
            const sampleSize = point["SampleSize"];
            let rawScore = 0;
            let score = 0;
            if (sampleSize) {
              delete point["SampleSize"];
              rawScore = (
                calculateNormalizedMoE(point, sampleSize) +
                calculateACScore(point, sampleSize)
              ).toFixed(2);
              if (rawScore > 100) {
                score = 100; // Capped at 100 to prevent outlier skew
              } else {
                score = rawScore;
              }
            }

            const pcc = `${phase}, ${cheese}, ${charm}`;
            detailedObj[location][pcc] = {};
            detailedObj[location][pcc]["score"] = +score;
            detailedObj[location][pcc]["sample"] = sampleSize ? +sampleSize : 0;
            detailedObj[location][pcc]["count"] = +Object.keys(point).length;
          }
        }
      }

      let conciseAvgScore = 0;
      let conciseAvgSize = 0;
      let conciseAvgMice = 0;

      for (let el in detailedObj[location]) {
        conciseAvgScore += detailedObj[location][el]["score"];
        conciseAvgSize += detailedObj[location][el]["sample"];
        conciseAvgMice += detailedObj[location][el]["count"];
      }

      const locLen = Object.keys(detailedObj[location]).length;
      conciseObj[location] = {};
      conciseObj[location]["Average Score"] = (
        conciseAvgScore / locLen
      ).toFixed(2);
      conciseObj[location]["Location Rating"] = scoreLabel(
        conciseAvgScore / locLen
      );
      conciseObj[location]["Average Sample Size"] = (
        conciseAvgSize / locLen
      ).toFixed(2);
      conciseObj[location]["Average Mice Count"] = (
        conciseAvgMice / locLen
      ).toFixed(2);

      if (conciseAvgScore) overallSummaryScore += conciseAvgScore / locLen;
    }

    const overallSummaryAvg = (
      overallSummaryScore / Object.keys(obj).length
    ).toFixed(2);

    overallObj["score"] = overallSummaryAvg;

    // Next function called to calculate diffs from current data
    calculateDiffs();
  });
}

function processOverall() {
  return new Promise((resolve, reject) => {
    request(overallURL, (error, response, body) => {
      if (error) throw error;
      const obj = JSON.parse(body);

      // Compare overall summary scores
      const currentOverallSS = +obj["score"];
      const incomingOverallSS = +overallObj["score"];

      console.log("----------------------------------------\n");
      console.log(
        `[ Overall Score Change ]\n\n ${currentOverallSS} (${scoreLabel(
          currentOverallSS
        )}) -> ${incomingOverallSS} (${scoreLabel(incomingOverallSS)})\n`
      );
      console.log("----------------------------------------\n");

      resolve();
    });
  });
}

function processLocation() {
  return new Promise((resolve, reject) => {
    request(conciseURL, (error, response, body) => {
      if (error) throw error;
      const obj = JSON.parse(body);
      console.log("[ Changes By Location ]\n");

      // Compare concise summaries
      for (let el in conciseObj) {
        if (!obj[el]) {
          console.log(
            `${el} (New Location)\n  Average Score: ${
              conciseObj[el]["Average Score"]
            }\n  Location Rating: ${
              conciseObj[el]["Location Rating"]
            }\n  Average Sample Size: ${
              conciseObj[el]["Average Sample Size"]
            }\n  Average Mice Count: ${conciseObj[el]["Average Mice Count"]}\n`
          );
        } else if (
          conciseObj[el]["Average Score"] != obj[el]["Average Score"] ||
          conciseObj[el]["Location Rating"] != obj[el]["Location Rating"] ||
          conciseObj[el]["Average Sample Size"] !=
            obj[el]["Average Sample Size"] ||
          conciseObj[el]["Average Mice Count"] != obj[el]["Average Mice Count"]
        ) {
          console.log(
            `${el}\n  Average Score: ${obj[el]["Average Score"]} -> ${
              conciseObj[el]["Average Score"]
            }\n  Location Rating: ${obj[el]["Location Rating"]} -> ${
              conciseObj[el]["Location Rating"]
            }\n  Average Sample Size: ${obj[el]["Average Sample Size"]} -> ${
              conciseObj[el]["Average Sample Size"]
            }\n  Average Mice Count: ${obj[el]["Average Mice Count"]} -> ${
              conciseObj[el]["Average Mice Count"]
            }\n`
          );
        }
      }
      console.log("----------------------------------------\n");

      resolve();
    });
  });
}

function processDetailed() {
  return new Promise((resolve, reject) => {
    request(detailedURL, (error, response, body) => {
      if (error) throw error;
      const obj = JSON.parse(body);
      console.log("[ Changes By Phase/Cheese/Charm ]\n");

      // Compare detailed summaries
      for (let loc in detailedObj) {
        if (!obj[loc]) {
          console.log(`${loc} (New Location)`);
          for (let sub in detailedObj[loc]) {
            console.log(
              `${sub}\n  Score: ${
                detailedObj[loc][sub]["score"]
              }\n  Sample Size: ${
                detailedObj[loc][sub]["sample"]
              }\n  Mouse Count: ${detailedObj[loc][sub]["count"]}`
            );
          }
          console.log("");
        } else {
          for (let sub in detailedObj[loc]) {
            if (!obj[loc][sub]) {
              // Log location every time?
              console.log(
                `${loc}, ${sub} (New PCC)\n  Score: ${
                  detailedObj[loc][sub]["score"]
                }\n  Sample Size: ${
                  detailedObj[loc][sub]["sample"]
                }\n  Mouse Count: ${detailedObj[loc][sub]["count"]}\n`
              );
            } else if (
              detailedObj[loc][sub]["score"] != obj[loc][sub]["score"] ||
              detailedObj[loc][sub]["sample"] != obj[loc][sub]["sample"] ||
              detailedObj[loc][sub]["count"] != obj[loc][sub]["count"]
            ) {
              console.log(
                `${loc}, ${sub}\n  Score: ${obj[loc][sub]["score"]} -> ${
                  detailedObj[loc][sub]["score"]
                }\n  Sample Size: ${obj[loc][sub]["sample"]} -> ${
                  detailedObj[loc][sub]["sample"]
                }\n  Mouse Count: ${obj[loc][sub]["count"]} -> ${
                  detailedObj[loc][sub]["count"]
                }\n`
              );
            }
          }
        }
      }
      console.log("----------------------------------------");

      resolve();
    });
  });
}

/**
 * Handles differences between current and incoming for detailed, concise, and overall summary JSON
 * Consistent console.log ordering by using separate functions and chaining
 */
async function calculateDiffs() {
  // Force update raw JSON files on GitHub using Puppeteer
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    executablePath: "google-chrome-beta"
  });
  const overallPage = await browser.newPage();
  const concisePage = await browser.newPage();
  const detailedPage = await browser.newPage();
  await overallPage.goto(overallURL);
  await concisePage.goto(conciseURL);
  await detailedPage.goto(detailedURL);
  await browser.close();

  await processOverall();
  await processLocation();
  await processDetailed();

  // Finally, output JSON to overwrite the 3 initial files
  outputJSON();
}

/**
 * Write detailed, concise, and overallObj to respective JSON files
 */
function outputJSON() {
  fileUtils.saveJsonFile("data/sample-summary-detailed.json", detailedObj);
  fileUtils.saveJsonFile("data/sample-summary-concise.json", conciseObj, 4);
  fileUtils.saveJsonFile("data/sample-summary-overall.json", overallObj);
}

/**
 * Main IIFE
 */
(() => {
  parseJSON();
})();
