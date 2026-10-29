#!/usr/bin/env node

const mhct = require("@mhct/db-client");
const utils = require("./_utils");

if (process.argv.length < 3) {
  console.error('Usage: pop <setup>')
  process.exit()
}

const key = process.argv[ 2 ]
let setup
try {
  setup = require(`./pop-js/${key}`)
} catch (e) {
  console.error(`Unknown setup ${key}`, e)
  process.exit(100)
}

Promise
  .resolve(setup)
  .then(function (setup) {
    if (!setup.process) {
      setup.process = function (item) {
        console.error("requesting", JSON.stringify(item.vars));
        return mhct
          .getSAEncounterRateData(item.vars, item.opts ?? setup.opts)
          .filter(function (item) {
            return item.sample > (setup.opts?.minSample ?? 100);
          })
          .map(utils.preparePopulation.bind(utils, item.fields));
      }
    }
    const res = utils.process(setup)
    if (setup.postProcess) {
      return res.then(setup.postProcess)
    }
    return res
  })
  .then(utils.toCsv.bind(utils, utils.POP_FIELDS))
  .then(console.log.bind(console))
  .catch(function(error) {
    console.log(error.stack)
  });
