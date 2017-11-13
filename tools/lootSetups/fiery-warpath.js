var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Fiery Warpath
 */
module.exports = [
  {
    location: genVarField('location', 'Fiery Warpath'),
    loot: [ {
      opts: {
        include_items: [
          'Ancient Relic',
          'Desert Horseshoe',
          'Flameshard',
          'Heatproof Mage Cloth',
          'Simple Orb'
        ],
        min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', [
      'Gargantuamouse', 'Inferno Mage', 'Sand Cavalry', 'Magmarage', 'Sandwing Cavalry', 'Theurgy Warden'
    ])
  },
  { // warmonger
    location: genVarField('location', 'Fiery Warpath'),
    victories: [ { vars: { victories: { 0: false } } } ],
    mouse: genVarField('mouse', 'Warmonger'),
    charm: [
      { vars: { charm: { monger: true } }, fields: { charm: 'Monger Charm' } },
      { vars: { charm: { monger: false } } }
    ],
    loot: [ {
      opts: {
        include_items: [
          'Ancient Relic',
          'Flameshard',
          'Lucky Power Charm',
          'Oasis Bead',
          'Sandblasted Metal',
          'Simple Orb',
          'Sphynx Crystal',
          'Super Luck Charm',
          'Super Power Charm',
          'Ultimate Luck Charm',
          'Ultimate Power Charm',
          'Warpath Commander\'s Charm'
        ],
        min_qty: 0.01
      }
    } ]
  }
]
