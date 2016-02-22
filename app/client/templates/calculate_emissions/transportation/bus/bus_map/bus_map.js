/**
 *
 * Bus Map
 *
 */

var BusRoutes = new Meteor.Collection(null);

Template.busMap.helpers({
    busMapOptions: function() {
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

    busRoutes: function() {
        return BusRoutes.find();
    },

    totalDistance: function() {

        return totalDistance().toFixed(2);
    },
    totalCarbon: function() {
        var totalBusCarbon = totalDistance() * 1.26 * 300 * 0.000001;
        Session.set("totalBusCarbon", totalBusCarbon);
        return totalBusCarbon.toFixed(2);
    }

});

function totalDistance() {
    var totalDistance = 0;
    BusRoutes.find({}).fetch().forEach(function(item, index) {
        if (item.timespan === "week") {
            if (item.schoolYear === "yes") {
                totalDistance = totalDistance + parseFloat(item.distance) * parseInt(item.frequency) * 40;
            } else if (item.schoolYear === "no") {
                totalDistance = totalDistance + parseFloat(item.distance) * parseInt(item.frequency) * 52;
            }
        } else if (item.timespan === "month") {
            if (item.schoolYear === "yes") {
                totalDistance = totalDistance + parseFloat(item.distance) * parseInt(item.frequency) * 8;
            } else if (item.schoolYear === "no") {
                totalDistance = totalDistance + parseFloat(item.distance) * parseInt(item.frequency) * 12;
            }
        } else if (item.timespan === "year") {
            totalDistance = totalDistance + parseFloat(item.distance) * parseInt(item.frequency);
        }
    });
    return totalDistance;
}

Template.busMap.events({
    "click #bus-input-origin": function() {
        $("#bus-input-origin").select();
    },
    "click #bus-input-destination": function() {
        $("#bus-input-destination").select();
    },

    //"change #bus-input-origin, change  #bus-input-destination": function() {
    //
    //    if (document.getElementById('bus-input-origin').value !== "" && document.getElementById('bus-input-destination').value !== "") {
    //        //calculateAndDisplayRoute(directionsService, directionsDisplay);
    //    }
    //},

    "click": function() {

    },
    "submit": function(event) {
        event.preventDefault();
    },
    "click #add-bus-route": function(event,template) {
        //var busBusRoutes;
        //var busIndex = Session.get("busRouteIndex");

        if (document.getElementById("bus-input-origin").value === "" || document.getElementById("bus-input-destination").value === "") {
            console.log("?");
        } else {
            event.preventDefault();
            var frequencyText = "times";
            var once = false;
            if (parseInt(document.getElementById("bus-input-frequency").value) === 1) {
                frequencyText = "once"
                once = true;
            }
            var busRoute = {
                //busIndex: busIndex,
                origin: document.getElementById("bus-input-origin").value.split(",")[0],
                destination: document.getElementById("bus-input-destination").value.split(",")[0],
                frequency: document.getElementById("bus-input-frequency").value,
                frequencyText: frequencyText,
                once: once,
                timespan: document.getElementById("bus-input-timespan").value,
                schoolYear: document.getElementById("bus-input-schoolyear").value,
                distance: Session.get("currentRouteTotalDistance"),
                shortDistance: Session.get("currentRouteTotalDistance").toFixed(2),
                units: document.getElementById('units').value
            };
            if (BusRoutes.find({origin: busRoute.origin, destination: busRoute.destination}).fetch().length === 0 && BusRoutes.find({origin: busRoute.destination, destination: busRoute.origin}).fetch().length === 0) {
                BusRoutes.insert(busRoute);
                document.getElementById("bus-input-origin").value = "";
                document.getElementById("bus-input-destination").value = "";
            } else {

            }
        }

        //console.log(Routes.find({}));
        //if (busIndex === 0) {
        //    busBusRoutes = [];
        //} else {
        //    busBusRoutes = Session.get("busRoutes");
        //}
        //busBusRoutes.push(busRoute);
        //Session.set("busRoutes", busBusRoutes);
        //Session.set("busRouteIndex", busIndex + 1);
        //$('.tooltipped').tooltip({delay: 50});

    }
    //"change #bus-input-origin, change #bus-input-destination": function() {
    //
    //}
});

Template.busMap.onCreated(function () {
    init();
});

Template.busMap.onRendered(function () {
    GoogleMaps.load({libraries: 'geometry,places'});
    $('.tooltipped').tooltip({delay: 50});
    $('select').material_select();

    Session.set("currentRouteTotalDistance", 0);
    Session.set("totalBusCarbon", 0);

    //Session.set("busRoutes",[]);
    //Session.set("busRouteIndex", 0);
});

Template.busMap.onDestroyed(function () {
    //add your statement here
});

Template.busRoute.events({
    "click .remove": function (event, template) {
        var self = this;
        $(template.find("li")).fadeOut(500, function () {
            BusRoutes.remove(self._id);
        });
        return false;
    }
    //"mouseover .remove":function () {
    //}

});

function init() {
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('busMap', function(map) {

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;

        var currentLocationInfoWindow = new google.maps.InfoWindow();

        var map = GoogleMaps.maps.busMap.instance;
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

        var inputOrigin = document.getElementById('bus-input-origin');
        var inputDestination = document.getElementById('bus-input-destination');
        var inputSubmit = document.getElementById('bus-submit');
        routeDistanceLabel = document.getElementById('bus-route-distance-label');



        //var types = document.getElementById('type-selector');

        //map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(inputOrigin);
        //map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(inputDestination);
        //map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(inputSubmit);
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(routeDistanceLabel);


        //map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

        var autocompleteOrigin = new google.maps.places.Autocomplete(inputOrigin);
        autocompleteOrigin.bindTo('bounds', map);

        var infowindowOrigin = new google.maps.InfoWindow();
        var markerOrigin = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29),
        });

        autocompleteOrigin.addListener('place_changed', function() {
            infowindowOrigin.close();
            currentLocationInfoWindow.close();

            markerOrigin.setVisible(false);
            var place = autocompleteOrigin.getPlace();
            if (!place.geometry) {
                window.alert("Autocomplete's returned place contains no geometry");
                return;
            }

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
            var address = '';

            if (place.address_components) {
                //var componenets = [];
                //place.address_components.forEach(function(item, index) {
                //    componenets.push(item.short_name);
                //});
                //
                //address = componenets.join(', ');
                //console.log(address);
                address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(', ');
            }

            //= address;
            infowindowOrigin.setContent('<div><strong>' + place.name + '</strong><br>' + address);
            infowindowOrigin.open(map, markerOrigin);
        });

        var autocompleteDestination = new google.maps.places.Autocomplete(inputDestination);
        autocompleteDestination.bindTo('bounds', map);

        var infowindowDestination = new google.maps.InfoWindow();
        var markerDestination = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29),
        });

        autocompleteDestination.addListener('place_changed', function() {
            infowindowDestination.close();
            currentLocationInfoWindow.close();

            markerDestination.setVisible(false);
            var place = autocompleteDestination.getPlace();
            if (!place.geometry) {
                window.alert("Autocomplete's returned place contains no geometry");
                return;
            }

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

            infowindowDestination.setContent('<div><strong>' + place.name + '</strong><br>' + address);
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
            if (document.getElementById('bus-input-origin').value !== "" && document.getElementById('bus-input-destination').value !== "") {
                infowindowOrigin.close();
                infowindowDestination.close();
                calculateAndDisplayRoute(directionsService, directionsDisplay);

            } else {
            }
            //console.log(document.getElementById('bus-input-origin').value);
            //console.log(document.getElementById('bus-input-destination').value);

        };
        document.getElementById('bus-input-origin').addEventListener('change', onChangeHandler);
        document.getElementById('bus-input-destination').addEventListener('change', onChangeHandler);
        //document.getElementById('bus-submit').addEventListener('click', onChangeHandler);


    });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    _.delay(function() {
        var transitMode = google.maps.TransitMode.BUS;
        directionsService.route({
            origin: document.getElementById('bus-input-origin').value,
            destination: document.getElementById('bus-input-destination').value,
            //origin: originAddress,
            //destination: destinationAddress,
            travelMode: google.maps.TravelMode.TRANSIT,
            transitOptions: {
                //arrivalTime: new Date(),
                //departureTime: new Date(),
                modes: [transitMode],
                //routingPreference: busRoutePreference
            },
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            provideRouteAlternatives: true
        }, function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                updateRouteDistanceLabel(response.routes[0]);
                directionsDisplay.setDirections(response);
                //
                //for (var i = 0, len = response.routes.length; i < len; i++) {
                //    //directionsDisplay.setDirections(response);
                //
                //    new google.maps.DirectionsRenderer({
                //        map: GoogleMaps.maps.busMap.instance,
                //        directions: response,
                //        routeIndex: i
                //    });
                //}
            } else {
                var infowindowRoute = new google.maps.InfoWindow();
                infowindowRoute.close();
                infowindowRoute.setContent('<div><strong>' +'Directions request failed due to ' + status + '</strong><br>');
                infowindowRoute.setPosition(GoogleMaps.maps.busMap.instance.getCenter());
                infowindowRoute.open(GoogleMaps.maps.busMap.instance);
                document.getElementById("bus-input-origin").value = "";
                document.getElementById("bus-input-destination").value = "";
            }
        });
    },300);
}

function updateRouteDistanceLabel(route) {
    var textLabel;
    textLabel = calculateTotalRouteDistance(route).toFixed(2);
    var units = (document.getElementById('units').value)

    if (units === 'miles') {
        textLabel += " mi";
    }
    else if (units === "kilometers") {
        textLabel += " km";
    }
    routeDistanceLabel.innerText = textLabel;
}

function calculateTotalRouteDistance(route) {
    var totalDistance = 0;
    var unitConversion = 1;

    //for (var i = 0; i < route.legs.length; i++) {
    //    totalDistance += route.legs[i].distance.value;
    //}
    route.legs.forEach(function(leg, index) {
        totalDistance += leg.distance.value;
    });

    var units = (document.getElementById('units').value)

    // Google maps returns distance in meters, must convert that to miles or kilometers
    if (units === 'miles') {
        unitConversion = 100 / 2.54 / 12 / 5280;
    }
    else if (units === "kilometers") {
        unitConversion = 0.001;
    }

    totalDistance = totalDistance * unitConversion;
    Session.set("currentRouteTotalDistance", totalDistance);
    return totalDistance;
}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}


