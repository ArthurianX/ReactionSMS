angular.module('rsms')
    .service('temporaryStorage', ['$q', function temporaryStorage($q) {

        return {
            getData: function(){
                return JSON.parse(window.localStorage.getItem('RSMS'));
            },
            setData: function(data){
                console.log('Saving in Storage ', data);
                window.localStorage.setItem('RSMS', JSON.stringify(data));
                return true;
            }
        }

    }]);
