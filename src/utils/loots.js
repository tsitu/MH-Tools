"use strict";

/**
 * Extract the loot the specific mouse should drop in the given location, phase, weapon, base, cheese and charm.
 *
 * @param {{location: {phase: {mouse: {charm: {base: {trap: {cheese: {loot: number}}}}}}}}} mouseLoots
 * @param {string} locationName
 * @param {string} phaseName
 * @param {string} weaponName
 * @param {string} baseName
 * @param {string} cheeseName
 * @param {string} charmName
 * @param {string} mouseName
 * @returns {object} a list with all loots
 */
function extractMouseLoot (mouseLoots, locationName, phaseName, weaponName, baseName, cheeseName, charmName, mouseName) {
  var WEIGHTS = [ 100, 100, 100, 1, 10, 10, 10 ]
  var lootSets = {}
  var path = [ locationName, phaseName, mouseName, charmName, baseName, weaponName, cheeseName ]
  for (var i = 0, l = 1 << path.length; i < l; i++) {
    var p = [].concat(path)
    for (var j = 1, k = 0; j <= i; j = j << 1, k++) {
      if (i & j) p[ k ] = '-'
    }
    var res = extractByPath(mouseLoots, p)
    lootSets[ res.hash ] = merge(lootSets[ res.hash ] || {}, res.loot)
  }

  var loots = Object
    .keys(lootSets)
    .sort(function (a, b) { return b - a})
    .map(function (key) {return lootSets[ key ]})
    .reduce(merge)

  return loots

  function merge (a, b) {
    for (var key in b) {
      if (!b.hasOwnProperty(key)) continue
      if (key in a) continue
      a[ key ] = b[ key ]
    }
    return a
  }

  /**
   * Get value from object by resolving path.
   *
   * @param {object} obj
   * @param {string[]} path
   * @returns {*}
   *
   * @example
   * // return {c:12}
   * extractByPath({a:{b:{c:12}}}, ['a', 'b'])
   */
  function extractByPath (obj, path) {
    var hash = 0
    for (var i = 0, l = path.length; i < l && obj; i++) {
      var key = path[ i ]
      if (key !== '-' && key in obj) {
        hash += WEIGHTS[ i ]
        obj = obj[ key ]
      } else {
        obj = obj[ '-' ]
      }
    }

    return { loot: obj || {}, hash: hash }
  }
}

/**
 * Multiply each loot quantity with the multiplier and return as new object
 * @param {object} loot
 * @param {number} multiplyer
 */
function multiplyLoot (loot, multiplyer) {
  var res = {}
  for (var key in loot) {
    if (!loot.hasOwnProperty(key)) continue
    res[ key ] = loot[ key ] * multiplyer
  }
  return res
}

/**
 * Sum loots into accumulator
 * @param {object} accumulated the accumulator that will be updated
 * @param {object} addition additional loot to add to accumulator
 * @returns {object} the modified accumulator
 */
function accumulateLoot (accumulated, addition) {
  for (var key in addition) {
    if (!addition.hasOwnProperty(key)) continue
    // in case this is the first occurance of loot, create it in the accumulator with value 0
    if (!(key in accumulated)) accumulated[ key ] = 0
    accumulated[ key ] += addition[ key ]
  }
  return accumulated
}

/**
 * Convert a list of loots into a string of the form "xxx,xxx.xxx loot a, xxx loot b, ..."
 * @param {object} loot
 * @returns {string}
 */
function lootToString (loot) {
  var res = ''
  for (var key in loot) {
    if (key === SAMPLE_SIZE_LABEL) continue
    if (!loot.hasOwnProperty(key)) continue
    var qty = Math.round(loot[ key ] * 100) / 100
    if (qty === 0) continue

    if (res !== '') res += ', '
    res += commafy(qty) + '&nbsp;' + key.replace(/ /g, '&nbsp;')
  }
  return res
}
