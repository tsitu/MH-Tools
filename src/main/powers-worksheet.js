const trapTypes = [
  "Arcane",
  "Draconic",
  "Forgotten",
  "Hydro",
  "Parental",
  "Physical",
  "Shadow",
  "Tactical",
  "Law",
  "Rift"
];

const subcategories = {
  "Indigenous Mice": ["Misc.", "Great Gnawnian Games", "Rare Rodents"],
  "Dock Dwellers": ["Misc."],
  "Mountain Mice": ["Misc."],
  "Forest Guild": ["Misc."],
  "Lab Experiments": ["Misc."],
  "Shadow Clan": ["Misc."],
  "Digby Dirt Dwellers": ["Misc."],
  "Followers of Furoma": ["Misc."],
  "The Forgotten Mice": ["Misc."],
  "Aquatic Order": ["Misc."],
  "The Elub Tribe": ["Misc."],
  "The Nerg Tribe": ["Misc."],
  "The Derr Tribe": ["Misc."],
  "The Dreaded Horde": ["Misc."],
  "Draconic Brood": ["Misc."],
  "Balack's Banished": ["Misc."],
  "Gauntlet Gladiators": [
    "Tier 1: Puppet",
    "Tier 2: Thief",
    "Tier 3: Melee",
    "Tier 4: Bard",
    "Tier 5: Magic",
    "Tier 6: Noble",
    "Tier 7: Dust",
    "Tier 8: The Eclipse"
  ],
  "Seasonal Soldiers": ["Spring", "Summer", "Fall", "Winter"],
  "Wizard's Pieces": ["Misc.", "Mystic", "Technic"],
  "Zurreal's Breed": ["Misc."],
  "Icewing's Invasion": [
    "Misc.",
    "Bergling",
    "Tunnel Rat",
    "Brute",
    "Bomb Squad",
    "Zealot",
    "Icewing's Generals"
  ],
  "Wild Bunch": ["Misc.", "Crew", "Ringleader"],
  "Train Robbers": [
    "Passenger",
    "Depot Worker",
    "Automice",
    "Raider",
    "Fueler"
  ],
  "Meteorite Miners": [
    "Misc.",
    "Weremice",
    "Cosmic Critter",
    "Special",
    "Dawn Destroyer"
  ],
  "The Marching Flame": [
    "Archer",
    "Artillery",
    "Cavalry",
    "Mage",
    "Scout",
    "Warrior",
    "Support",
    "Command"
  ],
  "Muridae Market Mice": ["Misc."],
  "Living Garden Mice": ["Misc."],
  "Lost City Mice": ["Misc."],
  "Sand Dunes Mice": ["Misc."],
  "Queso Canyoneers": [
    "River Riders",
    "Spice Mice",
    "Quarry Quarries",
    "Cork Collector",
    "Pressure Builder",
    "Geyser Hunter"
  ],
  "Deep Sea Dwellers": [
    "Sunken City Citizen",
    "Finned Fiend",
    "Coral Corral",
    "Barnacled Bunch",
    "Scale Society",
    "Treasure Troop",
    "Predator Pack"
  ],
  "Fungal Fiends": [
    "Fungal Fodder",
    "Gruyere Grazer",
    "Mineral Muncher",
    "Gemstone Gorger",
    "Diamond Devourer"
  ],
  "Citizens of Zokor": [
    "Hallway Wanderer",
    "Fungal Farmer",
    "Lost Scholar",
    "Fealty Sworn Soldier",
    "Tech Engineer",
    "Treasure Miser",
    "Hidden Remnant"
  ],
  "Moussu Picchu Inhabitants": [
    "Fungal Feeder",
    "Potion Brewer",
    "Wind Wanderer",
    "Rain Roamer",
    "Storm Dragon"
  ],
  "Floating Islanders": [
    "Launch Pad",
    "Cloud Commoners",
    "Physical Pummelers",
    "Shadow Overcasters",
    "Tactical Dog Fighters",
    "Atmospheric Arcane",
    "Floating Forgotten",
    "Hovering Hydro",
    "Dashing Dragons",
    "Lofty Lawbreakers",
    "Sky Pirates",
    "Sky Wardens",
    "Sky Paragons",
    "The Richest"
  ],
  "Foreword Farmers": [
    "Seed Stowers",
    "Petulant Pests"
  ],
  "Prologue Pond Prowlers": [
    "Grub Gatherers",
    "Shallow Swimmers",
    "Deep Divers"
  ],
  "Storytellers": [
    "Folklore Authors",
    "Folklore Characters",
    "Folklore Masterminds"
  ],
  "Rift Walkers": ["Gnawnia Rift", "Burroughs Rift", "Whisker Woods Rift"],
  "Rift Stalkers": ["Bristle Woods Rift", "Furoma Rift", "Valour Rift"],
  "The Polluted": ["Misc."],
  "Event Mice": [
    "Great Winter Hunt",
    "Halloween",
    "Spring Egg Hunt",
    "New Year",
    "Misc.",
    "Prize",
    "Birthday",
    "Lunar New Year",
    "Valentine's"
  ]
};

