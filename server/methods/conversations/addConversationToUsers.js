Meteor.methods({
    addConversationToUsers: function (convoId, userId) {
        this.unblock();

        if (! Meteor.userId()) {
            console.log('not auth');
            throw new Meteor.Error("not-authorized");
        }

        Meteor.users.update({_id:Meteor.userId()}, { $push:{"profile.conversations": {id: convoId, user: userId}}});
        Meteor.users.update({_id:userId}, { $push:{"profile.conversations": {id: convoId, user: Meteor.userId()}}});
    }
});