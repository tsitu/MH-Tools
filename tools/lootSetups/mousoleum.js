var ht = require('horntracker-client')
var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Mousoleum
 * @primary Radioactive Blue Cheese/Potions
 * @boss Monster, Lycan
 */
module.exports = [
  { // regular
    base: genVarField('location', 'Mousoleum', {
      opts: {
        include_items: [
          'Ancient Relic',
          'Brie Cheese',
          'Cheddar Cheese',
          'Greater Radioactive Blue Potion',
          'King\'s Credits',
          'Living Shard',
          'Marble Cheese',
          'Meteorite Piece',
          'Radioactive Blue Cheese',
          'Radioactive Blue Potion',
          'Radioactive Sludge',
          'Rotten Charm',
          'Swiss Cheese',
          'SUPER|brie+',
          'Super Rotten Charm',
          'Unstable Charm',
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [ 'Black Widow', 'Grave Robber', 'Lycan', 'Monster', 'Vampire', 'Zombot Unipire' ])
  }
]
