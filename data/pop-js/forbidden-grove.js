const utils = require("../_utils");

const cheeses = [
  "Ancient",
  "Moon",
  "Crescent",
  "Radioactive Blue",
  "Rancid Radioactive Blue"
];

module.exports = {
  default: {
    location: utils.genVarField("location", "Forbidden Grove"),
    cheese: utils.genVarField("cheese", cheeses)
  },
  series: [
    {
      // stages
      phase: utils.genVarField("stage", "open"),
      config: [
        {
          opts: {
            exclude: ["Glitchpaw", "Realm Ripper"]
          }
        }
      ]
    },
    {
      // stages
      phase: utils.genVarField("stage", "closed"),
      config: [
        {
          opts: {
            exclude: ["Glitchpaw"]
          }
        }
      ]
    }
  ]
};
