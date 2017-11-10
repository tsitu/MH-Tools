"use strict";

/**
 * Extract the loot the specific mouse should drop in the given location, phase, weapon, base, cheese and charm
 * @param {{mouse: {location: {phase: {cheese: {charm: {base: {trap: {loot: number}}}}}}}}} mouseLoots
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
  var path = [ mouseName, locationName, phaseName, cheeseName, charmName, baseName, weaponName ]
  var obj = mouseLoots

  for (var i = 0, l = path.length; i < l && obj; i++) {
    var key = path[ i ]
    if (key in obj) {
      obj = obj[ key ]
    } else {
      obj = obj[ '-' ]
    }
  }

  return obj || {}
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
 * Convert a list of loots into a string of the form "xxx,xxx.xxx loota, xxx lootb, ..."
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
    res += commafy(qty) + '&nbsp;' + key.replace(/\W/g, '&nbsp;')
  }
  return res
}
