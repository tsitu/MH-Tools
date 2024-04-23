const utils = require("../_utils")

var charmMice = {
  Cherry: "Cherry Sprite",
  Gnarled: "Naturalist",
  Stagnant: "Grizzled Silth"
}

var crazedClearingMice = {
  Low: [
    "Bloomed Sylvan",
    "Cranky Caterpillar",
    "Mossy Moosker"
  ],
  Medium: [
    "Red-Eyed Watcher Owl",
    "Spirit Fox",
    "Treant Queen",
  ],
  High: [
    "Cyclops Barbarian"
  ]
}

var giganticGnarledTreeMice = {
  Low: [
    "Fungal Frog",
    "Karmachameleon",
    "Spirit of Balance"
  ],
  Medium: [
    "Nomadic Warrior",
    "Red Coat Bear",
    "Rift Tiger",
  ],
  High: [
    "Centaur Ranger"
  ]
}

var deepLagoonMice = {
  Low: [
    "Crazed Goblin",
    "Twisted Treant",
    "Water Sprite"
  ],
  Medium: [
    "Medicine",
    "Tree Troll",
    "Winged Harpy",
  ],
  High: [
    "Tri-dra"
  ]
}

/* Mappings to the rage level notations in the MHCT database */
var ccStages = { Low: "CC 0-24", Medium: "CC 25-49", High: "CC 50" };
var gtStages = { Low: "GGT 0-24", Medium: "GGT 25-49", High: "GGT 50" };
var dlStages = { Low: "DL 0-24", Medium: "DL 25-49", High: "DL 50" };

/**
 * Constructs the set of configurations for a given rage combination
 *
 * This function will
 *
 * - Construct a configuration for each charm (Cherry, Gnarled, Stagnant, No charm)
 * - Determine which mice need to be excluded based on the rage combination
 * - Select the correct stage identifiers in the MHCT database
 *
 * @param      {"Low" | "Medium" | "High"}  ccRage  The crazed rage (Low/Medium/High)
 * @param      {"Low" | "Medium" | "High"}  gtRage  The gnarled rage (Low/Medium/High)
 * @param      {"Low" | "Medium" | "High"}  dlRage  The deep rage (Low/Medium/High)
 * @return     {Array}   The rage configuration.
 */
function genSeriesObject(ccRage, gtRage, dlRage, charm) {
  const baseSeries = {
    cheese: [
      {
        vars: {
          cheese: {
            "Brie String": true,
            "Swiss String": true
          }
        },
        fields: {
          cheese: "Brie String/Swiss String"
        }
      },
      utils.genVarItem("cheese", "Magical String")
    ],
    stage: [
      {
        vars: {
          stage1: { [ccStages[ccRage]]: true },
          stage2: { [gtStages[gtRage]]: true },
          stage3: { [dlStages[dlRage]]: true },
        },
        fields: {
          stage: `${ccRage}/${gtRage}/${dlRage}`
        },
      }
    ],
    config: [
      {
        opts: {
          include: [
            ...crazedClearingMice[ccRage],
            ...giganticGnarledTreeMice[gtRage],
            ...deepLagoonMice[dlRage],
            "Gilded Leaf",
            "Monstrous Black Widow",
          ]
        }
      }
    ]
  }

  if (ccRage == "High" || gtRage == "High" || dlRage == "High") {
    baseSeries.cheese.push(utils.genVarItem("cheese", "Lactrodectus Lancashire"))
  }

  const charms = ["Cherry", "Gnarled", "Stagnant"];
  const allCharmSeries = charms.map(charm => {
      const charmSeries = {...baseSeries}
      charmSeries.charm = utils.genVarField("charm", charm);
      charmSeries.config[0].opts.include.push(charmMice[charm])
      return charmSeries;
  });

  return [
    ...allCharmSeries,
    {
      ...baseSeries,
      charm: [
        {
          vars: {
            charm: {
              Stagnant: false,
              Cherry: false,
              Gnarled: false,
            }
          }
        }
      ]
    }
  ]
}

/**
 * Function for constructing the full configuration list for querying all rage and cheese combinations
 *
 * @return     {Array}  The configuration list.
 */
function genSeries() {

  const rageLevels = ["Low", "Medium", "High"]
  const x = rageLevels.map(crazedRage => {
    return rageLevels.map(gnarledRage => {
      return rageLevels.map(deepRage => {
        return genSeriesObject(crazedRage, gnarledRage, deepRage);
      })
    })
  }).flat(3);

  return x;
}

module.exports = {
  default: {
    location: utils.genVarField("location", "Whisker Woods Rift"),
  },
  config: [
    {
      opts: {
        attraction: 0.0099, // < 1% attraction, ignore
      },
    },
  ],
  series: genSeries()
}
