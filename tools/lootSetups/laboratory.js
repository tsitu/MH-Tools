var genVarField = require('./_utils').genVarField

/**
 * Laboratory - primary loot is radioactive potions, bosses - Black Widow and Monster
 */
module.exports = [
  { // radioactive blue cheese drops
    base: genVarField('location', 'Laboratory', { opts: { include_items: [ 'Radioactive Blue Cheese Potion' ] } }),
    mouse: genVarField('mouse', [ 'Bionic', 'Granite', 'Steel' ]),
    charm: [ // scientist's charm affects radioactive potion drops
      { vars: { charm: { 'scientist\'s': true } }, fields: { charm: 'Scientist\'s Charm' } },
      { vars: { charm: { 'scientist\'s': false } }, fields: { charm: '-' } }
    ]
  },
  { // monster
    base: [ {
      vars: { location: { laboratory: true }, mouse: { monster: true } },
      fields: { location: 'Laboratory', mouse: 'Monster' },
      opts: { min_qty: 0.01 }
    } ]
  },
  { // black widow
    base: [ {
      vars: { location: { laboratory: true }, mouse: { 'Black Widow': true } },
      fields: { location: 'Laboratory', mouse: 'Black Widow' },
      opts: { min_qty: 0.01 }
    } ]
  },
  { // other loot
    base: genVarField('location', 'Laboratory', {
      opts: { min_qty: 0.01, exclude_items: [ 'Radioactive Blue Cheese Potion' ] }
    }),
    mouse: genVarField('mouse', [
      'Bionic', 'Burglar', 'Dwarf', 'Granite', 'Mutated Brown', 'Mutated Grey', 'Mutated White', 'Steel', 'Zombie'
    ]),
  }
]
