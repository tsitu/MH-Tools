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

var low_mid_low_config = [ {
        vars: { stage: {'CC 0-24': true}, stage1: {'GGT 25-49': true}, stage2: {'DL 0-24': true} },
        fields: { stage: 'Low/Medium/Low' },
        opts: {
          exclude: [
            "Cyclops Barbarian", // CC boss
            "Centaur Ranger", // GGT boss
            "Tri-dra", // DL boss
            "Red-Eyed Watcher Owl", // CC med mice
            "Treant Queen", // CC med mice
            "Spirit Fox", // CC med mice
            "Winged Harpy", // DL med mice
            "Tree Troll", // DL med mice
            "Medicine", // DL med mice
            ]
          }
      } ]

var low_low_mid_config = [ {
        vars: { stage: {'CC 0-24': true}, stage1: {'GGT 0-24': true}, stage2: {'DL 25-49': true} },
        fields: { stage: 'Low/Low/Medium' },
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
            ]
          }
      } ]

var low_mid_mid_config = [ {
        vars: { stage: {'CC 0-24': true}, stage1: {'GGT 25-49': true}, stage2: {'DL 25-49': true} },
        fields: { stage: 'Low/Medium/Medium' },
        opts: {
          exclude: [
            "Cyclops Barbarian", // CC boss
            "Centaur Ranger", // GGT boss
            "Tri-dra", // DL boss
            "Red-Eyed Watcher Owl", // CC med mice
            "Treant Queen", // CC med mice
            "Spirit Fox", // CC med mice
            ]
          }
      } ]

var mid_mid_low_config = [ {
        vars: { stage: {'CC 25-49': true}, stage1: {'GGT 25-49': true}, stage2: {'DL 0-24': true} },
        fields: { stage: 'Medium/Medium/Low' },
        opts: {
          exclude: [
            "Cyclops Barbarian", // CC boss
            "Centaur Ranger", // GGT boss
            "Tri-dra", // DL boss
            "Winged Harpy", // DL med mice
            "Tree Troll", // DL med mice
            "Medicine", // DL med mice
            ]
          }
      } ]

var mid_low_mid_config = [ {
        vars: { stage: {'CC 25-49': true}, stage1: {'GGT 0-24': true}, stage2: {'DL 25-49': true} },
        fields: { stage: 'Medium/Low/Medium' },
        opts: {
          exclude: [
            "Cyclops Barbarian", // CC boss
            "Centaur Ranger", // GGT boss
            "Tri-dra", // DL boss
            "Red Coat Bear", // GGT med mice
            "Rift Tiger", // GGT med mice
            "Nomadic Warrior", // GGT med mice
            ]
          }
      } ]


var mid_mid_mid_config = [ {
        vars: { stage: {'CC 25-49': true}, stage1: {'GGT 25-49': true}, stage2: {'DL 25-49': true} },
        fields: { stage: 'Medium/Medium/Medium' },
        opts: {
          exclude: [
            "Cyclops Barbarian", // CC boss
            "Centaur Ranger", // GGT boss
            "Tri-dra", // DL boss
            ]
          }
      } ]

