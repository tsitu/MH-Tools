const utils = require("../_utils");

const pumpRoomMice = [
  "Reality Restitch",
  "Space Party-Time Plumber",
  "Time Punk",
  "Time Tailor",
  "Time Thief",
];

const mixingRoomMice = [
  "Force Fighter Blue",
  "Force Fighter Green",
  "Force Fighter Pink",
  "Force Fighter Red",
  "Force Fighter Yellow",
  "Super FighterBot MegaSupreme"
];

const breakRoomMice = [
  "Breakdancer",
  "Dance Party",
  "El Flamenco",
  "Fete Fromager",
  "Para Para Dancer"
]

const qaRoomMice = [
  "Cupcake Camo",
  "Cupcake Candle Thief",
  "Cupcake Cutie",
  "Cupcake Runner",
  "Sprinkly Sweet Cupcake Cook"
];

const standardMice = [
  "Birthday",
  "Buckethead",
  "Dinosuit",
  "Pintail",
  "Present",
  "Sleepwalker",
  "Terrible Twos"
]

function genRooms(room, mice) {
  return [
    {
      stage: utils.genVarField("stage", room),
      cheese: utils.genVarField("cheese", ["Coggy Colby", "Speedy Coggy Colby"]),
      charm: [
        {
          vars: {
            charm: {
              "Factory Repair Charm": false,
            }
          }
        }
      ],
      config: [
        {
          opts: {
            include: mice
          }
        }
      ]
    },
    {
      stage: utils.genVarField("stage", room),
      cheese: utils.genVarField("cheese", ["Coggy Colby", "Speedy Coggy Colby"]),
      charm: utils.genVarField("charm", "Factory Repair Charm"),
      config: [
        {
          opts: {
            include: [...mice, "Factory Technician"]
          }
        }
      ]
    }
  ]
}

module.exports = {
  default: {
    location: utils.genVarField("location", "SUPER|brie+ Factory"),
  },
  series: [
    ...genRooms("Pump Room", pumpRoomMice),
    ...genRooms("Mixing Room", mixingRoomMice),
    ...genRooms("Break Room", breakRoomMice),
    ...genRooms("QA Room", qaRoomMice),

    // Any Room - Standard, no charm
    {
      stage: utils.genVarField("stage", "Any Room"),
      config: [
        {
          vars: {
            cheese: {
              "Cheddar": true,
              "Marble": true,
              "Swiss": true,
              "Brie": true,
              "Gouda": true,
            },
            charm: {
              "Factory Repair Charm": false,
            },
          },
          fields: {
            cheese: "Cheddar/Marble/Swiss/Brie/Gouda"
          },
          opts: {
            include: standardMice
          }
        },
      ],
    },
    // Any Room - Standard, with charm
    {
      stage: utils.genVarField("stage", "Any Room"),
      charm: utils.genVarField("charm", "Factory Repair Charm"),
      config: [
        {
          vars: {
            cheese: {
              "Cheddar": true,
              "Marble": true,
              "Swiss": true,
              "Brie": true,
              "Gouda": true,
            },
          },
          fields: {
            cheese: "Cheddar/Marble/Swiss/Brie/Gouda"
          },
          opts: {
            include: [...standardMice, "Factory Technician"]
          }
        },
      ],
    },
    // Any Room - SB+, no charm
    {
      stage: utils.genVarField("stage", "Any Room"),
      cheese: utils.genVarField("cheese", "SB+"),
      config: [
        {
          vars: {
            charm: {
              "Factory Repair Charm": false,
            }
          },
          opts: {
            include: [...standardMice, "Cheesy Party"]
          },
        },
      ],
    },
    // Any Room - SB+, with charm
    {
      stage: utils.genVarField("stage", "Any Room"),
      cheese: utils.genVarField("cheese", "SB+"),
      charm: utils.genVarField("charm", "Factory Repair Charm"),
      config: [
        {
          opts: {
            include: [...standardMice, "Cheesy Party", "Factory Technician"]
          },
        },
      ],
    },
  ],
  /**
   *
   * @param {import('../_utils').AttractionData[]} data
   * @returns {import('../_utils').AttractionData[]}
   */
  postProcess: function(data) {
    data.push(...[
      {stage: "Boss", location: "SUPER|brie+ Factory", cheese: "Cheddar/Marble/Swiss/Brie/Gouda/SB+/Coggy Colby/Speedy Coggy Colby", mouse: "Vincent the Magnificent", attraction: "100%", sample: 1},
    ])
    return data;
  }
};
