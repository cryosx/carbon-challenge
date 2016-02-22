Template.emissions.helpers({

});

Template.emissions.events({

});

Template.emissions.onCreated(function () {

});

Template.emissions.onRendered(function () {
    var records = CarbonStats.find({userID: Meteor.userId(), year:2015}).fetch();
    if (records.length > 0) {
        //SET INPUT VALUES
        var currentYear = records[0];
        //PROCESS TRANSPORTATION
        var transportation = currentYear.transportation;
        $("#units").val(transportation.units);
        $("#carDistanceTraveled").val(transportation.carDistanceTraveled);
        $("#fuelEfficiency").val(transportation.fuelEfficiency);
        $("#fuelType").val(transportation.fuelType);
        $("#railDistanceTraveled").val(transportation.railDistanceTraveled);
        $("#busDistanceTraveled").val(transportation.busDistanceTraveled);
        $("#airDistanceTraveled").val(transportation.airDistanceTraveled);
        //$("#totalTransportEmissions").innerText = (transportation.totalTransport);
        document.getElementById("totalTransportEmissions").innerHTML = transportation.totalTransport;

        //PROCESS HOUSING
        var housing = currentYear.housing;
        $("#electricityUsed").val(housing.electricityUsed);
        $("#fuelUsed").val(housing.fuelUsed);
        $("#gasUsed").val(housing.gasUsed);
        $("#gasUnits").val(housing.gasUnits);
        $("#waterUsed").val(housing.waterUsed);
        document.getElementById("totalHousingEmissions").innerHTML = housing.totalHousing;
        //PROCESS FOOD
        var food = currentYear.food;
        $("#meatConsumed").val(food.meatConsumed);
        $("#poultryConsumed").val(food.poultryConsumed);
        $("#seafoodConsumed").val(food.seafoodConsumed);
        $("#dairyConsumed").val(food.dairyConsumed);
        $("#vegetablesConsumed").val(food.vegetablesConsumed);
        $("#grainsConsumed").val(food.grainsConsumed);
        $("#drinksConsumed").val(food.drinksConsumed);
        document.getElementById("totalFoodEmissions").innerHTML = food.totalFood;
        //PROCESS GOODS
        var goods = currentYear.goods;
        $("#clothesSpentOn").val(goods.clothesSpentOn);
        $("#furnitureSpentOn").val(goods.furnitureSpentOn);
        $("#entertainmentSpentOn").val(goods.entertainmentSpentOn);
        $("#paperSpentOn").val(goods.paperSpentOn);
        $("#cleaningSpentOn").val(goods.cleaningSpentOn);
        $("#medicalSpentOn").val(goods.medicalSpentOn);
        $("#autoSpentOn").val(goods.autoSpentOn);
        document.getElementById("totalGoodsEmissions").innerHTML = goods.totalGoods;
        //PROCESS SERVICES
        var services = currentYear.services;
        $("#healthSpentOn").val(services.healthSpentOn);
        $("#communicationsSpentOn").val(services.communicationsSpentOn);
        $("#vehiclesSpentOn").val(services.vehiclesSpentOn);
        $("#maintenanceSpentOn").val(services.maintenanceSpentOn);
        document.getElementById("totalServicesEmissions").innerHTML = services.totalServices;
    }
});

Template.emissions.onDestroyed(function () {

});
