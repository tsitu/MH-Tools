#!/usr/bin/env node

var jt = require("jacksmhtools-client");
var utils = require("./_utils");

var cheese = [
  { fields: { cheese: "SB+" } },
  { fields: { cheese: "Gouda" } },
  { fields: { cheese: "Brie" } }
];

function bases(stageName) {
  return [
    // { // no special base
    //   vars: {
    //     base: {
    //       // 'Deep Freeze': false,
    //       'Hearthstone': false,
    //       'Magnet': false,
    //       'Remote Detonator': false,
    //       // 'Spiked': false,
    //       'Ultimate Iceberg': false
    //     }
    //   },
    //   fields: { stage: stageName }
    // },
    // utils.genVarItem('base', 'Deep Freeze', { fields: { stage: stageName+' (Deep Freeze)' } }),
    // utils.genVarItem('base', 'Hearthstone', { fields: { stage: stageName+' (Hearthstone)' } }),
    // utils.genVarItem('base', 'Magnet', { fields: { stage: stageName+' (Magnet)' } }),
    // utils.genVarItem('base', 'Remote Detonator', { fields: { stage: stageName+' (Remote Detonator)' } }),
    // utils.genVarItem('base', 'Spiked', { fields: { stage: stageName+' (Spiked)' } }),
    utils.genVarItem("base", "Ultimate Iceberg", {
      fields: { stage: stageName + " (Ultimate Iceberg)" }
    })
  ];
}

utils
  .process({
    default: {
      location: utils.genVarField("location", "Iceberg"),
      cheese: cheese
    },
    series: [
      {
        // Treacherous Tunnels
        phase: [{ vars: { stage: { "0-300ft": true } } }],
        base: bases("Treacherous Tunnels")
      },
      // { // Brutal Bulwark
      //   location: utils.genVarField('location', 'Iceberg'),
      //   phase: [ { vars: { stage: { '301-600ft': true } } } ],
      //   cheese: cheese,
      //   base: bases('Brutal Bulwark')
      // },
      {
        // Bombing Run
        phase: [{ vars: { stage: { "601-1600ft": true } } }],
        base: bases("Bombing Run")
      },
      {
        // The Mad Depths
        phase: [{ vars: { stage: { "1601-1800ft": true } } }],
        base: bases("The Mad Depths")
      }
    ],
    process: function(item) {
      console.error("requesting", JSON.stringify(item.vars));
      return jt
        .getSAEncounterRateData(item.vars, item.opts)
        .filter(function(item) {
          return item.sample > 100;
        })
        .map(utils.preparePopulation.bind(utils, item.fields));
    }
  })
  .then(utils.toCsv.bind(utils, utils.POP_FIELDS))
  .then(console.log.bind(console));
