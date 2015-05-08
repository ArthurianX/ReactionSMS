angular.module('rsms')

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */

    .controller('AccountCtrl', ['$scope', '$state', 'deviceComms', 'userAccount', function AccountCtrl($scope, $state, deviceComms, userAccount) {


        /** Start the initial user process */
        userAccount.startup();

    }]);
