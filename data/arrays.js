"use strict";

// Utility function for determining size of multi-level array
Object.size = function(obj) {
  var size = 0;
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      size++;
    }
  }
  return size;
};

// Hunter's title wisdom requirements
var rankupDiff = {
  novice: 2000, // 2000 - 0
  recruit: 3000, // 5000 - 2000
  apprentice: 7500, // 12500 - 5000
  initiate: 18750, // 31250 - 12500
  journeyman: 34190, // 65440 - 31250
  master: 72373, // 137813 - 65440
  grandmaster: 165375, // 303188 - 137813
  legendary: 363825, // 667013 - 303188
  hero: 800415, // 1467428 - 667013
  knight: 1760913, // 3228341 - 1467428
  lord: 3874008, // 7102349 - 3228341
  baron: 8522819, // 15625168 - 7102349
  count: 18750202, // 34375370 - 15625168
  duke: 41250443, // 75625813 - 34375370
  grandduke: 90750976, // 166376789 - 75625813
  archduke: 199652147, // 366028936 - 166376789
  viceroy: 439234723, // 805263659 - 366028936
  elder: 966316389, // 1771580048 - 805263659
  sage: 2125896058 // 3897476106 - 1771580048
};

var standardCheeseCost = {
  "Cheddar": 10,
  "Marble": 50,
  "Swiss": 100,
  "Brie": 200,
  "Gouda": 600,
  "Marble String": 300,
  "Swiss String": 800,
  "Brie String": 1600
};

var riftWeapons = [
  "Biomolecular Re-atomizer Trap",
  "Celestial Dissonance Trap",
  "Chrome Celestial Dissonance Trap",
  "Christmas Crystalabra Trap",
  "Crystal Tower",
  "Darkest Chocolate Bunny Trap",
  "Derelict Airship Trap",
  "Focused Crystal Laser",
  "Multi-Crystal Laser",
  "Mysteriously unYielding Null-Onyx Rampart of Cascading Amperes",
  "Rift Glacier Gatler",
  "Timesplit Dissonance Trap",
  "Wacky Inflatable Party People Trap"
];

var riftBases = [
  "Attuned Enerchi Induction Base",
  "Clockwork Base",
  "Elixir Exchanger Base",
  "Enerchi Induction Base",
  "Fissure Base",
  "Fracture Base",
  "Mist Meter Regulator Base",
  "Prestige Base",
  "Rift Base",
  "Rift Mist Diffuser Base"
];

// Rift charms with names that do not contain the word "Rift"
var riftCharms = [
  "Cherry Charm",
  "Gnarled Charm",
  "Stagnant Charm",
  "Enerchi Charm",
  "Super Enerchi Charm",
  "Timesplit Charm",
  "Eggstra Charge Charm"
];

var labyrinthMiceClues = {
  "Ash Golem": 1,
  "Automated Stone Sentry": 2,
  "Corridor Bruiser": 0,
  "Dark Templar": 3,
  "Drudge": 1,
  "Fungal Technomorph": 3,
  "Hired Eidolon": 1,
  "Lost": 0,
  "Lost Legionnaire": 0,
  "Masked Pikeman": 1,
  "Mimic": 1,
  "Mind Tearer": 2,
  "Mush Monster": 1,
  "Mushroom Harvester": 1,
  "Mystic Guardian": 2,
  "Mystic Herald": 2,
  "Mystic Scholar": 3,
  "Nightshade Nanny": 2,
  "Reanimated Carver": 0,
  "RR-8": 1,
  "Sanguinarian": 1,
  "Shadow Stalker": 0,
  "Solemn Soldier": 2,
  "Summoning Scholar": 1,
  "Tech Golem": 2,
  "Treasure Brawler": 2
};

