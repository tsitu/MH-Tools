const utils = require("../_utils");

const rbCheeses = [
  "Radioactive Blue",
  "Rancid Radioactive Blue",
  "Magical Rancid Radioactive Blue"
];
const emCheeses = ["Undead Emmental", "Undead String Emmental"];
const vampCheeses = ["Crimson", "Moon", "Crescent"];

const wall = utils.genVarField("stage", "Has Wall");
const noWall = utils.genVarField("stage", "No Wall");

module.exports = {
  default: {
    location: utils.genVarField("location", "Mousoleum"),
    after: utils.genVarField("after", 1539790440)
  },
  series: [
    {
      cheese: utils.genVarField("cheese", rbCheeses),
      stage: noWall,
      mice: utils.genInclude([
        "Coffin Zombie",
        "Glitchpaw",
        "Gluttonous Zombie",
        "Ravenous Zombie",
        "Zombie",
      ])
    },
    {
      cheese: utils.genVarField("cheese", emCheeses),
      stage: noWall,
      mice: utils.genInclude([
        "Coffin Zombie",
        "Gluttonous Zombie",
        "Grave Robber",
        "Ravenous Zombie",
        "Zombie",
        "Zombot Unipire",
      ])
    },
    {
      cheese: utils.genVarField("cheese", vampCheeses),
      stage: noWall,
      mice: utils.genInclude([
        "Coffin Zombie",
        "Gluttonous Zombie",
      ])
    },
    {
      cheese: utils.genVarField("cheese", rbCheeses),
      stage: wall,
      mice: utils.genInclude([
        "Bat",
        "Black Widow",
        "Ghost",
        "Giant Snail",
        "Monster",
        "Mummy",
        "Vampire",
      ])
    },
    {
      cheese: utils.genVarField("cheese", emCheeses),
      stage: wall,
      mice: utils.genInclude([
        "Ghost",
        "Grave Robber",
        "Mummy",
        "Vampire",
        "Zombot Unipire",
      ])
    },
    {
      cheese: utils.genVarField("cheese", ["Moon", "Crescent"]),
      stage: wall,
      mice: utils.genInclude([
        "Bat",
        "Ghost",
        "Lycan",
        "Mummy",
        "Vampire",
      ])
    },
    {
      cheese: utils.genVarField("cheese", "Crimson"),
      stage: wall,
      mice: utils.genInclude([
        "Bat",
        "Ghost",
        "Mousevina von Vermin",
        "Mummy",
        "Vampire",
      ])
    }
  ]
};
