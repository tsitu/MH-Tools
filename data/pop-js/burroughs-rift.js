const utils = require("../_utils");

const string_cheeses = [
  "Marble String",
  "Swiss String",
  "Brie String",
  "Magical String"
]

module.exports = {
  default: {
    location: utils.genVarField("location", "Burroughs Rift"),
    config: [
      {
        opts: {
          exclude: ["Glitchpaw"]
        }
      }
    ]
  },
  series: [
    {
      cheese: utils.genVarField("cheese", string_cheeses),
      stage: utils.genVarField("stage", "Mist 0"),
      config: [
        {
          opts: {
            include: [
              "Amplified Brown",
              "Amplified Grey",
              "Amplified White",
              "Automated Sentry",
              "Cybernetic Specialist",
              "Doktor",
              "Evil Scientist",
              "Portable Generator",
              "Rift Bio Engineer",
              "Surgeon Bot"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", string_cheeses),
      stage: utils.genVarField("stage", "Mist 1-5"),
      config: [
        {
          opts: {
            include: [
              "Count Vampire",
              "Phase Zombie",
              "Prototype",
              "Robat",
              "Tech Ravenous Zombie",
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", "Terre Ricotta"),
      stage: utils.genVarField("stage", "Mist 1-5"),
      config: [
        {
          opts: {
            include: [
              "Clump",
              "Cyber Miner",
              "Itty Bitty Rifty Burroughs",
              "Pneumatic Dirt Displacement",
              "Rifterranian",
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", "Polluted Parmesan"),
      stage: utils.genVarField("stage", "Mist 1-5"),
      config: [
        {
          opts: {
            include: [
              "Mecha Tail",
              "Radioactive Ooze",
              "Toxikinetic"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", string_cheeses),
      stage: utils.genVarField("stage", "Mist 6-18"),
      config: [
        {
          opts: {
            include: [
              "Count Vampire",
              "Lycanoid",
              "Phase Zombie",
              "Prototype",
              "Revenant",
              "Robat",
              "Tech Ravenous Zombie",
              "Zombot Unipire the Third"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", "Terre Ricotta"),
      stage: utils.genVarField("stage", "Mist 6-18"),
      config: [
        {
          opts: {
            include: [
              "Boulder Biter",
              "Clump",
              "Cyber Miner",
              "Itty Bitty Rifty Burroughs",
              "Lambent",
              "Master Exploder",
              "Pneumatic Dirt Displacement",
              "Rifterranian",
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", "Polluted Parmesan"),
      stage: utils.genVarField("stage", "Mist 6-18"),
      config: [
        {
          opts: {
            include: [
              "Mecha Tail",
              "Radioactive Ooze",
              "Rancid Bog Beast",
              "Super Mega Mecha Ultra RoboGold",
              "Toxic Avenger",
              "Toxikinetic",
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", string_cheeses),
      stage: utils.genVarField("stage", "Mist 19-20"),
      config: [
        {
          opts: {
            include: ["Monstrous Abomination"]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", "Terre Ricotta"),
      stage: utils.genVarField("stage", "Mist 19-20"),
      config: [
        {
          opts: {
            include: ["Big Bad Behemoth Burroughs"]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", "Polluted Parmesan"),
      stage: utils.genVarField("stage", "Mist 19-20"),
      config: [
        {
          opts: {
            include: [
              "Assassin Beast",
              "Menace of the Rift",
              "Null Gauntle",
              "Rift Circuitr",
              "Plutonium Tentacle",
              "Rancid Bog Beast",
              "Super Mega Mecha Ultra RoboGold",
              "Toxic Avenger"
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", "Undead String Emmental"),
      config: [
        {
          fields: { stage: "Undead String Emmental" },
        }
      ]
    }
  ],
  postProcess: function(data) {
    return data.map(function(item) {
      return Object.assign(item, { stage: item.stage.replace(/Mist/g, "Mist Level") });
    });
  }
};
