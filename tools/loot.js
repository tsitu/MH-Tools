var _ = require('lodash')
var Promise = require('bluebird')
var json2csv = require('json2csv')
var Combinatorics = require('js-combinatorics')
var ht = require('horntracker-client')
var jt = require('jacksmhtools-client')

var DEFAULT_ITEM = { opts: { retry: true } }

var fields = [
  { label: 'Location', value: 'location' },
  { label: 'Phase', value: 'phase' },
  { label: 'Trap', value: 'trap' },
  { label: 'Base', value: 'base' },
  { label: 'Cheese', value: 'cheese' },
  { label: 'Charm', value: 'charm' },
  { label: 'Mouse', value: 'mouse' },
  { label: 'Loot', value: 'loot', default: '' },
  { label: 'Qty', value: 'qty', default: '' },
  { label: 'Sample', value: 'sample', default: '' }
]

var setups = {
  // Gnawnia
  // Valour
  'kings-arms': require('./lootSetups/kings-arms'),
  'tournament-hall': require('./lootSetups/tournament-hall'),
  'kings-gauntlet': require('./lootSetups/kings-gauntlet'),
  // Whisker Woods
  'calm-clearing': require('./lootSetups/calm-clearing'),
  'great-gnarled-tree': require('./lootSetups/great-gnarled-tree'),
  'lagoon': require('./lootSetups/lagoon'),
  // Burroughs
  'laboratory': require('./lootSetups/laboratory'),
  'town-of-digby': require('./lootSetups/town-of-digby'),
  'mousoleum': require('./lootSetups/mousoleum'),
  'bazaar': require('./lootSetups/bazaar'),
  // Furoma
  'training-grounds': require('./lootSetups/training-grounds'),
  'dojo': require('./lootSetups/dojo'),
  'meditation-room': require('./lootSetups/meditation-room'),
  'pinnacle-chamber': require('./lootSetups/pinnacle-chamber'),
  // Bristle Woods
  'catacombs': require('./lootSetups/catacombs'),
  'forbidden-grove': require('./lootSetups/forbidden-grove'),
  'acolyte-realm': require('./lootSetups/acolyte-realm'),
  // Tribal Isles
  'cape-clawed': require('./lootSetups/cape-clawed'),
  'elub-shore': require('./lootSetups/elub-shore'),
  'nerg-plains': require('./lootSetups/nerg-plains'),
  'derr-dunes': require('./lootSetups/derr-dunes'),
  'jungle-of-dread': require('./lootSetups/jungle-of-dread'),
  'dracano': require('./lootSetups/dracano'),
  'balacks-cove': require('./lootSetups/balacks-cove'),
  // Varmint Valley
  'claw-shot-city': require('./lootSetups/claw-shot-city'),
  'gnawnian-express-station': require('./lootSetups/gnawnian-express-station'),
  'fort-rox': require('./lootSetups/fort-rox'),
  // Rodentia
  'ss-huntington-iii': require('./lootSetups/ss-huntington-iii'),
  'slushy-shoreline': require('./lootSetups/slushy-shoreline'),
  'seasonal-garden': require('./lootSetups/seasonal-garden'),
  'zugzwangs-tower': require('./lootSetups/zugzwangs-tower'),
  'crystal-library': require('./lootSetups/crystal-library'),
  'iceberg': require('./lootSetups/iceberg'),
  'sunken-city': require('./lootSetups/sunken-city'),
  // Sandtail Desert
  'fiery-warpath': require('./lootSetups/fiery-warpath'),
  'muridae-market': require('./lootSetups/muridae-market'),
  'living-garden': require('./lootSetups/living-garden'),
  'lost-city': require('./lootSetups/lost-city'),
  'sand-dunes': require('./lootSetups/sand-dunes'),
  'twisted-garden': require('./lootSetups/twisted-garden'),
  'cursed-city': require('./lootSetups/cursed-city'),
  'sand-crypts': require('./lootSetups/sand-crypts'),
  // Hollow Heights
  'fungal-cavern': require('./lootSetups/fungal-cavern'),
  'labyrinth': require('./lootSetups/labyrinth'),
  'zokor': require('./lootSetups/zokor'),
  'moussu-picchu': require('./lootSetups/moussu-picchu'),
  // Rift
  'gnawnia-rift': require('./lootSetups/gnawnia-rift'),
  'burroughs-rift': require('./lootSetups/burroughs-rift'),
  'whisker-woods-rift': require('./lootSetups/whisker-woods-rift'),
  'furoma-rift': require('./lootSetups/furoma-rift'),
  'bristle-woods-rift': require('./lootSetups/bristle-woods-rift'),
}

function convertLoot (base, loot) {
  return _.extend({}, base, {
    loot: loot.name,
    qty: loot.avgPerCatch,
    chance: loot.chance,
    sample: loot.sample
  })
}

function toCsv (rows) {
  return Promise
    .resolve(rows)
    .then(function (rows) { return Promise.all(rows) })
    .then(function (rows) {
      return json2csv({
        data: rows,
        fields: fields,
        defaultValue: '-'
      })
    })
}

var series = []

if (process.argv.length > 2) {
  for (var i = 2, l = process.argv.length; i < l; i++) {
    var key = process.argv[ i ].toLowerCase()
    if (setups[ key ]) {
      series = series.concat(setups[ key ])
    } else {
      console.error('Unknown config ' + key)
      process.exit(100)
    }
  }
} else {
  series = _.reduce(setups, function (a, b) { return a.concat(b) })
}

Promise
  .mapSeries(series, function (setup) {
    var vectors = _.values(setup)
    if (!vectors || !vectors.length) vectors = [ [ {} ] ]
    var p = Combinatorics.cartesianProduct.apply(Combinatorics, vectors)
    return Promise
      .mapSeries(p.toArray(), function (iter) {
        var item = iter.reduce(function (opts, vec) {
          return _.defaultsDeep(opts, vec)
        }, _.cloneDeep(DEFAULT_ITEM))

        console.error('requesting', JSON.stringify(item.vars))
        return jt
          .getLootFoundData(item.vars, item.opts)
          .then(function (loot) {
            if (item.pre_process)
              return item.pre_process(loot, item)
            return loot
          })
          .map(convertLoot.bind(null, item.fields))
          .then(function (loot) {
            if (item.post_process)
              return item.post_process(loot, item)
            return loot
          })
      })
      .reduce(function (a, b) { return a.concat(b) })
  })
  .reduce(function (a, b) { return a.concat(b) })
  .then(toCsv)
  .then(function (output) { console.log(output) })
