var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Crystal Library
 */
module.exports = [
  {
    base: genVarField('location', 'Crystal Library', {
      opts: {
        include_items: [ 'Ancient Relic', 'Magic Essence' ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [ 'Aether', 'Tome Sprite', 'Zurreal the Eternal' ])
  }
]
