const utils = require("../_utils");

module.exports = {
  default: {
    location: utils.genVarField("location", "Balack's Cove"),
    after: utils.genVarField("after", 1673960400), // 2023-01-17T13:00:00Z
  },
  series: [
    {
      cheese: utils.genVarField("cheese", "Vanilla Stilton"),
      phase: utils.genVarField("stage", "Low Tide"),
      config: [
        {
          opts: {
            include: [
              "Brimstone",
              "Davy Jones",
              "Derr Lich",
              "Elub Lich",
              "Enslaved Spirit",
              "Nerg Lich",
              "Tidal Fisher",
              "Twisted Fiend"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", "Vengeful Vanilla Stilton"),
      phase: utils.genVarField("stage", "Low Tide"),
      config: [
        {
          opts: {
            include: [
              "Balack the Banished",
              "Brimstone",
              "Davy Jones",
              "Derr Lich",
              "Elub Lich",
              "Enslaved Spirit",
              "Nerg Lich",
              "Twisted Fiend"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", "Vanilla Stilton"),
      phase: utils.genVarField("stage", "Medium Tide"),
      config: [
        {
          opts: {
            include: [
              "Brimstone",
              "Davy Jones",
              "Derr Lich",
              "Elub Lich",
              "Enslaved Spirit",
              "Nerg Lich",
              "Twisted Fiend"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", "Vengeful Vanilla Stilton"),
      phase: utils.genVarField("stage", "Medium Tide"),
      config: [
        {
          opts: {
            include: [
              "Balack the Banished",
              "Derr Lich",
              "Elub Lich",
              "Nerg Lich",
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", [
        "Vanilla Stilton",
        "Vengeful Vanilla Stilton",
      ]),
      phase: utils.genVarField("stage", "High Tide"),
      config: [
        {
          opts: {
            include: ["Riptide"]
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
      data.push({stage: "High Tide", location: "Balack's Cove", cheese: "Vanilla Stilton", mouse: "Riptide", attraction: "100.00%", sample: 1});
      data.push({stage: "High Tide", location: "Balack's Cove", cheese: "Vengeful Vanilla Stilton", mouse: "Riptide", attraction: "100.00%", sample: 1});
      return data;
    },
};
