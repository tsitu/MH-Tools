var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Whisker Woods Rift
 */
module.exports = [
  { // regular mice
    base: genVarField('location', 'Whisker Woods Rift'),
    loot: [ {
      opts: {
        include_items: [
          'Flawless Orb',
          'Rift Cherries',
          'Rift-torn Roots',
          'Sap-filled Thorns',
          'Simple Orb'
        ], min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', [
      // Crazed Clearing
      'Bloomed Sylvan', 'Cherry Sprite', 'Cranky Caterpillar', 'Mossy Moosker',
      'Red-Eyed Watcher Owl', 'Spirit Fox', 'Treant Queen',
      // Gigantic Gnarled Tree
      'Fungal Frog', 'Karmachameleon', 'Naturalist', 'Nomadic Warrior',
      'Red Coat Bear', 'Rift Tiger', 'Spirit of Balance',
      // Deep Lagoon
      'Crazed Goblin', 'Grizzled Silth', 'Medicine', 'Tree Troll', 'Twisted Treant', 'Water Sprite', 'Winged Harpy'
    ])
  },
  { // mini bosses
    base: genVarField('location', 'Whisker Woods Rift'),
    loot: [ {
      opts: {
        include_items: [
          'Ancient Relic',
          'Creamy Gnarled Sap',
          'Crumbly Rift Salts',
          'Divine Orb',
          'Flawless Orb',
          'Rift Cherries',
          'Rift-torn Roots',
          'Sap-filled Thorns',
          'Tasty Spider Mould'
        ], min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', [
      'Centaur Ranger', 'Cyclops Barbarian', 'Tri-dra'
    ])
  },
  { // Gilded Leaf
    base: genVarField('location', 'Whisker Woods Rift'),
    loot: [ {
      opts: {
        include_items: [
          'Brie String Cheese',
          'Cherry Charm',
          'Divine Orb',
          'Flawless Orb',
          'Gnarled Charm',
          'Magical String Cheese',
          'Rift Cherries',
          'Rift-torn Roots',
          'Sap-filled Thorns',
          'Simple Orb',
          'Stagnant Charm',
          'Swiss String Cheese'
        ], min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', [
      'Gilded Leaf'
    ])
  },
  { // MBW
    base: genVarField('location', 'Whisker Woods Rift'),
    special: [ {
      vars: { charm: { 'Rift Vacuum Charm': false } }
    } ],
    loot: [ {
      opts: {
        include_items: [
          'Ancient Relic',
          'Divine Orb',
          'Rift Cherries',
          'Rift-torn Roots',
          'Sap-filled Thorns',
          'Widow\'s Web'
        ], min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', [
      'Monstrous Black Widow'
    ])
  },
  { // MBW
    base: genVarField('location', 'Whisker Woods Rift'),
    loot: [ {
      opts: {
        include_items: [
          'Ancient Relic',
          'Divine Orb',
          'Rift Cherries',
          'Rift-torn Roots',
          'Sap-filled Thorns',
          'Widow\'s Web',
        ], min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', [
      'Monstrous Black Widow'
    ])
  },
  {
    base: genVarField('location', 'Whisker Woods Rift'),
    phase: [ {
      vars: {
        'crazed clearing status': { high: true },
        'gigantic gnarled tree status': { high: true },
        'deep lagoon status': { high: true },
      },
      fields: { phase: 'High/High/High' }
    } ],
    special: [ { vars: { charm: { 'Rift Vacuum Charm': false } } } ],
    loot: [ {
      opts: {
        include_items: [
          'Rift Ultimate Power Charm',
          'Rift Ultimate Luck Charm',
          'Bolt of Cloth',
          'Calcified Rift Mist',
          'Cherry Charm',
          'Gnarled Charm',
          'Gnarled Potion',
          'Greater Wicked Gnarly Potion',
          'Luck Charm',
          'Lucky Power Charm',
          'Magical String Cheese',
          'Power Charm',
          'Radioactive Sludge',
          'Rift Power Charm',
          'Rope',
          'Scrap Metal',
          'Splintered Wood',
          'Stagnant Charm',
          'Super Luck Charm',
          'Super Power Charm',
          'Super Rotten Charm',
          'Taunting Charm',
          'Wicked Gnarly Potion'
        ], min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', [
      'Monstrous Black Widow'
    ])
  }
]
