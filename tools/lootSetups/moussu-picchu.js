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
 * Moussu Picchu
 */
module.exports = [
  { // base
    location: genVarField('location', 'Moussu Picchu'),
    special: [ {
      // exclude snfc because we handle it in the processor
      vars: { charm: { 'Super Nightshade Farming Charm': false } },
      post_process: bonusLootProcessor
    } ],
    loot: [ {
      opts: {
        include_items: [
          'Cavern Fungus',
          'Fire Bowl Fuel',
          'Nightshade',
          'Rainy Potion',
          'Windy Potion'
        ], min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', [
      'Breeze Borrower', 'Cloud Collector', 'Homeopathic Apothecary', 'Nightshade Flower Girl', 'Nightshade Maiden',
      'Rainwater Purifier', 'Spore Salesman', 'Windy Farmer'
    ])
  },
  { // rainy
    location: genVarField('location', 'Moussu Picchu'),
    loot: [ {
      opts: {
        include_items: [
          'Dragonbane Charm',
          'Fire Bowl Fuel',
          'Shadowvine'
        ],
        min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', [
      'Rain Collector', 'Rain Wallower', 'Rain Summoner', 'Monsoon Maker', 'Rainmancer'
    ])
  },
  { // windy
    location: genVarField('location', 'Moussu Picchu'),
    loot: [ {
      opts: {
        include_items: [
          'Arcanevine',
          'Dragonbane Charm',
          'Fire Bowl Fuel'
        ],
        min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', [
      'Charming Chimer', 'Cycloness', 'Fluttering Flutist', 'Wind Warrior', 'Wind Watcher'
    ])
  },
  { // dragons
    location: genVarField('location', 'Moussu Picchu'),
    loot: [ {
      opts: {
        include_items: [
          'Dragon Scales',
          'Minerals'
        ],
        min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', [
      'Dragoon', 'Thunder Strike', 'Thundering Watcher', 'Thunderlord', 'Violet Stormchild'
    ])
  },
  { // ful'mina
    location: genVarField('location', 'Moussu Picchu'),
    loot: [ {
      opts: {
        exclude_items: [
          'Treasure Map Clue'
        ],
        min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', 'Ful\'Mina, The Mountain Queen')
  }
]