window.onload = function() {
  loadBookmarkletFromJS(
    BOOKMARKLET_URLS["loader"],
    "bookmarkletLoader",
    "#bookmarkletloader"
  );
  loadBookmarkletFromJS(
    BOOKMARKLET_URLS["powers"],
    "powersBookmarklet",
    "#bookmarklet"
  );

  // Populate group dropdowns
  for (cat in subcategories) {
    $("#group-select").append($("<option>", { value: cat, text: cat }));
  }

  $("#group-select").change(function() {
    var selectedGroup = $("#group-select :selected").text();
    var subgroupz = subcategories[selectedGroup];
    var subgroupSelect = document.getElementById("subgroup-select");
    if (subgroupSelect) {
      subgroupSelect.innerHTML = "";
      subgroupSelect.appendChild(new Option("All", "All"));
      if (subgroupz) {
        for (var i = 0; i < subgroupz.length; i++) {
          var group = subgroupz[i];
          subgroupSelect.appendChild(new Option(group, group));
        }
      }
    }
  });

  // Load saved preferences
  const prefString = localStorage.getItem("powers-worksheet-prefs");
  if (prefString) {
    const prefs = JSON.parse(prefString);
    $(".shown-type:checkbox").each(function() {
      if (prefs["types"].indexOf($(this).val()) > -1) {
        $(this).prop("checked", true);
      } else {
        $(this).prop("checked", false);
      }
    });
    $("#group-select").val(prefs["group"]);
    $("#group-select").change();
    $("#subgroup-select").val(prefs["subgroup"]);
    $("#mouse-filter").val(prefs["mouse"]);
  }

  // Process data from window.name
  if (window.name && window.name !== "mhworksheet") {
    loadData(window.name);
  }

  // Initialize tablesorter
  $.tablesorter.defaults.sortInitialOrder = "desc";
  $("#mouse-details").tablesorter({
    sortReset: true,
    widthFixed: true,
    ignoreCase: false,
    widgets: ["filter"],
    widgetOptions: {
      filter_childRows: false,
      filter_childByColumn: false,
      filter_childWithSibs: true,
      filter_columnFilters: true,
      filter_columnAnyMatch: true,
      filter_cellFilter: "",
      filter_cssFilter: "", // or []
      filter_defaultFilter: {},
      filter_excludeFilter: {},
      filter_external: "",
      filter_filteredRow: "filtered",
      filter_formatter: null,
      filter_functions: null,
      filter_hideEmpty: true,
      filter_hideFilters: true,
      filter_ignoreCase: true,
      filter_liveSearch: true,
      filter_matchType: { input: "exact", select: "exact" },
      filter_onlyAvail: "filter-onlyAvail",
      filter_placeholder: { search: "Filter...", select: "" },
      filter_reset: "button.reset",
      filter_resetOnEsc: true,
      filter_saveFilters: false,
      filter_searchDelay: 420,
      filter_searchFiltered: true,
      filter_selectSource: null,
      filter_serversideFiltering: false,
      filter_startsWith: false,
      filter_useParsedData: false,
      filter_defaultAttrib: "data-value",
      filter_selectSourceSeparator: "|"
    }
  });

  $("#mouse-powers").tablesorter({
    sortReset: true,
    widthFixed: true,
    ignoreCase: false,
    widgets: ["filter"],
    widgetOptions: {
      filter_childRows: false,
      filter_childByColumn: false,
      filter_childWithSibs: true,
      filter_columnFilters: true,
      filter_columnAnyMatch: true,
      filter_cellFilter: "",
      filter_cssFilter: "", // or []
      filter_defaultFilter: {},
      filter_excludeFilter: {},
      filter_external: "",
      filter_filteredRow: "filtered",
      filter_formatter: null,
      filter_functions: null,
      filter_hideEmpty: true,
      filter_hideFilters: true,
      filter_ignoreCase: true,
      filter_liveSearch: true,
      filter_matchType: { input: "exact", select: "exact" },
      filter_onlyAvail: "filter-onlyAvail",
      filter_placeholder: { search: "Filter...", select: "" },
      filter_reset: "button.reset",
      filter_resetOnEsc: true,
      filter_saveFilters: false,
      filter_searchDelay: 420,
      filter_searchFiltered: true,
      filter_selectSource: null,
      filter_serversideFiltering: false,
      filter_startsWith: false,
      filter_useParsedData: false,
      filter_defaultAttrib: "data-value",
      filter_selectSourceSeparator: "|"
    }
  });

  $("#trap-history").tablesorter({
    sortReset: true,
    widthFixed: true,
    ignoreCase: false,
    widgets: ["filter"],
    widgetOptions: {
      filter_childRows: false,
      filter_childByColumn: false,
      filter_childWithSibs: true,
      filter_columnFilters: true,
      filter_columnAnyMatch: true,
      filter_cellFilter: "",
      filter_cssFilter: "", // or []
      filter_defaultFilter: {},
      filter_excludeFilter: {},
      filter_external: "",
      filter_filteredRow: "filtered",
      filter_formatter: null,
      filter_functions: null,
      filter_hideEmpty: true,
      filter_hideFilters: true,
      filter_ignoreCase: true,
      filter_liveSearch: true,
      filter_matchType: { input: "exact", select: "exact" },
      filter_onlyAvail: "filter-onlyAvail",
      filter_placeholder: { search: "Filter...", select: "" },
      filter_reset: "button.reset",
      filter_resetOnEsc: true,
      filter_saveFilters: false,
      filter_searchDelay: 420,
      filter_searchFiltered: true,
      filter_selectSource: null,
      filter_serversideFiltering: false,
      filter_startsWith: false,
      filter_useParsedData: false,
      filter_defaultAttrib: "data-value",
      filter_selectSourceSeparator: "|"
    }
  });

  $("#reset-button").click(function() {
    // Reset each or both tables
    const reset = confirm("Are you sure you want to reset worksheet data?");
    if (reset) {
      const storedData = localStorage.getItem("powers-tool-worksheet-data");
      if (storedData) {
        localStorage.removeItem("powers-tool-worksheet-data");
      }
      renderTables();
    }
  });

  $("#type-select-all").click(function() {
    if ($(".shown-type:checked").length === 10) {
      $(".shown-type:checkbox").each(function() {
        $(this).prop("checked", false);
      });
    } else {
      $(".shown-type:checkbox").each(function() {
        $(this).prop("checked", true);
      });
    }
  });

  $("#reload-button").click(function() {
    renderTables();
  });

  $("#save-button").click(function() {
    const saveObj = {};
    saveObj["types"] = [];
    $(".shown-type:checked").each(function() {
      saveObj["types"].push($(this).val());
    });
    saveObj["group"] = $("#group-select")
      .find(":selected")
      .text();
    saveObj["subgroup"] = $("#subgroup-select")
      .find(":selected")
      .text();
    saveObj["mouse"] = $("#mouse-filter").val();
    localStorage.setItem("powers-worksheet-prefs", JSON.stringify(saveObj));
  });

  renderTables();
};

