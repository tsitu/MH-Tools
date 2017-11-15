var ht = require('horntracker-client')
var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Burroughs Rift
 */
module.exports = [
  { // standard cheese, mist 0
    base: genVarField('location', 'Burroughs Rift'),
    // phase: [ { vars: { 'mist tier': { 'none': true } } } ],
    loot: [ { opts: { include_items: 'Mist Canister', min_qty: 0.01 } } ],
    mouse: genVarField('mouse', [
      'Amplified Brown', 'Amplified Grey', 'Amplified White', 'Automated Sentry', 'Cybernetic Specialist',
      'Doktor', 'Evil Scientist', 'Portable Generator', 'Rift Bio Engineer', 'Surgeon Bot'
    ])
  },
  { // standard cheese, mist yellow-green
    base: genVarField('location', 'Burroughs Rift'),
    // phase: [ { vars: { 'mist tier': { 'yellow': true, 'green: true } } } ],
    loot: [ { opts: { include_items: [ 'Mist Canister', 'Terre Ricotta Potion' ], min_qty: 0.01 } } ],
    mouse: genVarField('mouse', [
      'Count Vampire', 'Phase Zombie', 'Prototype', 'Robat', 'Tech Ravenous Zombie', 'Lycanoid', 'Revenant',
      'Zombot Unipire the Third'
    ])
  },
  { // terre-ricotta cheese, mist yellow-green
    base: genVarField('location', 'Burroughs Rift'),
    // phase: [ { vars: { 'mist tier': { 'yellow': true, 'green: true } } } ],
    loot: [ { opts: { include_items: [ 'Mist Canister', 'Polluted Parmesan Potion' ], min_qty: 0.01 } } ],
    mouse: genVarField('mouse', [
      'Clump', 'Cyber Miner', 'Itty Bitty Rifty Burroughs', 'Pneumatic Dirt Displacement', 'Rifterranian',
      'Boulder Biter', 'Lambent', 'Master Exploder'
    ])
  },
  { // Tomb Exhumer
    base: genVarField('location', 'Burroughs Rift'),
    special: [ {
      vars: { charm: { 'Rift Vacuum Charm': false } }
    } ],
    loot: [ {
      opts: {
        include_items: [
          'Calcified Rift Mist',
          'Enerchi Charm',
          'King\'s Credit',
          'Mist Canister',
          'Radioactive Curd',
          'Rift Antiskele Charm',
          'Rift Ultimate Lucky Power Charm',
          'Rift Vacuum Charm',
          'Tomb Stones'
        ], min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', 'Tomb Exhumer')
  },
  { // bosses
    base: genVarField('location', 'Burroughs Rift'),
    loot: [ { opts: { include_items: 'Rift Circuitry', min_qty: 0.01 } } ],
    mouse: genVarField('mouse', [
      'Monstrous Abomination', 'Big Bad Behemoth Burroughs',
      'Assassin Beast', 'Plutonium Tentacle', 'Menace of the Rift'
    ])
  }
]
