"use strict";


/**
 * @typedef {Object} Listing
 * @property {string} name
 * @property {string} action
 * @property {number} quantity
 * @property {number} total
 * @property {number} unit
 * @property {number} tariff
 * @property {string} date
 */

window.onload = function() {
  loadBookmarkletFromJS(
    BOOKMARKLET_URLS["loader"],
    "bookmarkletLoader",
    "#bookmarkletloader"
  );
  loadBookmarkletFromJS(
    BOOKMARKLET_URLS["analyzer"],
    "analyzerBookmarklet",
    "#bookmarklet"
  );

  // Process window.name data
  if (window.name) {
    try {
      const inputObj = JSON.parse(window.name);
      if (validateJsonData(inputObj)) {
        const classicObj = {};
        classicObj["listings"] = inputObj;
        classicObj["DATA_VERSION"] = "3.0";

        localStorage.setItem("marketplaceData", JSON.stringify(classicObj));
        window.name = ""; // Reset name after capturing data
      } else {
        throw new TypeError("JSON format invalid or corrupted");
      }
    } catch (e) {
      console.error(`(Error in window.name) - ${e.stack}`);
    }
  }

  // Initialize tablesorter, bind to table
  $.tablesorter.defaults.sortInitialOrder = "desc";
  $("#table")
    .tablesorter({
      sortReset: true,
      widthFixed: true,
      ignoreCase: false,
      widgets: ["filter", "pager"],
      widgetOptions: {
        filter_childRows: false,
        filter_childByColumn: false,
        filter_childWithSibs: true,
        filter_columnFilters: true,
        filter_columnAnyMatch: true,
        filter_cellFilter: "",
        filter_cssFilter: "", // or []
        filter_defaultFilter: {},
        filter_excludeFilter: {},
        filter_external: "",
        filter_filteredRow: "filtered",
        filter_formatter: null,
        filter_functions: null,
        filter_hideEmpty: true,
        filter_hideFilters: true,
        filter_ignoreCase: true,
        filter_liveSearch: true,
        filter_matchType: { input: "exact", select: "exact" },
        filter_onlyAvail: "filter-onlyAvail",
        filter_placeholder: { search: "Filter results...", select: "" },
        filter_reset: "button.reset",
        filter_resetOnEsc: true,
        filter_saveFilters: false,
        filter_searchDelay: 420,
        filter_searchFiltered: true,
        filter_selectSource: null,
        filter_serversideFiltering: false,
        filter_startsWith: false,
        filter_useParsedData: false,
        filter_defaultAttrib: "data-value",
        filter_selectSourceSeparator: "|",
        pager_output: "{startRow:input} to {endRow} of {totalRows} rows", // '{page}/{totalPages}'

        pager_updateArrows: true,
        pager_startPage: 0,
        pager_size: 10,
        pager_savePages: false,
        pager_fixedHeight: false,
        pager_removeRows: false, // removing rows in larger tables speeds up the sort
        pager_ajaxUrl: null,
        pager_customAjaxUrl: function(table, url) {
          return url;
        },
        pager_ajaxError: null,
        pager_ajaxObject: {
          dataType: "json"
        },
        pager_ajaxProcessing: function(ajax) {
          return [0, [], null];
        },
        // css class names that are added
        pager_css: {
          container: "tablesorter-pager", // class added to make included pager.css file work
          errorRow: "tablesorter-errorRow", // error information row (don't include period at beginning); styled in theme file
          disabled: "disabled" // class added to arrows @ extremes (i.e. prev/first arrows "disabled" on first page)
        },
        // jQuery selectors
        pager_selectors: {
          container: ".dataPager", // target the pager markup (wrapper)
          first: ".first", // go to first page arrow
          prev: ".prev", // previous page arrow
          next: ".next", // next page arrow
          last: ".last", // go to last page arrow
          gotoPage: ".gotoPage", // go to page selector - select dropdown that sets the current page
          pageDisplay: ".pagedisplay", // location of where the "output" is displayed
          pageSize: ".pagesize" // page size selector - select dropdown that sets the "size" option
        }
      }
    })
    .bind("pagerChange pagerComplete pagerInitialized pageMoved", function(
      e,
      c
    ) {
      let p = c.pager, // NEW with the widget... it returns config, instead of config.pager
        msg =
          '"</span> event triggered, ' +
          (e.type === "pagerChange" ? "going to" : "now on") +
          ' page <span class="typ">' +
          (p.page + 1) +
          "/" +
          p.totalPages +
          "</span>";
      $("#display")
        .append('<li><span class="str">"' + e.type + msg + "</li>")
        .find("li:first")
        .remove();
    });

  $("#itemSummaryTable")
    .tablesorter({
      sortReset: true,
      widthFixed: true,
      ignoreCase: false,
      widgets: ["filter", "pager"],
      widgetOptions: {
        filter_childRows: false,
        filter_childByColumn: false,
        filter_childWithSibs: true,
        filter_columnFilters: true,
        filter_columnAnyMatch: true,
        filter_cellFilter: "",
        filter_cssFilter: "", // or []
        filter_defaultFilter: {},
        filter_excludeFilter: {},
        filter_external: "",
        filter_filteredRow: "filtered",
        filter_formatter: null,
        filter_functions: null,
        filter_hideEmpty: true,
        filter_hideFilters: true,
        filter_ignoreCase: true,
        filter_liveSearch: true,
        filter_matchType: { input: "exact", select: "exact" },
        filter_onlyAvail: "filter-onlyAvail",
        filter_placeholder: { search: "Filter results...", select: "" },
        filter_reset: "button.reset",
        filter_resetOnEsc: true,
        filter_saveFilters: false,
        filter_searchDelay: 420,
        filter_searchFiltered: true,
        filter_selectSource: null,
        filter_serversideFiltering: false,
        filter_startsWith: false,
        filter_useParsedData: false,
        filter_defaultAttrib: "data-value",
        filter_selectSourceSeparator: "|",
        pager_output: "{startRow:input} to {endRow} of {totalRows} rows", // '{page}/{totalPages}'

        pager_updateArrows: true,
        pager_startPage: 0,
        pager_size: 10,
        pager_savePages: false,
        pager_fixedHeight: false,
        pager_removeRows: false, // removing rows in larger tables speeds up the sort
        pager_ajaxUrl: null,
        pager_customAjaxUrl: function(table, url) {
          return url;
        },
        pager_ajaxError: null,
        pager_ajaxObject: {
          dataType: "json"
        },
        pager_ajaxProcessing: function(ajax) {
          return [0, [], null];
        },
        // css class names that are added
        pager_css: {
          container: "tablesorter-pager", // class added to make included pager.css file work
          errorRow: "tablesorter-errorRow", // error information row (don't include period at beginning); styled in theme file
          disabled: "disabled" // class added to arrows @ extremes (i.e. prev/first arrows "disabled" on first page)
        },
        // jQuery selectors
        pager_selectors: {
          container: ".itemPager", // target the pager markup (wrapper)
          first: ".first", // go to first page arrow
          prev: ".prev", // previous page arrow
          next: ".next", // next page arrow
          last: ".last", // go to last page arrow
          gotoPage: ".gotoPage", // go to page selector - select dropdown that sets the current page
          pageDisplay: ".pagedisplay", // location of where the "output" is displayed
          pageSize: ".pagesize" // page size selector - select dropdown that sets the "size" option
        }
      }
    })
    .bind("pagerChange pagerComplete pagerInitialized pageMoved", function(
      e,
      c
    ) {
      let p = c.pager, // NEW with the widget... it returns config, instead of config.pager
        msg =
          '"</span> event triggered, ' +
          (e.type === "pagerChange" ? "going to" : "now on") +
          ' page <span class="typ">' +
          (p.page + 1) +
          "/" +
          p.totalPages +
          "</span>";
      $("#display")
        .append('<li><span class="str">"' + e.type + msg + "</li>")
        .find("li:first")
        .remove();
    });

  $("#overallSummaryTable").tablesorter({
    sortReset: true,
    widthFixed: true,
    ignoreCase: false
  });

  $("#resetButton").click(function() {
    const reset = confirm(
      "Are you sure you want to reset the data in this tool?"
    );
    if (reset) {
      const storedData = localStorage.getItem("marketplaceData");
      if (storedData) {
        localStorage.removeItem("marketplaceData");
      }
      location.reload();
    }
  });

  // Check for old URL parameters and alert if present
  const rawDataArray = getDataFromURL(
    window.location.search.match(/data=([^&]*)/)
  );
  const isDone = getDataFromURL(window.location.search.match(/isDone=([^&]*)/));
  if (rawDataArray.length > 0 && isDone.length > 0) {
    alert("Please upgrade to the new (and much-improved) bookmarklet!");
  }

  // Check for old data format
  const storedData = localStorage.getItem("marketplaceData");
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    if (!parsedData.hasOwnProperty("DATA_VERSION") || Number.parseFloat(parsedData["DATA_VERSION"]) < 3.0 ) {
      alert(
        "Old data format detected!\nPlease upgrade to the new bookmarklet and re-import your data.\nSorry for the inconvenience."
      );
    } else if (parsedData["DATA_VERSION"] === "3.0") {
      showTable(parsedData);
      showItemSummary(parsedData);
      showOverallSummary(parsedData);
    }
  } else {
    alert("No data detected. Please run the bookmarklet to import some in!");
  }
};

