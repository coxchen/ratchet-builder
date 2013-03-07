var rbApp = angular.module("ratchet-builder", ["ratchet-builder-directives"]);


function PrototypeCtrl ($scope, $rootScope) {

    var iphone = $('.iphone'),
        dockingOffset = ($(window).height() + 20 + $('.docs-masthead').height() - iphone.height())/2;
    iphone.css({top: dockingOffset});

    $scope.prototypeSrc = [
        "<header class='bar-title'>",
        "    <a class='button' href='#'>Left</a>",
        "    <h1 class='title'>Title</h1>",
        "    <a class='button' href='#'>Right</a>",
        "</header>"
    ].join("\n");

}

