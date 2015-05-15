angular.module('rsms')


    .controller('MessageCtrl', ['$scope', '$state', '$stateParams', 'deviceComms', '$log', '$meteor', function MessageCtrl($scope, $state, $stateParams, deviceComms, $log, $meteor) {


        /** Variables */

        $scope.compDetails = {
            avatar: '',
            name: '',
            phone: '',
            reaction: ''
        };

        $scope.message = {
            text: '',
            reaction: '',
            poster: '',
            timestamp: ''
        };

        $scope.isEditActive = false;
        $scope.messagesHeight = 71.5;
        $scope.isLoading = false;

        $scope.conversationId = '';
        $scope.messages = []; //This is the conversations

        $scope.selectedContact = false;

        var contacts = deviceComms.getSavedContacts();

        /** Subscriptions */

        //$scope.accountReactive = $meteor.collection(Meteor.users, false).subscribe('accountReactive');




        /** Contact Display */

        var findContact = function(){
            $meteor.call('findContact', $stateParams.friend).then(function(data){
                if (data !== undefined) {
                    //This user should always exist.
                    console.log('Found user', data);
                    $scope.selectedContact = [data];
                    startConversation(findConversationWithUser($stateParams.friend));
                }
            });
        };

        if ($stateParams.friend) {
            console.log('Find Friend');
            findContact();
        }


        $scope.switchEdit = function(isEditActive){
            if (!$scope.isEditActive) {
                $scope.messagesHeight = 50;
            } else {
                $scope.messagesHeight = 71.5;
            }
        };

        $scope.selectReaction = function(){

        };


        /** Search AutoComplete */

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
            console.log(item);
            startConversation(findConversationWithUser(item.id));
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
        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) >= 0);
            };
        }


        /** Find other conversations */

        var findConversationWithUser = function(param){

            console.log('Searching for conversations');
            var conversationUsers = _.pluck($scope.accountReactive[0].profile.conversations, 'user');

            if (conversationUsers.indexOf(param) > -1) {
                $scope.conversationId = $scope.accountReactive[0].profile.conversations[conversationUsers.indexOf(param)].id;
                return $scope.accountReactive[0].profile.conversations[conversationUsers.indexOf(param)].id;
            } else {
                return undefined;
            }


        };

        var startConversation = function(convoId){
            console.log('Start Checking for Conversation ', convoId);
            if (convoId !== undefined) {
                console.log('Conversation found');
                listenToConversation(convoId);
            } else if (convoId === undefined) {
                $meteor.call('initiateConversation', $scope.accountReactive[0]._id, $stateParams.friend, $scope.message).then(function(data){
                    console.log('Succesfully initiated conversation');
                    //Add conversation to both users
                    console.log('Sending convoId', data, ' and userID ', $stateParams.friend, ' while mine is ', Meteor.userId());
                    $meteor.call('addConversationToUsers', data, $stateParams.friend).then(function(){
                        listenToConversation(data);
                    });

                });
            }
        };

        //Subscribe to a conversation id
        var listenToConversation = function(id){
            console.log('Starting Reactive Conversation ', id);
            $scope.messages = $meteor.collection(Conversations, false).subscribe('conversation', id);
        };

        /** Send Message */

        $scope.sendMessage = function(){
            console.log('Posting', $scope.message);
            $meteor.call('addMessage', $scope.conversationId, $scope.message).then(function(data){
                //Success
                $scope.message.text = '';
            });
        };




    }]);
