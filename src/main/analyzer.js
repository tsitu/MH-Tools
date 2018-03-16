"use strict";

window.onload = function() {
  loadBookmarkletFromJS(
    BOOKMARKLET_LOADER_URL,
    "bookmarkletLoader",
    "#bookmarkletloader"
  );
  loadBookmarkletFromJS(
    ANALYZER_BOOKMARKLET_URL,
    "analyzerBookmarklet",
    "#bookmarklet"
  );

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
      var p = c.pager, // NEW with the widget... it returns config, instead of config.pager
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
      var p = c.pager, // NEW with the widget... it returns config, instead of config.pager
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
    var reset = confirm("Are you sure you want to reset marketplace data?");
    if (reset == true) {
      var storedData = localStorage.getItem("marketplaceData");
      if (storedData != null) {
        localStorage.removeItem("marketplaceData");
      }
      location.reload();
    }
  });

  var dataObject = {};
  var rawDataArray = getDataFromURL(
    window.location.search.match(/data=([^&]*)/)
  );
  var isDone = getDataFromURL(window.location.search.match(/isDone=([^&]*)/));

  if (rawDataArray.length == 0) {
    var storedData = localStorage.getItem("marketplaceData");
    if (storedData != null) {
      dataObject = JSON.parse(storedData);
      // console.log(dataObject);
      showTable(dataObject);
      showItemSummary(dataObject);
      showOverallSummary(dataObject);
    }
  } else {
    $("#almostDone").show();
    processRawData(rawDataArray, isDone);
  }
};

function processRawData(rawDataArray, isDone) {
  var dataObject = {};
  var storedData = localStorage.getItem("marketplaceData");
  if (storedData != null) {
    dataObject = JSON.parse(storedData);
  }

  var dataLen = rawDataArray.split("\n").length - 1;
  var dataSplit = rawDataArray.split("\n");
  for (var i = 0; i < dataLen; i++) {
    var rowSplit = dataSplit[i].split(" ");
    var wordCount = parseInt(rowSplit[3]);
    var word = "";
    for (var j = 1; j < wordCount; j++) {
      word += rowSplit[j + 3] + " ";
    }
    word += rowSplit[wordCount + 3];

    if (dataObject[word] == undefined) {
      dataObject[word] = {};
    }
    if (dataObject[word][rowSplit[0]] == undefined) {
      dataObject[word][rowSplit[0]] = {};
    }
    if (
      dataObject[word][rowSplit[0]][rowSplit[1] + " " + rowSplit[2]] ==
      undefined
    ) {
      dataObject[word][rowSplit[0]][rowSplit[1] + " " + rowSplit[2]] = [];
    }
    dataObject[word][rowSplit[0]][rowSplit[1] + " " + rowSplit[2]].push(
      rowSplit[wordCount + 4]
    );
    dataObject[word][rowSplit[0]][rowSplit[1] + " " + rowSplit[2]].push(
      rowSplit[wordCount + 5]
    );
    dataObject[word][rowSplit[0]][rowSplit[1] + " " + rowSplit[2]].push(
      rowSplit[wordCount + 6]
    );
  }

  // console.log(dataObject);

  //Store data in local storage
  var analyzerURL = "https://tsitu.github.io/MH-Tools/analyzer.html";
  if (Object.size(dataObject) > 0) {
    localStorage.setItem("marketplaceData", JSON.stringify(dataObject));

    var isDoneSplit = isDone.split("\n");
    isDone = isDoneSplit[0];

    if (isDone == "false") {
      window.location.replace(
        "https://tsitu.github.io/MH-Tools/analyzerwaiting.html"
      );
    } else if (isDone == "true") {
      window.location.replace(analyzerURL);
    } else {
      alert("Missing isDone flag! Please report this in the forums.");
      window.location.replace(analyzerURL);
    }
  } else {
    alert("Raw data processing failed! Please report this in the forums.");
    window.location.replace(analyzerURL);
  }
}

