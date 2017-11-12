var ht = require('horntracker-client')
var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Calm Clearing
 * @primary Cherry Potion, Splintered Wood
 * @boss Cherry
 */
module.exports = [
  { // common
    base: genVarField('location', 'Calm Clearing', {
      opts: {
        min_qty: 0.01,
        include_items: [
          'Ancient Relic',
          'Brie Potion',
          'Cheddar Cheese',
          'Cherry Potion',
          'Flawless Orb',
          'Greater Brie Potion',
          'Marble Cheese',
          'Simple Orb',
          'Splintered Wood',
          'SUPER|brie+',
          'Swiss Cheese',
        ],
      }
    }),
    mouse: genVarField('mouse', [
      'Bear', 'Black Widow', 'Chameleon', 'Cherry', 'Cyclops', 'Dwarf', 'Eagle Owl', 'Elven Princess', 'Foxy', 'Frog',
      'Moosker', 'Shaman', 'Sylvan', 'Treant', 'Wiggler'
    ])
  },
]
