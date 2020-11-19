"use strict";

$(window).load(function() {
  user = SETUP_USER;

  loadBookmarkletFromJS(
    BOOKMARKLET_URLS["loader"],
    "bookmarkletLoader",
    "#bookmarkletloader"
  );
  loadBookmarkletFromJS(
    BOOKMARKLET_URLS["setup_items"],
    "setupBookmarklet",
    "#setupBookmarklet"
  );
  loadBookmarkletFromJS(
    BOOKMARKLET_URLS["setup_fields"],
    "setupFieldsBookmarklet",
    "#setupFieldsBookmarklet"
  );

  loadItemSelection(weaponKeys, "weapon");
  loadItemSelection(baseKeys, "base");
  loadItemSelection(charmKeys, "charm");

  startPopulationLoad("data/json/populations-cre-setup.json", user);
  loadCharmDropdown();
  $("#main").show();

  var bonusPowerParameter = parseInt(getURLParameter("bonusPower"));
  if (bonusPowerParameter >= 0) {
    document.getElementById("bonusPower").value = bonusPowerParameter;
    bonusPowerChanged();
  }

  var bonusLuckParameter = parseInt(getURLParameter("bonusLuck"));
  if (bonusLuckParameter >= 0) {
    document.getElementById("bonusLuck").value = bonusLuckParameter;
    bonusLuckChanged();
  }

  showHideWidgets();

  document.getElementById("location").onchange = locationChanged;
  document.getElementById("phase").onchange = phaseChanged;
  document.getElementById("cheese").onchange = cheeseChanged;
  document.getElementById("charm").onchange = charmChanged;
  document.getElementById("empowered").onchange = empoweredChanged;
  document.getElementById("battery").onchange = batteryChanged;
  document.getElementById("gs").onchange = gsChanged;
  document.getElementById("bonusPower").onchange = bonusPowerChanged;
  document.getElementById("bonusLuck").onchange = bonusLuckChanged;
  document.getElementById("ballistaLevel").onchange = genericOnChange;
  document.getElementById("cannonLevel").onchange = genericOnChange;
  document.getElementById("saltLevel").onchange = saltChanged;
  document.getElementById("vrFloorType").onchange = genericOnChange;
  document.getElementById("umbraFloor").onchange = umbraChanged;
  document.getElementById("riftstalker").onchange = riftstalkerChange;
  document.getElementById("dentureFilter").onchange = dentureFilterChange;
  document.getElementById("rank").onchange = rankChange;

  $("#save_setup_button").click(saveSetupStorage);

  $("#show_pop_button").click(function() {
    $("#pleaseWaitMessage").css("display", "inline");
    setTimeout(showPop, 0);
  });
  bindSelectorButtons();

  $("#results")
    .bind("sortStart", function() {
      $("#pleaseWaitMessage").show();
    })
    .bind("sortEnd", function() {
      $("#pleaseWaitMessage").hide();
    });

  /**
   * Toggle weapon/charm/base selectors
   */
  function bindSelectorButtons() {
    var weaponsTable = getSelectors("weapon").container;
    var baseTable = getSelectors("base").container;
    var charmTable = getSelectors("charm").container;

    $("#show_weapons_button").click(function() {
      $(weaponsTable).toggle();
      $(baseTable).hide();
      $(charmTable).hide();
    });

    $("#show_bases_button").click(function() {
      $(baseTable).toggle();
      $(weaponsTable).hide();
      $(charmTable).hide();
    });

    $("#show_charms_button").click(function() {
      $(charmTable).toggle();
      $(weaponsTable).hide();
      $(baseTable).hide();
    });
  }

  // Check window.name for bookmarklet data
  if (window.name) {
    try {
      var basesWeaponsCharms = JSON.parse(window.name);
      if (
        basesWeaponsCharms["bases"] &&
        basesWeaponsCharms["weapons"] &&
        basesWeaponsCharms["charms"]
      ) {
        // Write to object along with current arrays.js keys
        var storageObj = {};
        storageObj["all-items"] = {};
        storageObj["all-items"]["bases"] = baseKeys;
        storageObj["all-items"]["charms"] = charmKeys;
        storageObj["all-items"]["weapons"] = weaponKeys;
        storageObj["owned-items"] = {};
        storageObj["owned-items"]["bases"] = basesWeaponsCharms["bases"];
        storageObj["owned-items"]["charms"] = basesWeaponsCharms["charms"];
        storageObj["owned-items"]["weapons"] = basesWeaponsCharms["weapons"];
        localStorage.setItem("best-setup-items", JSON.stringify(storageObj));
        window.name = ""; // Reset name after capturing data
      } else {
        console.error(
          "window.name not properly formatted for Best Setup usage"
        );
      }
    } catch (e) {
      console.error("(Error in window.name) - " + e.stack);
    }
    // called after try...catch
    checkStorage();
  } else {
    // window.name empty
    checkStorage();
  }
});

