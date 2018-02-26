"use strict";

var POPULATION_JSON_URL = "data/populations-setup.json";

$(window).load(function() {
  var bonusLuckParameter, loaded;
  user = SETUP_USER;

  loadBookmarkletFromJS(
    BOOKMARKLET_LOADER_URL,
    "bookmarkletLoader",
    "#bookmarkletloader"
  );

  loadBookmarkletFromJS(
    SETUP_BOOKMARKLET_URL,
    "setupBookmarklet",
    "#bookmarklet",
    loadAlternateBookmarklets
  );

  function loadAlternateBookmarklets(data) {
    var slow = makeBookmarkletString(data.replace(/=500/g, "=2500"));
    $("#slowBookmarklet").attr("href", slow);
    var slower = makeBookmarkletString(data.replace(/=500/g, "=6000"));
    $("#evenslowerBookmarklet").attr("href", slower);
  }

  loadItemSelection(weaponKeys, "weapon");
  loadItemSelection(baseKeys, "base");
  loadItemSelection(charmKeys, "charm");

  loaded = loadURLData();
  if (!loaded) {
    checkCookies();
    startPopulationLoad(POPULATION_JSON_URL);
    $("#main").show();
  }
  gsParamCheck();
  riftstalkerParamCheck();
  fortRoxParamCheck();
  rankParamCheck();

  bonusLuckParameter = parseInt(getURLParameter("bonusLuck"));
  if (bonusLuckParameter >= 0) {
    document.querySelector("#bonusLuck").value = bonusLuckParameter;
    bonusLuckChanged();
  }

  showHideWidgets();

  document.querySelector("#location").onchange = locationChanged;
  document.querySelector("#phase").onchange = phaseChanged;
  document.querySelector("#cheese").onchange = cheeseChanged;
  document.querySelector("#charm").onchange = charmChanged;
  document.querySelector("#toxic").onchange = toxicChanged;
  document.querySelector("#battery").onchange = batteryChanged;
  document.querySelector("#gs").onchange = gsChanged;
  document.querySelector("#bonusLuck").onchange = bonusLuckChanged;
  document.querySelector("#ballistaLevel").onchange = genericOnChange;
  document.querySelector("#cannonLevel").onchange = genericOnChange;
  document.querySelector("#riftstalker").onchange = riftstalkerChange;
  document.querySelector("#rank").onchange = rankChange;

  $("#save_setup_button").click(saveSetupCookie);

  $("#show_pop_button").click(function() {
    $("#pleaseWaitMessage").show();
    setTimeout(showPop, 1);
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
   * Toggle weapon/charm/base selector
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
});

function checkLoadState() {
  var batteryParameter;
  var loadPercentage = (popLoaded + wisdomLoaded) / 2 * 100;
  var status = document.querySelector("#status");
  status.innerHTML = "<td>Loaded " + loadPercentage + "%...</td>";

  if (loadPercentage === 100) {
    loadLocationDropdown();
    checkToxicParam();
    getSliderValue();

    batteryParameter = getURLParameter("battery");
    if (batteryParameter != NULL_URL_PARAM) {
      document.querySelector("#battery").value = parseInt(batteryParameter);
    }

    status.innerHTML = "<td>All set!</td>";
    setTimeout(function() {
      status.innerHTML = "<td><br></td>";
    }, 3000);
  }
}

/**
 * Get jQuery selectors for a specific type
 * @param {string} type 'weapon', 'base' or 'charm'
 * @returns {{checkbox: string, container: string, allCheckbox: string}}
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
 * Populates item checkboxes
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
   * @returns {jQuery}
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
 * Check and load cookies and localstorage
 */
function checkCookies() {
  var storedData = JSON.parse(localStorage.getItem("setupData"));
  var cookie = Cookies.get("setup");
  if (storedData) {
    processStoredData(storedData);
  } else if (cookie) {
    loadOwnedCookie(cookie);
  }

  function selectCheckboxes(savedItems, type) {
    var selectors = getSelectors(type);
    var i;
    $(selectors.allCheckbox).prop("checked", false);
    for (i = 0; i < savedItems.length; i++) {
      $(selectors.checkbox).get(i).checked = savedItems[i];
    }
  }

  function loadOwnedCookie(setupCookie) {
    var savedSetup = JSON.parse(setupCookie);
    var savedWeapons = savedSetup["weapons"] || [];
    var savedBases = savedSetup["bases"] || [];
    var savedCharms = savedSetup["charms"] || [];

    if (
      savedWeapons.length !== weaponKeys.length ||
      savedBases.length !== baseKeys.length ||
      savedCharms.length !== charmKeys.length
    ) {
      window.alert(
        "New items have been added. Please re-tick what you own, or use the bookmarklet. Sorry for any inconvenience!"
      );
      Cookies.remove("setup");
    } else {
      if (contains(savedWeapons, 0)) {
        selectCheckboxes(savedWeapons, "weapon");
      }

      if (contains(savedBases, 0)) {
        selectCheckboxes(savedBases, "base");
      }

      if (contains(savedCharms, 0)) {
        selectCheckboxes(savedCharms, "charm");
      }
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
    var ownedBases = storedData["bases"];
    var ownedWeapons = storedData["weapons"];
    var ownedCharms = storedData["charms"];

    console.log("Bases loaded: " + ownedBases.length);
    console.log("Weapons loaded: " + ownedWeapons.length);
    console.log("Charms loaded: " + ownedCharms.length);

    if (ownedBases && ownedBases.length > 0) {
      processStorageArray(baseKeys, ownedBases, "base");
    }
    if (ownedWeapons && ownedWeapons.length > 0) {
      if (ownedWeapons.indexOf("Isle Idol Trap") > 0) {
        ownedWeapons.push("Isle Idol Hydroplane Skin");
        ownedWeapons.push("Isle Idol Stakeshooter Skin");
      }

      processStorageArray(weaponKeys, ownedWeapons, "weapon");
    }
    if (ownedCharms && ownedCharms.length > 0) {
      processStorageArray(charmKeys, ownedCharms, "charm");
    }
    localStorage.removeItem("setupData");
    saveSetupCookie();
  }
}

/**
 * Load bookmarklet data from URL
 * @returns {boolean} Indicates whether any data was loaded
 */
function loadURLData() {
  var urlBases = getDataFromURL(window.location.search.match(/bases=([^&]*)/));
  var urlWeapons = getDataFromURL(
    window.location.search.match(/weapons=([^&]*)/)
  );
  var urlCharms = getDataFromURL(
    window.location.search.match(/charms=([^&]*)/)
  );

  if (
    urlBases.length === 0 &&
    urlWeapons.length === 0 &&
    urlCharms.length === 0
  ) {
    return false;
  } else {
    if (urlBases.length > 0) {
      processUrlData(urlBases, "bases");
    }
    if (urlWeapons.length > 0) {
      processUrlData(urlWeapons, "weapons");
    }
    if (urlCharms.length > 0) {
      processUrlData(urlCharms, "charms");
    }
    return true;
  }

  function getDataFromURL(parameters) {
    if (parameters) {
      return decodeURIComponent(parameters[1]).split("/");
    } else {
      return [];
    }
  }

  function processUrlData(urlItemArray, type) {
    var storedData = localStorage.getItem("setupData");
    var dataObject = JSON.parse(storedData) || {};
    var dataLen = urlItemArray.length - 1;
    var ownedItemArray = dataObject[type] || [];
    var i, itemName;

    for (i = 0; i < dataLen; i++) {
      itemName = urlItemArray[i];
      if (ownedItemArray.indexOf(itemName) < 0) {
        ownedItemArray.push(itemName);
      }
    }

    dataObject[type] = ownedItemArray;

    localStorage.setItem("setupData", JSON.stringify(dataObject));
    window.location.replace("setupwaiting.html");
  }
}

/**
 * Saves selected weapons, bases and charms to a cookie
 */
function saveSetupCookie() {
  var checkedWeapons = getCookieArray(getSelectors("weapon").checkbox);
  var checkedBases = getCookieArray(getSelectors("base").checkbox);
  var checkedCharms = getCookieArray(getSelectors("charm").checkbox);

  var cvalue = {
    weapons: checkedWeapons,
    bases: checkedBases,
    charms: checkedCharms
  };

  Cookies.set("setup", cvalue, {
    expires: 365
  });

  /**
   * Builds array of 1's and 0's from selected checkboxes
   * @param {string} selector
   * @returns {number[]}
   */
  function getCookieArray(selector) {
    return $(selector)
      .map(function() {
        return Number($(this).prop("checked"));
      })
      .toArray();
  }
}

/**
 * Loads the cheese dropdown menu
 */
function loadCheeseDropdown(location, phase) {
  var cheeseDropdown = document.querySelector("#cheese");
  var cheeseDropdownHTML = "";

  var insertedCheeses = [];

  function addCheeseOption(insertedCheeses, cheeseName, cheeseDropdownHTML) {
    if (!contains(insertedCheeses, cheeseName)) {
      cheeseDropdownHTML += "<option>" + cheeseName + "</option>\n";
      insertedCheeses.push(cheeseName);
    }
    return cheeseDropdownHTML;
  }

  function splitCheeseOption(option) {
    var optionArray = option.split("/");
    for (var j = 0; j < Object.size(optionArray); j++) {
      cheeseDropdownHTML = addCheeseOption(
        insertedCheeses,
        optionArray[j],
        cheeseDropdownHTML
      );
    }
  }

  for (var cheeseOption in popArray[location][phase]) {
    if (cheeseOption.indexOf("/") < 0 || contains(cheeseOption, "Combat")) {
      //Todo: Fix this master cheese thingy
      cheeseDropdownHTML = addCheeseOption(
        insertedCheeses,
        cheeseOption,
        cheeseDropdownHTML
      );
    } else {
      splitCheeseOption(cheeseOption);
    }
  }

  cheeseDropdown.innerHTML = cheeseDropdownHTML;
  cheeseDropdown.selectedIndex = 0;

  var select = document.querySelector("#cheese");
  var cheeseParameter = getURLParameter("cheese");
  if (cheeseParameter !== NULL_URL_PARAM) {
    select.value = cheeseParameter;
  }
  if (select.selectedIndex === -1) {
    select.selectedIndex = 0;
  }

  cheeseChanged();
}

function loadCharmDropdown(location, phase, cheese) {
  /**
   * Population array for Location-Phase-Cheese
   */
  var popArrayLPC = popArray[location][phase][cheese];

  function fillPopArray(searchCheese) {
    var popArrayLP;
    if (!popArrayLPC) {
      popArrayLP = popArray[location][phase];
      // Search through popArrayLP for cheese matching currently armed cheese
      // TODO: Improve
      for (var popcheese in popArrayLP) {
        if (contains(popcheese, searchCheese)) {
          popArrayLPC = popArray[location][phase][searchCheese];
        }
      }
    }
  }

  function populateDropdown(items, selector) {
    var dropdown = $(selector).html("<option>-</option>");
    if (items) {
      for (var i = 0; i < items.length; i++) {
        if (items[i] != EMPTY_SELECTION) {
          $("<option/>", {
            text: items[i],
            value: items[i]
          }).appendTo(dropdown);
        }
      }
    }
  }

  fillPopArray(cheese);

  var charms;
  if (popArrayLPC) {
    charms = Object.keys(popArrayLPC);
    charms.sort();
  }
  populateDropdown(charms, "#charm");

  var charmParameter = getURLParameter("charm");
  var select = document.querySelector("#charm");
  if (charmParameter != NULL_URL_PARAM) {
    select.value = charmParameter;
  }
  if (select.selectedIndex == -1) {
    select.selectedIndex = 0;
  }
  charmChanged();
}

function updateLink() {
  var select = document.querySelector("#charm");
  var selectedCharm = select.value;

  var urlParams = {
    location: locationName,
    phase: phaseName,
    cheese: cheeseName,
    charm: selectedCharm,
    toxic: isToxic,
    battery: batteryPower,
    gs: !gsLuck,
    bonusLuck: bonusLuck,
    tourney: tournamentName,
    riftstalker: riftStalkerCodex,
    ballistaLevel: fortRox.ballistaLevel,
    cannonLevel: fortRox.cannonLevel,
    rank: rank,
    amplifier: ztAmp
  };

  var urlString = buildURL("setup.html", urlParams);
  document.querySelector("#link").href = urlString;

  ga("send", "event", "link", "updated", urlString);
}

function weaponChanged() {
  populateWeaponData(weaponName);
  calculateTrapSetup();
}

function cheeseChanged() {
  cheeseName = document.querySelector("#cheese").value;
  updateLink();
  checkToxicWidget();
  loadCharmDropdown(locationName, phaseName, cheeseName);
}

function baseChanged() {
  //Bases with special effects when paired with particular charm
  if (specialCharm[baseName]) {
    calcSpecialCharms(charmName);
  } else {
    populateCharmData(charmName);
  }

  populateBaseData(baseName);
  calculateTrapSetup();
}

function charmChanged(customValue) {
  var selectedVal = $("#charm").val();
  if (selectedVal !== EMPTY_SELECTION) {
    selectedVal += " Charm";
  }
  charmChangeCommon(customValue || selectedVal);
  calculateTrapSetup();
}

function showPop() {
  if (!locationName || !cheeseName) {
    document.querySelector("#results").innerHTML = "";
    $("#pleaseWaitMessage").hide();
    return;
  } else {
    charmChanged();
    $("#pleaseWaitMessage").show();
    var selectedCharm = $("#charm").val();
    var population = getPopulation(selectedCharm);
    printCombinations(population, getHeader(population));
  }

  /**
   * Build the results table header
   * @param population
   * @return {string}
   */
  function getHeader(population) {
    var resultsHeader = "<thead><tr><th align='left'>Setup</th>";
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
 * @return Mouse Populations
 */
function getPopulation(selectedCharm) {
  var popArrayLPC = popArray[locationName][phaseName][cheeseName];
  if (!popArrayLPC) {
    popArrayLPC = checkPopArray();
  }
  return popArrayLPC[selectedCharm];

  /**
   * Handle cases where cheese names bundled together with '/' between
   * @return Charm Populations
   */
  function checkPopArray() {
    var popArrayL = popArray[locationName][phaseName];
    var cheeseNameKeys = Object.keys(popArrayL);
    var popArrayLLength = Object.size(popArray[locationName][phaseName]);
    var commonCheeseIndex;
    for (var i = 0; i < popArrayLLength; i++) {
      if (
        cheeseNameKeys[i].indexOf(cheeseName) >= 0 &&
        cheeseNameKeys[i].indexOf("/") >= 0
      ) {
        commonCheeseIndex = cheeseNameKeys[i];
        break;
      }
    }
    return popArray[locationName][phaseName][commonCheeseIndex];
  }
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

/**
 * Build mouse population <td> elements for a setup row
 * @param micePopulation
 * @return {string}
 */
function buildMiceCRCells(micePopulation) {
  var overallCR = 0;
  var overallAR = getCheeseAttraction();
  var overallProgress = 0;
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
        overallProgress += mouseWisdom[mouse] / rankupDiff[rank] * catches;
      }
    }
    html += "<td align='right'>" + catches.toFixed(2) + "</td>";
  }

  html += "<td align='right'>" + overallCR.toFixed(2) + "</td>";
  if (rank) {
    // numbers are usually 0.00##% per hunt, but per 100 hunts is consistent with values shown
    html += "<td>" + (overallProgress * 100).toFixed(2) + "%</td>";
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
  var selectedCharm = document.querySelector("#charm").value;

  var results = $("#results").html(headerHtml);
  var tableHTML = $("<tbody>").appendTo(results);

  charmName = selectedCharm;

  $(weaponSelectors.checkbox + ":checked").each(function(index, weaponElement) {
    weaponName = weaponElement.value;
    weaponChanged(weaponElement.value);

    $(baseSelectors.checkbox + ":checked").each(function(index, baseElement) {
      var rowData = {
        weapon: weaponElement.value,
        base: baseElement.value
      };

      baseName = baseElement.value;
      baseChanged(baseElement.value);

      $("<tr>")
        .append(getLinkCell(selectedCharm, rowData))
        .append(buildMiceCRCells(micePopulation))
        .appendTo(tableHTML);
    });
  });

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

  /**
   * Get <td> jQuery element for the CRE link
   * @param {string} selectedCharm
   * @param {object} eventData Data to pass to the 'Find best charm' event listener
   * @return {jQuery}
   */
  function getLinkCell(selectedCharm, eventData) {
    var cell = $("<td/>").append(getCRELinkElement());

    if (selectedCharm === EMPTY_SELECTION) {
      $(
        "<span style='float: right'><button class='best-charm'>Find best charm</button></span>"
      )
        .on("click", eventData, findBestCharm)
        .appendTo(cell);
    }

    return cell;
  }

  function findBestCharm(event) {
    weaponName = event.data.weapon;
    baseName = event.data.base;
    weaponChanged();
    baseChanged();
    printCharmCombinations(getPopulation(EMPTY_SELECTION), headerHtml);
  }
}

/**
 * Creates <a> tag for the CRE link
 * @return {string}
 */
function getCRELinkElement() {
  var urlString = buildCRELink();
  var caption = weaponName + " / " + baseName;
  if (charmName && charmName != EMPTY_SELECTION) {
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
      gs: !gsLuck,
      bonusLuck: bonusLuck,
      weapon: weaponName,
      base: baseName,
      toxic: isToxic,
      battery: batteryPower,
      riftstalker: riftStalkerCodex,
      ballistaLevel: fortRox.ballistaLevel,
      cannonLevel: fortRox.cannonLevel,
      rank: rank,
      amplifier: ztAmp
    };
    var urlString = buildURL("cre.html", urlParams);
    urlString = urlString.replace(/'/g, "%27"); //TODO: Verify necessity
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

  if (contains(mouseName, "Rook") && charmName === "Rook Crumble Charm") {
    charmBonus += 300;
  }
  if (locationName === "Fort Rox") {
    if (
      (contains(wereMice, mouseName) && fortRox.ballistaLevel >= 1) ||
      (contains(cosmicCritters, mouseName) && fortRox.cannonLevel >= 1)
    ) {
      mousePower /= 2;
    }
  }
  if (contains(dragons, mouseName) && charmName === "Dragonbane Charm") {
    charmBonus += 300;
  }

  if (locationName === "Fiery Warpath") {
    if (charmName.indexOf("Super Warpath Archer Charm") >= 0) {
      var warpathArcher = ["Desert Archer", "Flame Archer", "Crimson Ranger"];
      if (contains(warpathArcher, mouseName)) {
        charmBonus += 50;
      }
    } else if (charmName.indexOf("Super Warpath Warrior Charm") >= 0) {
      var warpathWarrior = ["Desert Soldier", "Flame Warrior", "Crimson Titan"];
      if (contains(warpathWarrior, mouseName)) {
        charmBonus += 50;
      }
    } else if (charmName.indexOf("Super Warpath Scout Charm") >= 0) {
      var warpathScout = ["Vanguard", "Sentinel", "Crimson Watch"];
      if (contains(warpathScout, mouseName)) {
        charmBonus += 50;
      }
    } else if (charmName.indexOf("Super Warpath Cavalry Charm") >= 0) {
      var warpathCavalry = ["Sand Cavalry", "Sandwing Cavalry"];
      if (contains(warpathCavalry, mouseName)) {
        charmBonus += 50;
      }
    } else if (charmName.indexOf("Super Warpath Mage Charm") >= 0) {
      var warpathMage = ["Inferno Mage", "Magmarage"];
      if (contains(warpathMage, mouseName)) {
        charmBonus += 50;
      }
    } else if (charmName.indexOf("Super Warpath Commander's Charm") >= 0) {
      if (mouseName === "Crimson Commander") {
        charmBonus += 50;
      }
    }
  }

  calculateTrapSetup();

  var catchRate = calcCR(trapEffectiveness, trapPower, trapLuck, mousePower);

  if (
    locationName === "Zugzwang's Tower" ||
    locationName === "Seasonal Garden"
  ) {
    if (ztAmp > 0 && weaponName === "Zugzwang's Ultimate Move") {
      catchRate += (1 - catchRate) / 2;
    }
  } else if (locationName === "Fort Rox") {
    if (
      (contains(wereMice, mouseName) && fortRox.ballistaLevel >= 2) ||
      (contains(cosmicCritters, mouseName) && fortRox.cannonLevel >= 2)
    ) {
      catchRate += (1 - catchRate) / 2;
    }
  }

  if (
    (fortRox.cannonLevel >= 3 && mouseName === "Nightfire") ||
    (fortRox.ballistaLevel >= 3 && mouseName === "Nightmancer")
  ) {
    catchRate = 1;
  }

  if (contains(mouseName, "Rook") && charmName === "Rook Crumble Charm") {
    charmBonus -= 300;
  }

  calculateTrapSetup();

  return { attractions: attractions, catchRate: catchRate };
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

  //Exceptions, final modifications to catch rates
  if (charmName == "Ultimate Charm") catchRate = 1;
  else if (
    locationName == "Sunken City" &&
    charmName == "Ultimate Anchor Charm" &&
    phaseName != "Docked"
  )
    catchRate = 1;
  else if (mouse == "Bounty Hunter" && charmName == "Sheriff's Badge Charm")
    catchRate = 1;
  else if (mouse == "Zurreal the Eternal" && weaponName != "Zurreal's Folly")
    catchRate = 0;

  return attractions * catchRate;
}

/**
 * Print result of best charm. (Different charms with specific weapon, base)
 * @param micePopulation
 * @param {string} headerHTML
 */
function printCharmCombinations(micePopulation, headerHTML) {
  var tableHTML = $("<tbody>");
  var results = $("#results").html([headerHTML, tableHTML]);
  var charmSelectors = getSelectors("charm");

  $(charmSelectors.checkbox + ":checked").each(function(index, element) {
    charmChanged(element.value);
    tableHTML.append(
      "<tr><td>" +
        getCRELinkElement() +
        "</td>" +
        buildMiceCRCells(micePopulation)
    );
  });

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
