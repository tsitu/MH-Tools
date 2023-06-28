(function() {
  var crownTypes = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];

  var crownValues = {
    // default, min, max
    Bronze: [1, 1, 9],
    Silver: [90, 10, 99],
    Gold: [400, 100, 499],
    Platinum: [750, 500, 999],
    Diamond: [2000, 1000, 2499]
  };

  function buildUI() {
    if (!window.jQuery) {
      alert("Error: jQuery is not enabled on this page");
      return;
    }

    // Delete existing elements
    document.querySelectorAll(".mht-crown-solver").forEach(function(el) {
      el.remove();
    });

    var crownData = {
      bronze: [],
      silver: [],
      gold: [],
      platinum: [],
      diamond: []
    };

    // Populate 'crownData' catch stats object
    var statsRaw = localStorage.getItem("mh-catch-stats");
    if (statsRaw) {
      var allStats = JSON.parse(statsRaw);
      for (var mouse in allStats) {
        // Search for index of ' Mouse' and trim up to it
        var mouseName = mouse;
        var index = mouse.indexOf(" Mouse");
        if (index > 0) mouseName = mouse.slice(0, index);

        // Skip uber-rare prize mice
        if (mouseName === "Leprechaun" || mouseName === "Mobster") continue;

        // Mouse name edge cases
        if (mouseName === "Dread Pirate") mouseName = "Dread Pirate Mousert";
        if (mouseName.indexOf("Thunderlord") >= 0) mouseName = "Thunderlord";

        var count = allStats[mouse];
        if (count < 10) {
          crownData["bronze"].push([mouseName, count]);
        } else if (count < 100) {
          crownData["silver"].push([mouseName, count]);
        } else if (count < 500) {
          crownData["gold"].push([mouseName, count]);
        } else if (count < 1000) {
          crownData["platinum"].push([mouseName, count]);
        } else if (count < 2500) {
          crownData["diamond"].push([mouseName, count]);
        }
      }
    }

    var mainDiv = document.createElement("div");
    mainDiv.className = "mht-crown-solver";

    var closeButton = document.createElement("button");
    closeButton.innerText = "x";
    closeButton.onclick = function() {
      document.body.removeChild(mainDiv);
    };

    var titleSpan = document.createElement("span");
    titleSpan.style.fontSize = "15px";
    titleSpan.style.fontWeight = "bold";
    titleSpan.appendChild(document.createTextNode("Crown Solver Bookmarklet"));

    var descriptionSpan = document.createElement("span");
    descriptionSpan.innerHTML = "Select desired crown types and cutoff values";

    var checkboxTable = document.createElement("table");
    checkboxTable.style.textAlign = "left";

    var cacheData;
    var cacheRaw = localStorage.getItem("tsitu-bm-crown");
    if (cacheRaw) cacheData = JSON.parse(cacheRaw);

    for (var i = 0; i < crownTypes.length; i++) {
      var crownName = crownTypes[i];
      var crownLower = crownName.toLowerCase();
      var crownTypeSpan = document.createElement("span");
      crownTypeSpan.className = "mht-crown-solver span-" + crownLower;

      var crownBox = document.createElement("input");
      crownBox.type = "checkbox";
      crownBox.className = "mht-crown-solver box-" + crownLower;
      crownBox.name = "mht-crown-solver box-" + crownLower;
      if (cacheData) crownBox.checked = cacheData[crownLower][0];

      var crownBoxLabel = document.createElement("label");
      crownBoxLabel.className = "mht-crown-solver";
      crownBoxLabel.htmlFor = "mht-crown-solver box-" + crownLower;
      crownBoxLabel.innerText = crownName;

      crownTypeSpan.appendChild(crownBox);
      crownTypeSpan.appendChild(crownBoxLabel);

      var crownCutoff = document.createElement("input");
      crownCutoff.type = "number";
      crownCutoff.style.width = "50px";
      crownCutoff.defaultValue = crownValues[crownName][0];
      crownCutoff.min = crownValues[crownName][1];
      crownCutoff.max = crownValues[crownName][2];
      crownCutoff.className = "mht-crown-solver cutoff-" + crownLower;
      crownCutoff.name = "mht-crown-solver cutoff-" + crownLower;
      if (cacheData) crownCutoff.value = cacheData[crownLower][1];

      var tableRow = document.createElement("tr");
      var boxCol = document.createElement("td");
      boxCol.style.paddingLeft = "35px";
      boxCol.style.paddingRight = "20px";
      var cutoffCol = document.createElement("td");
      boxCol.appendChild(crownTypeSpan);
      cutoffCol.appendChild(crownCutoff);
      tableRow.appendChild(boxCol);
      tableRow.appendChild(cutoffCol);
      checkboxTable.appendChild(tableRow);
    }

    // Bottom row operations
    var allCheckbox = document.createElement("input");
    allCheckbox.type = "checkbox";
    allCheckbox.className = "mht-crown-solver box-all";
    allCheckbox.name = "mht-crown-solver box-all";
    allCheckbox.onclick = function() {
      if (document.querySelector(".mht-crown-solver.box-all").checked) {
        document
          .querySelectorAll(
            "input.mht-crown-solver[type='checkbox']:not(.box-all)"
          )
          .forEach(function(el) {
            if (!el.checked) el.checked = true;
          });
      } else {
        document
          .querySelectorAll(
            "input.mht-crown-solver[type='checkbox']:not(.box-all)"
          )
          .forEach(function(el) {
            if (el.checked) el.checked = false;
          });
      }
    };

    var allCheckboxLabel = document.createElement("label");
    allCheckboxLabel.className = "mht-crown-solver";
    allCheckboxLabel.htmlFor = "mht-crown-solver box-all";
    allCheckboxLabel.innerText = "All";

    var revertCutoffButton = document.createElement("button");
    revertCutoffButton.innerText = "Revert";
    revertCutoffButton.onclick = function() {
      document
        .querySelectorAll("input.mht-crown-solver[type='number']")
        .forEach(function(el) {
          var crownNameRaw = el.className.split("cutoff-")[1];
          var crownName =
            crownNameRaw.charAt(0).toUpperCase() + crownNameRaw.slice(1);
          el.value = crownValues[crownName][0];
        });
    };

    var allRow = document.createElement("tr");
    var allCheckCol = document.createElement("td");
    allCheckCol.style.paddingLeft = "35px";
    allCheckCol.style.paddingRight = "20px";
    allCheckCol.appendChild(allCheckbox);
    allCheckCol.appendChild(allCheckboxLabel);
    var revertCutoffCol = document.createElement("td");
    revertCutoffCol.appendChild(revertCutoffButton);
    allRow.appendChild(allCheckCol);
    allRow.appendChild(revertCutoffCol);
    checkboxTable.appendChild(allRow);

    // Last updated timestamp
    var updatedTimestamp = document.createElement("span");
    updatedTimestamp.style.fontSize = "12px";
    var updateText = "Catches last updated: N/A";
    var tsRaw = localStorage.getItem("mh-catch-stats-timestamp");
    if (tsRaw) {
      updateText =
        "Catches last updated:\n" + new Date(parseInt(tsRaw)).toLocaleString();
    }
    updatedTimestamp.innerText = updateText;

    var goButton = document.createElement("button");
    goButton.style.fontWeight = "bold";
    goButton.style.fontSize = "16px";
    goButton.innerText = "Go!";
    goButton.onclick = function() {
      if (statsRaw) {
        var outputObj = {};
        document
          .querySelectorAll(
            "input.mht-crown-solver[type='checkbox']:not(.box-all)"
          )
          .forEach(function(el) {
            if (el.checked) {
              var elName = el.className.split("box-")[1];
              var elNameCap = elName.charAt(0).toUpperCase() + elName.slice(1);
              var cutoffValue = parseInt(
                document.querySelector(".mht-crown-solver.cutoff-" + elName)
                  .value
              );

              if (
                cutoffValue >= crownValues[elNameCap][1] &&
                cutoffValue <= crownValues[elNameCap][2]
              ) {
                for (var i = 0; i < crownData[elName].length; i++) {
                  var mouseData = crownData[elName][i];
                  if (mouseData[1] >= cutoffValue) {
                    outputObj[mouseData[0]] = mouseData[1];
                  }
                }
              }
            }
          });

        var outputLength = Object.keys(outputObj).length;
        if (outputLength === 0) {
          alert("No valid mice to send");
        } else {
          var shouldProceed = true;
          if (outputLength >= 100) {
            shouldProceed = false;
            if (confirm("100 or more mice are about to be sent. Proceed?")) {
              shouldProceed = true;
            }
          }
          if (shouldProceed) {
            // console.log(outputLength);
            // console.log(outputObj);
            var newWindow = window.open("");
            newWindow.name = JSON.stringify(outputObj);
            newWindow.location = "https://tsitu.github.io/MH-Tools/crown.html";
            // newWindow.location = "http://localhost:8000/crown.html";
          }
        }
      } else {
        alert("No catch data found. Please click the 'Fetch' button");
      }
    };

    var fetchButton = document.createElement("button");
    fetchButton.innerText = "Fetch";
    fetchButton.onclick = function() {
      $.post(
        "https://www.mousehuntgame.com/managers/ajax/mice/getstat.php",
        {
          uh: user.unique_hash,
          action: "get_hunting_stats",
        },
        null,
        "json"
      ).done(function(response) {
        if (response) {

          /**
           * @typedef {Object} hunting_stat
           * @property {number} num_catches
           * @property {string} name
           */

          /** @type {hunting_stat[]} */
          var stats = response.hunting_stats

          var catchData = {};
          Object.values(stats).forEach(arr => {
            catchData[arr.name] = arr.num_catches;
          })

          localStorage.setItem("mh-catch-stats", JSON.stringify(catchData));
          localStorage.setItem("mh-catch-stats-timestamp", Date.now());
          buildUI();
        }
      });
    };

    var saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    saveButton.onclick = function() {
      var saveObj = {
        bronze: [undefined, undefined],
        silver: [undefined, undefined],
        gold: [undefined, undefined],
        platinum: [undefined, undefined],
        diamond: [undefined, undefined]
      };

      document
        .querySelectorAll(
          "input.mht-crown-solver[type='checkbox']:not(.box-all)"
        )
        .forEach(function(el) {
          var name = el.className.split("box-")[1];
          saveObj[name][0] = el.checked;
        });

      document
        .querySelectorAll("input.mht-crown-solver[type='number']")
        .forEach(function(el) {
          var name = el.className.split("cutoff-")[1];
          saveObj[name][1] = el.value;
        });

      localStorage.setItem("tsitu-bm-crown", JSON.stringify(saveObj));
    };

    mainDiv.appendChild(closeButton);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(titleSpan);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(descriptionSpan);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(checkboxTable);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(updatedTimestamp);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(goButton);
    mainDiv.appendChild(document.createTextNode("\u00A0"));
    mainDiv.appendChild(fetchButton);
    mainDiv.appendChild(document.createTextNode("\u00A0"));
    mainDiv.appendChild(saveButton);

    mainDiv.style.backgroundColor = "#F5F5F5";
    mainDiv.style.position = "fixed";
    mainDiv.style.zIndex = "9999";
    mainDiv.style.left = "57%";
    mainDiv.style.top = "88px";
    mainDiv.style.border = "solid 3px #696969";
    mainDiv.style.borderRadius = "20px";
    mainDiv.style.padding = "10px";
    mainDiv.style.textAlign = "center";
    document.body.appendChild(mainDiv);
  }

  buildUI();
})();
