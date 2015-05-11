Meteor.methods({
    // call from client
    autoUser: function(user) {
        console.log('ADDING USER');
        console.log(user);
        return Accounts.createUser({
            username: user.name,
            email: user.email,
            password: user.password,
            profile: {
                phone: user.phone || false,
                avatar: user.avatar,
                contacts: [],
                friends: [],
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