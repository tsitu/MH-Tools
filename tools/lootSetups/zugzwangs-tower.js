var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Zugzwang's Tower
 */
module.exports = [
  {
    base: genVarField('location', 'Zugzwang\'s Tower', { opts: { include_items: 'Ancient Relic', min_qty: 0.01 } }),
    mouse: genVarField('mouse', [ 'Chess Master' ])
  }
]
