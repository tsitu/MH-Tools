let ownedItems = {};

const alterCharms = [
  "Forgotten Charm",
  "Hydro Charm",
  "Nanny Charm",
  "Shadow Charm"
];

const battery = {
  0: 0,
  1: 90,
  2: 500,
  3: 3000,
  4: 8500,
  5: 16000,
  6: 30000,
  7: 50000,
  8: 90000,
  9: 190000,
  10: 300000
};

window.onload = function() {
  loadBookmarkletFromJS(
    BOOKMARKLET_URLS["loader"],
    "bookmarkletLoader",
    "#bookmarkletloader"
  );

  // Process best-setup-items
  const setupItems = localStorage.getItem("best-setup-items");
  if (setupItems) {
    ownedItems = JSON.parse(setupItems)["owned-items"];
  }

  // Load saved preferences
  loadPreferences();

  // Initialize tablesorter
  $.tablesorter.defaults.sortInitialOrder = "desc";
  $("#trap-setups").tablesorter({
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

  $("#calculate-button").click(function() {
    console.group("Duration");
    console.time("Main loop");
    let resultsHTML = generateResults();
    console.timeEnd("Main loop");

    console.time("Tablesorter");
    document.getElementById("trap-setups").innerHTML = resultsHTML;
    const resort = true,
      callback = function() {
        const header = $("#precisePower");
        if (header.hasClass("tablesorter-headerUnSorted")) {
          header.click();
          header.click();
        }
      };
    $("#trap-setups").trigger("updateAll", [resort, callback]);
    console.timeEnd("Tablesorter");
    console.groupEnd();
  });

  $("#reset-button").click(function() {
    // Not reset: Power type, Rift set, Items used
    $("#desired-power-min").val(2000);
    $("#desired-power-max").val(3000);
    $("#power-bonus").val(0);
    $("#battery").val(0);
    $("#amp-bonus").val(100);
    $("#empowered-cheese").prop("checked", false);
    $("#tg-pour").prop("checked", false);
    $("#per-power").val(1);
    $("#max-results").val(100);
  });

  $("#save-button").click(function() {
    const saveObj = {};
    saveObj["power-type"] = [];
    $(".power-type:checked").each(function() {
      saveObj["power-type"].push($(this).val());
    });
    saveObj["desired-power-min"] = parseFloat($("#desired-power-min").val());
    saveObj["desired-power-max"] = parseFloat($("#desired-power-max").val());
    saveObj["power-bonus"] = parseInt($("#power-bonus").val());
    saveObj["rift-bonus"] = $("input[name=rift-bonus]:checked").attr("id");
    saveObj["battery"] = parseInt($("#battery").val());
    saveObj["amp-bonus"] = parseInt($("#amp-bonus").val());
    saveObj["empowered-cheese"] = $("#empowered-cheese").is(":checked");
    saveObj["tg-pour"] = $("#tg-pour").is(":checked");
    saveObj["per-power"] = parseInt($("#per-power").val());
    saveObj["max-results"] = parseInt($("#max-results").val());
    saveObj["items-used"] = $("input[name=items-used]:checked").attr("id");
    localStorage.setItem("powers-tool-prefs", JSON.stringify(saveObj));
  });

  $("#load-button").click(function() {
    loadPreferences();
  });

  $("#type-select-all").click(function() {
    if ($(".power-type:checked").length === 10) {
      $(".power-type:checkbox").each(function() {
        $(this).prop("checked", false);
      });
    } else {
      $(".power-type:checkbox").each(function() {
        $(this).prop("checked", true);
      });
    }
  });
};

function loadPreferences() {
  const prefString = localStorage.getItem("powers-tool-prefs");
  if (prefString) {
    const prefs = JSON.parse(prefString);
    $(".power-type:checkbox").each(function() {
      if (prefs["power-type"].indexOf($(this).val()) > -1) {
        $(this).prop("checked", true);
      } else {
        $(this).prop("checked", false);
      }
    });
    $("#desired-power-min").val(prefs["desired-power-min"]);
    $("#desired-power-max").val(prefs["desired-power-max"]);
    $("#power-bonus").val(prefs["power-bonus"]);
    const riftPref = "#" + prefs["rift-bonus"];
    $(riftPref).prop("checked", true);
    $("#battery").val(prefs["battery"]);
    $("#amp-bonus").val(prefs["amp-bonus"]);
    $("#empowered-cheese").prop("checked", prefs["empowered-cheese"]);
    $("#tg-pour").prop("checked", prefs["tg-pour"]);
    $("#per-power").val(prefs["per-power"]);
    $("#max-results").val(prefs["max-results"]);
    const itemPref = "#" + prefs["items-used"];
    $(itemPref).prop("checked", true);
  }
}

/**
 * Calculates the total power of a given trap setup, after bonuses and special effects
 * @param {string} weapon Weapon name
 * @param {string} base Base name
 * @param {string} charm Charm name
 * @param {object} bonusObj All calculated power bonuses
 * @return {float} Float precise up to 8 decimal places
 */
function calcPower(weapon, base, charm, bonusObj) {
  let rawPower = charmsArray[charm] ? charmsArray[charm][0] : 0;
  rawPower +=
    weaponsArray[weapon][1] + basesArray[base][0] + bonusObj["battery"];

  let rawPowerBonus = charmsArray[charm] ? charmsArray[charm][1] : 0;
  rawPowerBonus +=
    weaponsArray[weapon][2] + basesArray[base][1] + bonusObj["event"];

  const pourBonus = 1 + (bonusObj["pour"] / 100) * (1 + rawPowerBonus / 100);
  const totalPowerBonus =
    1 +
    (rawPowerBonus +
      bonusObj["power"] +
      bonusObj["rift"] +
      bonusObj["cheese"] +
      bonusObj["brace"]) /
      100;

  return parseFloat(
    (rawPower * totalPowerBonus * pourBonus * bonusObj["amp"]).toFixed(8)
  );
}

/**
 * Generates the HTML string that is fed into tablesorter
 * Iterates through weapons/bases/arrays and accounts for special parameters
 * @return {string} resultsHTML
 */
function generateResults() {
  const bonusObj = {}; // Store all calculated bonuses
  let countPer = {}; // Memoize occurrences of each power value
  let countMax = 0; // Count towards max total results
  const powerTypes = [];
  $(".power-type:checked").each(function() {
    powerTypes.push($(this).val());
  });
  const riftMultiplier = parseInt($("input[name=rift-bonus]:checked").val());
  let resultsHTML =
    "<caption>Results</caption><thead><tr><th id='precisePower'>Power<br>(Precise)</th><th id='base'>Base</th><th id='weapon'>Weapon</th><th id='charm'>Charm</th><th id='type'>Type</th><th id='roundedPower'>Power<br>(Displayed)</th></tr></thead><tbody>";

  // Power types default to Physical if empty
  if (powerTypes.length === 0) {
    $(".power-type[value='Physical']").prop("checked", true);
    powerTypes.push("Physical");
  }

  // Desired power bounds checks
  let powerMin = parseFloat($("#desired-power-min").val());
  if (powerMin > 9999999) {
    powerMin = 9999999;
    $("#desired-power-min").val(9999999);
  } else if (powerMin < 0) {
    powerMin = 0;
    $("#desired-power-min").val(0);
  }

  let powerMax = parseFloat($("#desired-power-max").val());
  if (powerMax > 9999999) {
    powerMax = 9999999;
    $("#desired-power-max").val(9999999);
  } else if (powerMax < 0) {
    powerMax = 0;
    $("#desired-power-max").val(0);
  }

  // Cancel early if power range is invalid
  if (powerMin > powerMax) {
    resultsHTML += "</tbody>";
    return resultsHTML;
  }

  // Power bonus bounds check
  let powerBonus = parseInt($("#power-bonus").val());
  if (powerBonus < 0) {
    powerBonus = 0;
    $("#power-bonus").val(0);
  } else if (powerBonus > 999) {
    powerBonus = 999;
    $("#power-bonus").val(999);
  }
  bonusObj["power"] = powerBonus;

  // Furoma Rift battery bounds check
  let batteryKey = parseInt($("#battery").val());
  if (batteryKey < 0) {
    batteryKey = 0;
    $("#battery").val(0);
  } else if (batteryKey > 10) {
    batteryKey = 10;
    $("#battery").val(10);
  }
  bonusObj["battery"] = battery[batteryKey];

  // ZT Tower Amplifier bounds check
  let ztBonus = parseInt($("#amp-bonus").val());
  if (ztBonus < 0) {
    ztBonus = 0;
    $("#amp-bonus").val(0);
  } else if (ztBonus > 175) {
    ztBonus = 175;
    $("#amp-bonus").val(175);
  }
  bonusObj["amp"] = ztBonus / 100;

  // Empowered cheese check
  bonusObj["cheese"] = $("#empowered-cheese").prop("checked") ? 20 : 0;

  // Poured check
  bonusObj["pour"] = $("#tg-pour").prop("checked") ? 5 : 0;

  // Per power bounds check
  let perPower = parseInt($("#per-power").val());
  if (perPower < 1) {
    perPower = 1;
    $("#per-power").val(1);
  } else if (perPower > 100) {
    perPower = 100;
    $("#per-power").val(100);
  }

  // Max results bounds check
  let maxResults = parseInt($("#max-results").val());
  if (maxResults < 1) {
    maxResults = 1;
    $("#max-results").val(1);
  } else if (maxResults > 9999) {
    maxResults = 9999;
    $("#max-results").val(9999);
  }

  // Convert item names into array format
  // Use owned items if selected
  const useOwned = $("input[name=items-used]:checked").val();
  const isOwnedEmpty = $.isEmptyObject(ownedItems);
  let loopWeapons = [];
  let loopBases = [];
  let loopCharms = [];
  if (!isOwnedEmpty && useOwned === "owned") {
    loopWeapons = ownedItems["weapons"];
    loopBases = ownedItems["bases"];
    loopCharms = ownedItems["charms"];
  } else {
    loopWeapons = Object.keys(weaponsArray);
    loopBases = Object.keys(basesArray);
    loopCharms = Object.keys(charmsArray);
  }

  // Edge cases for importing from best-setup-items
  if (!isOwnedEmpty && useOwned === "owned") {
    if (loopWeapons.indexOf("Isle Idol Trap") > -1) {
      loopWeapons.push("Isle Idol Hydroplane Skin");
      loopWeapons.push("Isle Idol Stakeshooter Skin");
    } else if (loopWeapons.indexOf("Gemstone Trap") > -1) {
      loopWeapons[loopWeapons.indexOf("Gemstone Trap")] =
        "Crystal Crucible Trap";
    } else if (loopWeapons.indexOf("Mouse Mary O\\'Nette") > -1) {
      loopWeapons[loopWeapons.indexOf("Mouse Mary O\\'Nette")] =
        "Mouse Mary O'Nette";
    }
  }

  // Check for invalid weapons/bases/charms
  let noInvalids = true;
  for (let weapon of loopWeapons) {
    if (!weaponsArray[weapon]) {
      noInvalids = false;
      console.log(`[Error] Invalid Weapon: ${weapon}`);
    }
  }
  for (let base of loopBases) {
    if (!basesArray[base]) {
      noInvalids = false;
      console.log(`[Error] Invalid Base: ${base}`);
    }
  }
  for (let charm of loopCharms) {
    if (!charmsArray[charm]) {
      noInvalids = false;
      console.log(`[Error] Invalid Charm: ${charm}`);
    }
  }

  if (noInvalids) {
    // Filter out 0/0 charms (except alterCharms)
    loopCharms = loopCharms.filter(el => {
      if (
        charmsArray[el][0] > 0 ||
        charmsArray[el][1] > 0 ||
        alterCharms.indexOf(el) > -1
      ) {
        return el;
      }
    });

    // Filter out Mining Charm because of its 30% hidden bonus against DDD
    const miningCharm = loopCharms.indexOf("Mining Charm");
    if (miningCharm > -1) {
      loopCharms.splice(miningCharm, 1);
    }

    // Push in an empty charm and a RVC
    loopCharms.push("No Charm");
    loopCharms.push("Rift Vacuum Charm");

    // Primary loop
    for (let weapon of loopWeapons) {
      // Only dive into inner loops if power type matches
      const powerType = weaponsArray[weapon][0];
      if (powerTypes.indexOf(powerType) > -1) {
        for (let base of loopBases) {
          // Physical Brace Base check
          bonusObj["brace"] =
            powerType === "Physical" && base === "Physical Brace Base" ? 25 : 0;

          for (let charm of loopCharms) {
            // Break out if max total results is exceeded
            if (countMax >= maxResults) break;

            // Skip if altering charm is encountered and handle it later
            if (alterCharms.indexOf(charm) > -1) continue;

            // Reset rift bonus to 0 every iteration
            bonusObj["rift"] = 0;

            if (riftMultiplier >= 1) {
              // Rift Bonus count
              const riftCount =
                +(riftWeapons.indexOf(weapon) > -1) +
                +(riftBases.indexOf(base) > -1) +
                +(riftCharms.indexOf(charm) > -1 || charm.indexOf("Rift") > -1);
              if (riftCount >= 2) {
                // 2 or 3 triggers the power bonus of Rift set
                bonusObj["rift"] = 20 * riftMultiplier;
              }
            }

            // Festive & Halloween bonus check
            bonusObj["event"] =
              (charm.indexOf("Snowball Charm") > -1 &&
                festiveTraps.indexOf(weapon) > -1) ||
              (charm.indexOf("Spooky Charm") > -1 &&
                halloweenTraps.indexOf(weapon) > -1) ||
              (charm.indexOf("Party Charm") > -1 &&
                birthdayTraps.indexOf(weapon) > -1)
                ? 20
                : 0;

            const precisePower = calcPower(weapon, base, charm, bonusObj);
            const cPer = countPer[precisePower];

            // Skip if max results per power is exceeded
            if (cPer && cPer >= perPower) continue;

            if (precisePower >= powerMin && precisePower <= powerMax) {
              const roundedPower = Math.ceil(precisePower);
              resultsHTML += `<tr><td>${precisePower}</td><td>${base}</td><td>${weapon}</td><td>${charm}</td><td>${powerType}</td><td>${roundedPower}</td></tr>`;
              if (typeof countPer[precisePower] === "undefined") {
                countPer[precisePower] = 1;
              } else {
                countPer[precisePower] += 1;
              }
              countMax++;
            }
          }
        }
      }
    }

    // Secondary loop for Forgotten/Hydro/Nanny/Shadow charms
    for (let charm of alterCharms) {
      if (loopCharms.indexOf(charm) > -1) {
        if (
          (charm === "Forgotten Charm" &&
            powerTypes.indexOf("Forgotten") > -1) ||
          (charm === "Hydro Charm" && powerTypes.indexOf("Hydro") > -1) ||
          (charm === "Nanny Charm" && powerTypes.indexOf("Parental") > -1) ||
          (charm === "Shadow Charm" && powerTypes.indexOf("Shadow") > -1)
        ) {
          for (let weapon of loopWeapons) {
            // Power-type charms don't affect II and GG
            if (
              weapon.indexOf("Isle Idol") >= 0 ||
              weapon.indexOf("Golem Guardian") >= 0
            ) {
              continue;
            }
            for (let base of loopBases) {
              // Physical Brace Base check
              bonusObj["brace"] =
                weaponsArray[weapon][0] === "Physical" &&
                base === "Physical Brace Base"
                  ? 25
                  : 0;

              // Break out if max total results is exceeded
              if (countMax >= maxResults) break;

              // Reset rift bonus to 0 every iteration
              bonusObj["rift"] = 0;

              if (riftMultiplier >= 1) {
                // Rift Bonus count
                const riftCount =
                  +(riftWeapons.indexOf(weapon) > -1) +
                  +(riftBases.indexOf(base) > -1) +
                  +(
                    riftCharms.indexOf(charm) > -1 || charm.indexOf("Rift") > -1
                  );
                if (riftCount >= 2) {
                  // 2 or 3 triggers the power bonus of Rift set
                  bonusObj["rift"] = 20 * riftMultiplier;
                }
              }

              const precisePower = calcPower(weapon, base, charm, bonusObj);
              const cPer = countPer[precisePower];

              // Skip if max results per power is exceeded
              if (cPer && cPer >= perPower) continue;

              if (precisePower >= powerMin && precisePower <= powerMax) {
                const roundedPower = Math.ceil(precisePower);
                let powerType = charm.slice(0, charm.indexOf(" Charm"));
                if (powerType === "Nanny") {
                  powerType = "Parental";
                }
                resultsHTML += `<tr><td>${precisePower}</td><td>${base}</td><td>${weapon}</td><td>${charm}</td><td>${powerType}</td><td>${roundedPower}</td></tr>`;
                if (typeof countPer[precisePower] === "undefined") {
                  countPer[precisePower] = 1;
                } else {
                  countPer[precisePower] += 1;
                }
                countMax++;
              }
            }
          }
        }
      }
    }
  }

  resultsHTML += "</tbody>";
  return resultsHTML;
}
