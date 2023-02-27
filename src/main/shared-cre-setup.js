"use strict";

/**
 * Shared functions and variables for both CRE and Best Setup
 */
var user;
var CRE_USER = "cre";
var SETUP_USER = "setup";
var DEFAULT_STATS = [0, 0, 0, 0, "No Effect"];
var EMPTY_SELECTION = "-";
var NULL_URL_PARAM = null;
var riftStalkerCodex;

// Weapon stats
var weaponPower = 0,
  weaponBonus = 0,
  weaponLuck = 0,
  weaponAtt = 0,
  weaponEff = 0;

// Base stats
var basePower = 0,
  baseBonus = 0,
  baseLuck = 0,
  baseAtt = 0,
  baseEff = 0;

// Charm stats
var charmPower = 0,
  charmBonus = 0,
  charmAtt = 0,
  charmLuck = 0,
  charmEff = 0;

// Misc bonuses
var gsLuck = 7,
  ztAmp = 100,
  bonusPower = 0,
  bonusLuck = 0,
  pourBonus = 0,
  pourLuck = 0,
  batteryPower = 0,
  cheeseBonus = 0,
  cheeseCost = 0,
  subtotalPowerBonus = 0,
  tauntBonus = 0,
  saltLevel = 0,
  umbraFloor = 0;

// Total trap stats
var trapPower = 0,
  trapLuck = 0,
  trapAtt = 0,
  trapEff = 0,
  trapType = "";

// Various strings
var baseName = "",
  charmName = "",
  locationName = "",
  cheeseName = "",
  tournamentName = "",
  weaponName = "",
  phaseName = "",
  isEmpowered = "",
  lanternStatus = "",
  rank = "",
  recentCharm = "",
  recentCheese = "";

// Initialize Fort Rox Ballista and Cannon levels
var fortRox = {
  ballistaLevel: 0,
  cannonLevel: 0
};

/**
 * Returns the size of an object based on its length or number of keys
 * @param {object} obj
 * @return {number} Object length
 */
Object.size = function(obj) {
  return obj.length || Object.keys(obj).length;
};

/**
 * @param {string} x
 * @return {string}
 */
function commafy(x) {
  return x.toLocaleString();
}

/**
 * Checks for existence of search element in an array or string
 */
function contains(arrayOrString, searchElement) {
  return arrayOrString.indexOf(searchElement) > -1;
}

/**
 * Special charm bonus calculations
 * @param {string} charmName
 */
function calcSpecialCharms(charmName) {
  populateCharmData(charmName); // Resets charm globals
  if (charmName === "Champion Charm") {
    // Check if GTB used. If so +4 luck
    if (baseName === "Golden Tournament Base") {
      charmLuck += 4;
    } else if (baseName === "Silver Tournament Base") {
      charmLuck += 3;
    } else if (baseName === "Bronze Tournament Base") {
      charmLuck += 2;
    }
  } else if (charmName === "Growth Charm") {
    if (baseName === "Soiled Base" || baseName === "Living Grove Base") {
      charmPower += 100;
      charmBonus += 3;
      charmAtt += 5;
      charmLuck += 4;
    }
  } else if (charmName === "Wild Growth Charm") {
    if (baseName === "Soiled Base" || baseName === "Living Grove Base") {
      charmPower += 300;
      charmBonus += 8;
      charmAtt += 20;
      charmLuck += 9;
    }
  } else if (charmName === "Spellbook Charm") {
    if (baseName === "Spellbook Base") {
      charmPower += 500;
      charmBonus += 8;
    }
  } else if (charmName.indexOf("Snowball Charm") >= 0) {
    if (contains(festiveTraps, weaponName)) {
      charmBonus += 20;
    }
  } else if (charmName.indexOf("Spooky Charm") >= 0) {
    if (contains(halloweenTraps, weaponName)) {
      charmBonus += 20;
    }
  } else if (charmName.indexOf("Party Charm") >= 0) {
    if (contains(birthdayTraps, weaponName)) {
      charmBonus += 20;
    }
  }

  if (user === CRE_USER) {
    calculateTrapSetup();
  }
}

/**
 * Get a specific parameter from the URL
 * @param {string} name Desired URL parameter
 * @return {string|null}
 */
function getURLParameter(name) {
  var regexExec = new RegExp("[?&]" + name + "=(.+?)(&|$)").exec(
    location.search
  );
  var value = (regexExec || [, null])[1];

  if (value === null) {
    return null;
  } else {
    return decodeURIComponent(value);
  }
}

/**
 * Build URL from key/value pairs.
 *  - Keys are only added to the URL if their value is !false, >0, != "-"
 *  - NB: Always test this with Toxic Spill sublocations if it is changed
 * @param {string} location
 * @param {string[]} urlParams
 * @return {string}
 */
function buildURL(location, urlParams) {
  var url = location + "?";
  for (var key in urlParams) {
    var urlParam = urlParams[key];
    if (urlParam && urlParam !== EMPTY_SELECTION) {
      url += key + "=" + encodeURIComponent(urlParam) + "&";
    }
  }
  return url;
}

/**
 * Checks if specified charm is part of the Rift set
 * @param {string} charmName
 * @return {boolean}
 */
function isRiftCharm(charmName) {
  return (
    contains(riftCharms, charmName) || contains(charmName.toLowerCase(), "rift")
  );
}

/**
 * Counts the number of Rift items
 * @param {string} weapon
 * @param {string} base
 * @param {string} charm
 * @return {number}
 */
function getRiftCount(weapon, base, charm) {
  var riftCount = 0;
  if (contains(riftWeapons, weapon)) riftCount++;
  if (contains(riftBases, base)) riftCount++;
  if (isRiftCharm(charm)) riftCount++;
  return riftCount;
}

/**
 * Calculates overall power and luck, along with any special bonuses
 * @param {boolean} skipDisp
 */
