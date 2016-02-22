Template.services.helpers({
    totalServices: function() {
        return calculateServices();
    }
});

Template.services.events({
    "click #cancel": function(){
        Router.go("/");
    },
    "submit": function() {
        event.preventDefault();
        if (validateTransport()) {
            var totalCarbon = parseFloat(document.getElementById("totalTransportEmissions").innerText) + parseFloat(document.getElementById("totalHousingEmissions").innerText) + parseFloat(document.getElementById("totalFoodEmissions").innerText) + parseFloat(document.getElementById("totalGoodsEmissions").innerText) + parseFloat(document.getElementById("totalServicesEmissions").innerText);
            totalCarbon = totalCarbon.toFixed(2);
            var record = {
                userID: Meteor.userId(),
                year: 2015,
                totalCarbon: totalCarbon,
                transportation: {
                    units: document.getElementById("units").value,
                    carDistanceTraveled: document.getElementById("carDistanceTraveled").value,
                    fuelEfficiency: document.getElementById("fuelEfficiency").value,
                    fuelType: document.getElementById("fuelType").value,
                    railDistanceTraveled: document.getElementById("railDistanceTraveled").value,
                    busDistanceTraveled: document.getElementById("busDistanceTraveled").value,
                    airDistanceTraveled: document.getElementById("airDistanceTraveled").value,
                    totalTransport: document.getElementById("totalTransportEmissions").innerText
                },
                housing: {
                    electricityUsed: document.getElementById('electricityUsed').value,
                    fuelUsed: document.getElementById('fuelUsed').value,
                    gasUsed: document.getElementById('gasUsed').value,
                    gasUnits: document.getElementById('gasUnits').value,
                    waterUsed: document.getElementById('waterUsed').value,
                    totalHousing: document.getElementById("totalHousingEmissions").innerText
                },
                food: {

                    meatConsumed: document.getElementById('meatConsumed').value,
                    poultryConsumed: document.getElementById('poultryConsumed').value,
                    seafoodConsumed: document.getElementById('seafoodConsumed').value,
                    dairyConsumed: document.getElementById('dairyConsumed').value,
                    vegetablesConsumed: document.getElementById('vegetablesConsumed').value,
                    grainsConsumed: document.getElementById('grainsConsumed').value,
                    drinksConsumed: document.getElementById('drinksConsumed').value,
                    totalFood: document.getElementById("totalFoodEmissions").innerText
                },
                goods: {
                    clothesSpentOn: document.getElementById('clothesSpentOn').value,
                    furnitureSpentOn: document.getElementById('furnitureSpentOn').value,
                    entertainmentSpentOn: document.getElementById('entertainmentSpentOn').value,
                    paperSpentOn: document.getElementById('paperSpentOn').value,
                    cleaningSpentOn: document.getElementById('cleaningSpentOn').value,
                    medicalSpentOn: document.getElementById('medicalSpentOn').value,
                    autoSpentOn: document.getElementById('autoSpentOn').value,
                    totalGoods: document.getElementById("totalGoodsEmissions").innerText
                },
                services: {
                    healthSpentOn: document.getElementById('healthSpentOn').value,
                    communicationsSpentOn: document.getElementById('communicationsSpentOn').value,
                    vehiclesSpentOn: document.getElementById('vehiclesSpentOn').value,
                    maintenanceSpentOn: document.getElementById('maintenanceSpentOn').value,
                    totalServices: document.getElementById("totalServicesEmissions").innerText
                }
            };

            var records = CarbonStats.find({userID: Meteor.userId(), year: 2015}).fetch();
            if (records.length === 1) {
                CarbonStats.update({_id: records[0]._id}, record);
            } else if (records.length === 0) {
                CarbonStats.insert(record);
            }
            Router.go("/pathways");

        }
        return false;
    },

    "change input": function() {
        updateServices();
    }
});

Template.services.onCreated(function () {
    //add your statement here
});

Template.services.onRendered(function () {
    $('select').material_select();
});

Template.services.onDestroyed(function () {
    //add your statement here
});



function validateTransport() {
    var errors =[];


    $('#transportation-form *').filter(':input').each(function(){
        if($(this).val() === "") {
            errors.push(this);
        }
    });
    if (errors.length > 0) {
        $("ul.tabs").tabs("select_tab", "transportation");
        Materialize.toast('You need to fill everything out!', 3000, 'rounded')
        $("html, body").animate({ scrollTop: 350 }, 0);
        return false;
    }
    return validateHousing();
}

function validateHousing() {

    var errors =[];

    $('#housing-form *').filter(':input').each(function(){
        if($(this).val() === "") {
            errors.push("Errors");
        }
    });

    if (errors.length > 0) {
        $("ul.tabs").tabs("select_tab", "housing");
        Materialize.toast('You need to fill everything out!', 3000, 'rounded')
        $("html, body").animate({ scrollTop: 350 }, 0);
        return false;
    }
    return validateFood();
}
function validateFood() {

    var errors =[];

    $('#food-form *').filter(':input').each(function(){
        if($(this).val() === "") {
            error.push("Errors");
        }

    });
    if (errors.length > 0 ) {
        $("ul.tabs").tabs("select_tab", "food");
        Materialize.toast('You need to fill everything out!', 3000, 'rounded')
        $("html, body").animate({ scrollTop: 350 }, 0);
        return false;
    }
    return validateGoods();
}

function validateGoods() {

    var errors =[];

    $('#goods-form *').filter(':input').each(function(){
        if($(this).val() === "") {
            errors.push("Errors");
        }
    });
    if (errors.length > 0 ) {
        $("ul.tabs").tabs("select_tab", "goods");
        Materialize.toast('You need to fill everything out!', 3000, 'rounded')
        $("html, body").animate({ scrollTop: 350 }, 0);
        return false;
    }
    return true;
}
function updateServices() {
    var totalServices = calculateServices();
    document.getElementById("totalServicesEmissions").innerHTML = totalServices.toFixed(2);
    var value = "Total: " + totalServices.toFixed(2);
    Materialize.toast(value, 3000);
}

function calculateServices() {

    var totalServices = 0;

    var healthSpentOn = (document.getElementById('healthSpentOn').value);
    var communicationsSpentOn = (document.getElementById('communicationsSpentOn').value);
    var vehiclesSpentOn = (document.getElementById("vehiclesSpentOn").value);
    var maintenanceSpentOn = (document.getElementById('maintenanceSpentOn').value);

    
    if (healthSpentOn !== "") {
        var healthCarbon = healthSpentOn * 1151 * 12 * 0.000001;
        totalServices = totalServices + healthCarbon;
    }

    if (communicationsSpentOn !== "") {
        var communicationsCarbon = communicationsSpentOn * 291 * 12 * 0.000001;
        totalServices = totalServices + communicationsCarbon;
    }

    if (vehiclesSpentOn !== "") {
        var vehiclesCarbon = vehiclesSpentOn * 433 * 12 * 0.000001;
        totalServices = totalServices + vehiclesCarbon;
    }
    if (maintenanceSpentOn !== "") {
        var maintenanceCarbon = maintenanceSpentOn * 134 * 12 * 0.000001;
        totalServices = totalServices + maintenanceCarbon;
    }


    return totalServices;
}