/**
 * @param {Object} dataObject
 * @param {Listing[]} dataObject.listings
 * @param {string} dataObject.DATA_VERSION
 */
function showTable(dataObject) {
  $("#tableContainer").show(500);
  const table = document.getElementById("table");
  table.innerHTML = "";
  let tableHTML =
    "<thead><tr><th id='dateClosed'>Date Closed</th><th>Item Name</th><th data-filter='false'>Action</th><th data-filter='false'>Quantity</th><th data-filter='false'>Unit Price</th><th data-filter='false'>Tariff</th><th data-filter='false'>Total</th></tr></thead><tbody>";

  dataObject.listings.forEach(listing => {
    const tariff = listing.action === "buy" ? listing.tariff : 0;
    const action = listing.action.charAt(0).toUpperCase() + listing.action.slice(1);

    tableHTML += `<tr><td>${listing.date}</td><td>${listing.name}</td><td>${action}</td><td>${commafy(
      listing.quantity
    )}</td><td>${commafy(listing.unit)}</td><td>${commafy(
      tariff
    )}</td><td>${commafy(listing.total)}</td></tr>`;
  });

  tableHTML += "</tbody>";
  table.innerHTML = tableHTML;

  const resort = true,
    callback = function() {
      const header = $("#dateClosed");
      if (header.hasClass("tablesorter-headerAsc")) {
        header.click();
        header.click();
      } else if (header.hasClass("tablesorter-headerUnSorted")) {
        header.click();
      }
    };
  $("#table").trigger("updateAll", [resort, callback]);
}

