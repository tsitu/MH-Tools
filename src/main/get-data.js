"use strict";

var popLoaded = 0,
  wisdomLoaded = 0,
  sampleLoaded = 0,
  gpLoaded = 0,
  peLoaded = 0,
  weaponsLoaded = 0,
  basesLoaded = 0,
  charmsLoaded = 0;

var WISDOM_URL = "data/json/mouse-wisdom.json";
var SAMPLE_URL = "data/json/sample-summary-detailed.json";
var GP_URL = "data/json/mouse-gold-points.json";
var PE_URL = "data/json/mouse-power-effs.json";
var WEAPONS_URL = "data/json/weapons.json";
var BASES_URL = "data/json/bases.json";
var CHARMS_URL = "data/json/charms.json";

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
 * Weapons data parsed from JSON
 */
var weaponsArray = {};
var weaponKeys = [];
var basesArray = {};
var baseKeys = [];
var charmsArray = {};
var charmKeys = [];

/**
 * Start population loading
 * @param {string} populationJsonUrl URL of the population JSON file
 * @param {string} type Type of loading (cre, setup, map, crown)
 * @param {function} [onComplete] Optional callback function called when all data is loaded
 */
async function startPopulationLoad(populationJsonUrl, type, onComplete) {
  const promises = [];

  if (type === "cre" || type === "setup") {
    promises.push(getJSONWrapper(WISDOM_URL, setWisdom, "Wisdom Values"));
    promises.push(getJSONWrapper(SAMPLE_URL, setSample, "Sample Sizes"));
    promises.push(getJSONWrapper(GP_URL, setGoldPoints, "Gold & Points"));
    promises.push(getJSONWrapper(PE_URL, setPowerEffs, "Powers & Effs"));
    promises.push(getJSONWrapper(WEAPONS_URL, setWeapons, "Weapons"));
    promises.push(getJSONWrapper(BASES_URL, setBases, "Bases"));
    promises.push(getJSONWrapper(CHARMS_URL, setCharms, "Charms"));
  }

  if (type === "map" || type === "crown") {
    promises.push(getJSONWrapper(PE_URL, setPowerEffs, "Powers & Effs"));
  }

  promises.push(getJSONWrapper(populationJsonUrl, setPopulation, "Population Data"));

  try {

    await Promise.all(promises);

    if (onComplete) {
      onComplete();
    }

  } catch (error) {
    console.error('Error loading data:', error);
  }

  /**
   * Wrapper for fetch to get JSON data
   * @param {string} url URL of data file to fetch
   * @param {function} callback Callback function to process JSON
   * @param {string} descriptor Description of requested file for debugging purposes
   * @returns {Promise} Promise that resolves when the request completes
   */
  async function getJSONWrapper(url, callback, descriptor) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} error occurred while fetching ${descriptor}`);
      }
      const data = await response.json();
      callback(data);
    } catch (error) {
      var alertStr = "An error occurred while fetching the JSON file for:\n\n- " +
        descriptor +
        "\n\nError: " + error.message +
        "\n\nThis is likely an error involving the GitHub hosting service. If the tool is not working properly, please wait some time and try again.\n\nMore info: https://www.githubstatus.com";
      alert(alertStr);
      throw error; // Re-throw to be caught by the calling code
    }
  }

  function tryCheckLoadState(type) {
    if (typeof checkLoadState !== 'undefined' && typeof checkLoadState === 'function') {
      checkLoadState(type);
    }
  }

  function setPopulation(jsonData) {
    popArray = jsonData;
    popLoaded = true;
    tryCheckLoadState(type);
  }

  function setWisdom(jsonData) {
    mouseWisdom = jsonData;
    wisdomLoaded = true;
    tryCheckLoadState(type);
  }

  function setSample(jsonData) {
    sampleSummary = jsonData;
    sampleLoaded = true;
    tryCheckLoadState(type);
  }

  function setGoldPoints(jsonData) {
    miceArray = jsonData;
    gpLoaded = true;
    tryCheckLoadState(type);
  }

  function setPowerEffs(jsonData) {
    powersArray = jsonData;
    peLoaded = true;
    tryCheckLoadState(type);
  }

  function setWeapons(jsonData) {
    weaponsArray = jsonData;
    weaponKeys = Object.keys(weaponsArray).sort();
    weaponsLoaded = true;
    tryCheckLoadState(type);
  }

  function setBases(jsonData) {
    basesArray = jsonData;
    baseKeys = Object.keys(basesArray).sort();
    basesLoaded = true;
    tryCheckLoadState(type);
  }

  function setCharms(jsonData) {
    charmsArray = jsonData;
    charmKeys = Object.keys(charmsArray).sort();
    charmsLoaded = true;
    tryCheckLoadState(type);
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
