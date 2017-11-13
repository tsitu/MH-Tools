var ht = require('horntracker-client')
var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Claw Shot City
 */
module.exports = [
  {
    base: genVarField('location', 'Claw Shot City', {
      opts: {
        include_items: [
          'Flawed Orb',
          'Fool\'s Gold',
          'Sheriff\'s Badge Charm'
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [ 'Bounty Hunter', 'Prospector', 'Pyrite' ])
  }
]
