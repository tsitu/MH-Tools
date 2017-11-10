var _ = require('lodash')
var Promise = require('bluebird')
var json2csv = require('json2csv')
var Combinatorics = require('js-combinatorics')
var ht = require('horntracker-client')

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
  gilded: {
    base: {
      vars: { mouse: { burglar: true } },
      fields: { mouse: 'Burglar' },
    },
    vectors: {
      location: [
        { vars: { location: { bazaar: true } }, fields: { location: 'Bazaar' } },
        { vars: { location: { harbour: true } }, fields: { location: 'Harbour' } },
        { vars: { location: { 'king\'s arms': true } }, fields: { location: 'King\'s Arms' } },
        { vars: { location: { 'tournament hall': true } }, fields: { location: 'Tournament Hall' } },
        { vars: { location: { 'laboratory': true } }, fields: { location: 'Laboratory' } },
      ]
    },
    items: { gilded: 'Gilded Cheese' }
  },
  rbpotions: {
    base: {
      vars: { location: { laboratory: true } },
      fields: { location: 'Laboratory' }
    },
    vectors: {
      mouse: [
        { vars: { mouse: { bionic: true } }, fields: { mouse: 'Bionic' } },
        { vars: { mouse: { granite: true } }, fields: { mouse: 'Granite' } },
        { vars: { mouse: { steel: true } }, fields: { mouse: 'Steel' } }
      ],
      charm: [
        { vars: { charm: { 'scientist\'s': true } }, fields: { charm: 'Scientist\'s Charm' } },
        { vars: { charm: { 'scientist\'s': false } }, fields: { charm: '-' } }
      ]
    },
    items: { potion: 'Radioactive Blue Cheese Potion' }
  },
  grbpotions: {
    base: {
      vars: { location: { laboratory: true }, mouse: { monster: true } },
      fields: { location: 'Laboratory', mouse: 'Monster' }
    },
    vectors: {},
    items: { potion: 'Greater Radioactive Blue Potion' }
  },
  fc: {
    base: {
      vars: { location: { 'fungal cavern': true }, charm: { 'super nighshade charm': false } },
      fields: { location: 'Fungal Cavern' }
    },
    vectors: {
      mouse: [
        { vars: { mouse: { 'Bitter Root': true } }, fields: { mouse: 'Bitter Root' } },
        { vars: { mouse: { 'Cavern Crumbler': true } }, fields: { mouse: 'Cavern Crumbler' } },
        { vars: { mouse: { 'Crag Elder': true } }, fields: { mouse: 'Crag Elder' } },
        { vars: { mouse: { 'Crystal Behemoth': true } }, fields: { mouse: 'Crystal Behemoth' } },
        { vars: { mouse: { 'Crystal Cave Worm': true } }, fields: { mouse: 'Crystal Cave Worm' } },
        { vars: { mouse: { 'Crystal Controller': true } }, fields: { mouse: 'Crystal Controller' } },
        { vars: { mouse: { 'Crystal Golem': true } }, fields: { mouse: 'Crystal Golem' } },
        { vars: { mouse: { 'Crystal Lurker': true } }, fields: { mouse: 'Crystal Lurker' } },
        { vars: { mouse: { 'Crystal Observer': true } }, fields: { mouse: 'Crystal Observer' } },
        { vars: { mouse: { 'Crystal Queen': true } }, fields: { mouse: 'Crystal Queen' } },
        { vars: { mouse: { 'Crystalback': true } }, fields: { mouse: 'Crystalback' } },
        { vars: { mouse: { 'Crystalline Slasher': true } }, fields: { mouse: 'Crystalline Slasher' } },
        { vars: { mouse: { 'Diamondhide': true } }, fields: { mouse: 'Diamondhide' } },
        { vars: { mouse: { 'Dirt Thing': true } }, fields: { mouse: 'Dirt Thing' } },
        { vars: { mouse: { 'Floating Spore': true } }, fields: { mouse: 'Floating Spore' } },
        { vars: { mouse: { 'Funglore': true } }, fields: { mouse: 'Funglore' } },
        { vars: { mouse: { 'Gemorpher': true } }, fields: { mouse: 'Gemorpher' } },
        { vars: { mouse: { 'Gemstone Worshipper': true } }, fields: { mouse: 'Gemstone Worshipper' } },
        { vars: { mouse: { 'Huntereater': true } }, fields: { mouse: 'Huntereater' } },
        { vars: { mouse: { 'Lumahead': true } }, fields: { mouse: 'Lumahead' } },
        { vars: { mouse: { 'Mouldy Mole': true } }, fields: { mouse: 'Mouldy Mole' } },
        { vars: { mouse: { 'Mush': true } }, fields: { mouse: 'Mush' } },
        { vars: { mouse: { 'Mushroom Sprite': true } }, fields: { mouse: 'Mushroom Sprite' } },
        { vars: { mouse: { 'Nightshade Masquerade': true } }, fields: { mouse: 'Nightshade Masquerade' } },
        { vars: { mouse: { 'Quillback': true } }, fields: { mouse: 'Quillback' } },
        { vars: { mouse: { 'Shattered Obsidian': true } }, fields: { mouse: 'Shattered Obsidian' } },
        { vars: { mouse: { 'Spiked Burrower': true } }, fields: { mouse: 'Spiked Burrower' } },
        { vars: { mouse: { 'Splintered Stone Sentry': true } }, fields: { mouse: 'Splintered Stone Sentry' } },
        { vars: { mouse: { 'Spore Muncher': true } }, fields: { mouse: 'Spore Muncher' } },
        { vars: { mouse: { 'Sporeticus': true } }, fields: { mouse: 'Sporeticus' } },
        { vars: { mouse: { 'Stalagmite': true } }, fields: { mouse: 'Stalagmite' } },
        { vars: { mouse: { 'Stone Maiden': true } }, fields: { mouse: 'Stone Maiden' } }
      ]
    },
    items: {
      fungus: 'Cavern Fungus',
      nightshade: 'Nightshade',
      mineral: 'Mineral',
      gemstone: 'Gemstone',
      diamond: 'Diamond',
      crystal: 'Crystal Crucible'
    }
  },
  special_nightshade: {
    base: {
      vars: {
        charm: { 'super nightshade farming charm': true },
        location: { 'fungal cavern': false, labyrinth: false, zokor: false }
      },
      fields: { charm: 'Super Nightshade Farming Charm' }
    },
    items: { nightshade: 'Nightshade' }
  },
  grift: {
    base: {
      vars: { location: { 'gnawnia rift': true }, charm: { 'rift vacuum': false, 'super rift vacuum': false } },
      fields: { location: 'Gnawnia Rift' }
    },
    vectors: {
      mouse: [
        { vars: { mouse: { 'Agitated Gentle Giant': true } }, fields: { mouse: 'Agitated Gentle Giant' } },
        { vars: { mouse: { 'Brawny': true } }, fields: { mouse: 'Brawny' } },
        { vars: { mouse: { 'Cyborg': true } }, fields: { mouse: 'Cyborg' } },
        { vars: { mouse: { 'Dream Drifter': true } }, fields: { mouse: 'Dream Drifter' } },
        { vars: { mouse: { 'Excitable Electric': true } }, fields: { mouse: 'Excitable Electric' } },
        { vars: { mouse: { 'Greyrun': true } }, fields: { mouse: 'Greyrun' } },
        { vars: { mouse: { 'Micro': true } }, fields: { mouse: 'Micro' } },
        { vars: { mouse: { 'Mighty Mole': true } }, fields: { mouse: 'Mighty Mole' } },
        { vars: { mouse: { 'Raw Diamond': true } }, fields: { mouse: 'Raw Diamond' } },
        { vars: { mouse: { 'Rift Guardian': true } }, fields: { mouse: 'Rift Guardian' } },
        { vars: { mouse: { 'Riftweaver': true } }, fields: { mouse: 'Riftweaver' } },
        { vars: { mouse: { 'Shard Centurion': true } }, fields: { mouse: 'Shard Centurion' } },
        { vars: { mouse: { 'Spiritual Steel': true } }, fields: { mouse: 'Spiritual Steel' } },
        { vars: { mouse: { 'Supernatural': true } }, fields: { mouse: 'Supernatural' } },
        { vars: { mouse: { 'Wealth': true } }, fields: { mouse: 'Wealth' } },
      ]
    },
    items: {
      mist: 'Calcified Rift Mist',
      potion: 'Riftiago Potion',
      grass: 'Riftgrass',
      dust: 'Riftdust',
      seed: 'Magic seed'
    }
  }
}

