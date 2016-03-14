

//  USER RELATED COLLECTIONS


Meteor.publish('Rankings', function () {
    return Rankings.find();
});

Meteor.publish('Images', function () {
    return Images.find();
});

Meteor.publish('CarbonStats', function () {
    return CarbonStats.find();
});

//  CAR RELATED COLLECTIONS

Meteor.publish('Cars', function () {
    //return Cars.find({},{sort: {make: 1}});
    return Cars.find();
});

Meteor.publish('CarEfficiency', function () {
    return CarEfficiency.find();
});

//  TREE COLLECTIONS

Meteor.publish('TreeCollection', function () {
    return TreeCollection.find();
});

Meteor.publish('TreeSpecies', function () {
    return TreeSpecies.find();
});

Meteor.publish('TreeDiameter', function () {
    return TreeDiameter.find();
});