var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Lost City
 */
module.exports = [
  {
    location: genVarField('location', 'Lost City'),
    // phase: [
    //   { vars: { 'Lost City Curse': { 0: true } }, fields: { phase: 'Curse Lifted' } },
    //   { vars: { 'Lost City Curse': { 1: true } }, fields: { phase: 'Cursed' } }
    // ],
    special: [ { vars: { base: { hothouse: false, living: false } } } ],
    loot: [ {
      opts: {
        include_items: [
          'Aleth Essence',
          'Ber Essence ',
          'Cynd Essence',
          'Dreamfluff Herbs'
        ],
        min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', [
      'Essence Collector', 'Ethereal Enchanter', 'Ethereal Engineer', 'Ethereal Librarian', 'Ethereal Thief'
    ])
  }
]
