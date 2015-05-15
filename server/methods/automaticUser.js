Meteor.methods({
    // call from client
    autoUser: function(user) {
        console.log('ADDING USER');
        console.log(user);
        this.unblock();
        return Accounts.createUser({
            username: user.name.toLowerCase().replace(' ', '_') + new Date().getTime(),
            email: user.email,
            password: user.password,
            profile: {
                fullname: user.name,
                phone: user.phone || false,
                avatar: user.avatar,
                contacts: [],
                friends: [],
                conversations: [],
                randomContact: [],
                slots: 100,
                favoriteReactions: [],
                officialSignup: user.officialSignup,
                statistics: {
                    conversations: '',
                    messages: '',
                    randomMessages: '',
                    reactionsStats: []
                },
                game: {
                    dailyRandomMessageEnabled: 0,
                    dailyRandomMessageUsed: 0,
                    badges: []
                }
            }
        });
    }
});