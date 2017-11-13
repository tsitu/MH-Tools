var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Furoma Rift
 */
module.exports = [
  { // regular
    base: genVarField('location', 'Furoma Rift'),
    loot: [ {
      opts: {
        include_items: [
          'Aleth Essence',
          'Divine Orb',
          'Enerchi',
          'Enerchi Charm',
          'Erupting Rift Core',
          'Flawed Orb',
          'Flawless Orb',
          'Ionized Salt',
          'Nori',
          'Rift Circuit Chips',
          'Rift Curd',
          'Scrap Metal',
          'Simple Orb'
        ],
        min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', [
      'Armored Archer', 'Dancing Assassin', 'Dumpling Delivery', 'Enlightened Labourer', 'Militant Samurai', 'Rift Guardian',
      'Shaolin Kung Fu', 'Shinobi', 'Wandering Monk'
    ])
  },
  { // students and masters
    base: genVarField('location', 'Furoma Rift'),
    loot: [ {
      opts: {
        include_items: [
          'Ancient Relic',
          'Battery Fragment',
          'Chi Belt Heirloom',
          'Chi Claw Heirloom',
          'Chi Fang Heirloom',
          'Chi Belt Token',
          'Chi Claw Token',
          'Chi Fang Token',
          'Divine Orb',
          'Enerchi',
          'Null Onyx Stone',
          'Rift Blossom Branch',
          'Rift Circuitry',
          'Simple Orb'
        ],
        min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', [
      'Student of the Chi Belt', 'Student of the Chi Claw', 'Student of the Chi Fang',
      'Master of the Chi Belt', 'Master of the Chi Claw', 'Master of the Chi Fang',
      'Grand Master of the Dojo', 'Supreme Sensei'
    ])
  },
  { // ascended elder
    base: genVarField('location', 'Furoma Rift'),
    special: [ { vars: { charm: { 'Rift Vacuum Charm': false } } } ],
    loot: [ {
      opts: {
        include_items: [
          'Ancient Relic',
          'Calcified Rift Mist',
          'Divine Orb',
          'Enerchi Charm',
          'Flawed Orb',
          'Flawless Orb',
          'Rift Circuit Chips',
          'Rift Ultimate Luck Charm',
          'Rift Ultimate Power Charm',
          'Simple Orb',
          'Unstable Broom'
        ],
        min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', 'Ascended Elder')
  }
]
