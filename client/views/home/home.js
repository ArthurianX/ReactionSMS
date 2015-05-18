angular.module('rsms')


    .controller('HomeCtrl', ['$scope', '$state', 'deviceComms', '$meteor', function HomeController($scope, $state, deviceComms, $meteor) {

        $scope.friendedContacs = false;

        $scope.findFriends = function(){
            $meteor.call('connectPhone').then(function(data){
                $scope.friendedContacs = data;
                console.log(data);
            });
        };

        $scope.composeReaction = function(contact) {
            setTimeout(function(){
                $state.go('messageto', {friend: contact})
            }, 200);
        }

    }]);



function escape(text) {
    return text.replace(/\&/g, "&amp;").replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/"/g, "&quot;")
}

function setHtmlIe8SafeWay(element, html) {
    var newElement = angular.element("<pre>" + html + "</pre>");
    return element.empty(), element.append(newElement.contents()), element
}

angular.module("famous-angular", ["famous.angular", "ui.router", "ts.sheets"]).run(["$rootScope", "$media", function($rootScope, $media) {
    $rootScope.isMobile = function() {
        return !$media.$query("sm")
    }, $rootScope.isDesktop = function() {
        return $media.$query("sm")
    }
}])
    .config(["$mediaProvider", "$famousProvider", function($mediaProvider, $famousProvider) {
        var $famous = $famousProvider.$get(),
            FAMOUS_FIELD_HANDLERS = ($famous["famous/utilities/Timer"], [{
                field: "transform",
                handlerFn: function(element, payloadFn) {
                    var isolate = $famous.getIsolate(angular.element(element).scope());
                    isolate.modifier.transformFrom(payloadFn)
                }
            }, {
                field: "size",
                handlerFn: function(element, payloadFn) {
                    var isolate = $famous.getIsolate(angular.element(element).scope());
                    isolate.modifier.sizeFrom(payloadFn)
                }
            }, {
                field: "origin",
                handlerFn: function(element, payloadFn) {
                    var isolate = $famous.getIsolate(angular.element(element).scope());
                    isolate.modifier.originFrom(payloadFn)
                }
            }, {
                field: "align",
                handlerFn: function(element, payloadFn) {
                    var isolate = $famous.getIsolate(angular.element(element).scope());
                    isolate.modifier.alignFrom(payloadFn)
                }
            }, {
                field: "opacity",
                handlerFn: function(element, payloadFn) {
                    var isolate = $famous.getIsolate(angular.element(element).scope());
                    isolate.modifier.opacityFrom(payloadFn)
                }
            }, {
                field: "options",
                handlerFn: function() {
                    throw new Error("unimplemented: cannot yet set options through Sheets")
                }
            }]);
        angular.forEach(FAMOUS_FIELD_HANDLERS, function(fieldHandler) {
            $mediaProvider.$registerFieldHandler(fieldHandler.field, fieldHandler.handlerFn)
        })
    }]),
    angular.module("famous-angular")
        .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
            $stateProvider.state("intro", {
                url: "/intro",
                templateUrl: "build/templates/state-intro.html",
                controller: "StateIntroCtrl",
                data: {
                    index: 0,
                    scrollTimelineMax: 100,
                    enterAnimationDuration: 1e3,
                    leaveAnimationDuration: 300,
                    cssClass: "state-intro",
                    pageTitle: "Intro"
                }
            }).state("1", {
                url: "/1",
                templateUrl: "build/templates/state-1.html",
                controller: "State1Ctrl",
                data: {
                    index: 1,
                    scrollTimelineMax: 200,
                    enterAnimationDuration: 1500,
                    leaveAnimationDuration: 300,
                    cssClass: "state-1",
                    pageTitle: "Render Tree"
                }
            }).state("2", {
                url: "/2",
                templateUrl: "build/templates/state-2.html",
                controller: "State2Ctrl",
                data: {
                    index: 2,
                    scrollTimelineMax: 300,
                    enterAnimationDuration: 1500,
                    leaveAnimationDuration: 300,
                    cssClass: "state-2",
                    pageTitle: "Data Binding"
                }
            }).state("3", {
                url: "/3",
                templateUrl: "build/templates/state-3.html",
                controller: "State3Ctrl",
                data: {
                    index: 3,
                    scrollTimelineMax: 400,
                    enterAnimationDuration: 1e3,
                    leaveAnimationDuration: 300,
                    cssClass: "state-3",
                    pageTitle: "Angular Directives"
                }
            }).state("4", {
                url: "/4",
                templateUrl: "build/templates/state-4.html",
                controller: "State4Ctrl",
                data: {
                    index: 4,
                    scrollTimelineMax: 500,
                    enterAnimationDuration: 1500,
                    leaveAnimationDuration: 300,
                    cssClass: "state-4",
                    pageTitle: "Organization"
                }
            }).state("5", {
                url: "/5",
                templateUrl: "build/templates/state-5.html",
                controller: "State5Ctrl",
                data: {
                    index: 5,
                    scrollTimelineMax: 600,
                    enterAnimationDuration: 2e3,
                    leaveAnimationDuration: 300,
                    cssClass: "state-5",
                    pageTitle: "Unification"
                }
            }).state("download", {
                url: "/download",
                template: "<div></div>",
                controller: "StateEndCtrl",
                data: {
                    index: 6,
                    scrollTimelineMax: 700,
                    enterAnimationDuration: 500,
                    leaveAnimationDuration: 500,
                    cssClass: "",
                    pageTitle: "Download"
                }
            }), $urlRouterProvider.otherwise("intro")
        }]),
    angular.module("famous-angular")
        .run(["$rootScope", function($rootScope) {
            $rootScope.$on("$stateChangeStart", function(e, toState, toParams, fromState) {
                var classes = [toState.data.cssClass, fromState && fromState.data ? fromState.data.cssClass : ""].join(" ");
                $rootScope.stateClasses = classes
            })
        }]),
    angular.module("famous-angular")
        .run(["$rootScope", function($rootScope) {
            $rootScope.$on("$stateChangeSuccess", function(e, toState) {
                $rootScope.pageTitle = toState.data.pageTitle + " - Famo.us/Angular"
            })
        }]),
    angular.module("famous-angular")
        .factory("stateTransitions", ["$rootScope", "$state", function($rootScope, $state) {
            function enterDelay() {
                return prevState && prevState.data ? prevState.data.leaveAnimationDuration + DELAY_BETWEEN_ENTER_LEAVE_ANIMATIONS : 1e3
            }

            function enterDuration() {
                return comingFromLowerIndex() ? $state.current.data.enterAnimationDuration : $state.current.data.leaveAnimationDuration
            }

            function leaveDuration() {
                return prevState.data.leaveAnimationDuration
            }

            function getEnterInitialT() {
                return comingFromLowerIndex() ? 0 : 2
            }

            function getLeaveT() {
                return comingFromLowerIndex() ? 2 : 0
            }

            function comingFromLowerIndex() {
                if (!prevState || !prevState.data) return !0;
                var currentIndex = $state.current.data.index,
                    prevIndex = prevState.data.index;
                return currentIndex > prevIndex
            }
            var prevState, DELAY_BETWEEN_ENTER_LEAVE_ANIMATIONS = 300;
            return $rootScope.$on("$stateChangeSuccess", function(e, toState, toParams, fromState) {
                prevState = fromState
            }), {
                enter: function(t, $done) {
                    var initialT = getEnterInitialT();
                    t.set(initialT, {
                        duration: 0
                    }), t.delay(enterDelay()), t.set(1, {
                        duration: enterDuration()
                    }, $done)
                },
                leave: function(t, $done) {
                    t.halt(), t.delay(DELAY_BETWEEN_ENTER_LEAVE_ANIMATIONS);
                    var leaveT = getLeaveT();
                    t.set(leaveT, {
                        duration: leaveDuration()
                    }, $done)
                },
                enterDelay: enterDelay,
                delayBetweenEnterLeaveAnimations: DELAY_BETWEEN_ENTER_LEAVE_ANIMATIONS
            }
        }]),
    angular.module("famous-angular")
        .factory("stateUtils", ["$rootScope", "$state", "$famous", function($rootScope, $state) {
            function stateCount() {
                return scrollStates().length
            }

            function goToStateWithIndex(desiredIndex) {
                var desiredState = getStateByIndex(desiredIndex);
                desiredState && $state.go(desiredState.name)
            }

            function getStateByIndex(index) {
                for (var stateList = $state.get(), i = 0; i < stateList.length; i++) {
                    var state = stateList[i];
                    if (state.data && state.data.index === index) return state
                }
                return null
            }
            return {
                stateCount: stateCount,
                goToStateWithIndex: goToStateWithIndex,
                getStateByIndex: getStateByIndex
            }
        }]),
    angular.module("famous-angular")
        .run(["$rootScope", "$media", "stateUtils", function($rootScope, $media) {
            function resizeHandler() {
                determineResolution(), setLeftOffset()
            }

            function determineResolution() {
                var size_xs = !$media.$query("sm");
                size_xs ? (NAVBAR.HEIGHT = 0, _forcedResolution = {
                    width: 768,
                    height: 1366 - NAVBAR.HEIGHT
                }) : (NAVBAR.HEIGHT = 100, _forcedResolution = {
                    width: 1920,
                    height: 1080 - NAVBAR.HEIGHT
                })
            }

            function setLeftOffset() {
                var scale = getViewportScale(),
                    leftOffset = window.innerWidth / 2 - scale * _forcedResolution.width / 2;
                $("#fa-app").css({
                    "-webkit-transform": "scale(" + scale + ", " + scale + ")",
                    "-moz-transform": "scale(" + scale + ", " + scale + ")",
                    "-ms-transform": "scale(" + scale + ", " + scale + ")",
                    "-o-transform": "scale(" + scale + ", " + scale + ")",
                    transform: "scale(" + scale + ", " + scale + ")"
                }), $("#fa-app").css({
                    "-webkit-transform-origin": "0 0",
                    "-moz-transform-origin": "0 0",
                    "-ms-transform-origin": "0 0",
                    "-o-transform-origin": "0 0",
                    "transform-origin": "0 0"
                }), window.innerWidth > _forcedResolution.width || $("#fa-app").css("left", Math.floor(leftOffset))
            }

            function getViewportScale() {
                var xScale, yScale, viewport = {
                    height: window.innerHeight - NAVBAR.HEIGHT,
                    width: window.innerWidth
                };
                viewport.height < _forcedResolution.height ? (yScale = viewport.height / _forcedResolution.height, yScale = yScale.toFixed(2)) : yScale = 1, viewport.width < _forcedResolution.width ? (xScale = viewport.width / _forcedResolution.width, xScale = xScale.toFixed(2)) : xScale = 1;
                var smallestScale = yScale > xScale ? xScale : yScale;
                return smallestScale
            }

            var _forcedResolution, NAVBAR = {
                HEIGHT: 100
            };

            resizeHandler(), $(window).bind("resize", resizeHandler)

        }]),

    angular.module("famous-angular")
        .directive("desktopNav", function() {
            return {
                scope: !1,
                restrict: "E",
                controller: "DesktopNavCtrl",
                templateUrl: "build/templates/desktop-nav.html"
            }
        })
        .controller("DesktopNavCtrl", ["$rootScope", "$scope", "$state", "$famous", "$timeline", "$media", "stateTransitions", function($rootScope, $scope, $state, $famous, $timeline, $media, stateTransitions) {
            var Transitionable = ($famous["famous/core/Transform"], $famous["famous/transitions/Transitionable"]),
                Easing = $famous["famous/transitions/Easing"],
                navTimeline = new Transitionable(0);
            $scope.navTimeline = navTimeline, $scope.navbar = {
                opacity: $timeline([
                    [0, 0],
                    [1, 1]
                ])
            }, $state.current.name && "intro" !== $state.current.name && $state.go($state.current.name, null, {
                reload: !0
            }), $scope.$on("$stateChangeSuccess", function(e, toState, toParams, fromState) {
                function getDelay(prevState) {
                    return prevState.data ? prevState.data.leaveAnimationDuration : 0
                }

                function isIntroState() {
                    return "intro" === toState.name
                }
                $scope.navTimeline.halt();
                var delay = getDelay(fromState) + stateTransitions.delayBetweenEnterLeaveAnimations;
                $scope.navTimeline.delay(delay), isIntroState() ? $scope.navTimeline.set(0, {
                    duration: 400
                }) : $scope.navTimeline.set(1, {
                    duration: 400
                })
            }), $scope.progressDots = {
                dot1: {
                    translate: $timeline([
                        [.5, [-160, 0, 0], Easing.inQuart],
                        [1.5, [0, 0, 0], Easing.inQuart],
                        [2.5, [170, 0, 0], Easing.inQuart],
                        [3.5, [375, 0, 0], Easing.inQuart],
                        [4.5, [585, 0, 0], Easing.inQuart],
                        [5.5, [750, 0, 0], Easing.inQuart],
                        [6.5, [985, 0, 0], Easing.inQuart]
                    ]),
                    opacity: $timeline([
                        [.5, 0, Easing.inQuad],
                        [1.5, 1],
                        [5.5, 1, Easing.inQuad],
                        [6.5, 0]
                    ])
                },
                dot2: {
                    translate: $timeline([
                        [.5, [-150, 0, 0], Easing.inCubic],
                        [1.5, [10, 0, 0], Easing.inCubic],
                        [2.5, [180, 0, 0], Easing.inCubic],
                        [3.5, [385, 0, 0], Easing.inCubic],
                        [4.5, [595, 0, 0], Easing.inCubic],
                        [5.5, [760, 0, 0], Easing.inCubic],
                        [6.5, [995, 0, 0], Easing.inCubic]
                    ]),
                    opacity: $timeline([
                        [.5, 0, Easing.inQuad],
                        [1.5, 1],
                        [5.5, 1, Easing.inQuad],
                        [6.5, 0]
                    ])
                },
                dot3: {
                    translate: $timeline([
                        [.5, [-140, 0, 0], Easing.inQuad],
                        [1.5, [20, 0, 0], Easing.inQuad],
                        [2.5, [190, 0, 0], Easing.inQuad],
                        [3.5, [395, 0, 0], Easing.inQuad],
                        [4.5, [605, 0, 0], Easing.inQuad],
                        [5.5, [770, 0, 0], Easing.inQuad],
                        [6.5, [1005, 0, 0], Easing.inQuad]
                    ]),
                    opacity: $timeline([
                        [.5, 0, Easing.inQuad],
                        [1.5, 1],
                        [5.5, 1, Easing.inQuad],
                        [6.5, 0]
                    ])
                }
            }
        }]);
