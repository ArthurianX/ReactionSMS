Meteor.methods({
    addContacts: function (contacts, userId) {
        console.log('ADDING CONTACTS');
        this.unblock();
        console.log(contacts);
        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Meteor.users.update({_id:Meteor.userId()}, { $set:{"contacts": contacts}});

        /*if (Meteor.user() && ( Meteor.user().contacts !== undefined ) ) {

            for (var i = 0; i < contacts.length; i++) {
                Meteor.users.update({_id:Meteor.userId()}, { $addToSet:{"contacts":contacts[i]}});
            }

        } else {
            Meteor.users.update({_id:Meteor.userId()}, { $set:{"contacts": contacts}});
        }

        console.log(Meteor.user());*/

    }
});