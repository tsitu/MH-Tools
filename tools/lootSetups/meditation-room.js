var ht = require('horntracker-client')
var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Meditation Room
 * @primary master ... shard
 * @boss master of the cheese ...
 */
module.exports = [
  {
    base: genVarField('location', 'Meditation Room', {
      opts: {
        include_items: [
          'Master Belt Shard',
          'Master Claw Shard',
          'Master Fang Shard'
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [ 'Master of the Cheese Belt', 'Master of the Cheese Claw', 'Master of the Cheese Fang' ])
  }
]
