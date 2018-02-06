#!/usr/bin/env node

var jt = require("jacksmhtools-client");
var utils = require("./_utils");
var paladinBaneSuffix = ' (Paladin\'s Bane)'
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
// Stages where Portal Pursuer is always available or Paladin's Bane have no effect
var specialStages = [
  "Entrance",
  'Guard Barracks',
  "Ingress",
  "Pursuer Mousoleum",
  "Security"
]

var normalStages = stages.filter(function (stage) { return specialStages.indexOf(stage) === -1})

utils
  .process({
    default: {
      location: utils.genVarField("location", "Bristle Woods Rift"),
      cheese: utils.genVarField("cheese", cheeses),
    },
    series: [
      { // normal chambers - no pursuer and no paladin's bane
        phase: utils.genVarField("stage", normalStages),
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
      { // normal chambers with Paladin's Bane buff
        phase: utils.genVarField("stage", normalStages).map(function (options) {
          options.fields.stage += paladinBaneSuffix
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
      },
      { // Entrance - have no buffs or curses
        phase: utils.genVarField("stage", "Entrance"),
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
      { // Guard Barracks - no paladin's bane and no skeletal champion
        phase: utils.genVarField("stage", "Guard Barracks"),
        noPursuer: [ { opts: { exclude: [ 'Portal Pursuer' ] } } ]
      },
      { // Ingress chamber - have Portal Pursuer but no Skeletal Champion
        phase: [
          {
            vars: { stage: { "Ingress": true } },
            fields: { stage: "Ingress" }
          },
          {
            vars: { stage: { "Ingress": true } },
            fields: { stage: "Ingress" + paladinBaneSuffix },
            opts: { exclude: [ 'Portal Paladin' ] }
          }
        ]
      },
      { // Pursuer Mousoleum without paladin's bane - have Portal Pursuer
        phase: utils.genVarField("stage", "Pursuer Mousoleum"),
        charm: [
          { vars: { charm: { "Rift Antiskele": false } } },
          {
            fields: { charm: "Rift Antiskele" },
            opts: { exclude: [ 'Skeletal Champion' ] }
          }
        ]
      },
      { // Pursuer Mousoleum with paladin's bane - have Portal Pursuer
        phase: [{
          vars: { stage: { "Pursuer Mousoleum": true } },
          fields: { stage: "Pursuer Mousoleum" + paladinBaneSuffix }
        }],
        charm: [
          { vars: { charm: { "Rift Antiskele": false } } },
          {
            fields: { charm: "Rift Antiskele" },
            opts: { exclude: [ 'Skeletal Champion', 'Portal Paladin' ] }
          }
        ]
      },
      { // Security Chamber - always with paladin's bane
        phase: [{
          vars: { stage: { "Security": true } },
          fields: { stage: "Security" + paladinBaneSuffix }
        }],
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
      if (parseFloat(a.attraction) > parseFloat(b.attraction)) return -1
      if (parseFloat(a.attraction) < parseFloat(b.attraction)) return 1
      return 0
    })
  })
  .then(utils.toCsv.bind(utils, utils.POP_FIELDS))
  .then(console.log.bind(console));
