var ht = require('horntracker-client')
var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Dracano
 */
module.exports = [
  {
    base: genVarField('location', 'Dracano', {
      opts: {
        include_items: [
          'Ancient Relic',
          'Coconut Milk',
          'Delicious Stone',
          'Dragon Ember',
          'Fire Salt',
          'Savoury Vegetables',
          'Seashell'
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [ 'Draconic Warden', 'Dragon', 'Whelpling' ])
  }
]
