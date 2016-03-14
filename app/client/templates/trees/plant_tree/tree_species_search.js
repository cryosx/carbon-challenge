//only works for 1 field so far (as far as I know)
//try using: https://atmospherejs.com/sergeyt/typeahead
Template.treeSpeciesSearch.helpers({
    settings: function () {
        return {
            position: "bottom",
            limit: 10,
            rules: [
                {
                    // token: '',
                    collection: TreeDiameter,
                    field: 'commonName',
                    matchAll: true,
                    template: Template.treeSpecies
                }
                //{
                //    // token: '',
                //    collection: TreeDiameter,
                //    field: 'name',
                //    matchAll: true,
                //    template: Template.treeSpecies
                //},
                //{
                //    // token: '',
                //    collection: TreeDiameter,
                //    field: 'commonName',
                //    matchAll: true,
                //    template: Template.treeSpecies
                //}
            ]
        };
    }

});

Template.treeSpeciesSearch.events({
    "treeSpeciesSearchselect input": function (event, template, selected) {
        //$('#species').html(selected.commonName);
        //$('#description').html(selected.info);
        //$('#diameter').html("Diameter: " + selected.diameter + " | ");
        //
        //// Set the value of the elements with id = species and diameter for Insert(tree) process
        //document.getElementById('species').value = selected.commonName;
        //document.getElementById('diameter').value = selected.diameter;
        //
        ////function myFunction() {
        //var AccumulatedCO2 = 0;
        //
        //var treeRecord = TreeCollection.find({userID: Meteor.userId()}, {sort: ['createdDate', 'dsc']}).fetch();
        //var TreeDiameter = selected.diameter;
        //
        //if (0 == 0) {
        //    var Results = [];
        //    var CO2 = "";
        //    var d = new Date();
        //    var YearPlanted = d.getFullYear();
        //    var YearOfCalculation = d.getFullYear();
        //
        //    // assuming cm
        //    var TreeDiameter = TreeDiameter;
        //
        //    for (i = 0; i <= 85; i++) {
        //        YearOfCalculation = i + 2015;
        //        if (YearOfCalculation >= YearPlanted) {
        //
        //            //Body mass (kg dry above groung matter) from Chave et al (2001):
        //            BodyMass = 0.0998 * (Math.pow(TreeDiameter, 2.5445));
        //
        //            //Growth Rate (kg dry above groung matter/ plant /yr) from Niklas & Enquist (2001):
        //            GrowthRate = 0.208 * (Math.pow(BodyMass, 0.763));
        //
        //            //dK/dy Above ground, this is the rate of production at each year assuming log decline:
        //            dKdY = (Math.exp(1 - (((GrowthRate * Math.exp(1)) * (YearOfCalculation - YearPlanted)) / BodyMass)) / Math.exp(1)) * (GrowthRate * Math.exp(1));
        //
        //            //Adding Below ground Using Cairns et al (1997) factor of 24% of above ground biomass:
        //            dKdYT = dKdY * 1.24;
        //
        //            //Carbon content Using Kirby & Potvin (2007) factor of 47% of total dry weight:
        //            Carbon = dKdYT * 0.47;
        //
        //            //CO2 sequestration.Conversion of Carbon in treee to CO2:
        //            CO2 = Carbon * 3.6663;
        //
        //            //adds CO2 over the years:
        //            AccumulatedCO2 = AccumulatedCO2 + CO2;
        //
        //            //Generates data.frame that includes year:
        //            Results[i] = Math.round(AccumulatedCO2 * 10) / 10;
        //
        //        } else {
        //            Results[i] = 0;
        //        }
        //    }
        //
        //    document.getElementById("sequester").innerHTML = "This tree will sequester " + parseInt(AccumulatedCO2) + " Kg of CO2 over its life time";
        //
        //    //setTimeout(function () {
        //    //
        //    //    // generates a variable with the data to be plotted in the x-y chart
        //    //    var Results1 = Results;
        //    //
        //    //
        //    //    $('#container').highcharts({
        //    //
        //    //        chart: {type: 'scatter', zoomType: 'x'},
        //    //        title: {text: 'Projected CO2 stored by this tree'},
        //    //        tooltip: {
        //    //            headerFormat: '<b></b>',
        //    //            pointFormat: "It will sequester {point.y}kg by {point.x:%Y}",
        //    //            hideDelay: 1
        //    //        },
        //    //        xAxis: {type: 'datetime', title: {text: 'Year'}},
        //    //        yAxis: {title: {text: 'CO2 sequestered (kg)'}, min: 0},
        //    //        legend: {enabled: false},
        //    //        plotOptions: {
        //    //            area: {
        //    //                fillColor: {
        //    //                    linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
        //    //                    stops: [[0, Highcharts.getOptions().colors[0]], [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]]
        //    //                },
        //    //                marker: {radius: 2},
        //    //                lineWidth: 1,
        //    //                states: {hover: {lineWidth: 1}},
        //    //                threshold: null
        //    //            }
        //    //        },
        //    //
        //    //        series: [{
        //    //            type: 'area',
        //    //            name: 'Cummulative CO2 stored',
        //    //            pointInterval: 365 * 24 * 3600000,
        //    //            pointStart: Date.UTC(2015, 0, 1),
        //    //            data: Results1
        //    //        }]
        //    //    });
        //    //
        //    //}, 1);
        //
        //}
        //else {
        //    document.getElementById("sequester").innerHTML = "Diameter = 0 or null!  This tree will sequester ??? Kg of CO2 over its life time";
        //}
        ////window.onload = myFunction();
        ////}
        //
        //$("#rightColumn").hide();
        //$("#rightColumn2").show();
    }
});

Template.treeSpeciesSearch.onCreated(function () {
    var self = this;
    self.autorun(function () {
        //this.subscribe('Cars');
        //Meteor.subscribe('TreeCollection');
        //Meteor.subscribe('TreeDiameter');
        self.subscribe('TreeCollection');
        self.subscribe('TreeDiameter');
    });

});

Template.treeSpeciesSearch.onRendered(function () {
    //add your statement here
});

Template.treeSpeciesSearch.onDestroyed(function () {
    //add your statement here
});

