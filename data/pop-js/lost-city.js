const utils = require("../_utils");

module.exports = {
  default: {
    location: utils.genVarField("location", "Lost City"),
    cheese: utils.genVarField("cheese", "Dewthief Camembert"),
    stage: utils.genVarField("stage", ["Not Cursed", "Cursed"]),
    
    config: [
      {
        opts: { 
          // Simpler filter Essence Collector not in correct stage
          attraction: 0.01
        }
      }
    ]
  },
  series: [
    {
      config: [
        {
          vars: {
            charm: { Safeguard: false }
          },
        },
      ]
    },
    {
      charm: utils.genVarField("charm", "Safeguard")
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