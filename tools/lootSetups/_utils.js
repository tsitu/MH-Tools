var _ = require('lodash')

/**
 * Creates an array with items based on values
 * @param {string} type
 * @param {string[]|string} values
 * @param {object} [{}] base
 * @returns {{vars: {type: {value: true}}, fields:{type: value}}}[]}
 */
function genVarField (type, values, base) {
  base = base || {}
  if (!Array.isArray(values)) values = [ values ]
  return _.map(values, function (value) {
    var item = { vars: {}, fields: {} }
    item.vars[ type ] = {}
    item.vars[ type ][ value ] = true
    item.fields[ type ] = value
    return _.defaultsDeep({}, base, item)
  })
}

function genBonusLootProcessor (config) {
  return function (loots) {
    var result = []
    loots.forEach(function (loot) {
      result.push(loot)
      if (!(loot.loot in config)) return

      var cfgs = config[ loot.loot ]
      if (!Array.isArray(cfgs)) cfgs = [ cfgs ]
      for (var i = 0, l = cfgs.length; i < l; i++) {
        var cfg = cfgs[ i ]
        var suitable = true
        for (var key in cfg.fields) {
          if (!cfg.fields.hasOwnProperty(key)) continue
          if (!isEmpty(loot[ key ])) {
            suitable = false
            break
          }
        }
        if (!suitable) continue
        result.push(_.assign({}, loot, cfg.fields, {
          qty: loot.qty * (cfg.qtyMply || 1) + loot.chance * (cfg.qty || 0) + (cfg.qty2 || 0)
        }))
      }
    })
    return result
  }
}

function isEmpty (val) {
  return !val || val === '-'
}

module.exports.isEmpty = isEmpty
module.exports.genBonusLootProcessor = genBonusLootProcessor
module.exports.genVarField = genVarField
