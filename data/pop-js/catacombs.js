const utils = require("../_utils");

module.exports = {
  default: {
    location: utils.genVarField("location", "Catacombs"),
    cheese: utils.genVarField("cheese", [
      "Radioactive Blue",
      "Ancient",
      "Moon",
      "Crescent",
      "Undead Emmental"
    ]),
    config: [
      {
        opts: {
          exclude: "Glitchpaw"
        }
      }
    ]
  },
  series: [
    {
      charm: [
        {
          vars: { charm: { Antiskele: false } }
        }
      ]
    },
    {
      charm: [
        {
          vars: { charm: { Antiskele: true } },
          fields: { charm: "Antiskele" }
        }
      ]
    }
  ]
};
