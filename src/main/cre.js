"use strict";

window.onload = function() {
  user = CRE_USER;

  loadBookmarkletFromJS(
    BOOKMARKLET_LOADER_URL,
    "bookmarkletLoader",
    "#bookmarkletloader"
  );
  loadBookmarkletFromJS(CRE_BOOKMARKLET_URL, "creBookmarklet", "#bookmarklet");

  startPopulationLoad("data/json/populations-cre-setup.json", user);
  loadDropdown("weapon", weaponKeys, weaponChanged, "<option></option>");
  loadDropdown("base", baseKeys, baseChanged, "<option></option>");
  loadCharmDropdown();

  showHideWidgets(isCustom());

  // Listen for changes in dropdowns or textboxes
  document.getElementById("toggleCustom").onchange = function() {
    var toggle = document.getElementById("toggleCustom");
    if (toggle.checked) {
      $(".input-standard").hide();
      $(".input-custom").show(500);
      $("#trapPowerType").val(trapType);
      $("#trapPowerValue").val(trapPower);
      $("#trapLuckValue").val(trapLuck);
      $("#trapAttractionValue").val(trapAtt);
      $("#trapEffect").val(trapEff);
      $("#bonusPower").val("0");
      bonusPower = 0;
      $("#bonusLuck").val("0");
      bonusLuck = 0;
      batteryPower = 0;
      ztAmp = 100;
      updateCustomSetup();
    } else {
      $(".input-custom").hide();
      $(".input-standard").show(500);
      calculateTrapSetup();
    }
    showHideWidgets(toggle.checked);
  };

  document.getElementById("trapPowerType").onchange = updateCustomSetup;
  document.getElementById("trapPowerValue").onchange = updateCustomSetup;
  document.getElementById("trapLuckValue").onchange = updateCustomSetup;
  document.getElementById("trapAttractionValue").onchange = updateCustomSetup;
  document.getElementById("trapEffect").onchange = updateCustomSetup;
  document.getElementById("location").onchange = locationChanged;
  document.getElementById("phase").onchange = phaseChanged;
  document.getElementById("cheese").onchange = cheeseChanged;
  document.getElementById("oil").onchange = oilChanged;
  document.getElementById("empowered").onchange = empoweredChanged;
  document.getElementById("battery").onchange = batteryChanged;
  document.getElementById("weapon").onchange = weaponChanged;
  document.getElementById("base").onchange = baseChanged;
  document.getElementById("charm").onchange = charmChanged;
  document.getElementById("gs").onchange = gsChanged;
  document.getElementById("bonusPower").onchange = bonusPowerChanged;
  document.getElementById("bonusLuck").onchange = bonusLuckChanged;
  document.getElementById("tourney").onchange = tourneyChanged;
  document.getElementById("ballistaLevel").onchange = genericOnChange;
  document.getElementById("cannonLevel").onchange = genericOnChange;
  document.getElementById("riftstalker").onchange = riftstalkerChange;
  document.getElementById("rank").onchange = rankChange;

  document.getElementById("cheeseCost").onchange = function() {
    cheeseCost = parseInt(document.getElementById("cheeseCost").value);
    showPop(2);
  };

  // Send clicked link to setup to Google Analytics
  document.getElementById("link").onclick = function() {
    ga("send", "event", "setup link", "click");
  };
};

function loadCharmDropdown() {
  loadDropdown("charm", charmKeys, charmChanged, "<option>No Charm</option>");
}

function isCustom() {
  return document.getElementById("toggleCustom").checked;
}