function calculateTrapSetup(skipDisp) {
  var specialPower = 0, // bonus flat power
    specialLuck = 0, // bonus flat luck
    shownPowerBonus = 0, // able to be parsed from user.trap_power_bonus
    hiddenPowerBonus = 0; // implicit, unable to be parsed

  if (locationName && phaseName && cheeseName && weaponName && baseName) {
    // Golem Guardian logic
    if (weaponName.indexOf("Golem Guardian") >= 0) {
      var golemCharge = 0;
      switch (weaponName.split(" ")[2]) {
        case "Arcane":
          golemCharge =
            parseFloat(localStorage.getItem("golem-charge-arcane")) || 0;
          break;
        case "Forgotten":
          golemCharge =
            parseFloat(localStorage.getItem("golem-charge-forgotten")) || 0;
          break;
        case "Hydro":
          golemCharge =
            parseFloat(localStorage.getItem("golem-charge-hydro")) || 0;
          break;
        case "Physical":
          golemCharge =
            parseFloat(localStorage.getItem("golem-charge-physical")) || 0;
          break;
        case "Tactical":
          golemCharge =
            parseFloat(localStorage.getItem("golem-charge-tactical")) || 0;
          break;
        default:
      }

      golemCharge = parseFloat((golemCharge / 100).toFixed(3));
      calcGolemStats(golemCharge);
    }

    if (baseName === "Prestige Base") calcPrestigeStats();

    // Handle special bonuses that are based on location
    locationSpecificEffects();

    if (
      weaponsArray[weaponName][0] === "Physical" &&
      baseName === "Physical Brace Base"
    ) {
      shownPowerBonus += 25;
    } else if (
      (baseName === "Polluted Base" ||
        baseName === "Refined Pollutinum Base") &&
      charmName.indexOf("Polluted Charm") >= 0
    ) {
      if (charmName === "Polluted Charm") {
        specialLuck += 4;
      } else if (charmName === "Super Polluted Charm") {
        specialLuck += 6;
      } else if (charmName === "Extreme Polluted Charm") {
        specialLuck += 10;
      } else if (charmName === "Ultimate Polluted Charm") {
        specialLuck += 15;
      }
    } else if (
      baseName === "Glowing Golem Guardian Base" &&
      weaponName.indexOf("Golem Guardian") >= 0
    ) {
      specialLuck += 6;
    } else if (
      baseName === "Chocolate Bar Base" &&
      charmName === "Dark Chocolate Charm"
    ) {
      shownPowerBonus += 20;
    }

    determineRiftBonus(riftStalkerCodex);
    checkBatteryLevel();
    trapType = getPowerType(charmName, weaponName);
    trapPower = getTotalTrapPower();

    var totalLuck =
      weaponLuck +
      baseLuck +
      gsLuck +
      charmLuck +
      bonusLuck +
      pourLuck +
      specialLuck;
    trapLuck = Math.floor(totalLuck * Math.min(1, getAmpBonus()));
    trapAtt = Math.min(weaponAtt + baseAtt + charmAtt, 100);
    trapEff = weaponEff + baseEff + charmEff;
    trapEff = trapEff > 6 ? 6 : trapEff;
    trapEff = trapEff < -6 ? -6 : trapEff;

    if (user === CRE_USER) showTrapSetup();
  }

  if (user === CRE_USER && !skipDisp) {
    showPop(2);
  }

  // Only calculate if both weapon and base selected
  // TODO: Cleanup
  function locationSpecificEffects() {
    function isTribalArea(location) {
      return (
        location === "Elub Shore" ||
        location === "Nerg Plains" ||
        location === "Derr Dunes"
      );
    }

    if (locationName === "Claw Shot City") {
      if (
        (weaponName === "S.L.A.C." || weaponName === "S.L.A.C. II") &&
        baseName === "Claw Shot Base"
      ) {
        if (charmName.indexOf("Cactus Charm") >= 0) specialPower += 2500;
        else specialPower += 1000;
      }
    } else if (locationName === "Seasonal Garden") {
      if (baseName === "Seasonal Base") {
        shownPowerBonus += 18;
      }
      if (
        (weaponName === "Soul Harvester" ||
          weaponName === "Terrifying Spider Trap") &&
        phaseName === "Fall"
      ) {
        specialLuck += 10;
      }
    } else if (
      locationName === "Iceberg" ||
      locationName === "Slushy Shoreline"
    ) {
      if (weaponName === "Steam Laser Mk. I") {
        specialPower += 1750;
        specialLuck += 3;
      } else if (weaponName === "Steam Laser Mk. II") {
        specialPower += 1250;
        specialLuck += 2;
      } else if (weaponName === "Steam Laser Mk. III") {
        specialPower += 1500;
        specialLuck += 2;
      }

      // Deep Freeze / UIB / IBB bonuses before hunt 250
      if (
        (phaseName.indexOf("Icewing's Lair") >= 0 ||
          phaseName.indexOf("Hidden Depths") >= 0 ||
          phaseName.indexOf("The Deep Lair") >= 0) &&
        (baseName === "Deep Freeze Base" ||
          baseName === "Ultimate Iceberg Base" ||
          baseName === "Iceberg Boiler Base")
      ) {
        specialPower += 665;
        specialLuck += 9;
      }
    } else if (locationName === "Gnawnian Express Station") {
      if (
        weaponName === "Bandit Deflector" &&
        phaseName.indexOf("Raider River") >= 0
      ) {
        specialPower += 1500;
      } else if (
        weaponName === "Engine Doubler" &&
        phaseName.indexOf("Daredevil Canyon") >= 0
      ) {
        specialPower += 1500;
      } else if (
        weaponName === "Supply Grabber" &&
        phaseName.indexOf("Supply Depot") >= 0
      ) {
        specialPower += 1500;
      }
    } else if (isTribalArea(locationName) || locationName === "Cape Clawed") {
      if (baseName === "Tiki Base" || baseName === "Tribal Base") {
        specialLuck += 6;
      }

      if (
        (locationName === "Derr Dunes" && charmName === "Derr Power Charm") ||
        (locationName === "Nerg Plains" && charmName === "Nerg Power Charm") ||
        (locationName === "Elub Shore" && charmName === "Elub Power Charm")
      ) {
        specialPower += 600;
        shownPowerBonus += 5;
      }
    } else if (locationName === "Fiery Warpath") {
      if (charmName === "Flamebane Charm") {
        hiddenPowerBonus += 150;
      }
      if (weaponName === "Warden Slayer Trap") {
        if (phaseName === "Wave 4" || phaseName === "Portal") {
          specialPower += 2500;
          shownPowerBonus += 2500;
        }
      }
    } else if (locationName === "Toxic Spill") {
      if (baseName === "Washboard Base") {
        shownPowerBonus += 5;
        specialLuck += 5;
      }
      if (charmName === "Soap Charm") {
        specialPower += 5000;
        specialLuck += 10;
      } else if (charmName === "Super Soap Charm") {
        specialPower += 8000;
        specialLuck += 12;
      }
    } else if (locationName === "Jungle of Dread") {
      if (weaponName === "Dreaded Totem Trap") {
        specialPower += 8500;
      }
      if (charmName === "Dreaded Charm") {
        shownPowerBonus += 300;
      }
    } else if (
      locationName === "Sunken City" &&
      baseName === "Depth Charge Base" &&
      phaseName !== "Docked"
    ) {
      specialPower += 1000;
    } else if (
      locationName === "Town of Digby" &&
      cheeseName === "Limelight" &&
      charmName === "Mining Charm"
    ) {
      hiddenPowerBonus += 30;
    } else if (locationName === "Fort Rox") {
      fortRox.ballistaLevel = document.getElementById("ballistaLevel").value;
      fortRox.cannonLevel = document.getElementById("cannonLevel").value;

      if (charmName === "Nightlight Charm") {
        if (phaseName === "Day") {
          shownPowerBonus += 1;
        } else if (phaseName === "Twilight") {
          shownPowerBonus += 3;
        } else if (phaseName === "Midnight") {
          shownPowerBonus += 5;
        } else if (phaseName === "Pitch") {
          shownPowerBonus += 7;
        } else if (phaseName === "Utter Darkness") {
          shownPowerBonus += 9;
        } else if (phaseName === "First Light") {
          shownPowerBonus += 12;
        } else if (phaseName === "Dawn") {
          shownPowerBonus += 15;
        }
      }
    } else if (
      locationName === "Floating Islands" ||
      locationName === "Sky Palace") {
      if (cheeseName === "Extra Rich Cloud Cheesecake") {
        shownPowerBonus += 20;
        specialLuck += 5;
      }
    } else if (
      locationName === "Event" &&
      phaseName === "Halloween" &&
      weaponName === "Boiling Cauldron Trap"){
        basePower += 1000;
        weaponBonus += 10;
        trapLuck += 5;
        trapAtt += 15;
       }

    if (
      cheeseName.indexOf("Fusion Fondue") >= 0 &&
      charmName === "EMP400 Charm"
    ) {
      specialPower += 25000;
    }
  }

  function getTotalTrapPower() {
    var totalPower = weaponPower + basePower + charmPower + specialPower;
    var setupPowerBonus = weaponBonus + baseBonus + charmBonus;
    var totalBonus =
      1 +
      (setupPowerBonus +
        shownPowerBonus +
        hiddenPowerBonus +
        cheeseBonus +
        bonusPower) /
        100;
    var totalPourBonus = 1 + (pourBonus / 100) * (1 + setupPowerBonus / 100);
    subtotalPowerBonus = setupPowerBonus + shownPowerBonus + cheeseBonus; // Bonus Power %

    return Math.ceil(totalPower * totalBonus * totalPourBonus * getAmpBonus());
  }

  function getAmpBonus() {
    return ztAmp / 100;
  }

  function determineRiftBonus(codex) {
    var riftCount = getRiftCount(weaponName, baseName, charmName);
    var multiplier = codex ? 2 : 1;

    // Taunting Charm active on boss mice
    if (tauntBonus === 1) riftCount += 1;

    if (riftCount === 2) {
      shownPowerBonus += 20 * multiplier;
    } else if (riftCount === 3) {
      shownPowerBonus += 20 * multiplier;
      specialLuck += 5 * multiplier;
    }
  }

  function checkBatteryLevel() {
    if (locationName !== "Furoma Rift") {
      batteryPower = 0;
    }
    var batteryExtras = batteryEffects[batteryPower] || [0, 0];
    specialPower += batteryExtras[0];
    specialLuck += batteryExtras[1];
  }

  function getPowerType(charm, weapon) {
    var charmPowerTypes = {
      "Forgotten Charm": "Forgotten",
      "Nanny Charm": "Parental",
      "Hydro Charm": "Hydro",
      "Shadow Charm": "Shadow"
    };

    // Power-type charms don't affect II and GG
    if (
      weapon.indexOf("Isle Idol") >= 0 ||
      weapon.indexOf("Golem Guardian") >= 0
    ) {
      return weaponsArray[weapon][0];
    }
    return charmPowerTypes[charm] || weaponsArray[weapon][0];
  }
}

