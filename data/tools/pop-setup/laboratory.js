const utils = require("../_utils");

const cheeses = [
  "Radioactive Blue",
  "SB+",
  "Gouda",
  "Brie",
  "Rancid Radioactive Blue",
  "Magical Rancid Radioactive Blue",
  "Swiss",
  "Marble",
  "Cheddar"
];

module.exports = {
  default: {
    location: utils.genVarField("location", "Laboratory"),
    after: utils.genVarField("after", 1539790440)
  },
  series: [
    {
      cheese: utils.genVarField("cheese", cheeses)
    }
  ]
};
