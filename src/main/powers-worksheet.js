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

  $("#gencsv-button").click(function() {
    // Generate CSV string for textarea
  });

  $("#reset-button").click(function() {
    // Reset each or both tables
    // localStorage empty string
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
      processDiff(inputText);
      window.name = ""; // Reset name after capturing data
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
    if (key !== "mouse-data" && key !== "trap-data") {
      returnBool = false;
      break;
    }
  }
  return returnBool;
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
function processDiff(inputText) {
  let storedObj = localStorage.getItem("powers-tool-worksheet-data");
  if (storedObj) {
    storedObj = JSON.parse(storedObj);
    const inputObj = JSON.parse(inputText);
    const storedMouseData = storedObj["mouse-data"];
    const inputMouseData = inputObj["mouse-data"];
    storedObj["mouse-data"] = mouseDataDiff(inputMouseData, storedMouseData);

    const inputTrapData = inputObj["trap-data"][0];
    storedObj["trap-data"].push(inputTrapData);

    // Update cache
    localStorage.setItem(
      "powers-tool-worksheet-data",
      JSON.stringify(storedObj)
    );
    renderTables();
  } else {
    // First insertion
    localStorage.setItem("powers-tool-worksheet-data", inputText);
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

    const trapData = storedData["trap-data"];
    const trapType = trapData[trapData.length - 1][0];
    const ttIndex = trapTypes.indexOf(trapType);
    let powersHTML = `<caption>Mouse Powers</caption><thead><tr><th id='group'>Group</th><th id='mouse'>Mouse</th><th id='type'>${trapType}</th><th id='lower'>Lower</th><th id='upper'>Upper</th></tr></thead><tbody>`;

    for (let group in mouseData) {
      for (let mouse in mouseData[group]) {
        const data = mouseData[group][mouse];
        const url = `<a href='https://www.mousehuntgame.com/m.php?id=${
          data["ID"]
        }' target='_blank' rel='noopener'>Link</a>`;
        detailsHTML += `<tr><td>${group}</td><td>${mouse}</td><td>${
          data["Gold"]
        }</td><td>${data["Points"]}</td><td>${url}</td></tr>`;
        powersHTML += `<tr><td>${group}</td><td>${mouse}</td><td>${
          data["Effs"][ttIndex][0]
        }</td><td>${data["Effs"][ttIndex][1]}</td><td>${
          data["Effs"][ttIndex][2]
        }</td></tr>`;
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
    trapHTML =
      "<caption>Trap Setup History</caption><thead><tr><th id='date'>Date</th><th id='type'>Type</th><th id='power'>Power</th></tr></thead><tbody>";
    for (let setup of trapData) {
      trapHTML += `<tr><td>${new Date(setup[2])}</td><td>${setup[0]}</td><td>${
        setup[1]
      }</td></tr>`;
    }
    trapHTML += "</tbody>";
    document.getElementById("trap-history").innerHTML = trapHTML;
    $("#trap-history").trigger("updateAll", [
      true,
      (callback = function() {
        const header = $("#date");
        if (header.hasClass("tablesorter-headerUnSorted")) {
          header.click();
          header.click();
        }
      })
    ]);
  }
}