function loadCharmDropdown() {
  loadDropdown("charm", charmKeys, charmChanged, "<option>No Charm</option>");
  var charmParameter = recentCharm || getURLParameter("charm");
  var select = document.getElementById("charm");
  if (charmParameter != NULL_URL_PARAM) {
    select.value = charmParameter;
  }
  if (select.selectedIndex == -1) {
    select.selectedIndex = 0;
  }
  charmChanged();
}

/**
 * Get jQuery selectors for a specific item type
 * @param {string} type 'weapon', 'base' or 'charm'
 * @return {{checkboxClass, labelClass, checkbox, container, allCheckbox, name: string}}
 */
function getSelectors(type) {
  var checkboxClass = type + "_checkbox";
  return {
    checkboxClass: checkboxClass,
    labelClass: checkboxClass + "-label",
    checkbox: "." + checkboxClass,
    container: "#" + type + "s_selector_table",
    allCheckbox: "#all_" + type + "s_checkbox",
    name: type + "-owned"
  };
}

/**
 * Populate item checkboxes
 * @param {string[]} itemKeys
 * @param {string} type @see {@link getSelectors}
 */
function loadItemSelection(itemKeys, type) {
  var i;
  var select = getSelectors(type);
  for (i = 0; i < itemKeys.length; i++) {
    var checkboxItem = buildCheckboxItem(select, itemKeys[i]);
    $(checkboxItem)
      .appendTo(select.container)
      .wrap("<li>");
  }

  $(select.checkbox).change(function() {
    $(select.allCheckbox).prop("checked", false);
  });

  $(select.allCheckbox).change(function() {
    var checked = this.checked;
    $(select.checkbox).prop("checked", checked);
  });

  /**
   * Builds jQuery object with checkbox to insert
   * @param select
   * @param itemName
   * @return {jQuery}
   */
  function buildCheckboxItem(select, itemName) {
    var row = $("<label></label>");
    $("<input />", {
      type: "checkbox",
      checked: "checked",
      value: itemName,
      class: select.checkboxClass,
      name: select.name
    }).appendTo(row);
    $("<span />", {
      class: select.labelClass,
      text: itemName
    }).appendTo(row);
    return row;
  }
}

/**
 * Check localStorage for saved items
 */
