(function() {
    // This file serves as a forward compatability fix for the bm-loader.js when the site was
    // deployed via TravisCI. The old bm-loader looked for the latest SHA on the gh-pages
    // branch (this branch) and then loaded the bm-menu from the CDN using that SHA.
    //
    // Since we use GitHub Actions to directly deploy pages, the SHA does not change and the
    // old bm-loader gets the the bookmarklets deployed by the final TravisCI build.
    //
    // The fix is to put the new bm-loader.js into the bm-menu.js file and force push that one
    // file to the gh-pages branch so that the old bm-loader actually loads the new bm-loader
    // when then loads the current bm-menu.js
    bmLoad();
    function bmLoad() {
      var el = document.createElement("script");
      var cdn =
        "https://cdn.jsdelivr.net/gh/tsitu/MH-Tools@master/src/bookmarklet/bm-menu.min.js";
      el.src = cdn;
      document.body.appendChild(el);
      el.onload = function() {
        el.remove();
      };
    }
  })();
