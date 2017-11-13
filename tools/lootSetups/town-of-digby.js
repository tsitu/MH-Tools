var ht = require('horntracker-client')
var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Town of Digby
 * @primary Splintered Wood, Scrap Metal, Orbs
 * @boss Silth
 */
module.exports = [
  { // regular
    base: genVarField('location', 'Town of Digby', {
      opts: {
        include_items: [
          'Ancient Relic',
          'Marble Cheese',
          'Meteorite Piece',
          'Simple Orb',
          'SUPER|brie+',
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [ 'Black Widow', 'Diamond', 'Gold', 'Granite', 'Mole', 'Nibbler' ])
  },
  { // limelight - living shards
    base: genVarField('location', 'Town of Digby', { opts: { include_items: 'Living Shard', min_qty: 0.01 } }),
    mouse: genVarField('mouse', [ 'Itty-Bitty Burroughs', 'Lambent Crystal', 'Subterranean' ])
  },
  { // Big Bad Burroughs
    base: genVarField('location', 'Town of Digby', {
      opts: {
        include_items: [
          'Ancient Relic',
          'Coal',
          'Limelight Cheese',
          'Living Shard',
          'Meteorite Piece',
          'Scrap Metal'
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', 'Big Bad Burroughs')
  },
  { // Nugger
    base: genVarField('location', 'Town of Digby', {
      opts: {
        include_items: [
          'Ancient Relic',
          'Limelight Cheese',
          'Onyx Stone',
          'Scrap Metal'
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', 'Nugget')
  }
]
