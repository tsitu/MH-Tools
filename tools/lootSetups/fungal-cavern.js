var ht = require('horntracker-client')
var utils = require('./_utils')
var genVarField = utils.genVarField

var BONUS_CONFIG = {
  Nightshade: [
    { qty: 1, fields: { charm: 'Nightshade Farming Charm' } },
    { qty: 0, qty2: 1, fields: { charm: 'Super Nightshade Farming Charm' } }
  ],
  Mineral: { qty: 2, fields: { trap: 'Crystal Mineral Crusher Trap' } },
  Gemstone: { qty: 1, fields: { charm: 'Gemstone Boost Charm' } },
  Diamond: { qty: 1, fields: { charm: 'Diamond Boost Charm' } },
  'Crystal Crucible': { qty: 3, fields: { charm: 'Crucible Cloning Charm' } }
}

var bonusLootProcessor = utils.genBonusLootProcessor(BONUS_CONFIG)

var fungalFrodder = [
  'Bitter Root', 'Floating Spore', 'Funglore', 'Lumahead', 'Mouldy Mole', 'Mush', 'Mushroom Sprite',
  'Nightshade Masquerade', 'Quillback', 'Spiked Burrower', 'Spore Muncher', 'Sporeticus'
]
var gruyereGrazers = [
  'Cavern Crumbler', 'Crag Elder', 'Crystalline Slasher', 'Dirt Thing', 'Gemstone Worshipper',
  'Shattered Obsidian', 'Splintered Stone Sentry', 'Stone Maiden'
]
var mineralMunchers = [
  'Crystal Cave Worm', 'Crystal Controller', 'Crystalback', 'Gemorpher', 'Stalagmite'
]
var gemstoneGorgers = [
  'Crystal Golem', 'Crystal Lurker', 'Crystal Observer', 'Crystal Queen'
]
var diamondDevourers = [
  'Crystal Behemoth', 'Diamondhide', 'Huntereater'
]

/**
 * Fungal Cavern - primary loot is cavern fungus, nightshade, minerals, gemstones, diamonds and crystal crucible.
 * Bosses: Crystal Behemoth, Diamondhide, Huntereater
 * Specials: Super Nightshade Charm adds +1 nightshade as loot
 */
module.exports = [
  { // nightshade
    base: genVarField('location', 'Fungal Cavern', {
      // exclude snfc because we handle it in the processor
      vars: { charm: { 'Super Nightshade Farming Charm': false } },
      opts: { include_items: [ 'Nightshade' ], min_qty: 0.01 },
      post_process: bonusLootProcessor
    }),
    mouse: genVarField('mouse', fungalFrodder),
  },
  { // Fungal Frodders
    base: genVarField('location', 'Fungal Cavern', {
      opts: { min_qty: 0.01, include_items: [ 'Cavern Fungus', 'Flawed Orb' ], exclude_items: 'Nightshade' }
    }),
    mouse: genVarField('mouse', fungalFrodder)
  },
  { // Gruyere Grazers
    base: genVarField('location', 'Fungal Cavern', {
      opts: { min_qty: 0.01, include_items: [ 'Mineral', 'Gemstone', 'Diamond', 'Simple Orb' ] },
      post_process: bonusLootProcessor
    }),
    mouse: genVarField('mouse', gruyereGrazers)
  },
  { // Mineral Munchers
    base: genVarField('location', 'Fungal Cavern', {
      opts: { min_qty: 0.01, include_items: [ 'Gemstone', 'Simple Orb', 'Flawless Orb' ] },
      post_process: bonusLootProcessor
    }),
    mouse: genVarField('mouse', mineralMunchers)
  },
  { // Gemstone Gorgers
    base: genVarField('location', 'Fungal Cavern', {
      opts: { min_qty: 0.01, include_items: [ 'Diamond', 'Flawed Orb' ] },
      post_process: bonusLootProcessor
    }),
    mouse: genVarField('mouse', gemstoneGorgers)
  },
  { // Diamond Devourers
    base: genVarField('location', 'Fungal Cavern', {
      opts: { min_qty: 0.01, include_items: [ 'Ancient Relic', 'Crystal Crucible', 'Divine Orb' ] },
      post_process: bonusLootProcessor
    }),
    mouse: genVarField('mouse', diamondDevourers),
  }
]
