/**
 *
 * Rail Map
 *
 */

var RailRoutes = new Meteor.Collection(null);

Template.railMap.helpers({
    railMapOptions: function() {
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

    railRoutes: function() {
        return RailRoutes.find();
    },

    totalDistance: function() {

        return totalDistance().toFixed(2);
    },
    totalCarbon: function() {
        var totalRailCarbon = (totalDistance() * 185 * 1.26) * 0.000001;
        Session.set("totalRailCarbon", totalRailCarbon);
        return totalRailCarbon.toFixed(2);
        return totalRailCarbon.toFixed(2);
    }

});

function totalDistance() {
    var totalDistance = 0;
    RailRoutes.find({}).fetch().forEach(function(item, index) {
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

Template.railMap.events({
    "click #rail-input-origin": function() {
        $("#rail-input-origin").select();
    },
    "click #rail-input-destination": function() {
        $("#rail-input-destination").select();
    },

    //"change #rail-input-origin, change  #rail-input-destination": function() {
    //
    //    if (document.getElementById('rail-input-origin').value !== "" && document.getElementById('rail-input-destination').value !== "") {
    //        //calculateAndDisplayRoute(directionsService, directionsDisplay);
    //    }
    //},

    "click": function() {

    },
    "submit": function(event) {
        event.preventDefault();
    },
    "click #add-rail-route": function(event,template) {
        //var railRailRoutes;
        //var railIndex = Session.get("railRouteIndex");

        if (document.getElementById("rail-input-origin").value === "" || document.getElementById("rail-input-destination").value === "") {
            console.log("?");
        } else {
            event.preventDefault();
            var frequencyText = "times";
            var once = false;
            if (parseInt(document.getElementById("rail-input-frequency").value) === 1) {
                frequencyText = "once"
                once = true;
            }
            var railRoute = {
                //railIndex: railIndex,
                origin: document.getElementById("rail-input-origin").value.split(",")[0],
                destination: document.getElementById("rail-input-destination").value.split(",")[0],
                frequency: document.getElementById("rail-input-frequency").value,
                frequencyText: frequencyText,
                once: once,
                timespan: document.getElementById("rail-input-timespan").value,
                schoolYear: document.getElementById("rail-input-schoolyear").value,
                distance: Session.get("currentRouteTotalDistance"),
                shortDistance: Session.get("currentRouteTotalDistance").toFixed(2),
                units: document.getElementById('units').value
            };
            if (RailRoutes.find({origin: railRoute.origin, destination: railRoute.destination}).fetch().length === 0 && RailRoutes.find({origin: railRoute.destination, destination: railRoute.origin}).fetch().length === 0) {
                RailRoutes.insert(railRoute);
                document.getElementById("rail-input-origin").value = "";
                document.getElementById("rail-input-destination").value = "";
            } else {

            }
        }

        //console.log(Routes.find({}));
        //if (railIndex === 0) {
        //    railRailRoutes = [];
        //} else {
        //    railRailRoutes = Session.get("railRoutes");
        //}
        //railRailRoutes.push(railRoute);
        //Session.set("railRoutes", railRailRoutes);
        //Session.set("railRouteIndex", railIndex + 1);
        //$('.tooltipped').tooltip({delay: 50});

    }
    //"change #rail-input-origin, change #rail-input-destination": function() {
    //
    //}
});

Template.railMap.onCreated(function () {
    init();
});

Template.railMap.onRendered(function () {
    GoogleMaps.load({libraries: 'geometry,places'});
    $('.tooltipped').tooltip({delay: 50});
    $('select').material_select();

    Session.set("currentRouteTotalDistance", 0);
    Session.set("totalRailCarbon", 0);

    //Session.set("railRoutes",[]);
    //Session.set("railRouteIndex", 0);
});

Template.railMap.onDestroyed(function () {
    //add your statement here
});

Template.railRoute.events({
    "click .remove": function (event, template) {
        var self = this;
        $(template.find("li")).fadeOut(500, function () {
            RailRoutes.remove(self._id);
        });
        return false;
    }
    //"mouseover .remove":function () {
    //}

});

function init() {
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('railMap', function(map) {

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;

        var currentLocationInfoWindow = new google.maps.InfoWindow();

        var map = GoogleMaps.maps.railMap.instance;
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

        var inputOrigin = document.getElementById('rail-input-origin');
        var inputDestination = document.getElementById('rail-input-destination');
        var inputSubmit = document.getElementById('rail-submit');
        routeDistanceLabel = document.getElementById('rail-route-distance-label');



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
            if (document.getElementById('rail-input-origin').value !== "" && document.getElementById('rail-input-destination').value !== "") {
                infowindowOrigin.close();
                infowindowDestination.close();
                calculateAndDisplayRoute(directionsService, directionsDisplay);

            } else {
            }
            //console.log(document.getElementById('rail-input-origin').value);
            //console.log(document.getElementById('rail-input-destination').value);

        };
        document.getElementById('rail-input-origin').addEventListener('change', onChangeHandler);
        document.getElementById('rail-input-destination').addEventListener('change', onChangeHandler);
        //document.getElementById('rail-submit').addEventListener('click', onChangeHandler);


    });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    _.delay(function() {
        var transitModes = [google.maps.TransitMode.BUS,google.maps.TransitMode.RAIL,google.maps.TransitMode.SUBWAY,google.maps.TransitMode.TRAIN,google.maps.TransitMode.TRAM];
        var infowindowRoute = new google.maps.InfoWindow();

        directionsService.route({
            origin: document.getElementById('rail-input-origin').value,
            destination: document.getElementById('rail-input-destination').value,
            //origin: originAddress,
            //destination: destinationAddress,
            travelMode: google.maps.TravelMode.TRANSIT,
            transitOptions: {
                //arrivalTime: new Date(),
                //departureTime: new Date(),
                modes: [google.maps.TransitMode.RAIL,google.maps.TransitMode.TRAIN,google.maps.TransitMode.SUBWAY],
                //routingPreference: railRoutePreference
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
                //        map: GoogleMaps.maps.railMap.instance,
                //        directions: response,
                //        routeIndex: i
                //    });
                //}
            } else {
                infowindowRoute.close();
                infowindowRoute.setContent('<div><strong>' +'Directions request failed due to ' + status + '</strong><br>');
                infowindowRoute.setPosition(GoogleMaps.maps.railMap.instance.getCenter());
                infowindowRoute.open(GoogleMaps.maps.railMap.instance);
                document.getElementById("rail-input-origin").value = "";
                document.getElementById("rail-input-destination").value = "";
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


function alertCoords(){
    console.log("Marker: " + marker.getPosition().lat());
}

function setMarker() {
    var lat = parseFloat($("#latitude").val());
    var lng = parseFloat($("#longitude").val());
    if (!isNaN(lat) || !isNaN(lng)) {
        if (lat > -90 && lat < 90 && lng > -180 && lat < 90) {
            marker.setPosition({lat: lat, lng: lng});
            marker.getMap().setCenter({lat: lat, lng: lng});
        }

    }
}

function updateLatLng() {
    $("#latitude").val(marker.getPosition().lat());
    $("#longitude").val(marker.getPosition().lng());
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


