const utils = require("../_utils");

const allDistrictMice = [
  "Shadow Stalker",
  "Reanimated Carver"
]

const mice = {
  Farming: [
    "Mush Monster",
    "Mushroom Harvester",
    "Nightshade Fungalmancer",
    "Nightshade Nanny",
    "Reanimated Carver",
    "Shadow Stalker",
  ],
  Treasure: [
    "Hired Eidolon",
    "Matron of Wealth",
    "Mimic",
    "Molten Midas",
    "Reanimated Carver",
    "Shadow Stalker",
    "Treasure Brawler",
  ],
  Fealty: [
    "Battle Cleric",
    "Dark Templar",
    "Drudge",
    "Masked Pikeman",
    "Mind Tearer",
    "Paladin Weapon Master",
    "Reanimated Carver",
    "Shadow Stalker",
    "Sir Fleekio",
    "Solemn Soldier",
  ],
  Scholar: [
    "Ancient Scribe",
    "Ethereal Guardian",
    "Mystic Guardian",
    "Mystic Herald",
    "Mystic Scholar",
    "Reanimated Carver",
    "Sanguinarian",
    "Shadow Stalker",
    "Soul Binder",
    "Summoning Scholar",
  ],
  Tech: [
    "Ash Golem",
    "Automated Stone Sentry",
    "Exo-Tech",
    "Fungal Technomorph",
    "Manaforge Smith",
    "Matron of Machinery",
    "Reanimated Carver",
    "RR-8",
    "Shadow Stalker",
    "Tech Golem",
  ],
  Lair: [
    "Corridor Bruiser",
    "Decrepit Tentacle Terror",
    "Retired Minotaur",
  ]
}

function genSeriesObject(quality, district) {
  // Returns an array of two series [{}, {}]
  // First is standard GG query. Seconds is a multi-cheese OR query.
  return [
    {
      cheese: utils.genVarField("cheese", "Glowing Gruyere"),
      stage: utils.genVarField("stage", `${district} ${quality}`),
      config: [
        {
          opts: {
            include: [
              ...allDistrictMice,
              ...mice[district]
            ]
          }
        }
      ]
    },
    {
      stage: utils.genVarField("stage", `${district} ${quality}`),
      config: [
        {
          opts: {
            include: [
              ...allDistrictMice,
              ...mice[district]
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

function genDistricts() {

  // flat(2) because we have two levels of nested arrays due to map
  const levelThreeDistricts = ["Fealty", "Scholar", "Tech"].map(district => {
    return ["15+", "50+", "80+"].map(quality => {
      return genSeriesObject(quality, district);
    })
  }).flat(2);

  const farmDistrict = ["0+", "50+"].map(q => {
      return genSeriesObject(q, "Farming");
  }).flat()

  const treasureDistrict = ["15+", "50+"].map(q => {
      return genSeriesObject(q, "Treasure");
  }).flat();

  const minotaur = genSeriesObject("- Each 30+", "Lair");

  return [
    ...levelThreeDistricts,
    ...farmDistrict,
    ...treasureDistrict,
    ...minotaur
  ];
}

module.exports = {
  default: {
    location: utils.genVarField("location", "Zokor"),
  },
  series: genDistricts()
}
