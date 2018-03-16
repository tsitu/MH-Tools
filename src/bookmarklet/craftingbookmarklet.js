(function main() {
  if (
    location.href.indexOf(
      "https://www.mousehuntgame.com/inventory.php?tab=crafting&subtab=crafting_table"
    ) < 0
  ) {
    alert("Please navigate to Inventory -> Crafting -> Crafting Table");
    return;
  }

  var nodeList = document.querySelectorAll(
    ".mousehuntHud-page-subTabContent.crafting_table div.tooltip"
  );

  // Make sure search bar is empty to avoid duplicates
  var itemList = Array.prototype.map.call(nodeList, function(node) {
    var obj = {};
    var itemName = node.querySelector("div.tooltipContent").children[0]
      .innerText;
    var itemQuantity = node
      .querySelector("div.itemImage")
      .children[1].innerText.replace(/,/g, "");
    obj["name"] = itemName;
    obj["quantity"] = +itemQuantity;
    return obj;
  });

  // This should automatically de-dupe, hopefully no bad overrides
  var itemObj = {};
  itemList.forEach(function(element) {
    itemObj[element.name] = element.quantity;
  });

  // Output stringified JSON to copy-paste over
  var mainDiv = document.createElement("div");
  mainDiv.id = "mht-crafting";

  var closeButton = document.createElement("button");
  closeButton.textContent = "x";
  closeButton.onclick = function() {
    document.body.removeChild(mainDiv);
  };

  var selectAllButton = document.createElement("button");
  selectAllButton.textContent = "Select All";
  selectAllButton.onclick = function() {
    var textarea = document.getElementById("crafting-output-textarea");
    textarea.focus();
    textarea.setSelectionRange(0, 99999);
  };

  var copyButton = document.createElement("button");
  copyButton.textContent = "Copy";
  copyButton.onclick = function() {
    document.execCommand("copy");
  };

  var titleSpan = document.createElement("span");
  titleSpan.style.fontSize = "15px";
  titleSpan.style.fontWeight = "bold";
  titleSpan.appendChild(document.createTextNode("Crafting Inventory"));

  var descriptionSpan = document.createElement("span");
  descriptionSpan.innerHTML =
    "Copy the text below and paste it into the Crafting Wizard";

  var outputArea = document.createElement("textarea");
  outputArea.id = "crafting-output-textarea";
  outputArea.innerText = JSON.stringify(itemObj);

  mainDiv.appendChild(closeButton);
  mainDiv.appendChild(document.createElement("br"));
  mainDiv.appendChild(document.createElement("br"));
  mainDiv.appendChild(selectAllButton);
  mainDiv.appendChild(copyButton);
  mainDiv.appendChild(document.createElement("br"));
  mainDiv.appendChild(document.createElement("br"));
  mainDiv.appendChild(titleSpan);
  mainDiv.appendChild(document.createElement("br"));
  mainDiv.appendChild(descriptionSpan);
  mainDiv.appendChild(document.createElement("br"));
  mainDiv.appendChild(document.createElement("br"));
  mainDiv.appendChild(outputArea);

  mainDiv.style.backgroundColor = "#F5F5F5";
  mainDiv.style.position = "absolute";
  mainDiv.style.zIndex = "9999";
  mainDiv.style.left = "25%";
  mainDiv.style.top = "25px";
  mainDiv.style.border = "solid 3px #696969";
  mainDiv.style.borderRadius = "20px";
  mainDiv.style.padding = "10px";
  mainDiv.style.textAlign = "center";
  document.body.appendChild(mainDiv);
})();
