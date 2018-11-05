"use strict";

/**
 * Shared functions and variables for both Map and Crown Solvers
 */
var columnLimit = 0,
  rowLimit = 0,
  attractionBonus = 0,
  numLineBreaks = 0,
  timeDelay,
  remainingMice = 0;

var user = "map";
var EMPTY_SELECTION = "-";
var NULL_URL_PARAM = null;
var POPULATION_JSON_URL = "data/json/populations-map.json";
var FILTERED_CHEESES = [];

var autoCompleteSettings = {
  delimiters: "\n",
  endingSymbols: "\n"
};

function initPageLoad(toolType) {
  startPopulationLoad(POPULATION_JSON_URL, toolType);
  loadBookmarkletFromJS(
    BOOKMARKLET_LOADER_URL,
    "bookmarkletLoader",
    "#bookmarkletloader"
  );

  if (toolType === "map") {
    loadBookmarkletFromJS(
      MAP_BOOKMARKLET_URL,
      "mapBookmarklet",
      "#bookmarklet"
    );
  } else if (toolType === "crown") {
    loadBookmarkletFromJS(
      CROWN_BOOKMARKLET_URL,
      "crownBookmarklet",
      "#bookmarklet"
    );
  }

  // Initialize tablesorter, bind to table
  initTablesorter();
  loadCookies();

  // Handle autocomplete preference
  $("#toggleAutocomplete").change(function() {
    if ($("#toggleAutocomplete").is(":checked")) {
      localStorage.setItem("textarea-autocomplete", "off");
    } else {
      localStorage.setItem("textarea-autocomplete", "on");
    }
  });

  $("#map").keyup(function(event) {
    // Checking for enter/return, backspace, and delete
    // Then finding newlines and only processing when that differs from previous value
    // TODO: Check for paste too?
    if (event.keyCode == 13 || event.keyCode == 8 || event.keyCode == 46) {
      clearTimeout(timeDelay);
      var mapText = document.getElementById("map").value;
      var b = (mapText.match(/\n/g) || []).length;
      if (b !== numLineBreaks) {
        numLineBreaks = b;
        processMap(mapText, toolType);
      } else {
        clearTimeout(timeDelay);
        var mapText = document.getElementById("map").value;
        timeDelay = setTimeout(function() {
          processMap(mapText, toolType);
        }, 1000);
      }
    } else {
      // 1-second delay after every keypress before processing map
      // Implicitly handles pasting
      clearTimeout(timeDelay);
      var mapText = document.getElementById("map").value;
      timeDelay = setTimeout(function() {
        processMap(mapText, toolType);
      }, 1000);
    }
  });

  $("input[name='colLimit']").change(function() {
    columnLimit = $(this).val();
    Cookies.set("savedCols", columnLimit, {
      expires: 30
    });
    var mapText = document.getElementById("map").value;
    processMap(mapText, toolType);
  });

  $("input[name='rowLimit']").change(function() {
    rowLimit = $(this).val();
    Cookies.set("savedRows", rowLimit, {
      expires: 30
    });
    var mapText = document.getElementById("map").value;
    processMap(mapText, toolType);
  });

  document.getElementById("resetMouseList").onclick = function() {
    // Empty out the textarea
    document.getElementById("map").value = "";
    processMap("", toolType);
  };

  // Check Crown Solver's window.name for bookmarklet data
  if (toolType === "crown" && window.name) {
    try {
      var nameCatchesObj = JSON.parse(window.name);
      var ncoKeys = Object.keys(nameCatchesObj);
      var textareaInput = "";
      for (var i = 0; i < 50; i++) {
        textareaInput += ncoKeys[i] + "\n" + nameCatchesObj[ncoKeys[i]] + "\n";
      }
      document.getElementById("map").value = textareaInput;
      processMap(textareaInput, toolType);
    } catch (e) {
      console.error(e.stack);
    }
    window.name = ""; // Reset name after capturing data
  }
}

function contains(collection, searchElement) {
  return collection.indexOf(searchElement) > -1;
}

