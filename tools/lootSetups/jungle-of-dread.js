var ht = require('horntracker-client')
var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Jungle of Dread
 */
module.exports = [
  {
    base: genVarField('location', 'Jungle of Dread', {
      vars: {
        // Cackle Lantern Trap increase drops of fire salt
        trap: { 'Cackle Lantern': false },
        // Cackle Charms increase drops of fire salt
        charm: { 'Cackle': false }
      },
      opts: {
        include_items: [ 'Fire Salt', 'Runic Potion' ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [ 'Chitinous', 'Fetid Swamp', 'Jurassic', 'Magma Carrier', 'Primal', 'Stonework Warrior' ])
  },
  {
    base: genVarField('location', 'Jungle of Dread', {
      opts: {
        include_items: [ 'Vanilla Bean', 'Flawed Orb', 'Simple Orb' ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [ 'Pygmy Wrangler', 'Swarm of Pygmy Mice' ])
  }
]
