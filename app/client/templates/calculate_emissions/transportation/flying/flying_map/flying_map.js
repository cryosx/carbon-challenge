/**
 *
 * Flying Map
 *
 */

var FlyingRoutes = new Meteor.Collection(null);
var flightPath = null;  // USED IN calculateAndDisplayRoute()
var markerOrigin = null;
var markerDestination = null;

Template.flyingMap.helpers({
    flyingMapOptions: function() {
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(21.407751, -157.900071),
                zoom: 12
            };
        }
    },

    units: function() {
        return Session.get("units");
    },

    flyingRoutes: function() {
        return FlyingRoutes.find();
    },

    totalDistance: function() {

        return calculateTotalDistance().toFixed(2);
    },
    totalCarbon: function() {
        var totalFlyingCarbon = calculateTotalDistance() * 223 * 2 * 0.000001;
        Session.set("totalFlyingCarbon", totalFlyingCarbon);
        return totalFlyingCarbon.toFixed(2);
    }
});

function calculateTotalDistance() {
    var totalDistance = 0;
    FlyingRoutes.find({}).fetch().forEach(function(item, index) {
        if (item.timespan === "week") {
            totalDistance = totalDistance + parseFloat(item.distance) * parseInt(item.frequency) * 52;
        } else if (item.timespan === "month") {
            totalDistance = totalDistance + parseFloat(item.distance) * parseInt(item.frequency) * 12;

        } else if (item.timespan === "year") {
            totalDistance = totalDistance + parseFloat(item.distance) * parseInt(item.frequency);
        }
        if (item.roundTrip === "yes") {
            totalDistance = totalDistance * 2;
        }
    });
    return totalDistance;
}

Template.flyingMap.events({
    "click #flying-input-origin": function() {
        $("#flying-input-origin").select();
    },
    "click #flying-input-destination": function() {
        $("#flying-input-destination").select();
    },

    //"change #flying-input-origin, change  #flying-input-destination": function() {
    //
    //    if (document.getElementById('flying-input-origin').value !== "" && document.getElementById('flying-input-destination').value !== "") {
    //        //calculateAndDisplayRoute(directionsService, directionsDisplay);
    //    }
    //},

    "click": function() {

    },
    "submit": function(event) {
        event.preventDefault();
    },
    "click #add-flying-route": function(event,template) {
        //var flyingFlyingRoutes;
        //var flyingIndex = Session.get("flyingRouteIndex");

        if (document.getElementById("flying-input-origin").value === "" || document.getElementById("flying-input-destination").value === "") {
            console.log("?");
        } else {
            event.preventDefault();
            var frequencyText = "times";
            var once = false;
            if (parseInt(document.getElementById("flying-input-frequency").value) === 1) {
                frequencyText = "once"
                once = true;
            }
            var flyingRoute = {
                //flyingIndex: flyingIndex,
                origin: document.getElementById("flying-input-origin").value.split(",")[0],
                destination: document.getElementById("flying-input-destination").value.split(",")[0],
                frequency: document.getElementById("flying-input-frequency").value,
                frequencyText: frequencyText,
                once: once,
                timespan: document.getElementById("flying-input-timespan").value,
                roundTrip: document.getElementById("flying-input-roundtrip").value,
                distance: Session.get("currentRouteTotalDistance"),
                shortDistance: Session.get("currentRouteTotalDistance").toFixed(2),
                units: document.getElementById('units').value
            };
            if (FlyingRoutes.find({origin: flyingRoute.origin, destination: flyingRoute.destination}).fetch().length === 0 && FlyingRoutes.find({origin: flyingRoute.destination, destination: flyingRoute.origin}).fetch().length === 0) {
                FlyingRoutes.insert(flyingRoute);
                flightPath.setMap(null);
                markerOrigin.setMap(null);
                markerDestination.setMap(null);
                document.getElementById("flying-input-origin").value = "";
                document.getElementById("flying-input-destination").value = "";
            } else {

            }
        }

        //console.log(Routes.find({}));
        //if (flyingIndex === 0) {
        //    flyingFlyingRoutes = [];
        //} else {
        //    flyingFlyingRoutes = Session.get("flyingRoutes");
        //}
        //flyingFlyingRoutes.push(flyingRoute);
        //Session.set("flyingRoutes", flyingFlyingRoutes);
        //Session.set("flyingRouteIndex", flyingIndex + 1);
        //$('.tooltipped').tooltip({delay: 50});

    }
    //"change #flying-input-origin, change #flying-input-destination": function() {
    //
    //}
});

