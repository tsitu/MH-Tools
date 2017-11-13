var _ = require('lodash')
var Promise = require('bluebird')
var json2csv = require('json2csv')
var Combinatorics = require('js-combinatorics')
var ht = require('horntracker-client')

var DEFAULT_ITEM = { opts: { retry: true } }

var fields = [
  { label: 'Location', value: 'location' },
  { label: 'Phase', value: 'phase', default: '-' },
  { label: 'Trap', value: 'trap', default: '-' },
  { label: 'Base', value: 'base', default: '-' },
  { label: 'Cheese', value: 'cheese', default: '-' },
  { label: 'Charm', value: 'charm', default: '-' },
  { label: 'Mouse', value: 'mouse' },
  { label: 'Loot', value: 'loot' },
  { label: 'Qty', value: 'qty' },
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
  // gilded: [ {
  //   base: [ {
  //     vars: { mouse: { burglar: true } },
  //     fields: { mouse: 'Burglar' },
  //     items: { gilded: 'Gilded Cheese' }
  //   } ],
  //   location: [
  //     { vars: { location: { bazaar: true } }, fields: { location: 'Bazaar' } },
  //     { vars: { location: { harbour: true } }, fields: { location: 'Harbour' } },
  //     { vars: { location: { 'king\'s arms': true } }, fields: { location: 'King\'s Arms' } },
  //     { vars: { location: { 'tournament hall': true } }, fields: { location: 'Tournament Hall' } },
  //   ]
  // } ],
  //
  // special_nightshade: {
  //   base: {
  //     vars: {
  //       charm: { 'super nightshade farming charm': true },
  //       location: { 'fungal cavern': false, labyrinth: false, zokor: false }
  //     },
  //     fields: { charm: 'Super Nightshade Farming Charm' }
  //   },
  //   items: { nightshade: 'Nightshade' }
  // },
  // grift: {
  //   base: {
  //     vars: { location: { 'gnawnia rift': true }, charm: { 'rift vacuum': false, 'super rift vacuum': false } },
  //     fields: { location: 'Gnawnia Rift' }
  //   },
  //   vectors: {
  //     mouse: [
  //       { vars: { mouse: { 'Agitated Gentle Giant': true } }, fields: { mouse: 'Agitated Gentle Giant' } },
  //       { vars: { mouse: { 'Brawny': true } }, fields: { mouse: 'Brawny' } },
  //       { vars: { mouse: { 'Cyborg': true } }, fields: { mouse: 'Cyborg' } },
  //       { vars: { mouse: { 'Dream Drifter': true } }, fields: { mouse: 'Dream Drifter' } },
  //       { vars: { mouse: { 'Excitable Electric': true } }, fields: { mouse: 'Excitable Electric' } },
  //       { vars: { mouse: { 'Greyrun': true } }, fields: { mouse: 'Greyrun' } },
  //       { vars: { mouse: { 'Micro': true } }, fields: { mouse: 'Micro' } },
  //       { vars: { mouse: { 'Mighty Mole': true } }, fields: { mouse: 'Mighty Mole' } },
  //       { vars: { mouse: { 'Raw Diamond': true } }, fields: { mouse: 'Raw Diamond' } },
  //       { vars: { mouse: { 'Rift Guardian': true } }, fields: { mouse: 'Rift Guardian' } },
  //       { vars: { mouse: { 'Riftweaver': true } }, fields: { mouse: 'Riftweaver' } },
  //       { vars: { mouse: { 'Shard Centurion': true } }, fields: { mouse: 'Shard Centurion' } },
  //       { vars: { mouse: { 'Spiritual Steel': true } }, fields: { mouse: 'Spiritual Steel' } },
  //       { vars: { mouse: { 'Supernatural': true } }, fields: { mouse: 'Supernatural' } },
  //       { vars: { mouse: { 'Wealth': true } }, fields: { mouse: 'Wealth' } },
  //     ]
  //   },
  //   items: {
  //     mist: 'Calcified Rift Mist',
  //     potion: 'Riftiago Potion',
  //     grass: 'Riftgrass',
  //     dust: 'Riftdust',
  //     seed: 'Magic seed'
  //   }
  // }
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
        fields: fields
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
        return ht
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
