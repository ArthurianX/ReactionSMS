Meteor.methods({
    addMessage: function (id, message) {
        this.unblock();

        if (! Meteor.userId()) {
            console.log('not auth');
            throw new Meteor.Error("not-authorized");
        }
        Conversations.update({_id: id}, {conversation: {$push: message}});

    }
});