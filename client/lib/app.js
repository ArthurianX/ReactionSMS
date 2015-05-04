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