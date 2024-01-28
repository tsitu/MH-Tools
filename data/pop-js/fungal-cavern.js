const utils = require("../_utils");

module.exports = {
  default: {
    location: utils.genVarField("location", "Fungal Cavern"),
  },
  series: [
    {
      cheese: utils.genVarField("cheese", [
        "SB+",
        "Gouda",
        "Brie",
      ]),
      config: [
        {
          opts: {
            include: [
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
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", "Glowing Gruyere"),
      stage: utils.genVarField("stage", ["Gemology Base", "Not Gemology"]),
      config: [
        {
          opts: {
            include: [
              "Cavern Crumbler",
              "Crag Elder",
              "Crystalline Slasher",
              "Dirt Thing",
              "Gemstone Worshipper",
              "Shattered Obsidian",
              "Splintered Stone Sentry",
              "Stone Maiden"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", "Mineral"),
      stage: utils.genVarField("stage", ["Gemology Base", "Not Gemology"]),
      config: [
        {
          opts: {
            include: [
              "Crystal Cave Worm",
              "Crystal Controller",
              "Crystal Lurker",
              "Crystal Observer",
              "Crystal Queen",
              "Crystalback",
              "Gemorpher",
              "Stalagmite"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", "Gemstone"),
      stage: utils.genVarField("stage", ["Gemology Base", "Not Gemology"]),
      config: [
        {
          opts: {
            include: [
              "Crystal Lurker",
              "Crystal Observer",
              "Crystal Queen",
              "Crystal Golem",
              "Diamondhide",
              "Huntereater"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", "Diamond"),
      stage: utils.genVarField("stage", ["Gemology Base", "Not Gemology"]),
      config: [
        {
          opts: {
            include: [
              "Diamondhide",
              "Huntereater",
              "Crystal Behemoth"
            ]
          }
        }
      ]
    },
  ]
};