function showTable(dataObject) {
  $("#almostDone").hide();
  $("#tableContainer").show(500);
  var table = document.getElementById("table");
  table.innerHTML = "";
  var tableHTML =
    "<thead><tr><th id='dateClosed'>Date Closed</th><th>Item Name</th><th data-filter='false'>Action</th><th data-filter='false'>Quantity</th><th data-filter='false'>Unit Price</th><th data-filter='false'>Total</th></tr></thead><tbody>";
  for (var itemName in dataObject) {
    for (var action in dataObject[itemName]) {
      for (var date in dataObject[itemName][action]) {
        for (
          var i = 0;
          i < dataObject[itemName][action][date].length / 3;
          i++
        ) {
          tableHTML +=
            "<tr><td>" +
            date +
            "</td><td>" +
            itemName +
            "</td><td>" +
            action +
            "</td><td>" +
            dataObject[itemName][action][date][i * 3] +
            "</td><td>" +
            dataObject[itemName][action][date][i * 3 + 1] +
            "</td><td>" +
            dataObject[itemName][action][date][i * 3 + 2] +
            "</td></tr>";
        }
      }
    }
  }
  tableHTML += "</tbody>";
  table.innerHTML = tableHTML;

  var resort = true,
    callback = function() {
      var header = $("#dateClosed");
      if (header.hasClass("tablesorter-headerAsc")) {
        header.click();
        header.click();
      } else if (header.hasClass("tablesorter-headerUnSorted")) {
        header.click();
      }
    };
  $("#table").trigger("updateAll", [resort, callback]);
}

