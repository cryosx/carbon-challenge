//Template.loading.helpers({
//    //add you helpers here
//});
//
//Template.loading.events({
//    //add your events here
//});
//
//Template.loading.onCreated(function () {
//    //add your statement here
//});
//
//Template.loading.rendered = function () {
//    if ( ! Session.get('loadingSplash') ) {
//        this.loading = window.pleaseWait({
//            logo: '/images/Meteor-logo.png',
//            backgroundColor: '#7f8c8d',
//            loadingHtml: message + spinner
//        });
//        Session.set('loadingSplash', true); // just show loading splash once
//    }
//};
//
//Template.loading.destroyed = function () {
//    if ( this.loading ) {
//        this.loading.finish();
//    }
//};
//
//var message = '<p class="loading-message">Loading Message</p>';
//var spinner = '<div class="sk-spinner sk-spinner-rotating-plane"></div>';
//
//Template.loading.onDestroyed(function () {
//    //add your statement here
//});
//
