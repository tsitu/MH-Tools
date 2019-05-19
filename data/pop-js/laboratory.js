const utils = require("../_utils");

module.exports = {
  default: {
    location: utils.genVarField("location", "Laboratory"),
    after: utils.genVarField("after", 1539790440)
  },
  series: [
    {
      cheese: utils.genVarField("cheese", ["SB+", "Brie"])
    },
    {
      cheese: utils.genVarField("cheese", [
        "Gouda",
        "Swiss",
        "Marble",
        "Cheddar"
      ]),
      config: [
        {
          opts: {
            exclude: ["Burglar"]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", [
        "Radioactive Blue",
        "Rancid Radioactive Blue",
        "Magical Rancid Radioactive Blue",
        "Limelight"
      ])
    }
  ]
};
