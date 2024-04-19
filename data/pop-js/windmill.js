const utils = require("../_utils");

const allCheeses = [
  "Cheddar",
  "White Cheddar",
  "Marble",
  "Mozzarella",
  "Swiss",
  "Brie",
  "Gouda",
  "SB+",
  "Grilled"
];

const mice = {
  Cheddar: [
    "Brown",
    "Dwarf",
    "Field",
    "Grey",
    "Scruffy",
    "Spud",
    "White",
  ],
  "White Cheddar": [
    "Dwarf",
    "Field",
    "Scruffy",
    "Spud",
  ],
  Marble: [
    "Brown",
    "Diamond",
    "Dwarf",
    "Field",
    "Gold",
    "Grey",
    "Longtail",
    "Mole",
    "Pugilist",
    "Scruffy",
    "Spud",
    "White",
  ],
  Swiss: [
    "Diamond",
    "Dwarf",
    "Gold",
    "Longtail",
    "Mole",
    "Pugilist",
    "Scruffy",
    "Spud",
  ],
  "Mozzarella": [
    "Diamond",
    "Dwarf",
    "Gold",
    "Longtail",
    "Pugilist",
    "Scruffy",
    "Spud",
    "Mole",
  ],
  Brie: [
    "Diamond",
    "Flying",
    "Gold",
    "Longtail",
    "Mole",
    "Pugilist",
    "Speedy",
    "Spud",
  ],
  Gouda: [
    "Diamond",
    "Dwarf",
    "Gold",
    "Longtail",
    "Pugilist",
    "Scruffy",
    "Spud",
    "Mole",
  ],
  "SB+": [
    "Diamond",
    "Farmhand",
    "Flying",
    "Gold",
    "Mole",
    "Silvertail",
    "Spud",
    "Tiny",
  ],
  "Grilled Cheese": [
    "Captain Croissant"
  ]
}

function genSeries() {
  return allCheeses.map(c => {
    return {
      cheese: utils.genVarField("cheese", c),
      config: [
        {
          opts: {
            include: mice[c]
          }
        }
      ]
    }
  })
}

module.exports = {
  default: {
    location: utils.genVarField("location", "Windmill"),
    after: utils.genVarField("after", 1633446000) // 2021-10-05T15:00:00Z, Gnawnia + Windmill patch
  },
  series: genSeries()
};
