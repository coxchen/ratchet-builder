var rbDirect = angular.module("ratchet-builder-directives", []);

rbDirect.directive("iphoneWindow", function ($compile) {

    var linker = function (scope, element, attrs) {
        console.log(scope);
        console.log(element);
        console.log(attrs);

        element.html(scope.content);
        $compile(element.contents())(scope);

        scope.$parent.$watch("prototypeSrc", function () {
            // console.log(scope.$parent.prototypeSrc);
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