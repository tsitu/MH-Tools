#!/usr/bin/env node

var jt = require("jacksmhtools-client");
var utils = require("./_utils");
var stages = [
  "Acolyte",
  "Ancient Lab",
  "Entrance",
  "Frozen Alcove",
  "Furnace Room",
  "Gearworks",
  "Guard Barracks",
  "Hidden Treasury",
  "Ingress",
  "Lucky Tower",
  "Pursuer Mousoleum",
  "Runic Laboratory",
  "Security",
  "Timewarp"
]
var cheeses = [
  "Runic String",
  "Ancient String",
  "Magical String",
  "Brie String",
  "Swiss String",
  "Marble String"
]

utils
  .process({
    default: {
      location: utils.genVarField("location", "Bristle Woods Rift"),
      cheese: utils.genVarField("cheese", cheeses),
    },
    series: [
      { // normal
        phase: utils.genVarField("stage", stages),
        charm: [
          {
            vars: { charm: { "Rift Antiskele": false } },
            opts: { exclude: [ 'Portal Pursuer' ] }
          },
          {
            fields: { charm: "Rift Antiskele" },
            opts: { exclude: [ 'Skeletal Champion', 'Portal Pursuer' ] }
          }
        ]
      },
      { // with Paladin's Bane buff
        phase: utils.genVarField("stage", stages).map(function (options) {
          options.fields.stage += ' (Paladin\'s Bane)'
          return options
        }),
        charm: [
          {
            vars: { charm: { "Rift Antiskele": false } },
            opts: { exclude: [ 'Portal Pursuer', 'Portal Paladin' ] }
          },
          {
            fields: { charm: "Rift Antiskele" },
            opts: { exclude: [ 'Skeletal Champion', 'Portal Pursuer', 'Portal Paladin' ] }
          }
        ]
      }
    ],
    process: function (item) {
      console.error("requesting", JSON.stringify(item.vars));
      return jt
        .getSAEncounterRateData(item.vars, item.opts)
        .filter(function (item) {
          return item.sample > 100;
        })
        .map(utils.preparePopulation.bind(utils, item.fields));
    }
  })
  .then(function (rows) {
    return rows.sort(function (a, b) {
      if (a.stage < b.stage) return -1
      if (a.stage > b.stage) return 1
      var cheeseA = cheeses.indexOf(a.cheese)
      var cheeseB = cheeses.indexOf(b.cheese)
      if (cheeseA < cheeseB) return -1
      if (cheeseA > cheeseB) return 1
      var charmA = a.charm || '-'
      var charmB = b.charm || '-'
      if (charmA < charmB) return -1
      if (charmA > charmB) return 1
      return 0
    })
  })
  .then(utils.toCsv.bind(utils, utils.POP_FIELDS))
  .then(console.log.bind(console));