/**
 * Grab window.name data and validate it as JSON
 * Cache to localStorage and reset window.name
 */
function loadData(inputText) {
  try {
    if (validateJsonData(JSON.parse(inputText))) {
      processInput(inputText);
      window.name = "mhworksheet"; // Reset name after capturing data
    } else {
      throw new TypeError("JSON format invalid or corrupted");
    }
  } catch (e) {
    console.error(`(Error in window.name) - ${e.stack}`);
  }
}

/**
 * Checks if mouse data JSON is properly formatted
 * @param {object} jsonObj
 * @return {boolean}
 */
function validateJsonData(jsonObj) {
  let returnBool = true;
  for (let key in jsonObj) {
    if (key !== "mouse-data" && key !== "user-data") {
      returnBool = false;
      break;
    }
  }
  return returnBool;
}

/**
 * Calculate lower/upper bounds in-place
 * Returns mutated mouse-data object
 * @param {object} input Incoming mouse-data obj
 * @param {float} trapPower Precise computed total power
 * @param {string} trapType Power type parsed from DOM
 */
function calculateBounds(input, trapPower, trapType) {
  const incMouseData = input;

  for (let group in incMouseData) {
    for (let mouse in incMouseData[group]) {
      let lowerBound = 0;
      let upperBound = "∞";
      switch (input[group][mouse]["difficulty"]) {
        case "Effortless":
          upperBound = parseFloat((trapPower / 19).toFixed(2));
          break;
        case "Easy":
          lowerBound = parseFloat((trapPower / 19).toFixed(2));
          upperBound = parseFloat((trapPower / 9).toFixed(2));
          break;
        case "Moderate":
          lowerBound = parseFloat((trapPower / 9).toFixed(2));
          upperBound = parseFloat(((trapPower * 7) / 13).toFixed(2));
          break;
        case "Challenging":
          lowerBound = parseFloat(((trapPower * 7) / 13).toFixed(2));
          upperBound = parseFloat(trapPower.toFixed(2));
          break;
        case "Difficult":
          lowerBound = parseFloat(trapPower.toFixed(2));
          upperBound = parseFloat(((trapPower * 13) / 7).toFixed(2));
          break;
        case "Overpowering":
          lowerBound = parseFloat(((trapPower * 13) / 7).toFixed(2));
          upperBound = parseFloat((trapPower * 19).toFixed(2));
          break;
        case "Near Impossible":
          lowerBound = parseFloat((trapPower * 19).toFixed(2));
          break;
      }

      const ttIndex = trapTypes.indexOf(trapType);
      const inArr = [];
      inArr.push(incMouseData[group][mouse]["effs"][ttIndex]);
      inArr.push(lowerBound);
      inArr.push(upperBound);

      incMouseData[group][mouse]["effs"][ttIndex] = inArr;
      delete incMouseData[group][mouse]["difficulty"];
    }
  }

  return incMouseData;
}

