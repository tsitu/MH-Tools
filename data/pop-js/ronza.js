const utils = require("../_utils");

const cheeses = ["SB+", "Gouda", "Brie", "Swiss", "Marble", "Rockforth"];

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
    }
  ]
};
