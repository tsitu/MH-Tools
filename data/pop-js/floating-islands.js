const utils = require("../_utils");

// Common Nomenclature
// LAI = Low Altitude Island
// HAI = High Altitude Island
// SP = Sky Palace = Vault

/* Stages
Base stage names are built from the powertype then appended with Low or High or Palace

All island names for reference
+-----------+------------------+--------------------+--------------------+
|   Type    |       Low        |        High        |       Palace       |
+-----------+------------------+--------------------+--------------------+
| Arcane    | Arcane Island    | Arcane Keep        | Arcane Cauldron    |
| Draconic  | Draconic Island  | Draconic Sanctuary | Draconic Hoard     |
| Forgotten | Forgotten Island | Forgotten Fortress | Forgotten Tomb     |
| Hydro     | Hydro Island     | Hydro Hideaway     | Hydro Reservoir    |
| Law       | Law Island       | Law Garrison       | Law Lockup         |
| Physical  | Physical Island  | Physical Palisade  | Physical Strongbox |
| Shadow    | Shadow Island    | Shadow Stronghold  | Shadow Crypt       |
| Tactical  | Tactical Island  | Tactical Castle    | Tactical Maze      |
+-----------+------------------+--------------------+--------------------+

Quotes ("") around a phrase indicate stage name, otherwise comments.

Enemy encounter stages:
"Warden"
"<powertype> Paragon"
"Empress"

Palace Stage Modifiers:
Whenever a palace run gets 3x of a the same modifier it gets put into a specific stage
"<stage> - <mod_counter>x <mod_type>"
<mod_type> can be the following:
"Jade"
"Emp Seal"
"Glass + Ore"
"Pirates" (only when NOT hunting with SPS)

Special stage cases
Loot cache are handled slightly different, both for low, high, and palace runs but only with CC and ERCC equipped
"<stage> - <mod_count>x Loot" (mod 2x for low/high and 2x to 4x for palace)
Pirates are the final special case. Equipping Sky Pirate Swiss will change the stage.
"<[Low|High]|Palace> - <mod_count>x Pirates" Choose "Low|High" or Palace, then up to 2x for low/high and up to 4x for palace

*/

const standardCheese = ["SB+", "Gouda"];
const cloudCheese = ["Cloud Cheesecake", "Extra Rich Cloud Cheesecake"];
const allCheese = [...standardCheese, ...cloudCheese];

const launch_pad = [
  "Skydiver",
  "Sky Greaser",
  "Launchpad Labourer",
  "Cloud Miner", // SB+ only
];

const cloud_commoner = [
  "Daydreamer",
  "Kite Flyer"
];

const sky_pirates = [
  "Suave Pirate",
  "Cutthroat Cannoneer",
  "Scarlet Revenger",
  "Cutthroat Pirate",
  "Mairitime Pirate",
  "Admiral Cloudbeard",
  "Peggy the Plunderer"
];

const the_richest = [
  "Richard the Rich",
  "Fortuitous Fool"
];

const empyrean_guard = [
  "Empyrean Appraiser",
  "Consumed Charm Tinkerer",
  "Empyrean Geologist"
];

const palace_stage_mods = [
  "Jade",
  "Emp Seal",
  "Glass + Ore",
  "Pirates",
]

const island_configurations = {
  Arcane: {
    Common: ["Sky Glass Glazier", "Sky Glass Sorcerer"], // Appear in Low, High, Palace with any cheese: Common, CC, ERCC.
    Cloud: ["Sky Dancer", "Sky Highborne", "Sky Glider"], // CC or ERCC only
  },
  Draconic: {
    Common: ["Lancer Guard", "Tiny Dragonfly"],
    Cloud: ["Dragonbreather", "Regal Spearman", "Empyrean Javelineer"],
  },
  Forgotten: {
    Common: ["Spry Sky Explorer", "Spry Sky Seer"],
    Cloud: ["Cumulost", "Spheric Diviner", "Forgotten Elder"],
  },
  Hydro: {
    Common: ["Nimbomancer", "Sky Surfer"],
    Cloud: ["Cute Cloud Conjurer", "Mist Maker", "Cloud Strider"],
  },
  Law: {
    Common: ["Stack of Thieves", "Devious Gentleman"],
    Cloud: ["Lawbender", "Agent M", "Aristo-Cat Burglar"],
  },
  Physical: {
    Common: ["Sky Swordsman", "Ground Gavaleer"],
    Cloud: ["Herc", "Sky Squire", "Glamorous Gladiator"],
  },
  Shadow: {
    Common: ["Astrological Astronomer", "Overcaster"],
    Cloud: ["Stratocaster", "Shadow Sage", "Zealous Academic"],
  },
  Tactical: {
    Common: ["Gyrologer", "Worried Wayfinder"],
    Cloud: ["Seasoned Islandographer", "Captain Cloudkicker", "Rocketeer"],
  },
}

