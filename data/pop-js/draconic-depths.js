const utils = require("../_utils");

const standardMice = {
  Ice: [
    "Frostnip Icebound",
    "Blizzara Winterosa",
    "Iciclesius the Defender",
  ],
  Fire: [
    "Squire Sizzleton",
    "Torchbearer Tinderhelm",
    "Colonel Crisp",
  ],
  Poison: [
    "Goopus Dredgemore",
    "Noxio Sludgewell",
    "Dreck Grimehaven",
  ],
};

const caveData = {
  Ice: {
    cheese: "Icy Isabirra",
    mice: {
      "0-99": ["Rimeus Polarblast", "Frigidocius Coldshot"],
      "100-249": [
        "Rimeus Polarblast",
        "Frigidocius Coldshot",
        "Chillandria Permafrost",
        "Avalancheus the Glacial",
      ],
      "250-749": [
        "Rimeus Polarblast",
        "Frigidocius Coldshot",
        "Chillandria Permafrost",
        "Avalancheus the Glacial",
      ],
      "750+": [
        "Chillandria Permafrost",
        "Avalancheus the Glacial",
        "Arcticus the Biting Frost",
      ],
    },
  },
  Fire: {
    cheese: "Fiery Fontina",
    mice: {
      "0-99": ["Crematio Scorchworth", "Flamina Cinderbreath"],
      "100-249": [
        "Crematio Scorchworth",
        "Flamina Cinderbreath",
        "Combustius Furnaceheart",
        "Incendarius the Unquenchable",
      ],
      "250-749": [
        "Crematio Scorchworth",
        "Flamina Cinderbreath",
        "Combustius Furnaceheart",
        "Incendarius the Unquenchable",
      ],
      "750+": [
        "Combustius Furnaceheart",
        "Incendarius the Unquenchable",
        "Sulfurious the Raging Inferno",
      ],
    },
  },
  Poison: {
    cheese: "Poisonous Provolone",
    mice: {
      "0-99": ["Malignus Vilestrom", "Venomona Festerbloom"],
      "100-249": [
        "Malignus Vilestrom",
        "Venomona Festerbloom",
        "Belchazar Banewright",
        "Pestilentia the Putrid",
      ],
      "250-749": [
        "Malignus Vilestrom",
        "Venomona Festerbloom",
        "Belchazar Banewright",
        "Pestilentia the Putrid",
      ],
      "750+": [
        "Belchazar Banewright",
        "Pestilentia the Putrid",
        "Corrupticus the Blight Baron",
      ],
    },
  }
};


function genRgbCaveSeries() {
  const series = [];
  for (const caveType in caveData) {
    for (const range in caveData[caveType].mice) {

      var stage = { vars: {}, fields: {} };
      stage.vars["stage"] = {};
      // These have very few data/don't exist yet.
      //stage.vars["stage"][`Cavern - 1x ${color} ${range}`] = true;
      //stage.vars["stage"][`Cavern - 2x ${color} ${range}`] = true;
      stage.vars["stage"][`Cavern - 3x ${caveType} ${range}`] = true;
      stage.fields["stage"] = `Cavern - ${caveType} ${range}`;

      series.push({
        stage: [stage],
        cheese: [
          {
            vars: {
              cheese: {
                [caveData[caveType].cheese]: true,
              },
            },
            fields: {
              cheese: caveData[caveType].cheese,
            },
          },
          {
            vars: {
              cheese: {
                "SB+": true,
                "ESB+": true,
                "Brie": true,
                "Gouda": true,
              },
            },
            fields: {
              cheese: "SB+/Gouda/Brie",
            },
          },
        ],
        config: [
          {
            opts: {
              include: [
                ...caveData[caveType].mice[range],
                ...standardMice[caveType],
              ]
            }
          }
        ]
      });
    }
  }
  return series;
}

module.exports = {
  default: {
    location: utils.genVarField("location", "Draconic Depths"),
  },
  series: [
    {
      // Topside with standard cheese
      stage: utils.genVarField("stage", "Crucible Forge"),
      cheese: [
        {
          vars: {
            cheese: {
              Gouda: true,
              Brie: true,
            },
          },
          fields: {
            cheese: "Gouda/Brie",
          },
        }
      ],
    },
    {
      // Topside with SB cheese - ARs slightly differ from the above
      stage: utils.genVarField("stage", "Crucible Forge"),
      cheese: [
        {
          vars: {
            cheese: {
              "SB+": true,
              "ESB+": true,
            },
          },
          fields: {
            cheese: "SB+",
          },
        }
      ],
    },
    // Topside with RGBE cheese
    {
      stage: utils.genVarField("stage", "Crucible Forge"),
      cheese: utils.genVarField("cheese", [
        "Fiery Fontina",
        "Icy Isabirra",
        "Poisonous Provolone",
        "Elemental Emmental",
      ]),
    },
    ...genRgbCaveSeries(),
    {
      stage: utils.genVarField("stage", [
        "Cavern - Elemental 0-99",
        "Cavern - Elemental 100-249",
        "Cavern - Elemental 250-749",
        "Cavern - Elemental 750+",
      ]),
      cheese: [
        ...utils.genVarField("cheese", ["Fiery Fontina", "Icy Isabirra", "Poisonous Provolone", "Elemental Emmental"]),
        {
          vars: {
            cheese: {
              "SB+": true,
              "ESB+": true,
              Gouda: true,
              Brie: true,
            },
          },
          fields: {
            cheese: "SB+/Gouda/Brie",
          },
        }
      ],
    },
  ],
  /**
   *
   * @param {import('../_utils').AttractionData[]} data
   * @returns {import('../_utils').AttractionData[]}
   */
  postProcess: function(data) {
    // Sort the elemental rows by stage to improve UX
    const elementalRows = data.filter(row => row.stage.startsWith("Cavern - Elemental"));
    const nonElementalRows = data.filter(row => !row.stage.startsWith("Cavern - Elemental"));
    return [
      ...nonElementalRows,
      ...elementalRows.sort((a, b) => a.stage.localeCompare(b.stage)),
    ];
  },
};
