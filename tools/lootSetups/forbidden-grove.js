var ht = require('horntracker-client')
var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Forbidden Grove
 * @primary Rune
 * @boss
 */
module.exports = [
  {
    base: genVarField('location', 'Forbidden Grove', {
      // Runic base boosts rune drops
      vars: { base: { runic: false } },
      opts: {
        include_items: [
          'Ancient Relic',
          'Divine Orb',
          'Radioactive Blue Cheese',
          'Rune',
          'Runic Potion',
          'Scrap Metal',
          'Stale Cheese',
          'SUPER|brie+'
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [
      'Black Widow', 'Gargoyle', 'Gate Guardian', 'Golem', 'Lycan', 'Mutated Brown', 'Mutated Grey', 'Mutated White',
      'Realm Ripper', 'Reaper', 'Scavenger', 'Sorcerer'
    ])
  }
]
