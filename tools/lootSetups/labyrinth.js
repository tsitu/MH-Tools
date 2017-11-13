var utils = require('./_utils')
var genVarField = utils.genVarField

var BONUS_CONFIG = {
  Nightshade: [
    { qty: 1, fields: { charm: 'Nightshade Farming Charm' } },
    { qty: 0, qty2: 1, fields: { charm: 'Super Nightshade Farming Charm' } }
  ]
}

var bonusLootProcessor = utils.genBonusLootProcessor(BONUS_CONFIG)

/**
 * Labyrinth
 */
module.exports = [
  {
    location: genVarField('location', 'Labyrinth'),
    special: [{
      // exclude snfc because we handle it in the processor
      vars: { charm: { 'Super Nightshade Farming Charm': false } },
      post_process: bonusLootProcessor
    }],
    loot: [ {
      opts: {
        include_items: [
          'Cavern Fungus',
          'Divine Orb',
          'Flawed Orb',
          'Lantern Oil',
          'Nightshade',
          'Simple Orb'
        ],
        min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', [
      'Corridor Bruiser', 'Lost', 'Lost Legionnaire', 'Mush Monster', 'Mushroom Harvester', 'Nightshade Nanny', 'Reanimated Carver'
    ])
  }
]
