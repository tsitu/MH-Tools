const utils = require("../_utils");

module.exports = {
  series: [
    {
      cheese: utils.genVarField("cheese", [
        "Runic",
        "Ancient",
        "Radioactive Blue"
      ]),
      location: utils.genVarField("location", "Acolyte Realm"),
      config: [
        {
          opts: {
            exclude: ["Lucky", "Glitchpaw"]
          }
        }
      ]
    }
  ]
};
