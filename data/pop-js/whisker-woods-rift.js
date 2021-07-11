const utils = require("../_utils")

var crazed_mice_exclusion = {
  Low: [
    "Cyclops Barbarian", // CC boss
    "Red-Eyed Watcher Owl", // CC med mice
    "Treant Queen", // CC med mice
    "Spirit Fox", // CC med mice
  ],
  Medium: [
    "Cyclops Barbarian", // CC boss
    "Cranky Caterpillar", // CC low-only mice
    "Bloomed Sylvan", // CC low-only mice
    "Mossy Moosker", // CC low-only mice
  ],
  High: [
    "Red-Eyed Watcher Owl", // CC med mice
    "Treant Queen", // CC med mice
    "Spirit Fox", // CC med mice
    "Cranky Caterpillar", // CC low-only mice
    "Bloomed Sylvan", // CC low-only mice
    "Mossy Moosker", // CC low-only mice
  ]
}

var gnarled_mice_exclusion = {
  Low: [
    "Centaur Ranger", // GGT boss
    "Red Coat Bear", // GGT med mice
    "Rift Tiger", // GGT med mice
    "Nomadic Warrior", // GGT med mice
  ],
  Medium: [
    "Centaur Ranger", // GGT boss
    "Fungal Frog", // GGT low-only mice
    "Spirit of Balance", // GGT low-only mice
    "Karmachameleon", // GGT low-only mice
  ],
  High: [
    "Red Coat Bear", // GGT med mice
    "Rift Tiger", // GGT med mice
    "Nomadic Warrior", // GGT med mice
    "Medicine", // DL med mice
    "Fungal Frog", // GGT low-only mice
    "Spirit of Balance", // GGT low-only mice
    "Karmachameleon", // GGT low-only mice
  ]
}

var deep_mice_exclusion = {
  Low: [
    "Tri-dra", // DL boss
    "Winged Harpy", // DL med mice
    "Tree Troll", // DL med mice
    "Medicine", // DL med mice
  ],
  Medium: [
    "Tri-dra", // DL boss
    "Twisted Treant", // DL low-only mice
    "Crazed Goblin", // DL low-only mice
    "Water Sprite", // DL low-only mice
  ],
  High: [
    "Winged Harpy", // DL med mice
    "Tree Troll", // DL med mice
    "Medicine", // DL med mice
    "Medicine", // DL med mice
    "Twisted Treant", // DL low-only mice
    "Crazed Goblin", // DL low-only mice
    "Water Sprite", // DL low-only mice
  ]
}

var high_high_high_config = [ {
        vars: { stage: {'CC 50': true}, stage1: {'GGT 50': true}, stage2: {'DL 50': true} },
        fields: { stage: 'High/High/High' },
        opts: {
          include: [
            "Cyclops Barbarian",
            "Centaur Ranger",
            "Tri-dra",
            "Monstrous Black Widow",
            ]
          }
      } ]

/** The starting configuration. This will be populated further with all rage level combinations */
var configuration_list = {
  default: {
    location: utils.genVarField('location', 'Whisker Woods Rift'),
    cheese: utils.genVarField('cheese', [
      "Magical String",
      "Brie String",
      "Swiss String",
    ]),
  },
  series: [
    // High/High/High
    {
      charm: [{ vars: { charm: { Taunting: true }}, fields: { charm: "Taunting" } }],
      config: high_high_high_config,
      cheese: utils.genVarField('cheese', [
        "Magical String",
        "Brie String",
        "Swiss String",
        "Lactrodectus Lancashire"
      ]),
    },
    {
      charm: [{vars: { charm: { Stagnant: false, Cherry: false, Gnarled: false, Taunting: false }}}],
      config: high_high_high_config,
      cheese: utils.genVarField('cheese', [
        "Magical String",
        "Brie String",
        "Swiss String",
        "Lactrodectus Lancashire"
      ]),
    },
  ]
}

