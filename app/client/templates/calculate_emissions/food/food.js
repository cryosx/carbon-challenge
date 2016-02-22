Template.food.helpers({
    totalFood: function() {
        return calculateFood();
    }
});

Template.food.events({
    "click #cancel": function() {
        Router.go("/");
    },
    //"click #next": function() {
    //    event.preventDefault();
    //    $("ul.tabs").tabs("select_tab", "shopping");
    //    $("html, body").animate({ scrollTop: 0 }, "slow");
    //    return false;
    //}
    "submit": function() {
        console.log("SUBMIT");
        event.preventDefault();
        $("ul.tabs").tabs("select_tab", "goods");
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    },
    "change input": function() {
        updateFood();
    }
});

Template.food.onCreated(function () {
    //add your statement here
});

Template.food.onRendered(function () {
    $('select').material_select();

});

Template.food.onDestroyed(function () {
    //add your statement here
});

function updateFood() {
    var totalFood = calculateFood();
    document.getElementById("totalFoodEmissions").innerHTML = totalFood.toFixed(2);
    var value = "Total: " + totalFood.toFixed(2);
    Materialize.toast(value, 3000);
}

function calculateFood() {
    var totalFood = 0;

    var meatConsumed = (document.getElementById('meatConsumed').value);
    var poultryConsumed = (document.getElementById('poultryConsumed').value);
    var seafoodConsumed = (document.getElementById('seafoodConsumed').value);
    var dairyConsumed = (document.getElementById('dairyConsumed').value);
    var vegetablesConsumed = (document.getElementById('vegetablesConsumed').value);
    var grainsConsumed = (document.getElementById('grainsConsumed').value);
    var drinksConsumed = (document.getElementById('drinksConsumed').value);

    if (meatConsumed !== "") {
        var meatCarbon = meatConsumed * 6.09 * 365 * 0.000001;
        totalFood = totalFood + meatCarbon;
    }

    if (poultryConsumed !== "") {
        var poultryCarbon = poultryConsumed * 4.27 * 365 * 0.000001;
        totalFood = totalFood + poultryCarbon;
    }
    if (seafoodConsumed !== "") {
        var seafoodCarbon = seafoodConsumed * 5.71 * 365 * 0.000001;
        totalFood = totalFood + seafoodCarbon;
    }
    if (dairyConsumed !== "") {
        var dairyCarbon = dairyConsumed * 4 * 365 * 0.000001;
        totalFood = totalFood + dairyCarbon;
    }
    if (vegetablesConsumed !== "") {
        var vegetablesCarbon = vegetablesConsumed * 3.35 * 365 * 0.000001;
        totalFood = totalFood + vegetablesCarbon;
    }
    if (grainsConsumed !== "") {
        var grainsCarbon = grainsConsumed * 1.45 * 365 * 0.000001;
        totalFood = totalFood + grainsCarbon;
    }
    if (drinksConsumed !== "") {
        var drinksCarbon = drinksConsumed * 2.24 * 365 * 0.000001;
        totalFood = totalFood + drinksCarbon;
    }
    return totalFood;    
}
