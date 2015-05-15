Meteor.methods({
    connectPhone: function(){
        var contacts = Meteor.user().contacts;
        /*var friends = [];
        for (var i = 0;i < contacts.length; i++) {
            Meteor.users.find({"profile.phone": contacts[i].phone}).forEach(function(friend){
                if (friend._id) {
                    friends.push(friend);
                    contacts[i].appActive = true;
                    contacts[i].appId = friend._id;
                    Meteor.users.update({_id: friend._id}, { $addToSet: { "profile.friends": Meteor.userId() }});
                }
            });
            console.log(friends);
        }*/

        /*var counter = 0;*/

        var phones = _.pluck(contacts, 'phone');

        //console.log('All the phones are ', phones);

        /*var doContacts = function(){
            if (counter == phones.length)
            Meteor.users.update(
                {'profile.phone':{$in: phones}},
                {$addToSet: {'profile.friends': Meteor.userId()}},
                //{$set: {'contacts': contacts}},
                {multi: true},  // all matching records receive update
                function(err,data){
                    console.log('Err for update ', err);
                    console.log('Success for update ', data);
                }
            );

            *//*Meteor.user.update({$set: {'contacts': contacts}});*//*
        };*/

        Meteor.users.find({'profile.phone':{$in: phones}}).forEach( function (friend) {

            console.log(friend);

            if (friend._id !== Meteor.userId()) {

                Meteor.users.update(
                    {_id: Meteor.userId()},
                    {$addToSet: {'profile.friends': {id: friend._id, username: friend.username, fullname: friend.profile.fullname, avatar: friend.profile.avatar}}}
                );

                Meteor.users.update(
                    {_id: friend._id},
                    {$addToSet: {'profile.friends': {id: Meteor.user()._id, username: Meteor.user().username, fullname: Meteor.user().profile.fullname, avatar: Meteor.user().profile.avatar}}},
                    //{$set: {'contacts': contacts}},
                    {multi: true}
                );
            }

            /*//OBSOLETE! Does not work properly.
            counter++;
            var ii = phones.indexOf( friend.profile.phone );
            console.log('Counter for ', contacts[ii].name);
            contacts[ii].appActive = true;
            contacts[ii].appId = friend._id;
            console.log('Counter results ', contacts[ii]);

            //Run do contacts at every iteration until all the contacts are modified.
            doContacts();*/
        });



        return contacts;
    }
});