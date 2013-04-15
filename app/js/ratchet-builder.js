var rbApp = angular.module('ratchet-builder', ['ratchet-builder-directives']);

rbApp.config(function ($routeProvider) {
    window.routeProvider = $routeProvider;

    $routeProvider.
        when('/home', {controller: PageCtrl, templateUrl: 'home.html'}).
        otherwise({redirectTo: '/home'});
    });

function PageCtrl ($scope, $location) {

    $scope.navTo = function (routeId) {
        console.log('[navTo] ' + routeId);
        $location.path(routeId);
    };
}

function PrototypeCtrl ($scope, $window) {

    var iphone = $(".iphone"),
        dockingOffset = ($(window).height() + 10 + $(".docs-masthead").height() - iphone.height())/2;

    iphone.css({top: Math.round(dockingOffset)});

    var cmModeToggle = $("#cm-mode");

    cmModeToggle.on("toggle", function () {
        $scope.$broadcast("cm-mode-change");
    });

    $scope.$on("code-change", function () {
        $scope.$broadcast("update-iwindow");
    });

    $scope.$on("json-change", function () {
        $scope.$broadcast("update-iwindow");
    });

    $(document).ready(function () {
        $scope.$broadcast("update-iwindow");
    });

    $(document).on("click.tab.data-api", "[data-toggle='tab']", function () {
        $scope.$broadcast("update-iwindow");
        $scope.$broadcast("tab-change");
    });

    $scope.historyItems = [];
    $scope.testAPI = function () {
        $scope.historyItems.push($scope.api);
        $scope.$broadcast("test-api");
    };

    $scope.recallHistory = function (item) {
        $scope.api = item;
        $scope.$broadcast("test-api");
    };
}

