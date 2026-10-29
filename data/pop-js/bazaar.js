const utils = require("../_utils");

// attracted to all types of cheese
const baseMice = [
  "Bionic",
  "Crown Collector",
  "Dwarf",
  "Granite",
  "Mutated Brown",
  "Mutated Grey",
  "Mutated White",
  "Steel",
  "Zombie"
];

const standardMice = [
  ...baseMice,
  "Hope"
];

const sbMice = [
  ...standardMice,
  "Black Widow",
  "Burglar",
  "Master Burglar",
  "Nibbler",
];

module.exports = {
  opts: {
    minSample: 50
  },
  default: {
    location: utils.genVarField("location", "Bazaar"),
    after: utils.genVarField("after", 1710860400), // 2024-03-19T15:00:00Z,
  },
  series: [
    {
      cheese: utils.genOrField("cheese", [
        "Cheddar",
        "Marble",
        "Mozzarella",
        "White Cheddar",
      ]),
      mice: utils.genInclude(standardMice)
    },
    {
      cheese: utils.genOrField("cheese", [
        "Swiss"
      ]),
      mice: utils.genInclude([
        ...standardMice,
        "Burglar",
      ])
    },
    {
      cheese: utils.genOrField("cheese", [
        "Brie",
        "Gouda"
      ]),
      mice: utils.genInclude([
        ...standardMice,
        "Burglar",
      ])
    },
    {
      cheese: utils.genOrField("cheese", [
        "SB+",
        "ESB+"
      ]),
      mice: utils.genInclude(sbMice)
    },
    {
      cheese: utils.genVarField("cheese", "Gilded"),
      mice: utils.genInclude([
        ...baseMice,
        "Burglar",
        "Master Burglar",
        "Melancholy Merchant",
        "Totally Not Tax Fraud"
      ])
    },
  ]
};
