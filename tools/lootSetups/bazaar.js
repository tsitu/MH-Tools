var ht = require('horntracker-client')
var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Bazaar
 * @primary none
 * @boss Master Burglar
 */
module.exports = [
  { // regular
    base: genVarField('location', 'Bazaar', {
      opts: {
        include_items: [
          'Ancient Relic',
          'Brie Cheese',
          'Flawless Orb',
          'Gilded Cheese',
          'SUPER|brie+'
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [ 'Black Widow', 'Burglar', 'Master Burglar', 'Nibbler' ])
  }
]
