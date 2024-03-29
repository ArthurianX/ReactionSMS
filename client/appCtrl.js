angular.module('rsms')
    .controller('AppController', ['$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$state', 'userAccount', '$meteor',
        function AppController($scope, $timeout, $mdSidenav, $mdUtil, $log, $state, userAccount, $meteor) {

            $scope.toggleSidenav = buildToggler('left');
            /**
             * Build handler to open/close a SideNav; when animation finishes
             * report completion in console
             */
            function buildToggler(navID) {
                var debounceFn =  $mdUtil.debounce(function(){
                    $mdSidenav(navID)
                        .toggle()
                        .then(function () {
                            $log.debug("toggle " + navID + " is done");
                        });
                },300);
                return debounceFn;
            }



            $scope.accountReactive = false;
            //Meteor.call('connectPhone');
            $scope.accountReactive = $meteor.collection(Meteor.users, false).subscribe('accountReactive');

            /** Start the initial user process */
            userAccount.startup();


        }])
    .controller('SidenavCtrl', ['$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$state', function SidenavCtrl($scope, $timeout, $mdSidenav, $mdUtil, $log, $state) {

        $scope.goTo = function(to){
            $state.go(to);
            $scope.toggleSidenav();
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



