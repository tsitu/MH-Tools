var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Seasonal Garden
 */
module.exports = [
  {
    base: genVarField('location', 'Seasonal Garden', { opts: { include_items: 'Ancient Relic', min_qty: 0.01 } }),
    mouse: genVarField('mouse', [ 'Winter Mage', 'Spring Familiar', 'Summer Mage', 'Fall Familiar' ])
  }
]
