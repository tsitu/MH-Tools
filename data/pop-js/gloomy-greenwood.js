const utils = require("../_utils");

module.exports = {
  default: {
    location: utils.genVarField("location", "Gloomy Greenwood"),
  },
  series: [
    {
      cheese: utils.genVarField("cheese", ["SB+", "Gouda"]),
      config: [
        {
          opts: {
            include: [
              "Candy Cat",
              "Candy Goblin",
              "Cobweb",
              "Grey Recluse",
              "Shortcut",
              "Sugar Rush",
              "Teenage Vampire",
              "Tricky Witch",
              "Zombot Unipire"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", "Monterey Jack-O-Lantern"),
      config: [
        {
          opts: {
            include: [
              "Gourdborg",
              "Maize Harvester",
              "Pumpkin Hoarder",
              "Spirit Light",
              "Treat",
              "Trick",
              "Wild Chainsaw"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", "Bonefort"),
      config: [
        {
          opts: {
            include: [
              "Creepy Marionette",
              "Dire Lycan",
              "Grave Robber",
              "Hollowhead",
              "Mousataur Priestess",
              "Sandmouse",
              "Titanic Brain-Taker",
              "Tomb Exhumer"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", "Polter-Geitost"),
      config: [
        {
          opts: {
            include: [
              "Admiral Arrrgh",
              "Captain Cannonball",
              "Ghost Pirate Queen",
              "Gourd Ghoul",
              "Scorned Pirate",
              "Spectral Butler",
              "Spectral Swashbuckler"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", "Scream"),
      config: [
        {
          opts: {
            include: [
              "Baba Gaga",
              "Bonbon Gummy Globlin",
              "Hollowed",
              "Hollowed Minion",
              "Swamp Thang",
            ]
          }
        }
      ]
    },
  ],
  /**
   *
   * @param {{stage: string, location: string, cheese: string, mouse: string, attraction: string, sample: number}[]} data
   * @returns {{stage: string, location: string, cheese: string, mouse: string, attraction: string, sample: number}[]}
   */
  postProcess: function(data) {
    return data;
  },
};
