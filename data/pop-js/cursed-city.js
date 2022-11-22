const utils = require("../_utils");

module.exports = {
  default: {
    location: utils.genVarField("location", "Cursed City"),
    cheese: utils.genVarField("cheese", "Graveblossom Camembert"),
  },
  series: [
    {
      stage: utils.genVarField("stage", "Not Cursed"),
      config: [
        {
          vars: {
            charm: { Safeguard: false, Shattering: false },
          },
          opts: {
            exclude: [ "Dark Magi" ]
          }
        },
      ],
    },
    {
      stage: utils.genVarField("stage", "Cursed"),
      config: [
        {
          vars: {
            charm: { Safeguard: false, Shattering: false },
          },
          opts: {
            exclude: [ "Essence Guardian" ]
          }
        },
      ],
    },
    {
      charm: utils.genVarField("charm", "Safeguard"),
      stage: utils.genVarField("stage", ["Not Cursed", "Cursed"]),
    },
    {
      charm: utils.genVarField("charm", "Shattering"),
      stage: utils.genVarField("stage", ["Not Cursed", "Cursed"]),
      config: [
        {
          opts: {
            include: [
              "Dark Magi",
              "Corrupt"
            ]
          }
        }
      ]
    }
  ],
  postProcess: function(data) {
    return data.map(function(item) {
      // Easier to rename stage here than to separate each stage genvarField 
      // just to rename the csv field
      var stage =
        item.stage === "Not Cursed"
          ? "Curse Lifted"
          : item.stage;
      return Object.assign(item, { stage: stage });
    });
  }
};
