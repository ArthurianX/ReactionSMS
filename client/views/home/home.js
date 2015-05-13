angular.module('rsms')


    .controller('HomeCtrl', ['$scope', '$state', 'deviceComms', '$meteor', function HomeController($scope, $state, deviceComms, $meteor) {

        $scope.friendedContacs = false;

        $scope.findFriends = function(){
            $meteor.call('connectPhone').then(function(data){
                $scope.friendedContacs = data;
                console.log(data);
            });
        };

        $scope.composeReaction = function(contact) {
            setTimeout(function(){
                $state.go('messageto', {friend: contact})
            }, 200);
        }

    }]);
