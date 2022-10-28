const utils = require("../_utils");

var stages = [
  "Rain low",
  "Rain medium",
  "Rain high",
  "Rain max",
  "Wind low",
  "Wind medium",
  "Wind high",
  "Wind max"
];

module.exports = {
  default: {
    location: utils.genVarField("location", "Moussu Picchu")
  },
  series: [
    {
      cheese: utils.genVarField("cheese", [
        "Glowing Gruyere",
        "SB+",
        "Gouda",
        "Brie"
      ]),
      config: [
        {
          opts: {
            exclude: ["Glitchpaw"]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Rain low": true },
            cheese: { Rainy: true }
          },
          fields: { stage: "Rain low", cheese: "Rainy" },
          opts: {
            exclude: ["Monsoon Maker", "Rain Summoner"]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Rain medium": true },
            cheese: { Rainy: true }
          },
          fields: { stage: "Rain medium", cheese: "Rainy" },
          opts: {
            exclude: ["Rainmancer", "Rain Wallower", "Rain Collector"]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Rain high": true },
            cheese: { Rainy: true }
          },
          fields: { stage: "Rain high", cheese: "Rainy" },
          opts: {
            exclude: ["Rain Summoner"]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Rain max": true },
            cheese: { Rainy: true }
          },
          fields: { stage: "Rain max", cheese: "Rainy" },
          opts: {
            exclude: ["Monsoon Maker", "Rain Summoner"]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Wind low": true },
            cheese: { Windy: true }
          },
          fields: { stage: "Wind low", cheese: "Windy" },
          opts: {
            exclude: ["Cycloness", "Fluttering Flutist"]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Wind medium": true },
            cheese: { Windy: true }
          },
          fields: { stage: "Wind medium", cheese: "Windy" },
          opts: {
            exclude: ["Wind Warrior", "Wind Watcher", "Charming Chimer"]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Wind high": true },
            cheese: { Windy: true }
          },
          fields: { stage: "Wind high", cheese: "Windy" },
          opts: {
            exclude: ["Fluttering Flutist"]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Wind max": true },
            cheese: { Windy: true }
          },
          fields: { stage: "Wind max", cheese: "Windy" },
          opts: {
            exclude: ["Cycloness"]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage:  { "Wind low": true},
            stage1: { "Rain low": true },
            cheese: { Dragonvine: true }
          },
          fields: { stage: "Storm low", cheese: "Dragonvine" },
          opts: {
            include: [
              "Thunder Strike",
              "Violent Stormchild"
            ]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage:  { "Wind medium": true},
            stage1: { "Rain medium": true },
            cheese: { Dragonvine: true }
          },
          fields: { stage: "Storm medium", cheese: "Dragonvine" },
          opts: {
            include: [
              "Thundering Watcher",
              "⚡Thunderlord⚡"
            ]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage:  { "Wind high": true},
            stage1: { "Rain high": true },
            cheese: { Dragonvine: true }
          },
          fields: { stage: "Storm high", cheese: "Dragonvine" },
          opts: {
            include: [
              "Dragoon",
              "Ful'Mina, The Mountain Queen",
              "Thundering Watcher"
            ]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage:  { "Wind max": true},
            stage1: { "Rain max": true },
            cheese: { Dragonvine: true }
          },
          fields: { stage: "Storm max", cheese: "Dragonvine" },
          opts: {
            include: [
              "Ful'Mina, The Mountain Queen",
            ]
          }
        }
      ]
    }
  ],
  postProcess: function(data) {
    return data.map(function(item) {
      // Rename to Thunderlord
      var mouse =
        item.mouse === "⚡Thunderlord⚡"
          ? "Thunderlord"
          : item.mouse;
      return Object.assign(item, { mouse: mouse });
    });
  }
};
