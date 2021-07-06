const utils = require("../_utils");

module.exports = {
  series: [
    {
      cheese: utils.genVarField("cheese", [
        "SB+",
        "Gouda",
        "Brie",
        "Glowing Gruyere",
        "Mineral",
        "Gemstone",
        "Diamond"
      ]),
      location: utils.genVarField("location", "Fungal Cavern"),
      config: [
        {
          opts: {
            exclude: ["Lucky"]
          }
        }
      ]
    }
  ]
};