function updateCustomSetup() {
  var type = document.getElementById("trapPowerType").value;
  var power = document.getElementById("trapPowerValue").value;
  var luck = document.getElementById("trapLuckValue").value;
  var attraction = document.getElementById("trapAttractionValue").value;
  var effect = document.getElementById("trapEffect").value;
  if (power < 0) {
    power = 0;
    document.getElementById("trapPowerValue").value = 0;
  }
  if (luck < 0) {
    luck = 0;
    document.getElementById("trapLuckValue").value = 0;
  }
  if (attraction > 100) {
    attraction = 100;
    document.getElementById("trapAttractionValue").value = 100;
  } else if (attraction < 0) {
    attraction = 0;
    document.getElementById("trapAttractionValue").value = 0;
  }

  trapType = type;
  trapPower = power;
  trapLuck = luck;
  trapAtt = attraction;
  trapEff = effect;
  showPop(2);
}

// type = 2 means charms are not reset
function showPop(type) {
  var results = document.getElementById("results");
  var commonCheeseIndex;

  if (type !== 0 && type !== 2) {
    charmName = "No Charm";
  }

  function getHeaderRow() {
    var headerHTML =
      "<tr align='left'><th align='left'>Mouse</th><th data-filter='false'>Attraction<br>Rate</th><th data-filter='false'>Catch<br>Rate</th><th data-filter='false'>Catches /<br>100 hunts</th><th data-filter='false'>Gold</th><th data-filter='false'>Points</th><th data-filter='false'>Tourney<br>Points</th><th data-filter='false'>Min.<br>Luck</th>";

    if (rank) {
      headerHTML += "<th data-filter='false'>Rank</th>";
    }

    if (locationName.indexOf("Seasonal Garden") >= 0) {
      headerHTML += "<th data-filter='false'>Amp %</th>";
    } else if (
      contains(locationName, "Iceberg") &&
      phaseName.indexOf("Lair") < 0
    ) {
      headerHTML +=
        "<th data-filter='false'>Catch ft</th><th data-filter='false'>FTC ft</th>";
    } else if (
      locationName.indexOf("Sunken City") >= 0 &&
      phaseName !== "Docked"
    ) {
      headerHTML += "<th data-filter='false'>Metres<br>per hunt</th>";
    } else if (locationName === "Labyrinth" && phaseName !== "Intersection") {
      headerHTML +=
        "<th data-filter='false'>Hallway Clues</th><th data-filter='false'>Dead End Clues</th>";
    }
    headerHTML += "</tr>";
    return headerHTML;
  }

  if (
    !locationName ||
    !cheeseName ||
    type === 0 ||
    !((weaponName && baseName) || isCustom)
  ) {
    results.innerHTML = "";
  } else {
    var popArrayLPC = popArray[locationName][phaseName][cheeseName];
    var popCharmName = /^(.*?)(?:\s+Charm)?$/i.exec(charmName)[1];

    if (popArrayLPC && popArrayLPC[popCharmName]) {
      var popArrayLC = popArrayLPC[popCharmName];
    } else {
      if (popArrayLPC) {
        popArrayLC = popArrayLPC[EMPTY_SELECTION];
      }
    }

    var deltaAmpOverall = 0,
      deltaDepthOverall = 0,
      depthTest = 0,
      diveMPH = 0,
      avgLanternClues = 0,
      overallCR = 0,
      overallGold = 0,
      overallPoints = 0,
      overallTP = 0,
      minLuckOverall = 0,
      overallProgress = 0;

    var headerHTML = getHeaderRow();
    var overallAR = getCheeseAttraction();
    var resultsHTML = "<thead>" + headerHTML + "</thead><tbody>";
    var miceNames = Object.keys(popArrayLC || []);

    for (var i = 0; i < miceNames.length; i++) {
      var mouseName = miceNames[i];

      if (mouseName !== "SampleSize") {
        var eff = findEff(mouseName);
        var mousePower = powersArray[mouseName][0];

        if (
          (contains(wereMice, mouseName) && fortRox.ballistaLevel >= 1) ||
          (contains(cosmicCritters, mouseName) && fortRox.cannonLevel >= 1)
        ) {
          mousePower /= 2;
        }

        var catchRate = calcCR(eff, trapPower, trapLuck, mousePower);
        catchRate = calcCREffects(catchRate, mouseName, eff, mousePower);
        catchRate = calcCRMods(catchRate, mouseName);
        var minLuckValue = minLuck(eff, mousePower);
        minLuckOverall = Math.max(minLuckValue, minLuckOverall);
        var attractions = popArrayLC[mouseName] * overallAR;
        var catches = attractions * catchRate;
        var mouseRewards = miceArray[mouseName] || [0, 0];
        var mouseGold = mouseRewards[0];
        var mousePoints = mouseRewards[1];

        if (charmName === "Wealth Charm" || charmName === "Rift Wealth Charm") {
          mouseGold += Math.ceil(Math.min(mouseGold * 0.05, 1800));
        } else if (charmName === "Super Wealth Charm") {
          mouseGold += Math.ceil(Math.min(mouseGold * 0.1, 4500));
        } else if (charmName === "Extreme Wealth Charm") {
          mouseGold += Math.ceil(Math.min(mouseGold * 0.2, 15000));
        } else if (charmName === "Ultimate Wealth Charm") {
          mouseGold += Math.ceil(Math.min(mouseGold * 0.4, 50000));
        }

        var gold = catches * mouseGold / 100;
        var points = catches * mousePoints / 100;
        var tournamentMice = tourneysArray[tournamentName];

        if (tournamentMice) {
          var tourneyPoints = tournamentMice[mouseName] || 0;
        } else {
          tourneyPoints = 0;
        }

        var TP = catches * tourneyPoints / 100;
        overallCR += catches;
        overallTP += TP;
        overallGold += gold;
        overallPoints += points;

        // Formatting
        catchRate *= 100;
        catchRate = catchRate.toFixed(2);
        catches = catches.toFixed(2);

        var mouseRow =
          "<td align='left'>" +
          mouseName +
          "</td><td>" +
          attractions.toFixed(2) +
          "%</td><td>" +
          catchRate +
          "%</td><td>" +
          catches +
          "</td><td>" +
          commafy(mouseGold) +
          "</td><td>" +
          commafy(mousePoints) +
          "</td><td>" +
          tourneyPoints +
          "</td><td>" +
          minLuckValue +
          "</td>";

        if (rank) {
          var adv = mouseWisdom[mouseName] / rankupDiff[rank];
          var helpMessage =
            "<a href='https://docs.google.com/spreadsheets/d/1nzD6iiHauMMwD2eHBuAyRziYJtCVnNwSYzCKbBnrRgc/edit#gid=1426419522' target='blank'>Missing</a>";
          mouseRow +=
            "<td>" +
            (adv ? (adv * 100).toFixed(4) + "%" : helpMessage) +
            "</td>";
          adv *= catches;
          overallProgress += adv;
        }

        if (locationName.indexOf("Seasonal Garden") >= 0) {
          var dAmp = deltaAmp[mouseName];
          if (charmName === "Amplifier Charm") dAmp *= 2;
          mouseRow += "<td>" + dAmp + "%</td>";
          deltaAmpOverall += catches / 100 * dAmp;
        } else if (
          contains(locationName, "Iceberg") &&
          phaseName.indexOf("Lair") < 0
        ) {
          var deltaDepthCatch = catchDepth[mouseName];
          var deltaDepthFTC = ftcDepth[mouseName];

          if (charmName === "Wax Charm" && contains(berglings, mouseName)) {
            deltaDepthCatch += 1;
          } else if (
            charmName === "Sticky Charm" &&
            contains(berglings, mouseName)
          ) {
            deltaDepthFTC = 0;
          } else if (
            (baseName === "Spiked Base" ||
              baseName === "Ultimate Iceberg Base") &&
            contains(brutes, mouseName)
          ) {
            deltaDepthCatch = 0;
            deltaDepthFTC = 0;
          } else if (
            (baseName === "Remote Detonator Base" ||
              baseName === "Ultimate Iceberg Base") &&
            contains(bombSquad, mouseName)
          ) {
            deltaDepthCatch = 20;
          }

          mouseRow +=
            "<td>" + deltaDepthCatch + "</td><td>" + deltaDepthFTC + "</td>";

          deltaDepthOverall +=
            (catchRate / 100 * deltaDepthCatch +
              (100 - catchRate) / 100 * deltaDepthFTC) *
            attractions /
            100;

          depthTest +=
            deltaDepthCatch * catches / 100 +
            deltaDepthFTC * (attractions - catches) / 100;
        } else if (
          locationName.indexOf("Sunken City") >= 0 &&
          phaseName != "Docked"
        ) {
          mouseRow += "<td></td>";
        } else if (locationName == "Labyrinth" && phaseName != "Intersection") {
          var mouseClues = labyrinthMiceClues[mouseName];
          if (lanternStatus == "On" && mouseClues != 0) mouseClues++;
          if (charmName === "Lantern Oil Charm" && mouseClues != 0)
            mouseClues += 1;
          if (charmName === "Super Lantern Oil Charm" && mouseClues != 0)
            mouseClues += 2;
          avgLanternClues += mouseClues * catches / 100;
          mouseRow += "<td>" + mouseClues + "</td><td></td>";
        }

        resultsHTML += "<tr align='right'>" + mouseRow + "</tr>";
      }
    }

    overallAR *= 100;
    var averageCR = overallCR / overallAR * 100;

    resultsHTML +=
      "</tbody><tr align='right'><td align='left'><b>Sums / Averages</b></td><td>" +
      overallAR.toFixed(2) +
      "%</td><td>" +
      averageCR.toFixed(2) +
      "%</td><td>" +
      overallCR.toFixed(2) +
      "</td><td>" +
      commafy(Math.round(overallGold)) +
      "</td><td>" +
      commafy(Math.round(overallPoints)) +
      "</td><td>" +
      overallTP.toFixed(2) +
      "</td><td>" +
      minLuckOverall +
      "</td>";

    if (rank) {
      resultsHTML += "<td>" + overallProgress.toFixed(4) + "%</td>";
    }

    if (locationName.indexOf("Seasonal Garden") >= 0) {
      deltaAmpOverall += (100 - overallAR) / 100 * -3; // Accounting for FTAs (-3%)
      resultsHTML += "<td>" + deltaAmpOverall.toFixed(2) + "%</td>";
    } else if (
      contains(locationName, "Iceberg") &&
      phaseName.indexOf("Lair") < 0
    ) {
      resultsHTML +=
        "<td colspan='2'>" + deltaDepthOverall.toFixed(2) + " ft/hunt</td>";
    } else if (
      locationName.indexOf("Sunken City") >= 0 &&
      phaseName != "Docked"
    ) {
      diveMPH = 30 * overallCR / 100 + 10 * (overallAR - overallCR) / 100;
      if (charmName.indexOf("Anchor Charm") >= 0) {
        diveMPH = 10 * overallCR / 100 + 10 * (overallAR - overallCR) / 100;
      } else if (charmName.indexOf("Water Jet Charm") >= 0) {
        diveMPH = 500 * overallCR / 100 + 10 * (overallAR - overallCR) / 100;
      }
      resultsHTML += "<td>" + diveMPH.toFixed(2) + "</td>";
    } else if (locationName == "Labyrinth" && phaseName != "Intersection") {
      resultsHTML += "<td>" + avgLanternClues.toFixed(2) + "</td>";
      var deadEnds = (overallAR - overallCR) / 100;
      if (baseName == "Minotaur Base" || baseName == "Labyrinth Base")
        deadEnds /= 2; // Assuming 50% negation rate
      if (charmName == "Compass Magnet Charm") deadEnds = 0;
      resultsHTML += "<td>" + deadEnds.toFixed(2) + "</td>";
    }

    var cheeseEatenPerHunt = overallAR / 100;
    var cheeseStaledPerHunt =
      (100 - overallAR) / 100 * freshness2stale[trapEff];
    resultsHTML +=
      "</tr><tr align='right'><td>Profit (minus cheese cost)</td><td></td><td></td><td></td><td>" +
      commafy(
        Math.round(
          overallGold - cheeseCost * (cheeseEatenPerHunt + cheeseStaledPerHunt)
        )
      ) +
      "</td><td></td><td></td><td></td>";

    if (rank) {
      resultsHTML += "<td></td>";
    }

    if (
      locationName.indexOf("Seasonal Garden") >= 0 ||
      (locationName.indexOf("Sunken City") >= 0 && phaseName != "Docked")
    ) {
      resultsHTML += "<td></td>";
    } else if (
      contains(locationName, "Iceberg") &&
      phaseName.indexOf("Lair") < 0
    ) {
      resultsHTML += "<td colspan='2'></td>";
    } else if (locationName == "Labyrinth" && phaseName != "Intersection") {
      resultsHTML += "<td></td><td></td>";
    }
    resultsHTML += "</tr>";
    results.innerHTML = resultsHTML;

    var resort = true,
      callback = function() {
        // empty
      };
    $("#results").trigger("updateAll", [resort, callback]);
  }
}

