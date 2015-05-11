angular.module('rsms')
    .service('processData', ['$q', function processData($q) {

        var cleanNumber = function(data){
            return data.replace(/[^0-9]/g, "");
        };

        var encrypt = function(contacts, param){

            var deferred = $q.defer();

            if (param == undefined) {

                deferred.resolve(SHA256(contacts, 'B64'));
                return deferred.promise;

            } else {

                var deferred = $q.defer();
                var processedContacts = [];
                for (var i=0; i < contacts.length; i++){

                            contacts[i][param] = SHA256(cleanNumber(contacts[i][param]), 'B64');
                            processedContacts.push(contacts[i]);
                }
                deferred.resolve(processedContacts);
                return deferred.promise;
            }
        };

        var oneItem = function(data, processType){

            //Strictly for phone numbers atm
            if (processType == 'encrypt') {
                return encrypt(cleanNumber(data));
            }

        };

        var multipleItems = function(data, attribute, processType){

            var resultingArray;
            var deferredMultiple = $q.defer();

            //Strictly for phone numbers atm
            if (processType == 'encrypt') {
                return encrypt(data, attribute);
            }

        };

        return {
            one: oneItem,
            many: multipleItems
        }
    }]);