/**
 * @param {Object} dataObject
 * @param {Listing[]} dataObject.listings
 * @param {string} dataObject.DATA_VERSION
 */
function showItemSummary(dataObject) {
  $("#itemSummaryContainer").show(500);
  const table = document.getElementById("itemSummaryTable");
  table.innerHTML = "";
  let tableHTML =
    "<thead><tr><th>Item Name</th><th data-filter='false'>Action</th><th data-filter='false'>Transactions</th><th data-filter='false'>Quantity</th><th data-filter='false'>Transaction (Avg)</th><th data-filter='false'>Price (Avg)</th><th data-filter='false'>Unit Price (Low)</th><th data-filter='false'>Unit Price (High)</th><th data-filter='false'>Unit Price (Avg)</th><th id='itemSummaryAction' data-filter='false'>Amount</th><th data-filter='false'>Tariffs</th></tr></thead><tbody>";

  /** @type {Object<string, Listing[]} */
  const listingsGroupedByName = dataObject.listings.reduce((acc, listing) => {
    acc[listing.name] = acc[listing.name] || [];
    acc[listing.name].push(listing);

    return acc;
  }, {})

  for (let listings of Object.values(listingsGroupedByName)) {
    const name = listings[0].name;
    let totalSellQuantity = 0,
      totalBuyQuantity = 0;
    let sellCounter = 0,
      buyCounter = 0;
    let totalSellUnitPrice = 0,
      totalBuyUnitPrice = 0;
    let totalSellAmt = 0,
      totalBuyAmt = 0;
    let lowSellUnitPrice = 0,
      lowBuyUnitPrice = 0;
    let highSellUnitPrice = 0,
      highBuyUnitPrice = 0;
    let totalTariffs = 0;


    listings.forEach(listing => {
      switch (listing.action) {
        case "sell":
          sellCounter++;
          totalSellQuantity += listing.quantity;
          totalSellUnitPrice += listing.unit;
          totalSellAmt += listing.total;
          if (lowSellUnitPrice == 0 || listing.unit < lowSellUnitPrice) {
            lowSellUnitPrice = listing.unit;
          }
          if (listing.unit > highSellUnitPrice) {
            highSellUnitPrice = listing.unit;
          }
          break;
        case "buy":
          buyCounter++;
          totalBuyQuantity += listing.quantity;
          totalBuyUnitPrice += listing.unit;
          totalBuyAmt += listing.total;
          if (lowBuyUnitPrice == 0 || listing.unit < lowBuyUnitPrice) {
            lowBuyUnitPrice = listing.unit;
          }
          if (listing.unit > highBuyUnitPrice) {
            highBuyUnitPrice = listing.unit;
          }
          totalTariffs += listing.tariff;
          break;
      }
    });

    const avgTxSell = totalSellAmt / sellCounter;
    const avgTxBuy = totalBuyAmt / buyCounter;
    const avgSellPrice = totalSellAmt / totalSellQuantity;
    const avgBuyPrice = totalBuyAmt / totalBuyQuantity;
    const avgSellUnitPrice = totalSellUnitPrice / sellCounter;
    const avgBuyUnitPrice = totalBuyUnitPrice / buyCounter;

    if (sellCounter > 0) {
      tableHTML += `<tr><td>${name}</td><td>Sell</td><td>${sellCounter}</td><td>${commafy(
        totalSellQuantity
      )}</td><td>${commafy(avgTxSell.toFixed(2))}</td><td>${commafy(
        avgSellPrice.toFixed(2)
      )}</td><td>${commafy(lowSellUnitPrice)}</td><td>${commafy(
        highSellUnitPrice
      )}</td><td>${commafy(avgSellUnitPrice.toFixed(2))}</td><td>${commafy(
        totalSellAmt
      )}</td><td>0</td></tr>`;
    }
    if (buyCounter > 0) {
      tableHTML += `<tr><td>${name}</td><td>Buy</td><td>${buyCounter}</td><td>${commafy(
        totalBuyQuantity
      )}</td><td>${commafy(avgTxBuy.toFixed(2))}</td><td>${commafy(
        avgBuyPrice.toFixed(2)
      )}</td><td>${commafy(lowBuyUnitPrice)}</td><td>${commafy(
        highBuyUnitPrice
      )}</td><td>${commafy(avgBuyUnitPrice.toFixed(2))}</td><td>${commafy(
        totalBuyAmt
      )}</td><td>${commafy(totalTariffs)}</td></tr>`;
    }
  }
  tableHTML += "</tbody>";
  table.innerHTML = tableHTML;

  const resort = true,
    callback = function() {
      const header = $("#itemSummaryAction");
      if (header.hasClass("tablesorter-headerAsc")) {
        header.click();
        header.click();
      } else if (header.hasClass("tablesorter-headerUnSorted")) {
        header.click();
      }
    };
  $("#itemSummaryTable").trigger("updateAll", [resort, callback]);
}

