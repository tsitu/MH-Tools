var _ = require("lodash");
var Promise = require("bluebird");
var rp = require("request-promise");
var debug = require("debug")("pop-ht");

function requestForm(form, opts) {
  debug("debug", "requesting", form);
  return rp
    .post("http://horntracker.com/backend/new/viewer.php", {
      form: form
    })
    .then(function(data) {
      return JSON.parse(data);
    })
    .catch(function(err) {
      debug("error", err);
      if (opts.retry)
        return Promise.delay(30000).then(requestForm.bind(this, opts));
      return Promise.reject(err);
    });
}

function serializeVars(vars) {
  var form = {};
  _.forEach(vars, function(ids, type) {
    _.forEach(ids, function(props, id) {
      _.forEach(props, function(value, prop) {
        form["vars[" + type + "][" + id + "][" + prop + "]"] = value;
      });
    });
  });
  return form;
}

function fetch(filter, opts) {
  opts.form = serializeFilter(filter, opts);
  return requestForm(opts);
}

module.exports = function(vars, opts) {
  opts = opts || {};
  return requestForm(serializeVars(vars), opts).then(function(data) {
    if (!data.getDetailedSAEncounterRateDataJSON)
      return Promise.reject(
        "no data.getDetailedSAEncounterRateDataJSON in response: " +
          JSON.stringify(vars)
      );
    if (!data.getDetailedSAEncounterRateDataJSON.mice)
      return Promise.reject(
        "no data.getDetailedSAEncounterRateDataJSON.mice in response: " +
          JSON.stringify(vars)
      );
    var total = +data.getDetailedSAEncounterRateDataJSON.totalAttracted;
    var sample = +data.getDetailedSAEncounterRateDataJSON.totalHunts;
    return data.getDetailedSAEncounterRateDataJSON.mice
      .map(function(mice) {
        return {
          location: opts.location,
          phase: opts.phase,
          cheese: opts.cheese,
          charm: opts.charm,
          attraction: +mice.seen / total,
          mouse: mice.name.replace(/ Mouse$/, ""),
          sample: sample
        };
      })
      .sort(function(a, b) {
        return b.attraction - a.attraction;
      });
  });
};
