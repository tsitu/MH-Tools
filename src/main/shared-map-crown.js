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
var NAME_MAP = {};

var autoCompleteSettings = {
  delimiters: "\n",
  endingSymbols: "\n"
};

function initPageLoad(toolType) {
  startPopulationLoad(POPULATION_JSON_URL, toolType);

  if (toolType === "map") {
    loadBookmarkletFromJS(
      BOOKMARKLET_URLS["map"],
      "mapBookmarklet",
      "#bookmarklet"
    );
  } else if (toolType === "crown") {
    loadBookmarkletFromJS(
      BOOKMARKLET_URLS["crown"],
      "crownBookmarklet",
      "#bookmarklet"
    );
  }
  loadBookmarkletFromJS(
    BOOKMARKLET_URLS["loader"],
    "bookmarkletLoader",
    "#bookmarkletloader"
  );

  initTablesorter(); // Initialize tablesorter, bind to table
  initCheeseFilter();
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
    if (window.confirm("Are you sure?")) {
      document.getElementById("map").value = "";
      processMap("", toolType);
    }
  };

  // Check Crown Solver's window.name for bookmarklet data
  if (toolType === "crown" && window.name) {
    try {
      var nameCatchesObj = JSON.parse(window.name);
      var ncoKeys = Object.keys(nameCatchesObj);
      var textareaInput = "";
      for (var i = 0; i < ncoKeys.length; i++) {
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
  if (Cookies.get("savedRows")) {
    var x = parseInt(Cookies.get("savedRows"));
    var s = "#row" + x;
    $(s).prop("checked", true);
    rowLimit = x;
  }

  if (Cookies.get("savedCols")) {
    var x = parseInt(Cookies.get("savedCols"));
    var s = "#col" + x;
    $(s).prop("checked", true);
    columnLimit = x;
  }

  if (Cookies.get("savedAttraction")) {
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
}

function processCheeseFilter() {
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
    magicEssence: [
      "SB+",
      "Moon",
      "Maki",
      "Maki String",
      "Magical String",
      "Magical Rancid Radioactive Blue"
    ],
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
    ],
    eventLoc: ["Ronza", "Event"]
  };

  // Build master array of filtered terms
  var filteredCheeses = [];
  document.querySelectorAll(".cheese-filter").forEach(function(el) {
    if (el.checked) {
      filterList[el.name].forEach(function(cheese) {
        if (!filteredCheeses.includes(cheese)) {
          filteredCheeses.push(cheese);
        }
      });
    }
  });

  // Output terms to readonly <textarea>
  var displayString = "";
  filteredCheeses.forEach(function(cheese) {
    displayString += cheese + ", ";
  });
  displayString = displayString.slice(0, -2);
  $("#combinedFilter").text(displayString);

  // Apply filter to tablesorter
  var filterString = "";
  filteredCheeses.forEach(function(cheese) {
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
  $("#bestLocation").trigger("search", true);
}

function initCheeseFilter() {
  $(".cheese-filter").change(function() {
    // Cache checked state
    var checkedArr = [];
    $(".cheese-filter").each(function() {
      if (this.checked) {
        checkedArr.push(this.name);
      }
    });
    localStorage.setItem("cheese-filter-cache", JSON.stringify(checkedArr));
    processCheeseFilter();
  });

  $("#clearFilter").click(function() {
    $(".cheese-filter:checked").each(function() {
      $(this).prop("checked", false);
    });
    $("#combinedFilter").text("");
    localStorage.setItem("cheese-filter-cache", JSON.stringify([]));
    processCheeseFilter();
  });

  // Load in cheese filter checked state
  var cfCacheRaw = localStorage.getItem("cheese-filter-cache");
  if (cfCacheRaw) {
    var cfCache = JSON.parse(cfCacheRaw);
    document.querySelectorAll(".cheese-filter").forEach(function(el) {
      if (cfCache.indexOf(el.name) >= 0) {
        el.checked = true;
      }
    });
  }
}

function checkLoadState(toolType) {
  if (popLoaded && peLoaded) {
    generateNameMap();
    var acToggle = localStorage.getItem("textarea-autocomplete");
    if (!acToggle || acToggle === "on") {
      loadMouseDropdown();
    }
    loadMiceFromUrlOrCookie(toolType);
  }
}

/**
 * Generate mapping of lower-cased mouse names to properly cased ones
 */
function generateNameMap() {
  var nameKeys = Object.keys(powersArray);
  for (var i = 0; i < nameKeys.length; i++) {
    NAME_MAP[nameKeys[i].toLowerCase()] = nameKeys[i];
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
    if (cookie) {
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
    var url = "https://tsitu.github.io/MH-Tools/map.html";
    url += "?mice=" + encodeURIComponent(mouseArray.join("/"));
    $("#mapLink").attr("href", url);
  } else if (toolType === "crown") {
    mouseArray = mapText.match(/^[A-Za-z].*/gm);
    numCatchesArray = mapText.match(/^[0-9]{1,4}$/gm); // does not match negative #'s
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

  var bestLocationArray = [];
  var weightedBLA = [];
  var mouseLocationArray = [];
  var seenMice = [];
  var notRecognized = false;
  remainingMice = 0;

  for (var i = 0; i < Object.size(mouseArray); i++) {
    var catchesFromCrown = Infinity;
    if (toolType === "crown") {
      var num = +numCatchesArray[i];
      if (num > 0 && num < 10) {
        catchesFromCrown = 10 - num;
      } else if (num < 100) {
        catchesFromCrown = 100 - num;
      } else if (num < 500) {
        catchesFromCrown = 500 - num;
      } else if (num < 1000) {
        catchesFromCrown = 1000 - num;
      } else if (num < 2500) {
        catchesFromCrown = 2500 - num;
      }
    }

    var mouseName = mouseArray[i];
    if (mouseName.length === 0) continue;
    mouseName = mouseName.trim();
    mouseName = mouseName.replace(/’/g, "'"); // iOS right apostrophe
    var indexOfMouse = mouseName.indexOf(" Mouse"); // Make this more robust?
    if (indexOfMouse >= 0) {
      mouseName = mouseName.slice(0, indexOfMouse);
    }

    var origName = mouseName;
    mouseName = NAME_MAP[mouseName.toLowerCase()];
    if (!mouseName) {
      // Mouse name edge cases
      if (origName.toLowerCase() === "dread pirate") {
        mouseName = "Dread Pirate Mousert";
      } else {
        mouseName = origName;
      }
    }

    if (!popArray[mouseName]) {
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

      // Generating tag for min luck data
      var titleText =
        "Min Luck: " + mouseName.replace(/'/g, "&#39;") + "&#10;&#10;";
      var mlArr = getMinLuckArray(mouseName);
      for (var k = 0; k < 10; k++) {
        if (mlArr[k][1] === Infinity) {
          break;
        }
        titleText += mlArr[k][0] + ": " + mlArr[k][1] + "&#10;";
      }

      mouseListText +=
        "<tr><td style='font-size: 12px; padding: 10px'>" +
        "<span title='" +
        titleText +
        "' class='ml-tip'>" +
        "<b>" +
        mouseName +
        "</b></span></td>";
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
                URLString += "&charm=" + charmName + " Charm";
              }

              if (locationName !== "Event") {
                var modURLString = URLString.replace(/ /g, "%20");
                locationPhaseCheeseCharm +=
                  "<a href=" +
                  modURLString +
                  ' target="_blank" rel="noopener">Link to Best Setup</a>';
              } else {
                locationPhaseCheeseCharm += "<i>{ 0% Placeholder AR }</i>";
              }

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
                  ) / catchesFromCrown
                ).toFixed(4);
              }

              // Populate mouse location array
              if (!mouseLocationArray[locationPhaseCheeseCharm]) {
                mouseLocationArray[locationPhaseCheeseCharm] = [];
              }
              mouseLocationArray[locationPhaseCheeseCharm].push([
                mouseName,
                attractionRate
              ]);

              if (!bestLocationArray[locationPhaseCheeseCharm]) {
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
                      (attractionBonus / 100) * baseline);
                } else {
                  var baseline = findBaseline(cheeseName);
                  weightedBLA[locationPhaseCheeseCharm] =
                    attractionRate *
                    (baseline +
                      attractionBonus / 100 -
                      (attractionBonus / 100) * baseline);
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
                      (attractionBonus / 100) * baseline);
                } else {
                  var baseline = findBaseline(cheeseName);
                  weightedBLA[locationPhaseCheeseCharm] +=
                    attractionRate *
                    (baseline +
                      attractionBonus / 100 -
                      (attractionBonus / 100) * baseline);
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

  if (typeof weightedBLA === "undefined") {
    for (var i = 0; i < bLALength; i++) {
      var locationCheese = bLAKeys[i];
      sortedLocation.push([locationCheese, bestLocationArray[locationCheese]]);
    }

    sortedLocation.sort(function(a, b) {
      return b[1] - a[1];
    });
  } else {
    for (var i = 0; i < bLALength; i++) {
      var locationCheese = bLAKeys[i];
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
    var mlCache = {};
    if (mouseLocationArray[lpcc]) {
      for (var j = 0; j < Object.size(mouseLocationArray[lpcc]); j++) {
        var mouseName = mouseLocationArray[lpcc][j][0];

        if (!mlCache[mouseName]) {
          mlCache[mouseName] = getMinLuckArray(mouseName); // Initialize
        }

        // Generating tag for min luck data
        var titleText =
          "Min Luck: " + mouseName.replace(/'/g, "&#39;") + "&#10;&#10;";
        for (var k = 0; k < 10; k++) {
          if (mlCache[mouseName][k][1] === Infinity) {
            break;
          }
          titleText +=
            mlCache[mouseName][k][0] +
            ": " +
            mlCache[mouseName][k][1] +
            "&#10;";
        }

        mouseLocationHTML +=
          "<span title='" +
          titleText +
          "' class='ml-tip'>" +
          mouseName +
          " (" +
          mouseLocationArray[lpcc][j][1] + // Raw AR
          "%)</span><br>";
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
  processCheeseFilter();

  $(".ml-tip").click(function() {
    var titleClass = $(this).find(".title");
    if (!titleClass.length) {
      $(this).append(
        "<p class='title'>" +
          $(this)
            .attr("title")
            .replace(/\n/g, "<br>") +
          "</p>"
      );
    } else {
      titleClass.remove();
    }
  });
}

function getMinLuckArray(mouse) {
  function minLuck(effectiveness, mousePower) {
    return Math.ceil(
      (Math.ceil(Math.sqrt(mousePower / 2)) /
        Math.min(effectiveness * 10, 14)) *
        10
    );
  }

  var retArr = [
    ["Arcane", "N/A"],
    ["Draconic", "N/A"],
    ["Forgotten", "N/A"],
    ["Hydro", "N/A"],
    ["Parental", "N/A"],
    ["Physical", "N/A"],
    ["Shadow", "N/A"],
    ["Tactical", "N/A"],
    ["Law", "N/A"],
    ["Rift", "N/A"]
  ];

  if (!powersArray[mouse]) {
    return retArr;
  } else {
    var power = powersArray[mouse][0];
    for (var i = 1; i < 11; i++) {
      var eff = powersArray[mouse][i] / 100;
      retArr[i - 1][1] = minLuck(eff, power);
    }

    // Sort by lowest min luck
    retArr.sort(function(a, b) {
      return a[1] - b[1];
    });

    return retArr;
  }
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
