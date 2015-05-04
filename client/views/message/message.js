angular.module('rsms')


    .controller('MessageCtrl', ['$scope', '$state', '$stateParams', 'deviceComms', '$log', function MessageCtrl($scope, $state, $stateParams, deviceComms, $log) {

        $scope.compDetails = {
            avatar: '',
            name: '',
            phone: '',
            reaction: ''
        };

        $scope.selectedContact = false;

        var contacts = deviceComms.getSavedContacts();

        var findContact = function(){
            for (var i=0; i < contacts.length; i++) {
                if (contacts[i].id === $stateParams.friend) {
                    $scope.compDetails = {
                        avatar: $stateParams.friend.avatar,
                        name: $stateParams.friend.name,
                        phone: $stateParams.friend.phone
                    };
                }
            }
        };

        console.log($stateParams);

        if ($stateParams.friend) {
            findContact();
        }

        $scope.selectReaction = function(){

        };


        var self = this;
        self.simulateQuery = false;
        self.isDisabled    = false;
        // list of `state` value/display objects
        self.states        = loadAll();
        self.querySearch   = querySearch;
        self.selectedItemChange = selectedItemChange;
        self.searchTextChange   = searchTextChange;
        // ******************************
        // Internal methods
        // ******************************
        /**
         * Search for states... use $timeout to simulate
         * remote dataservice call.
         */
        function querySearch (query) {
            var results = query ? self.states.filter( createFilterFor(query) ) : self.states;
            return results;
        }

        function searchTextChange(text) {
            $log.info('Text changed to ' + text);
        }

        function selectedItemChange(item) {
            $log.info('Item changed to ' + JSON.stringify(item));
            $scope.selectedContact = [item];
        }

        $scope.removeContact = function(){
            $scope.selectedContact = false;
        };
        /**
         * Build `states` list of key/value pairs
         */
        function loadAll() {

            return contacts.map( function (contact) {
                return {
                    value: contact.name.toLowerCase(),
                    name: contact.name,
                    avatar: contact.avatar,
                    phone: contact.phone
                };
            });
        }
        console.log(loadAll());
        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) >= 0);
            };
        }

    }]);
