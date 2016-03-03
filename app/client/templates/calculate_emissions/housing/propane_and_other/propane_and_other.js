Template.propaneAndOther.helpers({
    totalCarbon: function() {
        console.log("?");
        return Session.get("totalPropaneAndOtherCarbon").toFixed(2);
    },
    totalUsage: function() {
        return Session.get("totalPropaneAndOtherUsed").toFixed(2);
    }});

Template.propaneAndOther.events({
    "change #propaneAndOtherUsed": function() {
        console.log("ALK?");
        var propaneAndOtherUsed = parseInt(document.getElementById("propaneAndOtherUsed").value);
        if (!(isNaN(propaneAndOtherUsed))) {
            Session.set("totalPropaneAndOtherUsed", propaneAndOtherUsed);
            Session.set("totalPropaneAndOtherCarbon", propaneAndOtherUsed * 8362 * 0.000001);
        }
    },
    
    "change #propaneAndOtherUsedCheckbox": function() {
        $("#propaneAndOtherUsedCollapse").slideToggle(0);
    },
    "change #propaneCooking, change #propaneDrying, change #propaneWaterHeating": function() {
        var propaneCooking = document.getElementById("propaneCooking");
        var propaneDrying = document.getElementById("propaneDrying");
        var propaneWaterHeating = document.getElementById("propaneWaterHeating");
        var propaneAndOtherUsed = 0;
        if (propaneCooking.checked) {
            propaneCooking = 50;
        } else {
            propaneCooking = 0;
        }

        if (propaneDrying.checked) {
            propaneDrying = 100;
        } else {
            propaneDrying = 0;
        }

        if (propaneWaterHeating.checked) {
            propaneWaterHeating = 350;
        } else {
            propaneWaterHeating = 0;
        }

        propaneAndOtherUsed = propaneCooking + propaneDrying + propaneWaterHeating;
        document.getElementById("propaneAndOtherUsed").value = propaneAndOtherUsed;
        Session.set("totalPropaneAndOtherUsed", propaneAndOtherUsed);
        Session.set("totalPropaneAndOtherCarbon", propaneAndOtherUsed * 8362 * 0.000001);
    }
});

Template.propaneAndOther.onCreated(function () {
    //add your statement here
});

Template.propaneAndOther.onRendered(function () {
    Session.set("totalPropaneAndOtherUsed", 0);
    Session.set("totalPropaneAndOtherCarbon", 0);});

Template.propaneAndOther.onDestroyed(function () {
    //add your statement here
});

