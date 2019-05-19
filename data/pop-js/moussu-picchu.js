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
            cheese: { Dragonvine: true }
          },
          fields: { stage: "Storm low", cheese: "Dragonvine" },
          opts: {
            exclude: [
              "⚡Thunderlord⚡",
              "Thunderlord",
              "Thundering Watcher",
              "Dragoon",
              "Ful'Mina, The Mountain Queen"
            ]
          }
        }
      ]
    }
  ]
};
