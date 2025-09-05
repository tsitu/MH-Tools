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
      "Version 1.8.0 / Using <a href='https://www.jsdelivr.com/?docs=gh' target='blank'>jsDelivr</a>";

    // Helper function to create styled timestamp span
    function createTimestampSpan(timeText) {
      const span = document.createElement("span");
      span.style.fontSize = "10px";
      span.style.fontStyle = "italic";
      span.innerHTML = timeText;
      return span;
    }

    // Helper function to create button with its timestamp span
    function createBookmarkletButton(text, type, timestamp) {
      const button = document.createElement("button");
      button.textContent = text;
      button.onclick = function() {
        loadBookmarklet(type);
      };
      return {
        button,
        timestampSpan: createTimestampSpan(timestamp)
      };
    }

    const loaderSpanTimestamp = createTimestampSpan(loaderTime);

    const cre = createBookmarkletButton("Catch Rate Estimator", "cre", creTime);
    const map = createBookmarkletButton("Map: Load Areas", "map", mapTime);
    const setupItems = createBookmarkletButton("Best Setup: Load Items", "setup-items", setupItTime);
    const setupFields = createBookmarkletButton("Best Setup: Fields", "setup-fields", setupFiTime);
    const analyzer = createBookmarkletButton("Marketplace Analyzer", "analyzer", analyzerTime);
    const crown = createBookmarkletButton("Crown Calculator", "crown", crownTime);
    const crafting = createBookmarkletButton("Crafting: Calculator", "crafting", craftingTime);
    const powers = createBookmarkletButton("Powers: Worksheet", "powers", powersTime);

    function addElements(...elements) {
      elements.forEach(el => {
      if (el === 'br') {
        mainDiv.appendChild(document.createElement("br"));
      } else if (typeof el === 'string') {
          mainDiv.appendChild(document.createTextNode(el));
      } else {
        mainDiv.appendChild(el);
      }
      });
    }

    addElements(
      closeButton, 'br', 'br',
      titleSpan, 'br',
      descriptionSpan, 'br',
      loaderSpanTimestamp, 'br', 'br',
      cre.button, 'br',
      cre.timestampSpan, 'br', 'br',
      map.button, 'br',
      map.timestampSpan, 'br', 'br',
      setupItems.button, 'br',
      setupItems.timestampSpan, 'br', 'br',
      setupFields.button, 'br',
      setupFields.timestampSpan, 'br', 'br',
      analyzer.button, 'br',
      analyzer.timestampSpan, 'br', 'br',
      crown.button, 'br',
      crown.timestampSpan, 'br', 'br',
      crafting.button, 'br',
      crafting.timestampSpan, 'br', 'br',
      powers.button, 'br',
      powers.timestampSpan, 'br', 'br',
      "(Drag me around on a PC)"
    );

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