Template.flyingMap.onCreated(function () {
    init();
});

Template.flyingMap.onRendered(function () {
    GoogleMaps.load({libraries: 'geometry,places'});
    $('.tooltipped').tooltip({delay: 50});
    $('select').material_select();
    Session.set("currentRouteTotalDistance", 0);
    Session.set("totalFlyingCarbon", 0);


    //Session.set("flyingRoutes",[]);
    //Session.set("flyingRouteIndex", 0);
});

Template.flyingMap.onDestroyed(function () {
    //add your statement here
});

Template.flyingRoute.events({
    "click .remove": function (event, template) {
        var self = this;
        $(template.find("li")).fadeOut(500, function () {
            FlyingRoutes.remove(self._id);
        });
        return false;
    }
    //"mouseover .remove":function () {
    //}

});

function init() {
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('flyingMap', function(map) {

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;

        var currentLocationInfoWindow = new google.maps.InfoWindow();

        var map = GoogleMaps.maps.flyingMap.instance;
        //var infoWindow = new google.maps.InfoWindow({map: map});
        directionsDisplay.setMap(map);


        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                var currentLocationMarker = new google.maps.Marker({
                    map: map,
                    draggable: true,
                    animation: google.maps.Animation.DROP,
                    position: {lat: position.coords.latitude, lng: position.coords.longitude},
                    icon: "http://i.stack.imgur.com/orZ4x.png"
                });
                map.setCenter(pos);

                currentLocationInfoWindow.close();
                currentLocationInfoWindow.setContent('<strong>' + 'Current Location' + '</strong>');
                currentLocationInfoWindow.open(map, currentLocationMarker);

            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }

        var inputOrigin = document.getElementById('flying-input-origin');
        var inputDestination = document.getElementById('flying-input-destination');
        var inputSubmit = document.getElementById('flying-submit');
        routeDistanceLabel = document.getElementById('flying-route-distance-label');


        var polylineOrigin;
        var polylineDestination;

        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(routeDistanceLabel);

        var autocompleteOrigin = new google.maps.places.Autocomplete(inputOrigin);
        autocompleteOrigin.bindTo('bounds', map);

        var infowindowOrigin = new google.maps.InfoWindow();
        markerOrigin = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29),
        });

        autocompleteOrigin.addListener('place_changed', function() {
            //infowindowOrigin.close();
            currentLocationInfoWindow.close();
            markerOrigin.setVisible(false);

            var place = autocompleteOrigin.getPlace();
            if (!place.geometry) {
                window.alert("Autocomplete's returned place contains no geometry");
                return;
            }

            polylineOrigin = place.geometry.location;

            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);  // Why 17? Because it looks good.
            }
            markerOrigin.setIcon(/** @type {google.maps.Icon} */({
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(35, 35)
            }));
            markerOrigin.setPosition(place.geometry.location);
            markerOrigin.setVisible(true);
            markerOrigin.setDraggable(false);

            //var address = '';
            //
            //if (place.address_components) {
            //    //var componenets = [];
            //    //place.address_components.forEach(function(item, index) {
            //    //    componenets.push(item.short_name);
            //    //});
            //    //
            //    //address = componenets.join(', ');
            //    //console.log(address);
            //    address = [
            //        (place.address_components[0] && place.address_components[0].short_name || ''),
            //        (place.address_components[1] && place.address_components[1].short_name || ''),
            //        (place.address_components[2] && place.address_components[2].short_name || '')
            //    ].join(', ');
            //}

            infowindowOrigin.setContent('<div><strong>' + place.name + '</strong><br>');
            infowindowOrigin.open(map, markerOrigin);
        });

        var autocompleteDestination = new google.maps.places.Autocomplete(inputDestination);
        autocompleteDestination.bindTo('bounds', map);

        var infowindowDestination = new google.maps.InfoWindow();

        markerDestination = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29),
        });

        autocompleteDestination.addListener('place_changed', function() {
            //infowindowDestination.close();
            currentLocationInfoWindow.close();

            markerDestination.setVisible(false);
            var place = autocompleteDestination.getPlace();
            if (!place.geometry) {
                window.alert("Autocomplete's returned place contains no geometry");
                return;
            }

            polylineDestination = place.geometry.location;

            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);  // Why 17? Because it looks good.
            }
            markerDestination.setIcon(/** @type {google.maps.Icon} */({
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(35, 35)
            }));
            markerDestination.setPosition(place.geometry.location);
            markerDestination.setVisible(true);
            markerDestination.setDraggable(false);
            var address = '';

            if (place.address_components) {
                //var componenets = [];
                //place.address_components.forEach(function(item, index) {
                //    componenets.push(item.short_name);
                //});
                //
                //address = componenets.join(', ');
                address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(', ');
            }

            infowindowDestination.setContent('<div><strong>' + place.name + '</strong><br>');
            infowindowDestination.open(map, markerDestination);
        });

        // Sets a listener on a radio button to change the filter type on Places
        // Autocomplete.
        //function setupClickListener(id, types) {
        //    var radioButton = document.getElementById(id);
        //    radioButton.addEventListener('click', function() {
        //        autocomplete.setTypes(types);
        //    });
        //}
        //
        //setupClickListener('changetype-all', []);
        //setupClickListener('changetype-address', ['address']);
        //setupClickListener('changetype-establishment', ['establishment']);
        //setupClickListener('changetype-geocode', ['geocode']);

        var onChangeHandler = function() {
            if (document.getElementById('flying-input-origin').value !== "" && document.getElementById('flying-input-destination').value !== "") {
                //console.log(polylineOrigin);
                //console.log(polylineDestination);

                infowindowOrigin.close();
                infowindowDestination.close();
                currentLocationInfoWindow.close();
                calculateAndDisplayRoute(polylineOrigin, polylineDestination);
            }
        };
        //document.getElementById('flying-input-origin').addEventListener('change', onChangeHandler);
        //document.getElementById('flying-input-destination').addEventListener('change', onChangeHandler);
        inputSubmit.addEventListener('click', onChangeHandler);
    });
}

