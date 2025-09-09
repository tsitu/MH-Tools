const utils = require("../_utils");

const stages = [
  "1x",
  "2x",
  "4x",
  "8x"
];

module.exports = {
  default: {
    location: utils.genVarField("location", "Afterword Acres"),
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
      stage: utils.genVarField("stage", stages),
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
