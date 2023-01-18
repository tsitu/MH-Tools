const utils = require("../_utils");

module.exports = {
  default: {
    location: utils.genVarField("location", "Queso Geyser")
  },
  series: [
    {
      config: [
        {
          vars: {
            stage: { "Cork Collecting": true },
            cheese: { "Bland Queso": true }
          },
          fields: { stage: "Cork Collecting", cheese: "Bland Queso" },
          opts: {
            include: ["Fuzzy Drake"]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Cork Collecting": true },
            cheese: { "Mild Queso": true }
          },
          fields: { stage: "Cork Collecting", cheese: "Mild Queso" },
          opts: {
            include: ["Fuzzy Drake", "Cork Defender"]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Cork Collecting": true },
            cheese: { "Medium Queso": true }
          },
          fields: { stage: "Cork Collecting", cheese: "Medium Queso" },
          opts: {
            include: [
              "Fuzzy Drake",
              "Cork Defender",
              "Burly Bruiser",
              "Corky, the Collector"
            ]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Cork Collecting": true },
            cheese: { "Hot Queso": true }
          },
          fields: { stage: "Cork Collecting", cheese: "Hot Queso" },
          opts: {
            include: [
              "Fuzzy Drake",
              "Cork Defender",
              "Burly Bruiser",
              "Corky, the Collector",
              "Horned Cork Hoarder"
            ]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Cork Collecting": true },
            cheese: { "Flamin' Queso": true }
          },
          fields: { stage: "Cork Collecting", cheese: "Flamin' Queso" },
          opts: {
            include: [
              "Cork Defender",
              "Burly Bruiser",
              "Corky, the Collector",
              "Horned Cork Hoarder",
              "Rambunctious Rain Rumbler"
            ]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Cork Collecting": true },
            cheese: { "Wildfire Queso": true }
          },
          fields: { stage: "Cork Collecting", cheese: "Wildfire Queso" },
          opts: {
            include: ["Corkataur"]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Pressure Building": true },
            cheese: { "Mild Queso": true }
          },
          fields: { stage: "Pressure Building", cheese: "Mild Queso" },
          opts: {
            include: ["Steam Sailor"]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Pressure Building": true },
            cheese: { "Medium Queso": true }
          },
          fields: { stage: "Pressure Building", cheese: "Medium Queso" },
          opts: {
            include: ["Steam Sailor", "Warming Wyvern"]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Pressure Building": true },
            cheese: { "Hot Queso": true }
          },
          fields: { stage: "Pressure Building", cheese: "Hot Queso" },
          opts: {
            include: ["Steam Sailor", "Warming Wyvern", "Vaporior"]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Pressure Building": true },
            cheese: { "Flamin' Queso": true }
          },
          fields: { stage: "Pressure Building", cheese: "Flamin' Queso" },
          opts: {
            include: ["Steam Sailor", "Warming Wyvern", "Vaporior", "Pyrehyde"]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Pressure Building": true },
            cheese: { "Wildfire Queso": true }
          },
          fields: { stage: "Pressure Building", cheese: "Wildfire Queso" },
          opts: {
            include: ["Emberstone Scaled"]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Tiny Eruption": true },
            cheese: { "Mild Queso": true }
          },
          fields: { stage: "Tiny Eruption", cheese: "Mild Queso" },
          opts: {
            include: ["Mild Spicekin"]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Tiny Eruption": true },
            cheese: { "Medium Queso": true }
          },
          fields: { stage: "Tiny Eruption", cheese: "Medium Queso" },
          opts: {
            include: ["Mild Spicekin", "Smoldersnap"]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Tiny Eruption": true },
            cheese: { "Hot Queso": true }
          },
          fields: { stage: "Tiny Eruption", cheese: "Hot Queso" },
          opts: {
            include: ["Mild Spicekin", "Smoldersnap", "Ignatia"]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Tiny Eruption": true },
            cheese: { "Flamin' Queso": true }
          },
          fields: { stage: "Tiny Eruption", cheese: "Flamin' Queso" },
          opts: {
            include: [
              "Mild Spicekin",
              "Smoldersnap",
              "Ignatia",
              "Bruticus, the Blazing"
            ]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Small Eruption": true },
            cheese: { "Mild Queso": true }
          },
          fields: { stage: "Small Eruption", cheese: "Mild Queso" },
          opts: {
            include: ["Mild Spicekin", "Sizzle Pup"]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Small Eruption": true },
            cheese: { "Medium Queso": true }
          },
          fields: { stage: "Small Eruption", cheese: "Medium Queso" },
          opts: {
            include: ["Mild Spicekin", "Sizzle Pup", "Smoldersnap"]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Small Eruption": true },
            cheese: { "Hot Queso": true }
          },
          fields: { stage: "Small Eruption", cheese: "Hot Queso" },
          opts: {
            include: ["Mild Spicekin", "Sizzle Pup", "Smoldersnap", "Ignatia"]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Small Eruption": true },
            cheese: { "Flamin' Queso": true }
          },
          fields: { stage: "Small Eruption", cheese: "Flamin' Queso" },
          opts: {
            include: [
              "Sizzle Pup",
              "Smoldersnap",
              "Ignatia",
              "Bruticus, the Blazing"
            ]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Medium Eruption": true },
            cheese: { "Mild Queso": true }
          },
          fields: { stage: "Medium Eruption", cheese: "Mild Queso" },
          opts: {
            include: ["Mild Spicekin", "Bearded Elder"]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Medium Eruption": true },
            cheese: { "Medium Queso": true }
          },
          fields: { stage: "Medium Eruption", cheese: "Medium Queso" },
          opts: {
            include: ["Mild Spicekin", "Bearded Elder", "Smoldersnap"]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Medium Eruption": true },
            cheese: { "Hot Queso": true }
          },
          fields: { stage: "Medium Eruption", cheese: "Hot Queso" },
          opts: {
            include: [
              "Mild Spicekin",
              "Bearded Elder",
              "Smoldersnap",
              "Ignatia"
            ]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Medium Eruption": true },
            cheese: { "Flamin' Queso": true }
          },
          fields: { stage: "Medium Eruption", cheese: "Flamin' Queso" },
          opts: {
            include: [
              "Bearded Elder",
              "Smoldersnap",
              "Ignatia",
              "Bruticus, the Blazing"
            ]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Large Eruption": true },
            cheese: { "Mild Queso": true }
          },
          fields: { stage: "Large Eruption", cheese: "Mild Queso" },
          opts: {
            include: ["Mild Spicekin", "Cinderstorm"]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Large Eruption": true },
            cheese: { "Medium Queso": true }
          },
          fields: { stage: "Large Eruption", cheese: "Medium Queso" },
          opts: {
            include: ["Mild Spicekin", "Cinderstorm", "Smoldersnap"]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Large Eruption": true },
            cheese: { "Hot Queso": true }
          },
          fields: { stage: "Large Eruption", cheese: "Hot Queso" },
          opts: {
            include: ["Mild Spicekin", "Cinderstorm", "Smoldersnap", "Ignatia"]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Large Eruption": true },
            cheese: { "Flamin' Queso": true }
          },
          fields: { stage: "Large Eruption", cheese: "Flamin' Queso" },
          opts: {
            include: [
              "Cinderstorm",
              "Smoldersnap",
              "Ignatia",
              "Bruticus, the Blazing"
            ]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Epic Eruption": true },
            cheese: { "Mild Queso": true }
          },
          fields: { stage: "Epic Eruption", cheese: "Mild Queso" },
          opts: {
            include: ["Mild Spicekin", "Stormsurge, the Vile Tempest"]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Epic Eruption": true },
            cheese: { "Medium Queso": true }
          },
          fields: { stage: "Epic Eruption", cheese: "Medium Queso" },
          opts: {
            include: [
              "Mild Spicekin",
              "Stormsurge, the Vile Tempest",
              "Smoldersnap"
            ]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Epic Eruption": true },
            cheese: { "Hot Queso": true }
          },
          fields: { stage: "Epic Eruption", cheese: "Hot Queso" },
          opts: {
            include: [
              "Mild Spicekin",
              "Stormsurge, the Vile Tempest",
              "Smoldersnap",
              "Ignatia"
            ]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Epic Eruption": true },
            cheese: { "Flamin' Queso": true }
          },
          fields: { stage: "Epic Eruption", cheese: "Flamin' Queso" },
          opts: {
            include: [
              "Stormsurge, the Vile Tempest",
              "Smoldersnap",
              "Ignatia",
              "Bruticus, the Blazing"
            ]
          }
        }
      ]
    },
    {
      config: [
        {
          vars: {
            stage: { "Epic Eruption": true },
            cheese: { "Wildfire Queso ": true }
          },
          fields: { stage: "Epic Eruption", cheese: "Wildfire Queso" },
          opts: {
            include: ["Kalor'ignis of the Geyser"]
          }
        }
      ]
    }
  ]
};
