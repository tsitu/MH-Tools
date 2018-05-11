(function() {
  const SAMPLE_SIZE_LABEL = "SampleSize";
  const POPULATIONS = [
    "data/populations.csv",
    "data/pop-bwrift.csv",
    "data/pop-iceberg.csv",
    "data/pop-fg.csv",
    "data/pop-fort-rox.csv",
    "data/pop-frift.csv",
    "data/pop-mopi.csv"
  ];

  const fs = require("fs");
  const csv = require("csvtojson");
  const fileUtils = require("./modules/fileUtils");
  const CombinedStream = require("combined-stream");

  var mapPopulations = {};
  var crePopulations = {};
  var setupPopulations = {};

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
      processCreSetupPopItem(crePopulations, rowJson, true, true);
      processCreSetupPopItem(setupPopulations, rowJson, false, false);
      processMapPopItem(mapPopulations, rowJson);
    }
  }

  function saveFiles() {
    fileUtils.saveJsonFile("data/populations-cre.json", crePopulations);
    fileUtils.saveJsonFile("data/populations-map.json", mapPopulations);
    fileUtils.saveJsonFile("data/populations-setup.json", setupPopulations);

    fileUtils.makeDirectory("data/pretty/");
    fileUtils.saveJsonFile(
      "data/pretty/populations-cre.json",
      crePopulations,
      4
    );
    fileUtils.saveJsonFile(
      "data/pretty/populations-map.json",
      mapPopulations,
      4
    );
    fileUtils.saveJsonFile(
      "data/pretty/populations-setup.json",
      setupPopulations,
      4
    );
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
        population[row.location][row.phase][cheese][row.charm][
          SAMPLE_SIZE_LABEL
        ] =
          row.sampleSize;
      }
    }
  }

  function processMapPopItem(populationObject, row) {
    function capitalise(str) {
      return str.replace(/(?:^|\s)\S/g, function(a) {
        return a.toUpperCase();
      });
    }

    var mouseName = capitalise(row.mouse);
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
