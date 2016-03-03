Template.naturalGas.helpers({
    totalCarbon: function() {
        return Session.get("totalNaturalGasCarbon").toFixed(2);
    },
    totalUsage: function() {
        return Session.get("totalNaturalGasUsed").toFixed(2);
    },
    units: function() {
        return Session.get("gasUnits");
    }
});

Template.naturalGas.events({
    "change #naturalGasUsed": function() {
        var naturalGasUsed = parseInt(document.getElementById("naturalGasUsed").value);
        var gasUnits = Session.get("gasUnits");
        Session.set("totalNaturalGasUsed", naturalGasUsed);
        Session.set("totalNaturalGasCarbon", (naturalGasUsed/100) * 54.7 * 1.14 * 0.000001);
    },

    "change #naturalGasUsedCheckbox": function() {
        $("#naturalGasUsedCollapse").slideToggle(0);
    },
    "change #naturalGasLowestMonth, change #naturalGasHighestMonth": function() {
        var lowestMonth = parseInt(document.getElementById("naturalGasLowestMonth").value);
        var highestMonth = parseInt(document.getElementById("naturalGasHighestMonth").value);
        var naturalGasUsed = parseInt(document.getElementById("naturalGasUsed").value);
        var gasUnits = Session.get("gasUnits");

        if (!(isNaN(lowestMonth)) && !(isNaN(highestMonth))) {
            if (gasUnits === "CcF") {
                naturalGasUsed = (lowestMonth + highestMonth) * 6;

            } else if (gasUnits === "McF") {
                naturalGasUsed = (lowestMonth + highestMonth) * 6 * 0.1;

            } else if (gasUnits === "BTU") {
                naturalGasUsed = (lowestMonth + highestMonth) * 6 * 102800;

            } else if (gasUnits === "Therms") {
                naturalGasUsed = (lowestMonth + highestMonth) * 6 * 1.028;

            } else if (gasUnits === "kWh") {
                naturalGasUsed = (lowestMonth + highestMonth) * 6 * 29.31;

            }
            document.getElementById("naturalGasUsed").value = naturalGasUsed;
            Session.set("totalNaturalGasUsed", naturalGasUsed);
            Session.set("totalNaturalGasCarbon", (naturalGasUsed/100) * 54.7 * 1.14 * 0.000001);
        }
    },
    "change #gasUnits": function() {
        Session.set("gasUnits", document.getElementById("gasUnits").value);
    }
});

Template.naturalGas.onCreated(function () {
    //add your statement here
});

Template.naturalGas.onRendered(function () {
    $('select').material_select();
    Session.set("gasUnits", "CcF");
    Session.set("totalNaturalGasUsed", 0);
    Session.set("totalNaturalGasCarbon", 0);
});

Template.naturalGas.onDestroyed(function () {
    //add your statement here
});

