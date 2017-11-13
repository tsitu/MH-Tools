var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Slushy Shoreline
 */
module.exports = [
  {
    base: genVarField('location', 'Slushy Shoreline', {
      opts: {
        include_items: [
          'Flawed Orb',
          'Frosty Metal',
          'Heating Oil',
          'Simple Orb',
          'War Scrap',
          'Wire Spool'
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [
      'Chipper', 'Icebreaker', 'Incompetent Ice Climber', 'Living Ice', 'Polar Bear', 'Saboteur', 'Snow Bowler',
      'Snow Slinger', 'Snow Sniper', 'Snow Soldier', 'Yeti'
    ])
  }
]
