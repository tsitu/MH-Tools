var ht = require('horntracker-client')
var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Fort Rox
 */
module.exports = [
  { // day mice
    base: genVarField('location', 'Fort Rox', {
      opts: {
        include_items: [
          'Fool\'s Gold',
          'Meteorite Pieces',
          'Tower Mana'
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [
      'Hardworking Hauler', 'Meteorite Miner', 'Meteorite Mover', 'Meteorite Snacker', 'Mining Materials Manager',
      'Mischievous Meteorite Miner'
    ])
  },
  { // night mice
    base: genVarField('location', 'Fort Rox', {
      opts: {
        include_items: [
          'Bloodstone',
          'Divine Orb',
          'Flawless Orb',
          'Fool\'s Gold',
          'Howlite',
          'Meteorite Pieces',
          'Simple Orb',
          'Tower Mana'
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [
      'Alpha Weremouse', 'Arcane Summoner', 'Cursed Taskmaster', 'Hypnotized Gunslinger', 'Meteorite Golem',
      'Meteorite Mystic', 'Mischievous Wereminer', 'Night Shift Materials Manager', 'Night Watcher',
      'Reveling Lycanthrope', 'Wealthy Werewarrior', 'Werehauler', 'Wereminer'
    ])
  },
  { // dawn mice
    base: genVarField('location', 'Fort Rox', {
      opts: {
        include_items: [
          'Ancient Relic',
          'Animatronic Bird',
          'Bloodstone',
          'Dawn Dust',
          'Divine Orb',
          'Flawless Orb',
          'Howlite',
          'Meteorite Pieces',
          'Silver Bolt',
          'Simple Orb',
          'Super Cactus Charm',
          'Ultimate Charm',
          'Ultimate Luck Charm',
          'Ultimate Lucky Power Charm',
          'Ultimate Power Charm'
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [ 'Dawn Guardian', 'Monster of the Meteor' ])
  },
  { // heart of the meteor
    base: genVarField('location', 'Fort Rox', { opts: { min_qty: 0.01 } }),
    mouse: genVarField('mouse', [ 'Heart of the Meteor' ])
  }
]
