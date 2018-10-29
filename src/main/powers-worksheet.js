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

window.onload = function() {
  // Load in Auto-Loader bookmarklet
  loadBookmarkletFromJS(
    BOOKMARKLET_LOADER_URL,
    "bookmarkletLoader",
    "#bookmarkletloader"
  );

  // Process data from window.name
  if (window.name) {
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
    // localStorage empty string
  });

  // renderTables();
};

/**
 * Grab window.name data and validate it as JSON
 * Cache to localStorage and reset window.name
 */
function loadData(inputText) {
  try {
    if (validateJsonData(JSON.parse(inputText))) {
      // console.log(JSON.parse(inputText));
      processInput(inputText);
      // window.name = ""; // Reset name after capturing data
    } else {
      throw new TypeError("JSON format invalid or corrupted");
    }
  } catch (e) {
    console.log(`(Error in window.name) - ${e}`);
  }
}

/**
 * Checks if mouse data JSON is properly formatted
 * @param {obj} jsonObj
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
 * @param {float} power Precise computed total power
 */
function calculateBounds(input, power) {
  // delete difficulty prop after using!
  // need dom-trap-type lmao

  for (let group in input) {
    for (let mouse in input[group]) {
      const difficulty = mouse.difficulty;
      const effArr = mouse.effs;
      // mutation magic
    }
  }

  let lowerBound = 0;
  let upperBound = "∞";
  switch (mouse.difficulty) {
    case "Effortless":
      upperBound = parseFloat((trapPower / 19).toFixed(2));
      break;
    case "Easy":
      lowerBound = parseFloat((trapPower / 19).toFixed(2));
      upperBound = parseFloat((trapPower / 9).toFixed(2));
      break;
    case "Moderate":
      lowerBound = parseFloat((trapPower / 9).toFixed(2));
      upperBound = parseFloat((trapPower * 7 / 13).toFixed(2));
      break;
    case "Challenging":
      lowerBound = parseFloat((trapPower * 7 / 13).toFixed(2));
      upperBound = parseFloat(trapPower.toFixed(2));
      break;
    case "Difficult":
      lowerBound = parseFloat(trapPower.toFixed(2));
      upperBound = parseFloat((trapPower * 13 / 7).toFixed(2));
      break;
    case "Overpowering":
      lowerBound = parseFloat((trapPower * 13 / 7).toFixed(2));
      upperBound = parseFloat((trapPower * 9).toFixed(2));
      break;
    case "Near Impossible":
      lowerBound = parseFloat((trapPower * 9).toFixed(2));
      upperBound = parseFloat((trapPower * 19).toFixed(2));
      break;
  }
  effObj[trapType].push(lowerBound);
  effObj[trapType].push(upperBound);

  return stored;
}

