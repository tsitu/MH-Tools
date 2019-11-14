(function() {
  // name: type
  var categories = {
    "Indigenous Mice": "common",
    "Dock Dwellers": "dock",
    "Mountain Mice": "mountain",
    "Forest Guild": "forest",
    "Lab Experiments": "lab",
    "Shadow Clan": "shadow",
    "Digby Dirt Dwellers": "dirt",
    "Followers of Furoma": "furoma",
    "The Forgotten Mice": "forgotten",
    "Aquatic Order": "hydro",
    "The Elub Tribe": "elub",
    "The Nerg Tribe": "nerg",
    "The Derr Tribe": "derr",
    "The Dreaded Horde": "dread",
    "Draconic Brood": "dracaonic",
    "Balack's Banished": "balack",
    "Gauntlet Gladiators": "gauntlet",
    "Seasonal Soldiers": "seasonal",
    "Wizard's Pieces": "chess",
    "Zurreal's Breed": "zzlibrary",
    "Icewing's Invasion": "iceberg",
    "Wild Bunch": "wild_bunch",
    "Train Robbers": "train_robbers",
    "Meteorite Miners": "fort_rox",
    "The Marching Flame": "desertarmy",
    "Muridae Market Mice": "desertmarket",
    "Living Garden Mice": "living_garden",
    "Lost City Mice": "lost_city",
    "Sand Dunes Mice": "sand_dunes",
    "Queso Canyoneers": "queso_canyon",
    "Deep Sea Dwellers": "deep_sea_dwellers",
    "Fungal Fiends": "fungal_cavern",
    "Citizens of Zokor": "ancient_city",
    "Moussu Picchu Inhabitants": "moussu_picchu",
    "Rift Walkers": "rift_walkers",
    "Rift Stalkers": "rift_stalkers",
    "The Polluted": "polluted",
    "Event Mice": "event"
  };

  var subcategories = {
    "Indigenous Mice": ["Misc.", "Rare Rodents"],
    "Dock Dwellers": ["Misc."],
    "Mountain Mice": ["Misc."],
    "Forest Guild": ["Misc."],
    "Lab Experiments": ["Misc."],
    "Shadow Clan": ["Misc."],
    "Digby Dirt Dwellers": ["Misc."],
    "Followers of Furoma": ["Misc."],
    "The Forgotten Mice": ["Misc."],
    "Aquatic Order": ["Misc."],
    "The Elub Tribe": ["Misc."],
    "The Nerg Tribe": ["Misc."],
    "The Derr Tribe": ["Misc."],
    "The Dreaded Horde": ["Misc."],
    "Draconic Brood": ["Misc."],
    "Balack's Banished": ["Misc."],
    "Gauntlet Gladiators": [
      "Tier 1: Puppet",
      "Tier 2: Thief",
      "Tier 3: Melee",
      "Tier 4: Bard",
      "Tier 5: Magic",
      "Tier 6: Noble",
      "Tier 7: Dust",
      "Tier 8: The Eclipse"
    ],
    "Seasonal Soldiers": ["Spring", "Summer", "Fall", "Winter"],
    "Wizard's Pieces": ["Misc.", "Mystic", "Technic"],
    "Zurreal's Breed": ["Misc."],
    "Icewing's Invasion": [
      "Misc.",
      "Bergling",
      "Tunnel Rat",
      "Brute",
      "Bomb Squad",
      "Zealot",
      "Icewing's Generals"
    ],
    "Wild Bunch": ["Misc.", "Crew", "Ringleader"],
    "Train Robbers": [
      "Passenger",
      "Depot Worker",
      "Automice",
      "Raider",
      "Fueler"
    ],
    "Meteorite Miners": [
      "Misc.",
      "Weremice",
      "Cosmic Critter",
      "Special",
      "Dawn Destroyer"
    ],
    "The Marching Flame": [
      "Archer",
      "Artillery",
      "Cavalry",
      "Mage",
      "Scout",
      "Warrior",
      "Support",
      "Command"
    ],
    "Muridae Market Mice": ["Misc."],
    "Living Garden Mice": ["Misc."],
    "Lost City Mice": ["Misc."],
    "Sand Dunes Mice": ["Misc."],
    "Queso Canyoneers": [
      "River Riders",
      "Spice Mice",
      "Quarry Quarries",
      "Cork Collector",
      "Pressure Builder",
      "Geyser Hunter"
    ],
    "Deep Sea Dwellers": [
      "Sunken City Citizen",
      "Finned Fiend",
      "Coral Corral",
      "Barnacled Bunch",
      "Scale Society",
      "Treasure Troop",
      "Predator Pack"
    ],
    "Fungal Fiends": [
      "Fungal Fodder",
      "Gruyere Grazer",
      "Mineral Muncher",
      "Gemstone Gorger",
      "Diamond Devourer"
    ],
    "Citizens of Zokor": [
      "Hallway Wanderer",
      "Fungal Farmer",
      "Lost Scholar",
      "Fealty Sworn Soldier",
      "Tech Engineer",
      "Treasure Miser",
      "Hidden Remnant"
    ],
    "Moussu Picchu Inhabitants": [
      "Fungal Feeder",
      "Potion Brewer",
      "Wind Wanderer",
      "Rain Roamer",
      "Storm Dragon"
    ],
    "Rift Walkers": ["Gnawnia Rift", "Burroughs Rift", "Whisker Woods Rift"],
    "Rift Stalkers": ["Bristle Woods Rift", "Furoma Rift", "Valour Rift"],
    "The Polluted": ["Misc."],
    "Event Mice": [
      "Great Winter Hunt",
      "Halloween",
      "Spring Egg Hunt",
      "New Year",
      "Misc.",
      "Prize",
      "Great Gnawnian Games",
      "Birthday",
      "Lunar New Year",
      "Valentine's"
    ]
  };

  var trapTypes = [
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

  buildUI();

  function main(targetGroup, targetSubgroup, riftMultiplier) {
    var payload = genPayload(targetGroup);
    $.post(
      "https://www.mousehuntgame.com/managers/ajax/pages/page.php",
      payload,
      null,
      "json"
    ).done(function(data) {
      if (data) {
        var target;
        var groups = data.page.tabs[0].subtabs[0].categories;
        for (var i = 0; i < groups.length; i++) {
          if (groups[i].initialized && groups[i].status === "active") {
            target = groups[i];
            break;
          }
        }

        // Use selector for trap power because server response is inconsistent
        // Going to another tab and back to Camp borks things up
        var trapType = "";
        var powerStr = $(".campPage-trap-trapStat.power > div:nth-child(2)")
          .map(function() {
            return $(this).context.textContent;
          })
          .toArray()[0];
        var trapPower = parseInt(powerStr.replace(/,/g, ""));

        for (var i = 0; i < trapTypes.length; i++) {
          if (powerStr.indexOf(trapTypes[i]) > -1) {
            trapType = trapTypes[i];
          }
        }

        var outputObj = {}; // to be passed as window.name
        // phase out trap-data with computed power type / total power?
        outputObj["user-data"] = {};
        outputObj["user-data"]["weapon"] = user.weapon_name;
        outputObj["user-data"]["base"] = user.base_name;
        outputObj["user-data"]["charm"] = user.trinket_name
          ? user.trinket_name
          : "Baitkeep Charm"; // Default 0/0 placeholder
        outputObj["user-data"]["power-bonus"] = user.trap_power_bonus;
        outputObj["user-data"]["battery"] = 0;
        outputObj["user-data"]["zt-amp"] = 100;
        outputObj["user-data"]["tg-pour"] = false;
        outputObj["user-data"]["rift-multiplier"] = riftMultiplier;

        outputObj["user-data"]["empowered"] = false;
        if (user.bait_name && user.bait_name.indexOf("Empowered") > -1) {
          outputObj["user-data"]["empowered"] = true;
        }

        var userLocation = user.location;
        var userQuests = user.quests;
        if (userLocation === "Furoma Rift") {
          var chargeLevel =
            userQuests["QuestRiftFuroma"]["droid"]["charge_level"];
          if (chargeLevel !== "") {
            var levels = {
              charge_level_one: 1,
              charge_level_two: 2,
              charge_level_three: 3,
              charge_level_four: 4,
              charge_level_five: 5,
              charge_level_six: 6,
              charge_level_seven: 7,
              charge_level_eight: 8,
              charge_level_nine: 9,
              charge_level_ten: 10
            };
            outputObj["user-data"]["battery"] = levels[chargeLevel];
          }
        } else if (userLocation === "Zugzwang's Tower") {
          outputObj["user-data"]["zt-amp"] =
            user["viewing_atts"]["zzt_amplifier"];
        } else if (userLocation === "Twisted Garden") {
          if (
            userQuests["QuestLivingGarden"]["minigame"]["vials_state"] ===
            "dumped"
          ) {
            outputObj["user-data"]["tg-pour"] = true;
          }
        }

        var currentTime = Date.now();
        outputObj["user-data"]["timestamp"] = currentTime;
        outputObj["user-data"]["dom-trap-type"] = trapType;
        outputObj["user-data"]["dom-trap-power"] = trapPower;
        console.group(
          "Displayed Power: " +
            trapPower +
            " (" +
            trapType +
            ")" +
            " [" +
            new Date(currentTime) +
            "]"
        );
        outputObj["mouse-data"] = {};

        // Target acquired
        for (var i = 0; i < target.subgroups.length; i++) {
          var sub = target.subgroups[i];
          if (targetSubgroup === "All" || targetSubgroup === sub.name) {
            var groupName = target.name + " (" + sub.name + ")";
            outputObj["mouse-data"][groupName] = {};
            console.group("Group: " + groupName);
            for (var j = 0; j < sub.mice.length; j++) {
              var mouse = sub.mice[j];
              var mouseName = mouse.name.trim();
              console.log(mouseName + " (" + mouse.difficulty + ")");
              var mouseObj = {};
              mouseObj["id"] = parseInt(mouse.mouse_id);
              mouseObj["gold"] = parseInt(mouse.gold.replace(/,/g, ""));
              mouseObj["points"] = parseInt(mouse.points.replace(/,/g, ""));
              mouseObj["difficulty"] = mouse.difficulty;
              var effObj = {};
              effObj["Arcane"] = 0;
              effObj["Draconic"] = 0;
              effObj["Forgotten"] = 0;
              effObj["Hydro"] = 0;
              effObj["Parental"] = 0;
              effObj["Physical"] = 0;
              effObj["Shadow"] = 0;
              effObj["Tactical"] = 0;
              effObj["Law"] = 0;
              effObj["Rift"] = 0;

              var notEffArr = trapTypes;
              var effs = mouse.weaknesses;

              // Rough existence checks
              if (Object.keys(effs).length > 0) {
                if (isIterable(effs["effective"])) {
                  for (var k = 0; k < effs["effective"].length; k++) {
                    var e = effs["effective"][k];
                    effObj[e.name] = 100;
                    notEffArr = notEffArr.filter(function(el) {
                      return el !== e.name;
                    });
                  }
                }
                if (isIterable(effs["veryEffective"])) {
                  for (var k = 0; k < effs["veryEffective"].length; k++) {
                    var e = effs["veryEffective"][k];
                    effObj[e.name] = ">100";
                    notEffArr = notEffArr.filter(function(el) {
                      return el !== e.name;
                    });
                  }
                }
                if (isIterable(effs["lessEffective"])) {
                  for (var k = 0; k < effs["lessEffective"].length; k++) {
                    var e = effs["lessEffective"][k];
                    effObj[e.name] = "<100";
                    notEffArr = notEffArr.filter(function(el) {
                      return el !== e.name;
                    });
                  }
                }
                if (isIterable(notEffArr)) {
                  for (var k = 0; k < notEffArr.length; k++) {
                    effObj[notEffArr[k]] = 0;
                  }
                }
              }

              // Populate effs array
              mouseObj["effs"] = [];
              mouseObj["effs"].push(effObj["Arcane"]);
              mouseObj["effs"].push(effObj["Draconic"]);
              mouseObj["effs"].push(effObj["Forgotten"]);
              mouseObj["effs"].push(effObj["Hydro"]);
              mouseObj["effs"].push(effObj["Parental"]);
              mouseObj["effs"].push(effObj["Physical"]);
              mouseObj["effs"].push(effObj["Shadow"]);
              mouseObj["effs"].push(effObj["Tactical"]);
              mouseObj["effs"].push(effObj["Law"]);
              mouseObj["effs"].push(effObj["Rift"]);

              outputObj["mouse-data"][groupName][mouseName] = mouseObj;
            }
            console.groupEnd();
          }
        }

        console.groupEnd();
        var newWindow = window.open("");
        // 200 IQ method to transfer stringified data across origins
        newWindow.name = JSON.stringify(outputObj);
        newWindow.location =
          "https://tsitu.github.io/MH-Tools/powers-worksheet.html";
        // newWindow.location = "http://localhost:8000/powers-worksheet.html";
      }
    });
  }

  /**
   * Generate POST form data
   */
  function genPayload(category) {
    return {
      "page": "Adversaries",
      "page_arguments[tab]": "groups",
      "page_arguments[sub_tab]": "all",
      "page_arguments[category]": categories[category],
      "uh": user.unique_hash
    };
  }

  /**
   * Checks for iterability
   */
  function isIterable(obj) {
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === "function";
  }

  function buildUI() {
    if (!window.jQuery) {
      alert("Error: jQuery is not enabled on this page");
      return;
    }

    if (!$(".campPage-trap-trapStat.power > div:nth-child(2)").length) {
      alert(
        "Error: Can't find total trap power value\n\nPlease make sure you are on the Camp page of mousehuntgame.com and have FreshCoat enabled"
      );
      return;
    }

    var mainDiv = document.createElement("div");
    mainDiv.id = "mht-mouse-powers-tool";

    var closeButton = document.createElement("button");
    closeButton.textContent = "x";
    closeButton.onclick = function() {
      document.body.removeChild(mainDiv);
    };

    var titleSpan = document.createElement("span");
    titleSpan.style.fontSize = "15px";
    titleSpan.style.fontWeight = "bold";
    titleSpan.appendChild(document.createTextNode("Mouse Powers Bookmarklet"));

    var descriptionSpan = document.createElement("span");
    descriptionSpan.innerHTML = "Pick a mouse group and hit Go";

    var subgroupSelect = document.createElement("select");
    subgroupSelect.setAttribute("id", "mouse-subgroup-select");
    subgroupSelect.appendChild(new Option("All", "All"));
    subgroupSelect.appendChild(new Option("Misc.", "Misc."));
    subgroupSelect.appendChild(new Option("Rare Rodents", "Rare Rodents"));

    var groupSelect = document.createElement("select");
    groupSelect.setAttribute("id", "mouse-group-select");
    groupSelect.onchange = function() {
      var selectedGroup = $("#mouse-group-select :selected").text();
      var subgroupz = subcategories[selectedGroup];
      var subgroupSelect = document.getElementById("mouse-subgroup-select");
      if (subgroupSelect) {
        subgroupSelect.innerHTML = "";
        subgroupSelect.appendChild(new Option("All", "All"));
        for (var i = 0; i < subgroupz.length; i++) {
          var group = subgroupz[i];
          subgroupSelect.appendChild(new Option(group, group));
        }
      }
    };

    for (var i = 0; i < Object.keys(categories).length; i++) {
      var group = Object.keys(categories)[i];
      groupSelect.appendChild(new Option(group, group));
    }

    var riftDescription = document.createElement("span");
    riftDescription.innerHTML = "Rift Bonus<br>None / Walker / Stalker";
    var noRiftBonus = document.createElement("input");
    noRiftBonus.setAttribute("type", "radio");
    noRiftBonus.setAttribute("name", "rift-bonus");
    noRiftBonus.setAttribute("value", 0);
    var walkerRiftBonus = document.createElement("input");
    walkerRiftBonus.setAttribute("type", "radio");
    walkerRiftBonus.setAttribute("name", "rift-bonus");
    walkerRiftBonus.setAttribute("value", 1);
    var stalkerRiftBonus = document.createElement("input");
    stalkerRiftBonus.setAttribute("type", "radio");
    stalkerRiftBonus.setAttribute("name", "rift-bonus");
    stalkerRiftBonus.setAttribute("value", 2);
    stalkerRiftBonus.setAttribute("checked", "checked");

    var goButton = document.createElement("button");
    goButton.textContent = "Go";
    goButton.onclick = function() {
      main(
        $("#mouse-group-select :selected").text(),
        $("#mouse-subgroup-select :selected").text(),
        parseInt($("input[name=rift-bonus]:checked").val())
      );
    };

    mainDiv.appendChild(closeButton);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(titleSpan);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(descriptionSpan);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(groupSelect);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(subgroupSelect);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(riftDescription);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(noRiftBonus);
    mainDiv.appendChild(walkerRiftBonus);
    mainDiv.appendChild(stalkerRiftBonus);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(goButton);

    mainDiv.style.backgroundColor = "#F5F5F5";
    mainDiv.style.position = "fixed";
    mainDiv.style.zIndex = "9999";
    mainDiv.style.left = "20%";
    mainDiv.style.top = "88px";
    mainDiv.style.border = "solid 3px #696969";
    mainDiv.style.borderRadius = "20px";
    mainDiv.style.padding = "10px";
    mainDiv.style.textAlign = "center";
    document.body.appendChild(mainDiv);
  }
})();
