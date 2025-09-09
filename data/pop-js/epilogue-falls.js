const utils = require("../_utils");

// Quality: Sparse, Common, Abundant
// Type: Morsel, Halophyte, Algae, Coral, Shell, Plot Hook
const zones = [
  "Sparse Morsel",
  "Common Morsel",
  "Abundant Morsel",
  "Sparse Halophyte",
  "Common Halophyte",
  "Abundant Halophyte",
  "Sparse Algae",
  "Common Algae",
  "Abundant Algae",
  "Sparse Coral",
  "Common Coral",
  "Abundant Coral",
  "Sparse Shell",
  "Common Shell",
  "Abundant Shell",
  "Sparse Plot Hook",
  "Common Plot Hook",
  "Abundant Plot Hook",
  "Within the Waterfall",
  "The Hidden Grotto"
]

module.exports = {
  default: {
    location: utils.genVarField("location", "Epilogue Falls"),
    cheese: [
      {
        vars: {
          cheese: {
            "Brie": true,
            "Gouda": true,
          },
        },
        fields: {
          cheese: "Gouda/Brie",
        }
      },
      utils.genVarItem("cheese", "SB+"),
      utils.genVarItem("cheese", "Metaphor Manchego"),
      utils.genVarItem("cheese", "Allegory Anari"),
      utils.genVarItem("cheese", "Symbolic Sirene"),
    ],
  },
  series: [
    {
      config: zones.map(zone => {
        return {
          vars: {
            detail: {
              [`zone:${zone}`]: true
            }
          },
          fields: {
            stage: zone
          }
        };
      })
    },
  ],
  /**
   *
   * @param {import('../_utils').AttractionData[]} data
   * @returns {import('../_utils').AttractionData[]}
   */
  postProcess: function(data) {
    return data;
  },
};
