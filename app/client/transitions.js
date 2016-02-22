var NamedRoutes = [ 'home','signIn','signUp','privacy', 'termsOfUse', 'resendVerificationEmail'];

// Modified momentum-flow-router so I change the transition effect more easily.
Transitioner.TransitionOrder(NamedRoutes,'fade', 'fade');

//Transitioner.setTransitions({
//
//    'home->signIn': 'fade',
//    'home->signUp': 'fade',
//    'signIn->home': 'fade',
//    'signUp->home': 'fade',
//
//    'default': 'fade'
//});