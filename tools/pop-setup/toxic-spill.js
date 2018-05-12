const utils = require("../_utils")

module.exports = {
  series: [
    { // stages
      location: utils.genVarField('location', 'Toxic Spill'),
      charm: [
        { vars: { charm: { 'Rotten': false, 'Super Rotten': false } } },
        { vars: { charm: { 'Rotten': true } }, fields: { charm: 'Rotten' } },
        { vars: { charm: { 'Super Rotten': true } }, fields: { charm: 'Super Rotten' } }
      ],
      cheese: utils.genVarField('cheese', [ 'Rancid Radioactive Blue', 'Magical Rancid Radioactive Blue' ]),
      phases: [
        { vars: { stage: { 'Hero': true } }, fields: { stage: 'Hero' } },
        { vars: { stage: { 'Knight': true } }, fields: { stage: 'Knight' } },
        { vars: { stage: { 'Lord/Lady': true } }, fields: { stage: 'Lord/Lady' } },
        { vars: { stage: { 'Baron/Baroness': true } }, fields: { stage: 'Baron/Baroness' } },
        { vars: { stage: { 'Count/Countess': true } }, fields: { stage: 'Count/Countess' } },
        { vars: { stage: { 'Duke/Duchess': true } }, fields: { stage: 'Duke/Duchess' } },
        { vars: { stage: { 'Grand Duke/Duchess': true } }, fields: { stage: 'Grand Duke/Grand Duchess' } },
        { vars: { stage: { 'Archduke/Archduchess': true } }, fields: { stage: 'Archduke/Archduchess' } }
      ]
    }
  ]
}
