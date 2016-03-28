Template.transportation.helpers({

    units: function() {
        var units = Session.get("units");
    },

    totalCarbon: function() {
    }
});



Template.transportation.events({
    "click #cancel": function() {
        Router.go("/");
    },
    //"click #next": function() {
    //    event.preventDefault();
    //    $("ul.tabs").tabs("select_tab", "housing");
    //    $("html, body").animate({ scrollTop: 0 }, "slow");
    //    return false;
    //},

    "click .tabs.transportation, click .tab": function() {
        google.maps.event.trigger(GoogleMaps.maps.busMap.instance, 'resize');
        google.maps.event.trigger(GoogleMaps.maps.railMap.instance, 'resize');
        google.maps.event.trigger(GoogleMaps.maps.flyingMap.instance, 'resize');

    },

    "change #units": function() {
        var value = document.getElementById("units").value;
        if (value === "miles") {
            Session.set("units", value);
        } else if (value === "kilometers") {
            Session.set("units", value);
        }
    }

    //
    //"change #railDistanceTraveledCheckbox": function() {
    //    $("#railDistanceCollapse").slideToggle(500);
    //},
    //
    //"change #railMapCheckbox": function() {
    //    $("#railMapCollapse").slideToggle(500);
    //    google.maps.event.trigger(GoogleMaps.maps.railMap.instance, 'resize');
    //    //google.maps.event.trigger(GoogleMaps.maps.railMap.instance, 'center');
    //
    //},
    //
    //"click": function() {
    //
    //}
});

Template.transportation.onCreated(function () {
    Session.set("units", "miles");
    //Session.set("totalTransportationCarbon", Session.get("totalCarCarbon") + Session.get("totalMotorcycleCarbon") + Session.get("totalBusCarbon") + Session.get("totalRailCarbon") + Session.get("totalFlyingCarbon"));

});

Template.transportation.onRendered(function () {

    $('ul.tabs').tabs();
    $('select').material_select();
    //$('.modal-trigger').leanModal();
    $('#modal1').openModal();
    $('.collapsible').collapsible({
        accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
    //$('.tabs-wrapper .row').pushpin({ top: $('.tabs-wrapper').offset().top });

});

Template.transportation.onDestroyed(function () {
    //add your statement here
});
//
//
//function updateTransport() {
//    var totalTransport = calculateTransport();
//    document.getElementById("totalTransportEmissions").innerHTML = totalTransport.toFixed(2);
//    var value = "Total: " + totalTransport.toFixed(2);
//    //Materialize.toast(value, 3000);
//}
//
//function calculateTransport() {
//    if(document.getElementById('carDistanceTraveled') !== null) {
//
//        var totalTransport = 0;
//        var unitConversion = 1;
//
//        var carDistanceTraveled = (document.getElementById('carDistanceTraveled').value);
//        var fuelEfficiency = (document.getElementById('fuelEfficiency').value);
//        var fuelType = (document.getElementById('fuelType').value);
//        var railDistanceTraveled = (document.getElementById('railDistanceTraveled').value);
//        var busDistanceTraveled = (document.getElementById('busDistanceTraveled').value);
//        var airDistanceTraveled = (document.getElementById('airDistanceTraveled').value);
//
//        var units = (document.getElementById('units').value);
//
//        if (units === 'miles') {
//            unitConversion = 1;
//        }
//        else if (units === "kilometers") {
//            unitConversion = 1.60934;
//        }
//
//        if (fuelType === 'diesel' && fuelEfficiency !== "" && carDistanceTraveled !== "") {
//            var carCarbon = (((carDistanceTraveled / fuelEfficiency * 2307) + (carDistanceTraveled / fuelEfficiency * 10153) + (carDistanceTraveled * 56)) * 0.000001) * unitConversion;
//            totalTransport = totalTransport + carCarbon;
//        } else if (fuelType === 'gasoline' && fuelEfficiency !== "" && carDistanceTraveled !== "") {
//
//            var carCarbon = (((carDistanceTraveled / fuelEfficiency * 2307) + (carDistanceTraveled / fuelEfficiency * 8874) + (carDistanceTraveled * 56)) * 0.000001) * unitConversion;
//            totalTransport = totalTransport + carCarbon;
//        }
//
//        if (busDistanceTraveled !== "") {
//            var busCarbon = (busDistanceTraveled * 300 * 1.26 * 0.000001) * unitConversion;
//            totalTransport = totalTransport + busCarbon;
//        }
//        if (railDistanceTraveled !== "") {
//            var railCarbon = (railDistanceTraveled * 163 * 1.26 * 0.000001) * unitConversion;
//            totalTransport = totalTransport + railCarbon;
//        }
//        if (airDistanceTraveled !== "") {
//
//            var airCarbon = (airDistanceTraveled * 223 * 2 * 0.000001) * unitConversion;
//            totalTransport = totalTransport + airCarbon;
//        }
//        return totalTransport;
//    }
//
//}
//
