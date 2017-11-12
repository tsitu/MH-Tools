var ht = require('horntracker-client')
var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Great Gnarled Tree
 * @primary Gnarled Potion, Splintered Wood
 * @boss Curious Chemist
 */
module.exports = [
  { // Gnarled Potion
    base: genVarField('location', 'Great Gnarled Tree', {
      opts: { include_items: 'Gnarled Potion', min_qty: 0.01 }
    }),
    mouse: genVarField('mouse', [ 'Bear', 'Centaur', 'Chameleon', 'Frog' ])
  },
  { // Splintered Wood
    base: genVarField('location', 'Great Gnarled Tree', {
      opts: { include_items: 'Splintered Wood', min_qty: 0.01 }
    }),
    mouse: genVarField('mouse', [ 'Shaman', 'Treant' ])
  },
  { // Curious Chemist
    base: genVarField('location', 'Great Gnarled Tree', {
      opts: { include_items: 'Wicked Gnarly Potion', min_qty: 0.01 }
    }),
    mouse: genVarField('mouse', 'Curious Chemist')
  },
  { // Black Widow
    base: genVarField('location', 'Great Gnarled Tree', {
      opts: { include_items: ['Wicked Gnarly Cheese', 'Gnarled Cheese', 'Ancient Relic', 'SUPER|brie+'], min_qty: 0.01 }
    }),
    mouse: genVarField('mouse', 'Black Widow')
  },
  { // Nibbler
    base: genVarField('location', 'Great Gnarled Tree', {
      opts: { include_items: ['Ancient Relic'], min_qty: 0.01 }
    }),
    mouse: genVarField('mouse', 'Nibbler')
  }
]
