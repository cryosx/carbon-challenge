Template.emissionsNav.helpers({
    totalTransportationCarbon: function() {
        return Session.get("totalCarCarbon") + Session.get("totalMotorcycleCarbon") + Session.get("totalBusCarbon") + Session.get("totalRailCarbon") + Session.get("totalFlyingCarbon");
    }
});

Template.emissionsNav.events({
    //add your events here
});

Template.emissionsNav.onCreated(function () {
    //add your statement here
});

Template.emissionsNav.onRendered(function () {
    $('ul.tabs').tabs();
});

Template.emissionsNav.onDestroyed(function () {
    //add your statement here
});