/**
 * Runs through all stored groups/mice/effs
 * Checks for mice with multiple 100% eff types
 * Derives narrowest MP range and updates values accordingly
 * @param {object} stored
 */
function normalizeRanges(stored) {
  const minCache = {};
  for (let group in stored) {
    minCache[group] = {};
    for (let mouse in stored[group]) {
      minCache[group][mouse] = {};
      minCache[group][mouse]["effs"] = [];
      for (let i = 0; i < 10; i++) {
        const el = stored[group][mouse]["effs"][i];
        if (typeof el === "object" && el[0] === 100) {
          if (!minCache[group][mouse]["range"]) {
            minCache[group][mouse]["range"] = [el[1], el[2]];
          }
          if (el[1] > minCache[group][mouse]["range"][0]) {
            minCache[group][mouse]["range"][0] = el[1];
          }
          if (el[2] < minCache[group][mouse]["range"][1]) {
            minCache[group][mouse]["range"][1] = el[2];
          }
          minCache[group][mouse]["effs"].push(trapTypes[i]);
        } else if (typeof el === "number" && el === 100) {
          minCache[group][mouse]["effs"].push(trapTypes[i]);
        }
      }
      const effLen = minCache[group][mouse]["effs"].length;
      if (effLen === 0 || effLen === 1) {
        delete minCache[group][mouse];
      }
    }
    if (Object.keys(minCache[group]).length === 0) {
      delete minCache[group];
    }
  }

  for (let group in minCache) {
    for (let mouse in minCache[group]) {
      for (let el of minCache[group][mouse]["effs"]) {
        if (minCache[group][mouse]["range"] !== undefined) {
          const ttIndex = trapTypes.indexOf(el);
          stored[group][mouse]["effs"][ttIndex] = [
            100,
            minCache[group][mouse]["range"][0],
            minCache[group][mouse]["range"][1]
          ];
        }
      }
    }
  }

  return stored;
}

