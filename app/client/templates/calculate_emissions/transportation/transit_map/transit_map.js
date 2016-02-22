var Routes = new Meteor.Collection(null);

Template.transitMap.helpers({
    transitMapOptions: function() {
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

    routes: function() {
        return Routes.find();
    },

    totalDistance: function() {

        return totalDistance().toFixed(2);
    },
    totalCarbon: function() {
        return (totalDistance() * 1.26 * 300 * 0.000001).toFixed(2);
    },

});

function totalDistance() {
    var totalDistance = 0;
    Routes.find({}).fetch().forEach(function(item, index) {
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

Template.transitMap.events({
    "click #transit-input-origin": function() {
        $("#transit-input-origin").select();
    },
    "click #transit-input-destination": function() {
        $("#transit-input-destination").select();
    },

    //"change #transit-input-origin, change  #transit-input-destination": function() {
    //
    //    if (document.getElementById('transit-input-origin').value !== "" && document.getElementById('transit-input-destination').value !== "") {
    //        //calculateAndDisplayRoute(directionsService, directionsDisplay);
    //    }
    //},

    "click": function() {
        console.log(Template.parentData(1));
        console.log(Template.parentData(2));

        console.log(Template.instance());
        console.log(Template.instance().view.parentView.name);

        console.log(Template.currentData());

    },
    "submit": function(event) {
        event.preventDefault();
    },
    "click #add-route": function(event,template) {
        //var transitBusRoutes;
        //var busIndex = Session.get("busRouteIndex");

        if (document.getElementById("transit-input-origin").value === "" || document.getElementById("transit-input-destination").value === "") {
            console.log("?");
        } else {
            event.preventDefault();
            var busRoute = {
                //busIndex: busIndex,
                origin: document.getElementById("transit-input-origin").value.split(",")[0],
                destination: document.getElementById("transit-input-destination").value.split(",")[0],
                frequency: document.getElementById("transit-input-frequency").value,
                timespan: document.getElementById("transit-input-timespan").value,
                schoolYear: document.getElementById("transit-input-schoolyear").value,
                distance: Session.get("currentRouteTotalDistance"),
                units: document.getElementById('units').value
            };
            if (Routes.find({origin: busRoute.origin, destination: busRoute.destination}).fetch().length === 0 && Routes.find({origin: busRoute.destination, destination: busRoute.origin}).fetch().length === 0) {
                Routes.insert(busRoute);
                document.getElementById("transit-input-origin").value = "";
                document.getElementById("transit-input-destination").value = "";
            } else {

            }
        }

        //console.log(Routes.find({}));
        //if (busIndex === 0) {
        //    transitBusRoutes = [];
        //} else {
        //    transitBusRoutes = Session.get("busRoutes");
        //}
        //transitBusRoutes.push(busRoute);
        //Session.set("busRoutes", transitBusRoutes);
        //Session.set("busRouteIndex", busIndex + 1);
        //$('.tooltipped').tooltip({delay: 50});

    }
    //"change #transit-input-origin, change #transit-input-destination": function() {
    //
    //}
});

Template.transitMap.onCreated(function () {
    init();
});

Template.transitMap.onRendered(function () {
    GoogleMaps.load({libraries: 'geometry,places'});
    $('.tooltipped').tooltip({delay: 50});
    $('select').material_select();
    Session.set("currentRouteTotalDistance", 0);


    //Session.set("busRoutes",[]);
    //Session.set("busRouteIndex", 0);
});

Template.transitMap.onDestroyed(function () {
    //add your statement here
});

Template.route.events({
    "click .remove": function (event, template) {
        var self = this;
        $(template.find("li")).fadeOut(500, function () {
            Routes.remove(self._id);
        });
        return false;
    },
    "mouseover .remove":function () {
    }

});

function init() {
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('transitMap', function(map) {

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;

        var currentLocationInfoWindow = new google.maps.InfoWindow();

        var map = GoogleMaps.maps.transitMap.instance;
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

        var inputOrigin = document.getElementById('transit-input-origin');
        var inputDestination = document.getElementById('transit-input-destination');
        var inputSubmit = document.getElementById('transit-submit');
        routeDistanceLabel = document.getElementById('route-distance-label');



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
            if (document.getElementById('transit-input-origin').value !== "" && document.getElementById('transit-input-destination').value !== "") {
                infowindowOrigin.close();
                infowindowDestination.close();
                calculateAndDisplayRoute(directionsService, directionsDisplay);

            } else {
            }
            //console.log(document.getElementById('transit-input-origin').value);
            //console.log(document.getElementById('transit-input-destination').value);

        };
        //document.getElementById('transit-input-origin').addEventListener('change', onChangeHandler);
        //document.getElementById('transit-input-destination').addEventListener('change', onChangeHandler);
        document.getElementById('transit-submit').addEventListener('click', onChangeHandler);


    });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var transitMode = google.maps.TransitMode.BUS;
    directionsService.route({
        origin: document.getElementById('transit-input-origin').value,
        destination: document.getElementById('transit-input-destination').value,
        //origin: originAddress,
        //destination: destinationAddress,
        travelMode: google.maps.TravelMode.TRANSIT,
        transitOptions: {
            //arrivalTime: new Date(),
            //departureTime: new Date(),
            modes: [transitMode],
            //routingPreference: TransitRoutePreference
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
            //        map: GoogleMaps.maps.transitMap.instance,
            //        directions: response,
            //        routeIndex: i
            //    });
            //}
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
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

    for (var i = 0; i < route.legs.length; i++) {
        totalDistance += route.legs[i].distance.value;
    }
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


