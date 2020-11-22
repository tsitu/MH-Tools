"use strict";

window.onload = function() {
  user = CRE_USER;

  loadBookmarkletFromJS(
    BOOKMARKLET_URLS["loader"],
    "bookmarkletLoader",
    "#bookmarkletloader"
  );
  loadBookmarkletFromJS(
    BOOKMARKLET_URLS["cre"],
    "creBookmarklet",
    "#bookmarklet"
  );

  startPopulationLoad("data/json/populations-cre-setup.json", user);
  loadDropdown("weapon", weaponKeys, weaponChanged, "<option></option>");
  loadDropdown("base", baseKeys, baseChanged, "<option></option>");
  loadCharmDropdown();
  showHideWidgets(isCustom());

  // Populate initial golem charge levels
  var arcaneCharge = parseFloat(localStorage.getItem("golem-charge-arcane"));
  var forgottenCharge = parseFloat(
    localStorage.getItem("golem-charge-forgotten")
  );
  var hydroCharge = parseFloat(localStorage.getItem("golem-charge-hydro"));
  var physicalCharge = parseFloat(
    localStorage.getItem("golem-charge-physical")
  );
  var tacticalCharge = parseFloat(
    localStorage.getItem("golem-charge-tactical")
  );
  $("#golem-charge-arcane").val(arcaneCharge || 0);
  $("#golem-charge-forgotten").val(forgottenCharge || 0);
  $("#golem-charge-hydro").val(hydroCharge || 0);
  $("#golem-charge-physical").val(physicalCharge || 0);
  $("#golem-charge-tactical").val(tacticalCharge || 0);

  // Listen for changes in dropdowns or textboxes
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
  document.getElementById("saltLevel").onchange = saltChanged;
  document.getElementById("vrFloorType").onchange = genericOnChange;
  document.getElementById("umbraFloor").onchange = umbraChanged;
  document.getElementById("riftstalker").onchange = riftstalkerChange;
  document.getElementById("rank").onchange = rankChange;

  document.getElementById("cheeseCost").onchange = function() {
    cheeseCost = parseInt(document.getElementById("cheeseCost").value);
    showPop(2);
  };

  document.getElementById("golem-charge-arcane").oninput = function() {
    golemChargeChange(
      "arcane",
      document.getElementById("golem-charge-arcane").value
    );
  };

  document.getElementById("golem-charge-forgotten").oninput = function() {
    golemChargeChange(
      "forgotten",
      document.getElementById("golem-charge-forgotten").value
    );
  };

  document.getElementById("golem-charge-hydro").oninput = function() {
    golemChargeChange(
      "hydro",
      document.getElementById("golem-charge-hydro").value
    );
  };

  document.getElementById("golem-charge-physical").oninput = function() {
    golemChargeChange(
      "physical",
      document.getElementById("golem-charge-physical").value
    );
  };

  document.getElementById("golem-charge-tactical").oninput = function() {
    golemChargeChange(
      "tactical",
      document.getElementById("golem-charge-tactical").value
    );
  };

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
    var headerHTML;
    if (locationName === "Event") {
      headerHTML = "<tr align='left'>";
      headerHTML += "<th align='left'>Mouse Name</th>";
      headerHTML += "<th data-filter='false'>Catch Rate</th>";
      headerHTML += "<th data-filter='false'>Gold</th>";
      headerHTML += "<th data-filter='false'>Points</th>";
      headerHTML += "<th data-filter='false'>Min Luck</th>";
      if (rank) {
        headerHTML += "<th data-filter='false'>Rank Per Catch</th>";
      }
    } else {
      headerHTML = "<tr align='left'>";
      headerHTML += "<th>Mouse Name</th>";
      headerHTML += "<th data-filter='false'>Attraction<br>Rate</th>";
      headerHTML += "<th data-filter='false'>Catch<br>Rate</th>";
      headerHTML += "<th data-filter='false'>Catches</th>";
      headerHTML += "<th data-filter='false'>Gold</th>";
      headerHTML += "<th data-filter='false'>Points</th>";
      headerHTML += "<th data-filter='false'>Min<br>Luck</th>";
      if (rank) {
        headerHTML += "<th data-filter='false'>Rank<br>Adv</th>";
      }
      if (tournamentName !== "") {
        headerHTML += "<th data-filter='false'>Tourney<br>Points</th>";
      }
    }

    if (locationName === "Seasonal Garden") {
      headerHTML += "<th data-filter='false'>Amp %</th>";
    } else if (locationName === "Whisker Woods Rift") {
      headerHTML += "<th data-filter='false'>Crazed<br>Rage</th>";
      headerHTML += "<th data-filter='false'>Gnarled<br>Rage</th>";
      headerHTML += "<th data-filter='false'>Deep<br>Rage</th>";
    } else if (
      contains(locationName, "Iceberg") &&
      phaseName.indexOf("Lair") < 0
    ) {
      headerHTML +=
        "<th data-filter='false'>Catch ft</th><th data-filter='false'>FTC ft</th>";
    } else if (locationName === "Sunken City" && phaseName !== "Docked") {
      headerHTML += "<th data-filter='false'>Meters<br>per hunt</th>";
    } else if (locationName === "Labyrinth" && phaseName !== "Intersection") {
      headerHTML +=
        "<th data-filter='false'>Hallway Clues</th><th data-filter='false'>Dead End Clues</th>";
    } else if (
      locationName === "Queso Geyser" &&
      phaseName === "Pressure Building"
    ) {
      headerHTML +=
        "<th data-filter='false'>kPa</th><th data-filter='false'>kPa Tonic</th>";
    } else if (
      locationName === "Floating Islands" &&
      phaseName.indexOf("Pirates") >= 0
    ) {
      headerHTML += "<th data-filter='false'>Seals</th>";
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
      overallProgress = 0,
      crazedRageIncreaseOverall = 0,
      gnarledRageIncreaseOverall = 0,
      deepRageIncreaseOverall = 0,
      pressureOverall = 0,
      pressureOverallTonic = 0,
      pirateSeals = 0;

    var headerHTML = getHeaderRow();
    var overallAR = getCheeseAttraction();
    var resultsHTML = "<thead>" + headerHTML + "</thead><tbody>";
    var miceNames = Object.keys(popArrayLC || []);

    for (var i = 0; i < miceNames.length; i++) {
      var mouseName = miceNames[i];

      if (mouseName !== "SampleSize") {
        var attractions = popArrayLC[mouseName] * overallAR;
        mouseName = dynamicMouseRename(mouseName);
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

        var gold = (catches * mouseGold) / 100;
        var points = (catches * mousePoints) / 100;
        var tournamentMice = tourneysArray[tournamentName];

        if (tournamentMice) {
          var tourneyPoints = tournamentMice[mouseName] || 0;
        } else {
          tourneyPoints = 0;
        }

        var TP = (catches * tourneyPoints) / 100;
        overallCR += catches;
        overallTP += TP;
        overallGold += gold;
        overallPoints += points;

        // Formatting
        catchRate *= 100;
        catchRate = catchRate.toFixed(2);
        catches = catches.toFixed(2);

        var mouseRow;
        if (locationName === "Event") {
          var catchRateStr = catchRate + "%";
          var minLuckStr = minLuckValue;
          if (mousePower === 0) {
            // Link to 'MH Data Repository' spreadsheet
            // Currently limited to Event mice, but there may be others with MP = 0
            catchRateStr = "Missing MP";
            minLuckStr = "N/A";
          }
          mouseRow =
            "<td align='left'>" +
            mouseName +
            "</td><td>" +
            catchRateStr +
            "</td><td>" +
            commafy(mouseGold) +
            "</td><td>" +
            commafy(mousePoints) +
            "</td><td>" +
            minLuckStr +
            "</td>";
        } else {
          mouseRow =
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
            minLuckValue +
            "</td>";
        }

        if (rank) {
          var adv = mouseWisdom[mouseName] / rankupDiff[rank];
          var helpMessage =
            "<a href='https://docs.google.com/spreadsheets/d/1nzD6iiHauMMwD2eHBuAyRziYJtCVnNwSYzCKbBnrRgc/edit?usp=sharing' target='blank'>Missing</a>";
          var rankStr;
          rankStr = adv ? (adv * 100).toFixed(4) + "%" : helpMessage;

          // 0 wisdom edge case(s)
          if (mouseName === "Romeno") {
            rankStr = "0.0000%";
          }

          mouseRow += "<td>" + rankStr + "</td>";
          adv *= catches;
          overallProgress += adv;
        }

        if (tournamentName !== "") {
          mouseRow += "<td>" + tourneyPoints + "</td>";
        }

        if (locationName === "Seasonal Garden") {
          var dAmp = deltaAmp[mouseName];
          var ampMultiplier = 1;
          if (charmName === "Amplifier Charm") ampMultiplier += 1;
          if (weaponName === "Chesla's Revenge") ampMultiplier += 0.125; // 12.5% proc additional charge
          dAmp *= ampMultiplier;

          // TODO: For SS/Harvester, dAmp = (max - current) / 2
          // (maximum is 175/2 = 87.5, minimum is 0.5)
          // if (
          //   weaponName === "Sandcastle Shard Trap" &&
          //   mouseName === "Harvester"
          // ) {
          //   dAmp = 87.5; // 50% proc full charge (0.5 * 175)
          // }

          mouseRow += "<td>" + dAmp.toFixed(2) + "%</td>";
          deltaAmpOverall += (dAmp * catches) / 100;
        } else if (locationName === "Whisker Woods Rift") {
          var crazedRageIncrease = rage_increase_table[mouseName]["Crazed"];
          var gnarledRageIncrease = rage_increase_table[mouseName]["Gnarled"];
          var deepRageIncrease = rage_increase_table[mouseName]["Deep"];
          if (charmName == "Cherry Charm") {
            crazedRageIncrease =
              crazedRageIncrease + gnarledRageIncrease + deepRageIncrease;
            gnarledRageIncrease = 0;
            deepRageIncrease = 0;
          } else if (charmName == "Gnarled Charm") {
            gnarledRageIncrease =
              crazedRageIncrease + gnarledRageIncrease + deepRageIncrease;
            crazedRageIncrease = 0;
            deepRageIncrease = 0;
          } else if (charmName == "Stagnant Charm") {
            deepRageIncrease =
              crazedRageIncrease + gnarledRageIncrease + deepRageIncrease;
            crazedRageIncrease = 0;
            gnarledRageIncrease = 0;
          }
          mouseRow += "<td>" + crazedRageIncrease + "</td>";
          mouseRow += "<td>" + gnarledRageIncrease + "</td>";
          mouseRow += "<td>" + deepRageIncrease + "</td>";
          crazedRageIncreaseOverall +=
            ((catchRate / 100) * crazedRageIncrease * attractions) / 100.0;
          gnarledRageIncreaseOverall +=
            ((catchRate / 100) * gnarledRageIncrease * attractions) / 100.0;
          deepRageIncreaseOverall +=
            ((catchRate / 100) * deepRageIncrease * attractions) / 100.0;
        } else if (
          contains(locationName, "Iceberg") &&
          phaseName.indexOf("Lair") < 0
        ) {
          var deltaDepthCatch = catchDepth[mouseName];
          var deltaDepthFTC = ftcDepth[mouseName];

          if (charmName === "Wax Charm" && contains(berglings, mouseName)) {
            deltaDepthCatch += 1;
          } else if (
            charmName === "Super Wax Charm" &&
            contains(berglings, mouseName)
          ) {
            deltaDepthCatch += 2;
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
            (((catchRate / 100) * deltaDepthCatch +
              ((100 - catchRate) / 100) * deltaDepthFTC) *
              attractions) /
            100;

          depthTest +=
            (deltaDepthCatch * catches) / 100 +
            (deltaDepthFTC * (attractions - catches)) / 100;
        } else if (locationName === "Sunken City" && phaseName != "Docked") {
          mouseRow += "<td></td>";
        } else if (locationName == "Labyrinth" && phaseName != "Intersection") {
          var mouseClues = labyrinthMiceClues[mouseName];
          if (lanternStatus == "On" && mouseClues != 0) mouseClues++;
          if (charmName === "Lantern Oil Charm" && mouseClues != 0)
            mouseClues += 1;
          if (charmName === "Super Lantern Oil Charm" && mouseClues != 0)
            mouseClues += 2;
          avgLanternClues += (mouseClues * catches) / 100;
          mouseRow += "<td>" + mouseClues + "</td><td></td>";
        } else if (
          locationName === "Queso Geyser" &&
          phaseName === "Pressure Building"
        ) {
          var kPaGain = pressureMice[mouseName];
          pressureOverall += (kPaGain * catches) / 100;
          pressureOverallTonic += (kPaGain * 2 * catches) / 100;
          mouseRow += "<td>" + kPaGain + "</td><td>" + kPaGain * 2 + "</td>";
        } else if (
          locationName === "Floating Islands" &&
          phaseName.indexOf("Pirates") >= 0
        ) {
          var sealsLooted = pirateSealMice[mouseName];
          pirateSeals += (sealsLooted * catches) / 100;
          mouseRow += "<td>" + sealsLooted + "</td>";
        }

        if (locationName === "Event") {
          resultsHTML += "<tr align='center'>" + mouseRow + "</tr>";
        } else {
          resultsHTML += "<tr align='center'>" + mouseRow + "</tr>";
        }
      }
    }

    overallAR *= 100;
    var averageCR = (overallCR / overallAR) * 100;

    // Generate 'Overall Stats' row
    var statsRow;
    if (locationName !== "Event") {
      resultsHTML +=
        "</tbody><tr align='center'><td align='left'><b>Overall Stats</b></td><td>" +
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
        minLuckOverall +
        "</td>";
    }

    if (rank && locationName !== "Event") {
      resultsHTML += "<td>" + overallProgress.toFixed(4) + "%</td>";
    }

    if (tournamentName !== "") {
      resultsHTML += "<td>" + overallTP.toFixed(2) + "</td>";
    }

    if (locationName === "Seasonal Garden") {
      deltaAmpOverall += ((100 - overallAR) / 100) * -3; // Accounting for FTAs (-3%)
      resultsHTML += "<td>" + deltaAmpOverall.toFixed(2) + "%</td>";
    } else if (locationName === "Whisker Woods Rift") {
      resultsHTML += "<td>" + crazedRageIncreaseOverall.toFixed(2) + "</td>";
      resultsHTML += "<td>" + gnarledRageIncreaseOverall.toFixed(2) + "</td>";
      resultsHTML += "<td>" + deepRageIncreaseOverall.toFixed(2) + "</td>";
    } else if (
      contains(locationName, "Iceberg") &&
      phaseName.indexOf("Lair") < 0
    ) {
      resultsHTML +=
        "<td colspan='2'>" + deltaDepthOverall.toFixed(2) + " ft/hunt</td>";
    } else if (locationName === "Sunken City" && phaseName != "Docked") {
      diveMPH = (30 * overallCR) / 100 + (10 * (overallAR - overallCR)) / 100;
      if (charmName.indexOf("Anchor Charm") >= 0) {
        diveMPH = (10 * overallCR) / 100 + (10 * (overallAR - overallCR)) / 100;
      } else if (charmName.indexOf("Water Jet Charm") >= 0) {
        diveMPH =
          (500 * overallCR) / 100 + (10 * (overallAR - overallCR)) / 100;
      }
      resultsHTML += "<td>" + diveMPH.toFixed(2) + "</td>";
    } else if (locationName == "Labyrinth" && phaseName != "Intersection") {
      resultsHTML += "<td>" + avgLanternClues.toFixed(2) + "</td>";
      var deadEnds = (overallAR - overallCR) / 100;
      // Assuming 50% proc rates
      if (
        baseName == "Minotaur Base" ||
        baseName == "Labyrinth Base" ||
        baseName == "Treasure Seeker Base"
      ) {
        deadEnds /= 2;
      }
      if (charmName == "Compass Magnet Charm") {
        deadEnds = (-0.5 * overallCR) / 100;
      }
      resultsHTML += "<td>" + deadEnds.toFixed(2) + "</td>";
    } else if (
      locationName === "Queso Geyser" &&
      phaseName === "Pressure Building"
    ) {
      resultsHTML +=
        "<td>" +
        pressureOverall.toFixed(2) +
        "</td><td>" +
        pressureOverallTonic.toFixed(2) +
        "</td>";
    } else if (
      locationName === "Floating Islands" &&
      phaseName.indexOf("Pirates") >= 0
    ) {
      resultsHTML += "<td>" + pirateSeals.toFixed(2) + "</td>";
    }

    var cheeseEatenPerHunt = overallAR / 100;
    var cheeseStaledPerHunt =
      ((100 - overallAR) / 100) * freshness2stale[trapEff];

    // Generate gold profit row
    if (locationName !== "Event") {
      resultsHTML +=
        "</tr><tr align='center'><td align='right'>Profit (minus cheese cost)</td><td></td><td></td><td></td><td>" +
        commafy(
          Math.round(
            overallGold -
              cheeseCost * (cheeseEatenPerHunt + cheeseStaledPerHunt)
          )
        ) +
        "</td><td></td><td></td>";

      if (rank) {
        resultsHTML += "<td></td>";
      }

      if (tournamentName !== "") {
        resultsHTML += "<td></td>";
      }
    }

    if (
      locationName === "Seasonal Garden" ||
      (locationName === "Sunken City" && phaseName != "Docked") ||
      (locationName === "Floating Islands" && phaseName.indexOf("Pirates") >= 0)
    ) {
      resultsHTML += "<td></td>";
    } else if (
      (contains(locationName, "Iceberg") && phaseName.indexOf("Lair") < 0) ||
      (locationName == "Labyrinth" && phaseName != "Intersection") ||
      (locationName === "Queso Geyser" && phaseName === "Pressure Building")
    ) {
      resultsHTML += "<td colspan='2'></td>";
    } else if (locationName === "Whisker Woods Rift") {
      resultsHTML += "<td colspan='3'></td>";
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
    saltLevel: saltLevel,
    rank: rank,
    amplifier: ztAmp,
    vrFloorType: document.querySelector("#vrFloorType").selectedIndex
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

  // Handle Golem Guardian charge inputs
  $(".golem-guardian-charge#arcane").hide();
  $(".golem-guardian-charge#forgotten").hide();
  $(".golem-guardian-charge#hydro").hide();
  $(".golem-guardian-charge#physical").hide();
  $(".golem-guardian-charge#tactical").hide();

  if (weaponName.indexOf("Golem Guardian") >= 0) {
    switch (weaponName.split(" ")[2]) {
      case "Arcane":
        $(".golem-guardian-charge#arcane").show(500);
        break;
      case "Forgotten":
        $(".golem-guardian-charge#forgotten").show(500);
        break;
      case "Hydro":
        $(".golem-guardian-charge#hydro").show(500);
        break;
      case "Physical":
        $(".golem-guardian-charge#physical").show(500);
        break;
      case "Tactical":
        $(".golem-guardian-charge#tactical").show(500);
        break;
      default:
    }
  }
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

  // Handle Prestige Base input
  $("#prestige-umbra-floor").hide();
  if (baseName === "Prestige Base") {
    $("#prestige-umbra-floor").show(500);
  }
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
