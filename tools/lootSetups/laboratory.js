var genVarField = require('./_utils').genVarField

/**
 * Laboratory - primary loot is radioactive potions, bosses - Black Widow and Monster
 */
module.exports = [
  { // radioactive blue cheese drops
    base: genVarField('location', 'Laboratory', {
      opts: {
        include_items: 'Radioactive Blue Cheese Potion',
        min_qty: 0.01
      }
    }),
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
      opts: {
        min_qty: 0.01,
        include_items: [
          'Ancient Relic',
          'Brie Cheese',
          'Cheddar Cheese',
          'Greater Radioactive Blue Potion',
          'Living Shard',
          'Marble Cheese',
          'Swiss Cheese'
        ]
      }
    } ]
  },
  { // black widow
    base: [ {
      vars: { location: { laboratory: true }, mouse: { 'Black Widow': true } },
      fields: { location: 'Laboratory', mouse: 'Black Widow' },
      opts: {
        min_qty: 0.01,
        include_items: [
          'Ancient Relic',
          'SUPER|brie+'
        ]
      }
    } ]
  },
  { // burglar
    base: genVarField('location', 'Laboratory', {
      opts: {
        min_qty: 0.01,
        include_items: [ 'Brie Cheese', 'Flawless Orb', 'Gilded Cheese' ],
      }
    }),
    mouse: genVarField('mouse', 'Burglar')
  }
]