/**
 * Diffs the incoming and stored mouse-data objs
 * (Is there a more elegant way to do this?)
 * @param {object} input
 * @param {object} stored
 * @return {object} Modified in-place
 */
function mouseDataDiff(input, stored) {
  for (let group in input) {
    if (!stored[group]) {
      stored[group] = input[group];
    } else {
      for (let mouse in input[group]) {
        if (!stored[group][mouse]) {
          stored[group][mouse] = input[group][mouse];
        } else {
          for (let field in input[group][mouse]) {
            if (field === "effs") {
              for (let i = 0; i < 10; i++) {
                const inputArr = input[group][mouse]["effs"][i];
                let storedArr = stored[group][mouse]["effs"][i];
                if (
                  typeof inputArr === "object" &&
                  inputArr.length === 3 &&
                  (typeof storedArr === "number" ||
                    typeof storedArr === "string")
                ) {
                  storedArr = inputArr; // Input data is new
                } else if (
                  typeof inputArr === "object" &&
                  typeof storedArr === "object"
                ) {
                  if (inputArr[0] !== storedArr[0]) {
                    // If eff is different, HG has tweaked it
                    storedArr = inputArr;
                  } else if (inputArr[1] > storedArr[1]) {
                    if (inputArr[1] <= storedArr[2]) {
                      // Replace with a bigger lower bound
                      storedArr[1] = inputArr[1];
                    }
                  } else if (inputArr[2] < storedArr[2]) {
                    if (inputArr[2] >= storedArr[1]) {
                      // Replace with a smaller upper bound
                      storedArr[2] = inputArr[2];
                    }
                  } else if (
                    typeof inputArr[2] === "number" &&
                    storedArr[2] === "∞"
                  ) {
                    storedArr[2] = inputArr[2];
                  }
                }
                stored[group][mouse]["effs"][i] = storedArr;
              }
            } else {
              // Check for ID, Gold, Points updates
              if (stored[group][mouse][field] !== input[group][mouse][field]) {
                stored[group][mouse][field] = input[group][mouse][field];
              }
            }
          }
        }
      }
    }
  }

  return stored;
}

/**
 * Compare localStorage to incoming and insert/update as necessary
 * @param {string} inputText Stringified JSON from window.name
 */
