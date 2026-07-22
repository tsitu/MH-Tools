const utils = require("../_utils");

/*
Covetous Canister Thief
Careless Canister Rider
Colossal Canister Collector
Acrobatic Aurora Bandit
Arrogant Aurora Connoisseur
Audacious Aurora Embezzler
Greedy Stone Grappler
Swift Stone Snatcher
Boulder and Pebble
Sly Skulking Scrapper
Stubby Scrap Scavenger
Hefty Hulking Hauler
Quarrelsome Quartermaster
Cluttergrin the Commodore of Curiosities
Slipstream the Virtuoso of Vapours
Craggerclaw the Magnate of Minerals
Shimmerdread the Sovereign of Spice
Captain Crook
Treacherous Dock Lurker
Amateur Knife Juggler
Port Pillager
*/

const raidMice = {
  "Tribal Isles": {
    "SPS": [
      "Alchemist",
      "Scout",
      "Healer",
      "Trailblazer",
      "Caretaker",
      "Narrator"
    ],
    "ABC": [
      "Taleweaver",
      "Wordsmith",
      "Pathfinder"
    ]
  },
  "Fiery Warpath": {
    "SPS": [
      "Desert Archer",
      "Desert Soldier",
      "Vanguard",
      "Flame Archer",
      "Flame Warrior",
      "Sentinel"
    ],
    "ABC": [
      "Crimson Ranger",
      "Crimson Titan",
      "Crimson Watch",
    ]
  },
  "Living Garden": {
    "SPS": [
      "Shroom",
      "Calalilly",
      "Camoflower",
      "Strawberry Hotcakes",
      "Bark",
      "Thistle"
    ],
    "ABC": [
      "Fungal Spore",
      "Twisted Lilly",
      "Camofusion",
      "Twisted Hotcakes",
      "Barkshell",
      "Thorn"
    ]
  },
  "Fort Rox": {
    "SPS": [
      "Meteorite Snacker",
      "Mining Materials Manager",
      "Hardworking Hauler",
      "Meteorite Miner",
      "Mischievous Meteorite Miner"
    ],
    "ABC": [
      "Night Shift Materials Manager",
      "Werehauler",
      "Wealthy Werewarrior",
      "Mischievous Wereminer",
      "Alpha Weremouse",
      "Reveling Lycanthrope",
      "Wereminer"
    ]
  },
  "Queso Geyser": {
    "SPS": [
      "Fuzzy Drake",
      "Cork Defender",
      "Burly Bruiser",
      "Steam Sailor",
      "Warming Wyvern",
      "Mild Spicekin",
      "Smoldersnap",
      "Sizzle Pup"
    ],
    "ABC": [
      "Corky the Collector",
      "Horned Cork Hoarder",
      "Vaporior",
      "Ignatia",
      "Cinderstorm"
    ]
  },
  "Zokor": {
    "SPS": [
      "Summoning Scholar",
      "Sanguinarian",
      "Mystic Guardian",
      "RR-8",
      "Ash Golem",
      "Tech Golem",
      "Drudge",
      "Masked Pikeman",
      "Solemn Soldier"
    ],
    "ABC": [
      "Ethereal Guardian",
      "Exo-Tech",
      "Battle Cleric"
    ]
  },
  "Moussu Picchu": {
    "SPS": [
      "Nightshade Maiden",
      "Spore Salesman",
      "Nightshade Flower Girl",
      "Breeze Borrower",
      "Windy Farmer",
      "Cloud Collector",
      "Rainwater Purifier",
      "Homeopathic Apothecary"
    ],
    "ABC": [
      "Wind Watcher",
      "Charming Chimer",
      "Fluttering Flutist",
      "Cycloness",
      "Wind Warrior"
    ]
  },
  "Floating Islands": {
    "SPS": [
      "Suave Pirate",
      "Cutthroat Pirate",
      "Cutthroat Cannoneer"
    ],
    "ABC": [
      "Scarlet Revenger",
      "Mairitime Pirate"
    ]
  },
  "Table of Contents": {
    "SPS": [
      "Hans Cheesetian Squeakersen",
      "Brothers Grimmaus",
      "Madame d'Ormouse",
      "Humphrey Dumphrey",
      "Little Bo Squeak",
      "Little Miss Fluffet"
    ],
    "ABC": [
      "Princess and the Olive",
      "Pinkielina",
      "Fibbocchio"
    ]
  }
}

