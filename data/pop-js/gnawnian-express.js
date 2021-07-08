const utils = require("../_utils");

// TODO: Sample sizes still low so a couple of rarer mice are missing from certain PCC's...

module.exports = {
  default: {
    location: utils.genVarField("location", "Gnawnian Express Station"),
    cheese: utils.genVarField("cheese", ["SB+", "Gouda"]) // TODO: Add Brie?
  },
  series: [
    // Station aka Waiting
    {
      config: [
        {
          vars: {
            stage: { Station: true }
          },
          fields: { stage: "Station" }
        }
      ]
    },

    // 1. Supply Depot
    {
      config: [
        {
          vars: {
            stage: { "1. Supply Depot - No Rush": true },
            charm: { "Supply Schedule Charm": false }
          },
          fields: { stage: "Supply Depot (No Supply Rush)" }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "1. Supply Depot - No Rush": true },
            charm: { "Supply Schedule Charm": true }
          },
          fields: {
            stage: "Supply Depot (No Supply Rush)",
            charm: "Supply Schedule Charm"
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "1. Supply Depot - Rush": true }
          },
          fields: {
            stage: "Supply Depot (Supply Rush)"
          }
        }
      ]
    },

    // 2. Raider River
    {
      charms: utils.genVarField("charm", [
        "Greasy Glob",
        "Door Guard",
        "Roof Rack"
      ]),
      config: [
        {
          vars: {
            stage: { "2. Raider River - Defending Target": true }
          },
          fields: {
            stage: "Raider River (Defending Target)"
          }
        }
      ]
    },
    {
      charms: utils.genVarField("charm", [
        "Greasy Glob",
        "Door Guard",
        "Roof Rack"
      ]),
      config: [
        {
          vars: {
            stage: { "2. Raider River - Defending Other": true }
          },
          fields: {
            stage: "Raider River (Defending Other)"
          }
        }
      ]
    },
    {
      // Implied by 'Not Defending' but include anyway :P
      charm: [
        {
          vars: {
            charm: {
              "Greasy Glob": false,
              "Door Guard": false,
              "Roof Rack": false
            }
          }
        }
      ],
      config: [
        {
          vars: {
            stage: { "2. Raider River - Not Defending": true }
          },
          fields: {
            stage: "Raider River (Not Defending)"
          },
          opts: {
            // Only exclude 'Raider' subgroup
            // TODO: Should these even be excluded? Seems like you can attract even w/o proper traincart level charm
            exclude: [
              "Dangerous Duo",
              "Mouse With No Name",
              "Sharpshooter",
              "Steel Horse Rider"
            ]
          }
        }
      ]
    },

    // 3. Daredevil Canyon: No Charm, Dusty Coal, Black Powder, Magmatic Crystal
    {
      config: [
        {
          vars: {
            stage: { "3. Daredevil Canyon": true },
            charm: {
              "Dusty Coal": false,
              "Black Powder": false,
              "Magmatic Crystal": false
            }
          },
          fields: {
            stage: "Daredevil Canyon"
          },
          opts: {
            exclude: [
              "Coal Shoveller",
              "Black Powder Thief",
              "Magmatic Crystal Thief",
              "Magmatic Golem"
            ]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "3. Daredevil Canyon": true },
            charm: { "Dusty Coal": true }
          },
          fields: {
            stage: "Daredevil Canyon",
            charm: "Dusty Coal"
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "3. Daredevil Canyon": true },
            charm: { "Black Powder": true }
          },
          fields: {
            stage: "Daredevil Canyon",
            charm: "Black Powder"
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "3. Daredevil Canyon": true },
            charm: { "Magmatic Crystal": true }
          },
          fields: {
            stage: "Daredevil Canyon",
            charm: "Magmatic Crystal"
          }
        }
      ]
    }
  ]
};