var dragons = [
  "Dragon",
  "Icewing",
  "Dragoon",
  "Ful'Mina the Mountain Queen",
  "Thunder Strike",
  "Thundering Watcher",
  "Thunderlord",
  "Violet Stormchild",
  "Burly Bruiser",
  "Cork Defender",
  "Corkataur",
  "Corky the Collector",
  "Fuzzy Drake",
  "Horned Cork Hoarder",
  "Rambunctious Rain Rumbler",
  "Emberstone Scaled",
  "Pyrehyde",
  "Steam Sailor",
  "Vaporior",
  "Warming Wyvern",
  "Bearded Elder",
  "Bruticus the Blazing",
  "Cinderstorm",
  "Ignatia",
  "Kalor'ignis of the Geyser",
  "Mild Spicekin",
  "Sizzle Pup",
  "Smoldersnap",
  "Stormsurge the Vile Tempest",
  "Tiny Dragonfly",
  "Lancer Guard",
  "Dragonbreather",
  "Regal Spearman",
  "Paragon of Dragons",
  "Empyrean Javelineer",
  "Frostnip Icebound",
  "Blizzara Winterosa",
  "Iciclesius the Defender",
  "Rimeus Polarblast",
  "Frigidocius Coldshot",
  "Chillandria Permafrost",
  "Avalancheus the Glacial",
  "Arcticus the Biting Frost",
  "Squire Sizzleton",
  "Torchbearer Tinderhelm",
  "Colonel Crisp",
  "Crematio Scorchworth",
  "Flamina Cinderbreath",
  "Combustius Furnaceheart",
  "Incendarius the Unquenchable",
  "Sulfurious the Raging Inferno",
  "Goopus Dredgemore",
  "Noxio Sludgewell",
  "Dreck Grimehaven",
  "Malignus Vilestrom",
  "Venomona Festerbloom",
  "Belchazar Banewright",
  "Pestilentia the Putrid",
  "Corrupticus the Blight Baron",
  "Tranquilia Protecticus",
  "Absolutia Harmonius",
  "Magnatius Majestica",
  "Supremia Magnificus",
  "Three'amat the Mother of Dragons",
  "Mythical Dragon Emperor",
];

var tauntings = [
  "Centaur Ranger",
  "Cyclops Barbarian",
  "Monstrous Black Widow",
  "Tri-dra"
];

var rage_increase_table = {
  // CC Low
  "Bloomed Sylvan": { Crazed: 1, Gnarled: 0, Deep: 0 },
  "Cranky Caterpillar": { Crazed: 1, Gnarled: 0, Deep: 0 },
  "Mossy Moosker": { Crazed: 1, Gnarled: 0, Deep: 0 },

  // CC Mid
  "Treant Queen": { Crazed: 2, Gnarled: 0, Deep: 0 },
  "Spirit Fox": { Crazed: 2, Gnarled: 0, Deep: 0 },
  "Red-Eyed Watcher Owl": { Crazed: 2, Gnarled: 0, Deep: 0 },

  // CC High
  "Cyclops Barbarian": { Crazed: 0, Gnarled: 0, Deep: 0 },

  // CC Funnel-only
  "Cherry Sprite": { Crazed: 6, Gnarled: 0, Deep: 0 },

  // GG Low
  "Spirit of Balance": { Crazed: 0, Gnarled: 1, Deep: 0 },
  "Fungal Frog": { Crazed: 0, Gnarled: 1, Deep: 0 },
  "Karmachameleon": { Crazed: 0, Gnarled: 1, Deep: 0 },

  // GG Mid
  "Red Coat Bear": { Crazed: 0, Gnarled: 2, Deep: 0 },
  "Rift Tiger": { Crazed: 0, Gnarled: 2, Deep: 0 },
  "Nomadic Warrior": { Crazed: 0, Gnarled: 2, Deep: 0 },

  // GG High
  "Centaur Ranger": { Crazed: 0, Gnarled: 0, Deep: 0 },

  // GG Funnel-only
  "Naturalist": { Crazed: 0, Gnarled: 6, Deep: 0 },

  // DL Low
  "Twisted Treant": { Crazed: 0, Gnarled: 0, Deep: 1 },
  "Water Sprite": { Crazed: 0, Gnarled: 0, Deep: 1 },
  "Crazed Goblin": { Crazed: 0, Gnarled: 0, Deep: 1 },

  // DL Mid
  "Medicine": { Crazed: 0, Gnarled: 0, Deep: 2 },
  "Tree Troll": { Crazed: 0, Gnarled: 0, Deep: 2 },
  "Winged Harpy": { Crazed: 0, Gnarled: 0, Deep: 2 },

  // DL High
  "Tri-dra": { Crazed: 0, Gnarled: 0, Deep: 0 },

  // DL Funnel-only
  "Grizzled Silth": { Crazed: 0, Gnarled: 0, Deep: 6 },

  // Misc
  "Gilded Leaf": { Crazed: 2, Gnarled: 2, Deep: 2 },
  "Monstrous Black Widow": { Crazed: 0, Gnarled: 0, Deep: 0 }
};

var brutes = ["Snow Bowler", "Yeti", "Mammoth"];
var bombSquad = ["Saboteur", "Stickybomber", "Heavy Blaster"];
var berglings = [
  "Incompetent Ice Climber",
  "Polar Bear",
  "Snow Slinger",
  "Snow Soldier",
  "Iceblock",
  "Wolfskie",
  "Snowblind"
];