/**
 * Master catch rate formula
 * Source (deprecated 3-eff): https://mhanalysis.wordpress.com/2011/01/05/mousehunt-catch-rates-3-0/
 * Source (mmalks): https://discordapp.com/channels/275500976662773761/355474934601875457/683355234558673028
 * Pastebin (mmalks): https://pastebin.com/FBgKj0BQ
 * Dave confirmed 140% luck cap during 1 May 2020's FBF (https://www.youtube.com/watch?v=kKVgMk4prqI&t=65m29s)
 * Multiply by 10 to guard against floating point imprecision
 * @param {number} effectiveness Trap power effectiveness
 * @param {number} trapPower Trap power
 * @param {number} trapLuck Trap luck
 * @param {number} mousePower Mouse power
 * @return {number} Catch Rate Estimate: Number between 0 and 1
 */
function calcCR(effectiveness, trapPower, trapLuck, mousePower) {
  // Classic 3-eff formula (deprecated)
  // var catchRate =
  //   (effectiveness * trapPower +
  //     (3 - Math.min(effectiveness, 2)) *
  //       Math.pow(Math.min(effectiveness, 2) * trapLuck, 2)) /
  //   (effectiveness * trapPower + mousePower);

  /**
   * [Under Consideration]
   * Initial ML check using exponent of 2
   * Catch rate computation using exponent of 1.975 to smooth out close-to-ML rates
   */

  var catchRate =
    (effectiveness * trapPower +
      2 * Math.pow(Math.floor(Math.min(effectiveness, 1.4) * trapLuck), 2)) /
    (effectiveness * trapPower + mousePower);

  return Math.min(catchRate, 1);
}

/**
 * Calculates minimum luck required for 100% CR
 * @see calcCR
 * @param {number} effectiveness Trap power effectiveness
 * @param {number} mousePower Mouse power
 * @return {number}
 */
function minLuck(effectiveness, mousePower) {
  // Classic 3-eff derivation (deprecated)
  // var finalEffectiveness = Math.min(effectiveness, 2);
  // var minLuckSquared =
  //   mousePower / (3 - finalEffectiveness) / Math.pow(finalEffectiveness, 2);
  // return Math.ceil(Math.sqrt(minLuckSquared));

  var candidateMinluck = Math.ceil(
    Math.ceil(Math.sqrt(mousePower / 2)) / Math.min(effectiveness, 1.4)
  );

  // If, due to floating-point errors, the candidate minluck is not
  // actually enough, add one. (This is described further in the README.)
  if (calcCR(effectiveness, 0, candidateMinluck, mousePower) < 1) {
    return candidateMinluck + 1
  }
  return candidateMinluck
}

/**
 * Furoma Rift battery change handler
 */
function batteryChanged() {
  var batteryLevel = document.getElementById("battery").value;
  batteryPower = parseInt(batteryLevel) || 0;

  if (batteryPower < 0) {
    batteryPower = 0;
  } else if (batteryPower > 10) {
    batteryPower = 10;
  }
  genericOnChange();
}

/**
 * Returns effectiveness of current power type against a mouse.
 * @param {string} mouseName
 * @return {number}
 */
function findEff(mouseName) {
  if (trapType === "") {
    return 0;
  } else {
    var typeIndex = typeEff[trapType];
    return powersArray[mouseName][typeIndex] / 100;
  }
}

