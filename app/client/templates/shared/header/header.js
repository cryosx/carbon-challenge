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
    $(".dropdown-button").dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        //gutter: 1, // Spacing from edge
        belowOrigin: true, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
    });
    $('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
        $(this).toggleClass('open');
    });
});

Template.header.onDestroyed(function () {
    //add your statement here
});


