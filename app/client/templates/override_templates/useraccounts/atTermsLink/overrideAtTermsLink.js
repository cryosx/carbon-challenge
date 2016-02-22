//Template['overrideAtTermsLink'].replaces('atTermsLink');

// Simply 'inherites' helpers from AccountsTemplates
Template.overrideAtTermsLink.helpers(AccountsTemplates.atTermsLinkHelpers);

// Simply 'inherites' events from AccountsTemplates
Template.overrideAtTermsLink.events(AccountsTemplates.atTermsLinkEvents);


Template.overrideAtTermsLink.onRendered(function() {
    $('.modal-trigger').leanModal({
        dismissible: false, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 200 // Transition out duration
        //ready: function() {
        //
        //}, // Callback for Modal open
        //complete: function() {
        //
        //}  // Callback for Modal close
    });

});