/**
 * Returns baseline attraction rate for a given cheese
 * @param {string} cheese
 * @return {float}
 */
function findBaselineAttraction(cheese) {
  return baselineAttArray[cheese];
}

/**
 * Calculates final attraction rate
 */
function getCheeseAttraction() {
  var baselineAtt = findBaselineAttraction(cheeseName);
  return baselineAtt + trapAtt / 100 - (trapAtt / 100) * baselineAtt;
}

/**
 * Golden Shield change handler
 */
function gsParamCheck() {
  var gsParameter = getURLParameter("gs");
  document.getElementById("gs").checked = ('No' === gsParameter ) ? false : true;
  gsChanged();
}

function getRiftstalkerKey() {
  return "riftstalker-" + user;
}

function riftstalkerParamCheck() {
  var key = getRiftstalkerKey();
  var riftstalkerParam = getURLParameter("riftstalker") !== NULL_URL_PARAM;
  var riftStalkerChecked =
    riftstalkerParam || localStorage.getItem(key) === "true";
  $("#riftstalker").prop("checked", riftStalkerChecked);
  riftstalkerChange();
}

function riftstalkerChange() {
  var key = getRiftstalkerKey();
  riftStalkerCodex = $("#riftstalker").prop("checked");
  localStorage.setItem(key, riftStalkerCodex);
  genericOnChange();
}

function dentureFilterParamCheck() {
  var dentureFilterParam = getURLParameter("dentureFilter") !== NULL_URL_PARAM;
  var dentureFilterChecked =
    dentureFilterParam ||
    localStorage.getItem("best-setup-denture-filter") === "true";
  $("#dentureFilter").prop("checked", dentureFilterChecked);
  dentureFilterChange();
}

function dentureFilterChange() {
  localStorage.setItem(
    "best-setup-denture-filter",
    $("#dentureFilter").prop("checked")
  );
  genericOnChange();
}

function fortRoxParamCheck() {
  updateInputFromParameter("ballistaLevel", genericOnChange);
  updateInputFromParameter("cannonLevel", genericOnChange);
}

function sandCryptsParamCheck() {
  updateInputFromParameter("saltLevel", saltChanged);
}

function valourRiftParamCheck() {
  // Highest Umbra Floor check (for Prestige Base)
  updateInputFromParameter("umbraFloor", umbraChanged);
  umbraFloor = parseInt(localStorage.getItem("tsitu-umbra-floor")) || 0;
  $("#umbraFloor").val(umbraFloor);

  // Floor Type check (for populations)
  var floorType = getURLParameter("vrFloorType");
  if (floorType !== NULL_URL_PARAM) {
    document.querySelector("#vrFloorType").selectedIndex = floorType;
  }
}

function getRankKey() {
  return "rank-" + user;
}

function rankParamCheck() {
  var key = getRankKey();
  rank = getURLParameter("rank") || localStorage.getItem(key) || "";
  document.getElementById("rank").value = rank;
  genericOnChange();
}

function rankChange() {
  var key = getRankKey();
  rank = document.getElementById("rank").value;
  localStorage.setItem(key, rank);
  genericOnChange();
}

function golemParamCheck() {
  var golemParam = getURLParameter("golem_charge");
  if (golemParam) {
    var golemArr = JSON.parse(golemParam);
    if (typeof golemArr === "object" && golemArr.length === 5) {
      golemChargeChange("arcane", golemArr[0]);
      golemChargeChange("forgotten", golemArr[1]);
      golemChargeChange("hydro", golemArr[2]);
      golemChargeChange("physical", golemArr[3]);
      golemChargeChange("tactical", golemArr[4]);
    }

    // CRE <input> update
    if (document.getElementsByClassName("golem-guardian-charge").length === 5) {
      $("#golem-charge-arcane").val(golemArr[0]);
      $("#golem-charge-forgotten").val(golemArr[1]);
      $("#golem-charge-hydro").val(golemArr[2]);
      $("#golem-charge-physical").val(golemArr[3]);
      $("#golem-charge-tactical").val(golemArr[4]);
    }
  }
}

// Update and validate changes in golem charge inputs
function golemChargeChange(type, value) {
  if (typeof value === "string") {
    value = parseFloat(value);
  }

  if (isValid(value)) {
    switch (type) {
      case "arcane":
        localStorage.setItem("golem-charge-arcane", value);
        break;
      case "forgotten":
        localStorage.setItem("golem-charge-forgotten", value);
        break;
      case "hydro":
        localStorage.setItem("golem-charge-hydro", value);
        break;
      case "physical":
        localStorage.setItem("golem-charge-physical", value);
        break;
      case "tactical":
        localStorage.setItem("golem-charge-tactical", value);
        break;
      default:
    }
    calculateTrapSetup();
  }

  function isValid(num) {
    var retBool = false;

    // Validate number between 0-100 and divisible by 0.2
    if (num >= 0 && num <= 100) {
      if ((num * 10) % 2 === 0) retBool = true;
    }

    return retBool;
  }
}

function checkEmpoweredWidget(custom) {
  if (!custom) {
    if (cheeseName === "Brie" || cheeseName === "SB+") {
      $("#empoweredRow").show(500);
    } else {
      $("#empoweredRow").hide();
    }
    updateEmpoweredValue();
  }
}

function updateEmpoweredValue() {
  var select = document.getElementById("empowered");
  isEmpowered = select.value;

  if (
    isEmpowered === "Yes" &&
    (cheeseName === "Brie" || cheeseName === "SB+")
  ) {
    cheeseBonus = 20;
  } else {
    cheeseBonus = 0;
  }

  updateLink();
}

function empoweredChanged() {
  updateEmpoweredValue();
  calculateTrapSetup();
}

function charmChangeCommon(newCharmName) {
  if (newCharmName) {
    charmName = newCharmName;
  }
  updateLink();
  calcSpecialCharms(charmName);
}

/**
 * Populates global variables with charm data
 * @param {string} selectedCharm Name of charm
 */
function populateCharmData(selectedCharm) {
  var charmsArrayN = charmsArray[selectedCharm] || DEFAULT_STATS;
  charmPower = parseInt(charmsArrayN[0]);
  charmBonus = parseInt(charmsArrayN[1]);
  charmAtt = parseInt(charmsArrayN[2]);
  charmLuck = parseInt(charmsArrayN[3]);
  charmEff = parseFreshness[charmsArrayN[4]];
}

/**
 * Populates the global variables for the weapon
 * @param {string} armedWeapon the name of the weapon
 */
function populateWeaponData(armedWeapon) {
  var weaponsArrayN = weaponsArray[armedWeapon] || DEFAULT_STATS;
  trapType = weaponsArrayN[0];
  weaponPower = weaponsArrayN[1];
  weaponBonus = weaponsArrayN[2];
  weaponAtt = weaponsArrayN[3];
  weaponLuck = weaponsArrayN[4];
  weaponEff = parseFreshness[weaponsArrayN[5]];
}