function checkStorage() {
  var storedData = JSON.parse(localStorage.getItem("best-setup-items"));
  if (storedData) {
    checkForNewItems(storedData);
    processStoredData(storedData);
  }

  /**
   * Compare storedData["all-items"] to arrays.js
   * Generate alert if new items have been added, then update localStorage
   */
  function checkForNewItems(storedData) {
    if (
      storedData["all-items"]["bases"].length !== baseKeys.length ||
      storedData["all-items"]["charms"].length !== charmKeys.length ||
      storedData["all-items"]["weapons"].length !== weaponKeys.length
    ) {
      var newItemString = "";
      for (var i = 0; i < baseKeys.length; i++) {
        if (storedData["all-items"]["bases"].indexOf(baseKeys[i]) < 0) {
          newItemString += "Base - " + baseKeys[i] + "\n";
        }
      }
      for (var i = 0; i < charmKeys.length; i++) {
        if (storedData["all-items"]["charms"].indexOf(charmKeys[i]) < 0) {
          newItemString += "Charm - " + charmKeys[i] + "\n";
        }
      }
      for (var i = 0; i < weaponKeys.length; i++) {
        if (storedData["all-items"]["weapons"].indexOf(weaponKeys[i]) < 0) {
          newItemString += "Weapon - " + weaponKeys[i] + "\n";
        }
      }
      window.alert(
        "> New Items <\n\n" +
          newItemString +
          "\nPlease add appropriate checkmarks or use the bookmarklet at your earliest convenience!"
      );
      storedData["all-items"]["bases"] = baseKeys;
      storedData["all-items"]["charms"] = charmKeys;
      storedData["all-items"]["weapons"] = weaponKeys;
      localStorage.setItem("best-setup-items", JSON.stringify(storedData));
    }
  }

  function processStorageArray(indexArray, ownedItems, type) {
    var currentItem, i;
    var selectors = getSelectors(type);

    $(selectors.checkbox).prop("checked", false);
    $(selectors.allCheckbox).prop("checked", false);
    for (i = 0; i < indexArray.length; i++) {
      currentItem = indexArray[i];
      if (contains(ownedItems, currentItem)) {
        $(selectors.checkbox).get(i).checked = true;
      }
    }
  }

  function processStoredData(storedData) {
    var ownedBases = storedData["owned-items"]["bases"];
    var ownedWeapons = storedData["owned-items"]["weapons"];
    var ownedCharms = storedData["owned-items"]["charms"];

    // Handle Golem Guardian variants
    var golemCount = 0;
    for (var el of ownedWeapons) {
      if (el.indexOf("Golem Guardian") >= 0) golemCount += 1;
    }
    golemCount -= 1;
    var ownedWeaponsLength = ownedWeapons.length - golemCount;
    var totalWeaponsLength = weaponKeys.length - 4;

    console.group("Items: Owned / Total");
    console.log("Bases: " + ownedBases.length + " / " + baseKeys.length);
    console.log("Weapons: " + ownedWeaponsLength + " / " + totalWeaponsLength);
    console.log("Charms: " + ownedCharms.length + " / " + charmKeys.length);
    console.groupEnd();

    if (ownedBases && ownedBases.length > 0) {
      processStorageArray(baseKeys, ownedBases, "base");
    }

    if (ownedWeapons && ownedWeapons.length > 0) {
      // Edge cases
      if (ownedWeapons.indexOf("Isle Idol Trap") > -1) {
        ownedWeapons.push("Isle Idol Hydroplane Skin");
        ownedWeapons.push("Isle Idol Stakeshooter Skin");
      } else if (ownedWeapons.indexOf("Gemstone Trap") > -1) {
        ownedWeapons[ownedWeapons.indexOf("Gemstone Trap")] =
          "Crystal Crucible Trap";
      } else if (ownedWeapons.indexOf("Mouse Mary O\\'Nette") > -1) {
        ownedWeapons[ownedWeapons.indexOf("Mouse Mary O\\'Nette")] =
          "Mouse Mary O'Nette";
      }
      processStorageArray(weaponKeys, ownedWeapons, "weapon");
    }

    if (ownedCharms && ownedCharms.length > 0) {
      processStorageArray(charmKeys, ownedCharms, "charm");
    }
  }
}

/**
 * Saves ticked bases/charms/weapons to localStorage
 * Also stores current total number of items for future comparison
 */
function saveSetupStorage() {
  var storageObj = {};
  storageObj["all-items"] = {};
  storageObj["all-items"]["bases"] = baseKeys;
  storageObj["all-items"]["charms"] = charmKeys;
  storageObj["all-items"]["weapons"] = weaponKeys;
  storageObj["owned-items"] = {};
  storageObj["owned-items"]["bases"] = getCheckboxString(
    getSelectors("base").checkbox
  );
  storageObj["owned-items"]["charms"] = getCheckboxString(
    getSelectors("charm").checkbox
  );
  storageObj["owned-items"]["weapons"] = getCheckboxString(
    getSelectors("weapon").checkbox
  );
  localStorage.setItem("best-setup-items", JSON.stringify(storageObj));

  /**
   * Builds array of item names from selected checkboxes
   * @param {string} selector
   * @return {string[]}
   */
  function getCheckboxString(selector) {
    return $(selector)
      .map(function() {
        if ($(this).prop("checked") === true) {
          return $(this).prop("value");
        }
      })
      .toArray();
  }
}

/**
 * Loads the cheese dropdown menu
 */
