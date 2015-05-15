angular.module('rsms',[
    'angular-meteor',
    /*'famous.angular',*/
    'ngMaterial',
    'ui.router'
]);


/*
sgi:famous-angular
angular:angular-material
*/



/*
angular.module('rsms')
    .config(themeIcons);
*/

function onReady() {
    angular.bootstrap(document, ['rsms']);
}

if (Meteor.isCordova)
    angular.element(document).on("deviceready", onReady);
else
    angular.element(document).ready(onReady);





Accounts.ui.config({
    requestPermissions: {
        facebook: ['email', 'user_friends'],
        google:['https://www.google.com/m8/feeds']
    },
    requestOfflineToken: {
        google: true
    },
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});