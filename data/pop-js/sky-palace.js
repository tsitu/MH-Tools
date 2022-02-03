const utils = require("../_utils");

const Cheese = ["SB+", "Gouda", "Cloud Cheesecake", "Extra Rich Cloud Cheesecake"];

module.exports = {
  default: {
    location: utils.genVarField("location", "Sky Palace")
  },
  series: [
    {
      cheese: utils.genVarField("cheese", Cheese),
      stage: utils.genVarField("stage", "Special"),
      config: [
        {
          opts: {
            include: [
              "Richard the Rich",
              "Fortuitous Fool",
              "Empyrean Appraiser",
              "Consumed Charm Tinkerer",
              "Empyrean Geologist",
              "Empyrean Empress"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", Cheese),
      stage: utils.genVarField("stage", "Physical"),
      config: [
        {
          opts: {
            include: [
              "Ground Gaveleer",
              "Sky Swordsman",
              "Herc",
              "Glamorous Gladiator"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", Cheese),
      stage: utils.genVarField("stage", "Shadow"),
      config: [
        {
          opts: {
            include: [
              "Daydreamer",
              "Kite Flyer",
              "Astrological Astronomer",
              "Overcaster",
              "Stratocaster",
              "Zealous Academic"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", Cheese),
      stage: utils.genVarField("stage", "Tactical"),
      config: [
        {
          opts: {
            include: [
              "Daydreamer",
              "Kite Flyer",
              "Worried Wayfinder",
              "Gyrologer",
              "Seasoned Islandographer",
              "Rocketeer"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", Cheese),
      stage: utils.genVarField("stage", "Arcane"),
      config: [
        {
          opts: {
            include: [
              "Daydreamer",
              "Kite Flyer",
              "Sky Glass Sorcerer",
              "Sky Glass Glazier",
              "Sky Dancer",
              "Sky Glider"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", Cheese),
      stage: utils.genVarField("stage", "Forgotten"),
      config: [
        {
          opts: {
            include: [
              "Daydreamer",
              "Kite Flyer",
              "Spry Sky Explorer",
              "Spry Sky Seer",
              "Cumulost",
              "Forgotten Elder"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", Cheese),
      stage: utils.genVarField("stage", "Hydro"),
      config: [
        {
          opts: {
            include: [
              "Daydreamer",
              "Kite Flyer",
              "Nimbomancer",
              "Sky Surfer",
              "Cute Cloud Conjurer",
              "Cloud Strider"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", Cheese),
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
              "Empyrean Javelineer"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", Cheese),
      stage: utils.genVarField("stage", "Law"),
      config: [
        {
          opts: {
            include: [
              "Daydreamer",
              "Kite Flyer",
              "Devious Gentleman",
              "Stack of Thieves",
              "Lawbender",
              "Aristo-Cat Burglar"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", "Sky Pirate Swiss"),
      stage: utils.genVarField("stage", "Pirates"),
      config: [
        {
          opts: {
            include: [
              "Suave Pirate",
              "Cutthroat Pirate",
              "Cutthroat Cannoneer",
              "Scarlet Revenger",
              "Mairitime Pirate",
              "Admiral Cloudbeard",
              "Peggy the Plunderer"
            ]
          }
        }
      ]
    }
  ]
};