function loadCheeseDropdown(location, phase) {
  var cheeseDropdown = document.getElementById("cheese");
  var cheeseDropdownHTML = "";

  var insertedCheeses = [];

  function addCheeseOption(insertedCheeses, cheeseName, cheeseDropdownHTML) {
    if (!contains(insertedCheeses, cheeseName)) {
      cheeseDropdownHTML += "<option>" + cheeseName + "</option>\n";
      insertedCheeses.push(cheeseName);
    }
    return cheeseDropdownHTML;
  }

  for (var cheeseOption in popArray[location][phase]) {
    cheeseDropdownHTML = addCheeseOption(
      insertedCheeses,
      cheeseOption,
      cheeseDropdownHTML
    );
  }

  cheeseDropdown.innerHTML = cheeseDropdownHTML;
  cheeseDropdown.selectedIndex = 0;

  var select = document.getElementById("cheese");
  var cheeseParameter = recentCheese || getURLParameter("cheese");
  if (cheeseParameter !== NULL_URL_PARAM) {
    select.value = cheeseParameter;
  }
  if (select.selectedIndex === -1) {
    select.selectedIndex = 0;
  }

  cheeseChanged();
}

function updateLink() {
  var select = document.getElementById("charm");
  var selectedCharm = select.value;

  var urlParams = {
    location: locationName,
    phase: phaseName,
    cheese: cheeseName,
    charm: selectedCharm,
    empowered: isEmpowered,
    battery: batteryPower,
    gs: !gsLuck,
    bonusPower: bonusPower,
    bonusLuck: bonusLuck,
    riftstalker: riftStalkerCodex,
    ballistaLevel: fortRox.ballistaLevel,
    cannonLevel: fortRox.cannonLevel,
    saltLevel: saltLevel,
    rank: rank,
    amplifier: ztAmp,
    vrFloorType: document.querySelector("#vrFloorType").selectedIndex
  };

  var urlString = buildURL("setup.html", urlParams);
  document.getElementById("link").href = urlString;

  ga("send", "event", "link", "updated", urlString);
}

function weaponChanged() {
  populateWeaponData(weaponName);
  calculateTrapSetup();
}

function cheeseChanged() {
  cheeseName = document.getElementById("cheese").value;
  recentCheese = cheeseName;
  updateLink();
  checkEmpoweredWidget();
  checkSpecialCharms();
}

function baseChanged() {
  calcSpecialCharms(charmName);
  populateBaseData(baseName);
  calculateTrapSetup();
}

function charmChanged(customValue) {
  var select = document.getElementById("charm");
  select = select.value.trim().replace(/\*$/, "");
  recentCharm = select;

  // Workaround for Object-type 'Event' when selecting a charm
  if (customValue && typeof customValue === "string") {
    charmChangeCommon(customValue);
  } else {
    charmChangeCommon(select);
  }
  calculateTrapSetup();
  formatSampleScore();
}

function showPop() {
  if (!locationName || !cheeseName) {
    document.getElementById("results").innerHTML = "";
    $("#pleaseWaitMessage").hide();
    return;
  } else {
    charmChanged();
    var selectedCharm = $("#charm").val();
    selectedCharm =
      selectedCharm.indexOf("*") > -1
        ? (selectedCharm = selectedCharm.slice(0, -7))
        : (selectedCharm = selectedCharm.slice(0, -6));
    var population = getPopulation(selectedCharm);
    console.group("Calculation Details");
    printCombinations(population, getHeader(population));
    console.groupEnd();
  }

  /**
   * Build the results table header
   * @param population
   * @return {string}
   */
  function getHeader(population) {
    var resultsHeader = "<thead><tr><th align='left'>Trap Setup</th>";
    for (var mouseName in population) {
      resultsHeader += "<th data-filter='false'>" + mouseName + "</th>";
    }
    resultsHeader += "<th id='overallHeader' data-filter='false'>Overall</th>";
    if (rank) {
      resultsHeader +=
        "<th data-filter='false' title='Rank progress per 100 hunts'>Rank</th>";
    }
    resultsHeader += "</tr></thead>";
    return resultsHeader;
  }
}

/**
 * Get mouse population for current location/phase/cheese and the selected charm
 * @param {string} selectedCharm
 * @return Mouse population object (name -> AR)
 */