function processInput(inputText) {
  const inputObj = JSON.parse(inputText);
  const incomingObj = {};
  incomingObj["mouse-data"] = inputObj["mouse-data"];

  const user = inputObj["user-data"];
  const bonusObj = {};
  bonusObj["battery"] = battery[user["battery"]];
  bonusObj["power"] = user["power-bonus"] * 100;
  bonusObj["amp"] = user["zt-amp"] / 100;
  bonusObj["cheese"] = user["empowered"] ? 20 : 0;
  bonusObj["pour"] = user["tg-pour"] ? 5 : 0;

  bonusObj["rift"] = 0;
  const riftMultiplier = user["rift-multiplier"];
  if (riftMultiplier >= 1) {
    // Rift Bonus count
    const riftCount =
      +(riftWeapons.indexOf(user.weapon) > -1) +
      +(riftBases.indexOf(user.base) > -1) +
      +(riftCharms.indexOf(user.charm) > -1 || user.charm.indexOf("Rift") > -1);
    if (riftCount >= 2) {
      // 2 or 3 triggers the power bonus of Rift set
      bonusObj["rift"] = 20 * riftMultiplier;
    }
  }

  // Festive & Halloween bonus check
  bonusObj["event"] =
    (user.charm.indexOf("Snowball Charm") > -1 &&
      festiveTraps.indexOf(user.weapon) > -1) ||
    (user.charm.indexOf("Spooky Charm") > -1 &&
      halloweenTraps.indexOf(user.weapon) > -1) ||
    (user.charm.indexOf("Party Charm") > -1 &&
      birthdayTraps.indexOf(user.weapon) > -1)
      ? 20
      : 0;

  // Physical Brace Base check
  bonusObj["brace"] =
    weaponsArray[user.weapon][0] === "Physical" &&
    user.base === "Physical Brace Base"
      ? 25
      : 0;

  // Subtract shownPowerBonus[es] to get true value
  bonusObj["power"] -=
    weaponsArray[user.weapon][2] +
    basesArray[user.base][1] +
    charmsArray[user.charm][1] +
    bonusObj["rift"];

  const calculatedPower = calcPower(
    user.weapon,
    user.base,
    user.charm,
    bonusObj
  );

  if (Math.abs(user["dom-trap-power"] - calculatedPower) > 1) {
    alert(
      "One or more of the following went wrong when computing total power:\n\n[1] user.trap_power_bonus was not accurately passed in - if you're on the Camp page, try clicking 'Daily', 'Quests', or any of the 5 item togglers underneath your trap image\n[2] Unhandled special location/stage/weapon/base/charm effects - please try again"
    );
    return;
  }

  incomingObj["mouse-data"] = calculateBounds(
    incomingObj["mouse-data"],
    calculatedPower,
    user["dom-trap-type"]
  );

  let storedObj = localStorage.getItem("powers-tool-worksheet-data");
  if (storedObj) {
    storedObj = JSON.parse(storedObj);
    storedObj["mouse-data"] = mouseDataDiff(
      incomingObj["mouse-data"],
      storedObj["mouse-data"]
    );
    storedObj["mouse-data"] = normalizeRanges(storedObj["mouse-data"]);
    // normalizeRanges(JSON.parse(localStorage.getItem("powers-tool-worksheet-data"))["mouse-data"])

    // Insert into trap history
    storedObj["trap-history"].push([
      user["dom-trap-type"],
      calculatedPower,
      user["timestamp"],
      user["dom-trap-power"]
    ]);

    // Update storage
    localStorage.setItem(
      "powers-tool-worksheet-data",
      JSON.stringify(storedObj)
    );
  } else {
    // Initial insertion into storage
    incomingObj["trap-history"] = [];
    incomingObj["trap-history"].push([
      user["dom-trap-type"],
      calculatedPower,
      user["timestamp"],
      user["dom-trap-power"]
    ]);
    incomingObj["mouse-data"] = normalizeRanges(incomingObj["mouse-data"]);

    localStorage.setItem(
      "powers-tool-worksheet-data",
      JSON.stringify(incomingObj)
    );
  }
}