/**
 * Populates the global variables for the base
 * @param {string} armedBase the name of the base
 */
function populateBaseData(armedBase) {
  var basesArrayN = basesArray[armedBase] || DEFAULT_STATS;
  baseName = armedBase;
  basePower = parseInt(basesArrayN[0]);
  baseBonus = parseInt(basesArrayN[1]);
  baseAtt = parseInt(basesArrayN[2]);
  baseLuck = parseInt(basesArrayN[3]);
  baseEff = parseFreshness[basesArrayN[4]];
}

/**
 * Loads a dropdown menu for weapons, bases or charms
 * @param {string} category The items to load. The same as the URL parameter and the item ID
 * @param {string[]} array The item names
 * @param {function} callback A callback fucntion that takes no parameters
 * @param {string} [initialHtml] Optional. Initial html content in the select
 */
function loadDropdown(category, array, callback, initialHtml) {
  var inputElement = document.getElementById(category);
  var dropdownHtml = initialHtml || "";

  for (var key in array) {
    dropdownHtml += "<option>" + array[key] + "</option>\n";
  }

  inputElement.innerHTML = dropdownHtml;

  if (category === "charm" && recentCharm) {
    inputElement.value = recentCharm;
  } else {
    var paramVal = getURLParameter(category);
    inputElement.value = paramVal;
  }

  if (inputElement.selectedIndex === -1) {
    inputElement.selectedIndex = 0;
  }
  callback();
}

/**
 * Load the location drop down list from the population data and select correct location from URL apramters
 */
function loadLocationDropdown() {
  var array = Object.keys(popArray || []);
  array.sort();

  loadDropdown("location", array, locationChanged, "<option></option>");
}

function showTrapSetup() {
  document.getElementById("trapSetup").innerHTML =
    "<tr><td>Type:</td><td>" +
    trapType +
    "<tr><td>Power:</td><td>" +
    commafy(trapPower) +
    "</td></tr>" +
    "<tr><td>Luck:</td><td>" +
    trapLuck +
    "</td></tr><tr><td>Attraction Bonus:</td><td>" +
    parseFloat(trapAtt.toFixed(2)) +
    "%</td></tr>" +
    "<tr><td>Cheese Effect:</td><td>" +
    reverseParseFreshness[trapEff] +
    "</td></tr>";
}

function gsChanged() {
  gsLuck = document.getElementById("gs").checked ? 7 : 0;
  updateLink();
  calculateTrapSetup();
}

function saltChanged() {
  saltLevel = document.getElementById("saltLevel").value;
  genericOnChange();
}

function umbraChanged() {
  umbraFloor = document.getElementById("umbraFloor").value;
  localStorage.setItem("tsitu-umbra-floor", umbraFloor);
  genericOnChange();
}

function getIcebergBase() {
  var autoBase = "";
  if (contains(phaseName, "Magnet")) {
    autoBase = "Magnet Base";
  } else if (contains(phaseName, "Hearthstone")) {
    autoBase = "Hearthstone Base";
  } else if (
    (phaseName === "Bombing Run" ||
      phaseName === "The Mad Depths" ||
      phaseName === "Treacherous Tunnels") &&
    baseName === "Magnet Base"
  ) {
    autoBase = "";
  } else if (
    phaseName === "The Mad Depths" &&
    baseName === "Hearthstone Base"
  ) {
    autoBase = "";
  }

  if (autoBase !== "") {
    var selectBase = document.getElementById("base");
    selectBase.value = autoBase;
    baseChanged();
  }
}

function phaseChanged() {
  (function setPhase() {
    var select = document.getElementById("phase");
    phaseName = select.value;

    if (phaseName === "") {
      phaseName = EMPTY_SELECTION;
    }
  })();

  if (!popArray[locationName][phaseName]) {
    var phases = Object.keys(popArray[locationName]);
    loadDropdown("phase", phases, function() {
      document.getElementById("#phase").selectedIndex = 0;
      setPhase();
    });
  }

  if (user === CRE_USER) getIcebergBase();

  if (locationName === "Twisted Garden" && phaseName === "Poured") {
    pourBonus = 5;
    pourLuck = 5;
    calculateTrapSetup();
  } else {
    pourBonus = 0;
    pourLuck = 0;
    calculateTrapSetup();
  }

  loadCheeseDropdown(locationName, phaseName);
  updateLink();
  checkSpecialCharms();
}

function bonusPowerChanged() {
  var powerInput = parseInt(document.getElementById("bonusPower").value);

  if (powerInput >= 0) {
    bonusPower = powerInput;
  } else if (powerInput < 0) {
    document.getElementById("bonusPower").value = 0;
    bonusPower = 0;
  }

  updateLink();
  calculateTrapSetup();
}

function bonusLuckChanged() {
  var luckInput = parseInt(document.getElementById("bonusLuck").value);

  if (luckInput >= 0) {
    bonusLuck = luckInput;
  } else if (luckInput < 0) {
    document.getElementById("bonusLuck").value = 0;
    bonusLuck = 0;
  }

  updateLink();
  calculateTrapSetup();
}

function empoweredParamCheck() {
  var empoweredParameter = getURLParameter("empowered");
  if (empoweredParameter !== NULL_URL_PARAM) {
    var select = document.getElementById("empowered");
    select.value = empoweredParameter;
    empoweredChanged();
  }
}

/**
 * Show or hide and reset UI widgets based on the selected location:
 *  - All items with the css class display-location are hidden
 *  - Items with proper location-specific custom class are shown (e.g. location-labyrinth)
 *  - If a custom setup is used, don't show the empowered widget
 * @param {boolean} custom
 */