var catchDepth = {
  "Chipper": 16,
  "Frostlance Guard": 15,
  "Frostwing Commander": 10,
  "General Drheller": 50,
  "Heavy Blaster": 10,
  "Iceblade": 0,
  "Iceblock": 8,
  "Icebreaker": 16,
  "Incompetent Ice Climber": 4,
  "Lady Coldsnap": 8,
  "Living Salt": 20,
  "Lord Splodington": 4,
  "Mammoth": -6,
  "Polar Bear": 8,
  "Princess Fist": 12,
  "Saboteur": 8,
  "Snow Bowler": -4,
  "Snow Slinger": 8,
  "Snow Soldier": 4,
  "Snowblind": 4,
  "Stickybomber": 9,
  "Water Wielder": 0,
  "Wolfskie": 4,
  "Yeti": -4
};

var ftcDepth = {
  "Chipper": 0,
  "Frostlance Guard": 0,
  "Frostwing Commander": 0,
  "General Drheller": -6,
  "Heavy Blaster": -6,
  "Iceblade": -5,
  "Iceblock": -4,
  "Icebreaker": 0,
  "Incompetent Ice Climber": -4,
  "Lady Coldsnap": 0,
  "Living Salt": 0,
  "Lord Splodington": 0,
  "Mammoth": -20,
  "Polar Bear": -4,
  "Princess Fist": 0,
  "Saboteur": -4,
  "Snow Bowler": -16,
  "Snow Slinger": -4,
  "Snow Soldier": -4,
  "Snowblind": -4,
  "Stickybomber": -5,
  "Water Wielder": -5,
  "Wolfskie": -4,
  "Yeti": -16
};

var deltaAmp = {
  "Bruticle": 4,
  "Frostbite": 4,
  "Icicle": 3,
  "Over-Prepared": 1,
  "Penguin": 1,
  "Winter Mage": 5,

  "Derpicorn": 1,
  "Hydrophobe": 1,
  "Puddlemancer": 3,
  "Spring Familiar": 6,
  "Tanglefoot": 2,
  "Vinetail": 5,

  "Firebreather": 4,
  "Firefly": 2,
  "Hot Head": 1,
  "Monarch": 1,
  "Stinger": 4,
  "Summer Mage": 5,

  "Fall Familiar": 6,
  "Harvest Harrier": 3,
  "Harvester": 5,
  "Pumpkin Head": 1,
  "Scarecrow": 1,
  "Whirleygig": 1
};

var pressureMice = {
  "Steam Sailor": 5,
  "Warming Wyvern": 15,
  "Vaporior": 40,
  "Pyrehyde": 100,
  "Emberstone Scaled": 1500
};

var pirateSealMice = {
  "Suave Pirate": 1,
  "Cutthroat Pirate": 1,
  "Cutthroat Cannoneer": 1,
  "Scarlet Revenger": 2,
  "Mairitime Pirate": 2.5,
  "Admiral Cloudbeard": 5,
  "Peggy the Plunderer": 10
};

// 12/11/20 FBF @ timestamp 10:11
var scoundrelPirateMice = [
  // Sky Pirates
  "Suave Pirate",
  "Cutthroat Pirate",
  "Cutthroat Cannoneer",
  "Scarlet Revenger",
  "Mairitime Pirate",
  "Admiral Cloudbeard",
  // Dock Dwellers
  "Cabin Boy",
  "Dashing Buccaneer",
  "Bilged Boatswain",
  "Barmy Gunner",
  "Pirate",
  "Corrupt Commodore",
  // Misc
  "Buccaneer",
  "Pirate Anchor",
  "Dread Pirate Mousert",
  "Deranged Deckhand",
  "Scorned Pirate",
  "Ghost Pirate Queen",
  "Captain Cannonball",
  "Admiral Arrrgh"
];

var freshness2stale = {
  "-6": 1,
  "-5": 0.9,
  "-4": 0.8,
  "-3": 0.7,
  "-2": 0.6,
  "-1": 0.55,
  "0": 0.5,
  "1": 0.45,
  "2": 0.4,
  "3": 0.3,
  "4": 0.2,
  "5": 0.1,
  "6": 0
};

var reverseParseFreshness = {
  "-6": "Über Stale (100% stale rate)",
  "-5": "Ultimately Stale (90% stale rate)",
  "-4": "Insanely Stale (80% stale rate)",
  "-3": "Extremely Stale (70% stale rate)",
  "-2": "Very Stale (60% stale rate)",
  "-1": "Stale (55.5% stale rate)",
  "0": "No Effect (50% stale rate)",
  "1": "Fresh (45% stale rate)",
  "2": "Very Fresh (40% stale rate)",
  "3": "Extremely Fresh (30% stale rate)",
  "4": "Insanely Fresh (20% stale rate)",
  "5": "Ultimately Fresh (10% stale rate)",
  "6": "Über Fresh (0% stale rate)"
};

