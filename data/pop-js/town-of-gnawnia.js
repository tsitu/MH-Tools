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
  "Gilded"
];

const mice = {
  Cheddar: [
    "Brown",
    "Cowardly",
    "Dwarf",
    "Grey",
    "White",
  ],
  "White Cheddar": [
    "Cowardly",
    "Dwarf",
  ],
  Marble: [
    "Brown",
    "Cowardly",
    "Diamond",
    "Dwarf",
    "Gold",
    "Granite",
    "Grey",
    "Longtail",
    "Pugilist",
    "White",
  ],
  Swiss: [
    "Bionic",
    "Brown",
    "Diamond",
    "Dwarf",
    "Gold",
    "Granite",
    "Grey",
    "Longtail",
    "Pugilist",
    "Steel",
    "White",
  ],
  "Mozzarella": [
    "Bionic",
    "Brown",
    "Diamond",
    "Dwarf",
    "Gold",
    "Granite",
    "Grey",
    "Longtail",
    "Pugilist",
    "Steel",
    "White",
  ],
  Brie: [
    "Bionic",
    "Diamond",
    "Flying",
    "Gold",
    "Longtail",
    "Pugilist",
    "Speedy",
    "Steel",
    "Zombie"
  ],
  Gouda: [
    "Bionic",
    "Brown",
    "Diamond",
    "Dwarf",
    "Gold",
    "Granite",
    "Grey",
    "Longtail",
    "Steel",
    "White",
  ],
  "SB+": [
    "Diamond",
    "Flying",
    "Gold",
    "Magic",
    "Master Burglar",
    "Nibbler",
    "Silvertail",
    "Speedy",
    "Zombie"
  ],
  Gilded: [
    "Bionic",
    "Brown",
    "Cowardly",
    "Diamond",
    "Dwarf",
    "Gold",
    "Granite",
    "Grey",
    "Longtail",
    "Master Burglar",
    "Pugilist",
    "Steel",
    "White",
    "Zombie",
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
    location: utils.genVarField("location", "Town of Gnawnia"),
    after: utils.genVarField("after", 1633446000) // 2021-10-05T15:00:00Z, Gnawnia + Windmill patch
  },
  series: genSeries()
};
