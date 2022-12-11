(function() {
  const POPULATIONS = [
    "data/populations.csv",
    "data/pop-csv/acolyte-realm.csv",
    "data/pop-csv/balacks-cove.csv",
    "data/pop-csv/bristle-woods-rift.csv",
    "data/pop-csv/burroughs-rift.csv",
    "data/pop-csv/cantera-quarry.csv",
    "data/pop-csv/catacombs.csv",
    "data/pop-csv/cursed-city.csv",
    "data/pop-csv/event.csv",
    "data/pop-csv/fiery-warpath.csv",
    "data/pop-csv/floating-islands.csv",
    "data/pop-csv/foreword-farm.csv",
    "data/pop-csv/forbidden-grove.csv",
    "data/pop-csv/fort-rox.csv",
    "data/pop-csv/fungal-cavern.csv",
    "data/pop-csv/furoma-rift.csv",
    "data/pop-csv/great-winter-hunt.csv",
    "data/pop-csv/harbour.csv",
    "data/pop-csv/iceberg.csv",
    "data/pop-csv/laboratory.csv",
    "data/pop-csv/living-garden.csv",
    "data/pop-csv/lost-city.csv",
    "data/pop-csv/mousoleum.csv",
    "data/pop-csv/moussu-picchu.csv",
    "data/pop-csv/prickly-plains.csv",
    "data/pop-csv/prologue-pond.csv",
    "data/pop-csv/queso-geyser.csv",
    "data/pop-csv/queso-river.csv",
    "data/pop-csv/ronza.csv",
    "data/pop-csv/table-of-contents.csv",
    "data/pop-csv/town-of-digby.csv",
    "data/pop-csv/toxic-spill.csv",
    "data/pop-csv/valour-rift.csv"
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
