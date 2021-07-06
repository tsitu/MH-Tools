const utils = require("../_utils");

module.exports = {
  default: {
    location: utils.genVarField("location", "Balack's Cove"),
    cheese: utils.genVarField("cheese", [
      "Vanilla Stilton",
      "Vengeful Vanilla Stilton"
    ])
  },
  series: [
    {
      phase: utils.genVarField("stage", "Low Tide"),
      config: [
        {
          opts: {
            include: [
              "Balack the Banished",
              "Brimstone",
              "Davy Jones",
              "Derr Lich",
              "Elub Lich",
              "Enslaved Spirit",
              "Nerg Lich",
              "Tidal Fisher",
              "Twisted Fiend"
            ]
          }
        }
      ]
    },
    {
      phase: utils.genVarField("stage", "Medium Tide"),
      config: [
        {
          opts: {
            include: [
              "Balack the Banished",
              "Brimstone",
              "Davy Jones",
              "Derr Lich",
              "Elub Lich",
              "Enslaved Spirit",
              "Nerg Lich",
              "Riptide",
              "Tidal Fisher",
              "Twisted Fiend"
            ]
          }
        }
      ]
    },
    {
      phase: utils.genVarField("stage", "High Tide"),
      config: [
        {
          opts: {
            include: ["Riptide"]
          }
        }
      ]
    }
  ]
};
