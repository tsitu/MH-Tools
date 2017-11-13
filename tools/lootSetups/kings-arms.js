var ht = require('horntracker-client')
var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * King's Arms
 * @primary none
 * @boss none
 */
module.exports = [
  { // regular
    base: genVarField('location', 'King\'s Arms', {
      opts: {
        include_items: [
          'Ancient Relic',
          'Brie Cheese',
          'Flawed Orb',
          'Gilded Cheese',
          'Simple Orb'
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [ 'Black Widow', 'Burglar', 'Longtail', 'Nibbler', 'Scruffy', 'Silvertail' ])
  }
]
