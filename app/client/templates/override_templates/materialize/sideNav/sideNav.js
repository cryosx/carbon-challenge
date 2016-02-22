// Set Offset Based On NavBar Height


$(document).ready(function() {
    $(window).load(function() {
        var navBar = $(".navbar-fixed");
        var sideNav = $("#nav-mobile");
        var navBarMenu = $("#sidebar-button-collapse");

        sideNav.css('top', navBar.innerHeight());
        //sideNav.css('width', navBar.innerWidth())
        //sideNav.css('left', -1 * navBar.innerWidth())

        navBarMenu.click(function(event) {
            event.preventDefault();
        });

        $(window).resize(function() {
            //console.log(navBar.innerHeight());
            sideNav.css('top', navBar.innerHeight());
            //sideNav.css('width', navBar.innerWidth())
            //sideNav.css('left', -1 * navBar.innerWidth())

        });
    });
});
