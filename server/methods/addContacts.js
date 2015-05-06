Meteor.methods({
    addContacts: function (contacts, userId) {

        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        if (Meteor.user().contacts.length > 1) {

            for (var i = 0; i < contacts.length; i++) {
                Meteor.users.update({_id:Meteor.userId()}, { $addToSet:{"contacts":contacts[i]}});
            }

        } else {
            Meteor.users.update({_id:Meteor.userId()}, { $set:{"contacts": contacts}});
        }

    }
});