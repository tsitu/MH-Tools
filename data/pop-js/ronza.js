const utils = require("../_utils");

const cheeses = ["SB+", "Gouda", "Brie", "Swiss", "Marble"];

module.exports = {
  default: {
    location: utils.genVarField("location", "Ronza's Traveling Shoppe")
    // before: utils.genVarField("before", 1562684400) // TODO: Hunts after GMT-7 8AM Tues July 9 2019 are in ToG
  },
  series: [
    {
      cheese: utils.genVarField("cheese", cheeses),
      config: [
        {
          opts: {
            exclude: ["White", "Brown", "Grey"]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", "Rockforth"),
      after: utils.genVarField("after", 1721833200), // 2024-070-24T15:00:00Z
      config: [
        {
          opts: {
            include: [
              "Elven Princess",
              "Goldleaf",
              "Lucky",
              "Longtail",
              "Moussile",
              "Pugilist",
              "Rockstar",
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", "Abominable Asiago"),
      after: utils.genVarField("after", 1721833200), // 2024-070-24T15:00:00Z
      config: [
        {
          opts: {
            include: [
              "Living Ice",
              "Mammoth",
              "Rimeus Polarblast",
              "Snow Bowler",
              "Yeti",
            ]
          }
        }
      ]
    }
  ]
};
