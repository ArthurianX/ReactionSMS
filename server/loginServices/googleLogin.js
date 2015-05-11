Meteor.startup(function () {
    ServiceConfiguration.configurations.upsert(
        { service: "google" },
        {
            $set: {
                clientId: "465785482799-dv7u9g7u9plosht7fevkk4po8ur4h8pf.apps.googleusercontent.com",
                loginStyle: "redirect",
                secret: "PjZSg-zS1-jkJIs5TinLaJF5"
            }
        }
    );
});