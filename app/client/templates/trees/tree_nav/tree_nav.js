Template.treeNav.helpers({
    enableIndicators: function(page_name) {
        if (page_name === "plantTree") {
            $('ul.tabs').tabs('select_tab', '#' + page_name)
        } else if (page_name === "checkTree") {
            $('ul.tabs').tabs('select_tab', '#' + page_name)
        }
    }});

Template.treeNav.events({
    //add your events here
});

Template.treeNav.onCreated(function () {
    //add your statement here
});

Template.treeNav.onRendered(function () {
    $('ul.tabs').tabs();

});

Template.treeNav.onDestroyed(function () {
    //add your statement here
});

