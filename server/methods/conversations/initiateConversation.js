Meteor.methods({
    initiateConversation: function (user1, user2) {
        //this.unblock();

        if (! Meteor.userId()) {
            console.log('not auth');
            throw new Meteor.Error("not-authorized");
        }

        return Conversations.insert({
            users: [user1, user2],
            conversation: []
        }, function(err, id){
            return id;
        });




    }
});