Template.motorcycle.helpers({
    units: function() {
        return Session.get("units");
    },

    totalDistance: function() {

        return (parseFloat(Session.get("motorcycleDistanceTraveled"))).toFixed(2);
    },
    totalCarbon: function() {

        return (parseFloat(Session.get("totalMotorcycleCarbon"))).toFixed(2);
    }
});

function calculateTotalMotorcycleCarbon() {
    var totalMotorcycleCarbon = 0;
    var motorcycleDistanceTraveled = parseFloat(Session.get("motorcycleDistanceTraveled"));
    var motorcycleCC = document.getElementById("motorcycleCC").value;
    var units = Session.get("units");

    if (motorcycleCC === "less") {
        totalMotorcycleCarbon = (motorcycleDistanceTraveled * 136.796) * 0.000001;
    } else if (motorcycleCC === "between") {
        totalMotorcycleCarbon = (motorcycleDistanceTraveled * 166.084) * 0.000001;
    } else if (motorcycleCC === "greater") {
        totalMotorcycleCarbon = (motorcycleDistanceTraveled * 220.802) * 0.000001;
    }

    if (units === "miles") {
        // DO NOTHING
    } else if (units === "kilometers") {
        totalMotorcycleCarbon = totalMotorcycleCarbon * 0.621371;
    }
    Session.set("totalMotorcycleCarbon", totalMotorcycleCarbon);
}

Template.motorcycle.events({
    "change #motorcycleDistanceTraveled": function() {
        if (document.getElementById("motorcycleDistanceTraveled").value !== "") {
            Session.set("motorcycleDistanceTraveled", document.getElementById("motorcycleDistanceTraveled").value);
        }
        if (document.getElementById("motorcycleCC").value !== "") {
            calculateTotalMotorcycleCarbon();
        }
    },

    "change #motorcycleCheckbox": function() {
        $("#motorcycleDistanceCollapse").slideToggle(0);
    },

    "change #motorcycleMileageLastCheck, change #motorcycleDateLastCheck, change #motorcycleCurrentMileage, change #motorcycleCurrentDate": function() {
        var motorcycleDistanceTraveled = document.getElementById("motorcycleDistanceTraveled");
        var motorcycleMileageLastCheck = document.getElementById("motorcycleMileageLastCheck").value;
        var motorcycleCurrentMileage = document.getElementById("motorcycleCurrentMileage").value;
        var motorcycleDateLastCheck = new Date(document.getElementById("motorcycleDateLastCheck").value);
        var motorcycleCurrentDate = new Date(document.getElementById("motorcycleCurrentDate").value);


        if (motorcycleMileageLastCheck !== "" && motorcycleCurrentMileage !== "" && document.getElementById("motorcycleDateLastCheck").value !== "" && document.getElementById("motorcycleCurrentDate").value !== "") {
            motorcycleDistanceTraveled.value = ((motorcycleCurrentMileage - motorcycleMileageLastCheck) / (Math.floor((motorcycleCurrentDate - motorcycleDateLastCheck) / (1000*60*60*24)))) * 365;
            Session.set("motorcycleDistanceTraveled", motorcycleDistanceTraveled.value);
        }
        if (document.getElementById("motorcycleCC").value !== "") {
            calculateTotalMotorcycleCarbon();
        }


    },
    "change #motorcycleCC": function() {
        if (document.getElementById("motorcycleCC").value !== "" && document.getElementById("motorcycleDistanceTraveled").value !== "") {
            calculateTotalMotorcycleCarbon();
        }
    }
});

Template.motorcycle.onCreated(function () {
    //add your statement here
});

Template.motorcycle.onRendered(function () {
    Session.set("motorcycleDistanceTraveled", 0);
    Session.set("totalMotorcycleCarbon", 0);
});

Template.motorcycle.onDestroyed(function () {
    //add your statement here
});

