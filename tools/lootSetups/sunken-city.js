var utils = require('./_utils')
var genVarField = utils.genVarField

/**
 * Sunken City
 */
module.exports = [
  { // zones
    location: genVarField('location', 'Sunken City'),
    phase: [
      { vars: { 'sunken city zone': { 'Carnivore Cove': true } }, fields: { phase: 'Carnivore Cove' } },
      { vars: { 'sunken city zone': { 'Coral Castle': true } }, fields: { phase: 'Coral Castle' } },
      { vars: { 'sunken city zone': { 'Coral Garden': true } }, fields: { phase: 'Coral Garden' } },
      { vars: { 'sunken city zone': { 'Coral Reef': true } }, fields: { phase: 'Coral Reef' } },
      { vars: { 'sunken city zone': { 'Deep Oxygen Stream': true } }, fields: { phase: 'Deep Oxygen Stream' } },
      { vars: { 'sunken city zone': { 'Feeding Grounds': true } }, fields: { phase: 'Feeding Grounds' } },
      { vars: { 'sunken city zone': { 'Haunted Shipwreck': true } }, fields: { phase: 'Haunted Shipwreck' } },
      { vars: { 'sunken city zone': { 'Lair of the Ancients': true } }, fields: { phase: 'Lair of the Ancients' } },
      { vars: { 'sunken city zone': { 'Lost Ruins': true } }, fields: { phase: 'Lost Ruins' } },
      { vars: { 'sunken city zone': { 'Magma Flow': true } }, fields: { phase: 'Magma Flow' } },
      { vars: { 'sunken city zone': { 'Mermouse Den': true } }, fields: { phase: 'Mermouse Den' } },
      { vars: { 'sunken city zone': { 'Monster Trench': true } }, fields: { phase: 'Monster Trench' } },
      { vars: { 'sunken city zone': { 'Murky Depths': true } }, fields: { phase: 'Murky Depths' } },
      { vars: { 'sunken city zone': { 'Oxygen Stream': true } }, fields: { phase: 'Oxygen Stream' } },
      { vars: { 'sunken city zone': { 'Pearl Patch': true } }, fields: { phase: 'Pearl Patch' } },
      { vars: { 'sunken city zone': { 'Rocky Outcrop': true } }, fields: { phase: 'Rocky Outcrop' } },
      { vars: { 'sunken city zone': { 'Sand Dollar Sea Bar': true } }, fields: { phase: 'Sand Dollar Sea Bar' } },
      { vars: { 'sunken city zone': { 'School of Mice': true } }, fields: { phase: 'School of Mice' } },
      { vars: { 'sunken city zone': { 'Sea Floor': true } }, fields: { phase: 'Sea Floor' } },
      { vars: { 'sunken city zone': { 'Shallow Shoals': true } }, fields: { phase: 'Shallow Shoals' } },
      { vars: { 'sunken city zone': { 'Shipwreck': true } }, fields: { phase: 'Shipwreck' } },
      { vars: { 'sunken city zone': { 'Sunken Treasure': true } }, fields: { phase: 'Sunken Treasure' } },
    ],
    specials: [{
      vars: {
        trap: {'Haunted Shipwreck Trap': false},
      }
    }],
    loot: [ {
      opts: {
        include_items: [
          'Barnacles',
          'Brined Curd',
          'Damaged Coral Fragment',
          'Mouse Scale',
          'Oxygen Canisters',
          'Sand Dollars',
        ],
        min_qty: 0.01
      }
    } ],
    mouse: genVarField('mouse', [
      // Barnacled Bunch
      'Barnacle Beautician', 'Bottom Feeder', 'Crabolia', 'Deep Sea Diver', 'Deranged Deckhand', 'Dread Pirate Mousert',
      'Pirate Anchor', 'Sunken Banshee', 'Swashblade',
      // Coral Corral
      'Coral', 'Coral Cuddler', 'Coral Dragon', 'Coral Gardener', 'Coral Guard', 'Coral Harvester', 'Coral Queen',
      'Seadragon', 'Turret Guard',
      // Finned Friends
      'Angelfish', 'Betta', 'Clownfish', 'Cuttle', 'Eel', 'Jellyfish', 'Koimaid', 'Manatee', 'Mlounder Flounder',
      'Puffer', 'Stingray',
      // Predator Pack
      'Ancient of the Deep', 'Barracuda', 'Carnivore', 'Derpshark', 'Serpent Monster', 'Spear Fisher', 'Tritus',
      // Scale Society
      'Angler', 'Guppy', 'Mermousette', 'Mershark', 'Octomermaid', 'Old One', 'School of Mish', 'Tadpole', 'Urchin King',
      // Treasure Troop
      'Pearl', 'Pearl Diver', 'Saltwater Axolotl', 'Sand Dollar Diver', 'Sand Dollar Queen', 'Treasure Hoarder', 'Treasure Keeper'
    ])
  },
  { // docked
    base: genVarField('location', 'Sunken City', { opts: { include_items: 'Oxygen Canisters', min_qty: 0.01 } }),
    mouse: genVarField('mouse', [
      'City Noble', 'City Worker', 'Clumsy Carrier', 'Elite Guardian', 'Enginseer', 'Hydrologist', 'Oxygen Baron',
      'Sunken Citizen'
    ])
  },
]