function showItemSummary(dataObject) {
  $("#itemSummaryContainer").show(500);
  var table = document.getElementById("itemSummaryTable");
  table.innerHTML = "";
  var tableHTML =
    "<thead><tr><th>Item Name</th><th data-filter='false'>Action</th><th data-filter='false'>Transactions</th><th data-filter='false'>Quantity</th><th data-filter='false'>Transaction (Avg)</th><th data-filter='false'>Price (Avg)</th><th data-filter='false'>Unit Price (Low)</th><th data-filter='false'>Unit Price (High)</th><th data-filter='false'>Unit Price (Avg)</th><th id='itemSummaryAction' data-filter='false'>Amount</th><th data-filter='false'>Tariffs</th></tr></thead><tbody>";
  for (var itemName in dataObject) {
    var totalSellQuantity = 0,
      totalBuyQuantity = 0;
    var sellCounter = 0,
      buyCounter = 0;
    var totalSellUnitPrice = 0,
      totalBuyUnitPrice = 0;
    var totalSellAmt = 0,
      totalBuyAmt = 0;
    var lowSellUnitPrice = 0,
      lowBuyUnitPrice = 0;
    var highSellUnitPrice = 0,
      highBuyUnitPrice = 0;
    for (var action in dataObject[itemName]) {
      for (var date in dataObject[itemName][action]) {
        var currentData = dataObject[itemName][action][date];
        for (var i = 0; i < currentData.length / 3; i++) {
          var quantity = parseInt(currentData[i * 3].replace(/,/g, ""));
          var unitPrice = parseInt(currentData[i * 3 + 1].replace(/,/g, ""));
          var totalAmt = parseInt(currentData[i * 3 + 2].replace(/,/g, ""));
          if (action == "Sell") {
            sellCounter++;
            totalSellQuantity += quantity;
            totalSellUnitPrice += unitPrice;
            totalSellAmt += totalAmt;
            if (lowSellUnitPrice == 0 || unitPrice < lowSellUnitPrice) {
              lowSellUnitPrice = unitPrice;
            }
            if (unitPrice > highSellUnitPrice) {
              highSellUnitPrice = unitPrice;
            }
          } else if (action == "Buy") {
            buyCounter++;
            totalBuyQuantity += quantity;
            totalBuyUnitPrice += unitPrice;
            totalBuyAmt += totalAmt;
            if (lowBuyUnitPrice == 0 || unitPrice < lowBuyUnitPrice) {
              lowBuyUnitPrice = unitPrice;
            }
            if (unitPrice > highBuyUnitPrice) {
              highBuyUnitPrice = unitPrice;
            }
          }
        }
      }
    }
    var avgTxSell = totalSellAmt / sellCounter;
    var avgTxBuy = totalBuyAmt / buyCounter;
    var avgSellPrice = totalSellAmt / totalSellQuantity;
    var avgBuyPrice = totalBuyAmt / totalBuyQuantity;
    var avgSellUnitPrice = totalSellUnitPrice / sellCounter;
    var avgBuyUnitPrice = totalBuyUnitPrice / buyCounter;
    var totalTariffs = totalBuyAmt / 11;

    if (sellCounter > 0)
      tableHTML +=
        "<tr><td>" +
        itemName +
        "</td><td>Sell</td><td>" +
        sellCounter +
        "</td><td>" +
        commafy(totalSellQuantity) +
        "</td><td>" +
        commafy(avgTxSell.toFixed(2)) +
        "</td><td>" +
        commafy(avgSellPrice.toFixed(2)) +
        "</td><td>" +
        commafy(lowSellUnitPrice) +
        "</td><td>" +
        commafy(highSellUnitPrice) +
        "</td><td>" +
        commafy(avgSellUnitPrice.toFixed(2)) +
        "</td><td>" +
        commafy(totalSellAmt) +
        "</td><td>0</td></tr>";
    if (buyCounter > 0)
      tableHTML +=
        "<tr><td>" +
        itemName +
        "</td><td>Buy</td><td>" +
        buyCounter +
        "</td><td>" +
        commafy(totalBuyQuantity) +
        "</td><td>" +
        commafy(avgTxBuy.toFixed(2)) +
        "</td><td>" +
        commafy(avgBuyPrice.toFixed(2)) +
        "</td><td>" +
        commafy(lowBuyUnitPrice) +
        "</td><td>" +
        commafy(highBuyUnitPrice) +
        "</td><td>" +
        commafy(avgBuyUnitPrice.toFixed(2)) +
        "</td><td>" +
        commafy(totalBuyAmt) +
        "</td><td>" +
        commafy(totalTariffs.toFixed(2)) +
        "</td></tr>";
  }
  tableHTML += "</tbody>";
  table.innerHTML = tableHTML;

  var resort = true,
    callback = function() {
      var header = $("#itemSummaryAction");
      if (header.hasClass("tablesorter-headerAsc")) {
        header.click();
        header.click();
      } else if (header.hasClass("tablesorter-headerUnSorted")) {
        header.click();
      }
    };
  $("#itemSummaryTable").trigger("updateAll", [resort, callback]);
}

