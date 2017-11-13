var ht = require('horntracker-client')
var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Gnawnian Express Station
 */
module.exports = [
  {
    base: genVarField('location', 'Gnawnian Express Station', {
      opts: {
        include_items: [
          'Ancient Relic',
          'Copper Bead',
          'Dusty Coal Charm',
          'Fool\'s Gold',
          'Fuel Nugget',
          'Iron Pellet',
          'Magmatic Crystal Charm',
          'Raider-B-Gone Mouse Repellent',
          'Royal Supply Crate',
          'Tin Scrap'
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [
      'Automorat', 'Black Powder Thief', 'Cannonball', 'Coal Shoveller', 'Crate Camo', 'Cute Crate Carrier',
      'Dangerous Duo', 'Fuel', 'Hookshot', 'Magmatic Crystal Thief', 'Magmatic Golem', 'Mouse With No Name',
      'Sharpshooter', 'Steel Horse Rider', 'Stoutgear', 'Stowaway', 'Supply Hoarder', 'Train Engineer',
      'Warehouse Manager'
    ])
  }
]
