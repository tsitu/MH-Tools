var ht = require('horntracker-client')
var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Dojo
 * @primary token of the cheese ...
 * @boss student of the cheese ...
 */
module.exports = [
  { // regular
    base: genVarField('location', 'Dojo', {
      opts: {
        include_items: [
          'Ancient Relic',
          'Simple Orb',
          'Splintered Wood'
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [ 'Assassin', 'Diamond', 'Gold', 'Worker' ])
  },
  {
    base: genVarField('location', 'Dojo', {
      opts: {
        include_items: [
          'Token of the Cheese Belt',
          'Token of the Cheese Claw',
          'Token of the Cheese Fang'
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [ 'Student of the Cheese Belt', 'Student of the Cheese Claw', 'Student of the Cheese Fang' ])
  }
]
