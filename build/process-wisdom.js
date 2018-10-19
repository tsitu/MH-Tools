(function() {
  const WISDOM = ["data/mouse-wisdom.csv"];
  const csv = require("csvtojson");
  const fs = require("fs");
  const fileUtils = require("./file-utils");

  var csvConverter = csv({
    colParser: {
      wisdom: "Number"
    }
  });

  var mouseWisdom = {};

  var inputStream = fileUtils.createCombinedStream(WISDOM);
  csvConverter
    .fromStream(inputStream)
    .on("json", function(jsonObj) {
      mouseWisdom[jsonObj["mouse"]] = jsonObj["wisdom"];
    })
    .on("done", function(error) {
      fileUtils.makeDirectory("data/json");
      fileUtils.saveJsonFile("data/json/mouse-wisdom.json", mouseWisdom);
    });
})();
