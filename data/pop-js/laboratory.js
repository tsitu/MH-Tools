const utils = require("../_utils");

module.exports = {
  default: {
    location: utils.genVarField("location", "Laboratory"),
    // 2024-03-20: Glitchpaw added as permanent mouse
    after: utils.genVarField("after", 1710907200)
  },
  series: [
    {
      cheese: utils.genVarField("cheese", [
        "Gouda",
        "Swiss",
        "Marble",
        "Cheddar"
      ]),
      mice: utils.genInclude([
        "Bionic",
        "Clumsy Chemist",
        "Glitchpaw",
        "Sludge Scientist",
        "Squeaker Bot",
      ])
    },
    {
      cheese: utils.genVarField("cheese", "Brie"),
      mice: utils.genInclude([
        "Bionic",
        "Burglar",
        "Clumsy Chemist",
        "Glitchpaw",
        "Sludge Scientist",
        "Squeaker Bot"
      ])
    },
    {
      cheese: utils.genVarField("cheese", "SB+"),
      mice: utils.genInclude([
        "Bionic",
        "Black Widow",
        "Burglar",
        "Clumsy Chemist",
        "Glitchpaw",
        "Sludge Scientist",
        "Squeaker Bot"
      ])
    },
    {
      cheese: utils.genVarField("cheese", [
        "Radioactive Blue",
        "Rancid Radioactive Blue",
        "Magical Rancid Radioactive Blue",
      ]),
      mice: utils.genInclude([
        "Black Widow",
        "Monster",
        "Mutated Brown",
        "Mutated Grey",
        "Mutated White",
      ])
    }
  ],
    /**
   *
   * @param {import('../_utils').AttractionData[]} data
   * @returns {import('../_utils').AttractionData[]}
   */
  postProcess: function(data) {
    data.push({location: "Laboratory", cheese: "Limelight", mouse: "Mutated Mole", attraction: "100.00%", sample: 1});
    return data;
  },
};
