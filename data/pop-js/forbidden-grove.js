const utils = require("../_utils");

module.exports = {
  default: {
    location: utils.genVarField("location", "Forbidden Grove"),
    phase: utils.genVarField("stage", "Open"),
    charm: utils.genNegateVar("charm", "Realm Ripper"),
  },
  series: [
    {
      cheese: utils.genVarField("cheese", [
        "Radioactive Blue",
        "Rancid Radioactive Blue",
        "Magical Rancid Radioactive Blue"
      ]),
      mice: utils.genInclude([
        "Black Widow",
        "Ghost",
        "Lycan",
        "Mutated Brown",
        "Mutated Grey",
        "Mutated White",
        "Ravenous Zombie",
        "Zombie"
      ])
    },
    {
      cheese: utils.genOrField("cheese", [
        "Crescent",
        "Moon"
      ]),
      mice: utils.genInclude([
        "Ghost",
        "Lycan",
        "Scavenger",
        "Sorcerer",
        "Vampire"
      ])
    },
    {
      cheese: utils.genVarField("cheese", "Ancient"),
      mice: utils.genInclude([
        "Gargoyle",
        "Bat",
        "Gate Guardian",
        "Ghost",
        "Golem",
        "Gorgon",
        "Ravenous Zombie",
        "Reaper",
        "Scavenger",
        "Sorcerer",
        "Spectre",
        "Spider",
        "Vampire",
        "Zombie"
      ])
    }
  ],
  /**
   *
   * @param {import('../_utils').AttractionData[]} data
   * @returns {import('../_utils').AttractionData[]}
   */
  postProcess: function(data) {
    // add realm ripper to all stages
    data.push(...[
      {
        stage: "Open",
        location: "Forbidden Grove",
        cheese: "Ancient/Moon/Crescent/Radioactive Blue/Rancid Radioactive Blue/Magical Rancid Radioactive Blue",
        charm: "Realm Ripper",
        mouse: "Realm Ripper",
        attraction: "100.00%",
        sample: 1
      },
      {
        stage: "Closed",
        location: "Forbidden Grove",
        cheese: "Ancient/Moon/Crescent/Radioactive Blue/Rancid Radioactive Blue/Magical Rancid Radioactive Blue",
        mouse: "Realm Ripper",
        attraction: "100.00%",
        sample: 1
      }
    ]);

    return data;
  },
};
