angular.module('rsms')
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function myAppConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        //Some router
        $stateProvider
            .state('account', {
                url: '/account',
                views: {
                    'main': {
                        controller: 'AccountCtrl',
                        templateUrl: 'client/views/account/account.ng.html'
                    }
                },
                data: {
                    pageTitle: 'Account'
                }
            })
            .state('coach', {
                url: '/coach',
                views: {
                    'main': {
                        controller: 'CoachCtrl',
                        templateUrl: 'client/views/coach/coach.ng.html'
                    }
                },
                data: {
                    pageTitle: 'Coach'
                }
            })
            .state('home', {
                url: '/home',
                views: {
                    'main': {
                        controller: 'HomeCtrl',
                        templateUrl: 'client/views/home/home.ng.html'
                    }
                },
                data: {
                    pageTitle: 'Home'
                }
            })
            .state('intro', {
                url: '/intro',
                views: {
                    'main': {
                        controller: 'IntroCtrl',
                        templateUrl: 'client/views/intro/intro.ng.html'
                    }
                },
                data: {
                    pageTitle: 'Intro'
                }
            })
            .state('message', {
                url: '/message/compose',
                views: {
                    'main': {
                        controller: 'MessageCtrl',
                        templateUrl: 'client/views/message/message.ng.html'
                    }
                },
                data: {
                    pageTitle: 'Message'
                }
            })
            .state('messageto', {
                url: '/message/:friend',
                views: {
                    'main': {
                        controller: 'MessageCtrl',
                        templateUrl: 'client/views/message/message.ng.html'
                    }
                },
                data: {
                    pageTitle: 'Message'
                }
            })
            .state('reactions', {
                url: '/reactions',
                views: {
                    'main': {
                        controller: 'ReactionsCtrl',
                        templateUrl: 'client/views/reactions/reactions.ng.html'
                    }
                },
                data: {
                    pageTitle: 'Reactions'
                }
            });


/*
        //Some router
        $stateProvider
            .state('account', {
                url: '/account',
                views: {
                    'main': {
                        controller: 'AccountCtrl',
                        templateUrl: 'client/views/account/account.ng.html'
                    }
                },
                data: {
                    pageTitle: 'Account'
                }
            })
            .state('coach', {
                url: '/coach',
                views: {
                    'main': {
                        controller: 'CoachCtrl',
                        templateUrl: 'client/views/coach/coach.ng.html'
                    }
                },
                data: {
                    pageTitle: 'Coach'
                }
            })
            .state('home', {
                url: '/home',
                views: {
                    'main': {
                        controller: 'HomeCtrl',
                        templateUrl: 'client/views/home/home.ng.html'
                    }
                },
                data: {
                    pageTitle: 'Home'
                }
            })
            .state('intro', {
                url: '/intro',
                views: {
                    'main': {
                        controller: 'IntroCtrl',
                        templateUrl: 'client/views/intro/intro.ng.html'
                    }
                },
                data: {
                    pageTitle: 'Intro'
                }
            })
            .state('message', {
                url: '/message/:friend',
                views: {
                    'main': {
                        controller: 'MessageCtrl',
                        templateUrl: 'client/views/message/message.ng.html'
                    }
                },
                data: {
                    pageTitle: 'Message'
                }
            })
            .state('reactions', {
                url: '/reactions',
                views: {
                    'main': {
                        controller: 'ReactionsCtrl',
                        templateUrl: 'client/views/reactions/reactions.ng.html'
                    }
                },
                data: {
                    pageTitle: 'Reactions'
                }
            });*/

        $urlRouterProvider.otherwise('/home');

    }]);
