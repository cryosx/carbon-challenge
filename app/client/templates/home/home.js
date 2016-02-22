Template.home.helpers({
});


Template.home.events({
    "click #emissionsLink": function() {
        //event.preventDefault();
        //goToEmissions();
        //setTimeout(scrollToTop, 2000);
        scrollToTop();
    }
});

Template.home.onCreated(function () {
    //$('.parallax').parallax();
    //window.disqus = new Disqus('cryosx-carbon');

});

Template.home.onRendered(function () {
    $('.parallax').parallax();
    window.disqus = new Disqus('cryosx-carbon');
    disqus.loadComments();

});

Template.home.onDestroyed(function () {
});

//// Simply 'inherites' helpers from AccountsTemplates
//Template.home.helpers(AccountsTemplates.atSignupLinkHelpers);
//
//// Simply 'inherites' events from AccountsTemplates
//Template.home.events(AccountsTemplates.atSignupLinkEvents);

function scrollToTop() {
    $("html, body").animate({ scrollTop: 0 }, "fast");
}

function goToEmissions() {
    Router.go("/emissions");
}