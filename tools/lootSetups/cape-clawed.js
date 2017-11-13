var ht = require('horntracker-client')
var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Cape Clawed
 */
module.exports = [
  {
    base: genVarField('location', 'Cape Clawed', {
      vars: {
        // Isle Idol Trap increase drops of seashells, savoury vegetables, delicious stones and seeds
        trap: {'Isle Idol': false},
        // Tribal Kaboom Base increase drops of seashells, savoury vegetables, delicious stones and seeds
        base: {'Tribal Kaboom': false}
      },
      opts: {
        include_items: [
          'Ancient Relic',
          'Delicious Stone',
          'Flawless Orb',
          'Savoury Vegetables',
          'Seashell',
          'Stale SUPER|brie+'
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [
      'Aged', 'Alchemist', 'Caretaker', 'Elder', 'Grandfather', 'Healer', 'Narrator', 'Nibbler', 'Pathfinder',
      'Scout', 'Shipwrecked', 'Taleweaver', 'Trailblazer', 'Wordsmith'
    ])
  }
]
