angular.module('rsms')
    .config(function(){})
    .run(function(){})
    .service('deviceComms', ['$q', function deviceComms($q) {

        var contacts = [{"id":"261ac5a3-e4c2-4e95-bde9-906855f8294d","name":"Katherine Hernandez","phone":"7-(207)257-0635","email":"khernandez0@jugem.jp","avatar":"orci.jpeg"},
            {"id":"fbba74ca-67be-4efc-8f43-2f1e40117b27","name":"John Banks","phone":"6-(785)796-9467","email":"jbanks1@java.com","avatar":"integer ac.tiff"},
            {"id":"d4a07b18-70cd-4fb3-9e4b-1f1dc341b2fc","name":"Mildred Roberts","phone":"4-(935)265-4332","email":"mroberts2@newyorker.com","avatar":"at nulla.jpeg"},
            {"id":"0748c57e-59e8-4f33-987b-e356f47a6d89","name":"Michelle Jordan","phone":"8-(214)259-5458","email":"mjordan3@telegraph.co.uk","avatar":"sit amet eleifend.png"},
            {"id":"8d05fcd4-981b-4687-865a-730381f0138f","name":"Robin Woods","phone":"3-(953)914-6887","email":"rwoods4@g.co","avatar":"adipiscing molestie.jpeg"},
            {"id":"f5d2f01f-9633-47c0-9c7b-a102964ea1b5","name":"Gerald Moreno","phone":"7-(290)880-8809","email":"gmoreno5@instagram.com","avatar":"aenean fermentum.tiff"},
            {"id":"9576adcb-000c-4a74-9c76-9f7aad89c0fe","name":"Gary Schmidt","phone":"3-(148)448-5623","email":"gschmidt6@imdb.com","avatar":"ultrices.tiff"},
            {"id":"acc3f159-efe1-49d9-8336-33e0f184a6bb","name":"Gary Mills","phone":"7-(959)843-0185","email":"gmills7@myspace.com","avatar":"tincidunt lacus.jpeg"},
            {"id":"b7092018-1887-4582-a1ad-90057e9d4f29","name":"Victor Hunt","phone":"8-(746)511-7483","email":"vhunt8@angelfire.com","avatar":"tincidunt.jpeg"},
            {"id":"980ddc23-5ef3-46e6-ba6a-9447c39bbf08","name":"Carol Stephens","phone":"0-(751)815-0580","email":"cstephens9@wikimedia.org","avatar":"ante ipsum primis.png"},
            {"id":"9dc8d73d-be2c-471c-b73d-097703ad965f","name":"Lawrence Woods","phone":"0-(101)495-1643","email":"lwoodsa@jalbum.net","avatar":"ante ipsum.gif"},
            {"id":"7129c929-591d-4e64-b31b-2d77331de6a9","name":"Joe Coleman","phone":"7-(046)648-3805","email":"jcolemanb@statcounter.com","avatar":"vel augue vestibulum.png"},
            {"id":"d0d9c23c-d19a-4725-b22b-8b637161595d","name":"Helen Howell","phone":"4-(536)712-9751","email":"hhowellc@flavors.me","avatar":"neque.tiff"},
            {"id":"101eb80b-c1c0-4db6-9299-50875caeb555","name":"Eric Clark","phone":"2-(950)414-6223","email":"eclarkd@about.com","avatar":"sapien urna pretium.tiff"},
            {"id":"842e71e3-0689-45a1-8e05-777314be45ee","name":"James Fowler","phone":"7-(793)283-9324","email":"jfowlere@blog.com","avatar":"rutrum.tiff"},
            {"id":"2443a82f-4f4c-4f0a-8a34-ff4d50ff0ce5","name":"Shawn Franklin","phone":"3-(680)581-5671","email":"sfranklinf@tinyurl.com","avatar":"nunc proin.png"},
            {"id":"9cfd427d-65a8-41eb-825e-9a2640d0c2d9","name":"Joshua Tucker","phone":"2-(594)364-3437","email":"jtuckerg@bloglovin.com","avatar":"amet nulla.tiff"},
            {"id":"425334df-616c-4a59-8fc7-f13914c5309d","name":"Martin Carter","phone":"7-(649)498-6385","email":"mcarterh@ucoz.ru","avatar":"orci.jpeg"},
            {"id":"7214a6e7-5b1c-46bd-9bd8-a1c17d680958","name":"Larry Simpson","phone":"5-(014)312-8389","email":"lsimpsoni@devhub.com","avatar":"in faucibus.png"},
            {"id":"526ba29c-2dee-4c69-a242-936da701e542","name":"Gerald Garrett","phone":"6-(271)984-1920","email":"ggarrettj@creativecommons.org","avatar":"sit.jpeg"},
            {"id":"176e358a-a505-476a-a732-4c6f6bf43136","name":"Shirley Diaz","phone":"5-(778)382-9140","email":"sdiazk@alexa.com","avatar":"quis orci eget.jpeg"},
            {"id":"82343841-10e7-4671-933a-92cf9e066957","name":"Mark Lewis","phone":"4-(188)492-6845","email":"mlewisl@theglobeandmail.com","avatar":"ac.tiff"},
            {"id":"ee7d5989-f7ea-4577-b95d-065c3d1d3153","name":"Roy Carroll","phone":"3-(580)747-7711","email":"rcarrollm@blogtalkradio.com","avatar":"elementum ligula vehicula.tiff"},
            {"id":"7b67d75f-c449-4b71-9a61-858ddd5961c4","name":"Ruby Smith","phone":"6-(808)435-5674","email":"rsmithn@nydailynews.com","avatar":"sem sed.tiff"},
            {"id":"0e3a4cc4-69ea-4e35-baba-19d0c4da07dd","name":"Victor King","phone":"1-(894)899-5698","email":"vkingo@goodreads.com","avatar":"nulla.jpeg"},
            {"id":"520c6286-76e1-4717-8553-a5cdb6f8831f","name":"Jonathan Bowman","phone":"2-(591)043-0517","email":"jbowmanp@infoseek.co.jp","avatar":"magna ac.gif"},
            {"id":"c8257b09-3f6c-4f9e-bafe-b05f47e5ef70","name":"Timothy Duncan","phone":"8-(014)635-9429","email":"tduncanq@census.gov","avatar":"molestie sed justo.jpeg"},
            {"id":"5f399533-0d14-4a54-b4aa-bfaa2e313762","name":"Patrick Sanders","phone":"9-(906)221-3969","email":"psandersr@ox.ac.uk","avatar":"tellus.gif"},
            {"id":"8ecdd108-6537-4353-b1a8-39b4733a6906","name":"Roger Mccoy","phone":"6-(982)588-6906","email":"rmccoys@miibeian.gov.cn","avatar":"pellentesque quisque.tiff"},
            {"id":"29bd2937-1e83-4118-a3b8-986c58cf4022","name":"Deborah White","phone":"0-(150)383-2346","email":"dwhitet@bloglines.com","avatar":"dolor.png"},
            {"id":"9298a5a4-418a-4ddf-8d1a-df6caf625a7d","name":"Edward Henry","phone":"6-(356)402-6076","email":"ehenryu@scientificamerican.com","avatar":"potenti nullam.tiff"},
            {"id":"d86d8fd5-72df-4182-9b69-14bc6c863c8b","name":"Melissa Rivera","phone":"0-(220)261-6927","email":"mriverav@php.net","avatar":"erat curabitur.tiff"},
            {"id":"1236a4a1-5b33-4a62-976a-043efac5e4a8","name":"Judith Gilbert","phone":"7-(144)407-8707","email":"jgilbertw@yale.edu","avatar":"nibh quisque id.jpeg"},
            {"id":"b248b23a-41e2-4eaa-801b-8233346d3d5f","name":"Paul Johnston","phone":"2-(438)865-2677","email":"pjohnstonx@uol.com.br","avatar":"sapien placerat.tiff"},
            {"id":"3842f2ce-1882-44a8-a2d1-26f0d2fe13f2","name":"Clarence Reid","phone":"4-(967)025-8676","email":"creidy@thetimes.co.uk","avatar":"diam vitae quam.tiff"},
            {"id":"e767e5e2-ae21-4905-ac88-c0720bc67bd5","name":"Ruth Mcdonald","phone":"0-(779)770-3696","email":"rmcdonaldz@dailymail.co.uk","avatar":"pede malesuada in.jpeg"},
            {"id":"4bb50621-3dac-45ba-82c8-687370d29b96","name":"Joan Fuller","phone":"1-(161)881-9530","email":"jfuller10@list-manage.com","avatar":"augue.jpeg"},
            {"id":"26ae8f93-a333-4a76-aae9-47a984fbc9a9","name":"Juan Ellis","phone":"9-(559)483-6316","email":"jellis11@ibm.com","avatar":"quis.gif"},
            {"id":"165229b6-f6cc-4deb-8c17-f3d2c70754ac","name":"Joan Garcia","phone":"8-(255)951-9591","email":"jgarcia12@tinyurl.com","avatar":"pede lobortis.tiff"},
            {"id":"b7ddc6a3-0f58-4b57-bb06-39af509eeec9","name":"Terry Romero","phone":"0-(885)281-9297","email":"tromero13@independent.co.uk","avatar":"cras.tiff"},
            {"id":"0d94f953-83a4-421e-91dd-ea668be53a7a","name":"Elizabeth Gardner","phone":"8-(509)557-8596","email":"egardner14@businesswire.com","avatar":"cubilia curae.jpeg"},
            {"id":"d4bdbd68-8bde-4ca8-945b-87c79210a00a","name":"Fred Schmidt","phone":"1-(898)059-4949","email":"fschmidt15@lycos.com","avatar":"cras in purus.tiff"},
            {"id":"2ca71524-17e2-42e3-b5c3-6702cfdf99be","name":"James Wilson","phone":"2-(311)009-8125","email":"jwilson16@independent.co.uk","avatar":"ut massa volutpat.tiff"},
            {"id":"a0cc04a6-efa2-4770-9327-cd2a69b07ed3","name":"Wanda Taylor","phone":"8-(114)995-0394","email":"wtaylor17@cam.ac.uk","avatar":"morbi odio.gif"},
            {"id":"f9af1119-9aa4-4229-8a0c-004a4143bce7","name":"Juan James","phone":"7-(516)907-6370","email":"jjames18@shutterfly.com","avatar":"ac neque.gif"},
            {"id":"5111841f-1082-4a40-9c20-012fe80091c3","name":"Phyllis Ramirez","phone":"2-(105)965-8783","email":"pramirez19@mtv.com","avatar":"pellentesque.jpeg"},
            {"id":"8995d7a4-e0d9-4beb-9579-7eb9e149750b","name":"Anna West","phone":"4-(586)276-4386","email":"awest1a@blogs.com","avatar":"faucibus orci.gif"},
            {"id":"97dd8ce1-f181-4a7b-aa6e-74753e97ced3","name":"Nicholas Snyder","phone":"3-(024)295-7232","email":"nsnyder1b@berkeley.edu","avatar":"praesent id massa.jpeg"},
            {"id":"c3c46df1-3d3d-4d2a-a43e-c133fe0188cd","name":"Susan Vasquez","phone":"0-(950)727-6888","email":"svasquez1c@cam.ac.uk","avatar":"non interdum.jpeg"},
            {"id":"0dd86eab-f05f-4b0f-992e-5e74ae41eb72","name":"Anna Warren","phone":"0-(610)729-5514","email":"awarren1d@nationalgeographic.com","avatar":"eu tincidunt in.gif"},
            {"id":"90ebdcd9-e579-4fea-b1a9-bf3eace53795","name":"Juan Hawkins","phone":"1-(721)274-6604","email":"jhawkins1e@google.pl","avatar":"mi integer ac.tiff"},
            {"id":"35006fb5-b8c9-4a43-9d1c-9997eac29166","name":"Debra Bell","phone":"5-(297)754-8355","email":"dbell1f@hao123.com","avatar":"ut dolor.png"},
            {"id":"4e0be2d1-fd24-43bf-82cb-ed4da7511c03","name":"Thomas Henry","phone":"4-(547)337-7026","email":"thenry1g@bbc.co.uk","avatar":"mi pede malesuada.jpeg"},
            {"id":"a8c23f2d-afc3-4148-a485-1e971a8e5942","name":"Jesse Gardner","phone":"5-(210)258-4286","email":"jgardner1h@usgs.gov","avatar":"pellentesque.tiff"},
            {"id":"da9d0db2-029d-401a-adfe-a3a5e20dfefe","name":"Marie Stephens","phone":"0-(801)898-1752","email":"mstephens1i@kickstarter.com","avatar":"commodo placerat.gif"},
            {"id":"ada2c228-311c-44fa-9601-51dce0487c9d","name":"Randy Freeman","phone":"3-(481)567-7891","email":"rfreeman1j@cnn.com","avatar":"fermentum donec.jpeg"},
            {"id":"13c290a9-1b9b-42ab-92f1-bbacdfe54d4d","name":"Walter Bishop","phone":"5-(275)565-0032","email":"wbishop1k@washington.edu","avatar":"diam erat.gif"},
            {"id":"73c9c83a-1a22-453b-821c-369cf5a3dc4a","name":"Jeffrey Wright","phone":"2-(893)287-1688","email":"jwright1l@nyu.edu","avatar":"aliquet.png"},
            {"id":"73b2a83f-0bc7-481c-a47b-f143bd9d589c","name":"Anthony Lewis","phone":"3-(511)586-8794","email":"alewis1m@technorati.com","avatar":"lacus morbi.tiff"},
            {"id":"5b709b51-a80b-4c78-9fbf-7b18cb8d43aa","name":"Doris Barnes","phone":"4-(557)963-9672","email":"dbarnes1n@lulu.com","avatar":"blandit non interdum.jpeg"},
            {"id":"1ca5218b-8149-4cd5-abb3-4517cc9e849d","name":"Catherine Price","phone":"1-(312)374-9439","email":"cprice1o@fema.gov","avatar":"nam congue risus.gif"},
            {"id":"f026224f-2c86-44a5-9fcc-4aadabe24cc2","name":"Daniel Hawkins","phone":"8-(745)141-1982","email":"dhawkins1p@wix.com","avatar":"ante ipsum primis.tiff"},
            {"id":"064613e7-723c-4b30-abfe-9150511d7ddd","name":"Pamela Medina","phone":"8-(957)666-9441","email":"pmedina1q@bbc.co.uk","avatar":"erat eros.png"},
            {"id":"0738194e-c751-4da2-8303-144f5fbb382d","name":"Ruby Harris","phone":"1-(105)211-7473","email":"rharris1r@geocities.com","avatar":"turpis enim blandit.tiff"},
            {"id":"16e55f26-1de0-4d50-999b-e090b2067515","name":"Christine Tucker","phone":"1-(450)606-4680","email":"ctucker1s@engadget.com","avatar":"turpis.gif"},
            {"id":"49b35f77-265d-42ef-9925-38fe881735b7","name":"Nicole Hall","phone":"6-(825)757-5755","email":"nhall1t@blog.com","avatar":"neque.jpeg"},
            {"id":"ca9796e9-b1ff-40b0-aabc-2c8d6873665f","name":"Frank Porter","phone":"9-(247)522-6222","email":"fporter1u@artisteer.com","avatar":"phasellus id.jpeg"},
            {"id":"29c59590-67e3-4c53-8412-88fbcdcc2757","name":"Mary Roberts","phone":"3-(819)082-1791","email":"mroberts1v@ow.ly","avatar":"est congue elementum.tiff"},
            {"id":"51f6bbaa-ec7a-42dd-b348-62b0df08dab5","name":"Julie Murray","phone":"0-(217)968-1931","email":"jmurray1w@csmonitor.com","avatar":"posuere felis.jpeg"},
            {"id":"6d33db92-9442-4a7d-a887-fd94d7e4af2e","name":"Ralph Medina","phone":"9-(727)131-3792","email":"rmedina1x@pen.io","avatar":"sem duis aliquam.tiff"},
            {"id":"517fe53b-9d8c-414e-9df3-4867d05ae485","name":"Dennis Pierce","phone":"9-(755)810-5837","email":"dpierce1y@vistaprint.com","avatar":"aliquet at feugiat.tiff"},
            {"id":"a373d6e1-ab1e-484c-8d43-954b96c3f5fb","name":"Louis Kelley","phone":"5-(866)811-1163","email":"lkelley1z@sourceforge.net","avatar":"pede ullamcorper augue.tiff"},
            {"id":"82ceb0c2-780b-454c-8bb5-af3baa9c5345","name":"Gloria Little","phone":"0-(902)150-8671","email":"glittle20@nationalgeographic.com","avatar":"at.jpeg"},
            {"id":"7c7aff8d-0881-4338-a69f-904776c26217","name":"Cheryl Watson","phone":"7-(329)622-4167","email":"cwatson21@shutterfly.com","avatar":"turpis adipiscing.jpeg"},
            {"id":"16f1fd72-fcb7-4d9c-ad9c-88fe4fd0ac15","name":"Joseph Hunter","phone":"1-(825)142-7549","email":"jhunter22@yandex.ru","avatar":"ligula in lacus.jpeg"},
            {"id":"0e50cac0-6534-4fb2-a308-f6244169ad41","name":"Ann Moore","phone":"7-(878)910-7218","email":"amoore23@fastcompany.com","avatar":"fusce.tiff"},
            {"id":"7ecbbe24-edb2-4b0e-878c-6b636b0d51cf","name":"Elizabeth Thomas","phone":"9-(098)038-5375","email":"ethomas24@vimeo.com","avatar":"est.tiff"},
            {"id":"05656240-54dc-4bb7-b98c-070ce2a1d1d1","name":"Joan Harvey","phone":"8-(542)507-6559","email":"jharvey25@hp.com","avatar":"nulla.jpeg"},
            {"id":"964966b6-1fbf-4f10-8170-26d0ec5135be","name":"Daniel Reid","phone":"2-(918)025-2716","email":"dreid26@mysql.com","avatar":"tellus nulla ut.png"},
            {"id":"ec5dd116-35d9-4d88-a73a-d6572fe3dbf8","name":"Gary Weaver","phone":"2-(723)391-1491","email":"gweaver27@linkedin.com","avatar":"montes.tiff"},
            {"id":"2b4a319a-44bc-4862-84a0-08388198ae1b","name":"Daniel Freeman","phone":"5-(593)933-8184","email":"dfreeman28@marriott.com","avatar":"dapibus.jpeg"},
            {"id":"757078ac-d4a6-48c2-bf8c-88ab82f22e17","name":"Marie Mcdonald","phone":"7-(673)629-9623","email":"mmcdonald29@noaa.gov","avatar":"risus semper.tiff"},
            {"id":"2c3d50a1-7098-46cd-af3f-d088fbaa1fe3","name":"Lillian Barnes","phone":"3-(765)952-4603","email":"lbarnes2a@usnews.com","avatar":"ante vel.png"},
            {"id":"96182aca-4afd-4b3f-86cf-e62a44e525a5","name":"Richard Thompson","phone":"6-(023)035-3842","email":"rthompson2b@multiply.com","avatar":"interdum.tiff"},
            {"id":"48bad159-25a7-45f9-9cd6-78a05ba85f6d","name":"Ruth Wallace","phone":"5-(778)612-9239","email":"rwallace2c@prlog.org","avatar":"nisi.png"},
            {"id":"fdf4af4f-fb7e-4bc0-8041-c5a50c9c6870","name":"Chris Armstrong","phone":"1-(901)595-8452","email":"carmstrong2d@wired.com","avatar":"eu.tiff"},
            {"id":"a2396d26-6843-4e77-8a51-afe361f5d10c","name":"Cynthia Little","phone":"1-(721)695-8463","email":"clittle2e@jimdo.com","avatar":"blandit.png"},
            {"id":"d269177c-243e-456f-9346-51aa3731bc1d","name":"Janice Edwards","phone":"0-(751)373-8963","email":"jedwards2f@hp.com","avatar":"aliquam.jpeg"},
            {"id":"04be5f73-0df2-482d-b473-77460931978d","name":"Gregory Phillips","phone":"4-(111)808-8553","email":"gphillips2g@rediff.com","avatar":"quis.tiff"},
            {"id":"6690f34a-c93d-459c-a6f9-20363150e223","name":"Carol Weaver","phone":"2-(463)339-2019","email":"cweaver2h@dailymotion.com","avatar":"aliquam convallis nunc.jpeg"},
            {"id":"fcd58f40-273c-43ee-b24a-fab98d4e1dd4","name":"Rebecca Dixon","phone":"2-(856)740-9931","email":"rdixon2i@rediff.com","avatar":"nulla.tiff"},
            {"id":"6b1bce98-3cce-4e69-9b2d-ca2d1feffb48","name":"Elizabeth Wheeler","phone":"8-(358)826-5282","email":"ewheeler2j@mysql.com","avatar":"interdum venenatis.tiff"},
            {"id":"9af45a69-9f85-4cd8-8c8e-a8ebe931d9c1","name":"Kenneth Thomas","phone":"6-(174)083-3925","email":"kthomas2k@wp.com","avatar":"mauris lacinia.tiff"},
            {"id":"d86015e3-09c0-4da1-ab9d-595a1cf6359d","name":"Janice Cooper","phone":"8-(578)741-5196","email":"jcooper2l@geocities.com","avatar":"praesent id.jpeg"},
            {"id":"b1798d97-ba19-45ca-ba8f-405776b87f81","name":"Todd Flores","phone":"8-(569)046-9737","email":"tflores2m@sitemeter.com","avatar":"ut dolor.gif"},
            {"id":"7df6865d-9d03-4447-aa7f-50485d0b8aa8","name":"Marilyn George","phone":"1-(905)683-5935","email":"mgeorge2n@blogtalkradio.com","avatar":"amet.jpeg"},
            {"id":"a94df8e8-d7af-49f5-8f16-c5d042254a37","name":"Ruth Garrett","phone":"0-(745)510-8496","email":"rgarrett2o@live.com","avatar":"porta volutpat.jpeg"},
            {"id":"056a71c7-c01a-4599-9520-c01135fd37e1","name":"Henry Young","phone":"1-(504)906-0196","email":"hyoung2p@cbslocal.com","avatar":"lorem integer tincidunt.jpeg"},
            {"id":"b57668b3-d13f-4168-ac79-55eb4f745d43","name":"Lawrence Mitchell","phone":"2-(990)491-2425","email":"lmitchell2q@homestead.com","avatar":"sem sed sagittis.jpeg"},
            {"id":"40333175-9163-4ce6-b36b-035065c7f652","name":"Frank Holmes","phone":"1-(885)651-2798","email":"fholmes2r@icio.us","avatar":"vitae nisl.jpeg"}];

        var myDetails =  {
            "id": contacts[Math.floor(Math.random() * (86 - 1)) + 1].id,
            "name": contacts[Math.floor(Math.random() * (86 - 1)) + 1].name,
            "phone": contacts[Math.floor(Math.random() * (86 - 1)) + 1].phone,
            "avatar": contacts[Math.floor(Math.random() * (86 - 1)) + 1].avatar,
            "email": contacts[Math.floor(Math.random() * (86 - 1)) + 1]['email']
        };

        var getContacts = function(spliceID){

            var deferred = $q.defer();

            contacts.forEach(function(value, index){
                if (spliceID === value.id){
                    contacts.splice(index, 1);
                }
            });

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


