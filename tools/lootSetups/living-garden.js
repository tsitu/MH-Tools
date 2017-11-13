var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Living Garden
 */
module.exports = [
  {
    location: genVarField('location', 'Living Garden'),
    // phase: [
    //   { vars: { 'Bucket State': { 'Filling': true } }, fields: { phase: 'Not Poured' } },
    //   { vars: { 'Bucket State': { 'Dumped': true } }, fields: { phase: 'Poured' } }
    // ],
    special: [ { vars: { base: { hothouse: false, living: false } } } ],
    loot: [ {
      opts: {
        include_items: [
          'Aleth Essence',
          'Ber Essence ',
          'Cynd Essence',
          'Dewthief Petal'
        ],
        min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', [
      'Bark', 'Calalilly', 'Camoflower', 'Carmine the Apothecary', 'Shroom', 'Strawberry Hotcakes', 'Thirsty', 'Thistle'
    ])
  }
]
