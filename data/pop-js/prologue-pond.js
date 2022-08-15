const utils = require("../_utils")

module.exports = {
  series: [
    {
      cheese: utils.genVarField('cheese', [
        'Gouda',
        'SB+',
        'Grubbeen',
        'Clamembert',
        'Stormy Clamembert Cheese',
      ]),
      location: utils.genVarField('location', 'Prologue Pond'),
    }
  ]
}