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
    var noOfPurchases = document.getElementById("noOfPurchasesInput").value;
    // console.log(noOfPurchases);
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
    other values section
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
      // console.log("breakevenCPP " + breakevenCPP);

      var safeCPP = (adSpend / breakevenOrders) * deliOrderPercent;
      // console.log("safeCPP " + safeCPP);

      //Profit section

      var profitableOrders = noOfPurchases - breakevenOrders;
      // console.log("profitableOrders " + profitableOrders);

      var totalProfit = profitableOrders * cashFlowAfterDeduction;
      // console.log("totalProfit " + totalProfit);

      var profitPerOrder = totalProfit / noOfPurchases;
      // console.log("profitPerOrder " + profitPerOrder.toFixed(2));

      var profitPercentPerOrder = profitPerOrder / productSP;
      // console.log("profitPercentPerOrder " + profitPercentPerOrder.toFixed(2));

      //Loss section

      var cashFlowLoss = cashFlowAfterDeduction * noOfPurchases;
      console.log("cashFlowLoss " + cashFlowLoss);

      var totalLoss = cashFlowLoss - adSpend;
      console.log("totalLoss " + totalLoss);

      var lossPerOrder = totalLoss / noOfPurchases;
      console.log("lossPerOrder " + lossPerOrder);

      var totalLossPerOrder = (lossPerOrder / productSP) * 100;
      console.log("totalLossPerOrder " + totalLossPerOrder.toFixed(2));
    }

    //calling all the input fields

    // Calculated Values section
    var s2pCostMultiplierField = document.getElementById(
      "costMultiplierOutput"
    );

    var returnShipCostField = document.getElementById("returnShipCostOutput");

    var deliveredOrderPercentField = document.getElementById(
      "deliveredOrdersOutput"
    );

    var rtoCostOutputField = document.getElementById("rtoCostOutput");

    // Other values section
    var revenueDeliveredField = document.getElementById("revenueDelivered");

    var rtoFreightCostField = document.getElementById("rtoFreightCost");

    var damagedFreightCostField = document.getElementById("damagedFreightCost");

    var totalFreightChargeField = document.getElementById("totalFreightCharge");

    var repackingChargeField = document.getElementById("repackingCharge");

    var reusesRtoSavingsField = document.getElementById("reusesRtoSavings");

    var totalNonMarketingCostField = document.getElementById(
      "totalNonMarketingCost"
    );

    var cashFlowAfterDeductionField = document.getElementById(
      "cashFlowAfterDeduction"
    );

    // fields from breakeven Section

    var breakevenOrdersField = document.getElementById("breakevenOrders");

    var conversionValueField = document.getElementById("conversionValue");

    var breakevenROASField = document.getElementById("breakevenROAS");

    var breakevenCPPField = document.getElementById("breakevenCPP");

    var safeCPPField = document.getElementById("safeCPP");

    //fields for Loss section

    var cashFlowField = document.getElementById("cashFlow");

    var totalLossField = document.getElementById("totalLoss");

    var lossPerOrderField = document.getElementById("lossPerOrder");

    var lossPercentField = document.getElementById("lossPercent");

    //fields for Profit section

    var profitableOrderField = document.getElementById("profitableOrder");

    var totalProfitField = document.getElementById("totalProfit");

    var profitPerOrderField = document.getElementById("profitPerOrder");

    var profitPercentField = document.getElementById("profitPercent");

    //calling the progit and loss section

    profitSection = document.querySelector(".profit");

    lossSection = document.querySelector(".loss");

    // displaying all the values

    // calculated values section
    s2pCostMultiplierField.value = s2pCostMultiplier;

    returnShipCostField.value = returnShippingCost;

    deliveredOrderPercentField.value = deliOrderPercent;

    rtoCostOutputField.value = rtoCost;

    //other values section

    revenueDeliveredField.value = revenueDelivered;

    rtoFreightCostField.value = freightCostRTO;

    damagedFreightCostField.value = freightCostDamaged;

    totalFreightChargeField.value = totalFreightCharge;

    repackingChargeField.value = repackingCharges();

    reusesRtoSavingsField.value = rtoInventorySavings();

    totalNonMarketingCostField.value = totalNonMarketingCost;

    cashFlowAfterDeductionField.value = cashFlowAfterDeduction;

    // breakeven section

    if (cashFlowAfterDeduction > 0) {
      breakevenOrdersField.value = breakevenOrders;

      conversionValueField.value = breakevenConversionValue;

      breakevenROASField.value = breakevenROAS;

      breakevenCPPField.value = breakevenCPP;

      safeCPPField.value = safeCPP;

      if (noOfPurchases > breakevenOrders) {
        //setting display to grid of profitSection to display profit
        profitSection.style.display = "grid";
        lossSection.style.display = "none";
        lossSection.style.transition = "100ms";

        profitableOrderField.value = profitableOrders;

        totalProfitField.value = totalProfit;

        profitPerOrderField.value = profitPerOrder.toFixed(2);

        profitPercentField.value = profitPercentPerOrder.toFixed(2);
      }

      if (noOfPurchases < breakevenOrders) {
        //setting display to grid of profitSection to display profit
        lossSection.style.display = "grid";
        profitSection.style.display = "none";
        lossSection.style.transition = "100ms";

        cashFlowField.value = cashFlowLoss;

        totalLossField.value = totalLoss;

        lossPerOrderField.value = lossPerOrder;

        lossPercentField.value = totalLossPerOrder.toFixed(2);
      }
    }
  });
});
