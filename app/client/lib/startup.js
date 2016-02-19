Tracker.autorun(function() {
    if (!Meteor.userId()){
        if (Session.get('loggedIn')) {
            var current = FlowRouter.current()
            Session.set('redirectAfterLogin', current.path);
            FlowRouter.go(FlowRouter.path('login'));
        }
    }
});