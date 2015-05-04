angular.module('rsms')


    .controller('HomeCtrl', ['$scope', '$state', 'deviceComms', function HomeController($scope, $state, deviceComms) {

        deviceComms.getContacts().then(function(data){
            $scope.contacts = data;
        }, function(){
            $scope.contacts = [{
                "id": "554767a807c613f6b29a8023",
                "name": "No Access to PhoneBook",
                "phone": "Retry PhoneBook",
                "avatar": "227074167.png"
            }]
        });

        $scope.composeReaction = function(contact) {
            setTimeout(function(){
                $state.go('messageto', {friend: contact.id})
            }, 200);
        }

    }]);
