(async function() {
  let timestamps = {};
  try {
    const response = await fetch("https://tsitu.github.io/MH-Tools/data/json/bookmarklet-timestamps.json");
    timestamps = await response.json();
  } catch { }

  buildUI(timestamps);

  function buildUI(timestamps) {
    var mainDiv = document.createElement("div");
    mainDiv.id = "mht-bookmarklet-loader";
    var loaderTime = "Last updated: " + (timestamps["menu"] || "N/A");
    var creTime = "Last updated: " + (timestamps["cre"] || "N/A");
    var mapTime = "Last updated: " + (timestamps["map"] || "N/A");
    var setupItTime = "Last updated: " + (timestamps["setup_items"] || "N/A");
    var setupFiTime = "Last updated: " + (timestamps["setup_fields"] || "N/A");
    var analyzerTime = "Last updated: " + (timestamps["analyzer"] || "N/A");
    var crownTime = "Last updated: " + (timestamps["crown"] || "N/A");
    var craftingTime = "Last updated: " + (timestamps["crafting"] || "N/A");
    var powersTime = "Last updated: " + (timestamps["powers"] || "N/A");

    var closeButton = document.createElement("button", { id: "close-button" });
    closeButton.textContent = "x";
    closeButton.onclick = function() {
      document.body.removeChild(mainDiv);
    };

    var titleSpan = document.createElement("span");
    titleSpan.style.fontSize = "15px";
    titleSpan.style.fontWeight = "bold";
    titleSpan.appendChild(document.createTextNode("MH Tools Bookmarklets"));

    var descriptionSpan = document.createElement("span");
    descriptionSpan.innerHTML =
      "Version 1.7.0 / Using <a href='https://www.jsdelivr.com/?docs=gh' target='blank'>jsDelivr</a>";
    var loaderSpanTimestamp = document.createElement("span");
    loaderSpanTimestamp.style.fontSize = "10px";
    loaderSpanTimestamp.style.fontStyle = "italic";
    loaderSpanTimestamp.innerHTML = loaderTime;

    var creButton = document.createElement("button", { id: "cre-button" });
    creButton.textContent = "Catch Rate Estimator";
    creButton.onclick = function() {
      loadBookmarklet("cre");
    };
    var creSpanTimestamp = document.createElement("span");
    creSpanTimestamp.style.fontSize = "10px";
    creSpanTimestamp.style.fontStyle = "italic";
    creSpanTimestamp.innerHTML = creTime;

    var mapButton = document.createElement("button", { id: "map-button" });
    mapButton.textContent = "Map Solver";
    mapButton.onclick = function() {
      loadBookmarklet("map");
    };
    var mapSpanTimestamp = document.createElement("span");
    mapSpanTimestamp.style.fontSize = "10px";
    mapSpanTimestamp.style.fontStyle = "italic";
    mapSpanTimestamp.innerHTML = mapTime;

    var setupButton = document.createElement("button", { id: "setup-button" });
    setupButton.textContent = "Best Setup: Load Items";
    setupButton.onclick = function() {
      loadBookmarklet("setup-items");
    };
    var setupSpanTimestamp = document.createElement("span");
    setupSpanTimestamp.style.fontSize = "10px";
    setupSpanTimestamp.style.fontStyle = "italic";
    setupSpanTimestamp.innerHTML = setupItTime;

    var setupFieldsButton = document.createElement("button", {
      id: "setup-fields-button"
    });
    setupFieldsButton.textContent = "Best Setup: Fields";
    setupFieldsButton.onclick = function() {
      loadBookmarklet("setup-fields");
    };
    var setupFieldsSpanTimestamp = document.createElement("span");
    setupFieldsSpanTimestamp.style.fontSize = "10px";
    setupFieldsSpanTimestamp.style.fontStyle = "italic";
    setupFieldsSpanTimestamp.innerHTML = setupFiTime;

    var analyzerButton = document.createElement("button", {
      id: "analyzer-button"
    });
    analyzerButton.textContent = "Marketplace Analyzer";
    analyzerButton.onclick = function() {
      loadBookmarklet("analyzer");
    };
    var analyzerSpanTimestamp = document.createElement("span");
    analyzerSpanTimestamp.style.fontSize = "10px";
    analyzerSpanTimestamp.style.fontStyle = "italic";
    analyzerSpanTimestamp.innerHTML = analyzerTime;

    var crownButton = document.createElement("button", { id: "crown-button" });
    crownButton.textContent = "Crown Solver";
    crownButton.onclick = function() {
      loadBookmarklet("crown");
    };
    var crownSpanTimestamp = document.createElement("span");
    crownSpanTimestamp.style.fontSize = "10px";
    crownSpanTimestamp.style.fontStyle = "italic";
    crownSpanTimestamp.innerHTML = crownTime;

    var craftingButton = document.createElement("button", {
      id: "crafting-button"
    });
    craftingButton.textContent = "Crafting Wizard";
    craftingButton.onclick = function() {
      loadBookmarklet("crafting");
    };
    var craftingSpanTimestamp = document.createElement("span");
    craftingSpanTimestamp.style.fontSize = "10px";
    craftingSpanTimestamp.style.fontStyle = "italic";
    craftingSpanTimestamp.innerHTML = craftingTime;

    var powersButton = document.createElement("button", {
      id: "powers-button"
    });
    powersButton.textContent = "Powers: Worksheet";
    powersButton.onclick = function() {
      loadBookmarklet("powers");
    };
    var powersSpanTimestamp = document.createElement("span");
    powersSpanTimestamp.style.fontSize = "10px";
    powersSpanTimestamp.style.fontStyle = "italic";
    powersSpanTimestamp.innerHTML = powersTime;

    mainDiv.appendChild(closeButton);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(titleSpan);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(descriptionSpan);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(loaderSpanTimestamp);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(creButton);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(creSpanTimestamp);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(mapButton);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(mapSpanTimestamp);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(setupButton);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(setupSpanTimestamp);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(setupFieldsButton);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(setupFieldsSpanTimestamp);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(analyzerButton);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(analyzerSpanTimestamp);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(crownButton);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(crownSpanTimestamp);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(craftingButton);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(craftingSpanTimestamp);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(powersButton);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(powersSpanTimestamp);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createTextNode("(Drag me around on a PC)"));

    mainDiv.style.color = "var(--d-text, rgba(0,0,0,0.87))";
    mainDiv.style.backgroundColor = "var(--d-bg, #F2F2F2)";
    mainDiv.style.position = "fixed";
    mainDiv.style.zIndex = "9999";
    // Allow customizable left position property
    mainDiv.style.left =
      typeof window.tsitu_loader_offset != "undefined"
        ? window.tsitu_loader_offset.concat("%")
        : "80%";
    mainDiv.style.top = "25px";
    mainDiv.style.border = "solid 3px var(--d-border, #696969)";
    mainDiv.style.borderRadius = "20px";
    mainDiv.style.padding = "10px";
    mainDiv.style.textAlign = "center";
    document.body.appendChild(mainDiv);
    dragElement(document.getElementById("mht-bookmarklet-loader"));
    locationQuickWiki();
  }

  /**
   * Adds a click handler to HUD location name that opens corresponding MHWiki link
   */
  function locationQuickWiki() {
    var locationEl = document.querySelector(".mousehuntHud-environmentIcon");
    if (locationEl && !locationEl.onclick) {
      locationEl.onclick = function() {
        var locationName = user.environment_name;
        if (locationName === "SUPER|brie+ Factory") {
          locationName = "MouseHunt_Birthday"; // SB+ Factory workaround
        }
        var newWindow = window.open("");
        newWindow.location = `https://mhwiki.hitgrab.com/wiki/index.php/${locationName.replace(
          " ",
          "_"
        )}`;
      };
      locationEl.style.cursor = "pointer";

      // innerHTML is more elegant but impractical since the game updates it on location changes
      // locationEl.innerHTML = `<a href='https://mhwiki.hitgrab.com/wiki/index.php/${locationName.replace(
      //   " ",
      //   "_"
      // )}' target='_blank'>${locationEl.innerHTML}</a>`;
    }
  }

  /**
   * Fetches & executes specified bookmarklet variant
   * @param {string} type
   */
  function loadBookmarklet(type) {
    var el = document.createElement("script");
    var cdn =
      "https://cdn.jsdelivr.net/gh/tsitu/MH-Tools@master/src/bookmarklet/bm-" +
      type +
      ".min.js";
    el.src = cdn;
    document.body.appendChild(el);
    el.onload = function() {
      el.remove();
    };
  }

  /**
   * Element dragging functionality
   * @param {HTMLElement} el
   */
  function dragElement(el) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.getElementById(el.id + "header")) {
      document.getElementById(el.id + "header").onmousedown = dragMouseDown;
    } else {
      el.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      el.style.top = el.offsetTop - pos2 + "px";
      el.style.left = el.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
})();