/**
 * @param {Object} dataObject
 * @param {Listing[]} dataObject.listings
 * @param {string} dataObject.DATA_VERSION
 */
function showOverallSummary(dataObject) {
  $("#overallSummaryContainer").show(500);
  let totalSellQuantity = 0,
    totalBuyQuantity = 0;
  let sellCounter = 0,
    buyCounter = 0;
  let totalSellUnitPrice = 0,
    totalBuyUnitPrice = 0;
  let totalSellAmt = 0,
    totalBuyAmt = 0;
  let totalTariffs = 0;

  const table = document.getElementById("overallSummaryTable");
  table.innerHTML = "";
  let tableHTML =
    "<thead><tr><th id='overallSummaryAction'>Action</th><th>Transactions</th><th>Quantity</th><th>Transaction (Avg)</th><th>Price (Avg)</th><th>Unit Price (Avg)</th><th>Amount</th><th>Tariffs</th></tr></thead><tbody>";

  dataObject.listings.forEach(listing => {
    switch (listing.action) {
      case "sell":
        sellCounter++;
        totalSellQuantity += listing.quantity;
        totalSellUnitPrice += listing.unit;
        totalSellAmt += listing.total;
        break;
      case "buy":
        buyCounter++;
        totalBuyQuantity += listing.quantity;
        totalBuyUnitPrice += listing.unit;
        totalBuyAmt += listing.total;
        totalTariffs += listing.tariff
        break;
    }
  });

  const avgTxSell = totalSellAmt / sellCounter;
  const avgTxBuy = totalBuyAmt / buyCounter;
  const avgSellPrice = totalSellAmt / totalSellQuantity;
  const avgBuyPrice = totalBuyAmt / totalBuyQuantity;
  const avgSellUnitPrice = totalSellUnitPrice / sellCounter;
  const avgBuyUnitPrice = totalBuyUnitPrice / buyCounter;

  tableHTML += `<tr><td>Sell</td><td>${sellCounter}</td><td>${commafy(
    totalSellQuantity
  )}</td><td>${commafy(avgTxSell.toFixed(2))}</td><td>${commafy(
    avgSellPrice.toFixed(2)
  )}</td><td>${commafy(avgSellUnitPrice.toFixed(2))}</td><td>${commafy(
    totalSellAmt
  )}</td><td>0</td></tr>`;

  tableHTML += `<tr><td>Buy</td><td>${buyCounter}</td><td>${commafy(
    totalBuyQuantity
  )}</td><td>${commafy(avgTxBuy.toFixed(2))}</td><td>${commafy(
    avgBuyPrice.toFixed(2)
  )}</td><td>${commafy(avgBuyUnitPrice.toFixed(2))}</td><td>${commafy(
    totalBuyAmt
  )}</td><td>${commafy(totalTariffs)}</td></tr>`;

  const avgTxAll = (totalSellAmt + totalBuyAmt) / (sellCounter + buyCounter);
  const avgAllPrice =
    (totalSellAmt + totalBuyAmt) / (totalSellQuantity + totalBuyQuantity);
  const avgAllUnitPrice =
    (totalSellUnitPrice + totalBuyUnitPrice) / (sellCounter + buyCounter);

  tableHTML += `<tr><td>All</td><td>${sellCounter +
    buyCounter}</td><td>${commafy(
    totalSellQuantity + totalBuyQuantity
  )}</td><td>${commafy(avgTxAll.toFixed(2))}</td><td>${commafy(
    avgAllPrice.toFixed(2)
  )}</td><td>${commafy(avgAllUnitPrice.toFixed(2))}</td><td>${commafy(
    totalSellAmt + totalBuyAmt
  )}</td><td>${commafy(totalTariffs)}</td></tr></tbody>`;

  table.innerHTML = tableHTML;

  const resort = true,
    callback = function() {
      const header = $("#overallSummaryAction");
      if (header.hasClass("tablesorter-headerAsc")) {
        header.click();
        header.click();
      } else if (header.hasClass("tablesorter-headerUnSorted")) {
        header.click();
      }
    };
  $("#overallSummaryTable").trigger("updateAll", [resort, callback]);
}

/*
 * Utilities
 */
function validateJsonData(inputObj) {
  if (!Array.isArray(inputObj) || inputObj.length === 0) {
    return false
  }

  const item = inputObj[0];
  if (!(
    item.hasOwnProperty('name') &&
    item.hasOwnProperty('action') &&
    item.hasOwnProperty('quantity') &&
    item.hasOwnProperty('total') &&
    item.hasOwnProperty('unit') &&
    item.hasOwnProperty('tariff') &&
    item.hasOwnProperty('date')
  )) {
    return false;
  }

  return true;
}

function getDataFromURL(parameters) {
  if (parameters) {
    parameters = decodeURI(parameters[1]);

    return parameters.split("/").join("\n");
  } else {
    return [];
  }
}

Object.size = function(obj) {
  let size = 0;
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

function commafy(num) {
  // $1 is a non-standard static prop of RegExp for substring match
  let str = num.toString().split(".");
  if (str[0].length >= 4) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }
  if (str[1] && str[1].length >= 4) {
    str[1] = str[1].replace(/(\d{3})/g, "$1 ");
  }
  return str.join(".");
}