function loadCheeseDropdown(locationName, phaseName) {
  function getCheeseDropdownHTML(location, phase) {
    var cheeses = Object.keys(popArray[location][phase] || []);
    var cheeseDropdownHTML = "";
    for (var key in cheeses) {
      var option = cheeses[key];
      cheeseDropdownHTML += "<option>" + option + "</option>\n";
    }
    return cheeseDropdownHTML;
  }

  var cheeseDropdown = document.getElementById("cheese");

  if (locationName) {
    cheeseDropdown.innerHTML = getCheeseDropdownHTML(locationName, phaseName);
  }

  var cheeseParameter = recentCheese || getURLParameter("cheese");
  if (cheeseParameter !== NULL_URL_PARAM) {
    var select = document.getElementById("cheese");
    select.value = cheeseParameter;
    if (select.selectedIndex === -1) {
      select.selectedIndex = 0;
    }
  }

  selectCharm();
  cheeseChanged();
}

function loadTourneyDropdown() {
  var tourneyDropdown = document.getElementById("tourney");

  var tourneyDropdownHTML = "<option></option>";

  var tourneys = Object.keys(tourneysArray || []);
  for (var key in tourneys) {
    tourneyDropdownHTML += "<option>" + tourneys[key] + "</option>\n";
  }

  tourneyDropdown.innerHTML = tourneyDropdownHTML;

  var tourneyParameter = getURLParameter("tourney");
  if (tourneyParameter !== NULL_URL_PARAM) {
    var select = document.getElementById("tourney");
    //TODO: Improve
    for (var i = 0; i < select.children.length; i++) {
      var child = select.children[i];
      if (child.innerHTML === tourneyParameter) {
        child.selected = true;
        tourneyChanged();
        break;
      }
    }
  }
}

