const utils = require("../_utils");

var cheeses = ["Rancid Radioactive Blue", "Magical Rancid Radioactive Blue"];
var stages = [
  "Hero",
  "Knight",
  "Lord/Lady",
  "Baron/Baroness",
  "Count/Countess",
  "Duke/Duchess",
  "Grand Duke/Duchess", // rename to Grand Duke/Grand Duchess
  "Archduke/Archduchess"
];

module.exports = {
  default: {
    location: utils.genVarField("location", "Toxic Spill")
  },
  series: [
    {
      cheese: utils.genVarField("cheese", cheeses),
      charm: [
        {
          vars: {
            charm: { Rotten: false, "Super Rotten": false }
          }
        }
      ],
      phases: utils.genVarField("stage", stages),
      config: [
        {
          opts: {
            exclude: ["Lab Technician", "Hazmat"]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", cheeses),
      charm: [
        {
          vars: { charm: { Rotten: true } },
          fields: {
            charm: "Rotten"
          }
        }
      ],
      phases: utils.genVarField("stage", stages),
      config: [
        {
          opts: {
            exclude: ["Hazmat"]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", cheeses),
      charm: [
        {
          vars: { charm: { "Super Rotten": true } },
          fields: {
            charm: "Super Rotten"
          }
        }
      ],
      phases: utils.genVarField("stage", stages)
    }
  ]
};
