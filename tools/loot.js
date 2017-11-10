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
      fields: { location: 'Laboratory' }
    },
    vectors: {
      charm: [
        { vars: { charm: { 'scientist\'s': true } }, fields: { charm: 'Scientist\'s Charm' } },
        { vars: { charm: { 'scientist\'s': false } }, fields: { charm: '-' } }
      ]
    },
    items: { potion: 'Greater Radioactive Blue Cheese Potion' }
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

Promise
  .mapSeries(_.values(setups), function (setup) {
    var p = Combinatorics.cartesianProduct.apply(Combinatorics, _.values(setup.vectors))
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
  .then(function (output) { console.log(output)})
