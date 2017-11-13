var ht = require('horntracker-client')
var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Training Grounds
 * @primary none
 * @boss none
 */
module.exports = [
  {
    base: genVarField('location', 'Training Grounds', {
      opts: {
        include_items: [
          'Ancient Relic',
          'Brie Cheese',
          'SUPER|brie+',
          'Simple Orb',
          'Swiss Cheese'
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [ 'Black Widow', 'Diamond', 'Gold', 'Nibbler', 'White' ])
  }
]