var directive = {},
    service = {
        value: {}
    },
    DEPENDENCIES = {
        "angular.js": "http://code.angularjs.org/" + angular.version.full + "/angular.min.js",
        "angular-resource.js": "http://code.angularjs.org/" + angular.version.full + "/angular-resource.min.js",
        "angular-route.js": "http://code.angularjs.org/" + angular.version.full + "/angular-route.min.js",
        "angular-animate.js": "http://code.angularjs.org/" + angular.version.full + "/angular-animate.min.js",
        "angular-sanitize.js": "http://code.angularjs.org/" + angular.version.full + "/angular-sanitize.min.js",
        "angular-cookies.js": "http://code.angularjs.org/" + angular.version.full + "/angular-cookies.min.js"
    };
directive.jsFiddle = function(getEmbeddedTemplate, escape, script) {
    return {
        terminal: !0,
        link: function(scope, element, attr) {
            function hiddenField(name, value) {
                return '<input type="hidden" name="' + name + '" value="' + escape(value) + '">'
            }
            var name = "",
                stylesheet = '<link rel="stylesheet" href="http://twitter.github.com/bootstrap/assets/css/bootstrap.css">\n',
                fields = {
                    html: "",
                    css: "",
                    js: ""
                };
            angular.forEach(attr.jsFiddle.split(" "), function(file, index) {
                var fileType = file.split(".")[1];
                fields[fileType] += "html" == fileType ? 0 == index ? "<div ng-app" + (attr.module ? '="' + attr.module + '"' : "") + ">\n" + getEmbeddedTemplate(file, 2) : "\n\n\n  <!-- CACHE FILE: " + file + ' -->\n  <script type="text/ng-template" id="' + file + '">\n' + getEmbeddedTemplate(file, 4) + "  </script>\n" : getEmbeddedTemplate(file) + "\n"
            }), fields.html += "</div>\n", setHtmlIe8SafeWay(element, '<form class="jsfiddle" method="post" action="http://jsfiddle.net/api/post/library/pure/" target="_blank">' + hiddenField("title", "AngularJS Example: " + name) + hiddenField("css", "</style> <!-- Ugly Hack due to jsFiddle issue: http://goo.gl/BUfGZ --> \n" + stylesheet + script.angular + (attr.resource ? script.resource : "") + "<style>\n" + fields.css) + hiddenField("html", fields.html) + hiddenField("js", fields.js) + '<button class="btn btn-primary"><i class="icon-white icon-pencil"></i> Edit Me</button></form>')
        }
    }
},
    directive.ngSetText = ["getEmbeddedTemplate", function(getEmbeddedTemplate) {
        return {
            restrict: "CA",
            priority: 10,
            compile: function(element, attr) {
                setHtmlIe8SafeWay(element, escape(getEmbeddedTemplate(attr.ngSetText)))
            }
        }
    }],
    directive.ngHtmlWrap = ["reindentCode", "templateMerge", function(reindentCode, templateMerge) {
        return {
            compile: function(element, attr) {
                var properties = {
                        head: "",
                        module: "",
                        body: element.text()
                    },
                    html = "<!doctype html>\n<html ng-app{{module}}>\n  <head>\n{{head:4}}  </head>\n  <body>\n{{body:4}}  </body>\n</html>";
                angular.forEach((attr.ngHtmlWrap || "").split(" "), function(dep) {
                    if (dep) {
                        dep = DEPENDENCIES[dep] || dep;
                        var ext = dep.split(/\./).pop();
                        "css" == ext ? properties.head += '<link rel="stylesheet" href="' + dep + '" type="text/css">\n' : "js" == ext ? properties.head += '<script src="' + dep + '"></script>\n' : properties.module = '="' + dep + '"'
                    }
                }), setHtmlIe8SafeWay(element, escape(templateMerge(html, properties)))
            }
        }
    }],
    directive.ngSetHtml = ["getEmbeddedTemplate", function(getEmbeddedTemplate) {
        return {
            restrict: "CA",
            priority: 10,
            compile: function(element, attr) {
                setHtmlIe8SafeWay(element, getEmbeddedTemplate(attr.ngSetHtml))
            }
        }
    }],
    directive.ngEvalJavascript = ["getEmbeddedTemplate", function(getEmbeddedTemplate) {
        return {
            compile: function(element, attr) {
                var fileNames = attr.ngEvalJavascript.split(" ");
                angular.forEach(fileNames, function(fileName) {
                    var script = getEmbeddedTemplate(fileName);
                    try {
                        window.execScript ? window.execScript(script || '""') : window.eval(script + "//@ sourceURL=" + fileName)
                    } catch (e) {
                        window.console ? window.console.log(script, "\n", e) : window.alert(e)
                    }
                })
            }
        }
    }],
    directive.ngEmbedApp = ["$templateCache", "$browser", "$rootScope", "$location", "$sniffer", "$animate", function($templateCache, $browser, docsRootScope, $location, $sniffer, $animate) {
        return {
            terminal: !0,
            link: function(scope, element, attrs) {
                var embedRootScope, deregisterEmbedRootScope, modules = ["ngAnimate"];
                modules.push(["$provide", function($provide) {
                    $provide.value("$templateCache", $templateCache), $provide.value("$anchorScroll", angular.noop), $provide.value("$browser", $browser), $provide.value("$sniffer", $sniffer), $provide.value("$animate", $animate), $provide.provider("$location", function() {
                        this.$get = ["$rootScope", function($rootScope) {
                            return docsRootScope.$on("$locationChangeSuccess", function(event, oldUrl, newUrl) {
                                $rootScope.$broadcast("$locationChangeSuccess", oldUrl, newUrl)
                            }), $location
                        }], this.html5Mode = angular.noop
                    }), $provide.decorator("$rootScope", ["$delegate", function($delegate) {
                        return embedRootScope = $delegate, embedRootScope.$$postDigestQueue = docsRootScope.$$postDigestQueue, deregisterEmbedRootScope = docsRootScope.$watch(function() {
                            embedRootScope.$digest()
                        }), embedRootScope
                    }])
                }]), attrs.ngEmbedApp && modules.push(attrs.ngEmbedApp), element.on("click", function(event) {
                    event.target.attributes.getNamedItem("ng-click") && event.preventDefault()
                }), element.on("$destroy", function() {
                    deregisterEmbedRootScope(), embedRootScope.$destroy()
                }), element.data("$injector", null), angular.bootstrap(element, modules)
            }
        }
    }],
    service.reindentCode = function() {
        return function(text, spaces) {
            if (!text) return text;
            for (var i, lines = text.split(/\r?\n/), prefix = "      ".substr(0, spaces || 0); lines.length && lines[0].match(/^\s*$/);) lines.shift();
            for (; lines.length && lines[lines.length - 1].match(/^\s*$/);) lines.pop();
            var minIndent = 999;
            for (i = 0; i < lines.length; i++) {
                var line = lines[0],
                    reindentCode = line.match(/^\s*/)[0];
                reindentCode !== line && reindentCode.length < minIndent && (minIndent = reindentCode.length)
            }
            for (i = 0; i < lines.length; i++) lines[i] = prefix + lines[i].substring(minIndent);
            return lines.push(""), lines.join("\n")
        }
    },
    service.templateMerge = ["reindentCode", function(indentCode) {
        return function(template, properties) {
            return template.replace(/\{\{(\w+)(?:\:(\d+))?\}\}/g, function(_, key, indent) {
                var value = properties[key];
                return indent && (value = indentCode(value, indent)), void 0 == value ? "" : value
            })
        }
    }],
    service.getEmbeddedTemplate = ["reindentCode", function(reindentCode) {
        return function(id) {
            var element = document.getElementById(id);
            return element ? reindentCode(angular.element(element).html(), 0) : null
        }
    }],
    angular.module("bootstrapPrettify", [])
        .directive(directive).factory(service);