function convertLoot (base, loot) {
  return _.extend({}, base, {
    loot: loot.name,
    qty: loot.avgPerCatch,
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
      series.push(setups[ key ])
    } else {
      console.error('Unknown config ' + key)
      process.exit(100)
    }
  }
} else {
  series = _.values(setups)
}

Promise
  .mapSeries(series, function (setup) {
    var vectors = _.values(setup.vectors)
    if (!vectors || !vectors.length) vectors = [ [ {} ] ]
    var p = Combinatorics.cartesianProduct.apply(Combinatorics, vectors)
    return Promise
      .mapSeries(p.toArray(), function (iter) {
        var opts = iter.reduce(function (opts, vec) {
          return _.defaultsDeep(opts, vec)
        }, _.defaultsDeep({}, setup.base))

        console.error('requesting', JSON.stringify(opts.vars))
        return ht
          .getLootFoundData(opts.vars)
          .then(function (loots) {
            return loots.filter(function (loot) {
              return _.find(setup.items, function (item) { return item === loot.name })
            })
          })
          .map(convertLoot.bind(null, opts.fields))
      })
      .reduce(function (a, b) { return a.concat(b) })
  })
  .reduce(function (a, b) { return a.concat(b) })
  .then(toCsv)
  .then(function (output) { console.log(output) })
