Template.goods.helpers({
    totalGoods: function() {
        return calculateGoods();
    }
});

Template.goods.events({
    "click #cancel": function(){
        Router.go("/");
    },
    "submit": function() {
        console.log("SUBMIT");
        event.preventDefault();
        $("ul.tabs").tabs("select_tab", "services");
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    },

    "change input": function() {
        updateGoods();
    }
});

Template.goods.onCreated(function () {
    //add your statement here
});

Template.goods.onRendered(function () {
    $('select').material_select();

});

Template.goods.onDestroyed(function () {
    //add your statement here
});


function updateGoods() {
    var totalGoods = calculateGoods();
    document.getElementById("totalGoodsEmissions").innerHTML = totalGoods.toFixed(2);
    var value = "Total: " + totalGoods.toFixed(2);
    Materialize.toast(value, 3000);
}

function calculateGoods() {

    var totalGoods = 0;

    var clothesSpentOn = (document.getElementById('clothesSpentOn').value);
    var furnitureSpentOn = (document.getElementById('furnitureSpentOn').value);
    var entertainmentSpentOn = (document.getElementById('entertainmentSpentOn').value);
    var paperSpentOn = (document.getElementById('paperSpentOn').value);
    var cleaningSpentOn = (document.getElementById('cleaningSpentOn').value);
    var medicalSpentOn = (document.getElementById('medicalSpentOn').value);
    var autoSpentOn = (document.getElementById('autoSpentOn').value);


    if (clothesSpentOn !== "") {
        var clothesCarbon = clothesSpentOn * 750 * 12 * 0.000001;
        totalGoods = totalGoods + clothesCarbon;
    }

    if (furnitureSpentOn !== "") {
        var furnitureCarbon = furnitureSpentOn * 614 * 12 * 0.000001;
        totalGoods = totalGoods + furnitureCarbon;
    }
    
    if (entertainmentSpentOn !== "") {
        var entertainmentCarbon = entertainmentSpentOn * 1279 * 12 * 0.000001;
        totalGoods = totalGoods + entertainmentCarbon;
    }

    if (paperSpentOn !== "") {
        var paperCarbon = paperSpentOn * 2100 * 12 * 0.000001;
        totalGoods = totalGoods + paperCarbon;
    }

    if (cleaningSpentOn !== "") {
        var cleaningCarbon = cleaningSpentOn * 954 * 12 * 0.000001;
        totalGoods = totalGoods + cleaningCarbon;
    }
    

    if (medicalSpentOn !== "") {
        var medicalCarbon = medicalSpentOn * 696 * 12 * 0.000001;
        totalGoods = totalGoods + medicalCarbon;
    }

    if (autoSpentOn !== "") {
        var autoCarbon = autoSpentOn * 558 * 12 * 0.000001;
        totalGoods = totalGoods + autoCarbon;
    }

    return totalGoods;
}