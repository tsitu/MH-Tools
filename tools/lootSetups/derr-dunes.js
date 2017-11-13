var ht = require('horntracker-client')
var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Derr Dunes
 */
module.exports = [
  {
    base: genVarField('location', 'Derr Dunes', {
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
          'Red Pepper Seed',
          'SUPER|brie+'
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [
      'Black Widow', 'Derr Chieftain', 'Gladiator', 'Grunt', 'Guardian', 'Healer',
      'Mintaka', 'Renegade', 'Seer', 'Spellbinder', 'Trailblazer', 'Wordsmith'
    ])
  }
]
