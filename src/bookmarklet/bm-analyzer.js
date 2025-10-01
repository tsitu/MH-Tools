(() => {
  // Even if current execution fails, constant pushing means we have data to continue from
  // localStorage sample usage: 582 entries is 40.4 KB on MHG, 30.4 KB in tool
  // May use alternative storage method if 5 MB localStorage limit is reached by whales

  /**
   * @typedef {Object} Parameters
   * @property {boolean} pause
   * @property {boolean} done
   * @property {Object.<number, string>} items
   * @property {Object.<number, Listing>} listings
   */

  /**
   * @typedef {Object} Listing
   * @property {number} listing_id
   * @property {string} listing_type
   * @property {number} item_id
   * @property {number} initial_quantity
   * @property {number} remaining_quantity
   * @property {number} unit_price
   * @property {number} unit_price_without_tariff
   * @property {number} total_price
   * @property {number} total_price_without_tariff
   * @property {string} date_closed
   */

  // Global obj
  /** @type {Parameters} */
  const PARAMS = {
    items: {},
    listings: {},
    pause: false,
    done: false,
  };

  function getHistory(page) {
    return new Promise((resolve, reject) => {
      hg.utils.Marketplace.getMyHistory(page, resolve, reject)
    });
  }

  function main() {
    if (!window.jQuery) {
      alert("Error: jQuery is not enabled on this page");
      return;
    }

    loadMarketPlaceItems();
    decodePersistedData();
    buildUI();
  }

  function loadMarketPlaceItems() {
    // Create dictonary of item names by id
    // to decode item_id returned by history API
    hg.utils.Marketplace.getMarketplaceData(
      function (data) {
        if (data.marketplace_items) {
          data.marketplace_items.forEach(item => {
            PARAMS["items"][item.item_id] = item.name
          })
        }
      },
      function () {
        alert("Error fetching marketplace data!");
      }
    );
  }

  function persistData() {
    const data = JSON.stringify(PARAMS["listings"]);
    localStorage.setItem("tsitu-analyzer-data", data)
  }

  function decodePersistedData() {
    // Decode storage once, store it when user sends to tool or closes UI
    const storageData = localStorage.getItem("tsitu-analyzer-data");

    let storageObj = {};
    if (storageData) {
      try {
        const decode = JSON.parse(storageData);
        storageObj = decode;
      } catch {}
    }

    PARAMS["listings"] = storageObj;
  }

  /**
   *
   * @param {Object} newData
   * @param {Listing[]} newData.marketplace_history
   */
  function processData(newData) {
    let alreadyStoredListing = false;
    newData.marketplace_history.forEach(val => {
      // we can tell fetching function to stop as we've fetched already stored entries
      alreadyStoredListing ||= val.listing_id in PARAMS["listings"];

      PARAMS["listings"][val.listing_id] = {
        name: PARAMS["items"][val.item_id],
        action: val.listing_type,
        quantity: val.initial_quantity - val.remaining_quantity,
        total: val.total_price_without_tariff,
        unit: val.unit_price_without_tariff,
        tariff: val.total_price - val.total_price_without_tariff,
        date: val.date_closed
      }
    })

    localStorage.setItem("tsitu-analyzer-data-length", Object.keys(PARAMS["listings"]).length);
    refreshUI();

    const shouldContinue = !(alreadyStoredListing || newData.marketplace_history.length == 0);
    return shouldContinue;
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function processPages() {
    let pageOffset = 0;
    let shouldContinue = false;
    do {
      const data = await getHistory(pageOffset)
      shouldContinue = processData(data);
      await sleep(500);
      pageOffset += 1;
    } while (shouldContinue && !PARAMS['pause']);

    PARAMS['done'] = true;
    PARAMS["pause"] = false;

    document.getElementById("mht-marketplace-analyzer-fetch").disabled = false;
    document.getElementById("mht-marketplace-analyzer-pause").disabled = true;
    document.getElementById("mht-marketplace-analyzer-send").disabled = false;

    document.getElementById(
      "mht-marketplace-analyzer-background"
    ).hidden = true;
  }

  function buildUI() {
    const mainDiv = document.createElement("div");
    mainDiv.id = "mht-marketplace-analyzer";

    const closeButton = document.createElement("button");
    closeButton.textContent = "x";
    closeButton.onclick = function() {
      document.body.removeChild(mainDiv);
      persistData();
    };

    const titleSpan = document.createElement("span");
    titleSpan.style.fontSize = "15px";
    titleSpan.style.fontWeight = "bold";
    titleSpan.appendChild(document.createTextNode("Marketplace Analyzer"));

    const descriptionSpan = document.createElement("span");
    descriptionSpan.id = "mht-marketplace-analyzer-description";

    const backgroundSpan = document.createElement("span");
    backgroundSpan.innerHTML =
      "<br><br>Script is running in the background.<br>Feel free to browse in another tab!";
    backgroundSpan.id = "mht-marketplace-analyzer-background";
    backgroundSpan.hidden = true;

    const fetchButton = document.createElement("button");
    fetchButton.id = "mht-marketplace-analyzer-fetch";
    fetchButton.textContent = "Fetch";
    fetchButton.onclick = () => {
      if (PARAMS['done']) {
        alert(
          "All available data has been downloaded.\nPlease click 'Send To Tool', or 'Reset Data' if something has broken."
        );
      } else {
        fetchButton.disabled = true;
        pauseButton.disabled = false;
        backgroundSpan.hidden = false;
        processPages();
      }
    };

    const pauseButton = document.createElement("button");
    pauseButton.id = "mht-marketplace-analyzer-pause";
    pauseButton.textContent = "Pause";
    pauseButton.disabled = true;
    pauseButton.onclick = () => {
      PARAMS["pause"] = true;
    };

    const sendButton = document.createElement("button");
    sendButton.id = "mht-marketplace-analyzer-send"
    sendButton.textContent = "Send To Tool";
    sendButton.disabled = true;
    sendButton.onclick = () => {
      persistData();
      if (Object.keys(PARAMS["listings"]).length > 0) {
        const newWindow = window.open("");
        newWindow.location = "https://tsitu.github.io/MH-Tools/analyzer.html";
        // newWindow.location = "http://localhost:8000/analyzer.html"; // Debug
        // 200 IQ method to transfer stringified data across origins
        newWindow.name = JSON.stringify(Object.values(PARAMS["listings"]));
      } else {
        alert("There is no data to send! Please click 'Fetch'");
      }
    };

    const resetButton = document.createElement("button");
    resetButton.textContent = "Reset Data";
    resetButton.onclick = () => {
      const reset = confirm("Are you sure you want to reset the data on MHG?");
      if (reset) {
        PARAMS["listings"] = {};
        const storedData = localStorage.getItem("tsitu-analyzer-data");
        if (storedData) {
          PARAMS["done"] = false;
          localStorage.removeItem("tsitu-analyzer-data");
          localStorage.removeItem("tsitu-analyzer-data-length");
          refreshUI();
        }
      }
    };

    mainDiv.appendChild(closeButton);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(titleSpan);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(descriptionSpan);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(sendButton);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(fetchButton);
    mainDiv.appendChild(document.createTextNode(" "));
    mainDiv.appendChild(pauseButton);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(resetButton);
    mainDiv.appendChild(backgroundSpan);

    mainDiv.style.color = "var(--d-text, rgba(0,0,0,0.87))";
    mainDiv.style.backgroundColor = "var(--d-bg, #F2F2F2)";
    mainDiv.style.position = "fixed";
    mainDiv.style.zIndex = "9999";
    mainDiv.style.left = "40%";
    mainDiv.style.top = "88px";
    mainDiv.style.border = "solid 3px var(--d-border, #696969)";
    mainDiv.style.borderRadius = "20px";
    mainDiv.style.padding = "10px";
    mainDiv.style.textAlign = "center";
    document.body.appendChild(mainDiv);
    refreshUI();
  }

  function refreshUI() {
    let storedEntries = localStorage.getItem("tsitu-analyzer-data-length") ?? 0;
    const d = document.getElementById("mht-marketplace-analyzer-description");
    d.innerHTML = `Stored Entries: ${storedEntries}`;
  }

  main();
})();
