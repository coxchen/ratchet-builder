var rbDirect = angular.module("ratchet-builder-directives", []);

rbDirect.directive("iphoneWindow", function ($compile) {

    var linker = function (scope, element, attrs) {

        element.html(scope.content);
        $compile(element.contents())(scope);

        scope.$on("update-iwindow", function (event) {
            var compiled = jade.compile(scope.$parent.prototypeCode);
            element.html(compiled());
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

