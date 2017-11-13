var ht = require('horntracker-client')
var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Tournament Hall
 * @primary none
 * @boss none
 */
module.exports = [
  { // regular
    base: genVarField('location', 'Tournament Hall', {
      opts: {
        include_items: [
          'Ancient Relic',
          'Brie Cheese',
          'Gilded Cheese',
          'Simple Orb'
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [ 'Burglar', 'Nibbler', 'Silvertail' ])
  }
]