/* Mappings to the rage level notations in the MHCT database */
var crazed_rage_level_mapping = { Low : "CC 0-24", Medium : "CC 25-49", High: "CC 50" };
var gnarled_rage_level_mapping = { Low : "GGT 0-24", Medium : "GGT 25-49", High: "GGT 50" };
var deep_rage_level_mapping = { Low : "DL 0-24", Medium : "DL 25-49", High: "DL 50" };

/** Template for the configuration element used in the function below. */
var config_template = [{
  vars: { stage: {}, stage1: {}, stage2: {} },
  fields: { stage: '' },
  opts: {
    exclude: []
  }
}]

/**
 * Constructs the set of configurations for a given rage combination
 *
 * This function will
 *
 * - Construct a configuration for each charm (Cherry, Gnarled, Stagnant, No charm)
 * - Determine which mice need to be excluded based on the rage combination
 * - Select the correct stage identifiers in the MHCT database
 *
 * @param      {string}  crazed_rage   The crazed rage (Low/Medium/High)
 * @param      {string}  gnarled_rage  The gnarled rage (Low/Medium/High)
 * @param      {string}  deep_rage     The deep rage (Low/Medium/High)
 * @return     {Array}   The rage configuration.
 */
function get_rage_config (crazed_rage, gnarled_rage, deep_rage) {
  config_list = []

  common_config = JSON.parse(JSON.stringify(config_template));
  common_config[0]["vars"]["stage"][crazed_rage_level_mapping[crazed_rage]] = true;
  common_config[0]["vars"]["stage1"][gnarled_rage_level_mapping[gnarled_rage]] = true;
  common_config[0]["vars"]["stage2"][deep_rage_level_mapping[deep_rage]] = true;
  common_config[0]["fields"]["stage"] = '' + crazed_rage + '/' + gnarled_rage + '/' + deep_rage;
  common_config[0]["opts"]["exclude"].push(...crazed_mice_exclusion[crazed_rage]);
  common_config[0]["opts"]["exclude"].push(...gnarled_mice_exclusion[gnarled_rage]);
  common_config[0]["opts"]["exclude"].push(...deep_mice_exclusion[deep_rage]);

  crazed_config = {}
  crazed_config["charm"] = [{ vars: { charm: { Gnarled: true }}, fields: { charm: "Gnarled" } }];
  crazed_config["config"] = common_config
  config_list.push(crazed_config);

  gnarled_config = {}
  gnarled_config["charm"] = [{vars: { charm: { Cherry: true }}, fields: { charm: "Cherry" } }];
  gnarled_config["config"] = common_config
  config_list.push(gnarled_config);

  deep_config = {}
  deep_config["charm"] = [{vars: { charm: { Stagnant: true }}, fields: { charm: "Stagnant" } }];
  deep_config["config"] = common_config;
  config_list.push(deep_config);

  nocharm_config = {}
  nocharm_config["charm"] = [{vars: { charm: { Stagnant: false, Cherry: false, Gnarled: false }}}];
  nocharm_config["config"] = common_config;
  config_list.push(nocharm_config);

  return config_list;
}

/**
 * Function for constructing the full configuration list for querying all rage and cheese combinations
 *
 * @return     {Array}  The configuration list.
 */
function get_configuration_list() {

  for (crazed_rage of ["Low", "Medium", "High"]) {
    for (gnarled_rage of ["Low", "Medium", "High"]) {
      for (deep_rage of ["Low", "Medium", "High"]) {
        /* High/High/High is treated as a special case as we want to include LLL
         * and don't care about the funnel charms */
        if(crazed_rage == "High" && gnarled_rage == "High" && deep_rage == "High") { continue; }
        configuration_list.series.push(...get_rage_config(crazed_rage, gnarled_rage, deep_rage));
      }
    }
  }
  return configuration_list;
}

module.exports = get_configuration_list();