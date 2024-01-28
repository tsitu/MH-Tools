const utils = require("../_utils");

const allHallsMice = [
  "Corridor Bruiser",
  "Lost",
  "Lost Legionnaire",
  "Shadow Stalker",
  "Reanimated Carver"
]

const districtMice = {
  Farming: [
    "Mush Monster",
    "Mushroom Harvester",
    "Nightshade Nanny",
  ],
  Fealty: [
    "Dark Templar",
    "Drudge",
    "Masked Pikeman",
    "Mind Tearer",
    "Solemn Soldier",
  ],
  Scholar: [
    "Mystic Guardian",
    "Mystic Herald",
    "Mystic Scholar",
    "Sanguinarian",
    "Summoning Scholar",
  ],
  Tech: [
    "Ash Golem",
    "Automated Stone Sentry",
    "Fungal Technomorph",
    "RR-8",
    "Tech Golem",
  ],
  Treasury: [
    "Hired Eidolon",
    "Mimic",
    "Treasure Brawler",
  ]
}

function genSeriesObject(qual, hall) {
  // Returns an array of two series [{}, {}]
  // First is standard GG query. Seconds is a multi-cheese OR query.
  return [
    {
      cheese: utils.genVarField("cheese", "Glowing Gruyere"),
      stage: utils.genVarField("stage", `${qual} ${hall}`),
      config: [
        {
          opts: {
            include: [
              ...allHallsMice,
              ...districtMice[hall]
            ]
          }
        }
      ]
    },
    {
      stage: utils.genVarField("stage", `${qual} ${hall}`),
      config: [
        {
          opts: {
            include: [
              ...allHallsMice,
              ...districtMice[hall]
            ]
          },
          vars: {
            cheese: {
              "SB+": true,
              "Gouda": true,
              "Brie": true
            }
          },
          fields: {
            cheese: "SB+/Gouda/Brie"
          }
        }
      ],
    }
  ]
}

function genHallways() {

  // flat(2) because we have two levels of nested arrays due to map
  const districtsWithEpic = ["Plain", "Superior", "Epic"].map((quality) => {
    return ["Fealty", "Tech", "Scholar"].map((hallway) => {
      return genSeriesObject(quality, hallway);
    })
  }).flat(2);

  // These don't have an Epic hallway and will cause a query error b/c stage doesn't exist.
  const nonEpic = ["Plain", "Superior"].map((quality) => {
    return ["Farming", "Treasury"].map((hallway) => {
      return genSeriesObject(quality, hallway);
    })
  }).flat(2);

  return [
    ...districtsWithEpic,
    ...nonEpic
  ]
}

module.exports = {
  default: {
    location: utils.genVarField("location", "Labyrinth"),
  },
  series: genHallways()
}