var directive = {};
directive.runnableExample = ["$templateCache", function() {
    var exampleClassNameSelector = ".runnable-example-file",
        tpl = '<nav class="runnable-example-tabs" ng-if="tabs">  <a ng-class="{active:$index==activeTabIndex}"ng-repeat="tab in tabs track by $index" href="" class="btn"ng-click="setTab($index)">    {{ tab }}  </a></nav>';
    return {
        restrict: "C",
        scope: !0,
        controller: ["$scope", function($scope) {
            $scope.setTab = function(index) {
                var tab = $scope.tabs[index];
                $scope.activeTabIndex = index, $scope.$broadcast("tabChange", index, tab)
            }
        }],
        compile: function(element) {
            return element.html(tpl + element.html()),
                function(scope, element) {
                    {
                        var node = element[0],
                            examples = node.querySelectorAll(exampleClassNameSelector),
                            tabs = [];
                        Date.now()
                    }
                    angular.forEach(examples, function(child) {
                        tabs.push(child.getAttribute("name"))
                    }), tabs.length > 0 && (scope.tabs = tabs, scope.$on("tabChange", function(e, index) {
                        angular.forEach(examples, function(child) {
                            child.style.display = "none"
                        });
                        var selected = examples[index];
                        selected.style.display = "block"
                    }), scope.setTab(0))
                }
        }
    }
}],
    directive.dropdownToggle = ["$document", "$location", "$window", function($document, $location) {
    var close, openElement = null;
    return {
        restrict: "C",
        link: function(scope, element) {
            scope.$watch(function() {
                return $location.path()
            }, function() {
                close && close()
            }), element.parent().on("click", function() {
                close && close()
            }), element.on("click", function(event) {
                event.preventDefault(), event.stopPropagation();
                var iWasOpen = !1;
                openElement && (iWasOpen = openElement === element, close()), iWasOpen || (element.parent().addClass("open"), openElement = element, close = function(event) {
                    event && event.preventDefault(), event && event.stopPropagation(), $document.off("click", close), element.parent().removeClass("open"), close = null, openElement = null
                }, $document.on("click", close))
            })
        }
    }
}],
    directive.syntax = function() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            function makeLink(type, text, link, icon) {
                return '<a href="' + link + '" class="btn syntax-' + type + '" target="_blank" rel="nofollow"><span class="' + icon + '"></span> ' + text + "</a>"
            }
            var html = "",
                types = {
                    github: {
                        text: "View on Github",
                        key: "syntaxGithub",
                        icon: "icon-github"
                    },
                    plunkr: {
                        text: "View on Plunkr",
                        key: "syntaxPlunkr",
                        icon: "icon-arrow-down"
                    },
                    jsfiddle: {
                        text: "View on JSFiddle",
                        key: "syntaxFiddle",
                        icon: "icon-cloud"
                    }
                };
            for (var type in types) {
                var data = types[type],
                    link = attrs[data.key];
                link && (html += makeLink(type, data.text, link, data.icon))
            }
            var nav = document.createElement("nav");
            nav.className = "syntax-links", nav.innerHTML = html;
            var node = element[0],
                par = node.parentNode;
            par.insertBefore(nav, node)
        }
    }
},
    directive.tabbable = function() {
    return {
        restrict: "C",
        compile: function(element) {
            var navTabs = angular.element('<ul class="nav nav-tabs"></ul>'),
                tabContent = angular.element('<div class="tab-content"></div>');
            tabContent.append(element.contents()), element.append(navTabs).append(tabContent)
        },
        controller: ["$scope", "$element", function($scope, $element) {
            var selectedTab, navTabs = $element.contents().eq(0),
                ngModel = $element.controller("ngModel") || {},
                tabs = [];
            ngModel.$render = function() {
                var $viewValue = this.$viewValue;
                if ((selectedTab ? selectedTab.value != $viewValue : $viewValue) && (selectedTab && (selectedTab.paneElement.removeClass("active"), selectedTab.tabElement.removeClass("active"), selectedTab = null), $viewValue)) {
                    for (var i = 0, ii = tabs.length; ii > i; i++)
                        if ($viewValue == tabs[i].value) {
                            selectedTab = tabs[i];
                            break
                        }
                    selectedTab && (selectedTab.paneElement.addClass("active"), selectedTab.tabElement.addClass("active"))
                }
            }, this.addPane = function(element, attr) {
                function update() {
                    tab.title = attr.title, tab.value = attr.value || attr.title, ngModel.$setViewValue || ngModel.$viewValue && tab != selectedTab || (ngModel.$viewValue = tab.value), ngModel.$render()
                }
                var li = angular.element("<li><a href></a></li>"),
                    a = li.find("a"),
                    tab = {
                        paneElement: element,
                        paneAttrs: attr,
                        tabElement: li
                    };
                return tabs.push(tab), attr.$observe("value", update)(), attr.$observe("title", function() {
                    update(), a.text(tab.title)
                })(), navTabs.append(li), li.on("click", function(event) {
                    event.preventDefault(), event.stopPropagation(), ngModel.$setViewValue ? $scope.$apply(function() {
                        ngModel.$setViewValue(tab.value), ngModel.$render()
                    }) : (ngModel.$viewValue = tab.value, ngModel.$render())
                }),
                    function() {
                        tab.tabElement.remove();
                        for (var i = 0, ii = tabs.length; ii > i; i++) tab == tabs[i] && tabs.splice(i, 1)
                    }
            }
        }]
    }
},
    directive.table = function() {
    return {
        restrict: "E",
        link: function(scope, element, attrs) {
            attrs["class"] || element.addClass("table table-bordered table-striped code-table")
        }
    }
};
var popoverElement = function() {
    var object = {
        init: function() {
            this.element = angular.element('<div class="popover popover-incode top"><div class="arrow"></div><div class="popover-inner"><div class="popover-title"><code></code></div><div class="popover-content"></div></div></div>'), this.node = this.element[0], this.element.css({
                display: "block",
                position: "absolute"
            }), angular.element(document.body).append(this.element);
            var inner = this.element.children()[1];
            this.titleElement = angular.element(inner.childNodes[0].firstChild), this.contentElement = angular.element(inner.childNodes[1]), this.element.on("click", function(event) {
                event.preventDefault(), event.stopPropagation()
            });
            var self = this;
            angular.element(document.body).on("click", function() {
                self.visible() && self.hide()
            })
        },
        show: function(x, y) {
            this.element.addClass("visible"), this.position(x || 0, y || 0)
        },
        hide: function() {
            this.element.removeClass("visible"), this.position(-9999, -9999)
        },
        visible: function() {
            return this.position().y >= 0
        },
        isSituatedAt: function(element) {
            return this.besideElement ? element[0] == this.besideElement[0] : !1
        },
        title: function(value) {
            return this.titleElement.html(value)
        },
        content: function(value) {
            return value && value.length > 0 && (value = marked(value)), this.contentElement.html(value)
        },
        positionArrow: function(position) {
            this.node.className = "popover " + position
        },
        positionAway: function() {
            this.besideElement = null, this.hide()
        },
        positionBeside: function(element) {
            this.besideElement = element;
            var elm = element[0],
                x = elm.offsetLeft,
                y = elm.offsetTop;
            x -= 30, y -= this.node.offsetHeight + 10, this.show(x, y)
        },
        position: function(x, y) {
            return null == x || null == y ? {
                x: this.node.offsetLeft,
                y: this.node.offsetTop
            } : (this.element.css("left", x + "px"), void this.element.css("top", y + "px"))
        }
    };
    return object.init(), object.hide(), object
};
directive.popover = ["popoverElement", function(popover) {
    return {
        restrict: "A",
        priority: 500,
        link: function(scope, element, attrs) {
            element.on("click", function(event) {
                event.preventDefault(), event.stopPropagation(), popover.isSituatedAt(element) && popover.visible() ? (popover.title(""), popover.content(""), popover.positionAway()) : (popover.title(attrs.title), popover.content(attrs.content), popover.positionBeside(element))
            })
        }
    }
}],
    directive.tabPane = function() {
    return {
        require: "^tabbable",
        restrict: "C",
        link: function(scope, element, attrs, tabsCtrl) {
            element.on("$remove", tabsCtrl.addPane(element, attrs))
        }
    }
},
    directive.foldout = ["$http", "$animate", "$window", function($http, $animate, $window) {
    return {
        restrict: "A",
        priority: 500,
        link: function(scope, element, attrs) {
            var container, loading, url = attrs.url;
            /\/build\//.test($window.location.href) && (url = "/build/docs" + url), element.on("click", function() {
                scope.$apply(function() {
                    if (container) container.hasClass("ng-hide") ? $animate.removeClass(container, "ng-hide") : $animate.addClass(container, "ng-hide");
                    else {
                        if (loading) return;
                        loading = !0;
                        var par = element.parent();
                        container = angular.element('<div class="foldout">loading...</div>'), $animate.enter(container, null, par), $http.get(url, {
                            cache: !0
                        }).success(function(html) {
                            loading = !1, html = '<div class="foldout-inner"><div calss="foldout-arrow"></div>' + html + "</div>", container.html(html), "block" == container.css("display") && (container.css("display", "none"), $animate.addClass(container, "ng-hide"))
                        })
                    }
                })
            })
        }
    }
}],
    angular.module("bootstrap", []).directive(directive).factory("popoverElement", popoverElement), angular.module("docsApp", ["examples", "bootstrap", "bootstrapPrettify"]).controller("DocsController", ["$scope", "openPlunkr", function($scope, openPlunkr) {
    $scope.openPlunkr = openPlunkr
}]),
    angular.module("ui.bootstrap.dropdown", []).constant("dropdownConfig", {
    openClass: "open"
})
        .service("dropdownService", ["$document", function($document) {
    var openScope = null;
    this.open = function(dropdownScope) {
        openScope || ($document.on("click", closeDropdown), $document.on("keydown", escapeKeyBind)), openScope && openScope !== dropdownScope && (openScope.isOpen = !1), openScope = dropdownScope
    }, this.close = function(dropdownScope) {
        openScope === dropdownScope && (openScope = null, $document.off("click", closeDropdown), $document.off("keydown", escapeKeyBind))
    };
    var closeDropdown = function() {
            openScope.$apply(function() {
                openScope.isOpen = !1
            })
        },
        escapeKeyBind = function(evt) {
            27 === evt.which && closeDropdown()
        }
}]).controller("DropdownController", ["$scope", "$attrs", "dropdownConfig", "dropdownService", "$animate", function($scope, $attrs, dropdownConfig, dropdownService, $animate) {
    var self = this,
        openClass = dropdownConfig.openClass;
    this.init = function(element) {
        self.$element = element, $scope.isOpen = angular.isDefined($attrs.isOpen) ? $scope.$parent.$eval($attrs.isOpen) : !1
    }, this.toggle = function(open) {
        return $scope.isOpen = arguments.length ? !!open : !$scope.isOpen
    }, this.isOpen = function() {
        return $scope.isOpen
    }, $scope.$watch("isOpen", function(value) {
        $animate[value ? "addClass" : "removeClass"](self.$element, openClass), value ? dropdownService.open($scope) : dropdownService.close($scope), $scope.onToggle({
            open: !!value
        })
    }), $scope.$on("$locationChangeSuccess", function() {
        $scope.isOpen = !1
    })
}]).directive("dropdown", function() {
    return {
        restrict: "CA",
        controller: "DropdownController",
        scope: {
            isOpen: "=?",
            onToggle: "&"
        },
        link: function(scope, element, attrs, dropdownCtrl) {
            dropdownCtrl.init(element)
        }
    }
}).directive("dropdownToggle", function() {
    return {
        restrict: "CA",
        require: "?^dropdown",
        link: function(scope, element, attrs, dropdownCtrl) {
            dropdownCtrl && (element.on("click", function(event) {
                event.preventDefault(), event.stopPropagation(), element.hasClass("disabled") || element.prop("disabled") || scope.$apply(function() {
                    dropdownCtrl.toggle()
                })
            }), element.attr({
                "aria-haspopup": !0,
                "aria-expanded": !1
            }), scope.$watch(dropdownCtrl.isOpen, function(isOpen) {
                element.attr("aria-expanded", !!isOpen)
            }))
        }
    }
}), angular.module("examples", []).factory("formPostData", ["$document", function($document) {
    return function(url, fields) {
        var form = angular.element('<form style="display: none;" method="post" action="' + url + '"></form>');
        angular.forEach(fields, function(value, name) {
            var input = angular.element('<input type="hidden" name="' + name + '">');
            input.attr("value", value), form.append(input)
        }), $document.find("body").append(form), form[0].submit(), form.remove()
    }
}]).factory("openPlunkr", ["formPostData", "$http", "$q", function(formPostData, $http, $q) {
    return function(exampleFolder) {
        var exampleName = "AngularJS Example";
        $http.get(exampleFolder + "/manifest.json").then(function(response) {
            return response.data
        }).then(function(manifest) {
            var filePromises = [],
                exampleNameParts = manifest.name.split("-");
            exampleNameParts.unshift("AngularJS"), angular.forEach(exampleNameParts, function(part, index) {
                exampleNameParts[index] = part.charAt(0).toUpperCase() + part.substr(1)
            }), exampleName = exampleNameParts.join(" - ");
            var getFileName = function(filename, checkName) {
                    return -1 !== filename.indexOf("/") && (filename = filename.substr(filename.lastIndexOf("/") + 1, filename.length)), checkName && -1 !== manifest.files.indexOf(filename) && (filename = "_" + filename), filename
                },
                pushLocalFile = function(filename, checkName) {
                    var deferred = $q.defer();
                    return $http.get(exampleFolder + "/" + filename, {
                        transformResponse: []
                    }).then(function(response) {
                        var innerFiles = [];
                        filename = getFileName(filename, checkName);
                        for (var reg = /<(?:script|link).*(?:src|href)="((?!(http|\/\/))(?:(?!").)+)"/gi, localResources = reg.exec(response.data); localResources && localResources[1];) - 1 === manifest.files.indexOf(localResources[1]) && (innerFiles.push(pushLocalFile(localResources[1]), !0), response.data = response.data.replace(localResources[1], getFileName(localResources[1], !0))), localResources = reg.exec(response.data);
                        innerFiles.length > 0 ? $q.all(innerFiles).then(function(files) {
                            files = files || [], files.push({
                                name: filename,
                                content: response.data
                            }), deferred.resolve(files)
                        }) : deferred.resolve({
                            name: filename,
                            content: response.data
                        })
                    }, function() {
                        deferred.reject()
                    }), deferred.promise
                };
            return angular.forEach(manifest.files, function(filename) {
                filePromises.push(pushLocalFile(filename))
            }), $q.all(filePromises)
        }).then(function(files) {
            var postData = {};
            angular.forEach(files, function(filesList) {
                angular.isArray(filesList) ? angular.forEach(filesList, function(file) {
                    postData["files[" + file.name + "]"] = file.content
                }) : postData["files[" + filesList.name + "]"] = filesList.content
            }), postData["tags[0]"] = "angularjs", postData["tags[1]"] = "example", postData["private"] = !0, postData.description = exampleName, formPostData("http://plnkr.co/edit/?p=preview", postData)
        })
    }
}]), angular.module("famous-angular").directive("downloadPanel", function() {
    return {
        scope: !1,
        restrict: "E",
        controller: "DownloadPanelCtrl",
        templateUrl: "build/templates/download-panel.html"
    }
}).controller("DownloadPanelCtrl", ["$scope", "$http", "$famous", "$timeline", "stateTransitions", "$media", function($scope, $http, $famous, $timeline, stateTransitions, $media) {
    var Transform = $famous["famous/core/Transform"];
    $scope.minified = !0, $scope.toggleMinified = function() {
        $scope.minified = !$scope.minified
    }, $scope.jsCDN = function() {
        return $scope.minified ? js.minified : js.unminified
    }, $scope.cssCDN = function() {
        return $scope.minified ? css.minified : css.unminified
    };
    var js = {
            minified: "http://code.famo.us/famous-angular/latest/famous-angular.min.js",
            unminified: "http://code.famo.us/famous-angular/latest/famous-angular.js"
        },
        css = {
            minified: "http://code.famo.us/famous-angular/latest/famous-angular.min.css",
            unminified: "http://code.famo.us/famous-angular/latest/famous-angular.css"
        };
    $media.$sheet("DownloadPanelSheet", {
        xs: {
            "#download-panel": {
                transform: function() {
                    var translate = [0, 660, 0];
                    return Transform.translate.apply(this, translate)
                }
            }
        },
        sm: {
            "#download-panel": {
                transform: function() {
                    var translate = [0, 560, 0];
                    return Transform.translate.apply(this, translate)
                }
            }
        }
    })
}]), angular.module("famous-angular").directive("stateFooter", function() {
    return {
        scope: !1,
        restrict: "E",
        controller: "FooterCtrl",
        templateUrl: "build/templates/state-footer.html"
    }
}).controller("FooterCtrl", ["$rootScope", "$scope", "$state", "$famous", "$timeline", "$media", "stateTransitions", function($rootScope, $scope, $state, $famous, $timeline, $media, stateTransitions) {
    var Transform = $famous["famous/core/Transform"],
        Transitionable = $famous["famous/transitions/Transitionable"],
        Easing = $famous["famous/transitions/Easing"],
        footerTimeline = new Transitionable(0);
    $media.$sheet("FooterSheet", {
        xs: {
            "#footer": {
                transform: function() {
                    var translate = $timeline([
                        [0, [0, -40, 0]],
                        [1, [0, -40, 0], Easing.outBack],
                        [2, [0, -1100, 0], Easing.outBounce],
                        [3, [0, -40, 0]]
                    ])(footerTimeline.get());
                    return Transform.translate.apply(this, translate)
                },
                origin: function() {
                    return [.5, 1]
                },
                align: function() {
                    return [.5, 1]
                },
                opacity: function() {
                    return $timeline([
                        [0, 0],
                        [1, 1]
                    ])(footerTimeline.get())
                }
            }
        },
        sm: {
            "#footer": {
                transform: function() {
                    var translate = $timeline([
                        [0, [0, -40, 0]],
                        [1, [0, -40, 0], Easing.outBack],
                        [2, [0, -770, 0], Easing.outBounce],
                        [3, [0, -40, 0]]
                    ])(footerTimeline.get());
                    return Transform.translate.apply(this, translate)
                }
            }
        }
    }), $state.current.name && "intro" !== $state.current.name && $state.go($state.current.name, null, {
        reload: !0
    }), $scope.$on("$stateChangeSuccess", function(e, toState, toParams, fromState) {
        function getDelay(prevState) {
            return prevState && prevState.data ? prevState.data.leaveAnimationDuration : 0
        }

        function goingToIntroState() {
            return 0 === toState.data.index
        }

        function goingToEndState() {
            return 6 === toState.data.index
        }

        function leavingEndState() {
            return fromState.data ? 6 === fromState.data.index : !1
        }
        footerTimeline.halt();
        var delay = getDelay(fromState) + stateTransitions.delayBetweenEnterLeaveAnimations;
        return footerTimeline.delay(delay), goingToIntroState() ? void footerTimeline.set(0, {
            duration: 400
        }) : goingToEndState() ? (footerTimeline.set(1, {
            duration: 0
        }), void footerTimeline.set(2, {
            duration: 400
        })) : leavingEndState() ? (footerTimeline.halt(), footerTimeline.delay(100), void footerTimeline.set(3, {
            duration: 700
        }, function() {
            footerTimeline.set(1, {
                duration: 0
            })
        })) : void footerTimeline.set(1, {
            duration: 500
        })
    })
}]), angular.module("famous-angular").directive("mobileNav", function() {
    return {
        scope: !1,
        restrict: "E",
        controller: "MobileNavCtrl",
        templateUrl: "build/templates/mobile-nav.html"
    }
}).controller("MobileNavCtrl", ["$rootScope", "$scope", "$state", "$famous", "$timeline", "stateUtils", "$media", function($rootScope, $scope, $state, $famous, $timeline) {
    var Transitionable = $famous["famous/transitions/Transitionable"],
        Easing = $famous["famous/transitions/Easing"];
    $scope.containerSurfaceOptions = {
        classes: ["set-nav-perspective"],
        size: [void 0, 150]
    }, $scope.menuItems = [{
        text: "Render Tree",
        state: "1"
    }, {
        text: "Data Binding",
        state: "2"
    }, {
        text: "Angular Directives",
        state: "3"
    }, {
        text: "Organization",
        state: "4"
    }, {
        text: "Unification",
        state: "5"
    }, {
        text: "Download",
        state: "download"
    }];
    var isGridMode = !1,
        gridModeTran = new Transitionable(0);
    $scope.gridModeT = gridModeTran, $scope.gridMode = {
        toggle: function(state) {
            isGridMode = !isGridMode, isGridMode ? gridModeTran.set(1, {
                duration: 350
            }) : gridModeTran.set(0, {
                duration: 350
            }, function() {
                state && $state.go(state)
            })
        },
        translate: function($index, gridModeTimeValue) {
            return $timeline([
                [0, [0, 0, 0], Easing.outBack],
                [.8, [0, 150 * $index + 120, 0]]
            ])(gridModeTimeValue)
        }
    }, $scope.tile = {
        scale: $timeline([
            [0, [.65, .65], Easing.inQuad],
            [.5, [1, 1]]
        ]),
        rotateX: function($index, timeValue) {
            return gridModeTran.get() ? 0 : $timeline([
                [$index + 1, -Math.PI],
                [$index + 1.5, 0],
                [$index + 2, Math.PI]
            ])(timeValue)
        },
        isCurrentState: function(state) {
            return $state.current.name === state
        }
    }, $scope.overlay = {
        translate: $timeline([
            [0, [0, -1366, -10]],
            [.01, [0, 0, 9]]
        ]),
        opacity: $timeline([
            [0, 0, Easing.outCubic],
            [1, .85]
        ]),
        xIcon: {
            translate: $timeline([
                [.1, [360, 1090, 1e3], Easing.outQuad],
                [.5, [360, 1090, 10]]
            ])
        }
    }
}]), angular.module("famous-angular").run(["$state", "stateUtils", function($state, stateUtils) {
    window.addEventListener("keydown", function(e) {
        if ("input" !== e.target.tagName.toLowerCase()) {
            var key = e.keyCode;
            if (37 === key) {
                var desiredIndex = $state.current.data.index - 1;
                stateUtils.goToStateWithIndex(desiredIndex)
            }
            if (39 === key) {
                var desiredIndex = $state.current.data.index + 1;
                stateUtils.goToStateWithIndex(desiredIndex)
            }
        }
    })
}]), angular.module("famous-angular").run(["$rootScope", "$famous", "$state", "stateUtils", "$timeline", function($rootScope, $famous, $state, stateUtils, $timeline) {
    function correctDeltaY(deltaY) {
        deltaY = -deltaY, deltaY /= 100;
        var MAXIMUM_SCROLL_DISTANCE = .03;
        return deltaY = Math.min(MAXIMUM_SCROLL_DISTANCE, deltaY), deltaY = Math.max(-MAXIMUM_SCROLL_DISTANCE, deltaY)
    }

    function adjustTimelines(deltaY) {
        var startingPoint = $state.current.data.index + .5,
            newProgressValue = cappedProgressValue(deltaY, startingPoint);
        if (updateTimelines(newProgressValue), gravityTimeout && clearGravityTimeout(), traveledFarEnoughForStateChange(newProgressValue)) changeState(deltaY), haltAdditionalScrollEvents();
        else {
            var delayUntilGravitySnap = 300;
            gravityTimeout = setTimeout(function() {
                triggerGravityEffect(startingPoint), clearGravityTimeout()
            }, delayUntilGravitySnap)
        }
    }

    function cappedProgressValue(deltaY, startingPoint) {
        var newProgressValue = progressTimeline.get() + deltaY;
        return newProgressValue = Math.max(startingPoint - 1, newProgressValue), newProgressValue = Math.min(startingPoint + 1, newProgressValue)
    }

    function updateTimelines(newProgressValue) {
        progressTimeline.halt(), progressTimeline.set(newProgressValue, {
            duration: 0
        }), gravityTimeline.halt(), gravityTimeline.set(newProgressValue, {
            duration: 0
        })
    }

    function traveledFarEnoughForStateChange(newProgressValue) {
        var maxRange = $rootScope.isMobile() ? [.1, 6.9] : [0, 7];
        if (newProgressValue <= maxRange[0] || newProgressValue >= maxRange[1]) return haltAdditionalScrollEvents(), !1;
        var progressValueStartingPoint = $state.current.data.index + .5,
            delta = Math.abs(newProgressValue - progressValueStartingPoint),
            threshold = $rootScope.isMobile() ? .4 : 1;
        return delta >= threshold
    }

    function triggerGravityEffect(startingPoint) {
        progressTimeline.halt(), progressTimeline.set(startingPoint, {
            duration: 200
        }), gravityTimeline.halt(), gravityTimeline.set(startingPoint, {
            duration: 1500,
            curve: Easing.outElastic
        })
    }

    function changeState(deltaY) {
        var direction = deltaY > 0 ? "forward" : "backwards",
            indexChange = "forward" === direction ? 1 : -1,
            currentStateIndex = $state.current.data.index;
        gravityTimeout && clearGravityTimeout(), stateUtils.goToStateWithIndex(currentStateIndex + indexChange)
    }

    function haltAdditionalScrollEvents() {
        haltScrollEvents = !0, setTimeout(function() {
            haltScrollEvents = !1
        }, DISABLE_EVENTS_MS)
    }

    function clearGravityTimeout() {
        clearTimeout(gravityTimeout), gravityTimeout = null
    }
    var Easing = $famous["famous/transitions/Easing"],
        Transitionable = $famous["famous/transitions/Transitionable"],
        progressTimeline = new Transitionable(0);
    $rootScope.progressTimeline = progressTimeline;
    var gravityTimeline = new Transitionable(0);
    $rootScope.gravityTimeline = gravityTimeline;
    var gravityTimeout, initialPageLoad = !0;
    $rootScope.$on("$stateChangeSuccess", function() {
        gravityTimeout && clearGravityTimeout()
    }), $rootScope.$on("$stateChangeSuccess", function() {
        gravityTimeout && clearGravityTimeout();
        var indexMidpoint = $state.current.data.index + .5;
        progressTimeline.set(indexMidpoint, {
            duration: 500
        }), gravityTimeline.halt(), gravityTimeline.delay(initialPageLoad ? 0 : 200), gravityTimeline.set(indexMidpoint, {
            duration: 500
        }), initialPageLoad && (initialPageLoad = !1)
    });
    var haltScrollEvents;
    $(window).on("mousewheel", {
        mousewheel: {
            debounce: !0,
            throttle: !0
        }
    }, function(e) {
        haltScrollEvents || (e.deltaY = correctDeltaY(e.deltaY), adjustTimelines(e.deltaY))
    });
    var previousPageY;
    $(document).bind("touchstart", function(e) {
        previousPageY = e.originalEvent.touches[0].pageY
    }), $(document).bind("touchmove", function(e) {
        if (e.preventDefault(), !haltScrollEvents && !/Input/.test(e.target.toString())) {
            var delta = previousPageY - e.originalEvent.touches[0].pageY;
            if (previousPageY = e.originalEvent.touches[0].pageY, Math.abs(delta) > 30) return haltAdditionalScrollEvents(), void changeState(delta);
            var deltaY = $timeline([
                [-100, -1],
                [0, 0],
                [100, 1]
            ])(delta);
            adjustTimelines(deltaY)
        }
    });
    var DISABLE_EVENTS_MS = 1e3
}]), angular.module("famous-angular").controller("State1Ctrl", ["$rootScope", "$scope", "$state", "$famous", "$timeline", "stateTransitions", "$media", function($rootScope, $scope, $state, $famous, $timeline, stateTransitions, $media) {
    var Transform = $famous["famous/core/Transform"],
        Transitionable = $famous["famous/transitions/Transitionable"],
        Easing = $famous["famous/transitions/Easing"],
        t = new Transitionable(0);
    $scope.t = t, $scope.gravity = {
        translate: $timeline([
            [1, [0, 0, -100]],
            [1.5, [0, 0, 0]],
            [2, [0, 0, 100]]
        ]),
        opacity: $timeline([
            [1, 0],
            [1.3, 1],
            [1.5, 1],
            [1.7, 1],
            [2, 0]
        ])
    }, $scope.enter = function($done) {
        stateTransitions.enter(t, function() {
            $done()
        })
    }, $scope.leave = function($done) {
        stateTransitions.leave(t, function() {
            $done()
        })
    }, $scope.entireView = {
        translate: $timeline([
            [0, [0, 0, 0]],
            [1, [0, 0, 0], Easing.inCubic],
            [2, [0, 0, 150]]
        ]),
        opacity: $timeline([
            [0, 1],
            [1, 1],
            [2, 0]
        ])
    }, $media.$sheet("State1Sheet", {
        xs: {
            "#left-column": {
                transform: function() {
                    var translate = $timeline([
                        [0, [10, 150, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            },
            "#right-column": {
                transform: function() {
                    var translate = $timeline([
                        [0, [85, 330, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            },
            "#code-block": {
                transform: function() {
                    var translate = $timeline([
                        [0, [-5, 625, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            }
        },
        sm: {
            "#left-column": {
                transform: function() {
                    var translate = $timeline([
                        [0, [220, 190, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            },
            "#right-column": {
                transform: function() {
                    var translate = $timeline([
                        [0, [1050, 190, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            },
            "#code-block": {
                transform: function() {
                    var translate = $timeline([
                        [0, [0, 170, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            }
        }
    }), $scope.leftColumn = {
        translate: $timeline([
            [0, [220, 190, 0]]
        ])
    }, $scope.rightColumn = {
        translate: $timeline([
            [0, [1050, 190, 0]]
        ])
    }, $scope.heading = {
        translate: $timeline([
            [0, [0, 0, -200], Easing.inOutQuad],
            [.2, [0, 0, 0]],
            [1, [0, 0, 0]]
        ]),
        opacity: $timeline([
            [0, 0],
            [.2, 1],
            [1, 1]
        ])
    }, $scope.frame = {
        visual: {
            translate: $timeline([
                [.15, [0, 20, -100], Easing.outQuad],
                [.35, [0, 0, 0]],
                [1, [0, 0, 0]]
            ]),
            opacity: $timeline([
                [0, 0],
                [.15, 0],
                [.35, 1],
                [1, 1]
            ])
        },
        code: {
            translate: $timeline([
                [.15, [-30, 0, 0], Easing.outQuad],
                [.45, [0, 0, 0]]
            ]),
            opacity: $timeline([
                [0, 0],
                [.15, 0],
                [.45, 1],
                [1, 1]
            ])
        }
    }, $scope.header = {
        visual: {
            scale: $timeline([
                [0, [.3, .3]],
                [.3, [.3, .3], Easing.outBack],
                [.5, [1, 1]]
            ]),
            translate: $timeline([
                [0, [20, 65, 0]],
                [.3, [20, 65, 0], Easing.inOutQuart],
                [.5, [20, 65, 0]],
                [1, [20, 65, 0]]
            ]),
            opacity: $timeline([
                [0, 0],
                [.3, 0],
                [.5, 1],
                [1, 1]
            ])
        },
        code: {
            translate: $timeline([
                [.3, [0, 35, 0], Easing.outQuad],
                [.5, [30, 35, 0]]
            ]),
            opacity: $timeline([
                [0, 0],
                [.3, 0],
                [.5, 1],
                [1, 1]
            ])
        }
    }, $scope.sidenav = {
        visual: {
            scale: $timeline([
                [0, [.3, .3]],
                [.4, [.3, .3], Easing.outBack],
                [.6, [1, 1]]
            ]),
            translate: $timeline([
                [0, [20, 135, -0]],
                [.4, [20, 135, 0], Easing.inOutQuart],
                [.6, [20, 135, 0]],
                [1, [20, 135, 0], Easing.inQuad]
            ]),
            opacity: $timeline([
                [0, 0],
                [.4, 0],
                [.6, 1],
                [1, 1]
            ])
        },
        code: {
            translate: $timeline([
                [.4, [30, 71, 0], Easing.outQuad],
                [.6, [60, 71, 0]]
            ]),
            opacity: $timeline([
                [0, 0],
                [.5, 0],
                [.6, 1],
                [1, 1]
            ])
        }
    }, $scope.container = {
        visual: {
            scale: $timeline([
                [0, [.3, .3]],
                [.5, [.3, .3], Easing.outBack],
                [.7, [1, 1]]
            ]),
            translate: $timeline([
                [0, [110, 135, -0]],
                [.5, [110, 135, 0], Easing.inOutQuart],
                [.7, [110, 135, 0]],
                [1, [110, 135, 0], Easing.inQuad]
            ]),
            opacity: $timeline([
                [0, 0],
                [.5, 0],
                [.7, 1],
                [1, 1]
            ])
        },
        code: {
            translate: $timeline([
                [.5, [30, 108, 0], Easing.outQuad],
                [.7, [60, 108, 0]]
            ]),
            opacity: $timeline([
                [0, 0],
                [.5, 0],
                [.7, 1],
                [1, 1]
            ])
        }
    }, $scope.frameContent = {
        visual: {
            box1: {
                scale: $timeline([
                    [0, [.5, .5]],
                    [.6, [.5, .5], Easing.outBack],
                    [.8, [1, 1]]
                ]),
                translate: $timeline([
                    [0, [135, 160, 0]],
                    [.6, [135, 160, 0], Easing.inOutQuart],
                    [.8, [135, 160, 0]],
                    [1, [135, 160, 0], Easing.inQuad]
                ]),
                opacity: $timeline([
                    [0, 0],
                    [.6, 0],
                    [.8, 1],
                    [1, 1]
                ])
            },
            box2: {
                scale: $timeline([
                    [0, [.5, .5]],
                    [.65, [.5, .5], Easing.outBack],
                    [.85, [1, 1]]
                ]),
                translate: $timeline([
                    [0, [283, 160, 0]],
                    [.65, [283, 160, 0], Easing.inOutQuart],
                    [.85, [283, 160, 0]],
                    [1, [283, 160, 0], Easing.inQuad]
                ]),
                opacity: $timeline([
                    [0, 0],
                    [.65, 0],
                    [.85, 1],
                    [1, 1]
                ])
            },
            box3: {
                scale: $timeline([
                    [0, [.5, .5]],
                    [.7, [.5, .5], Easing.outBack],
                    [1, [1, 1]]
                ]),
                translate: $timeline([
                    [0, [430, 160, 0]],
                    [.7, [430, 160, 0], Easing.inOutQuart],
                    [1, [430, 160, 0], Easing.inQuad]
                ]),
                opacity: $timeline([
                    [0, 0],
                    [.7, 0],
                    [1, 1]
                ])
            }
        },
        code: {
            translate: $timeline([
                [.7, [60, 145, 0], Easing.outQuad],
                [1, [90, 145, 0]]
            ]),
            opacity: $timeline([
                [0, 0],
                [.7, 0],
                [1, 1]
            ])
        }
    }
}]), angular.module("famous-angular").controller("State2Ctrl", ["$rootScope", "$scope", "$state", "$famous", "$timeline", "stateTransitions", "$interval", "$media", function($rootScope, $scope, $state, $famous, $timeline, stateTransitions, $interval, $media) {
    function playAnimation() {
        animationInterval = $interval(function() {
            return $scope.data.t + 1 > 100 ? void $interval.cancel(animationInterval) : void $scope.data.t++
        }, 1e3 / 60)
    }
    var Transform = $famous["famous/core/Transform"],
        Transitionable = $famous["famous/transitions/Transitionable"],
        Easing = $famous["famous/transitions/Easing"],
        t = new Transitionable(0);
    $scope.t = t, $scope.data = {
        name: "",
        t: 1
    }, $scope.gravity = {
        translate: $timeline([
            [2, [0, 0, -100]],
            [2.5, [0, 0, 0]],
            [3, [0, 0, 100]]
        ]),
        opacity: $timeline([
            [2, 0],
            [2.3, 1],
            [2.5, 1],
            [2.7, 1],
            [3, 0]
        ])
    }, $scope.enter = function($done) {
        stateTransitions.enter(t, function() {
            for (var text = "Angular".split(""), i = 0; i < text.length; i++) setTimeout(function(index) {
                return function() {
                    $scope.data.name = $scope.data.name + text[index], $scope.$digest()
                }
            }(i), 120 * i);
            setTimeout(function() {
                playAnimation()
            }, 1e3), $done()
        })
    }, $scope.leave = function($done) {
        animationInterval && $interval.cancel(animationInterval), stateTransitions.leave(t, function() {
            $done()
        })
    };
    var animationInterval;
    $scope.entireView = {
        translate: $timeline([
            [0, [0, 0, 0]],
            [1, [0, 0, 0], Easing.inQuart],
            [2, [0, 0, 150]]
        ]),
        opacity: $timeline([
            [0, 1],
            [1, 1],
            [2, 0]
        ])
    }, $media.$sheet("State2Sheet", {
        xs: {
            "#left-column": {
                transform: function() {
                    var translate = $timeline([
                        [0, [75, 310, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            },
            "#right-column": {
                transform: function() {
                    var translate = $timeline([
                        [0, [10, 140, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            },
            "#code": {
                transform: function() {
                    var translate = $timeline([
                        [.2, [0, 485, 0], Easing.outQuad],
                        [.4, [0, 685, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                },
                opacity: function() {
                    return $timeline([
                        [.2, 0, Easing.inQuad],
                        [.4, 1]
                    ])(t.get())
                }
            }
        },
        sm: {
            "#left-column": {
                transform: function() {
                    var translate = $timeline([
                        [0, [250, 190, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            },
            "#right-column": {
                transform: function() {
                    var translate = $timeline([
                        [0, [1020, 180, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            },
            "#code": {
                transform: function() {
                    var translate = $timeline([
                        [.2, [0, 0, 0], Easing.outQuad],
                        [.4, [0, 170, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            }
        }
    }), $scope.heading = {
        translate: $timeline([
            [0, [0, 0, -300], Easing.outQuad],
            [.2, [0, 0, 0]]
        ]),
        opacity: $timeline([
            [0, 0],
            [.2, 1]
        ])
    }, window.data = $scope.data, $scope.entireCard = {
        animation: {
            translate: function(sliderT) {
                sliderT = parseInt(sliderT);
                var depth = $timeline([
                    [1, [0, 0, 0]],
                    [25, [0, 0, 0], Easing.inQuad],
                    [40, [0, -200, 0]],
                    [43, [0, -200, 0], Easing.outQuad],
                    [60, [0, 0, 0]]
                ])(sliderT);
                return depth
            },
            rotate: function(sliderT) {
                sliderT = parseInt(sliderT);
                var rotate = $timeline([
                    [1, 0]
                ])(sliderT);
                return rotate
            },
            scale: function(sliderT) {
                sliderT = parseInt(sliderT);
                var scale = $timeline([
                    [1, [1, 1], Easing.inQuad],
                    [20, [1.3, .3], Easing.inOutQuad],
                    [40, [1, 1], Easing.outQuad],
                    [56, [1, 1], Easing.outQuad],
                    [65, [1.15, .75]],
                    [68, [1.15, .75], Easing.outElastic],
                    [100, [1, 1]]
                ])(sliderT);
                return scale
            }
        },
        translate: $timeline([
            [.6, [0, 400, 0], Easing.outBack],
            [.9, [0, 0, 0]]
        ]),
        opacity: $timeline([
            [.6, 0, Easing.inQuad],
            [.8, 1]
        ])
    }, $scope.nametag = {
        body: {
            translate: function(sliderT) {
                return sliderT = parseInt(sliderT), $timeline([
                    [1, [0, 0, 1], Easing.inQuad],
                    [50, [0, 0, 1], Easing.outQuad],
                    [100, [0, 0, 1]]
                ])(sliderT)
            }
        },
        heading: {
            translate: function(sliderT) {
                return sliderT = parseInt(sliderT), $timeline([
                    [1, [0, -245, 2], Easing.inQuad],
                    [50, [0, -245, 2], Easing.outQuad],
                    [100, [0, -245, 2]]
                ])(sliderT)
            }
        },
        stripe: {
            translate: function(sliderT) {
                return sliderT = parseInt(sliderT), $timeline([
                    [1, [0, -25, 3], Easing.inQuad],
                    [50, [0, -25, 3], Easing.outQuad],
                    [100, [0, -25, 3]]
                ])(sliderT)
            }
        },
        name: {
            translate: function(sliderT) {
                return sliderT = parseInt(sliderT), $timeline([
                    [1, [0, 25, 4], Easing.inQuad],
                    [50, [0, 25, 4], Easing.outQuad],
                    [100, [0, 25, 4]]
                ])(sliderT)
            }
        },
        inputRange: {
            translate: $timeline([
                [.3, [-100, 410, 5], Easing.outCubic],
                [.6, [0, 410, 5]]
            ]),
            opacity: $timeline([
                [.3, 0],
                [.6, 1]
            ])
        },
        inputText: {
            translate: $timeline([
                [.4, [420, 410, 5], Easing.outCubic],
                [.7, [320, 410, 5]]
            ]),
            opacity: $timeline([
                [.4, 0],
                [.7, 1]
            ])
        }
    }
}]), angular.module("famous-angular").controller("State3Ctrl", ["$rootScope", "$scope", "$state", "$interval", "$famous", "$timeline", "stateTransitions", "$media", function($rootScope, $scope, $state, $interval, $famous, $timeline, stateTransitions, $media) {
    function playAnimation() {
        var repeatAutoplay = $interval(function() {
            return $scope.data.repeatCount + 1 >= 9 ? void $interval.cancel(repeatAutoplay) : void $scope.data.repeatCount++
        }, 100)
    }
    var Transform = $famous["famous/core/Transform"],
        Transitionable = $famous["famous/transitions/Transitionable"],
        Easing = $famous["famous/transitions/Easing"],
        t = new Transitionable(0);
    $scope.t = t;
    var tile = {
        width: 300,
        height: 115,
        margin: {
            left: 10,
            bottom: 10
        },
        countPerColumn: 4,
        columnCount: 2
    };
    $scope.tile = tile;
    var tileGrid = {
        margin: {
            left: 30
        }
    };
    $scope.tileGrid = tileGrid, $scope.gravity = {
        translate: $timeline([
            [3, [0, 0, -100]],
            [3.5, [0, 0, 0]],
            [4, [0, 0, 100]]
        ]),
        opacity: $timeline([
            [3, 0],
            [3.3, 1],
            [3.5, 1],
            [3.7, 1],
            [4, 0]
        ])
    }, $scope.enter = function($done) {
        stateTransitions.enter(t, function() {
            playAnimation(), $done()
        })
    }, $scope.leave = function($done) {
        stateTransitions.leave(t, function() {
            $done()
        })
    }, $scope.entireView = {
        translate: $timeline([
            [0, [0, 0, 0]],
            [1, [0, 0, 0], Easing.inQuart],
            [2, [0, 0, 150]]
        ]),
        opacity: $timeline([
            [0, 0],
            [.3, 1],
            [1, 1],
            [2, 0]
        ])
    }, $media.$sheet("State3Sheet", {
        xs: {
            "#left-column": {
                transform: function() {
                    var translate = $timeline([
                        [0, [40, 920, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            },
            "#right-column": {
                transform: function() {
                    var translate = $timeline([
                        [0, [50, 250, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            },
            "#code": {
                opacity: function() {
                    return 0
                }
            }
        },
        sm: {
            "#left-column": {
                transform: function() {
                    var translate = $timeline([
                        [0, [250, 150, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            },
            "#right-column": {
                transform: function() {
                    var translate = $timeline([
                        [0, [980, 170, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            },
            "#code": {
                transform: function() {
                    var translate = $timeline([
                        [.2, [0, 220, 0], Easing.inOutQuart],
                        [.6, [0, 170, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                },
                opacity: function() {
                    return $timeline([
                        [.2, 0, Easing.inOutQuart],
                        [.6, 1]
                    ])(t.get())
                }
            }
        }
    }), $scope.faAppHeight = function() {
        var totalHeight = tile.height + tile.margin.bottom;
        return totalHeight * tile.countPerColumn
    }, $scope.heading = {
        translate: $timeline([
            [0, [0, 0, -150], Easing.inOutQuart],
            [.4, [0, 0, 0]]
        ]),
        opacity: $timeline([
            [0, 0, Easing.inOutQuart],
            [.4, 1]
        ])
    }, $scope.repeatSlider = {
        width: tile.width * tile.columnCount + tile.margin.left,
        height: 60,
        translate: function() {
            var totalTileHeight = tile.height + tile.margin.bottom,
                heightOfAllTiles = totalTileHeight * tile.countPerColumn;
            return $timeline([
                [.4, [tileGrid.margin.left, heightOfAllTiles + 200, 0], Easing.outBack],
                [.8, [tileGrid.margin.left, heightOfAllTiles, 0]]
            ])
        }(),
        opacity: $timeline([
            [.4, 0, Easing.inOutQuart],
            [.8, 1]
        ])
    }, $scope.data = {
        repeatCount: 0
    }, $scope.cats = [], $scope.$watch("data.repeatCount", function(newVal) {
        if (newVal) {
            $scope.cats = [];
            for (var i = 0; i < Number(newVal); i++) $scope.cats.push(catData[i])
        }
    }), $scope.catTile = {
        translate: function(catT, $index) {
            var totalWidth = tile.width + tile.margin.left,
                x = $index >= tile.countPerColumn ? totalWidth : 0,
                totalHeight = tile.height + tile.margin.bottom,
                y = $index % tile.countPerColumn * totalHeight,
                z = 0;
            return [x, y, z]
        },
        rotateX: $timeline([
            [0, -Math.PI / 2, Easing.outElastic],
            [.99, 0, Easing.inQuart],
            [1.99, -Math.PI / 2]
        ])
    }, $scope.catEnter = function(t, $done) {
        t.set(1, {
            duration: 1500
        }, $done)
    }, $scope.catLeave = function(t, $done) {
        t.halt(), t.set(2, {
            duration: 100
        }, function() {
            t.set(0, {
                duration: 1
            }), $done()
        })
    };
    var catData = [{
        picture: "img/cats/cat1.png",
        name: "Rocco",
        location: "Seattle, WA",
        t: new Transitionable(0)
    }, {
        picture: "img/cats/cat2.png",
        name: "Tabby",
        location: "Phoenix, AR",
        t: new Transitionable(0)
    }, {
        picture: "img/cats/cat3.png",
        name: "Meiska",
        location: "Reston, VA",
        t: new Transitionable(0)
    }, {
        picture: "img/cats/cat4.png",
        name: "Fat Max",
        location: "San Francisco, CA",
        t: new Transitionable(0)
    }, {
        picture: "img/cats/cat5.png",
        name: "Izzy",
        location: "Atlanta, GA",
        t: new Transitionable(0)
    }, {
        picture: "img/cats/cat6.png",
        name: "Powder",
        location: "Seattle, WA",
        t: new Transitionable(0)
    }, {
        picture: "img/cats/cat7.png",
        name: "David",
        location: "Salem, OR",
        t: new Transitionable(0)
    }, {
        picture: "img/cats/cat8.png",
        name: "Maggie",
        location: "Sarasota, FL",
        t: new Transitionable(0)
    }]
}]), angular.module("famous-angular").controller("State4Ctrl", ["$rootScope", "$scope", "$state", "$famous", "$timeline", "stateTransitions", "$media", function($rootScope, $scope, $state, $famous, $timeline, stateTransitions, $media) {
    var Transform = $famous["famous/core/Transform"],
        Transitionable = $famous["famous/transitions/Transitionable"],
        Easing = $famous["famous/transitions/Easing"],
        t = new Transitionable(0);
    $scope.t = t, $scope.gravity = {
        translate: $timeline([
            [4, [0, 0, -100]],
            [4.5, [0, 0, 0]],
            [5, [0, 0, 100]]
        ]),
        opacity: $timeline([
            [4, 0],
            [4.3, 1],
            [4.5, 1],
            [4.7, 1],
            [5, 0]
        ])
    }, $scope.enter = function($done) {
        stateTransitions.enter(t, function() {
            $done()
        })
    }, $scope.leave = function($done) {
        stateTransitions.leave(t, function() {
            $done()
        })
    }, $scope.entireView = {
        translate: $timeline([
            [0, [0, 0, 0]],
            [1, [0, 0, 0], Easing.inQuart],
            [2, [0, 0, 150]]
        ]),
        opacity: $timeline([
            [0, 0],
            [.3, 1],
            [1, 1],
            [2, 0]
        ])
    }, $media.$sheet("State4Sheet", {
        xs: {
            "#heading": {
                transform: function() {
                    var translate = $timeline([
                        [0, [0, 160, -150], Easing.outQuad],
                        [.2, [0, 160, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                },
                opacity: function() {
                    return $timeline([
                        [0, 0, Easing.inQuart],
                        [.2, 1]
                    ])(t.get())
                },
                align: function() {
                    return [.5, 0]
                },
                origin: function() {
                    return [.5, 0]
                }
            },
            "#routing-image": {
                transform: function() {
                    var translate = $timeline([
                        [0, [20, 1060, 0], Easing.outBack],
                        [.2, [20, 1060, 0], Easing.outBack],
                        [.5, [20, 830, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                },
                opacity: function() {
                    return $timeline([
                        [0, 0, Easing.outCubic],
                        [.2, 0, Easing.outCubic],
                        [.5, 1]
                    ])(t.get())
                }
            },
            "#routing-text": {
                transform: function() {
                    var translate = $timeline([
                        [0, [195, 1410, 0], Easing.outBack],
                        [.25, [195, 1410, 0], Easing.outBack],
                        [.55, [195, 1080, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                },
                opacity: function() {
                    return $timeline([
                        [0, 0],
                        [.25, 0],
                        [.55, 1]
                    ])(t.get())
                }
            },
            "#dependency-image": {
                transform: function() {
                    var translate = $timeline([
                        [0, [210, 655, 0], Easing.outBack],
                        [.35, [210, 655, 0], Easing.outBack],
                        [.65, [210, 375, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                },
                opacity: function() {
                    return $timeline([
                        [0, 0],
                        [.35, 0],
                        [.65, 1]
                    ])(t.get())
                }
            },
            "#dependency-text": {
                transform: function() {
                    var translate = $timeline([
                        [0, [95, 1025, 0], Easing.outBack],
                        [.3, [95, 1025, 0], Easing.outBack],
                        [.6, [95, 685, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                },
                opacity: function() {
                    return $timeline([
                        [0, 0],
                        [.3, 0],
                        [.6, 1]
                    ])(t.get())
                }
            },
            "#modules-image": {
                transform: function() {
                    var translate = $timeline([
                        [0, [440, 1110, 0], Easing.outBack],
                        [.5, [440, 1110, 0], Easing.outBack],
                        [.8, [440, 810, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                },
                opacity: function() {
                    return $timeline([
                        [0, 0],
                        [.5, 0],
                        [.8, 1]
                    ])(t.get())
                }
            },
            "#modules-text": {
                transform: function() {
                    var translate = $timeline([
                        [0, [595, 1410, 0], Easing.outBack],
                        [.45, [595, 1410, 0], Easing.outBack],
                        [.75, [595, 1080, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                },
                opacity: function() {
                    return $timeline([
                        [0, 0],
                        [.45, 0],
                        [.75, 1]
                    ])(t.get())
                }
            }
        },
        sm: {
            "#heading": {
                transform: function() {
                    var translate = $timeline([
                        [0, [0, 150, -150], Easing.outQuad],
                        [.2, [0, 150, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            },
            "#routing-image": {
                transform: function() {
                    var translate = $timeline([
                        [0, [140, 600, 0], Easing.outBack],
                        [.2, [140, 600, 0], Easing.outBack],
                        [.5, [140, 370, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            },
            "#routing-text": {
                transform: function() {
                    var translate = $timeline([
                        [0, [335, 1030, 0], Easing.outBack],
                        [.25, [335, 1030, 0], Easing.outBack],
                        [.55, [335, 680, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            },
            "#dependency-text": {
                transform: function() {
                    var translate = $timeline([
                        [0, [650, 1030, 0], Easing.outBack],
                        [.3, [650, 1030, 0], Easing.outBack],
                        [.6, [650, 680, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            },
            "#dependency-image": {
                transform: function() {
                    var translate = $timeline([
                        [0, [750, 600, 0], Easing.outBack],
                        [.35, [750, 600, 0], Easing.outBack],
                        [.65, [750, 310, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            },
            "#modules-image": {
                transform: function() {
                    var translate = $timeline([
                        [0, [1320, 630, 0], Easing.outBack],
                        [.5, [1320, 630, 0], Easing.outBack],
                        [.8, [1320, 330, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            },
            "#modules-text": {
                transform: function() {
                    var translate = $timeline([
                        [0, [1515, 1030, 0], Easing.outBack],
                        [.45, [1515, 1030, 0], Easing.outBack],
                        [.75, [1515, 680, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            }
        }
    }), $scope.routing = {
        text: {
            scale: $timeline([
                [0, [.2, .2], Easing.outBack],
                [.25, [.2, .2], Easing.outBack],
                [.55, [1, 1]]
            ])
        }
    }, $scope.dependency = {
        text: {
            scale: $timeline([
                [0, [.2, .2], Easing.outBack],
                [.3, [.2, .2], Easing.outBack],
                [.6, [1, 1]]
            ])
        }
    }, $scope.modules = {
        text: {
            scale: $timeline([
                [0, [.2, .2], Easing.outBack],
                [.45, [.2, .2], Easing.outBack],
                [.75, [1, 1]]
            ])
        }
    }
}]), angular.module("famous-angular").controller("State5Ctrl", ["$rootScope", "$scope", "$state", "$famous", "$timeline", "stateTransitions", "$media", function($rootScope, $scope, $state, $famous, $timeline, stateTransitions, $media) {
    var Transform = $famous["famous/core/Transform"],
        Transitionable = $famous["famous/transitions/Transitionable"],
        Easing = $famous["famous/transitions/Easing"],
        t = new Transitionable(0);
    $scope.t = t, $scope.gravity = {
        translate: $timeline([
            [5, [0, 0, -100]],
            [5.5, [0, 0, 0]],
            [6, [0, 0, 100]]
        ]),
        opacity: $timeline([
            [5, 0],
            [5.3, 1],
            [5.5, 1],
            [5.7, 1],
            [6, 0]
        ])
    }, $scope.enter = function($done) {
        setTimeout(function() {
            $scope.showHeroBlock = !0, $scope.$digest()
        }, 500), stateTransitions.enter(t, function() {
            $done()
        })
    }, $scope.leave = function($done) {
        stateTransitions.leave(t, function() {
            $done()
        })
    }, $scope.entireView = {
        translate: $timeline([
            [0, [0, 0, 0]],
            [1, [0, 0, 0], Easing.inQuad],
            [2, [0, 0, 150]]
        ]),
        opacity: $timeline([
            [0, 1],
            [1, 1],
            [1.8, 0]
        ])
    }, $media.$sheet("State5Sheet", {
        xs: {
            "#left-column": {
                transform: function() {
                    var scale = $timeline([
                            [0, [.8, .8]]
                        ])(t.get()),
                        scaleMatrix = Transform.scale.apply(this, scale),
                        translate = $timeline([
                            [.3, [80, 655, 0], Easing.outBack],
                            [.6, [80, 395, 0]]
                        ])(t.get()),
                        translateMatrix = Transform.translate.apply(this, translate);
                    return Transform.multiply(scaleMatrix, translateMatrix)
                },
                opacity: function() {
                    return $timeline([
                        [0, 0],
                        [.3, 0],
                        [.5, 1]
                    ])(t.get())
                }
            },
            "#right-column": {
                transform: function() {
                    var translate = $timeline([
                        [0, [20, 140, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            },
            "#code-block": {
                transform: function() {
                    var translate = $timeline([
                        [0, [40, 615, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                },
                opacity: function() {
                    return 1
                }
            }
        },
        sm: {
            "#left-column": {
                transform: function() {
                    var translate = $timeline([
                        [.3, [250, 580, 0], Easing.outBack],
                        [.6, [250, 180, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            },
            "#right-column": {
                transform: function() {
                    var translate = $timeline([
                        [0, [1170, 170, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            },
            "#code-block": {
                transform: function() {
                    var translate = $timeline([
                        [0, [0, 170, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                },
                opacity: function() {
                    return 1
                }
            }
        }
    }), $scope.heroBlock = {
        translate: $timeline([
            [0, [84, 110, 2], Easing.inOutQuart],
            [.2, [84, 110, 2]]
        ]),
        opacity: $timeline([
            [0, 0],
            [.8, 0],
            [1, 1]
        ])
    }, $scope.heading = {
        translate: $timeline([
            [0, [0, 0, -150], Easing.outQuart],
            [.2, [0, 0, 0]]
        ]),
        opacity: $timeline([
            [0, 0, Easing.outQuart],
            [.2, 1]
        ])
    }, $scope.code = {
        top: {
            translate: $timeline([
                [0, [0, 0, 0]]
            ]),
            opacity: $timeline([
                [0, 0],
                [.2, 0],
                [.4, 1]
            ])
        },
        middle: {
            translate: $timeline([
                [.8, [-50, 78, 0], Easing.outQuart],
                [1, [31, 78, 0]]
            ]),
            opacity: $timeline([
                [0, 0],
                [.8, 0],
                [1, 1]
            ])
        },
        bottom: {
            translate: $timeline([
                [0, [0, 76, 0]],
                [.6, [0, 76, 0], Easing.inOutQuart],
                [.8, [0, 343, 0]]
            ]),
            opacity: $timeline([
                [0, 0],
                [.2, 0],
                [.4, 1]
            ])
        }
    }
}]), angular.module("famous-angular").controller("HeroCtrl", ["$scope", "$famous", "$timeline", function($scope, $famous, $timeline) {
    var Easing = ($famous["famous/transitions/Transitionable"], $famous["famous/transitions/Easing"]);
    $scope.width = 632, $scope.height = 236;
    var nRows = 11,
        nColumns = 30;
    $scope.squares = _.range(nRows * nColumns), $scope.mult = function(v1, v2) {
        return [v1[0] * v2[0], v1[1] * v2[1], v1[2] * v2[2]]
    }, $scope.add = function(v1, v2) {
        return [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]]
    }, $scope.t = function() {
        return Date.now() % 3e3 / 1e3
    };
    var subrange = function(start, end) {
        var fn = $timeline([
            [start, 0, _.identity],
            [end, 1]
        ]);
        return _.compose(fn, $scope.t)
    };
    $scope.inRange = function(t) {
        return t > 0 && 1 >= t
    }, $scope.washes = [subrange(0, 1), subrange(.8, 1.1), subrange(1.1, 1.9), subrange(1.3, 2.1), subrange(1.4, 2.3), subrange(1.8, 2.35), subrange(2.3, 3)], $scope.spin = $timeline([
        [0, 0, Easing.inOutQuad],
        [1, Math.PI / 2, Easing.inOutQuad]
    ]), $scope.getBig = $timeline([
        [0, [.001, .01, 1], Easing.inOutQuad],
        [1, [2, 2, 1], Easing.inOutQuad]
    ]), $scope.slideFromRight = $timeline([
        [0, $scope.width, _.identity],
        [1, 0]
    ]), $scope.slideFromLeft = $timeline([
        [0, -$scope.width, Easing.outQuad],
        [1, 0]
    ]), window.t = $scope.t, $scope.stagger = function() {
        return $timeline([
            [0, 0, _.identity],
            [1, 1]
        ])
    }, $scope.makeTriplet = function(x) {
        return [x, x, x]
    }, $scope.circleScale = function(i) {
        var r = $scope.mult($scope.getBig($scope.washes[3]()), $scope.makeTriplet($scope.stagger(i, 5)));
        return r
    }, $scope.colors = {
        blue: "#66D9EF",
        pink: "#F92672",
        green: "#A6E22E",
        orange: "#FD971F",
        purple: "#AE81FF"
    }, $scope.circleColors = _.values($scope.colors)
}]), angular.module("famous-angular").controller("StateEndCtrl", ["$scope", "$famous", "$timeline", function($scope, $famous, $timeline) {
    {
        var Easing = $famous["famous/transitions/Easing"];
        $famous["famous/transitions/Transitionable"]
    }
    $scope.gravity = {
        translate: $timeline([
            [6, [0, 0, -100]],
            [6.5, [0, 0, 0]],
            [7, [0, 0, 100]]
        ]),
        opacity: $timeline([
            [6, 0, Easing.inQuad],
            [6.5, 1, Easing.outQuad],
            [7, 0]
        ])
    }
}]), angular.module("famous-angular").controller("StateIntroCtrl", ["$rootScope", "$scope", "$state", "$http", "$famous", "$timeline", "stateTransitions", "$media", function($rootScope, $scope, $state, $http, $famous, $timeline, stateTransitions, $media) {
    function animateArrow() {
        arrowAnimation.set(0, {
            duration: 0
        }), arrowAnimation.set(1700, {
            duration: 1700
        }, function() {
            loopAnimation && animateArrow()
        })
    }
    var Transform = $famous["famous/core/Transform"],
        Transitionable = $famous["famous/transitions/Transitionable"],
        Easing = $famous["famous/transitions/Easing"],
        t = new Transitionable(0);
    $scope.t = t, $scope.gravity = {
        translate: $timeline([
            [0, [0, 0, -100]],
            [.5, [0, 0, 0]],
            [1, [0, 0, 100]]
        ]),
        opacity: $timeline([
            [0, 1],
            [.5, 1],
            [.7, 1],
            [1, 0]
        ])
    }, $scope.enter = function($done) {
        stateTransitions.enter(t, function() {
            $scope.startArrowAnimation(), $done()
        })
    }, $scope.leave = function($done) {
        stateTransitions.leave(t, function() {
            $done()
        })
    }, $scope.entireView = {
        translate: $timeline([
            [0, [0, 0, 0]],
            [1, [0, 0, 0], Easing.inCubic],
            [2, [0, 0, 200]]
        ]),
        opacity: $timeline([
            [0, 1],
            [1, 1],
            [2, 0]
        ])
    }, $http({
        method: "GET",
        url: "https://api.github.com/repos/famous/famous-angular"
    }).success(function(data) {
        $scope.stars = data.stargazers_count, $scope.forks = data.forks
    }), $media.$sheet("StateIntroSheet", {
        xs: {
            "#heading": {
                transform: function() {
                    var translate = $timeline([
                        [0, [0, 200, 0]],
                        [.05, [0, 200, 0], Easing.outCubic],
                        [.55, [0, 40, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                },
                opacity: function() {
                    return $timeline([
                        [0, 0],
                        [.05, 0],
                        [.55, 1]
                    ])(t.get())
                }
            },
            "#tagline": {
                transform: function() {
                    var translate = $timeline([
                        [0, [0, 320, 0]],
                        [.1, [0, 320, 0], Easing.outCubic],
                        [.6, [0, 140, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                },
                opacity: function() {
                    return $timeline([
                        [0, 0],
                        [.1, 0],
                        [.6, 1]
                    ])(t.get())
                }
            },
            "#button-download": {
                transform: function() {
                    var translate = $timeline([
                        [0, [0, 570, 0]],
                        [.7, [0, 570, 0], Easing.inOutQuart],
                        [1, [0, 370, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                },
                opacity: function() {
                    return $timeline([
                        [0, 0],
                        [.7, 0],
                        [1, 1]
                    ])(t.get())
                }
            },
            "#button-github": {
                transform: function() {
                    var translate = $timeline([
                        [0, [0, 890, 1]],
                        [.15, [0, 890, 1], Easing.inOutQuart],
                        [.65, [0, 690, 1]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                },
                opacity: function() {
                    return $timeline([
                        [0, 0],
                        [.15, 0],
                        [.65, 1]
                    ])(t.get())
                }
            },
            "#button-docs": {
                transform: function() {
                    var translate = $timeline([
                        [0, [0, 720, 0]],
                        [.7, [0, 720, 0], Easing.inOutQuart],
                        [1, [0, 530, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                },
                opacity: function() {
                    return $timeline([
                        [0, 0],
                        [.7, 0],
                        [1, 1]
                    ])(t.get())
                }
            },
            "#built-by": {
                transform: function() {
                    var translate = $timeline([
                        [0, [0, 1165, 0], Easing.inOutQuart],
                        [.2, [0, 1165, 0], Easing.outQuad],
                        [.7, [0, 965, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                },
                opacity: function() {
                    return $timeline([
                        [0, 0],
                        [.2, 0],
                        [.7, 1]
                    ])(t.get())
                }
            },
            "#scroll-message": {
                transform: function() {
                    var translate = $timeline([
                        [0, [0, 1e3, 0]],
                        [.45, [0, 1e3, 0], Easing.inOutQuart],
                        [.95, [0, 1100, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                },
                opacity: function() {
                    return $timeline([
                        [0, 0],
                        [.75, 0],
                        [.95, 1],
                        [1, 1]
                    ])(t.get())
                }
            },
            "#down-arrow": {
                transform: function() {
                    var translate = $timeline([
                        [0, [0, 1150, 0]],
                        [.5, [0, 1150, 0], Easing.inOutQuart],
                        [1, [0, 1250, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                },
                opacity: function() {
                    return $timeline([
                        [0, 0],
                        [.6, 0],
                        [1, 1]
                    ])(t.get())
                }
            },
            "#down-arrow-animation": {
                transform: function() {
                    var translate = $timeline([
                        [0, [0, 0, 0], Easing.inOutQuart],
                        [300, [0, 50, 0]],
                        [301, [0, -45, 0], Easing.inQuad],
                        [600, [0, 0, 0]],
                        [1700, [0, 0, 0]]
                    ])(arrowAnimation.get());
                    return Transform.translate.apply(this, translate)
                },
                opacity: function() {
                    return $timeline([
                        [0, 1, Easing.outQuad],
                        [300, 0],
                        [301, 0, Easing.outQuad],
                        [600, 1],
                        [1700, 1]
                    ])(arrowAnimation.get())
                }
            }
        },
        sm: {
            "#logo": {
                transform: function() {
                    var translate = $timeline([
                        [0, [0, 300, 0], Easing.outCubic],
                        [.5, [0, 80, 0]],
                        [1, [0, 80, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                },
                opacity: function() {
                    return $timeline([
                        [0, 0],
                        [.5, 1],
                        [1, 1]
                    ])(t.get())
                }
            },
            "#heading": {
                transform: function() {
                    var translate = $timeline([
                        [0, [0, 400, 0]],
                        [.05, [0, 400, 0], Easing.outCubic],
                        [.55, [0, 210, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            },
            "#tagline": {
                transform: function() {
                    var translate = $timeline([
                        [0, [0, 600, 0]],
                        [.1, [0, 600, 0], Easing.outCubic],
                        [.6, [0, 350, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            },
            "#button-download": {
                transform: function() {
                    var translate = $timeline([
                        [0, [0, 490, 0]],
                        [.7, [0, 490, 0], Easing.inOutQuart],
                        [1, [-300, 490, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            },
            "#button-github": {
                transform: function() {
                    var translate = $timeline([
                        [0, [0, 690, 1]],
                        [.15, [0, 690, 1], Easing.inOutQuart],
                        [.65, [0, 490, 1]],
                        [1, [0, 490, 1]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            },
            "#button-docs": {
                transform: function() {
                    var translate = $timeline([
                        [0, [0, 490, 0]],
                        [.7, [0, 490, 0], Easing.inOutQuart],
                        [1, [300, 490, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            },
            "#built-by": {
                transform: function() {
                    var translate = $timeline([
                        [0, [0, 885, 0], Easing.inOutQuart],
                        [.2, [0, 885, 0], Easing.outQuad],
                        [.7, [0, 685, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            },
            "#scroll-message": {
                transform: function() {
                    var translate = $timeline([
                        [0, [0, 670, 0]],
                        [.45, [0, 670, 0], Easing.inOutQuart],
                        [.95, [0, 770, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            },
            "#down-arrow": {
                transform: function() {
                    var translate = $timeline([
                        [0, [0, 785, 0]],
                        [.5, [0, 785, 0], Easing.inOutQuart],
                        [1, [0, 885, 0]]
                    ])(t.get());
                    return Transform.translate.apply(this, translate)
                }
            },
            "#down-arrow-animation": {
                transform: function() {
                    var translate = $timeline([
                        [0, [0, 0, 0], Easing.inOutQuart],
                        [300, [0, 30, 0]],
                        [301, [0, -25, 0], Easing.inQuad],
                        [600, [0, 0, 0]],
                        [1700, [0, 0, 0]]
                    ])(arrowAnimation.get());
                    return Transform.translate.apply(this, translate)
                }
            }
        }
    });
    var loopAnimation, arrowAnimation = new Transitionable(0);
    $scope.startArrowAnimation = function() {
        loopAnimation || (loopAnimation = !0, animateArrow())
    }, $scope.endArrowAnimation = function() {
        loopAnimation = !1
    }
}]);
var tsSheetsModule = angular.module("ts.sheets", []);
angular.module("ts.sheets").provider("$media", function() {
    function _mutationCallback(records) {
        angular.forEach(records, function(record) {
            console.log("mutation observed", record), "attributes" === record.type && console.warn("ensure that record.target is the parent node, not a child node", record), _updateElement(record.target)
        })
    }

    function _windowResizeCallback() {
        _windowSizeDirty = !0, _updateEverything()
    }

    function _resolveMediaQueries() {
        if (!_windowSizeDirty) return _cachedResolvedMediaQueries;
        var matched = [];
        if (angular.forEach(_registeredMediaQueries, function(mediaQuery) {
            mediaQuery.conditionFn() && matched.push(mediaQuery)
        }), !matched.length) throw new Error("$media assumes at least one media query will be matched (by default this is 'xs').");
        return matched.sort(function(a, b) {
            return b.priority - a.priority
        }), _windowSizeDirty = !1, _cachedResolvedMediaQueries = matched
    }

    function _updateEverything() {
        var elementIds = Object.keys(_elements);
        angular.forEach(elementIds, function(id) {
            _updateElement(_elements[id])
        })
    }

    function _getObjectDepth(obj, acc) {
        var keys = !Array.isArray(obj) && Object.keys(obj);
        return keys && keys.length ? _getObjectDepth(obj[keys[0]], ++acc) : acc
    }

    function _updateElement(element) {
        var id = element.data(SHEET_ID),
            sheets = _elementSheets[id],
            matchedQueries = _resolveMediaQueries();
        angular.forEach(sheets, function(sheet) {
            var depth = _getObjectDepth(sheet, 0),
                mediaQueriesExist = 3 === depth,
                noMediaQueries = 2 === depth,
                matchedLayout = {};
            if (noMediaQueries) matchedLayout = sheet;
            else {
                if (!mediaQueriesExist) throw new Error("Malformed Sheet.  Object depth of 2 or 3 expected.  Actual depth was " + depth);
                angular.forEach(matchedQueries, function(query) {
                    var sheetForMediaQuery = sheet[query.name];
                    if (sheetForMediaQuery)
                        for (var selector in sheetForMediaQuery) {
                            matchedLayout[selector] = matchedLayout[selector] || {};
                            for (var field in sheetForMediaQuery[selector]) matchedLayout[selector][field] || (matchedLayout[selector][field] = sheetForMediaQuery[selector][field])
                        }
                })
            }
            if (matchedLayout) {
                var selectors = Object.keys(matchedLayout);
                angular.forEach(selectors, function(selector) {
                    var fields = Object.keys(matchedLayout[selector]),
                        elements = element[0].querySelectorAll(selector);
                    angular.forEach(elements, function(childElement) {
                        angular.forEach(fields, function(field) {
                            var payload = matchedLayout[selector][field];
                            _fieldHandlers[field](childElement, payload)
                        })
                    })
                })
            }
        })
    }
    var SHEET_ID = "$$sheetId",
        OBSERVER_CONF = {
            attributes: !0,
            childList: !0
        },
        _windowSizeDirty = !0,
        _cachedResolvedMediaQueries = [],
        _addEvent = function(elem, type, eventHandle) {
            null != elem && "undefined" != typeof elem && (elem.addEventListener ? elem.addEventListener(type, eventHandle, !1) : elem.attachEvent ? elem.attachEvent("on" + type, eventHandle) : elem["on" + type] = eventHandle)
        },
        _registeredMediaQueries = [],
        _registeredMediaQueriesByName = {},
        _sheets = {},
        _elementSheets = {},
        _elements = {},
        _fieldHandlers = {},
        _observers = {},
        _registerMediaQuery = this.$registerMediaQuery = function(name, conditionFn, priority) {
            _registeredMediaQueries[priority] = {
                name: name,
                conditionFn: conditionFn,
                priority: priority
            }, _registeredMediaQueriesByName[name] = {
                name: name,
                conditionFn: conditionFn,
                priority: priority
            }
        },
        _registerFieldHandler = this.$registerFieldHandler = function(fieldName, handlerFn) {
            _fieldHandlers[fieldName] = handlerFn
        },
        $media = {
            $sheet: function(name, spec) {
                void 0 !== _sheets[name] && console.warn("Sheet name '" + name + "' is already defined.  The latest declaration will overwrite previous declarations."), _sheets[name] = spec
            },
            $applySheet: function(element, name) {
                element.data(SHEET_ID, element.data(SHEET_ID) || Math.random());
                var id = element.data(SHEET_ID),
                    spec = _sheets[name];
                if (void 0 === spec) throw new Error("Sheet '" + name + "' is undefined.  Sheets must be defined using $media.$sheet before they can be applied with ts-sheet.");
                _elements[id] = element, _elementSheets[id] = _elementSheets[id] || [], _elementSheets[id].push(spec);
                var observer = _observers[id] = _observers[id] || new MutationObserver(_mutationCallback);
                observer.observe(element[0], OBSERVER_CONF), _updateElement(element)
            },
            $clearSheets: function(element, name) {
                var id = element.data(SHEET_ID);
                delete _sheets[name], delete _elementSheets[id], delete _elements[id], _observers[id].disconnect()
            },
            $query: function(mediaQueryName) {
                return _registeredMediaQueriesByName[mediaQueryName].conditionFn()
            }
        };
    this.$get = ["$window", function($window) {
        _addEvent($window, "resize", _windowResizeCallback);
        var DEFAULT_MEDIA_QUERIES = [{
                name: "xs",
                conditionFn: function() {
                    return !0
                },
                priority: 0
            }, {
                name: "sm",
                conditionFn: function() {
                    return $window.innerWidth >= 768
                },
                priority: 1
            }, {
                name: "md",
                conditionFn: function() {
                    return $window.innerWidth >= 992
                },
                priority: 2
            }, {
                name: "lg",
                conditionFn: function() {
                    return $window.innerWidth >= 1200
                },
                priority: 3
            }],
            DEFAULT_FIELD_HANDLERS = [];
        return angular.forEach(DEFAULT_MEDIA_QUERIES, function(mediaQuery) {
            _registerMediaQuery(mediaQuery.name, mediaQuery.conditionFn, mediaQuery.priority)
        }), angular.forEach(DEFAULT_FIELD_HANDLERS, function(fieldHandler) {
            _registerFieldHandler(fieldHandler.field, fieldHandler.handlerFn)
        }), $media
    }]
}), angular.module("ts.sheets").directive("tsSheet", ["$media", function($media) {
    return {
        restrict: "A",
        scope: !1,
        compile: function() {
            return {
                post: function(scope, element, attrs) {
                    scope.$$postDigest(function() {
                        $media.$applySheet(element, attrs.tsSheet)
                    }), scope.$on("$destroy", function() {
                        $media.$clearSheets(element, attrs.tsSheet)
                    })
                }
            }
        }
    }
}]);