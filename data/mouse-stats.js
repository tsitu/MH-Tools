#!/usr/bin/env node
const fs = require("node:fs/promises");
const util = require("node:util")
const request = require("request");
const { stringify } = require("csv-stringify/sync")

const requestAsync = util.promisify(request);

(async () => {
  const {body:data} = await requestAsync(`http://api.mouse.rip/mice`);

  let mice = JSON.parse(data);

  mice = mice.map(renameMice);

  let wisdom = mice.map(m => {
    return {
      mouse: m.name,
      wisdom: m.wisdom
    };
  }).sort((a, b) => a.mouse.localeCompare(b.mouse));

  const gold_points = mice.map(m => {
    return {
      Mouse: m.name,
      Gold: m.gold,
      Points: m.points
    };
  }).sort((a, b) => a.Mouse.localeCompare(b.Mouse));

  const power_effs = mice
  .map(modifyFortRoxMice)
  .map(m => {
    return {
      Mouse: m.name,
      Power: m.effectivenesses.power,
      Arcane: m.effectivenesses.arcane,
      Draconic: m.effectivenesses.draconic,
      Forgotten: m.effectivenesses.forgotten,
      Hydro: m.effectivenesses.hydro,
      Parental: m.effectivenesses.parental,
      Physical: m.effectivenesses.physical,
      Shadow: m.effectivenesses.shadow,
      Tactical: m.effectivenesses.tactical,
      Law: m.effectivenesses.law,
      Rift: m.effectivenesses.rift,
    };
  }).sort((a, b) => a.Mouse.localeCompare(b.Mouse));;

  await fs.writeFile("data/mouse-wisdom.csv", stringify(wisdom, {header: true}));
  await fs.writeFile("data/mouse-gold-points.csv", stringify(gold_points, {header: true}));
  await fs.writeFile("data/mouse-power-effs.csv", stringify(power_effs, {header: true}));
})();

function modifyFortRoxMice(record) {
  if (record.subgroup == "Weremice" || record.subgroup == "Cosmic Critter") {
    record.effectivenesses.power *= 2;
  }

  return record;
}

function renameMice(m) {
  m.name = m.name.replace(/ mouse$/i, "");

  if (m.name == "⚡Thunderlord⚡") {
    m.name = "Thunderlord";
  }

  return m;
}
