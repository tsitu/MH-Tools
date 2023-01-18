const utils = require("../_utils");

module.exports = {
  default: {
    location: utils.genVarField("location", "Living Garden"),
    cheese: utils.genVarField("cheese", [
      "Duskshade Camembert",
      "SB+",
      "Gouda",
      "Brie"
    ])
  },
  series: [
    {
      config: [
        {
          vars: {
            stage: { "Not Pouring": true }
          },
          fields: { stage: "Not Poured" },
          opts: {
            exclude: ["Thirsty", "Lucky", "Camofusion"]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { Pouring: true }
          },
          fields: { stage: "Poured" },
          opts: {
            exclude: ["Lucky"]
          }
        }
      ]
    }
  ]
};
