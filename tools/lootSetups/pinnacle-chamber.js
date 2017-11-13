var ht = require('horntracker-client')
var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Pinnacle Chamber
 * @primary master ... shard
 * @boss master of the cheese ...
 */
module.exports = [
  { // MoJo
    base: genVarField('location', 'Pinnacle Chamber', { opts: { include_items: 'Onyx Stone' } }),
    mouse: genVarField('mouse', 'Master of the Dojo')
  },
  { // SoJo
    base: genVarField('location', 'Pinnacle Chamber', {
      opts: {
        include_items: [
          'Ancient Relic',
          'Divine Orb',
          'Master\'s Seal',
          'Onyx Stone'
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', 'Dojo Sensei')
  }
]
