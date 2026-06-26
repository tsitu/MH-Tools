const utils = require("../_utils");

const inside = utils.genOrField("stage", [
  "Battery 1",
  "Battery 2",
  "Battery 3",
  "Battery 4",
  "Battery 5",
  "Battery 6",
  "Battery 7",
  "Battery 8",
  "Battery 9",
  "Battery 10"
], "Pagoda");

const outside = utils.genVarAlias("stage", "Outside", "Training Grounds");

module.exports = {
  default: {
    location: utils.genVarField("location", "Furoma Rift")
  },
  series: [
    {
      // outside, marble
      phase: outside,
      cheese: utils.genVarField("cheese", "Marble String"),
      mice: utils.genInclude([
        "Armored Archer",
        "Brawny",
        "Dumpling Delivery",
        "Raw Diamond",
        "Rift Guardian",
        "Shaolin Kung Fu",
        "Shinobi",
        "Wandering Monk",
        "Wealth"
      ])
    },
    {
      // outside, swiss
      phase: outside,
      cheese: utils.genVarField("cheese", "Swiss String"),
      mice: utils.genInclude([
        "Armored Archer",
        "Brawny",
        "Dumpling Delivery",
        "Militant Samurai",
        "Raw Diamond",
        "Rift Guardian",
        "Shaolin Kung Fu",
        "Shinobi",
        "Wandering Monk",
        "Wealth"
      ])
    },
    {
      // outside, swiss
      phase: outside,
      cheese: utils.genVarField("cheese", [
        "Brie String",
        "Magical String",
        "Maki String",
      ]),
      mice: utils.genInclude([
        "Armored Archer",
        "Brawny",
        "Dumpling Delivery",
        "Enlightened Labourer",
        "Militant Samurai",
        "Raw Diamond",
        "Rift Guardian",
        "Shaolin Kung Fu",
        "Shinobi",
        "Wandering Monk",
        "Wealth"
      ])
    },
    {
      // inside, regular
      phase: inside,
      cheese: utils.genVarField("cheese", [
        "Maki String",
        "Magical String",
        "Brie String",
        "Swiss String",
        "Marble String",
      ]),
      mice: utils.genInclude([
        "Dancing Assassin",
        "Militant Samurai",
        "Raw Diamond",
        "Shaolin Kung Fu",
        "Shinobi",
        "Student of the Chi Belt",
        "Student of the Chi Claw",
        "Student of the Chi Fang",
        "Wandering Monk",
        "Wealth"
      ])
    },
    {
      // inside, fusion
      phase: inside,
      cheese: utils.genVarField("cheese", "Master Fusion"),
      mice: utils.genInclude([
        "Master of the Chi Belt",
        "Master of the Chi Claw",
        "Master of the Chi Fang",
      ])
    },
  ],
  /**
   *
   * @param {import('../_utils').AttractionData[]} data
   * @returns {import('../_utils').AttractionData[]}
   */
  postProcess: function(data) {
    data.push({location: "Furoma Rift", stage: "Pagoda", cheese: "Rift Glutter", mouse: "Master of the Chi Belt", attraction: "100.00%", sample: 1});
    data.push({location: "Furoma Rift", stage: "Pagoda", cheese: "Rift Combat", mouse: "Master of the Chi Fang", attraction: "100.00%", sample: 1});
    data.push({location: "Furoma Rift", stage: "Pagoda", cheese: "Rift Shusheese", mouse: "Master of the Chi Claw", attraction: "100.00%", sample: 1});
    data.push({location: "Furoma Rift", stage: "Pagoda", cheese: "Rift Rumble", mouse: "Grand Master of the Dojo", attraction: "100.00%", sample: 1});
    data.push({location: "Furoma Rift", stage: "Pagoda", cheese: "Null Onyx Gorgonzola", mouse: "Supreme Sensei", attraction: "100.00%", sample: 1});
    data.push({location: "Furoma Rift", stage: "Pagoda", cheese: "Ascended", mouse: "Ascended Elder", attraction: "100.00%", sample: 1});
    return data;
  },
};