const config = {
  default: {
    location: utils.genVarField("location", "Floating Islands")
  },
  series: [
    {
      cheese: utils.genVarField("cheese", standardCheese),
      stage: utils.genVarField("stage", "Launch Pad"),
      config: [
        {
          opts: {
            include: launch_pad
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", "Sky Pirate Swiss"),
      stage: utils.genVarField("stage", [
        "Low|High - 0x Pirates",
        "Low|High - 1x Pirates",
        "Low|High - 2x Pirates",
        "Palace - 0x Pirates",
        "Palace - 1x Pirates",
        "Palace - 2x Pirates",
        "Palace - 3x Pirates",
        "Palace - 4x Pirates"
      ]),
      config: [
        {
          opts: {
            include: sky_pirates,
            attraction: 0.005 // For a few pirates slipping out of their associated stage
          },
        },
      ],
    },
    {
      cheese: utils.genVarField("cheese", allCheese),
      stage: utils.genVarField("stage", "Empress"),
      config: [
        {
          opts: {
            include: [ "Empyrean Empress" ]
          }
        }
      ]
    }
  ],
  postProcess: function(data) {
    const masterArr = data; // TODO: Temporary until generic processing implemented

    // Add fixed populations (Wardens + Paragons)
    const skyWardens = [
      "Warden of Rain",
      "Warden of Fog",
      "Warden of Frost",
      "Warden of Wind"
    ];
    skyWardens.forEach(mouse => {
      masterArr.push({
        stage: "Sky Wardens",
        location: "Floating Islands",
        cheese: "SB+",
        mouse: mouse,
        attraction: "25.00%",
        sample: 4
      });
    });

    const skyParagons = [
      "Paragon of Strength",
      "Paragon of Shadow",
      "Paragon of Tactics",
      "Paragon of Arcane",
      "Paragon of Forgotten",
      "Paragon of Water",
      "Paragon of Dragons",
      "Paragon of the Lawless"
    ];
    skyParagons.forEach(mouse => {
      masterArr.push({
        stage: "Sky Paragons",
        location: "Floating Islands",
        cheese: "SB+",
        mouse: mouse,
        attraction: "12.50%",
        sample: 8
      });
    });

    masterArr.push({
      stage: "Empress",
      location: "Floating Islands",
      cheese: "SB+",
      mouse: "Empyrean Empress",
      attraction: "100.00%",
      sample: 1
    });

    return masterArr;
  }
};

/**
 * Generates all possible Palace stages from the different stage mod
 * @param {string} powerType Base palace stage name
 * @returns {string[]} An array of generated stages plus the original stage from the argument
 */
function generatePalaceStages(powerType) {
  const stages = [`${powerType} Palace`];

  for (const modType of palace_stage_mods) {
    stages.push(`${powerType} Palace - 3x ${modType}`);
    stages.push(`${powerType} Palace - 4x ${modType}`);
  }

  return stages;
}

/**
 * Generate all stages need for loot caches (Rich + Fool)
 * @param {string} powerType
 * @returns {string[]}
 */
function generateLootCacheStages(powerType) {
  return [
    `${powerType} Low - 2x Loot`,
    `${powerType} High - 2x Loot`,
    `${powerType} Palace - 2x Loot`,
    `${powerType} Palace - 3x Loot`,
    `${powerType} Palace - 4x Loot`,
  ];
}

function generateConfig() {

  for (const [powerType, value] of Object.entries(island_configurations)) {

    // All non-special LAI, HAI, SP stages
    const stages = [`${powerType} Low`, `${powerType} High`, ...generatePalaceStages(powerType)];
    for (const cheese of allCheese) {
      const seriesMiceInclude = cheese.match(/Cheesecake/) ? value.Cloud : [];
      for (const stage of stages) {
        const series = {
          cheese: utils.genVarField("cheese", cheese),
          stage: utils.genVarField("stage", stage),
          config: [
            {
              opts: {
                include: [
                  ...cloud_commoner,
                  ...value.Common,
                  ...seriesMiceInclude,
                  ...(stage.match(/[34]x/) ? empyrean_guard : [])
                ],
              },
            },
          ],
        }
        config.series.push(series);
      }
    }

    // Loot Cache stages
    const lootStages = generateLootCacheStages(powerType);
    const series = {
      cheese: utils.genVarField("cheese", cloudCheese),
      stage: utils.genVarField("stage", lootStages),
      config: [
        {
          opts: {
            include: [
              ...cloud_commoner,
              ...value.Common,
              ...value.Cloud,
              ...the_richest
            ],
            attraction: 0.05 // quick exclude for Fool in 2x zones
          },
        },
      ],
    }
    config.series.push(series);
  }

  return config;
}

module.exports = generateConfig();
