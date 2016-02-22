AccountsTemplates.configure({
    defaultLayoutType: 'blaze', // Optional, the default is 'blaze'
    defaultTemplate: 'fullPageAtForm',
    defaultLayout: 'masterLayout',
    defaultLayoutRegions: {
        header: 'header',
        footer: 'footer'
    },
    defaultContentRegion: 'main',

    // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    focusFirstInput: true,
    forbidClientAccountCreation: false,
    lowercaseUsername: false,
    overrideLoginErrors: true,
    sendVerificationEmail: true,
    socialLoginStyle: "popup",

    // Appearance
    showAddRemoveServices: true,
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: true,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Privacy Policy and Terms of Use
    privacyUrl: '/legal/privacy',
    termsUrl: '/legal/terms-of-use',

    // Redirects
    homeRoutePath: '/',
    redirectTimeout: 4000,

    // Texts
    texts: {
        button: {
            signUp: "Register Now!"
        },
        socialSignUp: "Register",
        socialIcons: {
            "meteor-developer": "fa fa-rocket"
        },
        title: {
            forgotPwd: "Recover Your Password",
            resendVerificationEmail: "Resend the Verification Email"
        }
    }
});

// Define these routes in a file loaded on both client and server
AccountsTemplates.configureRoute('signIn', {
    name: 'signIn',
    path: '/sign-in'
});

AccountsTemplates.configureRoute('signUp', {
    name: 'signUp',
    path: '/sign-up'
});


AccountsTemplates.configureRoute('changePwd', {
    name: 'changePwd',
    path: '/change-password'
});

AccountsTemplates.configureRoute('forgotPwd', {
    name: 'forgotPwd',
    path: '/forgot-password'
});

AccountsTemplates.configureRoute('resetPwd', {
    name: 'resetPwd',
    path: '/reset-password'
});


AccountsTemplates.configureRoute('resendVerificationEmail', {
    name: 'resendVerificationEmail',
    path: '/send-again'
});