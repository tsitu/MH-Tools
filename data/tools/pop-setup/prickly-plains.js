const utils = require("../_utils")

module.exports = {
  series: [
    {
      cheese: utils.genVarField('cheese', [
        'Bland Queso',
        'Mild Queso',
        'Medium Queso',
        'Hot Queso',
        'Flamin\' Queso',
      ]),
      location: utils.genVarField('location', 'Prickly Plains'),
    }
  ]
}