function findLoadedMice(param, toolType) {
  $("#map").val(param);
  var mapText = document.getElementById("map").value;
  timeDelay = setTimeout(function() {
    processMap(mapText, toolType);
  }, 100);
  $("#weightAR").click();
}

function loadCookies() {
  if (Cookies.get("savedRows") !== undefined) {
    var x = parseInt(Cookies.get("savedRows"));
    var s = "#row" + x;
    $(s).prop("checked", true);
    rowLimit = x;
  }

  if (Cookies.get("savedCols") !== undefined) {
    var x = parseInt(Cookies.get("savedCols"));
    var s = "#col" + x;
    $(s).prop("checked", true);
    columnLimit = x;
  }

  if (Cookies.get("savedAttraction") !== undefined) {
    attractionBonus = parseInt(Cookies.get("savedAttraction"));
    $("#ampSlider").slider("option", "value", attractionBonus);
  }

  if (localStorage.getItem("textarea-autocomplete") === "off") {
    $("#toggleAutocomplete").prop("checked", true);
  }
}

function initTablesorter() {
  $.tablesorter.defaults.sortInitialOrder = "desc";
  $("#bestLocation").tablesorter({
    // sortForce: [[noMice,1]],
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
      filter_placeholder: { search: "Filter results...", select: "" },
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

  $("#mouseList").tablesorter({
    // sortForce: [[noMice,1]],
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
      filter_placeholder: { search: "Filter results...", select: "" },
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

  $(".cheese-filter").change(function() {
    var filterList = {
      common: [
        "Brie",
        "Brie String",
        "Cheddar",
        "Gouda",
        "Marble",
        "Marble String",
        "Swiss",
        "Swiss String"
      ],
      crafted: [
        "Resonator",
        "Vanilla Stilton",
        "Vengeful Vanilla Stilton",
        "White Cheddar" // etc
      ],
      magicEssence: ["SB+", "Moon", "Maki", "Maki String", "Magical String"],
      marketplace: [
        "Crescent",
        "Magical String",
        "Maki",
        "Maki String",
        "Moon",
        "Rancid Radioactive Blue",
        "SB+"
      ],
      shoppe: [
        "Dewthief Camembert",
        "Duskshade Camembert",
        "Fishy Fromage",
        "Graveblossom Camembert",
        "Grilled",
        "Lunaria Camembert",
        "Sunrise"
      ]
    };
    if (this.checked) {
      filterList[this.name].forEach(function(cheese) {
        if (!FILTERED_CHEESES.includes(cheese)) {
          FILTERED_CHEESES.push(cheese);
        }
      });
    } else {
      filterList[this.name].forEach(function(cheese) {
        if (FILTERED_CHEESES.includes(cheese)) {
          FILTERED_CHEESES.splice(FILTERED_CHEESES.indexOf(cheese), 1);
        }
      });
    }
    var displayString = "";
    FILTERED_CHEESES.forEach(function(cheese) {
      displayString += cheese + ", ";
    });
    displayString = displayString.slice(0, -2);
    $("#combinedFilter").text(displayString);
  });

  $("#applyFilter").click(function() {
    var filterString = "";
    FILTERED_CHEESES.forEach(function(cheese) {
      if (cheese === "SB+") {
        // negative lookahead <3
        filterString += "/^(?!.*sb\\+).*$/i && ";
      } else {
        filterString += "!" + cheese + " && ";
      }
    });
    if (filterString.length > 0) {
      // Trim the last &&
      filterString = filterString.slice(0, -4);
    }
    var filters = [filterString];
    $.tablesorter.setFilters($("#bestLocation"), filters, true);
  });

  $("#clearFilter").click(function() {
    $(".cheese-filter:checked").each(function() {
      $(this).prop("checked", false);
    });
    $("#combinedFilter").text("");
    FILTERED_CHEESES = [];
  });
}

String.prototype.capitalise = function() {
  return this.replace(/(?:^|\s)\S/g, function(a) {
    return a.toUpperCase();
  });
};

function checkLoadState(toolType) {
  if (popLoaded) {
    var acToggle = localStorage.getItem("textarea-autocomplete");
    if (!acToggle || acToggle === "on") {
      loadMouseDropdown();
    }
    loadMiceFromUrlOrCookie(toolType);
  }
}

function loadMiceFromUrlOrCookie(toolType) {
  var mouseList;
  var numCatchList; // Crown
  if (toolType === "map") {
    mouseList = getStringListFromURL(
      window.location.search.match(/mice=([^&]*)/)
    );
  } else if (toolType === "crown") {
    mouseList = getStringListFromURL(
      window.location.search.match(/mice=([^&]*?)\?catches=/)
    );
    numCatchList = getStringListFromURL(
      window.location.search.match(/catches=([^&]*)/)
    );
  }

  if (mouseList.length === 0) {
    var cookieName;
    if (toolType === "map") {
      cookieName = "savedMice";
    } else if (toolType === "crown") {
      cookieName = "crownSavedMice";
    }
    var cookie = Cookies.get(cookieName);
    if (cookie !== undefined) {
      findLoadedMice(cookie, toolType);
    }
  } else {
    if (toolType === "map") {
      findLoadedMice(mouseList, toolType);
    } else if (toolType === "crown") {
      var mapText = "";
      var mouseArray = mouseList.split("\n");
      var numCatchArray = numCatchList.split("\n");

      for (var i = 0; i < mouseArray.length; i++) {
        mapText += mouseArray[i] + "\n";
        mapText += numCatchArray[i] + "\n";
      }

      findLoadedMice(mapText, toolType);
    }
  }
}

function loadMouseDropdown() {
  var popArrayLength = Object.size(popArray);
  var suggests = [];

  for (var i = 0; i < popArrayLength; i++) {
    suggests.push(Object.keys(popArray)[i]);
    suggests.push(Object.keys(popArray)[i].toLowerCase());
  }

  $("#map").asuggest(suggests, autoCompleteSettings);
}

var buildMouselist = function(mouseListText, sortedMLCLength, sortedMLC) {
  for (var l = 0; l < sortedMLCLength; l++) {
    var sliceMLC = sortedMLC[l][0].slice(0, sortedMLC[l][0].indexOf("<a href"));
    mouseListText +=
      "<td style='font-size: 11px; padding: 10px'>" +
      "<p style='font-size: 16px'>" +
      sortedMLC[l][1].toFixed(2) +
      "%</p><br>" +
      sliceMLC +
      "</td>";
  }
  return mouseListText;
};

function processMap(mapText, toolType) {
  // Save a cookie
  var cookieName = "";
  if (toolType === "map") {
    cookieName = "savedMice";
  } else if (toolType === "crown") {
    cookieName = "crownSavedMice";
  }
  Cookies.set(cookieName, mapText, {
    expires: 14
  });

  var mouseArray;
  var numCatchesArray; // Crown
  if (toolType === "map") {
    mouseArray = mapText.split("\n");
  } else if (toolType === "crown") {
    mouseArray = mapText.match(/^[A-Za-z].*/gm);
    numCatchesArray = mapText.match(/^[0-9]{1,2}$/gm);
    if (Object.size(mouseArray) !== Object.size(numCatchesArray)) {
      return; // Number of mice != number of catches rows
    }
  }

  var interpretedAs = document.getElementById("interpretedAs");
  var mouseList = document.getElementById("mouseList");

  var interpretedAsText = "<b>Invalid:<br></b><span class='invalid'>";
  var mouseListText;
  if (toolType === "map") {
    mouseListText =
      "<thead><tr><th align='center'>Mouse</th><th align='center' id='locationAR'>Location (Raw AR)</th></tr></thead><tbody>";
  } else if (toolType === "crown") {
    mouseListText =
      "<thead><tr><th align='center'>Mouse</th><th align='center' id='locationAR'>Location (Raw CP)</th></tr></thead><tbody>";
  }

  var hyphenEdgeCases = {
    "Exo-tech": "Exo-Tech",
    "Itty-bitty Burroughs": "Itty-Bitty Burroughs",
    "Over-prepared": "Over-Prepared",
    "Red-eyed Watcher Owl": "Red-Eyed Watcher Owl",
    "Rr-8": "RR-8",
    "Titanic Brain-taker": "Titanic Brain-Taker"
  };
  var bestLocationArray = [];
  var weightedBLA = [];
  var mouseLocationArray = [];
  var seenMice = [];
  var notRecognized = false;
  remainingMice = 0;

  for (var i = 0; i < Object.size(mouseArray); i++) {
    var catchesFromSilver; // Crown
    if (toolType === "crown") {
      catchesFromSilver = 100 - numCatchesArray[i];
    }
    var mouseName = mouseArray[i];
    if (mouseName.length == 0) continue;
    mouseName = mouseName.capitalise();
    mouseName = mouseName.trim();
    mouseName = mouseName.replace(/’/g, "'");
    var indexOfMouse = mouseName.indexOf(" Mouse");
    if (indexOfMouse >= 0) {
      mouseName = mouseName.slice(0, indexOfMouse);
    }

    // DPM edge case
    if (mouseName === "Dread Pirate") {
      mouseName = "Dread Pirate Mousert";
    }

    // Hyphenated mouse name edge cases
    if (hyphenEdgeCases.hasOwnProperty(mouseName)) {
      mouseName = hyphenEdgeCases[mouseName];
    }

    if (popArray[mouseName] == undefined) {
      // Mouse name not recognised
      interpretedAsText += mouseName + "<br>";
      notRecognized = true;
    } else {
      if (contains(seenMice, mouseName)) {
        continue;
      } else {
        seenMice.push(mouseName);
      }

      var mouseLocationCheese = new Array();

      mouseListText +=
        "<tr><td style='font-size: 12px; padding: 10px'><b>" +
        mouseName +
        "</b></td>";
      remainingMice++;

      var mouseLocation = Object.keys(popArray[mouseName]);
      var numLocations = Object.size(popArray[mouseName]);

      for (var j = 0; j < numLocations; j++) {
        var locationName = mouseLocation[j];

        var mousePhase = Object.keys(popArray[mouseName][locationName]);
        var numPhases = Object.size(popArray[mouseName][locationName]);

        for (var k = 0; k < numPhases; k++) {
          var phaseName = mousePhase[k];
          var mouseCheese = Object.keys(
            popArray[mouseName][locationName][phaseName]
          );
          var numCheeses = Object.size(
            popArray[mouseName][locationName][phaseName]
          );

          for (var l = 0; l < numCheeses; l++) {
            var cheeseName = mouseCheese[l];
            var mouseCharm = Object.keys(
              popArray[mouseName][locationName][phaseName][cheeseName]
            );
            var numCharms = Object.size(
              popArray[mouseName][locationName][phaseName][cheeseName]
            );

            for (var m = 0; m < numCharms; m++) {
              var charmName = mouseCharm[m];
              var locationPhaseCheeseCharm = "<b>" + locationName + "</b><br>";

              var URLString = "setup.html?";
              // Replace apostrophes with %27
              URLString += "location=" + locationName;

              if (phaseName != EMPTY_SELECTION) {
                locationPhaseCheeseCharm += "(" + phaseName + ")" + "<br>";
                URLString += "&phase=" + phaseName;
              }

              if (cheeseName.indexOf("/") > 0) {
                var trimmedCheese = cheeseName.slice(
                  0,
                  cheeseName.indexOf("/")
                );
                URLString += "&cheese=" + trimmedCheese;
                var restCheese = cheeseName.slice(
                  cheeseName.indexOf("/"),
                  cheeseName.length + 1
                );
                locationPhaseCheeseCharm +=
                  "<ins>" + trimmedCheese + "</ins>" + restCheese + "<br>";
              } else {
                URLString += "&cheese=" + cheeseName;
                locationPhaseCheeseCharm += cheeseName + "<br>";
              }

              if (charmName != EMPTY_SELECTION) {
                locationPhaseCheeseCharm += "[" + charmName + "]" + "<br>";
                URLString += "&charm=" + charmName;
              }

              var modURLString = URLString.replace(/ /g, "%20");
              locationPhaseCheeseCharm +=
                "<a href=" +
                modURLString +
                ' target="_blank" rel="noopener">Link to best setup</a>';

              var attractionRate;
              if (toolType === "map") {
                attractionRate = parseFloat(
                  popArray[mouseName][locationName][phaseName][cheeseName][
                    charmName
                  ]
                );
              } else if (toolType === "crown") {
                attractionRate = +(
                  parseFloat(
                    popArray[mouseName][locationName][phaseName][cheeseName][
                      charmName
                    ]
                  ) / catchesFromSilver
                ).toFixed(4);
              }

              // Populate mouse location array
              if (mouseLocationArray[locationPhaseCheeseCharm] == undefined) {
                mouseLocationArray[locationPhaseCheeseCharm] = [];
              }
              mouseLocationArray[locationPhaseCheeseCharm].push([
                mouseName,
                attractionRate
              ]);

              if (bestLocationArray[locationPhaseCheeseCharm] == undefined) {
                bestLocationArray[locationPhaseCheeseCharm] = attractionRate;
                if (cheeseName.indexOf("/") > 0) {
                  var trimmedCheese = cheeseName.slice(
                    0,
                    cheeseName.indexOf("/")
                  );
                  var baseline = findBaseline(trimmedCheese);
                  weightedBLA[locationPhaseCheeseCharm] =
                    attractionRate *
                    (baseline +
                      attractionBonus / 100 -
                      attractionBonus / 100 * baseline);
                } else {
                  var baseline = findBaseline(cheeseName);
                  weightedBLA[locationPhaseCheeseCharm] =
                    attractionRate *
                    (baseline +
                      attractionBonus / 100 -
                      attractionBonus / 100 * baseline);
                }
              } else {
                bestLocationArray[locationPhaseCheeseCharm] += attractionRate;
                if (cheeseName.indexOf("/") > 0) {
                  var trimmedCheese = cheeseName.slice(
                    0,
                    cheeseName.indexOf("/")
                  );
                  var baseline = findBaseline(trimmedCheese);
                  weightedBLA[locationPhaseCheeseCharm] +=
                    attractionRate *
                    (baseline +
                      attractionBonus / 100 -
                      attractionBonus / 100 * baseline);
                } else {
                  var baseline = findBaseline(cheeseName);
                  weightedBLA[locationPhaseCheeseCharm] +=
                    attractionRate *
                    (baseline +
                      attractionBonus / 100 -
                      attractionBonus / 100 * baseline);
                }
              }

              mouseLocationCheese[locationPhaseCheeseCharm] = attractionRate;
            }
          }
        }
      }

      var sortedMLC = sortBestLocation(mouseLocationCheese);
      var sortedMLCLength = Object.size(sortedMLC);

      // Mouse list column constraints
      if (columnLimit != 0) {
        if (sortedMLCLength > columnLimit) {
          sortedMLCLength = columnLimit;
        }
      }
      mouseListText = buildMouselist(mouseListText, sortedMLCLength, sortedMLC);
    }
  }

  mouseListText += "</tbody>";
  mouseList.innerHTML = mouseListText;
  var resort = true,
    callback = function() {
      var header = $("#locationAR");
      if (header.hasClass("tablesorter-headerAsc")) {
        header.click();
        header.click();
      } else if (header.hasClass("tablesorter-headerUnSorted")) {
        header.click();
      }
    };
  $("#mouseList").trigger("updateAll", [resort, callback]);

  interpretedAsText += "</span>";
  interpretedAs.innerHTML = interpretedAsText;
  if (notRecognized) {
    $("#interpretedAs").show(500);
  } else {
    $("#interpretedAs").hide(500);
  }

  $("#remainValue").text(remainingMice);

  // Sort mouseLocationArray
  for (var lpcc in mouseLocationArray) {
    if (mouseLocationArray.hasOwnProperty(lpcc)) {
      mouseLocationArray[lpcc].sort(function(a, b) {
        return b[1] - a[1];
      });
    }
  }

  var sortedLocation = sortBestLocation(bestLocationArray, weightedBLA);
  printBestLocation(sortedLocation, mouseLocationArray, toolType);
}

function sortBestLocation(bestLocationArray, weightedBLA) {
  var sortedLocation = new Array();

  var bLALength = Object.size(bestLocationArray);
  var bLAKeys = Object.keys(bestLocationArray);

  if (typeof weightedBLA == "undefined") {
    for (var i = 0; i < bLALength; i++) {
      var locationCheese = bLAKeys[i];
      // sortedLocation[bestLocationArray[locationCheese]] = locationCheese;
      sortedLocation.push([locationCheese, bestLocationArray[locationCheese]]);
    }

    sortedLocation.sort(function(a, b) {
      return b[1] - a[1];
    });
  } else {
    for (var i = 0; i < bLALength; i++) {
      var locationCheese = bLAKeys[i];
      // sortedLocation[bestLocationArray[locationCheese]] = locationCheese;
      sortedLocation.push([
        locationCheese,
        bestLocationArray[locationCheese],
        weightedBLA[locationCheese]
      ]);
    }

    sortedLocation.sort(function(a, b) {
      return b[2] - a[2];
    });
  }

  return sortedLocation;
}

function printBestLocation(sortedLocation, mouseLocationArray, toolType) {
  var bestLocation = document.getElementById("bestLocation");
  var bestLocationHTML = "";
  if (toolType === "map") {
    bestLocationHTML =
      "<thead><tr><th align='center'>Location Info</th><th align='center'>Mice (Raw AR)</th><th align='center' data-filter='false'>Total AR</th><th align='center' id='weightAR' data-filter='false'>Weighted AR</th></tr></thead><tbody>";
  } else if (toolType === "crown") {
    bestLocationHTML =
      "<thead><tr><th align='center'>Location Info</th><th align='center'>Mice (Raw CP)</th><th align='center' data-filter='false'>Total CP</th><th align='center' id='weightAR' data-filter='false'>Weighted CP</th></tr></thead><tbody>";
  }

  var sortedLocationLength = Object.size(sortedLocation);

  // Best location row constraints
  if (rowLimit != 0) {
    if (sortedLocationLength > rowLimit) {
      sortedLocationLength = rowLimit;
    }
  }

  for (var i = 0; i < sortedLocationLength; i++) {
    // Checking mouse location
    var mouseLocationHTML = "";
    var lpcc = sortedLocation[i][0];
    if (mouseLocationArray[lpcc]) {
      for (var j = 0; j < Object.size(mouseLocationArray[lpcc]); j++) {
        mouseLocationHTML +=
          mouseLocationArray[lpcc][j][0] +
          " (" +
          mouseLocationArray[lpcc][j][1] +
          "%)<br>";
      }
    } else {
      mouseLocationHTML = "N/A";
    }

    bestLocationHTML +=
      "<tr><td align='center'>" +
      sortedLocation[i][0] +
      "</td><td align='center' style='font-size: 11px; white-space: nowrap'>" +
      mouseLocationHTML +
      "</td><td align='center'>" +
      sortedLocation[i][1].toFixed(2) +
      "%</td><td align='center'>" +
      sortedLocation[i][2].toFixed(2) +
      "%</td></tr>";
  }

  bestLocationHTML += "</tbody>";
  bestLocation.innerHTML = bestLocationHTML;

  var resort = true,
    callback = function() {
      var header = $("#weightAR");
      if (header.hasClass("tablesorter-headerAsc")) {
        header.click();
        header.click();
      } else if (header.hasClass("tablesorter-headerUnSorted")) {
        header.click();
      }
    };
  $("#bestLocation").trigger("updateAll", [resort, callback]);
}

function findBaseline(cheese) {
  return baselineAttArray[cheese];
}

function getStringListFromURL(parameters) {
  if (parameters) {
    parameters = decodeURIComponent(parameters[1]);

    return parameters.split("/").join("\n");
  } else {
    return [];
  }
}
