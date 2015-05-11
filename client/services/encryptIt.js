angular.module('rsms')
    .service('encryptIt', ['$q', function deviceComms($q) {


        var deferred = $q.defer();

        var encrypt = function(data){

            deferred.notify('About to encrypt ' + data);

            var bcrypt = dcodeIO.bcrypt;
            bcrypt.hash('bacon', 8, function(err, hash) {

                deferred.resolve(hash);

            });

            return deferred.promise;

        };

        return encrypt;
    }]);
