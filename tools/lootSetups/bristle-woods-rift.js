var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Bristle Woods Rift
 */
module.exports = [
  { // zones
    location: genVarField('location', 'Bristle Woods Rift'),
    phase: [
      { vars: { stage: { 'Acolyte': true } }, fields: { phase: 'Acolyte' } },
      { vars: { stage: { 'Ancient Lab': true } }, fields: { phase: 'Ancient Lab' } },
      { vars: { stage: { 'Entrance': true } }, fields: { phase: 'Entrance' } },
      { vars: { stage: { 'Frozen Alcove': true } }, fields: { phase: 'Frozen Alcove' } },
      { vars: { stage: { 'Furnace Room': true } }, fields: { phase: 'Furnace Room' } },
      { vars: { stage: { 'Gearworks': true } }, fields: { phase: 'Gearworks' } },
      { vars: { stage: { 'Guard Barracks': true } }, fields: { phase: 'Guard Barracks' } },
      { vars: { stage: { 'Hidden Treasury': true } }, fields: { phase: 'Hidden Treasury' } },
      { vars: { stage: { 'Ingress': true } }, fields: { phase: 'Ingress' } },
      { vars: { stage: { 'Lucky Tower': true } }, fields: { phase: 'Lucky Tower' } },
      { vars: { stage: { 'Pursuer Mousoleum': true } }, fields: { phase: 'Pursuer Mousoleum' } },
      { vars: { stage: { 'Runic Laboratory': true } }, fields: { phase: 'Runic Laboratory' } },
      { vars: { stage: { 'Security': true } }, fields: { phase: 'Security' } },
      { vars: { stage: { 'Timewarp': true } }, fields: { phase: 'Timewarp' } },
    ],
    specials: [ {
      vars: { charm: { 'Rift Vacuum Charm': false } }
    } ],
    loot: [ {
      opts: {
        include_items: [
          'Ancient Relic',
          'Ancient String Cheese Potion',
          'Clockwork Cog',
          'Portal Scrambler',
          'Quantum Quartz',
          'Rift Antiskele Charm',
          'Rift Vacuum Charm',
          'Rift Wealth Charm',
          'Runic String Cheese Potion',
          'Super Rift Vacuum Charm',
          'Time Sand',
          'Timesplit Charm',
          'Timesplit Rune',
          'Tiny Sprocket'
        ],
        min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', [
      'Absolute Acolyte', 'Carrion Medium', 'Chamber Cleaver', 'Chronomaster', 'Clockwork Timespinner', 'Dread Knight',
      'Epoch Golem', 'Harbinger of Death', 'Portal Paladin', 'Portal Plunderer', 'Portal Pursuer', 'Record Keeper',
      'Record Keeper\'s Assistant', 'Sentient Slime', 'Shackled Servant', 'Skeletal Champion', 'Timeless Lich',
      'Timelost Thaumaturge', 'Timeslither Pythoness', 'Vigilant Ward'
    ])
  }
]
