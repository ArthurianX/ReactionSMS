Meteor.publish("accountReactive", function () {
    return Meteor.users.find({_id: this.userId}, {fields: {
        contacts: 1
    }});
});