function generateRaidSeries() {
  const series = [];
  for (const [raid, mice] of Object.entries(raidMice)) {
    series.push({
      stage: utils.genVarField("stage", `Intercepting - ${raid}`),
      cheese: utils.genVarField("cheese", ["Sky Pirate Swiss", "Sky Raider Romano"]),
      mice: utils.genInclude([
        ...mice['SPS'],
        "Captain Crook",
      ])
    });
    series.push({
      stage: utils.genVarField("stage", `Intercepting - ${raid}`),
      cheese: utils.genVarField("cheese", ["Aurora Bocconcini"]),
      mice: utils.genInclude([
        ...mice['ABC'],
        "Captain Crook",
      ])
    });
  }

  return series;
}
module.exports = {
  default: {
    location: utils.genVarField("location", "Cerulean Skyport"),
  },
  series: [
    {
      stage: utils.genVarField("stage", "Docked"),
      cheese: utils.genOrField("cheese", ["Brie", "Gouda"]),
      mice: utils.genInclude([
        "Port Pillager",
        "Amateur Knife Juggler",
        "Treacherous Dock Lurker",
      ])
    },
    {
      stage: utils.genVarField("stage", "Docked"),
      cheese: utils.genVarField("cheese", ["ESB+", "SB+"]),
      mice: utils.genInclude([
        "Port Pillager",
        "Amateur Knife Juggler",
        "Treacherous Dock Lurker",
      ])
    },
    {
      stage: utils.genVarField("stage", "Docked"),
      cheese: utils.genVarField("cheese", ["Sky Pirate Swiss", "Sky Raider Romano"]),
      mice: utils.genInclude([
        "Stubby Scrap Scavenger",
        "Sly Skulking Scrapper",
        "Hefty Hulking Hauler",
        "Quarrelsome Quartermaster",
      ])
    },
    {
      stage: utils.genVarField("stage", "Docked"),
      cheese: utils.genVarField("cheese", ["Aurora Bocconcini"]),
      mice: utils.genInclude([
        "Cluttergrin the Commodore of Curiosities",
      ])
    },
    {
      stage: utils.genVarField("stage", "Shipping - Atmo"),
      cheese: utils.genVarField("cheese", ["Sky Pirate Swiss", "Sky Raider Romano"]),
      mice: utils.genInclude([
        "Careless Canister Rider",
        "Covetous Canister Thief",
        "Colossal Canister Collector",
        "Quarrelsome Quartermaster",
      ])
    },
    {
      stage: utils.genVarField("stage", "Shipping - Atmo"),
      cheese: utils.genVarField("cheese", ["Aurora Bocconcini"]),
      mice: utils.genInclude([
        "Slipstream the Virtuoso of Vapours",
      ])
    },
    {
      stage: utils.genVarField("stage", "Shipping - Mining"),
      cheese: utils.genVarField("cheese", ["Sky Pirate Swiss", "Sky Raider Romano"]),
      mice: utils.genInclude([
        "Swift Stone Snatcher",
        "Greedy Stone Grappler",
        "Boulder and Pebble",
        "Quarrelsome Quartermaster",
      ])
    },
    {
      stage: utils.genVarField("stage", "Shipping - Mining"),
      cheese: utils.genVarField("cheese", ["Aurora Bocconcini"]),
      mice: utils.genInclude([
        "Craggerclaw the Magnate of Minerals",
      ])
    },
    {
      stage: utils.genVarField("stage", "Shipping - Spice"),
      cheese: utils.genVarField("cheese", ["Sky Pirate Swiss", "Sky Raider Romano"]),
      mice: utils.genInclude([
        "Arrogant Aurora Connoisseur",
        "Audacious Aurora Embezzler",
        "Acrobatic Aurora Bandit",
        "Quarrelsome Quartermaster",
      ])
    },
    {
      stage: utils.genVarField("stage", "Shipping - Spice"),
      cheese: utils.genVarField("cheese", ["Aurora Bocconcini"]),
      mice: utils.genInclude([
        "Shimmerdread the Sovereign of Spice",
      ])
    },
    ...generateRaidSeries()
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
