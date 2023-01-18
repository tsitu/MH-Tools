//TODO:Table not initialized correctly on best charm
//TODO: Check compatibility and replace slider with HTML5 range input

/**
 * Setup for setup tool's Google Analytics, tablesorter and amp slider.
 */
(function() {
  "use strict";
  var tablesorterOptions = {
    // sortForce: [[noMice,1]],
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
        container: ".pager", // target the pager markup (wrapper)
        first: ".first", // go to first page arrow
        prev: ".prev", // previous page arrow
        next: ".next", // next page arrow
        last: ".last", // go to last page arrow
        gotoPage: ".gotoPage", // go to page selector - select dropdown that sets the current page
        pageDisplay: ".pagedisplay", // location of where the "output" is displayed
        pageSize: ".pagesize" // page size selector - select dropdown that sets the "size" option
      }
    }
  };

  $(window).load(function() {
    initTableSorter();
    setupGA();
  });

  function setupGA() {
    (function(i, s, o, g, r, a, m) {
      i["GoogleAnalyticsObject"] = r;
      (i[r] =
        i[r] ||
        function() {
          (i[r].q = i[r].q || []).push(arguments);
        }),
        (i[r].l = 1 * new Date());
      (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m);
    })(
      window,
      document,
      "script",
      "https://www.google-analytics.com/analytics.js",
      "ga"
    );

    ga("create", "UA-61581935-1", { name: "auto" });
    ga("auto.send", "pageview");
  }

  /*
     * Best setup tablesroter
     * Initialize the tablesorter and bind it to the results table
     */
  function initTableSorter() {
    $.tablesorter.defaults.sortInitialOrder = "desc";
    $("#results")
      .tablesorter(tablesorterOptions)
      .bind("pagerChange pagerComplete pagerInitialized pageMoved", function(
        e,
        c
      ) {
        var p = c.pager, // NEW with the widget... it returns config, instead of config.pager
          msg =
            "'</span> event triggered, " +
            (e.type === "pagerChange" ? "going to" : "now on") +
            " page <span class='typ'>" +
            (p.page + 1) +
            "/" +
            p.totalPages +
            "</span>";
        $("#display")
          .append("<li><span class='str'>'" + e.type + msg + "</li>")
          .find("li:first")
          .remove();
      });
  }
})();
