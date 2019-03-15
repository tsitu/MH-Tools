(function() {
  localStorage.setItem("tsitu-latest-sha", 0);
  var localMenuUrl = localStorage.getItem("tsitu-local-menu-url");
  
  if (localMenuUrl) {
    loadMenu("local");
  } else {
    getLatestSHA().then(loadMenu(response));
  }
  
  function loadMenu(response) {
    if (response === "local") {
      var cdn = localMenuUrl;
    }
    else if (JSON.parse(response)[0] !== undefined) {
      var sha = JSON.parse(response)[0].sha;
      localStorage.setItem("tsitu-latest-sha", sha);

      // Load bookmarklet-menu based on SHA
      var cdn =
        "https://cdn.jsdelivr.net/gh/tsitu/MH-Tools@" +
        sha +
        "/src/bookmarklet/bm-menu.min.js";
    } else {
        console.log("Couldn't find menu url");
        return;
    }
    var el = document.createElement("script");
    el.src = cdn;
    document.body.appendChild(el);
    el.onload = function() {
      el.remove();
    };
  };

  function getLatestSHA() {
    // Fetch latest gh-pages commit SHA to use with jsDelivr CDN since it caches URLs permanently
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
})();
