Template.electricity.helpers({
    totalCarbon: function() {
        return Session.get("totalElectricityCarbon").toFixed(2);
    },
    totalUsage: function() {
        return Session.get("totalElectricityUsed").toFixed(2);
    }
});

Template.electricity.events({
    "change #electricityUsed": function() {
        var electricityUsed = parseInt(document.getElementById("electricityUsed").value);
        if (electricityUsed !== "") {
            Session.set("totalElectricityUsed", electricityUsed);
            Session.set("totalElectricityCarbon", electricityUsed * 835 * 1.09 * 0.000001);
        }
    },
    "change #electricityUsedCheckbox": function() {
        $("#electricityUsedCollapse").slideToggle(0);
    },
    "change #electricityLowestMonth, change #electricityHighestMonth": function() {
        var lowestMonth = parseInt(document.getElementById("electricityLowestMonth").value);
        var highestMonth = parseInt(document.getElementById("electricityHighestMonth").value);
        var electricityUsed = parseInt(document.getElementById("electricityUsed").value);

        if (!(isNaN(lowestMonth)) && !(isNaN(highestMonth))) {
            electricityUsed = (lowestMonth + highestMonth) * 6;
            document.getElementById("electricityUsed").value = electricityUsed;
            Session.set("totalElectricityUsed", electricityUsed);
            Session.set("totalElectricityCarbon", electricityUsed * 835 * 1.09 * 0.000001);
        }
    },
});

Template.electricity.onCreated(function () {
    //add your statement here
});

Template.electricity.onRendered(function () {
    Session.set("totalElectricityUsed", 0);
    Session.set("totalElectricityCarbon", 0);
});

Template.electricity.onDestroyed(function () {
    //add your statement here
});

