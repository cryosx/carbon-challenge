Meteor.startup(function () {

	// This code will populate the Cars collection. It will create three levels: the first being based on Make, the second level based on car Model, and the third level on car year. This is to make it easier to find specific cars.
    if (Cars.find({}).fetch().length === 0) {
        var cars = CarEfficiency.find({}, {sort:{make: 1, model: 1, year:1}}).fetch();
        var carsArray = [];
        var j = -1;
        var k = 0;
        var l = 0;
        var make = "";
        var model = "";
        var year = -1;

        // Following code only works if CarEfficiency is correctly sorted, the problem so far seems to be that MonogoImport doesn't import
        // the CSV file in the same order, and the Sort Specifier for mongo is a little weird.
        for(var i = 0; i < cars.length; i++) {
            if (make !== cars[i].make) {
                j++;
                k = 0;
                l = 0;
                make = cars[i].make;
                model = cars[i].model;
                year = cars[i].year;
            }
            if (carsArray[j] === undefined) {

                carsArray.push({make: cars[i].make, models:[{model: cars[i].model, years:[{year: cars[i].year, MPG: cars[i].MPG, KPG: cars[i].KPG}]}]});
            } else {
                if (model !== cars[i].model) {
                    k++;
                    l = 0;
                    model = cars[i].model;
                    year = cars[i].year;
                }
                if (carsArray[j].models[k] === undefined) {
                    carsArray[j].models.push({model: cars[i].model, years:[{year: cars[i].year, MPG: cars[i].MPG, KPG: cars[i].KPG}]});
                } else {
                    if (year !== cars[i].year) {
                        l++;
                        year = cars[i].year;
                    }
                    if (carsArray[j].models[k].years[l] === undefined) {

                        carsArray[j].models[k].years.push({year: cars[i].year, MPG: cars[i].MPG, KPG: cars[i].KPG});
                    }
                }
            }
        }

        // NOTE: SORTING DOES NOT WORK FOR WHAT EVER REASON

        //
        //carsArray.sort(function(a,b) {
        //    return a.make.toUpperCase().localeCompare(b.make.toUpperCase());
        //});

        for (var i = 0; i < carsArray.length; i++) {
            Cars.insert(carsArray[i]);
            //console.log(carsArray[i].make);
        }

    } else { // THIS IS FOR TESTING ONLY

        //Cars.find({},{sort: {make: 1}}).fetch().forEach(function (a) {
        //    console.log(a.make);
        //});

        //var temp = Cars.find({}, {sort:{make:1}}).fetch();
        //
        //temp.sort(function(a,b) {
        //    return a.make.toUpperCase().localeCompare(b.make.toUpperCase());
        //});
        //for (var i = 0; i < temp.length; i++) {
        //    console.log(temp[i].make);
        //}
        //console.log(temp.length);
    }

});