function getPopulation(selectedCharm) {
  var popArrayLPC = popArray[locationName][phaseName][cheeseName];
  var charmObj = popArrayLPC[selectedCharm]
    ? popArrayLPC[selectedCharm]
    : popArrayLPC["-"];
  var returnObj = {};

  // Trim the extra "SampleSize" element
  delete charmObj["SampleSize"];

  // Handle dynamic mouse name conversion
  Object.keys(charmObj).forEach(function(mouse) {
    var dynMouse = dynamicMouseRename(mouse);
    returnObj[dynMouse] = charmObj[mouse];
  });

  // Generate placeholder Event ARs (simply 100% / number of mice)
  if (locationName === "Event") {
    var evenAR = 100 / Object.keys(returnObj).length;
    Object.keys(returnObj).forEach(function(mouse) {
      returnObj[mouse] = evenAR;
    });
  }

  return returnObj;
}

/**
 * Builds associative array of chosen power type's effectiveness against the mice population
 * @param micePopulation
 * @return {{string: number}} Object with Mouse : Effectiveness
 */
function buildEffectivenessArray(micePopulation) {
  var eff = {};
  for (var mouse in micePopulation) {
    eff[mouse] = findEff(mouse);
  }
  return eff;
}

/**
 * Builds associative array of mouse powers from current micePopulation
 * @param micePopulation
 * @return {{string: number}} -  Object with Mouse : Power
 */
function buildPowersArray(micePopulation) {
  var power = {};
  for (var mouse in micePopulation) {
    power[mouse] = powersArray[mouse][0];
  }
  return power;
}

// sample: [{catches: [0.5, 0.4], rank: 0.001, link: "url", cr: 0.9}, {}, etc]
var unsortedOverallCR = [];

/**
 * Build an array of objects for faster sorting
 * Used in printCombinations
 * @param micePopulation
 * @param powersArray Array of location's mouse power values
 * @param {array} mpKeys micePopulation object keys
 * @param {number} mpLen Length of mpKeys
 * @param {string} selectedCharm Current charm for CRE link generation
 * @param {string} headerHtml
 */
function buildOverallCR(
  micePopulation,
  powersArray,
  mpKeys,
  mpLen,
  selectedCharm,
  headerHtml
) {
  var overallAR = getCheeseAttraction();
  var effArray = buildEffectivenessArray(micePopulation);
  var overallCR = 0;
  var overallProgress = 0;
  var fullRow = {};
  fullRow["catches"] = [];
  var i = mpLen;
  while (i--) {
    var mouse = mpKeys[mpLen - i - 1];
    var catches = getMouseCatches(
      micePopulation,
      mouse,
      overallAR,
      effArray,
      powersArray
    );
    overallCR += catches;
    fullRow["catches"].push(catches);
    if (rank) {
      // handle missing data
      if (mouseWisdom[mouse]) {
        overallProgress += (mouseWisdom[mouse] / rankupDiff[rank]) * catches;
      }
    }
  }
  fullRow["rank"] = overallProgress;
  fullRow["link"] = getLinkCell(
    selectedCharm,
    weaponName,
    baseName,
    headerHtml
  );
  fullRow["cr"] = overallCR;
  unsortedOverallCR.push(fullRow);
}

/**
 * Build mouse population <td> elements for each row
 * Used in printCharmCombinations
 * @param micePopulation
 * @return {string}
 */
function buildMiceCRCells(micePopulation) {
  var overallCR = 0;
  var overallProgress = 0;
  var overallAR = getCheeseAttraction();
  var effectivenessArray = buildEffectivenessArray(micePopulation);
  var powersArray = buildPowersArray(micePopulation);
  var html = "";

  for (var mouse in micePopulation) {
    var catches = getMouseCatches(
      micePopulation,
      mouse,
      overallAR,
      effectivenessArray,
      powersArray
    );
    overallCR += catches;
    if (rank) {
      // handle missing data
      if (mouseWisdom[mouse]) {
        overallProgress += (mouseWisdom[mouse] / rankupDiff[rank]) * catches;
      }
    }
    html += "<td align='center'>" + catches.toFixed(2) + "</td>";
  }

  html += "<td align='center'>" + overallCR.toFixed(2) + "</td>";
  if (rank) {
    // numbers are usually 0.00##% per hunt, but per 100 hunts is consistent with values shown
    html +=
      "<td align='center'>" + (overallProgress * 100).toFixed(2) + "%</td>";
  }
  return html;
}

