var rbApp = angular.module("ratchet-builder", ["ratchet-builder-directives"]);


function PrototypeCtrl ($scope, $rootScope) {

    var iphone = $(".iphone"),
        dockingOffset = ($(window).height() + 20 + $(".docs-masthead").height() - iphone.height())/2;
    iphone.css({top: Math.round(dockingOffset)});

    var codeArea  = CodeMirror.fromTextArea( document.getElementById("code"), {
            theme : "eclipse",
            mode:  "htmlmixed",
            indentUnit: 4,
            lineNumbers: true
        });

    codeArea.on("change", function () {
        setTimeout(
            function () {
                if ($(".cm-error").length === 0) {
                    $scope.prototypeSrc = codeArea.getValue();
                    $rootScope.$broadcast("update-iwindow");
                }
            },
            100);
    });

    $scope.prototypeSrc = [
        "<header class=\"bar-title\">",
        "    <a class=\"button\" href=\"#\">Left</a>",
        "    <h1 class=\"title\">Title</h1>",
        "    <a class=\"button\" href=\"#\">Right</a>",
        "</header>",
        "",
        "<nav class=\"bar-tab\">",
        "    <ul class=\"tab-inner\">",
        "        <li class=\"tab-item active\">",
        "            <a href=\"\">",
        "                <i class=\"icon-compass\"></i>",
        "                <div class=\"tab-label\">Nearby</div>",
        "            </a>",
        "        </li>",
        "        <li class=\"tab-item\">",
        "            <a href=\"\">",
        "                <i class=\"icon-comment\"></i>",
        "                <div class=\"tab-label\">Chat</div>",
        "            </a>",
        "        </li>",
        "        <li class=\"tab-item\">",
        "            <a href=\"\">",
        "                <i class=\"icon-user\"></i>",
        "                <div class=\"tab-label\">Profile</div>",
        "            </a>",
        "        </li>",
        "    </ul>",
        "</nav>",
        "",
        "<div class=\"content\">",
        "    <ul class=\"list\">",
        "        <li>",
        "            <a href=\"#\">",
        "                List item 1",
        "                <span class=\"chevron\"></span>",
        "            </a>",
        "        </li>",
        "        <li>",
        "            <a href=\"#\">",
        "                List item 2",
        "                <span class=\"chevron\"></span>",
        "            </a>",
        "        </li>",
        "        <li>",
        "            <a href=\"#\">",
        "                List item 3",
        "                <span class=\"chevron\"></span>",
        "            </a>",
        "        </li>",
        "    </ul>",
        "</div>"
    ].join("\n");

    codeArea.setValue($scope.prototypeSrc);

    $(".CodeMirror").css("border", "1px solid #0d0d0d");

}

