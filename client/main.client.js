Session.setDefault('counter', 0);

Template.hello.helpers({
    counter: function () {
        return Session.get('counter');
    }
});

Template.hello.events({
    'click button': function () {
        // increment the counter when button is clicked
        Session.set('counter', Session.get('counter') + 1);
    }
});

angular.module('rsms',[
    'angular-meteor',
    'famous.angular'
])
    .config(function(){})
    .run(function(){})
    .controller('AppCtrl', ['$scope', function AppCtrl($scope) {

    }]);
