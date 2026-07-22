const utils = require("../_utils");

module.exports = {
  default: {
    location: utils.genVarField("location", "Fungal Cavern"),
    stage: utils.genVarField("stage", ["Gemology Base", "Not Gemology"]),
  },
  series: [
    {
      cheese: utils.genVarField("cheese", [
        "SB+",
        "Gouda",
        "Brie",
      ]),
      mice : utils.genInclude([
        "Bitter Root",
        "Floating Spore",
        "Funglore",
        "Lumahead",
        "Mouldy Mole",
        "Mush",
        "Mushroom Sprite",
        "Nightshade Masquerade",
        "Quillback",
        "Spiked Burrower",
        "Spore Muncher",
        "Sporeticus"
      ])
    },
    {
      cheese: utils.genVarField("cheese", "Glowing Gruyere"),
      mice: utils.genInclude([
        "Cavern Crumbler",
        "Crag Elder",
        "Crystalline Slasher",
        "Dirt Thing",
        "Gemstone Worshipper",
        "Shattered Obsidian",
        "Splintered Stone Sentry",
        "Stone Maiden"
      ])
    },
    {
      cheese: utils.genVarField("cheese", "Mineral"),
      mice: utils.genInclude([
        "Crystal Cave Worm",
        "Crystal Controller",
        "Crystal Lurker",
        "Crystal Observer",
        "Crystal Queen",
        "Crystalback",
        "Gemorpher",
        "Stalagmite"
      ])
    },
    {
      cheese: utils.genVarField("cheese", "Gemstone"),
      mice: utils.genInclude([
        "Crystal Lurker",
        "Crystal Observer",
        "Crystal Queen",
        "Crystal Golem",
        "Diamondhide",
        "Huntereater"
      ])
    },
    {
      cheese: utils.genVarField("cheese", "Diamond"),
      mice: utils.genInclude([
        "Diamondhide",
        "Huntereater",
        "Crystal Behemoth"
      ])
    },
  ]
};