function showHideWidgets(custom) {
  var locationNameClass =
    ".display-" +
    locationName
      .replace(/ /g, "-")
      .replace(/'/g, "")
      .toLowerCase();

  $("#empoweredRow").hide();
  $("#empowered").val("No");
  $("#battery").val(0);
  $("#ampSlider").slider("option", "value", 100);
  $(".display-location").hide();
  $(locationNameClass).show(500);
  checkEmpoweredWidget(custom);
}

function clearResults() {
  var results = document.getElementById("results");
  results.innerHTML = "";
  document.getElementById("sampleScore").innerHTML = "N/A";
}

/**
 * Location change handler
 * - Update location variable
 * - Show/hide widgets
 * - Populate phases
 * - Clear results
 */
function locationChanged() {
  clearResults();
  locationName = document.getElementById("location").value;

  var checked =
    user === CRE_USER && document.getElementById("toggleCustom").checked;
  showHideWidgets(checked);

  updateLink();
  batteryPower = 0;
  ztAmp = 100;

  // Populate sublocation dropdown and select first option
  if (locationName && locationName !== "") {
    populateSublocationDropdown(locationName);
  } else {
    $("#phaseRow").hide();
  }

  function populateSublocationDropdown(locationName) {
    var category = "phase";
    var array = Object.keys(popArray[locationName]) || [EMPTY_SELECTION];
    loadDropdown(category, array, phaseChanged, "");
    if (array.length > 1) {
      $("#phaseRow").show();
    } else {
      $("#phaseRow").hide();
    }
  }

  genericOnChange();
  checkSpecialCharms();
}

function genericOnChange() {
  calculateTrapSetup(false);
  updateLink();
  if (user === CRE_USER) showPop(2);
}

/**
 * Update a text input's value from a URL parameter
 * @param {string} category Input ID / URL parameter
 * @param {function} callback Callback function - usually ends in Change()
 */
function updateInputFromParameter(category, callback) {
  var parameter = getURLParameter(category);
  var input = document.getElementById(category);
  if (parameter && parameter !== NULL_URL_PARAM) {
    input.value = parameter;
    callback();
  }
}

function getSliderValue() {
  var amplifierParameter = parseInt(getURLParameter("amplifier"));
  if (amplifierParameter >= 0 && amplifierParameter <= 175) {
    $("#ampSlider").slider("option", "value", amplifierParameter);
    var myColor = getColor(amplifierParameter);
    $("#ampSlider .ui-slider-range").css("background-color", myColor);
    $("#ampSlider .ui-state-default, .ui-widget-content .ui-state-default").css(
      "background-color",
      myColor
    );
    $("#ampValue").val(amplifierParameter);
    ztAmp = amplifierParameter;
    calculateTrapSetup();
  }
}

function highlightSpecialCharms(charmList) {
  var select = document.getElementById("charm");
  var charmsDropdownHTML = "";

  var charmNames = Object.keys(charmsArray || []);
  var nCharms = charmNames.length;
  for (var c = 0; c < nCharms; c++) {
    charmsDropdownHTML += "<option>" + charmNames[c] + "</option>\n";
  }
  select.innerHTML = "<option>No Charm</option>" + charmsDropdownHTML;

  for (var i = 0; i < charmList.length; i++) {
    for (var j = 0; j < select.children.length; j++) {
      var child = select.children[j];
      var charm = charmList[i] + " Charm";
      if (child.value === charm) {
        child.innerHTML += "*";
        child.value = charm;
        if (child.selected === true) {
          charmName = child.value;
          showPop(2);
        }
        select.innerHTML =
          select.innerHTML.slice(0, 25) +
          "<option>" +
          child.innerHTML +
          "</option>" +
          select.innerHTML.slice(25);
        break;
      }
    }
  }
  selectCharm();
}

function selectCharm() {
  var charmParameter = recentCharm || getURLParameter("charm");
  var specialCharmParameter = charmParameter + "*";
  if (charmParameter !== NULL_URL_PARAM) {
    var select = document.getElementById("charm");
    // TODO: Improve
    for (var i = 0; i < select.children.length; i++) {
      var child = select.children[i];
      if (
        child.innerHTML === charmParameter ||
        child.innerHTML === specialCharmParameter
      ) {
        child.selected = true;
        charmChanged();
        break;
      }
    }
    if (select.selectedIndex === -1) {
      select.selectedIndex = 0;
    }
  }
}

/**
 * Check for special charms and apply asterisk highlighting
 */
function checkSpecialCharms() {
  if (locationName) {
    checkPhase();
    var popArrayLPC = popArray[locationName][phaseName][cheeseName];

    // Highlight special charms
    var specialCharmsList;
    var specialCharms = Object.keys(popArrayLPC || []);
    if (specialCharms.length > 1) {
      highlightSpecialCharms(specialCharms);
    } else if (popArrayLPC !== null && specialCharms[0] !== EMPTY_SELECTION) {
      /**
       * Allow pop with special charm(s) but without a "no charm" pop
       */
      highlightSpecialCharms(specialCharms);
    } else {
      loadCharmDropdown();
    }
  }
}

function checkPhase() {
  if (!phaseName) {
    phaseName = EMPTY_SELECTION;
  }
}

/**
 * Special location/weapon/charm catch rate effects (for a single mouse)
 * @param {number} catchRate
 * @param {string} mouseName
 * @param {number} eff
 * @param {number} mousePower
 * @return {number}
 */
function calcCREffects(catchRate, mouseName, eff, mousePower) {
  var weaponPowerDelta = 0;
  var weaponBonusDelta = 0;
  var charmBonusDelta = 0;
  var tauntBonusDelta = 0;
  if (locationName === "Zugzwang's Tower") {
    if (mouseName === "Technic Pawn") {
      if (weaponName === "Mystic Pawn Pincher") {
        weaponPowerDelta -= 60;
        weaponBonusDelta -= 5;
      } else if (weaponName === "Technic Pawn Pincher") {
        weaponPowerDelta += 10920;
      }
    } else if (mouseName === "Mystic Pawn") {
      if (weaponName === "Mystic Pawn Pincher") {
        weaponPowerDelta += 10920;
      } else if (weaponName === "Technic Pawn Pincher") {
        weaponPowerDelta -= 60;
        weaponBonusDelta -= 5;
      }
    } else if (contains(mouseName, "Mystic")) {
        if (weaponName === "Obvious Ambush Trap") {
        weaponPowerDelta -= 2400;
      } else if (weaponName === "Blackstone Pass Trap") {
        weaponPowerDelta += 1800;
      }
    } else if (contains(mouseName, "Technic")) {
        if (weaponName === "Obvious Ambush Trap") {
        weaponPowerDelta += 1800;
      } else if (weaponName === "Blackstone Pass Trap") {
        weaponPowerDelta -= 2400;
      }
    } if (contains(mouseName, "Rook") && charmName === "Rook Crumble Charm") {
      charmBonusDelta += 300;
    }
  } if (charmName === "Dragonbane Charm" && contains(dragons, mouseName)) {
    charmBonusDelta += 300;
  } if (
    charmName === "Super Dragonbane Charm" && contains(dragons, mouseName)) {
    charmBonusDelta += 600;
  } if (
    charmName === "Extreme Dragonbane Charm" && contains(dragons, mouseName)) {
    charmBonusDelta += 900;
  } if (
    charmName === "Ultimate Dragonbane Charm" && contains(dragons, mouseName)) {
    charmBonusDelta += 1200;
  } if (charmName === "Taunting Charm" && contains(tauntings, mouseName)) {
    var riftCount = getRiftCount(weaponName, baseName, charmName);
    if (riftCount >= 1) tauntBonusDelta += 1;
  } if (locationName === "Fiery Warpath") {
    if (charmName.indexOf("Super Warpath Archer Charm") >= 0) {
      var warpathArcher = ["Desert Archer", "Flame Archer", "Crimson Ranger"];
      if (contains(warpathArcher, mouseName)) {
        charmBonusDelta += 50;
      }
    } if (charmName.indexOf("Super Warpath Warrior Charm") >= 0) {
      var warpathWarrior = ["Desert Soldier", "Flame Warrior", "Crimson Titan"];
      if (contains(warpathWarrior, mouseName)) {
        charmBonusDelta += 50;
      }
    } if (charmName.indexOf("Super Warpath Scout Charm") >= 0) {
      var warpathScout = ["Vanguard", "Sentinel", "Crimson Watch"];
      if (contains(warpathScout, mouseName)) {
        charmBonusDelta += 50;
      }
    } if (charmName.indexOf("Super Warpath Cavalry Charm") >= 0) {
      var warpathCavalry = ["Sand Cavalry", "Sandwing Cavalry"];
      if (contains(warpathCavalry, mouseName)) {
        charmBonusDelta += 50;
      }
    } if (charmName.indexOf("Super Warpath Mage Charm") >= 0) {
      var warpathMage = ["Inferno Mage", "Magmarage"];
      if (contains(warpathMage, mouseName)) {
        charmBonusDelta += 50;
      }
    } if (charmName.indexOf("Super Warpath Commander's Charm") >= 0) {
      if (mouseName === "Crimson Commander") {
        charmBonusDelta += 50;
      }
    }
  }
  if (weaponPowerDelta !== 0 || weaponBonusDelta !== 0 || charmBonusDelta !== 0 || tauntBonusDelta !== 0) {
    weaponPower += weaponPowerDelta;
    weaponBonus += weaponBonusDelta;
    charmBonus += charmBonusDelta;
    tauntBonus += tauntBonusDelta;
    calculateTrapSetup(true);
    catchRate = calcCR(eff, trapPower, trapLuck, mousePower);
    weaponPower -= weaponPowerDelta;
    weaponBonus -= weaponBonusDelta;
    charmBonus -= charmBonusDelta;
    tauntBonus -= tauntBonusDelta;
    calculateTrapSetup(true);
  } else if (locationName === "Sand Crypts") {
    if (mouseName === "King Grub" || mouseName === "King Scarab") {
      var type = mouseName.split("King ")[1];
      var saltedMousePower = calcSaltedPower(type, mousePower);
      catchRate = calcCR(eff, trapPower, trapLuck, saltedMousePower);
    }
  }

  return catchRate;
}

/**
 * Final modifications to catch rate
 * @param {number} catchRate
 * @param {string} mouseName
 * @return {number}
 */
function calcCRMods(catchRate, mouseName) {
  if (
    locationName === "Zugzwang's Tower" ||
    locationName === "Seasonal Garden"
  ) {
    if (ztAmp > 0 && weaponName === "Zugzwang's Ultimate Move") {
      // 50% instant catch for ZUM in ZT/SG
      catchRate += (1 - catchRate) * 0.5;
    }
  } else if (locationName === "Fort Rox") {
    if (
      (contains(wereMice, mouseName) && fortRox.ballistaLevel >= 2) ||
      (contains(cosmicCritters, mouseName) && fortRox.cannonLevel >= 2)
    ) {
      // 50% instant catch for Ballista/Cannon 2 in FR
      catchRate += (1 - catchRate) * 0.5;
    }

    if (
      (fortRox.cannonLevel >= 3 && mouseName === "Nightfire") ||
      (fortRox.ballistaLevel >= 3 && mouseName === "Nightmancer")
    ) {
      catchRate = 1;
    }
  }

  // String.prototype.startsWith polyfill for IE
  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position) {
      position = position || 0;
      return this.indexOf(searchString, position) === position;
    };
  }

  if (weaponName.startsWith("Anniversary")) {
    // 10% instant catch for 10th Anniversary traps
    catchRate += (1 - catchRate) * 0.1;
  }

  if (weaponName === "S.S. Scoundrel Sleigher Trap") {
    if (contains(scoundrelPirateMice, mouseName)) {
      // Guesstimate: 33% instant catch against pirate mice
      catchRate += (1 - catchRate) * 0.33;
    }
  }

  // Miscellaneous modifications
  if (charmName === "Ultimate Charm") {
    catchRate = 1;
  } else if (
    locationName === "Sunken City" &&
    charmName === "Ultimate Anchor Charm" &&
    phaseName !== "Docked"
  ) {
    catchRate = 1;
  } else if (
    mouseName === "Bounty Hunter" &&
    charmName === "Sheriff's Badge Charm"
  ) {
    catchRate = 1;
  } else if (
    mouseName === "Zurreal the Eternal" &&
    weaponName !== "Zurreal's Folly"
  ) {
    catchRate = 0;
  } else if (
    mouseName === "Battering Ram" &&
    weaponName === "Moonbeam Barrier Trap"
  ) {
    catchRate = 1;
  }

  return catchRate;
}

