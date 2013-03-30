var rbApp = angular.module("ratchet-builder", ["ratchet-builder-directives"]);


function PrototypeCtrl ($scope, $window) {

    var iphone = $(".iphone"),
        dockingOffset = ($(window).height() + 20 + $(".docs-masthead").height() - iphone.height())/2;
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
        new FingerBlast('.iphone-content');
        new FingerBlast('.ratchet-component');
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

