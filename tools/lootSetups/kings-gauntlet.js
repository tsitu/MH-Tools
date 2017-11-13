var ht = require('horntracker-client')
var utils = require('./_utils')
var genVarField = utils.genVarField

var BONUS_CONFIG = {
  'Gauntlet Potion Tier 2': { qtyMply: 2, fields: { trap: 'Ancient Gauntlet' } },
  'Gauntlet Potion Tier 3': { qtyMply: 2, fields: { trap: 'Festive Gauntlet Crusher' } },
}

var bonusLootProcessor = utils.genBonusLootProcessor(BONUS_CONFIG)

/**
 * King's Gauntlet
 * @primary Tier Potions
 * @boss Eclipse
 */
module.exports = [
  { // tier 1
    base: genVarField('location', 'King\'s Gauntlet', {
      // Ancient Gauntlet gives double drops
      vars: { trap: { 'Ancient Gauntlet': false } },
      opts: {
        include_items: 'Gauntlet Potion Tier 2',
        min_qty: 0.01
      },
      post_process: bonusLootProcessor
    }),
    mouse: genVarField('mouse', [
      'Clockwork Samurai', 'Hapless Marionette', 'Puppet Master', 'Sock Puppet Ghost', 'Toy Sylvan', 'Wound Up White'
    ])
  },
  { // tier 2
    base: genVarField('location', 'King\'s Gauntlet', {
      // Festive Gauntlet Crusher gives double drops
      vars: { trap: { 'Festive Gauntlet Crusher': false } },
      opts: {
        include_items: 'Gauntlet Potion Tier 3',
        min_qty: 0.01
      },
      post_process: bonusLootProcessor
    }),
    mouse: genVarField('mouse', [
      'Bandit', 'Escape Artist', 'Impersonator', 'Lockpick', 'Rogue', 'Stealth'
    ])
  },
  { // tier 3
    base: genVarField('location', 'King\'s Gauntlet', {
      opts: {
        include_items: 'Gauntlet Potion Tier 4',
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [
      'Berserker', 'Cavalier', 'Fencer', 'Knight', 'Page', 'Phalanx'
    ])
  },
  { // tier 4
    base: genVarField('location', 'King\'s Gauntlet', {
      opts: {
        include_items: 'Gauntlet Potion Tier 5',
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [
      'Cowbell', 'Dancer', 'Drummer', 'Fiddler', 'Guqin Player'
    ])
  },
  { // tier 5
    base: genVarField('location', 'King\'s Gauntlet', {
      opts: {
        include_items: 'Gauntlet Potion Tier 6',
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [
      'Aquos', 'Black Mage', 'Ignis', 'Terra', 'Zephyr'
    ])
  },
  { // tier 6
    base: genVarField('location', 'King\'s Gauntlet', {
      opts: {
        include_items: 'Gauntlet Potion Tier 7',
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [
      'Paladin', 'Sacred Shrine', 'White Mage'
    ])
  },
  { // tier 7
    base: genVarField('location', 'King\'s Gauntlet', {
      opts: {
        include_items: [ 'Gauntlet Potion Tier 8', 'Ancient Relic' ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [
      'Fiend', 'Necromancer'
    ])
  },
  { // tier 8
    base: genVarField('location', 'King\'s Gauntlet', {
      opts: {
        include_items: 'Ancient Relic',
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', 'Eclipse')
  }
]
