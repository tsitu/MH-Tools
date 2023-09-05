const utils = require("../_utils");

module.exports = {
  default: {
    // frequently used: charm, cheese, location, stage
    // less common: base, trap, after, before
    // know what you're doing: detail, pstage, pdetail
    location: utils.genVarField("location", VALUE),
    config: [
      {
        opts: {
          // Options for filtering results out by name or attraction rate. Include is preferred over exclude
          // include: [],
          // exclude: [],
          // attraction: 0.0,
        },
      },
    ],
  },
  series: [
    // Simple query
    {
      cheese: utils.genVarField("cheese", "SB+"),
    },

    // Simple AND multi condition query.
    {
      charm: utils.genVarField("charm", "Dragonbane"),
      stage: utils.genVarField("stage", "Boss"),
    },

    // Two simple queries. Same as writing a simple query twice but different values.
    {
      cheese: utils.genVarField("cheese", ["Brie", "Gouda"]),
    },

    // Query permutation. Aka Cartesion Product. Same as writing 4 queries
    {
      cheese: utils.genVarField("cheese", ["Brie", "Gouda"]),
      charm: utils.genVarField("charm", ["Power Charm", "Lucky Charm"]),
    },

    // Simple query equivalent but manually typed and commented
    {
      // Note that the key "cheese" doesn't matter, it's what in the var that matters
      // You'll see the 'config' key used a lot for custom queries
      cheese: [
        {
          // 'vars' controls how the database queries. See below for more advanced examples
          vars: {
            cheese: {
              "SB+": true,
            },
          },
          // 'fields' controls what will be written to the csv columns.
          // here SB+ will be in the cheese column.
          fields: {
            cheese: "SB+",
          },
        },
      ],
    },

    // Negating query. Most queries are for a var to be true but we can do the opposite as well
    // (see catacombs)
    // Query for antiskele charm
    {
      charm: utils.genVarField("charm", "Antiskele"),
    },
    // Query for NO antiskele charm
    {
      charm: [
        {
          vars: {
            charm: {
              Antiskele: false,
            },
          },
          // We don't fill out 'fields'. csv charm column will default to '-'
        },
      ],
    },

    // Custom stage name output
    // When you want the output name to be different from MHCT stage name
    // You can also use the postProcess to change stage names.
    {
      config: [
        {
          vars: {
            stage: { "Commander's Hideout": true },
          },
          fields: {
            stage: "Commander's Lair",
          },
        },
      ],
    },

    // Multi stage AND. Each hunt needs to have these stages (eg BWRift, Moussu Picchu)
    {
      config: [
        {
          vars: {
            // up to stage5
            stage: { "First Part": true },
            stage1: { "Second Part": true },
          },
          fields: {
            stage: "Custom Name"
          }
        },
      ],
    },

    // Multi stage OR. Each hunt should have one of these stages (eg BB)
    // Useful for aggregating stages
    {
      config: [
        {
          vars: {
            stage: {
              "One": true,
              "Two": true,
              "Three": true
            }
          },
          fields: {
            stage: "Combined"
          }
        },
      ],
    },
  ],
  /**
   *
   * @param {{stage: string, location: string, cheese: string, mouse: string, attraction: string, sample: number}[]} data
   * @returns {{stage: string, location: string, cheese: string, mouse: string, attraction: string, sample: number}[]}
   */
  postProcess: function(data) {
    return data;
  },
};
