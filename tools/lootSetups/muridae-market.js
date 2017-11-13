var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Muridae Market
 */
module.exports = [
  {
    location: genVarField('location', 'Muridae Market'),
    loot: [ {
      opts: {
        include_items: [
          'Coconut Timber',
          'Flawless Orb',
          'Ionized Salt',
          'Limestone Brick',
          'Papyrus',
          'Scrap Metal',
          'Shard of Glass',
          'Simple Orb'
        ],
        min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', [
      'Blacksmith', 'Desert Architect', 'Glass Blower', 'Limestone Miner', 'Lumberjack', 'Mage Weaver'
    ])
  }
]
