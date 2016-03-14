var imageID = "";

Template.plantTree.helpers({
    treeMapOptions: function() {
        // Make sure the maps API has loaded
        if (GoogleMaps.loaded()) {
            // Map initialization options
            return {
                center: new google.maps.LatLng(21.3500, -157.8000),
                zoom: 12
            };
        }
    },
    specificFormData: function() {
        return {
            id: this._id,
            other: this.other,
            hard: 'Lolcats'
        }
    },
    myCallbacks: function() {
        return {
            formData: function () {
                return {id: "232323", other: Session.get("ReactiveParam")}
            },
            finished: function (index, fileInfo, context) {
            },
        }
    },
});

Template.plantTree.events({

    'click #test': function(event, template) {
        var trees = [];
        var pics = [];

        //correct sort function listed below
        trees = TreeCollection.find({userID: Meteor.userId()}, {sort : {createdDate: -1}}).fetch();

        var pictureID = trees[0].imageID;
        pics = Images.find({_id: pictureID}).fetch();

        $("#rightColumn").show();
        $("#rightColumn2").hide();

    },

    'click #location': function(event, template) {

        $("#rightColumn2").hide();
        $("#rightColumn").show();

    },

    'click #latitude': function(event, template) {

        $("#rightColumn2").hide();
        $("#rightColumn").show();

    },

    'click #longitude': function(event, template) {

        $("#rightColumn2").hide();
        $("#rightColumn").show();

    },


    'click #cancel': function(event, template) {
    },

    'click #save': function(event, template) {
        console.log('Saving a tree');
        var species = template.find("#species").value;
        console.log(species);
        var location = template.find("#location").value;
        var latitude = template.find("#latitude").value;
        var longitude = template.find("#longitude").value;
        var datePlanted = template.find("#datePlanted").value;
        var diameter = template.find("#diameter").value;
        console.log(diameter);
        // Centimeters assumed because of current TreeDiameter Database 2/29/16
        var diameterUnits = "Centimeters"; //template.find("#diameterUnits").value;
        var createdDate = new Date();

        var tree = {'userID':Meteor.userId(),
            'species':species,
            'location':location,
            'latitude':latitude,
            'longitude':longitude,
            'datePlanted':datePlanted,
            'diameter':diameter,
            'diameterUnits':diameterUnits,
            'createdDate':createdDate,
            'imageID':imageID,
        };
        if(species == "" || location == "" || latitude == "" || longitude == "" || datePlanted == "" ||
            diameter == "" || diameterUnits == "" || createdDate == "" ){
            window.alert("Please fill out all of the fields");
        }
        else{
            console.log(tree);
            TreeCollection.insert(tree);
        }

    },
    "change #latitude, change #longitude": function() {
        setMarker();
    }
});


Template.plantTree.onCreated(function () {
    init();
});

Template.plantTree.onRendered(function () {

    $("#info").hide();
    $("#info2").hide();
    $("#rightColumn2").hide();

    $('select').material_select();
    GoogleMaps.load();
    $('.datepicker').pickadate({
        selectMonths: false, // Creates a dropdown to control month
        selectYears: 10 // Creates a dropdown of 10 years to control year
    });

    //maybe this is the problem
    //if (Meteor.isClient){


        Dropzone.autoDiscover = false;

        // Adds file uploading and adds the imageID of the file uploaded
        // to the arrayOfImageIds object.

        var dropzone = new Dropzone("form#dropzone", {
            accept: function(file, done){

                Images.insert(file, function(err, fileObj){
                    if(err){
                        alert("Error");
                    } else {
                        // gets the ID of the image that was uploaded
                        imageID = fileObj._id;
                    };
                });
            }
        });
    //};
});

Template.plantTree.onDestroyed(function () {
    //add your statement here
});

function init() {
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('exampleMap', function(map) {
        // Add a marker to the map once it's ready
        marker = new google.maps.Marker({
            position: map.options.center,
            map: map.instance,
            draggable: true,
            animation: google.maps.Animation.DROP
        });
        marker.addListener('click', toggleBounce);
        marker.addListener('drag', updateLatLng);

    });
}

function alertCoords(){
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