Meteor.methods({
    connectPhone: function(){

        var contacts = Meteor.user().contacts;
        var friends = [];
        for (var i = 0;i < contacts.length; i++) {
            console.log('Searching for ', contacts[i].phone);
            Meteor.users.find({"profile.phone": contacts[i].phone}).forEach(function(friend){
                console.log('Found something?');
                console.log(friend);
                if (friend._id) {
                    friends.push(friend);
                    contacts[i].appActive = true;
                    contacts[i].appId = friend._id;
                    Meteor.users.update({_id: friend._id}, { $set: { "profile.friends": Meteor.userId() }});
                }
            });
            console.log(friends);
        }

        return friends;

    }
});