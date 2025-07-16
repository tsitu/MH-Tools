const fs = require('fs');
const path = require('path');

/**
 * Fetches and transforms trap data from mouse.rip API into arrays.js format
 */
async function updateTrapsData() {
  try {
    console.log('Fetching trap data from mouse.rip API...');

    // Fetch data from API
    const response = await fetch('https://api.mouse.rip/items');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const items = await response.json();
    console.log(`Fetched ${items.length} items from API`);

    // Filter and transform weapons and bases
    const weaponsArray = transformItems(items, 'weapon');
    const basesArray = transformItems(items, 'base');
    const charmsArray = transformItems(items, 'trinket');

    // Generate JavaScript object output files
    const weaponsJS = generateWeaponsArrayJson(weaponsArray);
    const weaponsPath = path.join(__dirname, '../data/json/weapons.json');
    fs.writeFileSync(weaponsPath, weaponsJS);
    console.log(`Updated ${weaponsPath}`);

    const basesJS = generateBasesArrayJson(basesArray);
    const basesPath = path.join(__dirname, '../data/json/bases.json');
    fs.writeFileSync(basesPath, basesJS);
    console.log(`Updated ${basesPath}`);

    const charmsJS = generateCharmsArrayJson(charmsArray);
    const charmsPath = path.join(__dirname, '../data/json/charms.json');
    fs.writeFileSync(charmsPath, charmsJS);
    console.log(`Updated ${charmsPath}`);

  } catch (error) {
    console.error('Error updating trap data:', error);
    process.exit(1);
  }
}

/**
 * Transform items from API data to arrays.js format
 */
function transformItems(items, classification) {
  const filteredItems = items.filter(item =>
    item.classification === classification);

  const itemsArray = {};

  filteredItems.forEach(item => {
    const stats = item.has_stats

    itemsArray[item.name] = [
        stats.power ?? 0,
        Math.round((stats.power_bonus ?? 0) * 100),
        Math.round((stats.attraction_bonus ?? 0) * 100),
        stats.luck ?? 0,
        stats.cheese_effect ?? "No Effect"
    ];

    if (classification === "weapon") {
      const powerType = stats.power_type[0].toUpperCase() + stats.power_type.slice(1);
      itemsArray[item.name].unshift(powerType);
    }
  });

  return itemsArray;
}

/**
 * Generates JavaScript file content for weaponsArray
 */
function generateWeaponsArrayJson(weaponsObject) {
  // Handle two special cases for weapons

  // Remove Golem Guardian Trap
  delete weaponsObject['Golem Guardian Trap'];
  // Add GGT skins
  weaponsObject["Golem Guardian Arcane Trap"] = ["Arcane", 6000, 15, 20, 28, "Fresh"];
  weaponsObject["Golem Guardian Forgotten Trap"] = ["Forgotten", 7000, 15, 20, 15, "Fresh"];
  weaponsObject["Golem Guardian Hydro Trap"] = ["Hydro", 10000, 15, 20, 28, "Fresh"];
  weaponsObject["Golem Guardian Physical Trap"] = ["Physical", 7000, 15, 20, 32, "Fresh"];
  weaponsObject["Golem Guardian Tactical Trap"] = ["Tactical", 5000, 15, 20, 30, "Fresh"];

  // Add Isle Idol skins
  weaponsObject["Isle Idol Hydroplane Skin"] = ["Hydro", 3500, 5, 15, 10, "Stale"];
  weaponsObject["Isle Idol Stakeshooter Skin"] = ["Tactical", 3750, 12, 5, 14, "Stale"];

  return JSON.stringify(weaponsObject, Object.keys(weaponsObject).sort(), 2);
}

/**
 * Generates JavaScript file content for basesArray
 */
function generateBasesArrayJson(basesArray) {
  // Handle base special cases
  // Regular denture bases become (Toothless)
  basesArray["Denture Base (Toothless)"] = basesArray["Denture Base"];
  basesArray["Denture Base"] = [1500, 25, 25, 20, "No Effect"];

  basesArray["Signature Series Denture Base (Toothless)"] = basesArray["Signature Series Denture Base"];
  basesArray["Signature Series Denture Base"] = [3750, 25, 25, 50, "No Effect"];

  // Printing press bases have their stats updated
  basesArray["Folklore Printing Press Base"] = [4500, 35, 35, 57, "Fresh"];
  basesArray["Naughty List Printing Press Base"] = [4500, 35, 35, 57, "Fresh"];

  return JSON.stringify(basesArray, Object.keys(basesArray).sort(), 2);
}

function generateCharmsArrayJson(charmsArray) {
  return JSON.stringify(charmsArray, Object.keys(charmsArray).sort(), 2);
}

// Run the update if this script is executed directly
if (require.main === module) {
    updateTrapsData();
}
