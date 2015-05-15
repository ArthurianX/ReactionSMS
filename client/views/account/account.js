angular.module('rsms')

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */

    .controller('AccountCtrl', ['$scope', '$state', 'deviceComms', 'userAccount', '$meteor', function AccountCtrl($scope, $state, deviceComms, userAccount, $meteor) {



        $scope.loginFacebook = function(){
            Meteor.loginWithFacebook();
        };

        $scope.loginTwitter = function(){
            Meteor.loginWithTwitter();
        };

        $scope.loginGoogle = function(){
            Meteor.loginWithGoogle(function(data){
                console.log('Google login is', data);

            });
        };

        $scope.getGoogleCts = function(){
            Meteor.call('getGoogleContacts', function(data){
                console.log(data);
            })
        };

        //$scope.user = $meteor.collection(Meteor.users, false).subscribe('users');
        $scope.contacts = $meteor.collection(Meteor.users, false).subscribe('contacts');

    }]);
