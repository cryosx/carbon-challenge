Template.landingPage.helpers({
    //add you helpers here
});

Template.landingPage.events({
    //add your events here
});

Template.landingPage.onCreated(function () {
    //add your statement here
});

Template.landingPage.onRendered(function () {
    $('.parallax').parallax();
});

Template.landingPage.onDestroyed(function () {
    //add your statement here
});

// Simply 'inherites' helpers from AccountsTemplates
Template.landingPage.helpers(AccountsTemplates.atSignupLinkHelpers);

// Simply 'inherites' events from AccountsTemplates
Template.landingPage.events(AccountsTemplates.atSignupLinkEvents);