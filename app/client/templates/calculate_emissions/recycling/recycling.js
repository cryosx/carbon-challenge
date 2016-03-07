Template.recycling.helpers({
    totalCarbon: function() {
        return Session.get("totalRecyclingCarbon").toFixed(2);
    }
});

Template.recycling.events({
    "change #recycling, change #composting": function() {
        var recycling = document.getElementById("recyclingSelect").value;
        var composting = document.getElementById("compostingSelect").value;
        var totalRecyclingCarbon = 1.2;

        if (recycling === "Little") {
            totalRecyclingCarbon += 0;
        } else if (recycling === "Some") {
            totalRecyclingCarbon += -0.2;

        } else if (recycling === "All") {
            totalRecyclingCarbon += -0.5;
        }

        if (composting === "Rarely") {
            totalRecyclingCarbon += 0;
        } else if (composting === "Sometimes") {
            totalRecyclingCarbon += -0.1;

        } else if (composting === "Whenever") {
            totalRecyclingCarbon += -0.3;
        }

        Session.set("totalRecyclingCarbon", totalRecyclingCarbon);
    },
    "": function() {

    }
});

Template.recycling.onCreated(function () {
    //add your statement here
});

Template.recycling.onRendered(function () {
    $('select').material_select();
    Session.set("totalRecyclingCarbon", 1.2);
});

Template.recycling.onDestroyed(function () {
    //add your statement here
});