var high_low_low_config = [ {
        vars: { stage: {'CC 50': true}, stage1: {'GGT 0-24': true}, stage2: {'DL 0-24': true} },
        fields: { stage: 'High/Low/Low' },
        opts: {
          exclude: [
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

var low_high_low_config = [ {
        vars: { stage: {'CC 0-24': true}, stage1: {'GGT 50': true}, stage2: {'DL 0-24': true} },
        fields: { stage: 'Low/High/Low' },
        opts: {
          exclude: [
            "Cyclops Barbarian", // CC boss
            "Tri-dra", // DL boss
            "Red-Eyed Watcher Owl", // CC med mice
            "Treant Queen", // CC med mice
            "Spirit Fox", // CC med mice
            "Winged Harpy", // DL med mice
            "Tree Troll", // DL med mice
            "Medicine", // DL med mice
            ]
          }
      } ]

var low_low_high_config = [ {
        vars: { stage: {'CC 0-24': true}, stage1: {'GGT 0-24': true}, stage2: {'DL 50': true} },
        fields: { stage: 'Low/Low/High' },
        opts: {
          exclude: [
            "Cyclops Barbarian", // CC boss
            "Centaur Ranger", // GGT boss
            "Red-Eyed Watcher Owl", // CC med mice
            "Treant Queen", // CC med mice
            "Spirit Fox", // CC med mice
            "Red Coat Bear", // GGT med mice
            "Rift Tiger", // GGT med mice
            "Nomadic Warrior", // GGT med mice
            ]
          }
      } ]

var high_high_high_config = [ {
        vars: { stage: {'CC 50': true}, stage1: {'GGT 50': true}, stage2: {'DL 50': true} },
        fields: { stage: 'High/High/High' },
        opts: {
          include: [
            "Cyclops Barbarian",
            "Centaur Ranger",
            "Tri-dra",
            "Monstrous Black Widow",
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
    },
    // Low/Medium/Low
    {
      charm: [{ vars: { charm: { Gnarled: true }}, fields: { charm: "Gnarled" } }],
      config: low_mid_low_config
    },
    {
      charm: [{vars: { charm: { Cherry: true }}, fields: { charm: "Cherry" } }],
      config: low_mid_low_config
    },
    {
      charm: [{vars: { charm: { Stagnant: true }}, fields: { charm: "Stagnant" } }],
      config: low_mid_low_config
    },
    {
      charm: [{vars: { charm: { Stagnant: false, Cherry: false, Gnarled: false }}}],
      config: low_mid_low_config
    },
    // Low/Low/Medium
    {
      charm: [{ vars: { charm: { Gnarled: true }}, fields: { charm: "Gnarled" } }],
      config: low_low_mid_config
    },
    {
      charm: [{vars: { charm: { Cherry: true }}, fields: { charm: "Cherry" } }],
      config: low_low_mid_config
    },
    {
      charm: [{vars: { charm: { Stagnant: true }}, fields: { charm: "Stagnant" } }],
      config: low_low_mid_config
    },
    {
      charm: [{vars: { charm: { Stagnant: false, Cherry: false, Gnarled: false }}}],
      config: low_low_mid_config
    },
    // Low/Medium/Medium
    {
      charm: [{ vars: { charm: { Gnarled: true }}, fields: { charm: "Gnarled" } }],
      config: low_mid_mid_config
    },
    {
      charm: [{vars: { charm: { Cherry: true }}, fields: { charm: "Cherry" } }],
      config: low_mid_mid_config
    },
    {
      charm: [{vars: { charm: { Stagnant: true }}, fields: { charm: "Stagnant" } }],
      config: low_mid_mid_config
    },
    {
      charm: [{vars: { charm: { Stagnant: false, Cherry: false, Gnarled: false }}}],
      config: low_mid_mid_config
    },
    // Medium/Low/Medium
    {
      charm: [{ vars: { charm: { Gnarled: true }}, fields: { charm: "Gnarled" } }],
      config: mid_low_mid_config
    },
    {
      charm: [{vars: { charm: { Cherry: true }}, fields: { charm: "Cherry" } }],
      config: mid_low_mid_config
    },
    {
      charm: [{vars: { charm: { Stagnant: true }}, fields: { charm: "Stagnant" } }],
      config: mid_low_mid_config
    },
    {
      charm: [{vars: { charm: { Stagnant: false, Cherry: false, Gnarled: false }}}],
      config: mid_low_mid_config
    },
    // Medium/Medium/Low
    {
      charm: [{ vars: { charm: { Gnarled: true }}, fields: { charm: "Gnarled" } }],
      config: mid_mid_low_config
    },
    {
      charm: [{vars: { charm: { Cherry: true }}, fields: { charm: "Cherry" } }],
      config: mid_mid_low_config
    },
    {
      charm: [{vars: { charm: { Stagnant: true }}, fields: { charm: "Stagnant" } }],
      config: mid_mid_low_config
    },
    {
      charm: [{vars: { charm: { Stagnant: false, Cherry: false, Gnarled: false }}}],
      config: mid_mid_low_config
    },
    // Medium/Medium/Medium
    {
      charm: [{ vars: { charm: { Gnarled: true }}, fields: { charm: "Gnarled" } }],
      config: mid_mid_mid_config
    },
    {
      charm: [{vars: { charm: { Cherry: true }}, fields: { charm: "Cherry" } }],
      config: mid_mid_mid_config
    },
    {
      charm: [{vars: { charm: { Stagnant: true }}, fields: { charm: "Stagnant" } }],
      config: mid_mid_mid_config
    },
    {
      charm: [{vars: { charm: { Stagnant: false, Cherry: false, Gnarled: false }}}],
      config: mid_mid_mid_config
    },
    // High/Low/Low
    {
      charm: [{ vars: { charm: { Gnarled: true }}, fields: { charm: "Gnarled" } }],
      config: high_low_low_config
    },
    {
      charm: [{vars: { charm: { Cherry: true }}, fields: { charm: "Cherry" } }],
      config: high_low_low_config
    },
    {
      charm: [{vars: { charm: { Stagnant: true }}, fields: { charm: "Stagnant" } }],
      config: high_low_low_config
    },
    {
      charm: [{vars: { charm: { Stagnant: false, Cherry: false, Gnarled: false }}}],
      config: high_low_low_config
    },
    // Low/High/Low
    {
      charm: [{ vars: { charm: { Gnarled: true }}, fields: { charm: "Gnarled" } }],
      config: low_high_low_config
    },
    {
      charm: [{vars: { charm: { Cherry: true }}, fields: { charm: "Cherry" } }],
      config: low_high_low_config
    },
    {
      charm: [{vars: { charm: { Stagnant: true }}, fields: { charm: "Stagnant" } }],
      config: low_high_low_config
    },
    {
      charm: [{vars: { charm: { Stagnant: false, Cherry: false, Gnarled: false }}}],
      config: low_high_low_config
    },
    // Low/Low/High
    {
      charm: [{ vars: { charm: { Gnarled: true }}, fields: { charm: "Gnarled" } }],
      config: low_low_high_config
    },
    {
      charm: [{vars: { charm: { Cherry: true }}, fields: { charm: "Cherry" } }],
      config: low_low_high_config
    },
    {
      charm: [{vars: { charm: { Stagnant: true }}, fields: { charm: "Stagnant" } }],
      config: low_low_high_config
    },
    {
      charm: [{vars: { charm: { Stagnant: false, Cherry: false, Gnarled: false }}}],
      config: low_low_high_config
    },
    // High/High/High
    {
      charm: [{ vars: { charm: { Taunting: true }}, fields: { charm: "Taunting" } }],
      config: high_high_high_config,
      cheese: utils.genVarField('cheese', [
        "Magical String",
        "Brie String",
        "Swiss String",
        "Lactrodectus Lancashire"
      ]),
    },
    {
      charm: [{vars: { charm: { Stagnant: false, Cherry: false, Gnarled: false, Taunting: false }}}],
      config: high_high_high_config,
      cheese: utils.genVarField('cheese', [
        "Magical String",
        "Brie String",
        "Swiss String",
        "Lactrodectus Lancashire"
      ]),
    },
  ]
}
