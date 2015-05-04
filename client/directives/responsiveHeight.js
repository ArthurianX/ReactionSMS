angular.module('rsms')
        .directive('responsiveHeight', function () {
        return {
            restrict: 'AC',
            link: function (scope, element, attrs) {
                var parent = element.parent();
                element.height(parent.height());
                //element.height($(window).height() - $('.main-navbar').outerHeight());
            }
        };
    });


