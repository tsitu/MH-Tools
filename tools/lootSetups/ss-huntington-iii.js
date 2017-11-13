var ht = require('horntracker-client')
var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * S.S. Huntington III
 */
module.exports = [
  {
    base: genVarField('location', 'S.S. Huntington III', {
      opts: {
        include_items: [
          'Ancient Relic',
          'Bolt of Cloth',
          'Flawless Orb',
          'Rope',
          'Scrap Metal',
          'Simple Orb',
          'Splintered Wood'
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [ 'Cook', 'Hydra', 'Leviathan', 'Nibbler', 'Shelder', 'Shipwrecked', 'Squeaken' ])
  }
]
