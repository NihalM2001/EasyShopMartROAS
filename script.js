document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    //inputting all the values

    var productCost = parseInt(
      document.getElementById("productCostInput").value
    );
    // console.log("productCost " + productCost);
    var packagingCost = document.getElementById("packagingCostInput").value;
    // console.log(packagingCost);
    var shippingCost = document.getElementById("shippingCostInput").value;
    // console.log("shippingCost " + shippingCost);
    var productSP = document.getElementById("productSPInput").value;
    // console.log("productSP " + productSP);
    var adSpend = document.getElementById("adSpendInput").value;
    // console.log(adSpend);
    var expectedMargin = document.getElementById("expectedMarginInput").value;
    // console.log(expectedMargin);
    var rto = parseFloat(document.getElementById("rtoInput").value);
    // console.log("rto% " + rto);
    var damagedReturn = parseFloat(
      document.getElementById("damagedReturnInput").value
    );
    // console.log("damagedReturn " + damagedReturn);
    var reuseInventory = document.getElementById("reuseInventoryInput").value;
    // console.log(reuseInventory);

    //calculating all the required fields

    /*
    Calculated Values Section
    */

    var s2pCostMultiplier = productSP / productCost;
    // console.log(s2pCostMultiplier);

    var deliOrderPercent = 100 - (rto + damagedReturn);
    // console.log("deliOrderPercent " + deliOrderPercent);

    var returnShippingCost = shippingCost * 0.8;
    // console.log(returnShippingCost);

    var rtoCost = shippingCost * 0.8;
    // console.log(rtoCost);

    /*
    
    */

    var revenueDelivered = productSP * (deliOrderPercent / 100);
    // console.log(revenueDelivered);

    var freightCostRTO = (rto / 100) * rtoCost;
    // console.log("freightCostRTO " + freightCostRTO);

    var freightCostDamaged = (damagedReturn / 100) * shippingCost;
    // console.log("freightCostDamaged " + freightCostDamaged);

    var totalFreightCharge =
      parseFloat(shippingCost) +
      parseFloat(freightCostRTO) +
      parseFloat(freightCostDamaged);

    // console.log("totalFreightCharge " + totalFreightCharge);

    var repackingCharges = () => {
      if (reuseInventory == 0) {
        return 0;
      } else {
        return (rto / 100) * packagingCost;
      }
    };

    // console.log("repackingCharges " + repackingCharges());

    var rtoInventorySavings = () => {
      if (reuseInventory == 0) {
        return 0;
      } else {
        return (rto / 100) * productCost;
      }
    };

    // console.log("rtoInventorySavings " + rtoInventorySavings());

    var totalNonMarketingCost =
      productCost +
      totalFreightCharge -
      rtoInventorySavings() +
      repackingCharges();
    // console.log("totalNonMarketingCost " + totalNonMarketingCost);

    var cashFlowAfterDeduction = revenueDelivered - totalNonMarketingCost;
    // console.log("cashFlowAfterDeduction " + cashFlowAfterDeduction);

    //Breakeven section

    if (cashFlowAfterDeduction < 0) {
      alert("Cash flow is falling below zero");
    } else {
      var breakevenOrders = adSpend / cashFlowAfterDeduction;
      // console.log("breakevenOrders " + breakevenOrders);

      var breakevenConversionValue = breakevenOrders * productSP;
      // console.log("breakevenConversionValue " + breakevenConversionValue);

      var breakevenROAS = breakevenConversionValue / adSpend;
      // console.log("breakevenROAS " + breakevenROAS);

      var breakevenCPP = adSpend / breakevenOrders;
      console.log("breakevenCPP " + breakevenCPP);

      var safeCPP = (adSpend / breakevenOrders) * deliOrderPercent;
      console.log("safeCPP " + safeCPP);

      //Profit section

      var profitableOrders = noOfPurchases - breakevenOrders;
      console.log("profitableOrders " + profitableOrders);

      var totalProfit = profitableOrders * cashFlowAfterDeduction;
      console.log("totalProfit " + totalProfit);

      var profitPerOrder = totalProfit / noOfPurchases;
      console.log("profitPerOrder " + profitPerOrder);

      var profitPercentPerOrder = profitPerOrder / productSP;
      console.log("profitPercentPerOrder " + profitPercentPerOrder);

      //Loss section

      var cashFlowLoss = cashFlowAfterDeduction * noOfPurchases;
      console.log("cashFlowLoss " + cashFlowLoss);

      var totalLoss = cashFlowLoss - adSpend;
      console.log("totalLoss " + totalLoss);

      var lossPerOrder = totalLoss / noOfPurchases;
      console.log("lossPerOrder " + lossPerOrder);

      var totalLossPerOrder = lossPerOrder / productSP;
      console.log("totalLossPerOrder " + totalLossPerOrder);
    }
  });
});
