const utils = require("../_utils");

var cheeses = ["Rancid Radioactive Blue", "Magical Rancid Radioactive Blue"];
var stages = [
  "Hero",
  "Knight",
  "Lord/Lady",
  "Baron/Baroness",
  "Count/Countess",
  "Duke/Duchess",
  "Grand Duke/Duchess",
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
  ],
  postProcess: function(data) {
    return data.map(function(item) {
      // Rename to Grand Duke/Grand Duchess
      var stage =
        item.stage === "Grand Duke/Duchess"
          ? "Grand Duke/Grand Duchess"
          : item.stage;
      return Object.assign(item, { stage: stage });
    });
  }
};
