const utils = require("../_utils");

const cheeses = ["Gouda", "SB+"];
const charms = ["Warpath Warrior Charm", "Warpath Commander's Charm"];

module.exports = {
  default: {
    location: utils.genVarField("location", "Fiery Warpath")
  },
  series: [
    // {
    //   cheese: utils.genVarField("cheese", cheeses),
    //   stage: utils.genVarField("stage", "Wave 1"),
    //   charm: utils.genVarField("charm", charms),
    //   config: [
    //     {
    //       // vars: {
    //       // charm: { "Warpath Commander's Charm": true }
    //       // },
    //       opts: {
    //         exclude: ["Lucky"]
    //       }
    //     }
    //   ]
    // },
    {
      cheese: utils.genVarField("cheese", cheeses),
      stage: utils.genVarField("stage", "Portal"),
      config: [
        {
          opts: {
            include: ["Artillery Commander", "Theurgy Warden"]
          }
        }
      ]
    }
  ]
};
