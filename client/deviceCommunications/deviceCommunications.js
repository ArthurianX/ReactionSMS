angular.module('rsms')
    .config(function(){})
    .run(function(){})
    .service('deviceComms', ['$q', function deviceComms($q) {

        var contacts = [
            {
                "id": "555132a3cb4f5281c662392c",
                "name": "Tonya Morton",
                "phone": "(868) 406-2515",
                "avatar": "238327412.png",
                "email": "tonyamorton@xumonk.com"
            },
            {
                "id": "555132a325602c4dc2d0d0e5",
                "name": "Susanne Byrd",
                "phone": "(972) 491-2967",
                "avatar": "208800397.png",
                "email": "susannebyrd@xumonk.com"
            },
            {
                "id": "555132a3b5812768c811473a",
                "name": "Sutton Mcconnell",
                "phone": "(940) 562-3306",
                "avatar": "217351561.png",
                "email": "suttonmcconnell@xumonk.com"
            },
            {
                "id": "555132a387bc0777072d4d1d",
                "name": "Burt Bell",
                "phone": "(984) 570-3858",
                "avatar": "253043429.png",
                "email": "burtbell@xumonk.com"
            },
            {
                "id": "555132a3db32deea8520bfc1",
                "name": "Buckner Berry",
                "phone": "(999) 458-2790",
                "avatar": "242363972.png",
                "email": "bucknerberry@xumonk.com"
            },
            {
                "id": "555132a3206fdd9c84143aa4",
                "name": "Burgess Gibson",
                "phone": "(999) 452-3299",
                "avatar": "242413170.png",
                "email": "burgessgibson@xumonk.com"
            },
            {
                "id": "555132a30e5da4540203829e",
                "name": "Rosales Holcomb",
                "phone": "(910) 438-2333",
                "avatar": "218442418.png",
                "email": "rosalesholcomb@xumonk.com"
            },
            {
                "id": "555132a3112be9154a0801a6",
                "name": "Erica Witt",
                "phone": "(852) 501-3640",
                "avatar": "188478056.png",
                "email": "ericawitt@xumonk.com"
            },
            {
                "id": "555132a38c474bbd3804e175",
                "name": "Church Sanchez",
                "phone": "(980) 514-2313",
                "avatar": "191360904.png",
                "email": "churchsanchez@xumonk.com"
            },
            {
                "id": "555132a307f5ea4d9f061480",
                "name": "Katina Jacobs",
                "phone": "(855) 421-2963",
                "avatar": "215317159.png",
                "email": "katinajacobs@xumonk.com"
            },
            {
                "id": "555132a37974be82e2f1764f",
                "name": "Aisha Reynolds",
                "phone": "(891) 529-2004",
                "avatar": "218406934.png",
                "email": "aishareynolds@xumonk.com"
            },
            {
                "id": "555132a369c19aac4e834921",
                "name": "Kerr Lara",
                "phone": "(850) 558-3740",
                "avatar": "194118521.png",
                "email": "kerrlara@xumonk.com"
            },
            {
                "id": "555132a3a18a7f75e75b17ba",
                "name": "Annette Atkins",
                "phone": "(996) 583-2329",
                "avatar": "214168458.png",
                "email": "annetteatkins@xumonk.com"
            },
            {
                "id": "555132a37c243ceb532b69c6",
                "name": "Maryann Vance",
                "phone": "(839) 545-3556",
                "avatar": "247700331.png",
                "email": "maryannvance@xumonk.com"
            },
            {
                "id": "555132a3546ac62f1ee48a72",
                "name": "Juliette Mcdaniel",
                "phone": "(876) 459-2021",
                "avatar": "162923287.png",
                "email": "juliettemcdaniel@xumonk.com"
            },
            {
                "id": "555132a3fd4fcbb2e53e7d21",
                "name": "Ingram Olsen",
                "phone": "(877) 590-3363",
                "avatar": "210241167.png",
                "email": "ingramolsen@xumonk.com"
            },
            {
                "id": "555132a37893d10e36baaf71",
                "name": "Nora Case",
                "phone": "(900) 494-2161",
                "avatar": "180835195.png",
                "email": "noracase@xumonk.com"
            },
            {
                "id": "555132a34132a755da08e650",
                "name": "Mcintyre Clemons",
                "phone": "(927) 516-2292",
                "avatar": "198626065.png",
                "email": "mcintyreclemons@xumonk.com"
            },
            {
                "id": "555132a3232e59032c75c9a7",
                "name": "Maura Atkinson",
                "phone": "(919) 532-2079",
                "avatar": "159823853.png",
                "email": "mauraatkinson@xumonk.com"
            },
            {
                "id": "555132a3ef119503ce9caa08",
                "name": "Holmes Workman",
                "phone": "(986) 512-2163",
                "avatar": "244048552.png",
                "email": "holmesworkman@xumonk.com"
            },
            {
                "id": "555132a3cf1da00bd7b5447e",
                "name": "Morse Gray",
                "phone": "(842) 532-3396",
                "avatar": "217480758.png",
                "email": "morsegray@xumonk.com"
            },
            {
                "id": "555132a3a3230e5f214bfdac",
                "name": "Tiffany Ayala",
                "phone": "(891) 414-3826",
                "avatar": "187275335.png",
                "email": "tiffanyayala@xumonk.com"
            },
            {
                "id": "555132a3c8d6e46b39bb6473",
                "name": "James Hickman",
                "phone": "(963) 488-3026",
                "avatar": "160812987.png",
                "email": "jameshickman@xumonk.com"
            },
            {
                "id": "555132a393370d0ef583716f",
                "name": "Michael Cameron",
                "phone": "(820) 443-3716",
                "avatar": "234178925.png",
                "email": "michaelcameron@xumonk.com"
            },
            {
                "id": "555132a38730902b8653fc8e",
                "name": "Dalton Garza",
                "phone": "(954) 544-3467",
                "avatar": "251296747.png",
                "email": "daltongarza@xumonk.com"
            },
            {
                "id": "555132a3c12e6449d5505459",
                "name": "Craft Roth",
                "phone": "(817) 464-2257",
                "avatar": "233078561.png",
                "email": "craftroth@xumonk.com"
            },
            {
                "id": "555132a3f44f5b5c13f84034",
                "name": "Desiree Anderson",
                "phone": "(806) 407-2153",
                "avatar": "188362855.png",
                "email": "desireeanderson@xumonk.com"
            },
            {
                "id": "555132a3b395418af00b0627",
                "name": "Cantrell Rice",
                "phone": "(910) 428-3897",
                "avatar": "168509893.png",
                "email": "cantrellrice@xumonk.com"
            },
            {
                "id": "555132a36563d014e108f287",
                "name": "Glover Reed",
                "phone": "(833) 424-2286",
                "avatar": "256132485.png",
                "email": "gloverreed@xumonk.com"
            },
            {
                "id": "555132a37bb71b65dfd63da7",
                "name": "Sexton Hunt",
                "phone": "(930) 471-2841",
                "avatar": "245616035.png",
                "email": "sextonhunt@xumonk.com"
            },
            {
                "id": "555132a36d048b31d0e0268a",
                "name": "Josefa Mcintosh",
                "phone": "(840) 473-3949",
                "avatar": "174600275.png",
                "email": "josefamcintosh@xumonk.com"
            },
            {
                "id": "555132a365012e04bb01d955",
                "name": "Battle Calhoun",
                "phone": "(968) 423-2060",
                "avatar": "187601198.png",
                "email": "battlecalhoun@xumonk.com"
            },
            {
                "id": "555132a36ce3d08600b6da7b",
                "name": "Victoria Blankenship",
                "phone": "(988) 523-2138",
                "avatar": "228371869.png",
                "email": "victoriablankenship@xumonk.com"
            },
            {
                "id": "555132a33b943187a2ea5587",
                "name": "Felicia Kinney",
                "phone": "(995) 542-2451",
                "avatar": "234897728.png",
                "email": "feliciakinney@xumonk.com"
            },
            {
                "id": "555132a3fcd4dd390c3a98fc",
                "name": "Hollie Pearson",
                "phone": "(831) 506-3805",
                "avatar": "171867685.png",
                "email": "holliepearson@xumonk.com"
            },
            {
                "id": "555132a3a4326159b3eb1791",
                "name": "Dana Arnold",
                "phone": "(984) 464-2961",
                "avatar": "245696409.png",
                "email": "danaarnold@xumonk.com"
            },
            {
                "id": "555132a30c66af0944bf065c",
                "name": "Owen Schultz",
                "phone": "(811) 460-3837",
                "avatar": "197748806.png",
                "email": "owenschultz@xumonk.com"
            },
            {
                "id": "555132a329a84262aa532e23",
                "name": "Elsie Burnett",
                "phone": "(921) 595-2099",
                "avatar": "178404777.png",
                "email": "elsieburnett@xumonk.com"
            },
            {
                "id": "555132a3486e3cb6c0bcb1af",
                "name": "Cantu Buckner",
                "phone": "(880) 597-2487",
                "avatar": "176045845.png",
                "email": "cantubuckner@xumonk.com"
            },
            {
                "id": "555132a30c3bfff0f9585584",
                "name": "Christa Hancock",
                "phone": "(879) 402-3940",
                "avatar": "221363512.png",
                "email": "christahancock@xumonk.com"
            },
            {
                "id": "555132a3de50cb52f3c39d19",
                "name": "Brady Beard",
                "phone": "(823) 553-3566",
                "avatar": "207525737.png",
                "email": "bradybeard@xumonk.com"
            },
            {
                "id": "555132a3c9ec3a3b1222a433",
                "name": "Audra Justice",
                "phone": "(939) 558-3844",
                "avatar": "246241519.png",
                "email": "audrajustice@xumonk.com"
            },
            {
                "id": "555132a35b3f940a731b6f48",
                "name": "Orr Malone",
                "phone": "(812) 579-3983",
                "avatar": "169225294.png",
                "email": "orrmalone@xumonk.com"
            },
            {
                "id": "555132a37df4b58ec78cd46e",
                "name": "Minnie Carson",
                "phone": "(825) 568-2390",
                "avatar": "212706560.png",
                "email": "minniecarson@xumonk.com"
            },
            {
                "id": "555132a3e29ea40d00feac73",
                "name": "Nadia Santos",
                "phone": "(977) 599-3086",
                "avatar": "228925937.png",
                "email": "nadiasantos@xumonk.com"
            },
            {
                "id": "555132a33c29d2220b6c9534",
                "name": "Gillespie Aguirre",
                "phone": "(937) 417-3584",
                "avatar": "235662114.png",
                "email": "gillespieaguirre@xumonk.com"
            },
            {
                "id": "555132a3effd3ab7e9848ed5",
                "name": "Burton Cross",
                "phone": "(880) 565-3464",
                "avatar": "242751742.png",
                "email": "burtoncross@xumonk.com"
            },
            {
                "id": "555132a31cddf3b8a0fb0e14",
                "name": "Marsha Phillips",
                "phone": "(992) 571-2320",
                "avatar": "206761552.png",
                "email": "marshaphillips@xumonk.com"
            },
            {
                "id": "555132a3cc17599512f52375",
                "name": "Earnestine Ortiz",
                "phone": "(989) 505-2219",
                "avatar": "251710449.png",
                "email": "earnestineortiz@xumonk.com"
            },
            {
                "id": "555132a32aaecf65a0e9601c",
                "name": "Paulette Sweeney",
                "phone": "(945) 482-3090",
                "avatar": "159262080.png",
                "email": "paulettesweeney@xumonk.com"
            },
            {
                "id": "555132a3dbf950a4b4527b92",
                "name": "Hester Mercer",
                "phone": "(825) 579-2026",
                "avatar": "188570959.png",
                "email": "hestermercer@xumonk.com"
            },
            {
                "id": "555132a3104d916c50112063",
                "name": "Thomas Mcintyre",
                "phone": "(968) 405-2245",
                "avatar": "237799993.png",
                "email": "thomasmcintyre@xumonk.com"
            },
            {
                "id": "555132a33746c1f71e808222",
                "name": "Marina Hartman",
                "phone": "(903) 514-2878",
                "avatar": "238389724.png",
                "email": "marinahartman@xumonk.com"
            },
            {
                "id": "555132a37349b115dc9e4753",
                "name": "Dyer Newton",
                "phone": "(827) 571-3777",
                "avatar": "222523004.png",
                "email": "dyernewton@xumonk.com"
            },
            {
                "id": "555132a3f9abfc897b9c2f39",
                "name": "Small Mason",
                "phone": "(815) 594-3419",
                "avatar": "167009381.png",
                "email": "smallmason@xumonk.com"
            },
            {
                "id": "555132a39272fcbe614497d3",
                "name": "Frost Mclaughlin",
                "phone": "(953) 528-3872",
                "avatar": "235354164.png",
                "email": "frostmclaughlin@xumonk.com"
            },
            {
                "id": "555132a366ad430a356e316b",
                "name": "Graciela Fitzpatrick",
                "phone": "(881) 460-2134",
                "avatar": "168130431.png",
                "email": "gracielafitzpatrick@xumonk.com"
            },
            {
                "id": "555132a3a1aedad16f546e99",
                "name": "Jenifer Young",
                "phone": "(991) 541-3268",
                "avatar": "180019952.png",
                "email": "jeniferyoung@xumonk.com"
            },
            {
                "id": "555132a38ff487a518f91b4e",
                "name": "Chapman Bauer",
                "phone": "(898) 560-2257",
                "avatar": "238742297.png",
                "email": "chapmanbauer@xumonk.com"
            },
            {
                "id": "555132a3fd773be3afa03dec",
                "name": "Carlene Henry",
                "phone": "(909) 510-3159",
                "avatar": "186907392.png",
                "email": "carlenehenry@xumonk.com"
            },
            {
                "id": "555132a35949062f9cf16f96",
                "name": "Alexandria Yates",
                "phone": "(853) 579-2246",
                "avatar": "252051204.png",
                "email": "alexandriayates@xumonk.com"
            },
            {
                "id": "555132a37b88baa36c628951",
                "name": "Rose Bridges",
                "phone": "(933) 440-3418",
                "avatar": "208413219.png",
                "email": "rosebridges@xumonk.com"
            },
            {
                "id": "555132a3e8bd2abf64d0dfa5",
                "name": "Shaw Baldwin",
                "phone": "(860) 517-2617",
                "avatar": "219495734.png",
                "email": "shawbaldwin@xumonk.com"
            },
            {
                "id": "555132a3fe9eaf9175e5725f",
                "name": "Herman Taylor",
                "phone": "(833) 492-2843",
                "avatar": "224590430.png",
                "email": "hermantaylor@xumonk.com"
            },
            {
                "id": "555132a39ae3947ded331a92",
                "name": "Leta Flynn",
                "phone": "(984) 518-2192",
                "avatar": "158131016.png",
                "email": "letaflynn@xumonk.com"
            },
            {
                "id": "555132a3d7f6b5f0b6069fa0",
                "name": "Clark Cleveland",
                "phone": "(832) 568-2515",
                "avatar": "160494616.png",
                "email": "clarkcleveland@xumonk.com"
            },
            {
                "id": "555132a30bbf3e5343b223d8",
                "name": "Duncan Rhodes",
                "phone": "(898) 483-3829",
                "avatar": "245279516.png",
                "email": "duncanrhodes@xumonk.com"
            },
            {
                "id": "555132a30909aadc8a2b94f2",
                "name": "Watts Pacheco",
                "phone": "(809) 492-3055",
                "avatar": "157660321.png",
                "email": "wattspacheco@xumonk.com"
            },
            {
                "id": "555132a3e5a481d32aa57807",
                "name": "Avery Hewitt",
                "phone": "(855) 437-2546",
                "avatar": "171580201.png",
                "email": "averyhewitt@xumonk.com"
            },
            {
                "id": "555132a3bae8b91dfa874896",
                "name": "Minerva Ortega",
                "phone": "(839) 528-3912",
                "avatar": "238082202.png",
                "email": "minervaortega@xumonk.com"
            },
            {
                "id": "555132a35a8078bd4302c6d4",
                "name": "Patricia Reyes",
                "phone": "(914) 599-2123",
                "avatar": "233190151.png",
                "email": "patriciareyes@xumonk.com"
            },
            {
                "id": "555132a30e09b8bb9f9bdb14",
                "name": "Kenya Roach",
                "phone": "(858) 417-3140",
                "avatar": "169390738.png",
                "email": "kenyaroach@xumonk.com"
            },
            {
                "id": "555132a3093b844d6ee85a68",
                "name": "Hancock Osborne",
                "phone": "(970) 593-2383",
                "avatar": "248653938.png",
                "email": "hancockosborne@xumonk.com"
            },
            {
                "id": "555132a310ebfb199c4c624d",
                "name": "Beth Bryan",
                "phone": "(879) 515-3290",
                "avatar": "222360910.png",
                "email": "bethbryan@xumonk.com"
            },
            {
                "id": "555132a3bfede39ee96e4ada",
                "name": "Kemp Robinson",
                "phone": "(878) 539-2276",
                "avatar": "203125366.png",
                "email": "kemprobinson@xumonk.com"
            },
            {
                "id": "555132a3234de909985b3ab1",
                "name": "Kristine Foley",
                "phone": "(812) 579-3479",
                "avatar": "172941764.png",
                "email": "kristinefoley@xumonk.com"
            },
            {
                "id": "555132a34e74c14a458aa30e",
                "name": "Hess Flores",
                "phone": "(966) 580-3033",
                "avatar": "231288824.png",
                "email": "hessflores@xumonk.com"
            },
            {
                "id": "555132a36d9cd1329c80fadd",
                "name": "Rosanne Rosales",
                "phone": "(858) 588-3496",
                "avatar": "210826821.png",
                "email": "rosannerosales@xumonk.com"
            },
            {
                "id": "555132a32e3a0dca6851e6b8",
                "name": "Cecile Lucas",
                "phone": "(950) 581-3637",
                "avatar": "193295627.png",
                "email": "cecilelucas@xumonk.com"
            },
            {
                "id": "555132a314019255987a9135",
                "name": "Holloway Jordan",
                "phone": "(897) 495-2313",
                "avatar": "171231168.png",
                "email": "hollowayjordan@xumonk.com"
            },
            {
                "id": "555132a3bc5dc79abafbc5fb",
                "name": "Hester Odom",
                "phone": "(845) 416-3140",
                "avatar": "191906416.png",
                "email": "hesterodom@xumonk.com"
            },
            {
                "id": "555132a3a120b72d7a5ef9e5",
                "name": "Tessa Forbes",
                "phone": "(952) 591-2829",
                "avatar": "247828435.png",
                "email": "tessaforbes@xumonk.com"
            },
            {
                "id": "555132a35932eb800e428dc3",
                "name": "Jewel Myers",
                "phone": "(838) 438-3742",
                "avatar": "161177415.png",
                "email": "jewelmyers@xumonk.com"
            },
            {
                "id": "555132a32031ce744c9e3cde",
                "name": "Camacho Howell",
                "phone": "(985) 404-3222",
                "avatar": "203976124.png",
                "email": "camachohowell@xumonk.com"
            },
            {
                "id": "555132a3d8dda7ce63ce8d3b",
                "name": "Collier French",
                "phone": "(907) 512-3528",
                "avatar": "237266347.png",
                "email": "collierfrench@xumonk.com"
            },
            {
                "id": "555132a314afd660630372cd",
                "name": "Marjorie Barton",
                "phone": "(869) 490-2620",
                "avatar": "189715614.png",
                "email": "marjoriebarton@xumonk.com"
            }
        ];

        var myDetails =  {
            "id": contacts[Math.floor(Math.random() * (86 - 1)) + 1].id,
            "name": contacts[Math.floor(Math.random() * (86 - 1)) + 1].name,
            "phone": contacts[Math.floor(Math.random() * (86 - 1)) + 1].phone,
            "avatar": contacts[Math.floor(Math.random() * (86 - 1)) + 1].avatar,
            "email": contacts[Math.floor(Math.random() * (86 - 1)) + 1]['email']
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


