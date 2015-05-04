angular.module('rsms')
    .controller('AppController', ['$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', function AppController($scope, $timeout, $mdSidenav, $mdUtil, $log) {
        console.log('App is here');

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

    }])
    .controller('SidenavCtrl', ['$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$state', function AppController($scope, $timeout, $mdSidenav, $mdUtil, $log, $state) {

        $scope.goTo = function(to){
            $state.go(to);
            $scope.toggleSidenav();
        };

    }]);



