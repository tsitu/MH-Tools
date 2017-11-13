var genVarField = require('./_utils').genVarField

/**
 * Catacombs
 * @primary ancient potions, radioactive blue
 * @boss none
 */
module.exports = [
  { // regular
    base: genVarField('location', 'Catacombs', {
      opts: {
        include_items: [
          'Ancient Potion',
          'Ancient Relic',
          'Brie Cheese',
          'Cheddar Cheese',
          'Coal',
          'Corrupted Radioactive Blue Potion',
          'Living Shard',
          'Marble Cheese',
          'Radioactive Blue Cheese',
          'Scrap Metal',
          'Stale Cheese',
          'SUPER|brie+',
          'Swiss Cheese'
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [
      'Black Widow', 'Keeper', 'Keeper\'s Assistant', 'Lycan', 'Monster', 'Mummy', 'Scavenger', 'Spider', 'Terror Knight'
    ])
  },
  { // Grave Robber
    base: genVarField('location', 'Catacombs', {
      opts: {
        include_items: [
          'Antiskele Charm',
          'King\'s Credits',
          'Rotten Charm',
          'Scrap Metal',
          'Super Rotten Charm',
          'Unstable Charm'
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', 'Grave Robber')
  },
  { // Zombot Unipire
    base: genVarField('location', 'Catacombs', {
      opts: {
        include_items: [
          'Corrupted Radioactive Blue Potion',
          'King\'s Credits',
          'Radioactive Sludge'
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', 'Zombot Unipire')
  }
]