var parseFreshness = {
  "Uber Stale": -6,
  "Ultimately Stale": -5,
  "Insanely Stale": -4,
  "Extremely Stale": -3,
  "Very Stale": -2,
  "Stale": -1,
  "No Effect": 0,
  "Fresh": 1,
  "Very Fresh": 2,
  "Extremely Fresh": 3,
  "Insanely Fresh": 4,
  "Ultimately Fresh": 5,
  "Uber Fresh": 6
};

// Trap type to integer map for lookup in the powers array
var typeEff = {
  Arcane: 1,
  Draconic: 2,
  Forgotten: 3,
  Hydro: 4,
  Parental: 5,
  Physical: 6,
  Shadow: 7,
  Tactical: 8,
  Law: 9,
  Rift: 10
};

// Weapons that interact with Snowball Charms to give 20% power bonus
var festiveTraps = [
  "Christmas Cactus Trap",
  "Christmas Cracker Trap",
  "Christmas Crystalabra Trap",
  "Double Diamond Adventure",
  "Explosive Toboggan Ride",
  "Father Winter's Timepiece Trap",
  "Festive Forgotten Fir Trap",
  "Festive Gauntlet Crusher",
  "Gingerbread House Surprise",
  "Glacier Gatler",
  "Goldfrost Crossbow Trap",
  "Golem Guardian Arcane Trap",
  "Golem Guardian Forgotten Trap",
  "Golem Guardian Hydro Trap",
  "Golem Guardian Physical Trap",
  "Golem Guardian Tactical Trap",
  "Harrowing Holiday Harpoon Harp",
  "Holiday Hydro Hailstone Trap",
  "Ice Blaster",
  "Infinite Winter Horizon Trap",
  "Nutcracker Nuisance Trap",
  "Rift Glacier Gatler",
  "S.S. Scoundrel Sleigher Trap",
  "Snow Barrage",
  "Snowglobe Trap",
  "The Holiday Express Trap",
  "Wrapped Gift Trap"
];

// Weapons that interact with Spooky Charms to give 20% power bonus
var halloweenTraps = [
  "Admiral's Galleon Trap",
  "Boiling Cauldron Trap",
  "Brain Extractor",
  "Cackle Lantern Trap",
  "Candy Crusher Trap",
  "Cemetery Gate Grappler",
  "Haunted Shipwreck Trap",
  "Maniacal Brain Extractor",
  "Pumpkin Pummeler",
  "Sandcastle Shard Trap",
  "Soul Catcher",
  "Soul Harvester",
  "Terrifying Spider Trap",
  "The Haunted Manor Trap"
];

// Weapons that interact with Party Charms to give 20% power bonus
var birthdayTraps = [
  "Anniversary Ambush",
  "Anniversary Ancient Box Trap",
  "Anniversary Arcane Capturing Rod Of Never Yielding Mystery",
  "Anniversary DeathBot",
  "Anniversary Reaper's Perch",
  "Birthday Candle Kaboom",
  "Birthday Party Pi\xF1ata Bonanza",
  "Bubbles: The Party Crasher Trap",
  "Nannybot",
  "Queso Factory Trap",
  "Sprinkly Cupcake Surprise Trap",
  "Stale Cupcake Golem Trap",
  "Surprise Party Trap",
  "The Forgotten Art of Dance",
  "Ultra MegaMouser MechaBot Trap",
  "Wacky Inflatable Party People Trap"
];

var wereMice = [
  "Alpha Weremouse",
  "Mischievous Wereminer",
  "Night Shift Materials Manager",
  "Reveling Lycanthrope",
  "Wealthy Werewarrior",
  "Werehauler",
  "Wereminer"
];

var cosmicCritters = [
  "Arcane Summoner",
  "Cursed Taskmaster",
  "Hypnotized Gunslinger",
  "Meteorite Golem",
  "Meteorite Mystic",
  "Night Watcher"
];

/**
 * Maps Furoma Rift battery level to bonus power and luck
 * Level : [Power, Luck]
 */
var batteryEffects = {
  0: [0, 0],
  1: [90, 0],
  2: [500, 1],
  3: [3000, 2],
  4: [8500, 5],
  5: [16000, 10],
  6: [30000, 12],
  7: [50000, 25],
  8: [90000, 35],
  9: [190000, 50],
  10: [300000, 100]
};
