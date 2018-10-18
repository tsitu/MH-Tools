"use strict";

var popLoaded = 0,
  wisdomLoaded = 0,
  sampleLoaded = 0;
var WISDOM_URL = "data/mouse-wisdom.json";
var SAMPLE_URL =
  "https://raw.githubusercontent.com/tsitu/MH-Tools/gh-pages/data/sample-summary-detailed.json";

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
 * Start population loading
 */
function startPopulationLoad(populationJsonUrl, type) {
  $.getJSON(populationJsonUrl, setPopulation);
  $.getJSON(WISDOM_URL, setWisdom);
  $.getJSON(SAMPLE_URL, setSample);

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
