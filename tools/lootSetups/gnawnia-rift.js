var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Gnawnia Rift
 */
module.exports = [
  { // standard cheese
    base: genVarField('location', 'Gnawnia Rift'),
    loot: [ {
      opts: {
        include_items: [
          'Ionized Salt',
          'Magical String Cheese',
          'Magic Essence',
          'Riftiago Potion',
        ],
        min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', [
      'Agitated Gentle Giant', 'Dream Drifter', 'Excitable Electric', 'Micro', 'Mighty Mole', 'Supernatural'
    ])
  },
  { // riftiago
    base: genVarField('location', 'Gnawnia Rift'),
    loot: [ {
      opts: {
        include_items: [
          'Riftgrass',
          'Rift Dust',
          'Magic Seed',
          'Flawed Orb',
          'Flawless Orb',
          'Simple Orb'
        ],
        min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', [
      'Cyborg', 'Rift Guardian', 'Shard Centurion', 'Spiritual Steel'
    ])
  },
  { // riftiago
    base: genVarField('location', 'Gnawnia Rift'),
    loot: [ {
      opts: {
        include_items: [
          'Ancient Relic',
          'Divine Orb',
          'Raw Rift Crystal'
        ],
        min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', 'Goliath Field')
  }
]
