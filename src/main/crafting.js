// Global objects
var ALL_RECIPES = {};
var USER_INVENTORY = {};

window.onload = function() {
  loadBookmarkletFromJS(
    BOOKMARKLET_URLS["loader"],
    "bookmarkletLoader",
    "#bookmarkletloader"
  );
  loadBookmarkletFromJS(
    BOOKMARKLET_URLS["crafting"],
    "craftingBookmarklet",
    "#bookmarklet"
  );

  $.tablesorter.defaults.sortInitialOrder = "desc";
  $("#crafting-recipes").tablesorter({
    sortReset: true,
    widthFixed: true,
    ignoreCase: false,
    widgets: ["filter"],
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
      filter_selectSourceSeparator: "|"
    }
  });

  // Populate global recipes object
  $.getJSON("data/json/all-recipes.json", json => {
    ALL_RECIPES = json;

    // Check window.name for valid inventory data from bookmarklet
    if (window.name) {
      loadInventory(window.name);
    }

    // Check localStorage for saved data
    const storedData = localStorage.getItem("crafting-wizard-items");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (validateJsonData(parsedData)) {
          // Assign JSON.parse()'d object to USER_INVENTORY global
          USER_INVENTORY = parsedData;
          calculateRecipes();
          showInventory();
        }
      } catch (e) {
        console.error(`(Error in localStorage parsing) - ${e.stack}`);
      }
    }
  });
};

/**
 * Checks if crafting materials JSON is in the form { string: number }
 * @param {obj} jsonObj
 * @return {boolean}
 */
function validateJsonData(jsonObj) {
  let returnBool = true;
  const jsonKeys = Object.keys(jsonObj);
  for (let i = 0; i < jsonKeys.length; i++) {
    if (
      typeof jsonKeys[i] !== "string" ||
      typeof jsonObj[jsonKeys[i]] !== "number"
    ) {
      returnBool = false;
      break;
    }
  }
  return returnBool;
}

/**
 * Grab window.name data and validate it as JSON
 * Cache to localStorage and reset window.name
 */
function loadInventory(inputText) {
  try {
    const inputObj = JSON.parse(inputText);
    if (validateJsonData(inputObj)) {
      localStorage.setItem("crafting-wizard-items", inputText);
      window.name = ""; // Reset name after capturing data
    } else {
      throw new TypeError("JSON format invalid or corrupted");
    }
  } catch (e) {
    console.error(`(Error in window.name) - ${e.stack}`);
  }
}

/**
 * Iterate through USER_INVENTORY and output to table
 */
function showInventory() {
  let inventoryHTML =
    "<caption>Inventory</caption><tr><th>Item</th><th>Quantity</th></tr>";
  Object.keys(USER_INVENTORY).forEach(el => {
    inventoryHTML += `<tr><td>${el}</td><td>${USER_INVENTORY[el]}</td></tr>`;
  });
  document.getElementById("crafting-inventory").innerHTML = inventoryHTML;
}

/**
 * Iterate through USER_INVENTORY and calculate [un]craftable recipes
 * Build string that is then assigned to innerHTML of #crafting-recipes <table>
 */
function calculateRecipes() {
  let craftingHTML =
    "<caption>Recipes</caption><thead><tr><th>Type</th><th>Name</th><th id='crafting-total-qty'>Total Craftable Qty</th><th>Required Materials</th><th>Missing Materials</th></tr></thead><tbody>";

  const recipeKeys = Object.keys(ALL_RECIPES);
  let rkLength = recipeKeys.length;
  const staticRk = rkLength;

  while (rkLength--) {
    const itemName = recipeKeys[staticRk - rkLength - 1];
    const type = ALL_RECIPES[itemName]["type"];

    let recipeStr = "";
    const materialKeys = Object.keys(ALL_RECIPES[itemName]["recipe"]);
    let mkLength = materialKeys.length;
    while (mkLength--) {
      // Display 'Required Materials' in proper order
      const pos = materialKeys[mkLength];
      recipeStr += `[${ALL_RECIPES[itemName]["recipe"][pos]}] ${pos}<br />`;
    }

    if (hasProperMaterials(ALL_RECIPES[itemName]["recipe"])) {
      const craftableQty = calcCraftableQuantity(itemName);

      // Build craftable HTML string
      craftingHTML += `<tr><td>${type}</td><td>${itemName}</td><td>${craftableQty *
        ALL_RECIPES[itemName][
          "qty"
        ]}</td><td>${recipeStr}</td><td>N/A</td></tr>`;
    } else {
      let output = "";
      const missingObj = checkMissingMaterials(itemName);
      Object.keys(missingObj).forEach(el => {
        output += `[${missingObj[el]}] ${el}<br />`;
      });

      // Build uncraftable HTML string
      craftingHTML += `<tr><td>${type}</td><td>${itemName}</td><td>0</td><td>${recipeStr}</td><td>${output}</td></tr>`;
    }
  }

  craftingHTML += "</tbody>";
  document.getElementById("crafting-recipes").innerHTML = craftingHTML;

  const resort = true,
    callback = function() {
      const header = $("#crafting-total-qty");
      if (header.hasClass("tablesorter-headerAsc")) {
        header.click();
        header.click();
      } else if (header.hasClass("tablesorter-headerUnSorted")) {
        header.click();
      }
    };
  $("#crafting-recipes").trigger("updateAll", [resort, callback]);
}

/**
 * Check for missing material quantities based on item name
 * @param {obj} item
 * @return {obj} { material: qty }
 */
function checkMissingMaterials(item) {
  const missingObj = {};
  const recipeMaterials = ALL_RECIPES[item]["recipe"];
  const matKeys = Object.keys(recipeMaterials);
  let mkLength = matKeys.length;
  while (mkLength--) {
    const qty = recipeMaterials[matKeys[mkLength]];
    const userQty = USER_INVENTORY[matKeys[mkLength]];
    if (!userQty) {
      missingObj[matKeys[mkLength]] = qty;
    } else if (userQty < qty) {
      missingObj[matKeys[mkLength]] = qty - userQty;
    }
  }
  return missingObj;
}

/**
 * Calculates craftable quantity based on item name
 * @param {obj} item
 * @return {number}
 */
function calcCraftableQuantity(item) {
  let craftableQuantity = 1;
  let tmpQty = Infinity;
  const recipeMaterials = ALL_RECIPES[item]["recipe"];
  const matKeys = Object.keys(recipeMaterials);
  let mkLength = matKeys.length;
  while (mkLength--) {
    const qty = recipeMaterials[matKeys[mkLength]];
    const craftable = Math.floor(USER_INVENTORY[matKeys[mkLength]] / qty);
    if (craftable < tmpQty) {
      tmpQty = craftable;
    }
  }

  if (tmpQty != Infinity) {
    craftableQuantity = tmpQty;
  }
  return craftableQuantity;
}

/**
 * Check if a user's inventory contains the required crafting materials
 * Quantity check included
 * @param {object} item
 * @return {boolean}
 */
function hasProperMaterials(item) {
  const itemKeys = Object.keys(item);
  let ikLength = itemKeys.length;
  while (ikLength--) {
    const material = itemKeys[ikLength];
    if (!USER_INVENTORY[material]) {
      return false;
    } else {
      if (USER_INVENTORY[material] < item[material]) {
        return false;
      }
    }
  }
  return true;
}
