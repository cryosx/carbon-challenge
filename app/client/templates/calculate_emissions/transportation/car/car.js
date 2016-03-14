//var transportationChart = $("#transportationChart").highcharts();

Template.car.helpers({
    units: function() {
        return Session.get("units");
    },

    totalDistance: function() {

        return (parseFloat(Session.get("carDistanceTraveled"))).toFixed(2);
    },
    totalCarbon: function() {
        return (parseFloat(Session.get("totalCarCarbon"))).toFixed(2);
    }
});

function calculateTotalCarCarbon() {
    var totalCarCarbon = 0;
    var fuelType = document.getElementById("fuelType").value;
    var fuelEfficiency = document.getElementById("fuelEfficiency").value;
    var carDistanceTraveled = parseFloat(Session.get("carDistanceTraveled"));
    var units = Session.get("units");

    if (fuelType === "gasoline") {
        totalCarCarbon = (((carDistanceTraveled / fuelEfficiency) * 2307) + ((carDistanceTraveled / fuelEfficiency) * 8874) + (carDistanceTraveled * 56)) * 0.000001;
    } else if (fuelType === "diesel") {
        totalCarCarbon = (((carDistanceTraveled / fuelEfficiency) * 2335) + ((carDistanceTraveled / fuelEfficiency) * 10153) + (carDistanceTraveled * 56)) * 0.000001;
    }

    if (units === "miles") {
        // DO NOTHING
    } else if (units === "kilometers") {
        totalCarCarbon = totalCarCarbon * 0.621371;
    }
    //transportationChart.series[0].data[0].update((totalCarCarbon).toFixed(2));
    Session.set("totalCarCarbon", totalCarCarbon);
}

