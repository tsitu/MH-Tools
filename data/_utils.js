var Promise = require("bluebird");
var json2csv = require("json2csv");
var _ = require("lodash");
var Combinatorics = require("js-combinatorics");

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
    var vectors = _.values(
      _.defaultsDeep(setup, _.cloneDeep(config.default || {}))
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
 * @returns {{vars: {type: {value: true}}, fields:{type: value}}}[]}
 */
exports.genVarField = function genVarField(type, values, base) {
  if (!Array.isArray(values)) values = [values];
  return _.map(values, function(value) {
    return exports.genVarItem(type, value, base);
  });
};
