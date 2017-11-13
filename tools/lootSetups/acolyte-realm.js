var ht = require('horntracker-client')
var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Acolyte Realm
 * @primary
 * @boss
 */
module.exports = [
  {
    base: genVarField('location', 'Acolyte Realm', {
      // Runic base boosts rune drops
      vars: { base: { runic: false } },
      opts: {
        include_items: [
          'Ancient Potion',
          'Ancient Relic',
          'Rune',
          'Runic Potion',
          'Stale Cheese',
          'SUPER|brie+'
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [
      'Acolyte', 'Black Widow', 'Chrono', 'Mutated Brown', 'Mutated Grey', 'Mutated White', 'Sorcerer'
    ])
  }
]
