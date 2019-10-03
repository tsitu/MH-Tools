const utils = require("../_utils");

module.exports = {
  series: [
    {
      cheese: utils.genVarField("cheese", [
        "Galleon Gouda",
        "SB+",
        "Gouda",
        "Brie",
        "Swiss"
      ]),
      location: utils.genVarField("location", "S.S. Huntington IV"),
      config: [
        {
          opts: {
            exclude: ["Lucky", "Glitchpaw"]
          }
        }
      ]
    }
  ]
};
