Template.rankings.helpers({

});

Template.rankings.events({
    'click #render':function(event,template) {
        console.log("Rendering");
        var owl = $(".owl-carousel").owlCarousel({

            autoPlay: 5000, //Set AutoPlay to 3 seconds
            items : 4,
            itemsDesktop : [1199,3],
            itemsDesktopSmall : [979,3]

        });

        $(".next").click(function(){
            owl.trigger('owl.next');
        });
        $(".prev").click(function(){
            owl.trigger('owl.prev');
        });
        $(".play").click(function(){
            owl.trigger('owl.play',5000); //owl.play event accept autoPlay speed as second parameter
        });
        $(".stop").click(function(){
            owl.trigger('owl.stop');
        });
        $("body").keydown(function(e) {
            if(e.keyCode == 37) {
                // left
                owl.trigger('owl.prev');

            }
            else if(e.keyCode == 39) {
                // right
                owl.trigger('owl.next');
            }
        });
        $('.materialboxed').materialbox();
        $(".add").ready(function(){
            var array = Rankings.find({}, {sort: {footprint: 1}}).fetch();
            var username;
            var id = Meteor.userId();
            var myFootprint = Rankings.find({"userID" : id}).fetch();

            //adds the pictures to the carousel
            for(var i = 0; i < array.length; i++) {
                username = array[i].userID;
                var content = "<div id=\"rank" + (i+1) + "\" class=\"item\"><img src=\"/parallax/tree" + (i+1) +".jpg\" alt=\"/parallax/treeSample.jpg\"> <p>" + username + ": " + array[i].footprint + "</p></div>";
                owl.data('owl-carousel').addItem(content);
            }

            //returns only footprints
            var ranks = Rankings.find({}, {
                sort: {footprint: 1}
            }).fetch().map(function(x) {
                return x.footprint;
            }, true);

            var myRank = ranks.indexOf(myFootprint[0].footprint);
            $('#rankStats').html("Your Global Rank is #" + (myRank + 1) + " out of " + ranks.length + " users");
            $('#friendStats').html("Your Rank amongst friends is #" + (myRank + 1) + " out of " + ranks.length + " users");

        });
    },

    'click #test':function(event,template) {
        console.log('Test');

        var treeRecords = TreeCollection.find({userID: Meteor.userId()}, {sort: ['createdDate', 'dsc']}).fetch();
        var d = new Date();
        var CurrentYear = d.getFullYear();
        var Trees=[];
        var FinalCO2 = 0;

        //****fix YearPlanted to work with datePlanted instead of createdDate
        //****fix datePlanted to only take in a certain format for dates entered

        //runs by amount of trees
        for(var i=0; i<treeRecords.length; i++) {
            var YearPlanted = treeRecords[i].createdDate.getFullYear();
            var AccumulatedCO2 = 0; //reset AccumulatedCO2 for Trees[]

            //runs over the course of 85 years from currentYear
            for (var j = 0; j <=85; j++) {
                var YearOfCalculation = j + CurrentYear;
                var TreeDiameter = treeRecords[i].diameter;

                //inches = 1
                //cm = 2
                if (treeRecords[i].diameterUnits == 1) {
                    TreeDiameter=TreeDiameter/0.393701;
                } else {
                    TreeDiameter=TreeDiameter;
                }

                //calculations
                BodyMass = 0.0998 * (Math.pow(TreeDiameter, 2.5445));
                GrowthRate = 0.208 * (Math.pow(BodyMass, 0.763));
                dKdY = (Math.exp(1 - (((GrowthRate * Math.exp(1)) * (YearOfCalculation - YearPlanted)) / BodyMass)) / Math.exp(1)) * (GrowthRate * Math.exp(1));
                dKdYT = dKdY * 1.24;
                Carbon = dKdYT * 0.47;
                CO2 = Carbon * 3.6663;

                //recording data
                AccumulatedCO2 = AccumulatedCO2 + CO2;
                AccumulatedCO2 = Math.round(AccumulatedCO2 * 10) / 10;
                Trees[i] = AccumulatedCO2;
            }
            FinalCO2 = FinalCO2 + AccumulatedCO2;
        }

        var exists = Rankings.find({"userID" : Meteor.userId() }).count();
        console.log("exists: " + exists);

        var carbonRecords = CarbonStats.find({userID: Meteor.userId()}).fetch();
        var totalCarbon = carbonRecords[0].totalCarbon;
        console.log("totalCarbon: " + totalCarbon + "\nFinalCO2: " + FinalCO2);
        var footprint = totalCarbon - FinalCO2;
        console.log("footprint check 1: " + footprint);
        //var createdDate = new Date();

        var id = Meteor.userId();


        //if the user already has an entry in the Rankings collection
        if (exists == 1){
            console.log("Updating");
            var myData = Rankings.find({"userID" : id}).fetch();

            //returns only footprints
            var ranks = Rankings.find({}, {
                sort: {footprint: 1}
            }).fetch().map(function(x) {
                return x.footprint;
            }, true);

            var myRank = ranks.indexOf(myData[0].footprint);
            myRank += 1;

            var array = Rankings.find({"userID" : id}, {sort: {createdDate: -1}}).fetch();
            var updateID = array[0]._id;

            console.log("footprint check 2 (before update): " + footprint);

            Rankings.update({_id : updateID}, {userID: Meteor.userId(), footprint: footprint, rank: myRank});
        }
        else{
            console.log("Inserting");
            var rank = {
                'userID': Meteor.userId(),
                'footprint': footprint,
                'rank': 0,
                //'createdDate' : createdDate
            };

            console.log("footprint check 3(before inserting): " + footprint);

            Rankings.insert(rank);

            /* Calculate the rank of current user */
            //returns only footprints
            ranks = Rankings.find({}, {
                sort: {footprint: 1}
            }).fetch().map(function(x) {
                return x.footprint;
            }, true);

            var myData = Rankings.find({"userID" : id}).fetch();

            var myRank = ranks.indexOf(myData[0].footprint);
            myRank += 1;

            var array = Rankings.find({"userID" : id}, {sort: {createdDate: -1}}).fetch();
            var updateID = array[0]._id;

            Rankings.update({_id : updateID}, {userID: Meteor.userId(), footprint: footprint, rank: myRank});
        }

    }
});

