var ht = require('horntracker-client')
var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Elub Shore
 */
module.exports = [
  {
    base: genVarField('location', 'Elub Shore', {
      vars: {
        // Isle Idol Trap increase drops of seashells, savoury vegetables, delicious stones and seeds
        trap: {'Isle Idol': false},
        // Tribal Kaboom Base increase drops of seashells, savoury vegetables, delicious stones and seeds
        base: {'Tribal Kaboom': false}
      },
      opts: {
        include_items: [
          'Ancient Relic',
          'Blue Pepper Seed',
          'Seashell',
          'SUPER|brie+'
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [
      'Alchemist', 'Alnitak', 'Black Widow', 'Champion', 'Elub Chieftain', 'Mystic', 'Pack', 'Protector',
      'Scout', 'Soothsayer', 'Taleweaver', 'Vanquisher'
    ])
  }
]
