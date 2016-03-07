Template.water.helpers({
    totalCarbon: function() {
        return Session.get("totalNaturalWaterCarbon").toFixed(2);
    },
    totalUsage: function() {
        return Session.get("totalNaturalWaterUsed").toFixed(2);
    },
    units: function() {
        return Session.get("waterUnits");
    }
});

Template.water.events({
    "change #waterUsed": function() {
        var waterUsed = parseInt(document.getElementById("waterUsed").value);
        var waterUnits = Session.get("waterUnits");
        Session.set("totalNaturalWaterUsed", waterUsed);
        if (waterUnits === "MGallons") {
            Session.set("totalNaturalWaterCarbon", waterUsed * 1000 * 4.082 * 0.000001);
        } else if (waterUnits === "Gallons") {
            Session.set("totalNaturalWaterCarbon", waterUsed * 4.082 * 0.000001);

        }
    },

    "change #waterUsedCheckbox": function() {
        $("#waterUsedCollapse").slideToggle(0);
    },
    "change #waterLowestMonth, change #waterHighestMonth": function() {
        var lowestMonth = parseInt(document.getElementById("waterLowestMonth").value);
        var highestMonth = parseInt(document.getElementById("waterHighestMonth").value);
        var waterUsed = parseInt(document.getElementById("waterUsed").value);
        var waterUnits = Session.get("waterUnits");

        if (!(isNaN(lowestMonth)) && !(isNaN(highestMonth))) {
            waterUsed = (lowestMonth + highestMonth) * 6;
            document.getElementById("waterUsed").value = waterUsed;
            Session.set("totalNaturalWaterUsed", waterUsed);
            if (waterUnits === "MGallons") {
                Session.set("totalNaturalWaterCarbon", waterUsed * 1000 * 4.082 * 0.000001);
            } else if (waterUnits === "Gallons") {
                Session.set("totalNaturalWaterCarbon", waterUsed * 4.082 * 0.000001);

            }
        }
    },
    "change #waterUnits": function() {
        Session.set("waterUnits", document.getElementById("waterUnits").value);
        var lowestMonth = parseInt(document.getElementById("waterLowestMonth").value);
        var highestMonth = parseInt(document.getElementById("waterHighestMonth").value);
        var waterUsed = parseInt(document.getElementById("waterUsed").value);
        var waterUnits = Session.get("waterUnits");


        if (!(isNaN(lowestMonth)) && !(isNaN(highestMonth))) {
            waterUsed = (lowestMonth + highestMonth) * 6;
            document.getElementById("waterUsed").value = waterUsed;
            Session.set("totalNaturalWaterUsed", waterUsed);
            if (waterUnits === "MGallons") {
                Session.set("totalNaturalWaterCarbon", waterUsed * 1000 * 4.082 * 0.000001);
            } else if (waterUnits === "Gallons") {
                Session.set("totalNaturalWaterCarbon", waterUsed * 4.082 * 0.000001);

            }
        }
    }
});

Template.water.onCreated(function () {
    //add your statement here
});

Template.water.onRendered(function () {
    $('select').material_select();
    Session.set("waterUnits", "MGallons");
    Session.set("totalNaturalWaterUsed", 0);
    Session.set("totalNaturalWaterCarbon", 0);
});

Template.water.onDestroyed(function () {
    //add your statement here
});

