angular.module('rsms')
    .controller('AppController', ['$scope', '$timeout', '$log', '$state', 'userAccount', '$meteor',
        function AppController($scope, $timeout, $log, $state, userAccount, $meteor) {



            $scope.accountReactive = false;
            //Meteor.call('connectPhone');
            $scope.accountReactive = $meteor.collection(Meteor.users, false).subscribe('accountReactive');

            /** Start the initial user process */
            userAccount.startup();


        }])
    .controller('SidenavCtrl', ['$scope', '$timeout', '$log', '$state', function SidenavCtrl($scope, $timeout, $log, $state) {

        $scope.goTo = function(to){
            $state.go(to);
        };

    }])
    .controller('titleCtrl', ['$scope', function titleCtrl($scope) {

        $scope.pageTitle = 'ReactionSMS';
        $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $scope.pageTitle = toState.data.pageTitle;
        });


    }])
    .controller('statsCtrl', ['$scope', function statsCtrl($scope) {


    }]);



