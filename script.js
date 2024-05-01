document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    //inputting all the values

    var productCost = document.getElementById("productCostInput").value;
    console.log(productCost);
    var packagingCost = document.getElementById("packagingCostInput").value;
    console.log(packagingCost);
    var shippingCost = document.getElementById("shippingCostInput").value;
    console.log(shippingCost);
    var productSP = document.getElementById("productSPInput").value;
    console.log(productSP);
    var adSpend = document.getElementById("adSpendInput").value;
    console.log(adSpend);
    var expectedMargin = document.getElementById("expectedMarginInput").value;
    console.log(expectedMargin);
    var rto = document.getElementById("rtoInput").value;
    console.log(rto);
    var damagedReturn = document.getElementById("damagedReturnInput").value;
    console.log(damagedReturn);
    var reuseInventory = document.getElementById("reuseInventoryInput").value;
    console.log(reuseInventory);

    //calculating all the required fields
  });
});