/**
 * Diffs the incoming and stored mouse-data objs
 * (Is there a more elegant way to do this?)
 * @param {object} input
 * @param {object} stored
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
            if (field === "Effs") {
              for (let i = 0; i < 10; i++) {
                const inputArr = input[group][mouse]["Effs"][i];
                let storedArr = stored[group][mouse]["Effs"][i];
                if (inputArr.length === 3 && storedArr.length === 1) {
                  // Input data is new
                  storedArr = inputArr;
                } else if (inputArr.length === 3 && storedArr.length === 3) {
                  if (inputArr[0] !== storedArr[0]) {
                    // If eff is different HG has tweaked it
                    storedArr = inputArr;
                  } else if (inputArr[1] > storedArr[1]) {
                    // Replace with a bigger lower bound
                    storedArr[1] = inputArr[1];
                  } else if (inputArr[2] < storedArr[2]) {
                    // Replace with a smaller upper bound
                    storedArr[2] = inputArr[2];
                  }
                }
                stored[group][mouse]["Effs"][i] = storedArr;
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
  bonusObj["battery"] = user["battery"];
  bonusObj["power"] = user["power-bonus"];
  bonusObj["amp"] = user["zt-amp"];
  bonusObj["cheese"] = user["empowered"] ? 20 : 0;
  bonusObj["pour"] = user["tg-pour"] ? 5 : 0;

  bonusObj["rift"] = 0;
  const riftMultiplier = user["rift"];
  if (riftMultiplier >= 1) {
    // Rift Bonus count
    const riftCount =
      +(riftWeapons.indexOf(user.weapon) > -1) +
      +(riftBases.indexOf(user.base) > -1) +
      +(riftCharms.indexOf(user.charm) > -1 || user.charm.indexOf("Rift") > -1);
    if (riftCount >= 2) {
      // 2 or 3 triggers the power bonus of Rift set
      bonusObj["rift"] = 10 * riftMultiplier;
    }
  }
  // !!! MUST ADD Rift Set radio buttons to bookmarklet and pass multiplier via user-data !!!

  // Festive & Halloween bonus check
  bonusObj["event"] =
    (user.charm.indexOf("Snowball Charm") > -1 &&
      festiveTraps.indexOf(user.weapon) > -1) ||
    (user.charm.indexOf("Spooky Charm") > -1 &&
      halloweenTraps.indexOf(user.weapon) > -1)
      ? 20
      : 0;

  // Physical Brace Base check
  bonusObj["brace"] =
    weaponsArray[user.weapon][0] === "Physical" &&
    user.base === "Physical Brace Base"
      ? 1.25
      : 1;

  const calculatedPower = calcPower(
    user.weapon,
    user.base,
    user.charm,
    bonusObj
  );

  if (user["dom-trap-power"] - calculatedPower > 1) {
    alert(
      "One of the following went wrong when computing total trap power:\n[1] user.trap_power_bonus was not accurately passed in. Try refreshing your Camp page.\n[2] Unhandled special location/stage/charm effects. Please try again."
    );
    return;
  }

  incomingObj["mouse-data"] = calculateBounds(
    incomingObj["mouse-data"],
    calculatedPower
  );

  let storedObj = localStorage.getItem("powers-tool-worksheet-data");
  if (storedObj) {
    storedObj = JSON.parse(storedObj);
    storedObj["mouse-data"] = mouseDataDiff(
      incomingObj["mouse-data"],
      storedObj["mouse-data"]
    );

    // Insert into trap history
    storedObj["trap-history"].push([
      user["dom-trap-type"],
      calculatedPower,
      user["timestamp"]
    ]);

    // Update storage
    localStorage.setItem(
      "powers-tool-worksheet-data",
      JSON.stringify(storedObj)
    );
    renderTables();
  } else {
    // Initial insertion into storage
    incomingObj["trap-history"] = [];
    incomingObj["trap-history"].push([
      user["dom-trap-type"],
      calculatedPower,
      user["timestamp"]
    ]);

    localStorage.setItem(
      "powers-tool-worksheet-data",
      JSON.stringify(incomingObj)
    );
  }
}

function renderTables() {
  let storedData = localStorage.getItem("powers-tool-worksheet-data");
  if (storedData) {
    storedData = JSON.parse(storedData);

    // Mouse Details and Mouse Power Stuff
    const mouseData = storedData["mouse-data"];
    let detailsHTML =
      "<caption>Mouse Details</caption><thead><tr><th id='group'>Group</th><th id='mouse'>Mouse</th><th id='gold'>Gold</th><th id='points'>Points</th><th id='mouseID'>ID</th></tr></thead><tbody>";

    // const trapData = storedData["trap-data"];
    // const trapType = trapData[trapData.length - 1][0];
    // const ttIndex = trapTypes.indexOf(trapType);
    let powersHTML =
      "<caption>Mouse Powers</caption><thead><tr><th id='group'>Group</th><th id='mouse'>Mouse</th><th colspan='3'>Arcane</th><th colspan='3'>Draconic</th><th colspan='3'>Forgotten</th><th colspan='3'>Hydro</th><th colspan='3'>Parental</th><th colspan='3'>Physical</th><th colspan='3'>Shadow</th><th colspan='3'>Tactical</th><th colspan='3'>Law</th><th colspan='3'>Rift</th></tr>";
    powersHTML += "<tr><td>sort</td><td>sort</td>";
    for (let i = 0; i < 10; i++) {
      powersHTML += "<td>eff</td><td>min</td><td>max</td>";
    }
    powersHTML += "</tr></thead><tbody>";

    for (let group in mouseData) {
      for (let mouse in mouseData[group]) {
        const data = mouseData[group][mouse];
        const url = `<a href='https://www.mousehuntgame.com/m.php?id=${
          data["ID"]
        }' target='_blank' rel='noopener'>Link</a>`;

        detailsHTML += `<tr><td>${group}</td><td>${mouse}</td><td>${
          data["Gold"]
        }</td><td>${data["Points"]}</td><td>${url}</td></tr>`;

        const gString = group.slice(0, group.indexOf("(") - 1);
        const sString = group.slice(group.indexOf("("), group.length);
        powersHTML += `<tr><td>${gString}<br>${sString}</td><td>${mouse}</td>`;
        for (let i = 0; i < 10; i++) {
          const lowerBound = data["Effs"][i][1] ? data["Effs"][i][1] : 0;
          const upperBound = data["Effs"][i][2] ? data["Effs"][i][2] : "∞";
          powersHTML += `<td>${
            data["Effs"][i][0]
          }%</td><td>${lowerBound}</td><td>${upperBound}</td>`;
        }
        powersHTML += "</tr>";
      }
    }

    detailsHTML += "</tbody>";
    document.getElementById("mouse-details").innerHTML = detailsHTML;
    $("#mouse-details").trigger("updateAll", [
      true,
      (callback = function() {
        const header = $("#mouse");
        if (header.hasClass("tablesorter-headerUnSorted")) {
          header.click();
          header.click();
        }
      })
    ]);

    powersHTML += "</tbody>";
    document.getElementById("mouse-powers").innerHTML = powersHTML;
    $("#mouse-powers").trigger("updateAll", [
      true,
      (callback = function() {
        const header = $("#mouse");
        if (header.hasClass("tablesorter-headerUnSorted")) {
          header.click();
          header.click();
        }
      })
    ]);

    // Trap Setup History
    // trapHTML =
    //   "<caption>Trap Setup History</caption><thead><tr><th id='date'>Date</th><th id='type'>Type</th><th id='power'>Power</th></tr></thead><tbody>";
    // for (let setup of trapData) {
    //   trapHTML += `<tr><td>${new Date(setup[2])}</td><td>${setup[0]}</td><td>${
    //     setup[1]
    //   }</td></tr>`;
    // }
    // trapHTML += "</tbody>";
    // document.getElementById("trap-history").innerHTML = trapHTML;
    // $("#trap-history").trigger("updateAll", [
    //   true,
    //   (callback = function() {
    //     const header = $("#date");
    //     if (header.hasClass("tablesorter-headerUnSorted")) {
    //       header.click();
    //       header.click();
    //     }
    //   })
    // ]);
  }
}
