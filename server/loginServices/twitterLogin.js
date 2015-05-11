Meteor.startup(function () {
    ServiceConfiguration.configurations.upsert(
        { service: "twitter" },
        {
            $set: {
                consumerKey: "uAs3ix8JPC0PLDKGoMQ5O5SOd",
                loginStyle: "redirect",
                secret: "uAs3ix8JPC0PLDKGoMQ5O5SOd"
            }
        }
    );
});