const utils = require("../_utils");

const standardCheese = ["SB+", "Gouda"]; // Launch Pad + HAIs including commoners
const skyCheese = ["Cloud Cheesecake"]; // HAIs excluding commoners
const combinedCheese = ["Cloud Cheesecake", "SB+", "Gouda"]; // LAIs

module.exports = {
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
      cheese: utils.genVarField("cheese", combinedCheese),
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
      cheese: utils.genVarField("cheese", skyCheese),
      stage: utils.genVarField("stage", "Physical Palisade"),
      config: [
        {
          opts: {
            include: ["Ground Gavaleer", "Sky Swordsman", "Herc", "Sky Squire"]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", standardCheese),
      stage: utils.genVarField("stage", "Physical Palisade"),
      config: [
        {
          opts: {
            include: [
              "Daydreamer",
              "Kite Flyer",
              "Ground Gavaleer",
              "Sky Swordsman"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", combinedCheese),
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
      cheese: utils.genVarField("cheese", skyCheese),
      stage: utils.genVarField("stage", "Shadow Stronghold"),
      config: [
        {
          opts: {
            include: [
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
      cheese: utils.genVarField("cheese", standardCheese),
      stage: utils.genVarField("stage", "Shadow Stronghold"),
      config: [
        {
          opts: {
            include: [
              "Daydreamer",
              "Kite Flyer",
              "Astrological Astronomer",
              "Overcaster"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", combinedCheese),
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
      cheese: utils.genVarField("cheese", skyCheese),
      stage: utils.genVarField("stage", "Tactical Castle"),
      config: [
        {
          opts: {
            include: [
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
      cheese: utils.genVarField("cheese", standardCheese),
      stage: utils.genVarField("stage", "Tactical Castle"),
      config: [
        {
          opts: {
            include: [
              "Daydreamer",
              "Kite Flyer",
              "Worried Wayfinder",
              "Gyrologer"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", combinedCheese),
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
      cheese: utils.genVarField("cheese", skyCheese),
      stage: utils.genVarField("stage", "Arcane Keep"),
      config: [
        {
          opts: {
            include: [
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
      cheese: utils.genVarField("cheese", standardCheese),
      stage: utils.genVarField("stage", "Arcane Keep"),
      config: [
        {
          opts: {
            include: [
              "Daydreamer",
              "Kite Flyer",
              "Sky Glass Sorcerer",
              "Sky Glass Glazier"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", combinedCheese),
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
      cheese: utils.genVarField("cheese", skyCheese),
      stage: utils.genVarField("stage", "Forgotten Fortress"),
      config: [
        {
          opts: {
            include: [
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
      cheese: utils.genVarField("cheese", standardCheese),
      stage: utils.genVarField("stage", "Forgotten Fortress"),
      config: [
        {
          opts: {
            include: [
              "Daydreamer",
              "Kite Flyer",
              "Spry Sky Explorer",
              "Spry Sky Seer"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", combinedCheese),
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
      cheese: utils.genVarField("cheese", skyCheese),
      stage: utils.genVarField("stage", "Hydro Hideaway"),
      config: [
        {
          opts: {
            include: [
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
      cheese: utils.genVarField("cheese", standardCheese),
      stage: utils.genVarField("stage", "Hydro Hideaway"),
      config: [
        {
          opts: {
            include: ["Daydreamer", "Kite Flyer", "Nimbomancer", "Sky Surfer"]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", combinedCheese),
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
      cheese: utils.genVarField("cheese", skyCheese),
      stage: utils.genVarField("stage", "Draconic Sanctuary"),
      config: [
        {
          opts: {
            include: [
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
      cheese: utils.genVarField("cheese", standardCheese),
      stage: utils.genVarField("stage", "Draconic Sanctuary"),
      config: [
        {
          opts: {
            include: [
              "Daydreamer",
              "Kite Flyer",
              "Tiny Dragonfly",
              "Lancer Guard"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", combinedCheese),
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
      cheese: utils.genVarField("cheese", skyCheese),
      stage: utils.genVarField("stage", "Law Garrison"),
      config: [
        {
          opts: {
            include: [
              "Devious Gentleman",
              "Stack of Thieves",
              "Lawbender",
              "Agent M"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", standardCheese),
      stage: utils.genVarField("stage", "Law Garrison"),
      config: [
        {
          opts: {
            include: [
              "Daydreamer",
              "Kite Flyer",
              "Devious Gentleman",
              "Stack of Thieves"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", "Sky Pirate Swiss"),
      stage: utils.genVarField("stage", "Some Pirates"),
      config: [
        {
          opts: {
            include: ["Suave Pirate", "Cutthroat Pirate", "Cutthroat Cannoneer"]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", "Sky Pirate Swiss"),
      stage: utils.genVarField("stage", "All Pirates"),
      config: [
        {
          opts: {
            include: [
              "Suave Pirate",
              "Cutthroat Pirate",
              "Cutthroat Cannoneer",
              "Scarlet Revenger",
              "Mairitime Pirate",
              "Admiral Cloudbeard"
            ]
          }
        }
      ]
    }
  ],
  postProcess: function(data) {
    const masterArr = data; // TODO: Temporary until generic processing implemented

    // Add fixed populations (Wardens + Paragons, and Richard for now)
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
