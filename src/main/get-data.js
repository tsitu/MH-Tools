"use strict";

var popLoaded = 0,
  wisdomLoaded = 0,
  sampleLoaded = 0,
  gpLoaded = 0,
  peLoaded = 0;

var WISDOM_URL = "data/json/mouse-wisdom.json";
var SAMPLE_URL =
  "https://raw.githubusercontent.com/tsitu/MH-Tools/gh-pages/data/json/sample-summary-detailed.json";
var GP_URL = "data/json/mouse-gold-points.json";
var PE_URL = "data/json/mouse-power-effs.json";

/**
 * Population data parsed from CSV
 * Object with location - phase - cheese - charm - mouse - pop %
 */
var popArray = {};

/**
 * Mouse wisdom parsed from JSON
 * @type {{mouse: string, wisdom: number}}
 */
var mouseWisdom = {};

/**
 * Detailed sample size summary data fetched from GitHub
 * @type {{location: string, phaseCheeseCharm: string, score: number, sample: number, count: number}}
 */
var sampleSummary = {};

/**
 * Mouse gold and points parsed from JSON
 * @type {{mouse: string, gold: number, points: number}}
 */
var miceArray = {};

/**
 * Mouse power and trap type effs parsed from JSON
 */
var powersArray = {};

/**
 * Start population loading
 */
function startPopulationLoad(populationJsonUrl, type) {
  if (type === "cre" || type === "setup") {
    getJSONWrapper(WISDOM_URL, setWisdom, "Wisdom Values");
    getJSONWrapper(SAMPLE_URL, setSample, "Sample Sizes");
    getJSONWrapper(GP_URL, setGoldPoints, "Gold & Points");
    getJSONWrapper(PE_URL, setPowerEffs, "Powers & Effs");
  }

  if (type === "map" || type === "crown") {
    getJSONWrapper(PE_URL, setPowerEffs, "Powers & Effs");
  }

  getJSONWrapper(populationJsonUrl, setPopulation, "Population Data");

  /**
   * Wrapper for jQuery's getJSON function
   * @param {string} url URL of data file to fetch
   * @param {function} callback Callback function to process JSON
   * @param {string} descriptor Description of requested file for debugging purposes
   */
  function getJSONWrapper(url, callback, descriptor) {
    $.getJSON(url)
      .done(function(data, textStatus, jqxhr) {
        if (textStatus === "success" && jqxhr.status === 200) {
          callback(data);
        } else {
          alert("Generic error while processing JSON data files");
        }
      })
      .fail(function(jqxhr) {
        var alertStr =
          "An HTTP " +
          jqxhr.status +
          " error occured while fetching the JSON file for:\n\n- " +
          descriptor +
          "\n\nThis is likely an error involving the GitHub hosting service. If the tool is not working properly, please wait some time and try again.\n\nMore info: https://www.githubstatus.com";
        alert(alertStr);
      });
  }

  function setPopulation(jsonData) {
    popArray = jsonData;
    popLoaded = true;
    checkLoadState(type);
  }

  function setWisdom(jsonData) {
    mouseWisdom = jsonData;
    wisdomLoaded = true;
    checkLoadState(type);
  }

  function setSample(jsonData) {
    sampleSummary = jsonData;
    sampleLoaded = true;
    checkLoadState(type);
  }

  function setGoldPoints(jsonData) {
    miceArray = jsonData;
    gpLoaded = true;
    checkLoadState(type);
  }

  function setPowerEffs(jsonData) {
    powersArray = jsonData;
    peLoaded = true;
    checkLoadState(type);
  }
}

/**
 * This will parse a delimited string into an array of arrays.
 * The default delimiter is the comma, but this can be overriden in the second argument.
 * @param {string} strData - Delimited string
 * @param {string} [strDelimiter=","] - Delimiter for the string. Default is a comma
 * */
function csvToArray(strData, strDelimiter) {
  strDelimiter = strDelimiter || ",";

  // Create a regular expression to parse the CSV values.
  var objPattern = new RegExp(
    // Delimiters.
    "(\\" +
      strDelimiter +
      "|\\r?\\n|\\r|^)" +
      // Quoted fields.
      '(?:"([^"]*(?:""[^"]*)*)"|' +
      // Standard fields.
      '([^"\\' +
      strDelimiter +
      "\\r\\n]*))",
    "gi"
  );

  // Create an array to hold our data. Give the array
  // a default empty first row.
  var arrData = [[]];

  // Create an array to hold our individual pattern
  // matching groups.
  var arrMatches = null;

  // Keep looping over the regular expression matches
  // until we can no longer find a match.
  while ((arrMatches = objPattern.exec(strData))) {
    // Get the delimiter that was found.
    var strMatchedDelimiter = arrMatches[1];

    // Check to see if the given delimiter has a length
    // (is not the start of string) and if it matches
    // field delimiter. If id does not, then we know
    // that this delimiter is a row delimiter.
    if (strMatchedDelimiter.length && strMatchedDelimiter != strDelimiter) {
      // Since we have reached a new row of data,
      // add an empty row to our data array.
      arrData.push([]);
    }

    // Now that we have our delimiter out of the way,
    // let's check to see which kind of value we
    // captured (quoted or unquoted).
    if (arrMatches[2]) {
      // We found a quoted value. When we capture
      // this value, unescape any double quotes.
      var strMatchedValue = arrMatches[2].replace(new RegExp('""', "g"), '"');
    } else {
      // We found a non-quoted value.
      var strMatchedValue = arrMatches[3];
    }

    // Now that we have our value string, let's add
    // it to the data array.
    arrData[arrData.length - 1].push(strMatchedValue);
  }

  // Return the parsed data.
  return arrData;
}
