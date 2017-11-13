var ht = require('horntracker-client')
var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Nerg Plains
 */
module.exports = [
  {
    base: genVarField('location', 'Nerg Plains', {
      vars: {
        // Isle Idol Trap increase drops of seashells, savoury vegetables, delicious stones and seeds
        trap: {'Isle Idol': false},
        // Tribal Kaboom Base increase drops of seashells, savoury vegetables, delicious stones and seeds
        base: {'Tribal Kaboom': false}
      },
      opts: {
        include_items: [
          'Ancient Relic',
          'Savoury Vegetables',
          'SUPER|brie+',
          'Yellow Pepper Seed'
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [
      'Alnilam', 'Beast Tamer', 'Black Widow', 'Caretaker', 'Conjurer', 'Conqueror', 'Defender', 'Finder',
      'Narrator', 'Nerg Chieftain', 'Pathfinder', 'Slayer'
    ])
  }
]
