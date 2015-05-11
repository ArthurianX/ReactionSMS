angular.module('rsms')


    .controller('HomeCtrl', ['$scope', '$state', 'deviceComms', '$meteor', function HomeController($scope, $state, deviceComms, $meteor) {

        $scope.friendedContacs = false;
        $scope.contacts = false;
        //Meteor.call('connectPhone');
        $scope.contacts = $meteor.collection(Meteor.users, false).subscribe('contacts');

        $scope.findFriends = function(){
            $meteor.call('connectPhone').then(function(data){
                $scope.friendedContacs = data;
            });
        };

        $scope.composeReaction = function(contact) {
            setTimeout(function(){
                $state.go('messageto', {friend: contact})
            }, 200);
        }

    }]);
