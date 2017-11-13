var ht = require('horntracker-client')
var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Lagoon
 * @primary Splintered Wood, Scrap Metal, Orbs
 * @boss Silth
 */
module.exports = [
  { // common
    base: genVarField('location', 'Lagoon', {
      opts: {
        include_items: [ 'Splintered Wood', 'Scrap Metal', 'Simple Orb', 'Flawless Orb', 'Divine Orb' ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [ 'Cyclops', 'Goblin', 'Harpy', 'Shaman', 'Treant' ])
  },
  { // Black Widow, Hydra, Silth, Troll
    base: genVarField('location', 'Lagoon', {
      opts: {
        include_items: [
          'Ancient Relic',
          'Bolt of Cloth',
          'Brie Cheese',
          'Cheddar Cheese',
          'Divine Orb',
          'Gnarled Cheese',
          'Marble Cheese',
          'Rope',
          'Scrap Metal',
          'Simple Orb',
          'Splintered Wood',
          'SUPER|brie+',
          'Swiss Cheese',
          'Wicked Gnarly Cheese',
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [ 'Black Widow', 'Hydra', 'Silth', 'Troll' ])
  }
]
