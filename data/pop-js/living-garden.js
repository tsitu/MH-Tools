const utils = require("../_utils");

const poured = utils.genVarAlias("stage", "Pouring", "Poured");
const notPoured = utils.genVarAlias("stage", "Not Pouring", "Not Poured");

module.exports = {
  default: {
    location: utils.genVarField("location", "Living Garden"),
  },
  series: [
    {
      stage: notPoured,
      cheese: utils.genVarField("cheese", "Duskshade Camembert"),
      mice: utils.genInclude([
        "Camoflower",
        "Carmine the Apothecary",
        "Shroom",
      ])
    },
    {
      cheese: utils.genVarField("cheese", [
        "SB+",
        "Gouda",
        "Brie",
      ]),
      stage: notPoured,
      mice: utils.genInclude([
        "Bark",
        "Calalilly",
        "Camoflower",
        "Shroom",
        "Strawberry Hotcakes",
        "Thistle"
      ])
    },
    {
      stage: poured,
      cheese: utils.genVarField("cheese", "Duskshade Camembert"),
      mice: utils.genInclude([
        "Camoflower",
        "Carmine the Apothecary",
        "Shroom",
      ])
    },
    {
      cheese: utils.genVarField("cheese", [
        "SB+",
        "Gouda",
        "Brie",
      ]),
      stage: poured,
      mice: utils.genInclude([
        "Bark",
        "Calalilly",
        "Camoflower",
        "Shroom",
        "Strawberry Hotcakes",
        "Thirsty",
        "Thistle"
      ])
    }
  ]
};
