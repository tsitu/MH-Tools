var _ = require('lodash')
var htpop = require('./htpop')
var Promise = require('bluebird')

var locations = {
  37: 'Town of Gnawnia',
  41: 'Mountain',
  45: 'Dojo',
  75: 'Fiery Warpath',
  114: 'Muridae Market',
  296: 'Slushy Shoreline',
  327: 'Gnawnia Rift',
  329: 'Sunken City',
  339: 'Fungal Cavern',
  378: 'Moussu Picchu',
}

var total = 0

function print (req) {
  return req.then(function (data) {
    data.forEach(function (row) {
      total += Math.round(row.attraction * row.sample)
      console.log(
        (row.location || '-') + ',' + (row.phase || '-') + ',' +
        (row.cheese || '-') + ',' +
        (row.charm || '-') + ',' +
        (Math.round(row.attraction * 10000) / 100) + '%' + ',' +
        row.mouse + ',' +
        row.sample
      )
    })
  })
}

console.log('Location,Phase,Cheese,Charm,Attraction Rate,Mouse,Sample Size')

Promise.all(_.map(locations, function (name, id) {
  var loc = {}
  loc[ id ] = { exclude: false }
  return print(htpop({
    Location: loc,
    // Ghastly Galleon Gouda
    Cheese: { 156: { exclude: false } },
  }, {
    retry: true,
    location: name,
    cheese: 'Ghastly Galleon Gouda',
  }).then(function (data) {
    console.error(name, ':', data.length && data[ 0 ].sample || 0)
    return data
  }))
})).finally(function () {
  console.error('Total hunts', total)
})
