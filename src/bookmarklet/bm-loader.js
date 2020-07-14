(function() {
  getLatestSHA()
    .then(function(response) {
      if (JSON.parse(response)[0] !== undefined) {
        var sha = JSON.parse(response)[0].sha;
        localStorage.setItem("tsitu-latest-sha", sha);
        bmLoad(sha);
      }
    })
    .catch(function(error) {
      // Fallback to localStorage SHA if GH errors out (e.g. due to rate limits)
      var cacheSha = localStorage.getItem("tsitu-latest-sha");
      if (cacheSha && cacheSha.length > 0) {
        bmLoad(cacheSha);
      }
    });

  /**
   * Load bookmarklet-menu based on specific commit SHA
   * @param {string} sha
   */
  function bmLoad(sha) {
    var el = document.createElement("script");
    var cdn =
      "https://cdn.jsdelivr.net/gh/tsitu/MH-Tools@" +
      sha +
      "/src/bookmarklet/bm-menu.min.js";
    el.src = cdn;
    document.body.appendChild(el);
    el.onload = function() {
      el.remove();
    };
  }

  /**
   * Fetch latest gh-pages commit SHA to use with jsDelivr CDN since it caches URLs permanently
   */
  function getLatestSHA() {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        "https://api.github.com/repos/tsitu/MH-Tools/commits?sha=gh-pages"
      );
      xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE) {
          if (this.status === 200) {
            resolve(xhr.responseText);
          } else {
            reject(this);
          }
        }
      };
      xhr.onerror = function() {
        reject(this);
      };
      xhr.send();
    });
  }
})();
