(function() {
  if (!window.jQuery) {
    alert("jQuery is not enabled on this page");
    return;
  }

  var payload = {
    map_id: user.quests.QuestRelicHunter.default_map_id,
    action: "map_info",
    uh: user.unique_hash,
    last_read_journal_entry_id: lastReadJournalEntryId
  };

  function getUncaughtMapMice(map) {
    // Gather IDs of caught mice
    var caughtMice = {};
    if (map.hunters.length > 0) {
      map.hunters.forEach(function(el) {
        var hunterMice = el.completed_goal_ids.mouse;
        if (hunterMice.length > 0) {
          hunterMice.forEach(function(mouseID) {
            caughtMice[mouseID] = 0;
          });
        }
      });
    }

    // Check for existence in caughtMice before pushing
    var uncaughtMice = [];
    if (map.goals.mouse.length > 0) {
      map.goals.mouse.forEach(function(el) {
        if (caughtMice[el.unique_id] === undefined) {
          // Thunderlord lightning emoji edge case
          if (el.name.indexOf("Thunderlord") !== -1) {
            uncaughtMice.push("Thunderlord");
          } else {
            uncaughtMice.push(el.name);
          }
        }
      });
    }

    return uncaughtMice;
  }

  $.post(
    "https://www.mousehuntgame.com/managers/ajax/users/treasuremap.php",
    payload,
    null,
    "json"
  ).done(function(data) {
    if (data) {
      if (!data.treasure_map || data.treasure_map.view_state === "noMap") {
        alert(
          "Please make sure you are logged into MH and are currently on a treasure map"
        );
        return;
      }

      var mice = getUncaughtMapMice(data.treasure_map);
      var url = "https://tsitu.github.io/MH-Tools/map.html";
      url += "?mice=" + encodeURIComponent(mice.join("/"));
      var newWindow = window.open("", "mhmapsolver");
      newWindow.location = url;
    }
  });
})();
