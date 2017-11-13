var ht = require('horntracker-client')
var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Balack's Cove
 */
module.exports = [
  {
    base: genVarField('location', 'Balack\'s Cove', {
      // Nutcracker Nuisance Trap increases the chance that liches will drop twice the loot
      vars: { trap: { 'Nutcracker Nuisance': false } },
      opts: {
        include_items: [
          'Ancient Relic',
          'Bottled-Up Rage',
          'Divine Orb',
          'Flawless Orb',
          'Pinch of Annoyance',
          'Raisins of Wrath'
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [ 'Balack the Banished', 'Derr Lich', 'Elub Lich', 'Nerg Lich' ])
  }
]
