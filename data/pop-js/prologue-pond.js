const utils = require("../_utils")

module.exports = {
  series: [
    {
      cheese: utils.genVarField('cheese', [
        'Gouda',
        'SB+',
        'Grubbeen',
        'Clamembert',
        'Stormy Clamembert',
      ]),
      location: utils.genVarField('location', 'Prologue Pond'),
      config: [
        {
          opts: {
            exclude: [
              "Glitchpaw"
            ]
          }
        }
      ]
    }
  ]
}