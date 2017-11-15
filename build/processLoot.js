(function () {
    const SAMPLE_SIZE_LABEL = "SampleSize";
    const INPUTS = [
        // Valour
        "data/loot-kings-arms.csv",
        "data/loot-tournament-hall.csv",
        "data/loot-kings-gauntlet.csv",
        // Whisker Woods
        "data/loot-calm-clearing.csv",
        "data/loot-great-gnarled-tree.csv",
        "data/loot-lagoon.csv",
        // Burroughs
        "data/loot-laboratory.csv",
        "data/loot-town-of-digby.csv",
        "data/loot-mousoleum.csv",
        "data/loot-bazaar.csv",
        // Furoma
        "data/loot-training-grounds.csv",
        "data/loot-dojo.csv",
        "data/loot-meditation-room.csv",
        "data/loot-pinnacle-chamber.csv",
        // Bristle Woods
        "data/loot-catacombs.csv",
        "data/loot-forbidden-grove.csv",
        "data/loot-acolyte-realm.csv",
        // Tribal Isles
        "data/loot-cape-clawed.csv",
        "data/loot-elub-shore.csv",
        "data/loot-nerg-plains.csv",
        "data/loot-derr-dunes.csv",
        "data/loot-jungle-of-dread.csv",
        "data/loot-dracano.csv",
        "data/loot-balacks-cove.csv",
        // Varmint Valley
        "data/loot-claw-shot-city.csv",
        "data/loot-gnawnian-express-station.csv",
        "data/loot-fort-rox.csv",
        // Rodentia
        "data/loot-ss-huntington-iii.csv",
        "data/loot-slushy-shoreline.csv",
        "data/loot-seasonal-garden.csv",
        "data/loot-zugzwangs-tower.csv",
        "data/loot-crystal-library.csv",
        "data/loot-iceberg.csv",
        "data/loot-sunken-city.csv",
        // Sandtail Desert
        "data/loot-fiery-warpath.csv",
        "data/loot-muridae-market.csv",
        "data/loot-living-garden.csv",
        "data/loot-lost-city.csv",
        "data/loot-sand-dunes.csv",
        "data/loot-twisted-garden.csv",
        "data/loot-cursed-city.csv",
        "data/loot-sand-crypts.csv",
        // Hollow Heights
        "data/loot-fungal-cavern.csv",
        "data/loot-labyrinth.csv",
        "data/loot-zokor.csv",
        "data/loot-mopi.csv",
        // Rift
        "data/loot-gnawnia-rift.csv",
        "data/loot-burroughs-rift.csv",
        "data/loot-whisker-woods-rift.csv",
        "data/loot-furoma-rift.csv",
        // Other
        "data/loot-gilded.csv",
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

    var inputStream = fileUtils.createCombinedStream(INPUTS.filter(function (fn) { return fs.existsSync(fn) }));
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

            put(population, [row.location, row.phase, row.mouse, row.charm, row.base, row.trap, cheese, row.loot], row.qty);
            if (includeSampleSize && row.sampleSize) {
                put(population, [row.location, row.phase, row.mouse, row.charm, row.base, row.trap, cheese, SAMPLE_SIZE_LABEL], row.sampleSize);
            }
        }
    }

})();
