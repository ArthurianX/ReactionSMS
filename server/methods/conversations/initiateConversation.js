Meteor.methods({
    initiateConversation: function (user1, user2, firstMessage) {
        //this.unblock();

        if (! Meteor.userId()) {
            console.log('not auth');
            throw new Meteor.Error("not-authorized");
        }

        return Conversations.insert({
            users: [user1, user2],
            conversation: firstMessage
        }, function(err, id){
            return id;
        });




    }
});