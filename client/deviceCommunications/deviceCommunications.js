angular.module('rsms')
    .config(function(){})
    .run(function(){})
    .factory('deviceComms', ['$q', function deviceComms($q) {

        var myDetails =  {
            "id": "554767a8c10d2203851cd3fe",
            "name": "Hines Stevenson",
            "phone": "(962) 503-2532",
            "avatar": "232696161.png"
        };

        var contacts = [
            {
                "id": "554767a807c613f6b29a8023",
                "name": "Barker Byrd",
                "phone": "(844) 496-2835",
                "avatar": "227074167.png"
            },
            {
                "id": "554767a8719711af47e48bc3",
                "name": "Trujillo Luna",
                "phone": "(999) 449-2043",
                "avatar": "167259901.png"
            },
            {
                "id": "554767a8d5ae087d5903941c",
                "name": "Trisha Campbell",
                "phone": "(968) 423-2077",
                "avatar": "176663754.png"
            },
            {
                "id": "554767a85e10be4cd8366b00",
                "name": "Robertson Morgan",
                "phone": "(982) 547-3567",
                "avatar": "254341232.png"
            },
            {
                "id": "554767a8ad833c0183247c49",
                "name": "Glenda Hall",
                "phone": "(918) 405-2001",
                "avatar": "205295761.png"
            },
            {
                "id": "554767a8a4ffb34fd490ce44",
                "name": "Chen Velazquez",
                "phone": "(890) 449-2074",
                "avatar": "188868604.png"
            },
            {
                "id": "554767a8b8f119d6cbfaf125",
                "name": "Webb Olsen",
                "phone": "(906) 504-3045",
                "avatar": "210177674.png"
            },
            {
                "id": "554767a8eb91841cbcda0337",
                "name": "Norton Sullivan",
                "phone": "(811) 557-2116",
                "avatar": "224663554.png"
            },
            {
                "id": "554767a8bebb2b80c5c5b94b",
                "name": "Park Patrick",
                "phone": "(926) 465-2001",
                "avatar": "251048064.png"
            },
            {
                "id": "554767a8ba464ce3f8aeb0db",
                "name": "Karin Marquez",
                "phone": "(980) 542-2248",
                "avatar": "225194363.png"
            },
            {
                "id": "554767a87df8882e91176b0f",
                "name": "Golden Guerra",
                "phone": "(979) 455-3928",
                "avatar": "186427371.png"
            },
            {
                "id": "554767a8d7ea3829315e896c",
                "name": "Kayla Jacobson",
                "phone": "(873) 400-2023",
                "avatar": "233096775.png"
            },
            {
                "id": "554767a8fe94d07ff0dbe980",
                "name": "Gilmore Rios",
                "phone": "(915) 503-2176",
                "avatar": "167615980.png"
            },
            {
                "id": "554767a8fc12dff1016a7ea5",
                "name": "Whitfield Rojas",
                "phone": "(984) 539-3215",
                "avatar": "172040453.png"
            },
            {
                "id": "554767a8e659b96af75fbbab",
                "name": "Jaime Leonard",
                "phone": "(860) 570-2913",
                "avatar": "211934948.png"
            },
            {
                "id": "554767a8c7b811088d9ec7c1",
                "name": "Shields Day",
                "phone": "(843) 500-3847",
                "avatar": "206933903.png"
            },
            {
                "id": "554767a81921a5ee6c9849f6",
                "name": "Zamora Woodward",
                "phone": "(945) 539-2642",
                "avatar": "202066914.png"
            },
            {
                "id": "554767a890d4689a36294f34",
                "name": "Galloway Stevens",
                "phone": "(863) 473-2877",
                "avatar": "247165049.png"
            },
            {
                "id": "554767a8a802d7916ec7c91c",
                "name": "Hallie Sloan",
                "phone": "(915) 597-2861",
                "avatar": "180855475.png"
            },
            {
                "id": "554767a834d2d9c8d76edca8",
                "name": "Emilia Gutierrez",
                "phone": "(827) 568-3599",
                "avatar": "226872359.png"
            },
            {
                "id": "554767a8ff17525517da7329",
                "name": "Kathrine Stein",
                "phone": "(962) 400-3045",
                "avatar": "195960063.png"
            },
            {
                "id": "554767a89a5b7a92e5b61950",
                "name": "Cherie Cooke",
                "phone": "(908) 572-3324",
                "avatar": "185491301.png"
            },
            {
                "id": "554767a810799c1598cc5c0b",
                "name": "Mcclain Randall",
                "phone": "(949) 584-2966",
                "avatar": "243843886.png"
            },
            {
                "id": "554767a808c02877e6d5ddad",
                "name": "Elaine Nichols",
                "phone": "(813) 424-3018",
                "avatar": "171518734.png"
            },
            {
                "id": "554767a8c10d2203851cd3fe",
                "name": "Hines Stevenson",
                "phone": "(962) 503-2532",
                "avatar": "232696161.png"
            }
        ];

        var getContacts = function(){

            var deferred = $q.defer();

            setTimeout(function() {
                deferred.notify('About to greet ' + name + '.');

                deferred.resolve(contacts);

                /*if (okToGreet(name)) {
                    deferred.resolve('Hello, ' + name + '!');
                } else {
                    deferred.reject('Greeting ' + name + ' is not allowed.');
                }*/
            }, 1000);

            return deferred.promise;

        };


        return {
            getContacts: getContacts,
            getSavedContacts: function(){
                return contacts;
            },
            getOwner: myDetails

        };
    }]);
