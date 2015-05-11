angular.module('rsms')
    .config(function(){})
    .run(function(){})
    .factory('deviceComms', ['$q', function deviceComms($q) {

        var contacts = [
            {
                "id": "554ca079011a4494b31b6ad3",
                "name": "Cantu Steele",
                "phone": "(882) 443-2664",
                "avatar": "224796093.png",
                "email": "cantusteele@cincyr.com"
            },
            {
                "id": "554ca079b5dd9aeaa50290f0",
                "name": "Vaughn Silva",
                "phone": "(980) 448-3770",
                "avatar": "157966334.png",
                "email": "vaughnsilva@cincyr.com"
            },
            {
                "id": "554ca079580ca45302d0aecf",
                "name": "Patsy Brady",
                "phone": "(948) 568-2481",
                "avatar": "192388378.png",
                "email": "patsybrady@cincyr.com"
            },
            {
                "id": "554ca0797e2a2a040004a2b9",
                "name": "Cassandra Hyde",
                "phone": "(927) 561-2535",
                "avatar": "201867289.png",
                "email": "cassandrahyde@cincyr.com"
            },
            {
                "id": "554ca079856eab093b08549a",
                "name": "Livingston Barber",
                "phone": "(877) 418-3466",
                "avatar": "178541537.png",
                "email": "livingstonbarber@cincyr.com"
            },
            {
                "id": "554ca079f4e17403c686f356",
                "name": "Nicholson Bird",
                "phone": "(937) 570-2503",
                "avatar": "183548772.png",
                "email": "nicholsonbird@cincyr.com"
            },
            {
                "id": "554ca079ce2668582bb1b7dd",
                "name": "Shawn Cherry",
                "phone": "(813) 536-3028",
                "avatar": "188468346.png",
                "email": "shawncherry@cincyr.com"
            },
            {
                "id": "554ca079c0f6f2f27f8bb02f",
                "name": "Welch Alvarez",
                "phone": "(897) 513-3523",
                "avatar": "233009487.png",
                "email": "welchalvarez@cincyr.com"
            },
            {
                "id": "554ca07984782a3f4083ec6c",
                "name": "Tonya Kline",
                "phone": "(889) 448-3227",
                "avatar": "226588855.png",
                "email": "tonyakline@cincyr.com"
            },
            {
                "id": "554ca079c124c808cc7a1819",
                "name": "Clarke Clarke",
                "phone": "(975) 587-2333",
                "avatar": "251055588.png",
                "email": "clarkeclarke@cincyr.com"
            },
            {
                "id": "554ca0792eff28f2d0c0240b",
                "name": "Misty Mcbride",
                "phone": "(952) 431-3015",
                "avatar": "244101301.png",
                "email": "mistymcbride@cincyr.com"
            },
            {
                "id": "554ca0794abb47bfb7287e73",
                "name": "Melody Pearson",
                "phone": "(971) 466-3830",
                "avatar": "215882732.png",
                "email": "melodypearson@cincyr.com"
            },
            {
                "id": "554ca079a132b323e90c8598",
                "name": "Carole Paul",
                "phone": "(865) 595-2294",
                "avatar": "222483211.png",
                "email": "carolepaul@cincyr.com"
            },
            {
                "id": "554ca07991c390c44a7c57f6",
                "name": "Francis Weaver",
                "phone": "(950) 461-3378",
                "avatar": "248416906.png",
                "email": "francisweaver@cincyr.com"
            },
            {
                "id": "554ca0799d15ef8a6d9879d9",
                "name": "Chris Meyer",
                "phone": "(992) 533-2756",
                "avatar": "184639961.png",
                "email": "chrismeyer@cincyr.com"
            },
            {
                "id": "554ca07979fca6c05eb40eb4",
                "name": "Merle Henry",
                "phone": "(800) 465-3184",
                "avatar": "177868229.png",
                "email": "merlehenry@cincyr.com"
            },
            {
                "id": "554ca07999080dec954fcb5b",
                "name": "Berger Day",
                "phone": "(863) 590-2609",
                "avatar": "169077618.png",
                "email": "bergerday@cincyr.com"
            },
            {
                "id": "554ca079965cdeda307c4359",
                "name": "Cherie Caldwell",
                "phone": "(965) 576-2465",
                "avatar": "252492490.png",
                "email": "cheriecaldwell@cincyr.com"
            },
            {
                "id": "554ca07955cdfecf0cc85916",
                "name": "Christa Sharpe",
                "phone": "(907) 576-2212",
                "avatar": "213666799.png",
                "email": "christasharpe@cincyr.com"
            },
            {
                "id": "554ca079fd1124f3cf05dc15",
                "name": "Sutton Curry",
                "phone": "(912) 417-2421",
                "avatar": "201400103.png",
                "email": "suttoncurry@cincyr.com"
            },
            {
                "id": "554ca07950118c203b85d6e0",
                "name": "Ochoa Small",
                "phone": "(801) 445-3421",
                "avatar": "157695553.png",
                "email": "ochoasmall@cincyr.com"
            },
            {
                "id": "554ca07990d824940afc35de",
                "name": "Knowles Banks",
                "phone": "(806) 529-3039",
                "avatar": "236679678.png",
                "email": "knowlesbanks@cincyr.com"
            },
            {
                "id": "554ca079598b045f62555356",
                "name": "Inez Tran",
                "phone": "(906) 465-2318",
                "avatar": "196490855.png",
                "email": "ineztran@cincyr.com"
            },
            {
                "id": "554ca079feb95757f3ac5e4f",
                "name": "Freida Welch",
                "phone": "(940) 464-2198",
                "avatar": "230823311.png",
                "email": "freidawelch@cincyr.com"
            },
            {
                "id": "554ca0795b11854b8b3c7291",
                "name": "Bethany Rasmussen",
                "phone": "(902) 432-2486",
                "avatar": "183077862.png",
                "email": "bethanyrasmussen@cincyr.com"
            },
            {
                "id": "554ca079b53273a310df90c4",
                "name": "Clarice Wheeler",
                "phone": "(834) 564-3363",
                "avatar": "246842382.png",
                "email": "claricewheeler@cincyr.com"
            }
        ];

        var myDetails =  {
            "id": contacts[Math.floor(Math.random() * (23 - 1)) + 1].id,
            "name": contacts[Math.floor(Math.random() * (23 - 1)) + 1].name,
            "phone": contacts[Math.floor(Math.random() * (23 - 1)) + 1].phone,
            "avatar": contacts[Math.floor(Math.random() * (23 - 1)) + 1].avatar,
            "email": contacts[Math.floor(Math.random() * (23 - 1)) + 1]['email']
        };

        var getContacts = function(){

            var deferred = $q.defer();

            setTimeout(function() {
                deferred.notify('About to greet ' + name + '.');
                deferred.resolve(contacts);
            }, 1000);

            return deferred.promise;
        };

        var getUser = function(){

            var deferred = $q.defer();

            setTimeout(function() {
                deferred.notify('About to greet ' + name + '.');
                deferred.resolve(myDetails);
            }, 1000);

            return deferred.promise;
        };

        return {
            getContacts: getContacts,
            getUser: getUser,
            getSavedContacts: function(){
                return contacts;
            },
            getOwner: myDetails

        };
    }]);


