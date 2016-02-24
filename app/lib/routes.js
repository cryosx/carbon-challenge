//Router.configure({
//  layoutTemplate: 'MasterLayout',
//  loadingTemplate: 'Loading',
//  notFoundTemplate: 'NotFound'
//});
//
//
//Router.route('/', {
//  name: 'home',
//  controller: 'HomeController',
//  where: 'client'
//});

FlowRouter.route('/', {
    action: function () {
        BlazeLayout.render('masterLayout', {
            header: 'header',
            //sidebar: 'loading',
            main: 'home',
            footer: 'footer'
        });
    },
    name: 'home'
});

var emissions = FlowRouter.group({
    triggersEnter: [AccountsTemplates.ensureSignedIn],
    prefix: '/emissions'
});

// http://app.com/documents
emissions.route('/', {
    action: function () {
        BlazeLayout.render('masterLayout', {
            header: 'header',
            //sidebar: 'loading',
            main: 'emissions',
            footer: 'footer'
        });
    },
    name: 'emissions-start'
});

// http://app.com/documents/:carbonFactor
emissions.route('/:carbonFactor', {
    action: function () {
        console.log("We're viewing a single document.");
    }
});

var legal = FlowRouter.group({
    prefix: '/legal'
})

legal.route('/privacy', {
    name: 'privacy',
    action: function () {
        BlazeLayout.render('masterLayout', {
            header: 'header',
            //sidebar: 'loading',
            main: 'privacyPolicy',
            footer: 'footer'
        })
    }
});

legal.route('/terms-of-use', {
    name: 'termsOfUse',
    action: function () {
        BlazeLayout.render('masterLayout', {
            header: 'header',
            //sidebar: 'loading',
            main: 'termsOfUse',
            footer: 'footer'
        })
    }
});

// the App_notFound template is used for unknown routes and missing lists
FlowRouter.notFound = {
    action: function() {
        BlazeLayout.render('masterLayout', {main: 'notFound'});
    }
};


// RIGHT NOW I'LL HAVE EVERYTHING RENDER THE MASTER LAYOUT AND THEN PASS IN THE COMPONENTS LIKE THE HEADER, FOOTER, AND
// MAIN BODY PIECE LIKE THE LOGIN TEMPLATE OR SIGNUP TEMPLATE.

//var open = FlowRouter.group({});
//
//open.route('/login', {
//    name: 'login',
//    action: function () {
//        console.log("LOGIN");
//        //BlazeLayout.render('masterLayout', {
//        //  header: 'header',
//        //  main: 'login',
//        //  footer: 'footer'
//        //})
//    }
//});
//
//open.route('/signup', {
//    name: 'signup',
//    action: function () {
//        console.log("SIGNUP");
//        //BlazeLayout.render('masterLayout', {
//        //  header: 'header',
//        //  main: 'signup',
//        //  footer: 'footer'
//        //})
//    }
//});
//
//var loggedIn = FlowRouter.group({
//    triggersEnter: [function () {
//        // MIGHT BE WRONG LOGIC HERE
//        if (!Meteor.loggingIn() || !Meteor.userId()) {
//            var current = FlowRouter.current();
//            if (current.route.name !== 'login') {
//                Session.set('redirectAfterLogin', current.path);
//            }
//            FlowRouter.go('login');
//        }
//    }]
//});
//
//// Now attach this route to a logout link in your app, and the user will be redirected to the login page after logging out.
//loggedIn.route('/logout',{
//    name: 'logout',
//    action: function() {
//        Meteor.logout(function() {
//            FlowRouter.go(FlowRouter.path('login'));
//        })
//    }
//});
//
//Accounts.onLogin(function() {
//    var redirect = Session.get('redirectAfterLogin');
//    // LOGIC IS DIFFERENT HERE, CHECK AGAIN OR TEST
//    if (redirect !== "") {
//        if (redirect !== "/login") {
//            FlowRouter.go(redirect);
//        }
//    }
//});
//
//Accounts.onLogin(function() {
//    Meteor.logoutOtherClients();
//    Session.set('loggedIn',true);
//})
//
//var admin = loggedIn.group({
//    prefix: "/admin",
//    triggersEnter: [function() {
//        if (!Roles.userIsInRole(Meteor.user(),['admin'])) {
//            FlowRouter.go(FlowRouter.path('dashboard'));
//        }
//    }]
//});
//
//admin.route('users', {
//    name: 'users',
//    action: function() {
//        BlazeLayout.render('users');
//    }
//});

