const utils = require("../_utils");

const cheeses = [
  "Undead String Emmental",
  "Magical String",
  "Brie String",
  "Terre Ricotta",
  "Polluted Parmesan"
];

module.exports = {
  default: {
    location: utils.genVarField("location", "Burroughs Rift")
  },
  series: [
    {
      cheese: utils.genVarField("cheese", "Undead String Emmental"),
      config: [
        {
          fields: { stage: "Undead String Emmental" },
          opts: {
            exclude: ["Glitchpaw"]
          }
        }
      ]
    }
  ]
};
