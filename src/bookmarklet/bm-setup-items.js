(function() {
  if (location.href.indexOf("mousehuntgame.com") < 0) {
    alert("You are not on mousehuntgame.com! Please try again.");
    return;
  }

  $.post(
    "https://www.mousehuntgame.com/managers/ajax/users/gettrapcomponents.php",
    {
      hg_is_ajax: 1,
      uh: user.unique_hash
    },
    null,
    "json"
  ).done(function(data) {
    var arr = data.components;
    if (arr) {
      var bases = arr
        .filter(function(el) {
          return el.classification === "base" && el.quantity > 0;
        })
        .map(function(el) {
          return el.name;
        });

      // Auto-add Denture Base variants
      if (bases.indexOf("Denture Base") >= 0) {
        bases.push("Denture Base (Toothless)");
      }
      if (bases.indexOf("Signature Series Denture Base") >= 0) {
        bases.push("Signature Series Denture Base (Toothless)");
      }

      var weapons = arr
        .filter(function(el) {
          return el.classification === "weapon" && el.quantity > 0;
        })
        .map(function(el) {
          // Weapon edge cases
          // if (el.name === "Ambush Trap") {
            // return "Ambush";
          // } else if (el.name === "School of Sharks Trap") {
            // return "School of Sharks";
          // }
          return el.name;
        });

      var charms = arr
        .filter(function(el) {
          return el.classification === "trinket" && el.quantity > 0;
        })
        .map(function(el) {
          return el.name;
        });

      console.group("Items Owned");
      console.log("Bases: " + bases.length);
      console.log("Weapons: " + weapons.length);
      console.log("Charms: " + charms.length);
      console.groupEnd();

      // Golem Guardian check
      if (
        weapons.filter(function(el) {
          return el.indexOf("Golem Guardian") >= 0;
        }).length > 0
      ) {
        var skins = arr
          .filter(function(el) {
            return (
              el.classification === "skin" &&
              el.name.indexOf("Golem Guardian") >= 0 &&
              el.quantity > 0
            );
          })
          .map(function(el) {
            return el.power_type_name;
          });

        for (var el of skins) {
          var name = "Golem Guardian " + el + " Trap";
          if (weapons.indexOf(name) < 0) {
            weapons.push(name);
          }
        }
      }

      // Combine into a single object and pass to window.name
      var combinedObj = {};
      combinedObj["bases"] = bases;
      combinedObj["weapons"] = weapons;
      combinedObj["charms"] = charms;

      var newWindow = window.open("");
      newWindow.name = JSON.stringify(combinedObj);
      newWindow.location = "https://tsitu.github.io/MH-Tools/setup.html";
    }
  });
})();
