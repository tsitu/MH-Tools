const utils = require("../_utils");

var cheeses = ["Rancid Radioactive Blue", "Magical Rancid Radioactive Blue"];
var stages = [
  "Hero",
  "Knight",
  "Lord/Lady",
  "Baron/Baroness",
  "Count/Countess",
  "Duke/Duchess",
  "Grand Duke/Duchess",
  "Archduke/Archduchess"
];

const allMice = [
"Biohazard",
"Bog Beast",
"Gelatinous Octahedron",
"Hazmat",
"Lab Technician",
"Monster Tail",
"Mutant Mongrel",
"Mutant Ninja",
"Mutated Behemoth",
"Mutated Siblings",
"Outbreak Assassin",
"Plague Hag",
"Scrap Metal Monster",
"Slimefist",
"Sludge Soaker",
"Sludge Swimmer",
"Sludge",
"Spore",
"Swamp Runner",
"Telekinetic Mutant",
"Tentacle",
"The Menace",
"Toxic Warrior",
]

module.exports = {
  default: {
    location: utils.genVarField("location", "Toxic Spill")
  },
  series: [
    {
      cheese: utils.genVarField("cheese", cheeses),
      charm: utils.genNegateVar("charm", ["Rotten", "Super Rotten"]),
      phases: utils.genVarField("stage", stages),
      miceInclude: utils.genInclude(allMice),
      miceExclude: utils.genExclude(["Hazmat", "Lab Technician"])
    },
    {
      cheese: utils.genVarField("cheese", cheeses),
      charm: utils.genVarField("charm", "Rotten"),
      phases: utils.genVarField("stage", stages),
      miceInclude: utils.genInclude(allMice),
      miceExclude: utils.genExclude(["Hazmat"])
    },
    {
      cheese: utils.genVarField("cheese", cheeses),
      charm: utils.genVarField("charm", "Super Rotten"),
      phases: utils.genVarField("stage", stages),
      miceInclude: utils.genInclude(allMice),
    }
  ],
  postProcess: function(data) {
    return data.map(function(item) {
      // Rename to Grand Duke/Grand Duchess
      var stage =
        item.stage === "Grand Duke/Duchess"
          ? "Grand Duke/Grand Duchess"
          : item.stage;
      return Object.assign(item, { stage: stage });
    });
  }
};
