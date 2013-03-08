var rbDirect = angular.module("ratchet-builder-directives", []);

rbDirect.directive("iphoneWindow", function ($compile) {

    var linker = function (scope, element, attrs) {

        element.html(scope.content);
        $compile(element.contents())(scope);

        scope.$on("update-iwindow", function (event) {
            element.html(scope.$parent.prototypeSrc);
            $compile(element.contents())(scope);
        });
    };

    return {
        restrict: "AE",
        replace: true,
        link: linker,
        scope: {
            content: '='
        }
    };
});