/**
 * Prints weapon/base combinations for user input
 * @param micePopulation
 * @param headerHtml
 */
function printCombinations(micePopulation, headerHtml) {
  var weaponSelectors = getSelectors("weapon");
  var baseSelectors = getSelectors("base");
  var selectedCharm = document.getElementById("charm").value;
  var tableHTML = headerHtml + "<tbody>";
  charmName = selectedCharm;

  console.log(
    "Weapons: " +
      $(weaponSelectors.checkbox + ":checked").length +
      " / Bases: " +
      $(baseSelectors.checkbox + ":checked").length +
      " / Mice: " +
      Object.keys(micePopulation).length
  );

  var powersArray = buildPowersArray(micePopulation);
  var mousePopKeys = Object.keys(micePopulation);
  var mousePopLength = mousePopKeys.length;
  unsortedOverallCR = [];

  console.time("weapon & base $.each() loop");
  $(weaponSelectors.checkbox + ":checked").each(function(index, weaponElement) {
    weaponName = weaponElement.value;
    weaponChanged();

    $(baseSelectors.checkbox + ":checked").each(function(index, baseElement) {
      baseName = baseElement.value;

      // Skip Denture Base variants if filter is checked
      var isDentureFiltered = localStorage.getItem("best-setup-denture-filter");
      if (isDentureFiltered === "true" && baseName.indexOf("Denture") >= 0) {
        return true;
      }

      baseChanged();
      buildOverallCR(
        micePopulation,
        powersArray,
        mousePopKeys,
        mousePopLength,
        selectedCharm,
        headerHtml
      );
    });
  });
  console.timeEnd("weapon & base $.each() loop");

  // Sort in place based on greater overall catch rate
  unsortedOverallCR.sort(function(a, b) {
    return b["cr"] - a["cr"];
  });

  // Grab user defined number of rows to pass into tablesorter
  var rowIterations = $("input[name=rowLimit]:checked").val();
  if (rowIterations === "All" || rowIterations > unsortedOverallCR.length) {
    rowIterations = unsortedOverallCR.length;
  }

  // Concatenate into single HTML string
  for (var i = 0; i < rowIterations; i++) {
    var obj = unsortedOverallCR[i];
    tableHTML += "<tr>" + obj["link"];
    for (var j = 0; j < obj["catches"].length; j++) {
      tableHTML +=
        "<td align='center'>" + obj["catches"][j].toFixed(2) + "</td>";
    }
    tableHTML += "<td align='center'>" + obj["cr"].toFixed(2) + "</td>";
    if (rank) {
      // numbers are usually 0.00##% per hunt, but per 100 hunts is consistent with values shown
      tableHTML +=
        "<td align='center'>" + (obj["rank"] * 100).toFixed(2) + "%</td>";
    }
  }
  $("#results").html(tableHTML);

  console.time("tablesorter update trigger");
  var resort = true;
  var callback = function() {
    var header = $("#overallHeader");
    if (header.hasClass("tablesorter-headerAsc")) {
      header.click();
      header.click();
    } else if (header.hasClass("tablesorter-headerUnSorted")) {
      header.click();
    }
  };
  $("#results").trigger("updateAll", [resort, callback]);
  console.timeEnd("tablesorter update trigger");
}

/**
 * String concatenation for CRE setup link and 'Find best charm' button handler
 * @param {string} selectedCharm
 * @param {string} weaponName
 * @param {string} baseName
 * @return {string}
 */