function calculateAndDisplayRoute(origin, destination) {

    //console.log(origin);
    //console.log(destination);
    var map = GoogleMaps.maps.flyingMap.instance;

    if (flightPath !== null) {
        flightPath.setPath([origin, destination]);
    } else {
        flightPath = new google.maps.Polyline({
            geodesic: true,
            path: [origin, destination],
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 5
        });
    }

    flightPath.setMap(map);

    var distance = google.maps.geometry.spherical.computeDistanceBetween(origin, destination) * 100 / 2.54 / 12 / 5280;
    Session.set("currentRouteTotalDistance", distance);

    updateRouteDistanceLabel(distance);

    var bounds = new google.maps.LatLngBounds();
    bounds.extend(origin);
    bounds.extend(destination);

    map.fitBounds(bounds);
}

function updateRouteDistanceLabel(distance) {
    var textLabel = distance.toFixed(2);
    var units = (document.getElementById('units').value)

    if (units === 'miles') {
        textLabel += " mi";
    }
    else if (units === "kilometers") {
        textLabel += " km";
    }
    routeDistanceLabel.innerText = textLabel;
}

//function calculateTotalRouteDistance(route) {
//    var totalDistance = 0;
//    var unitConversion = 1;
//
//    for (var i = 0; i < route.legs.length; i++) {
//        totalDistance += route.legs[i].distance.value;
//    }
//
//    var units = (document.getElementById('units').value)
//
//    // Google maps returns distance in meters, must convert that to miles or kilometers
//    if (units === 'miles') {
//        unitConversion = 100 / 2.54 / 12 / 5280;
//    }
//    else if (units === "kilometers") {
//        unitConversion = 0.001;
//    }
//
//    totalDistance = totalDistance * unitConversion;
//    Session.set("currentRouteTotalDistance", totalDistance);
//    return totalDistance;
//}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}


