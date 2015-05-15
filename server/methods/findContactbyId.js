Meteor.methods({
    findContact: function (id) {
        this.unblock();

        if (! Meteor.userId()) {
            console.log('not auth');
            throw new Meteor.Error("not-authorized");
        }
        console.log('User id passed', id);
        var user = Meteor.users.findOne(id);

        console.log(user);

        return {
            id: user._id,
            name: user.username,
            email: user.emails[0].address,
            avatar: user.profile.avatar
        }
    }
});