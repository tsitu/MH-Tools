const utils = require("../_utils");

const lpCheeses = ["SB+", "Gouda"];
const skyCheeses = ["Cloudcake", "SB+", "Gouda"];

module.exports = {
  default: {
    location: utils.genVarField("location", "Floating Islands")
  },
  series: [
    {
      cheese: utils.genVarField("cheese", lpCheeses),
      stage: utils.genVarField("stage", "Launch Pad"),
      config: [
        {
          opts: {
            include: [
              "Skydiver",
              "Sky Greaser",
              "Launchpad Labourer",
              "Cloud Miner"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", skyCheeses),
      stage: utils.genVarField("stage", "Physical Island"),
      config: [
        {
          opts: {
            include: [
              "Daydreamer",
              "Kite Flyer",
              "Ground Gavaleer",
              "Sky Swordsman",
              "Herc"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", skyCheeses),
      stage: utils.genVarField("stage", "Physical Palisade"),
      config: [
        {
          opts: {
            include: [
              "Daydreamer",
              "Kite Flyer",
              "Ground Gavaleer",
              "Sky Swordsman",
              "Herc",
              "Sky Squire"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", skyCheeses),
      stage: utils.genVarField("stage", "Shadow Island"),
      config: [
        {
          opts: {
            include: [
              "Daydreamer",
              "Kite Flyer",
              "Astrological Astronomer",
              "Overcaster",
              "Stratocaster"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", skyCheeses),
      stage: utils.genVarField("stage", "Shadow Stronghold"),
      config: [
        {
          opts: {
            include: [
              "Daydreamer",
              "Kite Flyer",
              "Astrological Astronomer",
              "Overcaster",
              "Stratocaster",
              "Shadow Sage"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", skyCheeses),
      stage: utils.genVarField("stage", "Tactical Island"),
      config: [
        {
          opts: {
            include: [
              "Daydreamer",
              "Kite Flyer",
              "Worried Wayfinder",
              "Gyrologer",
              "Seasoned Islandographer"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", skyCheeses),
      stage: utils.genVarField("stage", "Tactical Castle"),
      config: [
        {
          opts: {
            include: [
              "Daydreamer",
              "Kite Flyer",
              "Worried Wayfinder",
              "Gyrologer",
              "Seasoned Islandographer",
              "Captain Cloudkicker"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", skyCheeses),
      stage: utils.genVarField("stage", "Arcane Island"),
      config: [
        {
          opts: {
            include: [
              "Daydreamer",
              "Kite Flyer",
              "Sky Glass Sorcerer",
              "Sky Glass Glazier",
              "Sky Dancer"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", skyCheeses),
      stage: utils.genVarField("stage", "Arcane Keep"),
      config: [
        {
          opts: {
            include: [
              "Daydreamer",
              "Kite Flyer",
              "Sky Glass Sorcerer",
              "Sky Glass Glazier",
              "Sky Dancer",
              "Sky Highborne"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", skyCheeses),
      stage: utils.genVarField("stage", "Forgotten Island"),
      config: [
        {
          opts: {
            include: [
              "Daydreamer",
              "Kite Flyer",
              "Spry Sky Explorer",
              "Spry Sky Seer",
              "Cumulost"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", skyCheeses),
      stage: utils.genVarField("stage", "Forgotten Fortress"),
      config: [
        {
          opts: {
            include: [
              "Daydreamer",
              "Kite Flyer",
              "Spry Sky Explorer",
              "Spry Sky Seer",
              "Cumulost",
              "Spheric Diviner"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", skyCheeses),
      stage: utils.genVarField("stage", "Hydro Island"),
      config: [
        {
          opts: {
            include: [
              "Daydreamer",
              "Kite Flyer",
              "Nimbomancer",
              "Sky Surfer",
              "Cute Cloud Conjurer"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", skyCheeses),
      stage: utils.genVarField("stage", "Hydro Hideaway"),
      config: [
        {
          opts: {
            include: [
              "Daydreamer",
              "Kite Flyer",
              "Nimbomancer",
              "Sky Surfer",
              "Cute Cloud Conjurer",
              "Mist Maker"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", skyCheeses),
      stage: utils.genVarField("stage", "Draconic Island"),
      config: [
        {
          opts: {
            include: [
              "Daydreamer",
              "Kite Flyer",
              "Tiny Dragonfly",
              "Lancer Guard",
              "Dragonbreather"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", skyCheeses),
      stage: utils.genVarField("stage", "Draconic Sanctuary"),
      config: [
        {
          opts: {
            include: [
              "Daydreamer",
              "Kite Flyer",
              "Tiny Dragonfly",
              "Lancer Guard",
              "Dragonbreather",
              "Regal Spearman"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", skyCheeses),
      stage: utils.genVarField("stage", "Law Island"),
      config: [
        {
          opts: {
            include: [
              "Daydreamer",
              "Kite Flyer",
              "Devious Gentleman",
              "Stack of Thieves",
              "Lawbender"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", skyCheeses),
      stage: utils.genVarField("stage", "Law Garrison"),
      config: [
        {
          opts: {
            include: [
              "Daydreamer",
              "Kite Flyer",
              "Devious Gentleman",
              "Stack of Thieves",
              "Lawbender",
              "Agent M"
            ]
          }
        }
      ]
    }
  ],
  postProcess: function(data) {
    const masterArr = data.map(function(item) {
      // Rename to Cloud Cheesecake
      var cheese =
        item.cheese === "Cloudcake" ? "Cloud Cheesecake" : item.cheese;
      return Object.assign(item, { cheese: cheese });
    });

    // Add fixed populations (Wardens + Paragons, along with Pirates and Richard for now)
    const skyPirates = [
      "Suave Pirate",
      "Cutthroat Pirate",
      "Cutthroat Cannoneer",
      "Scarlet Revenger",
      "Mairitime Pirate",
      "Admiral Cloudbeard"
    ];
    skyPirates.forEach(mouse => {
      masterArr.push({
        stage: "Sky Pirates",
        location: "Floating Islands",
        cheese: "Sky Pirate Swiss",
        mouse: mouse,
        attraction: "16.66%",
        sample: 6
      });
    });

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
      stage: "Richard",
      location: "Floating Islands",
      cheese: "Cloud Cheesecake",
      mouse: "Richard the Rich",
      attraction: "100.00%",
      sample: 1
    });

    return masterArr;
  }
};
