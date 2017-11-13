var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Twisted Garden
 */
module.exports = [
  {
    location: genVarField('location', 'Twisted Garden'),
    // phase: [
    //   { vars: { 'Vial State': { 'Filling': true } }, fields: { phase: 'Not Poured' } },
    //   { vars: { 'Vial State': { 'Dumped': true } }, fields: { phase: 'Poured' } }
    // ],
    special: [ { vars: { base: { hothouse: false, living: false } } } ],
    loot: [ {
      opts: {
        include_items: [
          'Aleth Essence',
          'Ancient Relic',
          'Ber Essence ',
          'Cynd Essence',
          'Dol Essence',
          'Graveblossom Petal'
        ],
        min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', [
      'Barkshell', 'Camofusion', 'Dehydrated', 'Fungal Spore', 'Shattered Carmine', 'Thorn', 'Twisted Carmine',
      'Twisted Hotcakes', 'Twisted Lilly'
    ])
  }
]
