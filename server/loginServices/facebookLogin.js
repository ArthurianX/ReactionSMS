Meteor.startup(function () {
    ServiceConfiguration.configurations.upsert(
        { service: "facebook" },
        {
            $set: {
                appId: "829480787134183",
                loginStyle: "popup",
                secret: "b4495dfa61d7aa16c04743629a17e7aa"
            }
        }
    );
});