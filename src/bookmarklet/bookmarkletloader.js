(function() {
  init();

  function init() {
    var jsonTimestamp = new Promise(function(resolve, reject) {
      getLatestSHA().then(function(response) {
        var sha = JSON.parse(response)[0].sha;
        var cdn =
          "https://cdn.rawgit.com/tsitu/MH-Tools/" +
          sha +
          "/data/bookmarklet-timestamps.json";
        var xhr = new XMLHttpRequest();
        xhr.open("GET", cdn);
        xhr.onload = function() {
          resolve(xhr.responseText);
        };
        xhr.onerror = function() {
          reject(xhr.statusText);
        };
        xhr.send();
      });
    });

    jsonTimestamp.then(function(response) {
      buildUI(JSON.parse(response));
    });
  }

  function buildUI(timestamps) {
    var mainDiv = document.createElement("div");
    mainDiv.id = "mht-bookmarklet-loader";
    var loaderTimestamp = "Last updated: " + timestamps["loader"];
    var creTimestamp = "Last updated: " + timestamps["cre"];
    var mapTimestamp = "Last updated: " + timestamps["map"];
    var setupTimestamp = "Last updated: " + timestamps["setup"];
    var analyzerTimestamp = "Last updated: " + timestamps["analyzer"];
    var crownTimestamp = "Last updated: " + timestamps["crown"];
    var craftingTimestamp = "Last updated: " + timestamps["crafting"];

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
      "Version 1.2.2 / Using <a href='https://rawgit.com' target='blank'>RawGit</a>";
    var loaderSpanTimestamp = document.createElement("span");
    loaderSpanTimestamp.style.fontSize = "10px";
    loaderSpanTimestamp.style.fontStyle = "italic";
    loaderSpanTimestamp.innerHTML = loaderTimestamp;

    var creButton = document.createElement("button", { id: "cre-button" });
    creButton.textContent = "Catch Rate Estimator";
    creButton.onclick = function() {
      loadBookmarklet("cre");
    };
    var creSpanTimestamp = document.createElement("span");
    creSpanTimestamp.style.fontSize = "10px";
    creSpanTimestamp.style.fontStyle = "italic";
    creSpanTimestamp.innerHTML = creTimestamp;

    var mapButton = document.createElement("button", { id: "map-button" });
    mapButton.textContent = "Map Solver";
    mapButton.onclick = function() {
      loadBookmarklet("map");
    };
    var mapSpanTimestamp = document.createElement("span");
    mapSpanTimestamp.style.fontSize = "10px";
    mapSpanTimestamp.style.fontStyle = "italic";
    mapSpanTimestamp.innerHTML = mapTimestamp;

    var setupButton = document.createElement("button", { id: "setup-button" });
    setupButton.textContent = "Best Setup";
    setupButton.onclick = function() {
      loadBookmarklet("setup");
    };
    var setupSpanTimestamp = document.createElement("span");
    setupSpanTimestamp.style.fontSize = "10px";
    setupSpanTimestamp.style.fontStyle = "italic";
    setupSpanTimestamp.innerHTML = setupTimestamp;

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
    analyzerSpanTimestamp.innerHTML = analyzerTimestamp;

    var crownButton = document.createElement("button", { id: "crown-button" });
    crownButton.textContent = "Silver Crown Solver";
    crownButton.onclick = function() {
      loadBookmarklet("crown");
    };
    var crownSpanTimestamp = document.createElement("span");
    crownSpanTimestamp.style.fontSize = "10px";
    crownSpanTimestamp.style.fontStyle = "italic";
    crownSpanTimestamp.innerHTML = crownTimestamp;

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
    craftingSpanTimestamp.innerHTML = craftingTimestamp;

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
    mainDiv.appendChild(document.createTextNode("(Drag me around on a PC)"));

    mainDiv.style.backgroundColor = "#F5F5F5";
    mainDiv.style.position = "fixed";
    mainDiv.style.zIndex = "9999";
    // Allow customizable left position property
    mainDiv.style.left = (typeof window.tsitu_loader_offset != 'undefined') ? window.tsitu_loader_offset.concat("%") : "80%";
    mainDiv.style.top = "25px";
    mainDiv.style.border = "solid 3px #696969";
    mainDiv.style.borderRadius = "20px";
    mainDiv.style.padding = "10px";
    mainDiv.style.textAlign = "center";
    document.body.appendChild(mainDiv);
    dragElement(document.getElementById("mht-bookmarklet-loader"));
  }

  function getLatestSHA() {
    // Fetch latest gh-pages commit SHA to use with RawGit CDN since it caches URLs permanently
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        "https://api.github.com/repos/tsitu/MH-Tools/commits?sha=gh-pages"
      );
      xhr.onload = function() {
        resolve(xhr.responseText);
      };
      xhr.onerror = function() {
        reject(xhr.statusText);
      };
      xhr.send();
    });
  }

  function loadBookmarklet(type) {
    getLatestSHA().then(function(response) {
      var sha = JSON.parse(response)[0].sha;
      var el = document.createElement("script");
      var cdn = "https://cdn.rawgit.com/tsitu/MH-Tools/";
      cdn += sha + "/src/bookmarklet/" + type + "bookmarklet.min.js";
      el.src = cdn;
      document.body.appendChild(el);
    });
  }

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
