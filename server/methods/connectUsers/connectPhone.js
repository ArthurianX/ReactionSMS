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

        var counter = 0;
        var phones = _.pluck(contacts, 'phone');

        var doContacts = function(){
            if (counter == phones.length)
            Meteor.users.update(
                {'profile.phone':{$in: phones}},
                {$addToSet: {'profile.friends': Meteor.userId()}},
                {multi: true}  // all matching records receive update
            );
        };

        Meteor.users.find({'profile.phone':{$in: phones}}).forEach( function (friend) {
            counter++;
            var ii = phones.indexOf( friend.profile.phone );
            contacts[ii].appActive = true;
            contacts[ii].appId = friend._id;

            //Run do contacts at every iteration until all the contacts are modified.
            doContacts();
        });



        return contacts;
    }
});