function getLinkCell(selectedCharm, weaponName, baseName, headerHtml) {
  var cell = "</td><td>" + getCRELinkElement();

  // prettier-ignore
  if (selectedCharm === "No Charm") {
    cell += '<span style="float: right"><button onclick="weaponName=\''
    + weaponName.replace(/'/g, "\\'")
    + '\';baseName=\''
    + baseName.replace(/'/g, "\\'")
    + '\';weaponChanged();baseChanged();printCharmCombinations(getPopulation(EMPTY_SELECTION), \''
    + headerHtml.replace(/'/g, "\\'")
    + '\')">Find best charm</button></span>';
  }

  return cell;
}

/**
 * Creates <a> tag for the CRE link
 * @return {string}
 */
function getCRELinkElement() {
  var urlString = buildCRELink();
  var caption = weaponName + " / " + baseName;
  if (charmName && charmName !== "No Charm") {
    charmName = charmName.trim().replace(/\*$/, "");
    caption += " / " + charmName;
  }
  return (
    "<a href='" +
    urlString +
    "' target='_blank' rel='noopener'>" +
    caption +
    "</a>"
  );

  /**
   * Builds the actual url with parameter to the CRE page
   * @return {string}
   */
  function buildCRELink() {
    var urlParams = {
      location: locationName,
      phase: phaseName,
      cheese: cheeseName,
      charm: charmName,
      empowered: isEmpowered,
      battery: batteryPower,
      gs: !gsLuck,
      bonusPower: bonusPower,
      bonusLuck: bonusLuck,
      riftstalker: riftStalkerCodex,
      weapon: weaponName,
      base: baseName,
      ballistaLevel: fortRox.ballistaLevel,
      cannonLevel: fortRox.cannonLevel,
      saltLevel: saltLevel,
      rank: rank,
      amplifier: ztAmp,
      vrFloorType: document.querySelector("#vrFloorType").selectedIndex
    };
    var urlString = buildURL("cre.html", urlParams);
    urlString = urlString.replace(/'/g, "%27");
    return urlString;
  }
}

/**
 * Gets mouse attraction and catch rate
 * @param {{string: number}} micePopulation Mouse population percentages for the current location
 * @param {string} mouseName Mouse name
 * @param {number} overallAR Setup attraction rate
 * @param {{string: number}} effectivenessArray Power type effectiveness array
 * @param {{string: number}} powersArray Mouse powers array
 * @return {{attractions: number, catchRate: number}}
 */
function getMouseACR(
  micePopulation,
  mouseName,
  overallAR,
  effectivenessArray,
  powersArray
) {
  var attractions = micePopulation[mouseName] * overallAR;
  var mousePower = powersArray[mouseName];
  var trapEffectiveness = effectivenessArray[mouseName];

  if (locationName === "Fort Rox") {
    if (
      (contains(wereMice, mouseName) && fortRox.ballistaLevel >= 1) ||
      (contains(cosmicCritters, mouseName) && fortRox.cannonLevel >= 1)
    ) {
      mousePower /= 2;
    }
  }

  calculateTrapSetup();
  var catchRate = calcCR(trapEffectiveness, trapPower, trapLuck, mousePower);
  return {
    attractions: attractions,
    catchRate: catchRate,
    eff: trapEffectiveness,
    mousePower: mousePower
  };
}

/**
 * Gets the number of catches per 100 hunts
 * @param micePopulation
 * @param {string} mouse Mouse name
 * @param {number} overallAR Setup attraction rate
 * @param {{string: number}} effectivenessArray
 * @param {{string: number}} powersArray
 * @return {number} Mouse catches in 100 hunts
 */
function getMouseCatches(
  micePopulation,
  mouse,
  overallAR,
  effectivenessArray,
  powersArray
) {
  var mouseACDetails = getMouseACR(
    micePopulation,
    mouse,
    overallAR,
    effectivenessArray,
    powersArray
  );
  var attractions = mouseACDetails.attractions;
  var catchRate = mouseACDetails.catchRate;
  catchRate = calcCREffects(
    catchRate,
    mouse,
    mouseACDetails.eff,
    mouseACDetails.mousePower
  );
  catchRate = calcCRMods(catchRate, mouse);

  return attractions * catchRate;
}

/**
 * Print result of 'Find best charm'
 * Compare different charms with a specific weapon and base setup
 * @param micePopulation
 * @param {string} headerHTML
 */
function printCharmCombinations(micePopulation, headerHTML) {
  var charmSelectors = getSelectors("charm");
  var tableHTML = headerHTML + "<tbody>";

  $(charmSelectors.checkbox + ":checked").each(function(index, element) {
    charmChanged(element.value);
    tableHTML +=
      "<tr><td>" +
      getCRELinkElement() +
      "</td>" +
      buildMiceCRCells(micePopulation);
  });
  $("#results").html(tableHTML);

  var resort = true;
  var callback = function() {
    var header = $("#overallHeader");
    if (
      header.hasClass("tablesorter-headerAsc") ||
      header.hasClass("tablesorter-headerUnSorted")
    ) {
      header.click();
    }
  };
  $("#results").trigger("updateAll", [resort, callback]);
}
