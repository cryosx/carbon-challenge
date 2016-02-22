// Ensuring every user has an email address, should be in server-side code
Accounts.validateNewUser(function (user) {
    new SimpleSchema({
        _id: {type: String},
        emails: {type: Array},
        'emails.$': {type: Object},
        'emails.$.address': {type: String},
        'emails.$.verified': {type: Boolean},
        createdAt: {type: Date},
        services: {type: Object, blackbox: true}
    }).validate(user);

// Return true to allow user creation to proceed
    return true;
});

//Accounts.emailTemplates.siteName = "Meteor Guide Todos Example";
//Accounts.emailTemplates.from = "Meteor Todos Accounts <accounts@example.com>";
//
//Accounts.emailTemplates.resetPassword = {
//    subject: function (user) {
//        return "Reset your password on Meteor Todos";
//    },
//    text: function (user, url) {
//        return "Hello! Click the link below to reset your password on Meteor Todos. ${url} If you didn't request this email, please ignore it.Thanks,The Meteor Todos team"
//    },
//    html: function (user, url) {
//        // This is where HTML email content would go.
//        // See the section about html emails below.
//    }
//};