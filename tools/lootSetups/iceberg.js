var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Iceberg
 */
module.exports = [
  {
    base: genVarField('location', 'Iceberg', {
      opts: {
        include_items: [
          'Sticky Charm',
          'Wax Charm'
        ],
        min_qty: 0.01
      }
    }),
    phase: genVarField('iceberg section', [ 'treacherous tunnels', 'brutal bulwark', 'bombing run', 'the mad depths' ]),
    mouse: genVarField('mouse', [
      'Chipper',
      'Heavy Blaster',
      'Iceblade', 'Iceblock', 'Icebreaker', 'Incompetent Ice Climber',
      'Living Salt',
      'Mammoth',
      'Polar Bear',
      'Saboteur', 'Snow Bowler', 'Snow Slinger', 'Snow Soldier', 'Snowblind', 'Stickybomber',
      'Water Wielder', 'Wolfskie',
      'Yeti'
    ])
  },
  { // generals
    base: genVarField('location', 'Iceberg', {
      opts: {
        include_items: [
          'Ancient Relic',
          'Bottled Cold Fusion',
          'Sticky Charm',
          'Wax Charm'
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [ 'General Drheller', 'Lady Coldsnap', 'Lord Splodington', 'Princess Fist' ])
  },
  { // icewing's lair
    base: genVarField('location', 'Iceberg', {
      vars: { 'iceberg section': { 'icewing\'s lair': true } },
      opts: {
        include_items: [
          'Ancient Relic',
          'Drill Charge',
          'Sticky Charm',
          'War Scrap',
          'Wax Charm'
        ],
        min_qty: 0.01
      }
    }),
    mouse: genVarField('mouse', [ 'Frostlance Guard', 'Frostwing Commander', 'Icewing' ])
  },
  { // deep
    base: genVarField('mouse', 'Deep', { opts: { include_items: [ 'Ancient Relic', ], min_qty: 0.01 } }),
  }
]