function updateLink() {
  var urlParams = {
    location: locationName,
    phase: phaseName,
    gs: !gsLuck,
    cheese: cheeseName,
    oil: lanternStatus,
    empowered: isEmpowered,
    battery: batteryPower,
    weapon: weaponName,
    base: baseName,
    charm: charmName,
    bonusPower: bonusPower,
    bonusLuck: bonusLuck,
    tourney: tournamentName,
    riftstalker: riftStalkerCodex,
    ballistaLevel: fortRox.ballistaLevel,
    cannonLevel: fortRox.cannonLevel,
    rank: rank,
    amplifier: ztAmp
  };
  var URLString = buildURL("cre.html", urlParams);
  document.getElementById("link").href = URLString;
}

function cheeseChanged() {
  cheeseName = document.getElementById("cheese").value;
  recentCheese = cheeseName;
  updateLink();

  // Basic cheese costs
  cheeseCost = standardCheeseCost[cheeseName] || 0;
  document.getElementById("cheeseCost").value = cheeseCost;

  // Empowered check
  checkEmpoweredWidget(document.getElementById("toggleCustom").checked);

  showPop();
  selectCharm();
}

function oilChanged() {
  lanternStatus = document.getElementById("oil").value;
  genericOnChange();
}

function weaponChanged() {
  var select = document.getElementById("weapon");

  updateLink();
  weaponName = select.value;
  populateWeaponData(weaponName);

  // Certain weapons have special effects when paired with particular charms (e.g. Festive + Snowball)
  charmChangeCommon();
  calculateTrapSetup();
}

