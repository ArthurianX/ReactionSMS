angular.module('rsms')

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */

    .controller('AccountCtrl', ['$scope', '$state', 'deviceComms', function AccountCtrl($scope, $state, deviceComms) {

        $scope.addContacts = function(){
            deviceComms.getContacts().then(function(data){
                //Process Data
                Meteor.call('addContacts', data)
            });
        };

    }]);
