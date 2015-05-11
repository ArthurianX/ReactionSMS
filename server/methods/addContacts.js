Meteor.methods({
    addContacts: function (contacts) {
        //this.unblock();

        if (! Meteor.userId()) {
            console.log('not auth');
            throw new Meteor.Error("not-authorized");
        }
        Meteor.users.update({_id:Meteor.userId()}, { $set:{"contacts": contacts}});
    }
});