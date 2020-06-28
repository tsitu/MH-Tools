(function main() {
  if (
    location.href.indexOf(
      "https://www.mousehuntgame.com/inventory.php?tab=crafting&sub_tab=crafting_table"
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

  var newWindow = window.open("");
  // 200 IQ method to transfer stringified data across origins
  newWindow.name = JSON.stringify(itemObj);
  newWindow.location = "https://tsitu.github.io/MH-Tools/crafting.html";
})();