function showOverallSummary(dataObject) {
  $("#overallSummaryContainer").show(500);
  var totalSellQuantity = 0,
    totalBuyQuantity = 0;
  var sellCounter = 0,
    buyCounter = 0;
  var totalSellUnitPrice = 0,
    totalBuyUnitPrice = 0;
  var totalSellAmt = 0,
    totalBuyAmt = 0;
  var table = document.getElementById("overallSummaryTable");
  table.innerHTML = "";
  var tableHTML =
    "<thead><tr><th id='overallSummaryAction'>Action</th><th>Transactions</th><th>Quantity</th><th>Transaction (Avg)</th><th>Price (Avg)</th><th>Unit Price (Avg)</th><th>Amount</th><th>Tariffs</th></tr></thead><tbody>";
  for (var itemName in dataObject) {
    for (var action in dataObject[itemName]) {
      for (var date in dataObject[itemName][action]) {
        var currentData = dataObject[itemName][action][date];
        for (var i = 0; i < currentData.length / 3; i++) {
          var quantity = parseInt(currentData[i * 3].replace(/,/g, ""));
          var unitPrice = parseInt(currentData[i * 3 + 1].replace(/,/g, ""));
          var totalAmt = parseInt(currentData[i * 3 + 2].replace(/,/g, ""));
          if (action == "Sell") {
            sellCounter++;
            totalSellQuantity += quantity;
            totalSellUnitPrice += unitPrice;
            totalSellAmt += totalAmt;
          } else if (action == "Buy") {
            buyCounter++;
            totalBuyQuantity += quantity;
            totalBuyUnitPrice += unitPrice;
            totalBuyAmt += totalAmt;
          }
        }
      }
    }
  }

  var avgTxSell = totalSellAmt / sellCounter;
  var avgTxBuy = totalBuyAmt / buyCounter;
  var avgSellPrice = totalSellAmt / totalSellQuantity;
  var avgBuyPrice = totalBuyAmt / totalBuyQuantity;
  var avgSellUnitPrice = totalSellUnitPrice / sellCounter;
  var avgBuyUnitPrice = totalBuyUnitPrice / buyCounter;
  var totalTariffs = totalBuyAmt / 11;
  tableHTML +=
    "<tr><td>Sell</td><td>" +
    sellCounter +
    "</td><td>" +
    commafy(totalSellQuantity) +
    "</td><td>" +
    commafy(avgTxSell.toFixed(2)) +
    "</td><td>" +
    commafy(avgSellPrice.toFixed(2)) +
    "</td><td>" +
    commafy(avgSellUnitPrice.toFixed(2)) +
    "</td><td>" +
    commafy(totalSellAmt) +
    "</td><td>0</td></tr>";
  tableHTML +=
    "<tr><td>Buy</td><td>" +
    buyCounter +
    "</td><td>" +
    commafy(totalBuyQuantity) +
    "</td><td>" +
    commafy(avgTxBuy.toFixed(2)) +
    "</td><td>" +
    commafy(avgBuyPrice.toFixed(2)) +
    "</td><td>" +
    commafy(avgBuyUnitPrice.toFixed(2)) +
    "</td><td>" +
    commafy(totalBuyAmt) +
    "</td><td>" +
    commafy(totalTariffs.toFixed(2)) +
    "</td></tr>";

  var avgTxAll = (totalSellAmt + totalBuyAmt) / (sellCounter + buyCounter);
  var avgAllPrice =
    (totalSellAmt + totalBuyAmt) / (totalSellQuantity + totalBuyQuantity);
  var avgAllUnitPrice =
    (totalSellUnitPrice + totalBuyUnitPrice) / (sellCounter + buyCounter);
  tableHTML +=
    "<tr><td>All</td><td>" +
    (sellCounter + buyCounter) +
    "</td><td>" +
    commafy(totalSellQuantity + totalBuyQuantity) +
    "</td><td>" +
    commafy(avgTxAll.toFixed(2)) +
    "</td><td>" +
    commafy(avgAllPrice.toFixed(2)) +
    "</td><td>" +
    commafy(avgAllUnitPrice.toFixed(2)) +
    "</td><td>" +
    commafy(totalSellAmt + totalBuyAmt) +
    "</td><td>" +
    commafy(totalTariffs.toFixed(2)) +
    "</td></tr></tbody>";

  table.innerHTML = tableHTML;

  var resort = true,
    callback = function() {
      var header = $("#overallSummaryAction");
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
function getDataFromURL(parameters) {
  if (parameters) {
    parameters = decodeURI(parameters[1]);

    return parameters.split("/").join("\n");
  } else {
    return [];
  }
}

Object.size = function(obj) {
  var size = 0;
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

function commafy(num) {
  var str = num.toString().split(".");
  if (str[0].length >= 4) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }
  if (str[1] && str[1].length >= 4) {
    str[1] = str[1].replace(/(\d{3})/g, "$1 ");
  }
  return str.join(".");
}