function renderMousePowers(mouseData) {
  // Array of power types to show
  const powersArr = [];
  $(".shown-type:checked").each(function() {
    powersArr.push($(this).val());
  });

  let powersHTML =
    "<caption>Mouse Powers</caption><thead><tr><th>Group</th><th>Mouse</th>";

  for (let type of powersArr) {
    powersHTML += `<th colspan='3'>${type}</th>`;
  }
  powersHTML +=
    "</tr><tr><td id='powers-group'>sort</td><td id='powers-mouse'>sort</td>";
  for (let i = 0; i < powersArr.length; i++) {
    powersHTML += "<td>eff</td><td>min</td><td>max</td>";
  }
  powersHTML += "</tr></thead><tbody>";

  // Preferred group/mouse logic
  for (let group in mouseData) {
    const groupSelect = $("#group-select")
      .find(":selected")
      .text();
    const subSelect = $("#subgroup-select")
      .find(":selected")
      .text();

    // Skip group if criteria not met
    if (groupSelect !== "All" && group.indexOf(groupSelect) < 0) {
      continue;
    }
    if (subSelect !== "All" && group.indexOf(`(${subSelect})`) < 0) {
      continue;
    }

    for (let mouse in mouseData[group]) {
      const data = mouseData[group][mouse];
      const gString = group.slice(0, group.indexOf("(") - 1);
      const sString = group.slice(group.indexOf("("), group.length);
      powersHTML += `<tr><td>${gString}<br>${sString}</td><td>${mouse}</td>`;
      for (let type of powersArr) {
        const i = trapTypes.indexOf(type);
        const eff =
          typeof data["effs"][i] === "object" &&
          data["effs"][i][0] !== undefined
            ? data["effs"][i][0]
            : data["effs"][i];
        let lowerBound =
          typeof data["effs"][i] === "object" &&
          data["effs"][i][1] !== undefined
            ? data["effs"][i][1]
            : 0;
        if (typeof data["effs"][i] === "number" && data["effs"][i] === 0) {
          lowerBound = "∞";
        }
        const upperBound =
          typeof data["effs"][i] === "object" &&
          data["effs"][i][2] !== undefined
            ? data["effs"][i][2]
            : "∞";
        powersHTML += `<td>${eff}%</td><td>${lowerBound}</td><td>${upperBound}</td>`;
      }
      powersHTML += "</tr>";
    }
  }

  powersHTML += "</tbody>";
  document.getElementById("mouse-powers").innerHTML = powersHTML;
  $("#mouse-powers").trigger("updateAll", [
    true,
    (callback = function() {
      const header = $("#powers-mouse");
      if (header.hasClass("tablesorter-headerDesc")) {
        header.click();
      } else if (header.hasClass("tablesorter-headerUnSorted")) {
        header.click();
        header.click();
      }
    })
  ]);

  $.tablesorter.setFilters(
    $("#mouse-powers"),
    ["", $("#mouse-filter").val()],
    true
  );
  $("#mouse-powers").trigger("search", true);
}

function renderTables() {
  let storedData = localStorage.getItem("powers-tool-worksheet-data");
  if (storedData) {
    storedData = JSON.parse(storedData);
    const mouseData = storedData["mouse-data"];
    renderMousePowers(mouseData);

    let detailsHTML =
      "<caption>Mouse Details</caption><thead><tr><th id='details-group'>Group</th><th id='details-mouse'>Mouse</th><th id='details-gold'>Gold</th><th id='details-points'>Points</th><th id='details-id'>ID</th></tr></thead><tbody>";

    for (let group in mouseData) {
      for (let mouse in mouseData[group]) {
        const data = mouseData[group][mouse];
        const url = `<a href='https://www.mousehuntgame.com/m.php?id=${
          data["id"]
        }' target='_blank' rel='noopener'>Link</a>`;

        detailsHTML += `<tr><td>${group}</td><td>${mouse}</td><td>${
          data["gold"]
        }</td><td>${data["points"]}</td><td>${url}</td></tr>`;
      }
    }

    detailsHTML += "</tbody>";
    document.getElementById("mouse-details").innerHTML = detailsHTML;
    $("#mouse-details").trigger("updateAll", [
      true,
      (callback = function() {
        const header = $("#details-group");
        if (header.hasClass("tablesorter-headerDesc")) {
          header.click();
        } else if (header.hasClass("tablesorter-headerUnSorted")) {
          header.click();
          header.click();
        }
      })
    ]);

    // Trap History
    const trapHistory = storedData["trap-history"];

    trapHTML =
      "<caption>Trap History</caption><thead><tr><th id='history-date'>Date</th><th id='history-type'>Type</th><th id='history-precise-power'>Power<br>(Precise)</th><th id='history-displayed-power'>Power<br>(Displayed)</th></tr></thead><tbody>";
    for (let setup of trapHistory.reverse()) {
      trapHTML += `<tr><td>${new Date(setup[2])}</td><td>${setup[0]}</td><td>${
        setup[1]
      }</td><td>${setup[3]}</td></tr>`;
    }
    trapHTML += "</tbody>";
    document.getElementById("trap-history").innerHTML = trapHTML;
    $("#trap-history").trigger("updateAll");
  } else {
    // Emptiness
    document.getElementById("mouse-powers").innerHTML = "";
    document.getElementById("mouse-details").innerHTML = "";
    document.getElementById("trap-history").innerHTML = "";
  }
}
