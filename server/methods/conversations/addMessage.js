Meteor.methods({
    addMessage: function (id, message) {
        this.unblock();

        if (! Meteor.userId()) {
            console.log('not auth');
            throw new Meteor.Error("not-authorized");
        }

        message.timestamp = new Date().getTime();
        message.poster = Meteor.userId();
        console.log('Conversation id is', id);
        console.log('Conversation message is', message);
        Conversations.update(id, {$push: {conversation: message}}, {multi: true});
    }
});