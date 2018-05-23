const utils = require("../_utils")

var paladinBaneSuffix = '(Paladin\'s Bane)'
var pursuedSuffix = '(Pursued)'
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

module.exports = {
  default: {
    location: utils.genVarField('location', 'Bristle Woods Rift'),
    cheese: utils.genVarField('cheese', cheeses)
  },
  series: [
    {
      phase: utils.genVarField("stage", stages),
      paladinBane: [
        {
          vars: { detail1: { 'effect_ng:false': true } },
          fields: { paladinBane: false }
        },
        {
          vars: { detail1: { 'effect_ng:true': true } },
          fields: { paladinBane: true }
        }
      ],
      pursued: [
        {
          vars: { detail2: { 'effect_st:false': true } },
          fields: { pursued: false }
        },
        {
          vars: { detail2: { 'effect_st:true': true } },
          fields: { pursued: true }
        }
      ],
      charm: [
        {
          vars: { charm: { "Rift Antiskele": false } },
        },
        {
          vars: { charm: { "Rift Antiskele": true } },
          fields: { charm: "Rift Antiskele" },
        }
      ]
    },
  ],
  postProcess: function (data) {
    return data.map(function (item) {
      var stage = [ item.stage, item.paladinBane ? paladinBaneSuffix : '', item.pursued ? pursuedSuffix : '' ]
      return Object.assign(item, {
        stage: stage.filter(function (i) {return i}).join(' ')
      })
    })
  }
}
