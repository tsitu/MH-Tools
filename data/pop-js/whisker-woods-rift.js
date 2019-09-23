const utils = require("../_utils")

var low_low_low_config = [ {
        vars: { stage: {'CC 0-24': true}, stage1: {'GGT 0-24': true}, stage2: {'DL 0-24': true} },
        fields: { stage: 'Low/Low/Low' },
        opts: {
          exclude: [
            "Cyclops Barbarian", // CC boss
            "Centaur Ranger", // GGT boss
            "Tri-dra", // DL boss
            "Red-Eyed Watcher Owl", // CC med mice
            "Treant Queen", // CC med mice
            "Spirit Fox", // CC med mice
            "Red Coat Bear", // GGT med mice
            "Rift Tiger", // GGT med mice
            "Nomadic Warrior", // GGT med mice
            "Winged Harpy", // DL med mice
            "Tree Troll", // DL med mice
            "Medicine", // DL med mice
            ]
          }
      } ]

var mid_low_low_config = [ {
        vars: { stage: {'CC 25-49': true}, stage1: {'GGT 0-24': true}, stage2: {'DL 0-24': true} },
        fields: { stage: 'Medium/Low/Low' },
        opts: {
          exclude: [
            "Cyclops Barbarian", // CC boss
            "Centaur Ranger", // GGT boss
            "Tri-dra", // DL boss
            "Red Coat Bear", // GGT med mice
            "Rift Tiger", // GGT med mice
            "Nomadic Warrior", // GGT med mice
            "Winged Harpy", // DL med mice
            "Tree Troll", // DL med mice
            "Medicine", // DL med mice
            ]
          }
      } ]

module.exports = {
  default: {
    location: utils.genVarField('location', 'Whisker Woods Rift'),
    cheese: utils.genVarField('cheese', [
      "Magical String",
      "Brie String",
      "Swiss String",
    ]),
  },
  series: [
    // Low/Low/Low
    {
      charm: [{ vars: { charm: { Gnarled: true }}, fields: { charm: "Gnarled" } }],
      config: low_low_low_config
    },
    {
      charm: [{vars: { charm: { Cherry: true }}, fields: { charm: "Cherry" } }],
      config: low_low_low_config
    },
    {
      charm: [{vars: { charm: { Stagnant: true }}, fields: { charm: "Stagnant" } }],
      config: low_low_low_config
    },
    {
      charm: [{vars: { charm: { Stagnant: false, Cherry: false, Gnarled: false }}}],
      config: low_low_low_config
    },
    // Mid/Low/Low
    {
      charm: [{ vars: { charm: { Gnarled: true }}, fields: { charm: "Gnarled" } }],
      config: mid_low_low_config
    },
    {
      charm: [{vars: { charm: { Cherry: true }}, fields: { charm: "Cherry" } }],
      config: mid_low_low_config
    },
    {
      charm: [{vars: { charm: { Stagnant: true }}, fields: { charm: "Stagnant" } }],
      config: mid_low_low_config
    },
    {
      charm: [{vars: { charm: { Stagnant: false, Cherry: false, Gnarled: false }}}],
      config: mid_low_low_config
    }

  ]
}
