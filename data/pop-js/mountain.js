const utils = require("../_utils");

module.exports = {
  default: {
    location: utils.genVarField('location', 'Mountain'),
    after: utils.genVarField('after', 1637078400) // 2021-11-16Z16:00:00
  },
  series: [
    {
      cheese: utils.genVarField('cheese', 'Cheddar'),
      config: [
        {
          opts: {
            include: [
              'Brown',
              'Dwarf',
              'Frozen',
              'Granite',
              'Grey',
              'White',
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField('cheese', 'White Cheddar'),
      config: [
        {
          opts: {
            include: [
              'Dwarf',
              'Frozen',
              'Granite',
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField('cheese', 'Marble'),
      config: [
        {
          vars: {
            charm: {
              "Prospector's": false,
            },
          },
          opts: {
            include: [
              'Bionic',
              'Brown',
              'Diamond',
              'Dwarf',
              'Frozen',
              'Gold',
              'Granite',
              'Grey',
              'White',
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField('cheese', 'Marble'),
      charm: utils.genVarField('charm', "Prospector's"),
      config: [
        {
          opts: {
            include: [
              'Bionic',
              'Brown',
              'Diamond',
              'Dwarf',
              'Frozen',
              'Gold',
              'Granite',
              'Grey',
              'White',
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField('cheese', 'Swiss'),
      config: [
        {
          vars: {
            charm: {
              "Prospector's": false,
            },
          },
          opts: {
            include: [
              'Bionic',
              'Brown',
              'Diamond',
              'Dwarf',
              'Frozen',
              'Gold',
              'Grey',
              'Ninja',
              'Steel',
              'White',
              'Zombie',
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField('cheese', 'Swiss'),
      charm: utils.genVarField('charm', "Prospector's"),
      config: [
        {
          opts: {
            include: [
              'Bionic',
              'Brown',
              'Diamond',
              'Dwarf',
              'Frozen',
              'Gold',
              'Grey',
              'Ninja',
              'Steel',
              'White',
              'Zombie',
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField('cheese', 'Brie'),
      config: [
        {
          vars: {
            charm: {
              "Prospector's": false,
            },
          },
          opts: {
            include: [
              'Bionic',
              'Diamond',
              'Flying',
              'Frozen',
              'Gold',
              'Ninja',
              'Steel',
              'Zombie',
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField('cheese', 'Brie'),
      charm: utils.genVarField('charm', "Prospector's"),
      config: [
        {
          opts: {
            include: [
              'Bionic',
              'Diamond',
              'Flying',
              'Frozen',
              'Gold',
              'Ninja',
              'Steel',
              'Zombie',
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField('cheese', 'Gouda'),
      config: [
        {
          vars: {
            charm: {
              "Prospector's": false,
            },
          },
          opts: {
            include: [
              'Bionic',
              'Diamond',
              'Flying',
              'Gold',
              'Ninja',
              'Steel',
              'Zombie',
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField('cheese', 'Gouda'),
      charm: utils.genVarField('charm', "Prospector's"),
      config: [
        {
          opts: {
            include: [
              'Bionic',
              'Diamond',
              'Flying',
              'Gold',
              'Ninja',
              'Steel',
              'Zombie',
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField('cheese', 'SB+'),
      config: [
        {
          vars: {
            charm: {
              "Prospector's": false,
            },
          },
          opts: {
            include: [
              'Black Widow',
              'Diamond',
              'Flying',
              'Fog',
              'Frosty Snow',
              'Gold',
              'Ninja',
              'Pebble',
              'Silvertail',
              'Zombie',
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField('cheese', 'SB+'),
      charm: utils.genVarField('charm', "Prospector's"),
      config: [
        {
          opts: {
            include: [
              'Black Widow',
              'Diamond',
              'Flying',
              'Fog',
              'Frosty Snow',
              'Gold',
              'Ninja',
              'Pebble',
              'Silvertail',
              'Zombie',
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField('cheese', 'Chedd-Ore'),
      config: [
        {
          opts: {
            include: [
              'Craggy Ore',
              'Mountain',
              'Slope Swimmer',
            ]
          }
        }
      ]
    },
    {
      cheese: utils.genVarField('cheese', 'Abominable Asiago'),
      config: [
        {
          opts: {
            include: [
              'Abominable Snow',
            ]
          }
        }
      ]
    },
  ]
}