Template.car.events({
    "change #carDistanceTraveled, change #fuelEfficiency": function() {
        if (document.getElementById("carDistanceTraveled").value !== "" && document.getElementById("fuelEfficiency").value !== "") {
            Session.set("carDistanceTraveled", document.getElementById("carDistanceTraveled").value);
            Session.set("fuelEfficiency", document.getElementById("fuelEfficiency").value);
            calculateTotalCarCarbon();
        }
    },

    "change #carDistanceTraveledCheckbox": function() {
        $("#carDistanceCollapse").slideToggle(0);
    },
    "change #carMileageLastCheck, change #carDateLastCheck, change #carCurrentMileage, change #carCurrentDate": function() {

        var carDistanceTraveled = document.getElementById("carDistanceTraveled");
        var carMileageLastCheck = document.getElementById("carMileageLastCheck").value;
        var carCurrentMileage = document.getElementById("carCurrentMileage").value;
        var carDateLastCheck = new Date(document.getElementById("carDateLastCheck").value);
        var carCurrentDate = new Date(document.getElementById("carCurrentDate").value);

        if (carMileageLastCheck !== "" && carCurrentMileage !== "" && document.getElementById("carDateLastCheck").value !== "" && document.getElementById("carCurrentDate").value !== "") {
            carDistanceTraveled.value = (((carCurrentMileage - carMileageLastCheck) / (Math.floor((carCurrentDate - carDateLastCheck) / (1000*60*60*24)))) * 365).toFixed(2);
            Session.set("carDistanceTraveled", carDistanceTraveled.value);
        }

        if (document.getElementById("carDistanceTraveled").value !== "" && document.getElementById("fuelEfficiency").value !== "") {
            Session.set("carDistanceTraveled", document.getElementById("carDistanceTraveled").value);
            Session.set("fuelEfficiency", document.getElementById("fuelEfficiency").value);
            calculateTotalCarCarbon();
        }
    },

    "change #fuelEfficiencyCheckbox": function() {

        // POPULATE the <options> for <select id="carMake">

        // NEED to call material_seelct('destory) to update <options> along with material_select() at the bottom

        $('select').material_select('destroy');

        var cars = Cars.find().fetch();
        var select = document.getElementById("carMake");
        var option;

        document.getElementById("carModel").innerHTML = "<option disabled selected>Select a Model</option>";
        document.getElementById("carYear").innerHTML = "<option disabled selected>Select a Year</option>";
        select.innerHTML = "<option disabled selected>Select a Make</option>";

        cars.sort(function(a,b) {
            return a.make.toUpperCase().localeCompare(b.make.toUpperCase());
        });

        // Using " : " (space, colon, space) as a delimiter.
        cars.forEach(function(current, index) {
            option = document.createElement("option");
            option.value = index + " : " + current.make;
            option.text = current.make;
            select.add(option);
        });

        // NEED to call material_seelct() again to update <options>

        $('select').material_select();

        // HIDE and show car selection for fuel efficiency

        $("#fuelEfficiencyCollapse").slideToggle(0);

    },
    "change #carMake": function() {

        // POPULATE <options> for <select id="carModel">

        var make = document.getElementById("carMake").value.split(" : ")[1];
        var select = document.getElementById("carModel");
        var option;
        var temp = Cars.find({make: make}).fetch();

        document.getElementById("carYear").innerHTML = "<option disabled selected>Select a Year</option>";
        select.innerHTML = "<option disabled selected>Select a Model</option>";

        temp = temp[0].models;

        // Using " : " (space, colon, space) as a delimiter.
        temp.forEach(function(current, index) {
            option = document.createElement("option");
            option.value = index + " : " + current.model;
            option.text = current.model;
            select.add(option);
        })

        // NEED to call material_seelct() again to update <options>
        $('select').material_select();

    },

    "change #carModel": function() {

        // POPULATE <options> for <select id="carYear">

        var make = document.getElementById("carMake").value.split(" : ")[1];
        var modelIndex = document.getElementById("carModel").value.split(" : ")[0];
        var select = document.getElementById("carYear");

        var option;
        var car = Cars.find({make: make}).fetch();
        select.innerHTML = "<option disabled selected>Select a Year</option>";
        car = car[0].models[modelIndex].years;

        car.forEach(function(item, index) {
            option = document.createElement("option");
            option.value = index + " : " + item.year;
            option.text = item.year;
            select.add(option);
        })

        // NEED to call material_seelct() again to update <options>
        $('select').material_select();
    },

    "change #carYear": function() {
        var fuelEfficiency = document.getElementById("fuelEfficiency");
        var make = document.getElementById("carMake").value.split(" : ")[1];
        var modelIndex = document.getElementById("carModel").value.split(" : ")[0];
        var yearIndex = document.getElementById("carYear").value.split(" : ")[0];
        var car = Cars.find({make: make}).fetch();
        car = car[0].models[modelIndex].years[yearIndex];
        if (document.getElementById("units").value === "miles") {
            fuelEfficiency.value = car.MPG;
            Session.set("carFuelEfficiency", car.MPG);
        } else if (document.getElementById("units").value === "kilometers") {
            fuelEfficiency.value = car.KPG;
            Session.set("carFuelEfficiency", car.KPG);
        }

        if (document.getElementById("carDistanceTraveled").value !== "" && document.getElementById("fuelEfficiency").value !== "") {
            Session.set("carDistanceTraveled", document.getElementById("carDistanceTraveled").value);
            Session.set("fuelEfficiency", document.getElementById("fuelEfficiency").value);
            calculateTotalCarCarbon();
        }

    },
});

Template.car.onCreated(function () {

    this.autorun(function () {
        //this.subscribe('Cars');
        Meteor.subscribe('Cars');

    });
});

Template.car.onRendered(function () {
    $('.datepicker').pickadate({
        selectMonths: false, // Creates a dropdown to control month
        selectYears: 10 // Creates a dropdown of 15 years to control year
    });
    Session.set("carDistanceTraveled", 0);
    Session.set("totalCarCarbon", 0);
});

Template.car.onDestroyed(function () {
    //add your statement here
});

