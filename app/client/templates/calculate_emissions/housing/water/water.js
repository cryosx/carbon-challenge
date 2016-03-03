Template.water.helpers({
    //add you helpers here
});

Template.water.events({
    "change #waterUsedCheckbox": function() {
        $("#waterUsedCollapse").slideToggle(0);
    }
});

Template.water.onCreated(function () {
    //add your statement here
});

Template.water.onRendered(function () {
    //add your statement here
});

Template.water.onDestroyed(function () {
    //add your statement here
});

