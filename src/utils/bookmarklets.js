var BOOKMARKLET_URLS = {
  analyzer: "src/bookmarklet/bm-analyzer.min.js",
  crafting: "src/bookmarklet/bm-crafting.min.js",
  cre: "src/bookmarklet/bm-cre.min.js",
  crown: "src/bookmarklet/bm-crown.min.js",
  loader: "src/bookmarklet/bm-loader.min.js",
  map: "src/bookmarklet/bm-map.min.js",
  menu: "src/bookmarklet/bm-menu.min.js",
  powers: "src/bookmarklet/bm-powers.min.js",
  setup_fields: "src/bookmarklet/bm-setup-fields.min.js",
  setup_items: "src/bookmarklet/bm-setup-items.min.js"
};

/**
 * Escape special characters and prepend javascript:void to the string
 * @param {string} content
 * @return {string}
 */
function makeBookmarkletString(content) {
  return "javascript:void" + encodeURI(" " + content);
}
/**
 * Loads bookmarklet content from a js file into an html element's href attribute
 * @param {string} url
 * @param {string} storageKey
 * @param {string} linkSelector
 */
function loadBookmarkletFromJS(url, storageKey, linkSelector) {
  $.get(
    url,
    function(data) {
      checkBookmarklet(makeBookmarkletString(data), storageKey);
    },
    "text"
  );

  function checkBookmarklet(bookmarkletString, storageKey) {
    var keyMap = {
      bookmarkletLoader: "Auto-Loader",
      creBookmarklet: "Catch Rate Estimator",
      mapBookmarklet: "Map Solver",
      setupBookmarklet: "Best Setup: Load Items",
      setupFieldsBookmarklet: "Best Setup: Fields",
      analyzerBookmarklet: "Marketplace Analyzer",
      crownBookmarklet: "Crown Solver",
      craftingBookmarklet: "Crafting Wizard",
      powersBookmarklet: "Powers Worksheet"
    };

    if (bookmarkletString !== localStorage.getItem(storageKey)) {
      var alertString =
        "The " + keyMap[storageKey] + " bookmarklet has been updated.";
      if (storageKey !== "bookmarkletLoader") {
        alertString += "\nPlease edit accordingly, or try the Auto-Loader!";
      }
      alert(alertString);
      localStorage.setItem(storageKey, bookmarkletString);
    }

    $(linkSelector).attr("href", bookmarkletString);
    $(linkSelector + "Copy").click(function() {
      var tempCopyArea = document.createElement("textarea");
      tempCopyArea.style.position = "fixed";
      tempCopyArea.style.top = 0;
      tempCopyArea.style.left = 0;
      tempCopyArea.style.width = "2em";
      tempCopyArea.style.height = "2em";
      tempCopyArea.style.padding = 0;
      tempCopyArea.style.border = "none";
      tempCopyArea.style.outline = "none";
      tempCopyArea.style.boxShadow = "none";
      tempCopyArea.style.background = "transparent";
      tempCopyArea.value = bookmarkletString;
      document.body.appendChild(tempCopyArea);
      tempCopyArea.focus();
      tempCopyArea.select();

      var copySuccess = document.execCommand("copy");
      if (copySuccess) {
        alert(
          "The " +
            keyMap[storageKey] +
            " bookmarklet was copied to your clipboard."
        );
      } else {
        alert("Failed to copy bookmarklet to clipboard.");
      }
      document.body.removeChild(tempCopyArea);
    });
  }
}