Template.rankings.onCreated(function () {
    //add your statement here
});

Template.rankings.onRendered(function () {

    /* Calculating your current Ranking */
    var treeRecords = TreeCollection.find({userID: Meteor.userId()}, {sort: ['createdDate', 'dsc']}).fetch();
    var d = new Date();
    var CurrentYear = d.getFullYear();
    var Trees=[];
    var FinalCO2 = 0;

    //****fix YearPlanted to work with datePlanted instead of createdDate
    //****fix datePlanted to only take in a certain format for dates entered

    //runs by amount of trees
    for(var i=0; i<treeRecords.length; i++) {
        var YearPlanted = treeRecords[i].createdDate.getFullYear();
        var AccumulatedCO2 = 0; //reset AccumulatedCO2 for Trees[]

        //runs over the course of 85 years from currentYear
        for (var j = 0; j <=85; j++) {
            var YearOfCalculation = j + CurrentYear;
            var TreeDiameter = treeRecords[i].diameter;

            //inches = 1
            //cm = 2
            if (treeRecords[i].diameterUnits == 1) {
                TreeDiameter=TreeDiameter/0.393701;
            } else {
                TreeDiameter=TreeDiameter;
            }

            //calculations
            BodyMass = 0.0998 * (Math.pow(TreeDiameter, 2.5445));
            GrowthRate = 0.208 * (Math.pow(BodyMass, 0.763));
            dKdY = (Math.exp(1 - (((GrowthRate * Math.exp(1)) * (YearOfCalculation - YearPlanted)) / BodyMass)) / Math.exp(1)) * (GrowthRate * Math.exp(1));
            dKdYT = dKdY * 1.24;
            Carbon = dKdYT * 0.47;
            CO2 = Carbon * 3.6663;

            //recording data
            AccumulatedCO2 = AccumulatedCO2 + CO2;
            AccumulatedCO2 = Math.round(AccumulatedCO2 * 10) / 10;
            Trees[i] = AccumulatedCO2;
        }
        FinalCO2 = FinalCO2 + AccumulatedCO2;
    }

    var exists = Rankings.find({"userID" : Meteor.userId() }).count();
    console.log("exists: " + exists);


    //*****Problem: AccumulatedCO2 is 0, meaning the calculations above didn't go through

    var carbonRecords = CarbonStats.find({userID: Meteor.userId()}).fetch();
    var totalCarbon = carbonRecords[0].totalCarbon;
    console.log("totalCarbon: " + totalCarbon + "\nFinalCO2: " + FinalCO2);
    var footprint = totalCarbon - FinalCO2;
    console.log("footprint check 1: " + footprint);
    //var createdDate = new Date();

    var id = Meteor.userId();


    //if the user already has an entry in the Rankings collection
    if (exists == 1){
        console.log("Updating");
        var myData = Rankings.find({"userID" : id}).fetch();

        //returns only footprints
        var ranks = Rankings.find({}, {
            sort: {footprint: 1}
        }).fetch().map(function(x) {
            return x.footprint;
        }, true);

        var myRank = ranks.indexOf(myData[0].footprint);
        myRank += 1;

        var array = Rankings.find({"userID" : id}, {sort: {createdDate: -1}}).fetch();
        var updateID = array[0]._id;

        console.log("footprint check 2 (before update): " + footprint);

        Rankings.update({_id : updateID}, {userID: Meteor.userId(), footprint: footprint, rank: myRank});
    }
    else{
        console.log("Inserting");
        var rank = {
            'userID': Meteor.userId(),
            'footprint': footprint,
            'rank': 0,
            //'createdDate' : createdDate
        };

        console.log("footprint check 3(before inserting): " + footprint);

        Rankings.insert(rank);

        /* Calculate the rank of current user */
        //returns only footprints
        ranks = Rankings.find({}, {
            sort: {footprint: 1}
        }).fetch().map(function(x) {
            return x.footprint;
        }, true);

        var myData = Rankings.find({"userID" : id}).fetch();

        var myRank = ranks.indexOf(myData[0].footprint);
        myRank += 1;

        var array = Rankings.find({"userID" : id}, {sort: {createdDate: -1}}).fetch();
        var updateID = array[0]._id;

        Rankings.update({_id : updateID}, {userID: Meteor.userId(), footprint: footprint, rank: myRank});
    }

    /* Building owl carousel of rankings */
    var owl = $(".owl-carousel").owlCarousel({

        autoPlay: 5000, //Set AutoPlay to 3 seconds
        items : 4,
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [979,3]

    });

    $(".next").click(function(){
        owl.trigger('owl.next');
    });
    $(".prev").click(function(){
        owl.trigger('owl.prev');
    });
    $(".play").click(function(){
        owl.trigger('owl.play',5000); //owl.play event accept autoPlay speed as second parameter
    });
    $(".stop").click(function(){
        owl.trigger('owl.stop');
    });
    $("body").keydown(function(e) {
        if(e.keyCode == 37) {
            // left
            owl.trigger('owl.prev');

        }
        else if(e.keyCode == 39) {
            // right
            owl.trigger('owl.next');
        }
    });
    $('.materialboxed').materialbox();
    $(".add").ready(function(){
        var array = Rankings.find({}, {sort: {footprint: 1}}).fetch();
        var username;
        var id = Meteor.userId();
        var myFootprint = Rankings.find({"userID" : id}).fetch();

        //adds the pictures to the carousel
        for(var i = 0; i < array.length; i++) {
            username = array[i].userID;
            var content = "<div id=\"rank" + (i+1) + "\" class=\"item\"><img src=\"/parallax/tree" + (i+1) +".jpg\" alt=\"/parallax/treeSample.jpg\"> <p>" + username + ": " + array[i].footprint + "</p></div>";
            owl.data('owl-carousel').addItem(content);
        }

        //returns only footprints
        var ranks = Rankings.find({}, {
            sort: {footprint: 1}
        }).fetch().map(function(x) {
            return x.footprint;
        }, true);

        var myRank = ranks.indexOf(myFootprint[0].footprint);
        $('#rankStats').html("Your Global Rank is #" + (myRank + 1) + " out of " + ranks.length + " users");
        $('#friendStats').html("Your Rank amongst friends is #" + (myRank + 1) + " out of " + ranks.length + " users");

    });
});

Template.rankings.onDestroyed(function () {
    //add your statement here
});

