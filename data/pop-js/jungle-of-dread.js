const utils = require("../_utils");

module.exports = {
  default: {
    location: utils.genVarField("location", "Jungle of Dread"),
    after: utils.genVarField("after", 1673960400), // 2023-01-17T13:00:00Z
  },
  series: [
    {
      cheese: utils.genVarField("cheese", [
        "Gouda",
        "SB+",
        "Vanilla Stilton",
        "Vengeful Vanilla Stilton",
      ]),
      config: [
        {
          opts: {
            include: [
              "Pygmy Wrangler",
              "Swarm of Pygmy Mice"
            ]
          }
        }
      ]
    }
  ],
  /**
   *
   * @param {{stage: string, location: string, cheese: string, mouse: string, attraction: string, sample: number}[]} data
   * @returns {{stage: string, location: string, cheese: string, mouse: string, attraction: string, sample: number}[]}
   */
  postProcess: function(data) {
    data.push({location: "Jungle of Dread", stage: "-", cheese: "Pungent Havarti", charm: "-", attraction: "100.00%", mouse: "Chitinous", sample: 1});
    data.push({location: "Jungle of Dread", stage: "-", cheese: "Crunchy Havarti", charm: "-", attraction: "100.00%", mouse: "Fetid Swamp", sample: 1});
    data.push({location: "Jungle of Dread", stage: "-", cheese: "Creamy Havarti", charm: "-", attraction: "100.00%", mouse: "Jurassic", sample: 1});
    data.push({location: "Jungle of Dread", stage: "-", cheese: "Spicy Havarti", charm: "-", attraction: "100.00%", mouse: "Magma Carrier", sample: 1});
    data.push({location: "Jungle of Dread", stage: "-", cheese: "Sweet Havarti", charm: "-", attraction: "100.00%", mouse: "Primal", sample: 1});
    data.push({location: "Jungle of Dread", stage: "-", cheese: "Magical Havarti", charm: "-", attraction: "100.00%", mouse: "Stonework Warrior", sample: 1});
    return data;
  },
};