function icebergPhase() {
  var autoPhase = "";
  if (
    !!~phaseName.indexOf("Bombing Run") &&
    baseName === "Remote Detonator Base"
  )
    autoPhase = "Bombing Run (Remote Detonator)";
  else if (
    !!~phaseName.indexOf("Bombing Run") &&
    baseName === "Ultimate Iceberg Base"
  )
    autoPhase = "Bombing Run (Ultimate Iceberg)";
  else if (
    phaseName === "Bombing Run (Remote Detonator)" &&
    baseName !== "Remote Detonator Base"
  )
    autoPhase = "Bombing Run";
  else if (
    phaseName === "Bombing Run (Ultimate Iceberg)" &&
    baseName !== "Ultimate Iceberg Base"
  )
    autoPhase = "Bombing Run";
  else if (
    !!~phaseName.indexOf("Treacherous Tunnels") &&
    baseName === "Magnet Base"
  )
    autoPhase = "Treacherous Tunnels (Magnet)";
  else if (
    !!~phaseName.indexOf("Treacherous Tunnels") &&
    baseName === "Ultimate Iceberg Base"
  )
    autoPhase = "Treacherous Tunnels (Ultimate Iceberg)";
  else if (
    phaseName === "Treacherous Tunnels (Magnet)" &&
    baseName !== "Magnet Base"
  )
    autoPhase = "Treacherous Tunnels";
  else if (
    phaseName === "Treacherous Tunnels (Ultimate Iceberg)" &&
    baseName !== "Ultimate Iceberg"
  )
    autoPhase = "Treacherous Tunnels";
  else if (
    !!~phaseName.indexOf("The Mad Depths") &&
    baseName === "Hearthstone Base"
  )
    autoPhase = "The Mad Depths (Hearthstone)";
  else if (!!~phaseName.indexOf("The Mad Depths") && baseName === "Magnet Base")
    autoPhase = "The Mad Depths (Magnet)";
  else if (
    !!~phaseName.indexOf("The Mad Depths") &&
    baseName === "Ultimate Iceberg Base"
  )
    autoPhase = "The Mad Depths (Ultimate Iceberg)";
  else if (
    phaseName === "The Mad Depths (Hearthstone)" &&
    baseName !== "Hearthstone Base"
  )
    autoPhase = "The Mad Depths";
  else if (
    phaseName === "The Mad Depths (Magnet)" &&
    baseName !== "Magnet Base"
  )
    autoPhase = "The Mad Depths";
  else if (
    phaseName === "The Mad Depths (Ultimate Iceberg)" &&
    baseName !== "Ultimate Iceberg"
  )
    autoPhase = "The Mad Depths";

  if (autoPhase !== "") {
    var phaseSelect = document.getElementById("phase");
    if (phaseSelect.value !== autoPhase) {
      phaseSelect.value = autoPhase;
      phaseChanged();
    }
  }
}

function baseChanged() {
  var baseSelet = document.getElementById("base");

  baseName = baseSelet.value;
  updateLink();
  icebergPhase();
  populateBaseData(baseName);

  // Certain bases have special effects when paired with particular charms
  charmChangeCommon();
  calculateTrapSetup();
}

function charmChanged() {
  var select = document.getElementById("charm");
  charmName = select.value.trim().replace(/\*$/, "");
  recentCharm = charmName;
  charmChangeCommon();
  calculateTrapSetup();
  formatSampleScore();
}

function tourneyChanged() {
  var select = document.getElementById("tourney");
  tournamentName = select.value;
  updateLink();
  calculateTrapSetup();
}
