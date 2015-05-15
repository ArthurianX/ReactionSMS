angular.module('rsms')
    .service('userAccount', ['deviceComms', 'processData', 'temporaryStorage', '$meteor',  function userAccount(deviceComms, processData, temporaryStorage, $meteor) {

        /**
         * USER ACCOUNT
         *
         * - if the user is not logged
         * - if there is saved data in the localStorage or Cordova storage log in the user
         * - if there is no saved data REQUEST details from the phone `deviceComms.getUser()`
         * - create a dummy account with said data
         * - import contacts
         *
         * */

        var loginUser = function(data){
            Meteor.loginWithPassword({id: data.id}, data.password, function(err, data){
                //console.log('Err', err);
                //console.log('Data', data);
            });
        };

        var saveContacts = function(idToSplice){
            deviceComms.getContacts(idToSplice).then(function(data){
                data = angular.copy(data);
                processData.many(data, 'phone', 'encrypt').then(function(goodData){
                    console.log('Adding contacts', goodData);
                    $meteor.call('addContacts', goodData).then(function(data){
                        console.log(data);
                    });
                });
            });
        };

        var startup = function(){
            console.log('Startup User Account is running');
            if (Meteor.user() !== null ) {

                console.log('User is logged, do something here.')
                //TODO: Maybe start other processes here ?

            } else {

                //var savedData = temporaryStorage.getData();
                var savedData = null;  //Set to null so we always log a new user.

                if (savedData == null) {

                    var createRandUser = function(){
                        deviceComms.getUser().then(function(data){

                            console.log('Starting the dummy addition');
                            var user = data;
                            var idToSplice = angular.copy(user.id);
                            processData.one(data.phone, 'encrypt').then(function(data){
                                console.log('Encrypted');
                                user.phone = data;
                                //console.log('User is', user);
                                //console.log('Creating new user');
                                var genPass = Meteor.uuid().split('-')[0];
                                user.password = genPass;
                                user.officialSignup = false;

                                Meteor.call('autoUser', user, function(err, data){
                                    //console.log('Err', err);
                                    //console.log('Data', data);
                                    console.log('Auto-User', data, err);
                                    if (data) {

                                        user.password = genPass;
                                        user.id = data;
                                        temporaryStorage.setData(user);

                                        loginUser(user);

                                        saveContacts(idToSplice);
                                    } else {

                                        setTimeout(function(){
                                            //Retry until you find an ok user.
                                            createRandUser();
                                        }, 200);

                                    }
                                });
                            });

                        });
                    };
                    createRandUser();

                } else {
                    loginUser(savedData);
                }
            }
        };


        var realSignup = function(data){

            //TODO: Real signup of user comes here.

        };

        return {
            startup: startup
        }
    }]);
