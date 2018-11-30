(function() {
  const POPULATIONS = [
    "data/populations.csv",
    "data/location-pop/bristle-woods-rift.csv",
    "data/location-pop/cantera-quarry.csv",
    "data/location-pop/forbidden-grove.csv",
    "data/location-pop/fort-rox.csv",
    "data/location-pop/furoma-rift.csv",
    "data/location-pop/iceberg.csv",
    "data/location-pop/living-garden.csv",
    "data/location-pop/laboratory.csv",
    "data/location-pop/mousoleum.csv",
    "data/location-pop/moussu-picchu.csv",
    "data/location-pop/prickly-plains.csv",
    "data/location-pop/queso-river.csv",
    "data/location-pop/toxic-spill.csv"
  ];

  const fs = require("fs");
  const csv = require("csvtojson");
  const fileUtils = require("./file-utils");
  const CombinedStream = require("combined-stream");

  var mapPopulations = {};
  var creSetupPopulations = {};

  var csvConverter = csv({
    headers: [
      "location",
      "phase",
      "cheese",
      "charm",
      "attraction",
      "mouse",
      "sampleSize"
    ],
    colParser: {
      attraction: "Number",
      sampleSize: "Number"
    }
  });

  var inputStream = fileUtils.createCombinedStream(POPULATIONS);
  csvConverter
    .fromStream(inputStream)
    .on("json", function(jsonObj) {
      lineHandler(jsonObj);
    })
    .on("done", function(error) {
      if (error) return console.log(error);
      saveFiles();
    });

  function lineHandler(rowJson) {
    if (rowJson.location.toLowerCase() !== "location") {
      processCreSetupPopItem(creSetupPopulations, rowJson, true, true);
      processMapPopItem(mapPopulations, rowJson);
    }
  }

  function saveFiles() {
    fileUtils.makeDirectory("data/json");
    fileUtils.saveJsonFile(
      "data/json/populations-cre-setup.json",
      creSetupPopulations
    );
    fileUtils.saveJsonFile("data/json/populations-map.json", mapPopulations);
  }

  /**
   * Adds an empty object as the value for a key if the object does not contain the key yet
   * @param object
   * @param key
   */
  function addKey(object, key) {
    if (object[key] === undefined) {
      object[key] = {};
    }
  }

  function processCreSetupPopItem(
    population,
    row,
    includeSampleSize,
    splitCheese
  ) {
    addKey(population, row.location);
    addKey(population[row.location], row.phase);

    var cheeses = splitCheese ? row.cheese.split("/") : [row.cheese];
    for (var cheeseIndex = 0; cheeseIndex < cheeses.length; cheeseIndex++) {
      var cheese = cheeses[cheeseIndex];

      addKey(population[row.location][row.phase], cheese);
      addKey(population[row.location][row.phase][cheese], row.charm);

      population[row.location][row.phase][cheese][row.charm][row.mouse] =
        row.attraction;

      if (includeSampleSize && row.sampleSize) {
        population[row.location][row.phase][cheese][row.charm]["SampleSize"] =
          row.sampleSize;
      }
    }
  }

  function processMapPopItem(populationObject, row) {
    var mouseName = row.mouse;
    var cheese = row.cheese;
    var attractionRate = row.attraction;

    addKey(populationObject, mouseName);
    addKey(populationObject[mouseName], row.location);
    addKey(populationObject[mouseName][row.location], row.phase);
    addKey(populationObject[mouseName][row.location][row.phase], cheese);

    populationObject[mouseName][row.location][row.phase][cheese][
      row.charm
    ] = attractionRate;
  }
})();
