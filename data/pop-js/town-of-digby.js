const utils = require("../_utils");

module.exports = {
  default: {
    location: utils.genVarField("location", "Town of Digby"),
    config: [
        {
            opts: {
                exclude: ["Lucky", "Glitchpaw"]
            }
        }
    ]
  },
  series: [
    {
      cheese: utils.genVarField("cheese", [
        "Brie",
        "Gouda",
        "SB+",
        "Limelight"
      ]),
    },
    {
      cheese: utils.genVarField("cheese", "Limelight"),
      charm: utils.genVarField("charm", "Mining")
    }
  ],
};
