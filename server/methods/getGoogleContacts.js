Meteor.methods({
    // call from client
    getGoogleContacts: function(user) {

        console.log('Google email exists? ', Meteor.user().services.google);
        if (Meteor.user().services.google) {

            var opts= { email: Meteor.user().services.google.email,
                consumerKey: "465785482799-dv7u9g7u9plosht7fevkk4po8ur4h8pf.apps.googleusercontent.com",
                consumerSecret: "PjZSg-zS1-jkJIs5TinLaJF5",
                token: Meteor.user().services.google.accessToken,
                refreshToken: Meteor.user().services.google.refreshToken};

            var gcontacts = new GoogleContacts(opts);

            gcontacts.refreshAccessToken(opts.refreshToken, function (err, accessToken)
            {
                if(err)
                {
                    console.log ('gcontact.refreshToken, ', err);
                    return false;
                }
                else
                {
                    console.log ('gcontact.access token success!');
                    gcontacts.token = accessToken;
                    gcontacts.getContacts(function(err, contact)
                    {

                        //Save all Google Contacts ????
                        //here i am able to access all contacts

                        console.log(contact);
                        return contact;
                    })

                }
            });

        }

    }
});