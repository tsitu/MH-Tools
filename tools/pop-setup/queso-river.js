const utils = require("../_utils")

module.exports = {
  series: [
    {
      cheese: utils.genVarField('cheese', [
        'Gouda',
        'Brie',
        'SB+',
        'Wildfire Queso',
      ]),
      location: utils.genVarField('location', 'Queso River'),
    }
  ]
}