function checkLoadState(type) {
  var loadPercentage = (
    ((popLoaded + wisdomLoaded + sampleLoaded + gpLoaded + peLoaded) / 5) *
    100
  ).toFixed(0);
  var status = document.getElementById("status");
  status.innerHTML = "<td>Loaded " + loadPercentage + "%...</td>";

  if (loadPercentage == 100) {
    loadLocationDropdown();
    empoweredParamCheck();
    getSliderValue();
    updateInputFromParameter("battery", batteryChanged);

    if (type === CRE_USER) {
      loadTourneyDropdown();
      updateInputFromParameter("oil", oilChanged);
    }

    if (type === SETUP_USER) {
      weaponName = getURLParameter("weapon");
      weaponChanged();
      baseName = getURLParameter("base");
      baseChanged();
      dentureFilterParamCheck();
    }

    gsParamCheck();
    riftstalkerParamCheck();
    fortRoxParamCheck();
    sandCryptsParamCheck();
    valourRiftParamCheck();
    rankParamCheck();
    golemParamCheck();

    // Calculate bonuses after param checks are done
    calculateBonusPower();
    calculateBonusLuck();

    status.innerHTML = "<td>All set!</td>";
    setTimeout(function() {
      status.style.display = "none";
    }, 1776);
  }

  function calculateBonusPower() {
    // Called by initial checkLoadState only
    // Skip if location/weapon/base fails b/c invalid trapPower

    var powerBonus = getURLParameter("power_bonus");
    if (powerBonus) calculateTrapSetup();

    var bonusPowerParameter = 0;
    var indexCheck = false;
    var locationIndex = document.getElementById("location").selectedIndex;

    if (type === CRE_USER) {
      var weaponIndex = document.getElementById("weapon").selectedIndex;
      var baseIndex = document.getElementById("base").selectedIndex;
      indexCheck = locationIndex && weaponIndex && baseIndex;
    }

    if (type === SETUP_USER) {
      indexCheck = locationIndex && weaponName && baseName;
    }

    if (indexCheck) {
      bonusPowerParameter =
        parseInt(getURLParameter("bonusPower")) ||
        parseInt(powerBonus) - subtotalPowerBonus;
      if (bonusPowerParameter > 0) {
        document.getElementById("bonusPower").value = bonusPowerParameter;
        bonusPowerChanged();
      }
    }
  }

  function calculateBonusLuck() {
    // Called by initial checkLoadState only
    // Skip if location/weapon/base fails b/c invalid trapLuck

    var totalLuck = getURLParameter("total_luck");
    if (totalLuck) calculateTrapSetup();

    var bonusLuckParameter = 0;
    var indexCheck = false;
    var locationIndex = document.getElementById("location").selectedIndex;

    if (type === CRE_USER) {
      var weaponIndex = document.getElementById("weapon").selectedIndex;
      var baseIndex = document.getElementById("base").selectedIndex;
      indexCheck = locationIndex && weaponIndex && baseIndex;
    }

    if (type === SETUP_USER) {
      indexCheck = locationIndex && weaponName && baseName;
    }

    if (indexCheck) {
      bonusLuckParameter =
        parseInt(getURLParameter("bonusLuck")) ||
        parseInt(totalLuck) - trapLuck;
      if (bonusLuckParameter > 0) {
        document.getElementById("bonusLuck").value = bonusLuckParameter;
        bonusLuckChanged();
      }
    }
  }
}

