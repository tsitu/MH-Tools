const utils = require("../_utils");

// Three stages where the AR is modified based on the base
function getBaseConfigForStage(stageName) {
  if (stageName == "Treacherous Tunnels" || stageName === "Bombing Run") {
    // TT and BR can have increased Tunnel Rat attraction
    // We'll point the user to the correct stage but the query will be the same
    return [
      {
        vars: {
          base: {
              "Magnet": true,
              "Iceberg Boiler" : true,
              "Ultimate Iceberg": true
          }
        },
        fields: {
          stage: `${stageName} (Magnet)`
        }
      },
      {
        vars: {
          base: {
              "Magnet": true,
              "Iceberg Boiler" : true,
              "Ultimate Iceberg": true
          }
        },
        fields: {
          stage: `${stageName} (Ultimate Iceberg)`
        }
      }
    ]
  } else if (stageName == "The Mad Depths") {
    // The Mad Depths has Tunnel Rats and Zealots so there's three different configurations
    // 1. Tunnel Rats AR+ : Magnet
    // 2. Zealots AR- : Hearthstone
    // 3. Tunnel Rats AR+ && Zealots- : Ultimate
    return [
      {
        vars: { base: { "Magnet": true } },
        fields: { stage: `${stageName} (Magnet)` }
      },
      {
        vars: { base: { "Hearthstone": true, } },
        fields: { stage: `${stageName} (Hearthstone)` }
      },
      {
        vars: {
          base: {
              "Iceberg Boiler" : true,
              "Ultimate Iceberg": true
          }
        },
        fields: { stage: `${stageName} (Ultimate Iceberg)` }
      },
    ]
  }

  return null;
}

function genBases(stageName) {
  return [
    // no special base config
    {
      vars: {
        base: {
          // 'Deep Freeze': false,
          'Hearthstone': false,
          'Magnet': false,
          // 'Remote Detonator': false,
          // 'Spiked': false,
          'Ultimate Iceberg': false,
          'Iceberg Boiler': false
        }
      },
      fields: { stage: stageName }
    },
    ...getBaseConfigForStage(stageName)
  ];
}

module.exports = {
  default: {
    location: utils.genVarField("location", "Iceberg"),
    cheese: [
      {
        vars: {
          cheese: {
          "Brie": true,
          "Gouda": true,
          "SB+": true,
          }
        },
        fields: {
          cheese: "SB+/Gouda/Brie"
        }
      }
    ],
  },
  series: [
    {
      // Not using genVarField for stage b/c the bases function
      // will provide the stage field

      // Treacherous Tunnels
      stage: [{ vars: { stage: { "0-300ft": true } } }],
      base: genBases("Treacherous Tunnels"),
      config: [
        {
          opts: {
            include: [
              "Chipper",
              "Icebreaker",
              "Incompetent Ice Climber",
              "Living Salt",
              "Polar Bear",
              "Snow Slinger",
              "Snow Soldier",
            ],
          },
        },
      ],
    },
    {
      // Brutal Bulwark
      // No bases can modify pool in this stage
      stage: utils.genVarField("stage", "301-600ft", { fields: { stage: "Brutal Bulwark"} }),
      config: [
        {
          opts: {
            include: [
              "Iceblock",
              "Living Salt",
              "Mammoth",
              "Polar Bear",
              "Snow Bowler",
              "Snow Slinger",
              "Yeti",
            ],
          },
        },
      ],
    },
    {
      // Bombing Run
      stage: [{ vars: { stage: { "601-1600ft": true } } }],
      base: genBases("Bombing Run"),
      config: [
        {
          opts: {
            include: [
              "Living Salt",
              "Snow Slinger",
              "Iceblock",
              "Snow Bowler",
              "Chipper",
              "Icebreaker",
              "Wolfskie",
              "Heavy Blaster",
              "Saboteur",
              "Stickybomber",
            ],
          },
        },
      ],
    },
    {
      // The Mad Depths
      stage: [{ vars: { stage: { "1601-1800ft": true } } }],
      base: genBases("The Mad Depths"),
      config: [
        {
          opts: {
            include: [
              "Chipper",
              "Iceblade",
              "Iceblock",
              "Living Salt",
              "Snow Bowler",
              "Snowblind",
              "Water Wielder",
              "Wolfskie",
            ],
          },
        },
      ],
    },
    {
      stage: utils.genVarField("stage", "1800ft", { fields: { stage: "Icewing's Lair" } }),
      config: [
        {
          opts: {
            include: [
              "Frostlance Guard",
              "Frostwing Commander",
              "Icewing",
            ]
          }
        }
      ]
    },
    {
      stage: utils.genVarField("stage", "1801-2000ft", { fields: { stage: "The Hidden Depths" } }),
      config: [
        {
          opts: {
            include: [
              "Living Salt",
              "Frostwing Commander",
              "Frostwing Guard",
            ]
          }
        }
      ]
    },
    {
      stage: utils.genVarField("stage", "Generals"),
      config: [
        {
          opts: {
            include: [
              "General Drheller",
              "Lady Coldsnap",
              "Lord Splodington",
              "Princess Fist",
            ]
          }
        }
      ]
    }
  ],

  postProcess: function(data) {
    data.push({
      stage: "The Deep Lair",
      location: "Iceberg",
      cheese: "SB+/Gouda/Brie",
      mouse: "Deep",
      attraction: "100.00%",
      sample: 1
    });

    return data;
  }
};
