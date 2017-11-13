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
  { // Reanimated Carver
    location: genVarField('location', 'Zokor'),
    loot: [ { opts: { include_items: [ 'Divine Orb', 'Lantern Oil' ], min_qty: 0.01 } } ],
    mouse: genVarField('mouse', 'Reanimated Carver')
  },
  { // farming
    location: genVarField('location', 'Zokor'),
    special: [ {
      // exclude snfc because we handle it in the processor
      vars: { charm: { 'Super Nightshade Farming Charm': false } },
      post_process: bonusLootProcessor
    } ],
    loot: [ {
      opts: {
        include_items: [
          'Cavern Fungus',
          'Nightshade'
        ],
        min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', [
      'Mush Monster', 'Mushroom Harvester', 'Nightshade Fungalmancer', 'Nightshade Nanny',
    ])
  },
  { // fealty
    location: genVarField('location', 'Zokor'),
    loot: [ {
      opts: {
        include_items: [
          'Ancient Relic',
          'Divine Orb',
          'Flawed Orb',
          'Flawless Orb',
          'Infused Plate',
          'Plate of Fealty',
          'Simple Orb'
        ],
        min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', [
      'Battle Cleric', 'Dark Templar', 'Drudge', 'Masked Pikeman', 'Mind Tearer', 'Paladin Weapon Master', 'Sir Fleekio', 'Solemn Soldier'
    ])
  },
  { // scholar
    location: genVarField('location', 'Zokor'),
    loot: [ {
      opts: {
        include_items: [
          'Ancient Relic',
          'Divine Orb',
          'Flawed Orb',
          'Flawless Orb',
          'Infused Plate',
          'Scholar Scroll',
          'Simple Orb'
        ],
        min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', [
      'Ancient Scribe', 'Ethereal Guardian', 'Mystic Guardian', 'Mystic Herald', 'Mystic Scholar', 'Sanguinarian', 'Soul Binder', 'Summoning Scholar'
    ])
  },
  { // tech
    location: genVarField('location', 'Zokor'),
    loot: [ {
      opts: {
        include_items: [
          'Ancient Relic',
          'Divine Orb',
          'Flawed Orb',
          'Flawless Orb',
          'Infused Plate',
          'Tech Power Core',
          'Simple Orb'
        ],
        min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', [
      'Ash Golem', 'Automated Stone Sentry', 'Exo-Tech', 'Fungal Technomorph', 'Manaforge Smith', 'Matron of Machinery', 'RR-8', 'Tech Golem'
    ])
  },
  { // treasure
    location: genVarField('location', 'Zokor'),
    loot: [ {
      opts: {
        include_items: [
          'Ancient Relic',
          'Divine Orb',
          'Flawed Orb',
          'Flawless Orb',
          'Infused Plate',
          'Plate of Fealty',
          'Scholar Scroll',
          'Tech Power Core',
          'Simple Orb',
          'Unstable Crystal'
        ],
        min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', [
      'Hired Eidolon', 'Matron of Wealth', 'Mimic', 'Molten Midas', 'Treasure Brawler'
    ])
  },
  { // minotaur
    location: genVarField('location', 'Zokor'),
    loot: [ {
      opts: {
        include_items: [
          'Ancient Relic',
          'Baitkeep Charm',
          'Cavern Fungus',
          'Diamond',
          'Diamond Boost Charm',
          'Divine Orb',
          'Enigmatic Core',
          'Essence of Destruction',
          'Flawless Orb',
          'Forgotten Charm',
          'Gemstone',
          'Gemstone Boost Charm',
          'Lantern Oil',
          'Nightshade',
          'Nightshade Farming Charm',
          'Plate of Fealty',
          'Really, Really Shiny Precious Gold',
          'Scholar Scroll',
          'Scrap Metal',
          'Shuffler\'s Cube',
          'Simple Orb',
          'Tech Power Core',
          'Temporal Shadow Plate',
          'Ultimate Attraction Charm',
          'Ultimate Charm',
          'Ultimate Luck Charm',
          'Ultimate Lucky Power Charm',
          'Ultimate Power Charm',
          'Ultimate Spore Charm',
          'Unstable Charm'
        ],
        min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', 'Retired Minotaur')
  }
]
