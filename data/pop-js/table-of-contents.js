const utils = require("../_utils")

const standardCheese = ['Gouda', 'SB+'];
const writing = ['First Draft Derby', 'Second Draft Derby', 'Final Draft Derby', 'SB+'];
const encylopedia = ['Final Draft Derby']

module.exports = {
  default: {
    location: utils.genVarField('location', 'Table of Contents'),
    config:[
      {
        opts: {
          attraction: 0.01
        }
      }
    ]
  },
  series: [
    {
      cheese: utils.genVarField("cheese", standardCheese),
      stage: utils.genVarField("stage", "Not Writing"),
      config: [ {
        opts: {
          include: [
            'Grit Grifter',
            'Brothers Grimmaus',
            'Hans Cheesetian Squeakersen',
            'Madame d\'Ormouse',
            'Matriarch Gander'
          ]
        }
      } ]
    },
    {
      cheese: utils.genVarField("cheese", writing),
      stage: utils.genVarField("stage", "Pre-Encyclopedia"),
      config: [ {
        opts: {
          include: [
            'Humphrey Dumphrey',
            'Little Bo Squeak',
            'Little Miss Fluffet',
            'Matriarch Gander',
            'Princess and the Olive',
            'Pinkielina',
            'Fibbocchio',
            'Greenbeard',
            'Flamboyant Flautist',
            'Ice Regent',
            'Bitter Grammarian'
          ]
        }
      } ]
    },
    {
      cheese: utils.genVarField("cheese", encylopedia),
      stage: utils.genVarField("stage", "Encyclopedia"),
      config: [ {
        opts: {
          include: [
            'Bitter Grammarian',
            'Mythweaver'
          ]
        }
      } ]
    },
  ],
  /**
   *
   * @param {{stage: string, location: string, cheese: string, mouse: string, attraction: string, sample: number}[]} data
   * @returns {{stage: string, location: string, cheese: string, mouse: string, attraction: string, sample: number}[]}
   */
  postProcess: function(data) {
    data.push(...[
      {stage: "Pre-Encyclopedia", location: "Table of Contents", cheese: "Thousandth Draft Derby", mouse: "M1000", attraction: "100%", sample: 1},
      {stage: "Encyclopedia", location: "Table of Contents", cheese: "Thousandth Draft Derby", mouse: "M1000", attraction: "100%", sample: 1},
    ])
    return data;
  },}
