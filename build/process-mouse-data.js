#!/usr/bin/env node
const fs = require("node:fs/promises");
const util = require("node:util");
const request = require("request");
const path = require("path");

const requestAsync = util.promisify(request);

const goldPointsURL =
  "https://tsitu.github.io/MH-Tools/data/json/mouse-gold-points.json";
/**
 * Fetches mouse data from API and generates JSON files
 */
(async () => {
  try {
    console.log('Fetching mouse data from API...');

    // Fetch data from API
    let { body: data } = await requestAsync('http://api.mouse.rip/mice');
    let mice = JSON.parse(data);

    console.log(`Fetched ${mice.length} mice from API`);

    mice = mice.map(renameMice);


    mice.sort((a, b) => a.name.localeCompare(b.name));

    const mouseWisdom = {};
    const goldPoints = {};
    const powerEffs = {};
    mice
      .map(modifyFortRoxMice)
      .forEach(mouse => {
        mouseWisdom[mouse.name] = mouse.wisdom;

        goldPoints[mouse.name] = [mouse.gold, mouse.points];

        powerEffs[mouse.name] = [
          mouse.effectivenesses.power,
          mouse.effectivenesses.arcane,
          mouse.effectivenesses.draconic,
          mouse.effectivenesses.forgotten,
          mouse.effectivenesses.hydro,
          0, // Parental (not in API data)
          mouse.effectivenesses.physical,
          mouse.effectivenesses.shadow,
          mouse.effectivenesses.tactical,
          mouse.effectivenesses.law,
          mouse.effectivenesses.rift
        ];
    });

    data = (await requestAsync(goldPointsURL)).body
    const externalGoldPoints = JSON.parse(data);

    // Generate log of new mice by comparing with external data
    const newMice = mice.filter(mouse => !externalGoldPoints.hasOwnProperty(mouse.name));
    if (newMice.length > 0) {
      console.log(`Found ${newMice.length} new mice:`);
      newMice.forEach(mouse => {
        console.log(`  - ${mouse.name}`);
      });
    } else {
      console.log('No new mice found.');
    }

    await fs.mkdir(path.join(__dirname, '../data/json'), { recursive: true });
    const jsonDir = path.join(__dirname, '../data/json');

    const writeFile = async (filename, content) => {
      await fs.writeFile(path.join(jsonDir, filename), JSON.stringify(content));
      console.log(`Generated ${filename}`);
    };

    await writeFile('mouse-wisdom.json', mouseWisdom);
    await writeFile('mouse-gold-points.json', goldPoints);
    await writeFile('mouse-power-effs.json', powerEffs);

    console.log('Successfully generated all mouse data JSON files!');

  } catch (error) {
    console.error('Error processing mouse data:', error);
    process.exit(1);
  }
})();

/**
 * Modifies Fort Rox mice effectiveness values
 */
function modifyFortRoxMice(record) {
  if (record.subgroup === "Weremice" || record.subgroup === "Cosmic Critter") {
    record.effectivenesses.power *= 2;
  }
  return record;
}

/**
 * Renames mice according to application conventions
 */
function renameMice(mouse) {
  mouse.name = mouse.name.replace(/ mouse$/i, "");
  
  if (mouse.name === "⚡Thunderlord⚡") {
    mouse.name = "Thunderlord";
  }
  
  return mouse;
}
