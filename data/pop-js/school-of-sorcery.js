const utils = require("../_utils");

const stages = ["Arcane Arts", "Shadow Sciences", "Final Exam - Arcane", "Final Exam - Shadow"];
const cheeses = ["Standard", "Apprentice Ambert", "Master Mimolette"];

const miceByStageThenCheese = {
  "Arcane Arts": {
    "Standard": [
      "Perpetual Detention",
      "Broomstick Bungler",
      "Misfortune Teller",
    ],
    "Apprentice Ambert": [
      "Arcana Overachiever",
      "Invisible Fashionista",
      "Enchanted Chess Club Champion",
    ],
    "Master Mimolette": [
      "Illustrious Illusionist",
      "Featherlight",
      "Constructively Critical Artist",
    ]
  },
  "Shadow Sciences": {
    "Standard": [
      "Mixing Mishap",
      "Uncoordinated Cauldron Carrier",
      "Bookworm",
    ],
    "Apprentice Ambert": [
      "Classroom Keener",
      "Audacious Alchemist",
      "Prestigious Prestidigitator",
    ],
    "Master Mimolette": [
      "Classroom Disrupter",
      "Teleporting Truant",
      "Magical Multitasker",
    ]
  }
}

// Instead of repeating a lot of line just use previous pools
miceByStageThenCheese["Final Exam - Arcane"] = {
  "Standard": [
    ...miceByStageThenCheese["Arcane Arts"]["Standard"],
    "Sleep Starved Scholar",
  ],
  "Apprentice Ambert": [
    ...miceByStageThenCheese["Arcane Arts"]["Apprentice Ambert"],
    "Class Clown",
  ],
  "Master Mimolette": [
    ...miceByStageThenCheese["Arcane Arts"]["Master Mimolette"],
    "Tyrannical Thaumaturge",
  ]
};

miceByStageThenCheese["Final Exam - Shadow"] = {
  "Standard": [
    ...miceByStageThenCheese["Shadow Sciences"]["Standard"],
    "Cheat Sheet Conjurer",
  ],
  "Apprentice Ambert": [
    ...miceByStageThenCheese["Shadow Sciences"]["Apprentice Ambert"],
    "Celestial Summoner",
  ],
  "Master Mimolette": [
    ...miceByStageThenCheese["Shadow Sciences"]["Master Mimolette"],
    "Data Devourer",
  ]
}

const standardCheeseVarItem = {
  vars: {
    cheese: {
      Brie: true,
      "Empowered Brie": true,
      Gouda: true,
      "SB+": true,
      "ESB+": true,
    }
  },
  fields: {
    cheese: "SB+/Gouda/Brie"
  }
}

function genSeries() {
  const series = [];
  for (const stage of stages) {
    for (const cheese of cheeses) {
      const config = {
        stage: utils.genVarField("stage", stage),
        cheese: utils.genVarField("cheese", cheese),
        config: [
          {
            opts: {
              include: miceByStageThenCheese[stage][cheese]
            }
          }
        ]
      };

      // Replace the standard placeholder with actual multi cheese config (see above)
      if (cheese === "Standard") {
        config.cheese[0] = standardCheeseVarItem;
      }

      series.push(config);
    }
  }

  return series;
}

module.exports = {
  default: {
    location: utils.genVarField("location", "School of Sorcery"),
  },
  series: genSeries(),
  /**
   *
   * @param {import('../_utils').AttractionData[]} data
   * @returns {import('../_utils').AttractionData[]}
   */
    postProcess: function(data) {

    // See comments in Zugwangz's Tower about how to combine pools of mice that exist on opposite sides but have same AR

    // To find the matching pair: https://docs.google.com/spreadsheets/d/1LhtH3yf0ImnUv4Z5rGqDskmGxfXvSglDfXqFfeXmFq8/edit?usp=sharing
    // Find Arcane Mouse and match its Mouse Power with the Shadow Side. Or look at the MinLuck table. It's the same thing.
    const arcaneToShadowMiceMap = {
      // Standard
      "Perpetual Detention": "Mixing Mishap",
      "Broomstick Bungler": "Uncoordinated Cauldron Carrier",
      "Misfortune Teller": "Bookworm",

      // AA
      "Arcana Overachiever": "Classroom Keener",
      "Invisible Fashionista": "Audacious Alchemist",
      "Enchanted Chess Club Champion": "Prestigious Prestidigitator",

      // MM
      "Illustrious Illusionist": "Classroom Disrupter",
      "Featherlight": "Teleporting Truant",
      "Constructively Critical Artist": "Magical Multitasker",

      // FE Standard
      "Sleep Starved Scholar": "Cheat Sheet Conjurer",

      // FE AA
      "Class Clown": "Celestial Summoner",

      // FE MM
      "Tyrannical Thaumaturge": "Data Devourer"
    }

    data.forEach((run, i) => {
      if (run.stage.indexOf('Arcane') > -1) {
        const oppStage = run.stage === 'Arcane Arts' ? 'Shadow Sciences' : 'Final Exam - Shadow';
        const oppMouse = arcaneToShadowMiceMap[run.mouse];

        data
          .forEach((other, j) => {
            if (other.cheese == run.cheese
                  && other.stage == oppStage
                  && other.mouse == oppMouse) {
              // Add seen to each other. Recalc AR.

              data[i].seen += data[j].seen;
              data[i].sample += data[j].sample;

              data[j].seen = data[i].seen;
              data[j].sample = data[i].sample;

              data[i].attraction = (data[i].seen / data[i].sample * 100).toFixed(2) + "%";
              data[j].attraction = (data[j].seen / data[j].sample * 100).toFixed(2) + "%";
            }
        });
      }
    });

      // Put this first
      data.unshift(
        // Hallway, why are you here!
        {location: "School of Sorcery", cheese: "SB+/Gouda/Brie", stage: "Hallway", mouse: "Hall Monitor", attraction: "100%", sample: 1},
      );

      // These last
      data.push(
        // Manually add boss stages
        {location: "School of Sorcery", cheese: "SB+/Gouda/Brie/Apprentice Ambert/Master Mimolette", stage: "Arcane Arts - Boss", mouse: "Arcane Master Sorcerer", attraction: "100%", sample: 1},
        {location: "School of Sorcery", cheese: "SB+/Gouda/Brie/Apprentice Ambert/Master Mimolette", stage: "Shadow Sciences - Boss", mouse: "Shadow Master Sorcerer", attraction: "100%", sample: 1},
        {location: "School of Sorcery", cheese: "SB+/Gouda/Brie/Apprentice Ambert/Master Mimolette", stage: "Final Exam - Boss", mouse: "Mythical Master Sorcerer", attraction: "100%", sample: 1},
      );

      return data;
    }
}
