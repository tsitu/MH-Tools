(function () {
    const SAMPLE_SIZE_LABEL = "SampleSize";
    const INPUTS = [
        "data/loot-gilded.csv",
        "data/loot-mopi.csv",
        "data/loot-laboratory.csv",
        "data/loot-fungal-cavern.csv",
        "data/loot-frift.csv",
        "data/loot-specials.csv",
    ];

    const _ = require("lodash")
    const fs = require("fs");
    const csv = require("csvtojson");
    const fileUtils = require("./modules/fileUtils");

    var creLoot = {};

    var csvConverter = csv({
        headers: ["location", "phase", "trap", "base", "cheese", "charm", "mouse", "loot", "qty", "sampleSize"],
        colParser: {
            'qty' : 'Number',
            'sampleSize' : 'Number'
        }
    });

    var inputStream = fileUtils.createCombinedStream(INPUTS);
    csvConverter
        .fromStream(inputStream)
        .on('json', function (jsonObj) {
            lineHandler(jsonObj)
        }).on('done', function (error) {
        if (error)
            return console.log(error);
        saveFiles();
    });

    function lineHandler(rowJson) {
        processCreLootItem(creLoot, rowJson, true, true);
    }

    function saveFiles() {
        fileUtils.saveJsonFile("data/loot-cre.json", creLoot);
        fileUtils.makeDirectory("data/pretty/");
        fileUtils.saveJsonFile("data/pretty/loot-cre.json", creLoot, 4);
    }

    /**
     * Adds an empty object as the value for a key if the object does not contain the key jet
     * @param object
     * @param key
     */
    function addKey(object, key) {
        if (object[key] === undefined) {
            object[key] = {};
        }
    }

    /**
     * Sets value at the path in the object, creating all object on the way
     * @param {object} object
     * @param {string[]} path
     * @param value
     */
    function put(object, path, value) {
        // we need the last path item to assign the value at it
        for (var i=0, l=path.length-1; i<l; i++) {
            var key = path[i]
            addKey(object, key)
            object = object[key]
        }
        object[path[path.length-1]] = value
    }

    function processCreLootItem(population, row, includeSampleSize, splitCheese) {
        var cheeses = splitCheese ? row.cheese.split("/") : [row.cheese];
        for (var cheeseIndex = 0; cheeseIndex < cheeses.length; cheeseIndex++) {
            var cheese = cheeses[cheeseIndex];

            put(population, [row.mouse, row.location, row.phase, cheese, row.charm, row.base, row.trap, row.loot], row.qty);
            if (includeSampleSize && row.sampleSize) {
                put(population, [row.mouse, row.location, row.phase, cheese, row.charm, row.base, row.trap, SAMPLE_SIZE_LABEL], row.sampleSize);
            }
        }
    }

})();
