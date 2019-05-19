const utils = require("../_utils");

const rbCheeses = [
  "Radioactive Blue",
  "Rancid Radioactive Blue",
  "Magical Rancid Radioactive Blue"
];
const emCheeses = ["Undead Emmental", "Undead String Emmental"];
const vampCheeses = ["Crimson", "Moon", "Crescent"];

module.exports = {
  default: {
    location: utils.genVarField("location", "Mousoleum"),
    after: utils.genVarField("after", 1539790440)
  },
  series: [
    {
      cheese: utils.genVarField("cheese", rbCheeses),
      stage: utils.genVarField("stage", "No Wall"),
      config: [
        {
          opts: {
            exclude: [
              "Bat",
              "Vampire",
              "Mummy",
              "Ghost",
              "Giant Snail",
              "Monster"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", emCheeses),
      stage: utils.genVarField("stage", "No Wall"),
      config: [
        {
          opts: {
            exclude: [
              "Bat",
              "Vampire",
              "Mummy",
              "Ghost",
              "Giant Snail",
              "Monster"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", vampCheeses),
      stage: utils.genVarField("stage", "No Wall"),
      config: [
        {
          opts: {
            exclude: [
              "Bat",
              "Vampire",
              "Mummy",
              "Ghost",
              "Giant Snail",
              "Monster",
              "Mousevina von Vermin"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", vampCheeses),
      stage: utils.genVarField("stage", "Has Wall")
    },
    {
      cheese: utils.genVarField("cheese", rbCheeses),
      stage: utils.genVarField("stage", "Has Wall"),
      config: [
        {
          opts: {
            exclude: ["Glitchpaw", "Zombie"]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", emCheeses),
      stage: utils.genVarField("stage", "Has Wall")
    }
  ]
};
