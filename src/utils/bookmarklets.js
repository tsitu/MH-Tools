var SETUP_BOOKMARKLET_URL = "src/bookmarklet/setupbookmarklet.min.js";
var ANALYZER_BOOKMARKLET_URL = "src/bookmarklet/analyzerbookmarklet.min.js";
var CRE_BOOKMARKLET_URL = "src/bookmarklet/crebookmarklet.min.js";
var MAP_BOOKMARKLET_URL = "src/bookmarklet/mapbookmarklet.min.js";
var CROWN_BOOKMARKLET_URL = "src/bookmarklet/crownbookmarklet.min.js";
var CRAFTING_BOOKMARKLET_URL = "src/bookmarklet/craftingbookmarklet.min.js";
var BOOKMARKLET_LOADER_URL = "src/bookmarklet/bookmarkletloader.min.js";

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
 * @param {function(string)} [callback] Callback function that takes the ajax response data as parameter
 */
function loadBookmarkletFromJS(url, storageKey, linkSelector, callback) {
  $.get(
    url,
    function(data) {
      checkBookmarklet(makeBookmarkletString(data), storageKey);
      if (callback) {
        callback(data);
      }
    },
    "text"
  );

  function checkBookmarklet(bookmarkletString, storageKey) {
    if (bookmarkletString !== localStorage.getItem(storageKey)) {
      var alertString = "";
      if (storageKey === "bookmarkletLoader") {
        alertString = "The Bookmarklet Auto-Loader has been updated!";
      } else if (storageKey) {
        switch (storageKey) {
          case "creBookmarklet":
            alertString = "The Catch Rate Estimator ";
            break;
          case "mapBookmarklet":
            alertString = "The Map Solver ";
            break;
          case "setupBookmarklet":
            alertString = "The Best Setup ";
            break;
          case "analyzerBookmarklet":
            alertString = "The Marketplace Analyzer ";
            break;
          case "crownBookmarklet":
            alertString = "The Silver Crown Solver ";
            break;
          case "craftingBookmarklet":
            alertString = "The Crafting Wizard ";
            break;
        }
        alertString +=
          "bookmarklet has been updated.\nPlease edit accordingly, or try the Auto-Loader!";
      }
      alert(alertString);
      localStorage.setItem(storageKey, bookmarkletString);
    }

    $(linkSelector).attr("href", bookmarkletString);
  }
}