/**
 * Retrieves and displays sample scores
 */
function formatSampleScore() {
  var str = "";
  var colored = "";
  var scoreDescriptor = "";

  var sampleScoreParam = null;
  var sampleSize = null;
  var sampleCount = null;
  var isSpecial = false;

  var phaseCheeseCharm = phaseName;
  phaseCheeseCharm += ", " + cheeseName;
  if (
    $("#charm option:selected")
      .text()
      .indexOf("*") < 0
  ) {
    phaseCheeseCharm += ", " + "-";
  } else {
    phaseCheeseCharm += ", " + charmName.slice(0, -6);
    isSpecial = true;
  }

  if (locationName && sampleSummary[locationName]) {
    var sampleScore = sampleSummary[locationName][phaseCheeseCharm];
    if (sampleScore) {
      sampleScoreParam = sampleScore.score;
      sampleSize = sampleScore.sample;
      sampleCount = sampleScore.count;
    }
  }

  if (sampleScoreParam) {
    if (sampleScoreParam < 5) {
      str = "very bad";
      colored = str.fontcolor("purple");
    } else if (sampleScoreParam < 10) {
      str = "bad";
      colored = str.fontcolor("red");
    } else if (sampleScoreParam < 15) {
      str = "not good";
      colored = str.fontcolor("dark red");
    } else if (sampleScoreParam < 25) {
      str = "decent";
      colored = str.fontcolor("blue");
    } else if (sampleScoreParam < 50) {
      str = "good";
      colored = str.fontcolor("green");
    } else if (sampleScoreParam < 75) {
      str = "great";
      colored = str.fontcolor("darkgreen");
    } else if (sampleScoreParam >= 75) {
      str = "excellent";
      colored = str.fontcolor("orange");
    }
  } else if (sampleScoreParam === 0) {
    colored = "missing";
  } else {
    scoreDescriptor = "N/A";
  }

  if (sampleScoreParam !== null) {
    scoreDescriptor = sampleScoreParam + "/100 (" + colored + ")";
    scoreDescriptor +=
      " [Sample Size: " + sampleSize + ", Mouse Count: " + sampleCount + ", ";
    scoreDescriptor += isSpecial ? "Special Charm]" : "Common Charm]";
  }

  var ss = document.getElementById("sampleScore");
  if (ss) {
    ss.innerHTML = scoreDescriptor;
  }
}

/**
 * Calculate and update weapon stats for Golem Guardian variants
 * @param {number} charge Float from 0.0% to 100.0% (0.2% increment)
 */
function calcGolemStats(charge) {
  // Initial: 2500 Power, 5% Power Bonus, 5% Attraction Bonus, 3 Luck, Fresh
  weaponPower = (weaponsArray[weaponName][1] - 2500) * charge + 2500;
  weaponBonus = 10 * charge + 5;
  weaponAtt = 15 * charge + 5;
  weaponLuck = Math.floor((weaponsArray[weaponName][4] - 3) * charge + 3);
}

/**
 * Calculate decreased mouse powers for King Grub & Scarab
 * @param {string} type Grub or Scarab
 * @param {number} mousePower Base mouse power value
 * @return {number} Salted/decreased mouse power value
 */
function calcSaltedPower(type, mousePower) {
  var saltedPower = mousePower;
  var saltVal = parseInt(saltLevel, 10) || 0;
  if (saltVal > 0 && saltVal <= 50) {
    if (type === "Grub") {
      saltedPower = 112571 - 27883 * Math.log(saltVal);
    } else if (type === "Scarab") {
      saltedPower = 777879 - 183425 * Math.log(saltVal);
    }
  }

  return saltedPower;
}

/**
 * Calculate Prestige Base bonus stats
 * @param {number} umbraFloor Highest Umbra Floor reached (0-200)
 */
function calcPrestigeStats() {
  // Initial: 490 Power, 20% Power Bonus, 0% Attraction Bonus, 5 Luck, No Effect
  if (umbraFloor > 0 && umbraFloor <= 200) {
    basePower = 490 + umbraFloor * 20;
    baseLuck = 5 + Math.floor(umbraFloor / 8) * 2;
  }
}

/**
 * Rename generic placeholders with precise mouse names based on variables & inputs
 * @param {string} mouseName
 */
function dynamicMouseRename(mouseName) {
  var returnName = mouseName;

  if (locationName === "Valour Rift") {
    var floorNormal = [
      "Puppetto",
      "Cutpurse",
      "Martial",
      "One-Mouse Band",
      "Mouse of Elements",
      "Cursed Crusader",
      "Withered Remains"
    ];

    var floorChamp = [
      "Puppet Champion",
      "Champion Thief",
      "Praetorian Champion",
      "Champion Danseuse",
      "Magic Champion",
      "Fallen Champion Footman",
      "Arch Champion Necromancer"
    ];

    var floorTypeIndex =
      document.querySelector("#vrFloorType").selectedIndex || 0;

    if (mouseName === "Floor Basic") returnName = floorNormal[floorTypeIndex];
    if (mouseName === "Floor Champion") returnName = floorChamp[floorTypeIndex];
  }

  return returnName;
}
