var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Lost City
 */
module.exports = [
  {
    location: genVarField('location', 'Lost City'),
    // phase: [
    //   { vars: { 'Has Stampede': { 0: true } }, fields: { phase: 'No Stampede' } },
    //   { vars: { 'Has Stampede': { 1: true } }, fields: { phase: 'Stampede' } }
    // ],
    special: [ { vars: { base: { hothouse: false, living: false } } } ],
    loot: [ {
      opts: {
        include_items: [
          'Aleth Essence',
          'Ber Essence ',
          'Cynd Essence',
          'Duskshade Petal'
        ],
        min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', [
      'Dunehopper', 'Grubling', 'Grubling Herder', 'Quesodillo', 'Sand Pilgrim', 'Spiky Devil'
    ])
  }
]
