Meteor.publish("conversation", function (id) {
    return Conversations.find({_id: id});
});