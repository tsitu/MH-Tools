var Promise = require("bluebird");
var json2csv = require("json2csv");
var _ = require("lodash");
var Combinatorics = require("js-combinatorics");

/**
 * @typedef {Object} AttractionData
 * @property {string} location
 * @property {string} stage
 * @property {string} cheese
 * @property {string} charm
 * @property {string} attraction
 * @property {string} mouse
 * @property {number} sample
 * @property {number} seen
 */

// Location,Phase,Cheese,Charm,Attraction Rate,Mouse,Sample Size
exports.POP_FIELDS = [
  { label: "Location", value: "location" },
  { label: "Phase", value: "stage" },
  { label: "Cheese", value: "cheese" },
  { label: "Charm", value: "charm" },
  { label: "Attraction Rate", value: "attraction" },
  { label: "Mouse", value: "mouse" },
  { label: "Sample Size", value: "sample", default: "" }
];

exports.preparePopulation = function(base, population) {
  return _.extend({}, base, {
    mouse: population.mouse,
    attraction: (population.attraction * 100).toFixed(2) + "%",
    seen: population.seen,
    sample: population.sample
  });
};

exports.toCsv = function toCsv(fields, rows) {
  return Promise.resolve(rows)
    .then(Promise.all.bind(Promise))
    .then(function(rows) {
      console.error("");
      return json2csv({
        data: rows,
        fields: fields,
        defaultValue: "-"
      });
    });
};

exports.process = function(config) {
  return Promise.mapSeries(config.series, function(setup) {
    const defaults = config.default || {};
    if (!defaults.attraction) {
      defaults.attraction = [
        {
          opts: {
            attraction: 0.0001, // 0.01% - just utter minimum for leaks
          },
        }
      ];
    }
    var vectors = _.values(
      _.defaultsDeep(setup, _.cloneDeep(defaults))
    );
    if (!vectors || !vectors.length) vectors = [[{}]];
    var p = Combinatorics.cartesianProduct.apply(Combinatorics, vectors);
    return Promise.mapSeries(p.toArray(), function(iter) {
      var item = iter.reduce(function(opts, vec) {
        return _.defaultsDeep(opts, vec);
      }, {});

      return config.process(item);
    }).reduce(function(a, b) {
      return a.concat(b);
    });
  }).reduce(function(a, b) {
    return a.concat(b);
  });
};

/**
 * Creates an array with items based on values
 * @param {string} type
 * @param {string} value
 * @param {object} [{}] base
 * @returns {{vars: {type: {value: true}}, fields:{type: value}}}}
 */
exports.genVarItem = function genVarItem(type, value, base) {
  base = base || {};
  var item = { vars: {}, fields: {} };
  item.vars[type] = {};
  item.vars[type][value] = true;
  item.fields[type] = value;
  return _.defaultsDeep({}, base, item);
};

/**
 * Creates an array with items based on values
 * @param {string} type
 * @param {string[]|string} values
 * @param {object} [{}] base
 * @returns {{vars: {type: {value: true}}, fields:{type: value}}[]}}
 */
exports.genVarField = function genVarField(type, values, base) {
  if (!Array.isArray(values)) values = [values];
  return _.map(values, function(value) {
    return exports.genVarItem(type, value, base);
  });
};

/**
 * Creates a single OR-query item where multiple values of the same field type
 * are matched as alternatives (logical OR). Useful for aggregating stage variants
 * or cheese alternatives into one row.
 * @param {string} type - field type (e.g. "stage", "cheese")
 * @param {string[]} values - values to OR together
 * @param {string} [label] - display name; defaults to values.join("/")
 * @returns {Object[]}
 * @example
 * // genOrField("stage", ["Dungeon", "Dungeon - Magic", "Dungeon - Mystery"], "Dungeon")
 * // genOrField("cheese", ["Brie", "Gouda", "SB+"])  // label → "Brie/Gouda/SB+"
 */
exports.genOrField = function genOrField(type, values, label) {
  var vars = {};
  vars[type] = {};
  values.forEach(function(v) { vars[type][v] = true; });
  var fields = {};
  fields[type] = label || values.join("/");
  return [{ vars: vars, fields: fields }];
};

/**
 * Creates a single var item that queries a field with a custom display name,
 * i.e. the MHCT internal name differs from the desired CSV label.
 * @param {string} type - field type (e.g. "stage", "cheese")
 * @param {string} value - internal MHCT value to match
 * @param {string} label - display label for CSV output
 * @returns {Object[]}
 * @example
 * // genVarAlias("stage", "Outside", "Training Grounds")
 * // genVarAlias("stage", "Commander's Hideout", "Commander's Lair")
 */
exports.genVarAlias = function genVarAlias(type, value, label) {
  var vars = {}, fields = {};
  vars[type] = {};
  vars[type][value] = true;
  fields[type] = label;
  return [{ vars: vars, fields: fields }];
};

/**
 * Creates a negated var item — queries for a field NOT being the given value(s).
 * @param {string} type - field type (e.g. "charm", "base")
 * @param {string|string[]} values - value(s) to negate
 * @returns {Object[]}
 * @example
 * // genNegateVar("charm", "Antiskele")
 * // genNegateVar("charm", ["Antiskele", "Necromancer"])
 */
exports.genNegateVar = function genNegateVar(type, values) {
  if (!Array.isArray(values)) values = [values];
  var vars = {};
  vars[type] = {};
  values.forEach(function(value) {
    vars[type][value] = false;
  });
  return [{ vars: vars }];
};

/**
 * Creates a multi-stage AND combiner for locations that track multiple simultaneous
 * stage slots (stage, stage1, stage2, ..., up to stage5).
 * @param {string[]} stageNames - stage names in slot order (index 0 → "stage", 1 → "stage1", ...)
 * @param {string} displayName - display label written to the stage CSV column
 * @returns {Object[]}
 * @example
 * // genStageAnd(["CC 0-24", "GGT 0-24", "DL 0-24"], "Low/Low/Low")
 */
exports.genStageAnd = function genStageAnd(stageNames, displayName) {
  var vars = {};
  stageNames.forEach(function(name, i) {
    var key = i === 0 ? "stage" : "stage" + i;
    vars[key] = {};
    vars[key][name] = true;
  });
  return [{ vars: vars, fields: { stage: displayName } }];
};

/**
 * Creates a config array that filters results to only the specified mouse names.
 * @param {string|string[]} mice - mouse name(s) to include
 * @returns {Object[]}
 * @example
 * // genInclude(["Budrich Thornborn", "Leafton Beanwell"])
 */
exports.genInclude = function genInclude(mice) {
  return [{ opts: { include: mice } }];
};

/**
 * Creates a config array that excludes the specified mouse names from results.
 * @param {string|string[]} mice - mouse name(s) to exclude
 * @returns {Object[]}
 * @example
 * // genExclude(["Glitchpaw"])
 */
exports.genExclude = function genExclude(mice) {
  return [{ opts: { exclude: mice } }];
};
