angular.module('rsms')

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */

    .controller('AccountCtrl', ['$scope', '$state', 'deviceComms', 'userAccount', '$meteor', function AccountCtrl($scope, $state, deviceComms, userAccount, $meteor) {


        /** Start the initial user process */
        userAccount.startup();


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
        }

        $scope.connect = function(){
            $meteor.call('connectPhone').then(function(data){
                console.log('ConnectFriends ', data);
            });
        };

        //$scope.user = $meteor.collection(Meteor.users, false).subscribe('users');
        $scope.contacts = $meteor.collection(Meteor.users, false).subscribe('contacts');

    }]);
