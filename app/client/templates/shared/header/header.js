Template.header.helpers({
    //add you helpers here
});

Template.header.events({
    //"click #sign-in-button, click #log-out-button": function() {
    //    $('.button-collapse').sideNav('hide');
    //}
});

Template.header.onCreated(function () {
    //add your statement here
});

Template.header.onRendered(function () {
    $(".button-collapse").sideNav({
        menuWidth: 300,
        edge: "left",
        closeOnClick: true
    });
    $(".dropdown-button").dropdown();
    $('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
        $(this).toggleClass('open');
    });
});

Template.header.onDestroyed(function () {
    //add your statement here
});


