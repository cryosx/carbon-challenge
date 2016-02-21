//var NamedRoutes = [ 'home','signIn','signUp','privacy', 'termsOfUse'];
//Transitioner.TransitionOrder(NamedRoutes);

Transitioner.setTransitions({

    'home->signIn': 'fade',
    'home->signUp': 'fade',
    'signIn->home': 'fade',
    'signUp->home': 'fade',

    'default': 'fade'
});