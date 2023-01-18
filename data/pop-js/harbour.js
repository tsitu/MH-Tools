const utils = require("../_utils");

const cheeses = [
  "SB+",
  "Gouda",
  "Brie",
  "Swiss",
  "Marble",
  "Mozzarella",
  "White Cheddar"
];

module.exports = {
  default: {
    location: utils.genVarField("location", "Harbour"),
    after: utils.genVarField("after", 1539790440)
  },
  series: [
    {
      cheese: utils.genVarField("cheese", cheeses),
      stage: utils.genVarField("stage", "No Bounty"),
      config: [
        {
          opts: {
            include: [
              "Pirate",
              "Bionic",
              "Black Widow",
              "Brown",
              "Burglar",
              "Diamond",
              "Dwarf",
              "Fog",
              "Gold",
              "Granite",
              "Grey",
              "Magic",
              "Pugilist",
              "Scruffy",
              "Silvertail",
              "Spotted",
              "Steel",
              "White"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", cheeses),
      stage: utils.genVarField("stage", "On Bounty"),
      config: [
        {
          opts: {
            include: [
              "Pirate",
              "Barmy Gunner",
              "Bilged Boatswain",
              "Cabin Boy",
              "Corrupt Commodore",
              "Dashing Buccaneer",
              "Bionic",
              "Black Widow",
              "Brown",
              "Burglar",
              "Diamond",
              "Dwarf",
              "Fog",
              "Gold",
              "Granite",
              "Grey",
              "Magic",
              "Pugilist",
              "Scruffy",
              "Silvertail",
              "Spotted",
              "Steel",
              "White"
            ]
          }
        }
      ]
    }
  ]
};
