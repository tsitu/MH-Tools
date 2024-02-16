#!/usr/bin/env node

const util = require("node:util")
const request = require("request");
const { parse } = require("csv-parse/sync");
const { stringify } = require("csv-stringify/sync")

const requestAsync = util.promisify(request);

const spreadSheetId = "13hKjNDFTFR3rTkmQzyi3d4ZDOlQJUvTfWPDQemmFW_Y";
const sheedId = "0";
const format = "csv";

(async () => {
  const {body:data} = await requestAsync(`https://docs.google.com/spreadsheets/d/${spreadSheetId}/export?format=${format}&gid=${sheedId}`);

  const records = parse(data, {
    cast: (value, context) => {
      if (context.header) return value;
      if (["Mouse","Group","Sub-Group"].includes(context.column)) return String(value);
      return Number(value);
    },
    columns: true,
  });

  const record = records[0];
  const expectedRowHeaders = ["Mouse","Power","Arcane","Draconic","Forgotten","Hydro","Parental","Physical","Shadow","Tactical","Law","Rift","Group","Sub-Group"];
  if (!Object.keys(record).every((value, i) => value == expectedRowHeaders[i])) {
    throw new Error('Expected CSV columns does not match recieved columns.')
  }

  const modifiedRecords = records
    .map(modifyFortRoxMice)
    .map(renameThunderlord);

  const csvValues = stringify(modifiedRecords, {
    header: true,
    // Remove group + sub-group columns when serializing back to csv
    columns: expectedRowHeaders.slice(0, -2)
  });

  console.log(csvValues.trim());
})();

/**
 * @typedef {Object} MouseRecord
 * @property {string} Mouse - Mouse name
 * @property {number} Power - Mouse power
 * @property {number} Arcane - Power type eff
 * @property {number} Draconic - Power type eff
 * @property {number} Forgotten - Power type eff
 * @property {number} Hydro - Power type eff
 * @property {number} Parental - Power type eff
 * @property {number} Physical - Power type eff
 * @property {number} Shadow - Power type eff
 * @property {number} Tactical - Power type eff
 * @property {number} Law - Power type eff
 * @property {number} Rift - Power type eff
 * @property {string} Group
 * @property {string} Sub-Group
 */

/**
 * Modifies a few Fort Rox entries because the spreadsheet assumes tower/ballista lvl 1.
 * @param {MouseRecord} record
 * @returns {MouseRecord}
 */
function modifyFortRoxMice(record) {
  if (record["Sub-Group"] == "Weremice" || record["Sub-Group"] == "Cosmic Critter") {
    record.Power *= 2;
  }

  return record;
}

/**
 *
 * @param {MouseRecord} record
 */
function renameThunderlord(record) {
  if (record.Mouse == "⚡Thunderlord⚡") {
    record.Mouse = "Thunderlord";
  }

  return record;
}
