var rbApp = angular.module("ratchet-builder", ["ratchet-builder-directives"]);


function PrototypeCtrl ($scope, $rootScope) {

    var iphone = $(".iphone"),
        dockingOffset = ($(window).height() + 20 + $(".docs-masthead").height() - iphone.height())/2;
    iphone.css({top: Math.round(dockingOffset)});

    var codeArea  = CodeMirror.fromTextArea( document.getElementById("code"), {
            // theme : "eclipse",
            theme : "lesser-dark",
            indentUnit: 4,
            tabSize: 4,
            indentWithTabs: true,
            lineNumbers: true,
            matchBrackets : true
        });

    codeArea.on("change", function () {
        setTimeout(
            function () {
                if ($(".cm-error").length === 0) {
                    $scope.prototypeCode = codeArea.getValue();
                    $rootScope.$broadcast("update-iwindow");
                }
            },
            100);
    });

    $scope.prototypeCode = [
        "header.bar-title",
        "\ta.button(href=\"#\") Left",
        "\th1.title Title",
        "\ta.button(href=\"#\") Right",
        "\nnav.bar-tab",
        "\tul.tab-inner",
        "\t\tli.tab-item.active",
        "\t\t\ta",
        "\t\t\t\ti.icon-compass",
        "\t\t\t\t.tab-label Tab 1",
        "\t\tli.tab-item",
        "\t\t\ta",
        "\t\t\t\ti.icon-user",
        "\t\t\t\t.tab-label Tab 2",
        "\n.content.content-padded",
        "\tul.list",
        "\t\tli some list item"
    ].join("\n");

    // $scope.prototypeCode = [
    //     "<header class=\"bar-title\">",
    //     "    <a class=\"button\" href=\"#\">Left</a>",
    //     "    <h1 class=\"title\">Title</h1>",
    //     "    <a class=\"button\" href=\"#\"><i class=\"icon-cog\"></i></a>",
    //     "</header>",
    //     "",
    //     "<nav class=\"bar-tab\">",
    //     "    <ul class=\"tab-inner\">",
    //     "        <li class=\"tab-item active\">",
    //     "            <a href=\"\">",
    //     "                <i class=\"icon-compass\"></i>",
    //     "                <div class=\"tab-label\">Nearby</div>",
    //     "            </a>",
    //     "        </li>",
    //     "        <li class=\"tab-item\">",
    //     "            <a href=\"\">",
    //     "                <i class=\"icon-comment\"></i>",
    //     "                <div class=\"tab-label\">Chat</div>",
    //     "            </a>",
    //     "        </li>",
    //     "        <li class=\"tab-item\">",
    //     "            <a href=\"\">",
    //     "                <i class=\"icon-user\"></i>",
    //     "                <div class=\"tab-label\">Profile</div>",
    //     "            </a>",
    //     "        </li>",
    //     "    </ul>",
    //     "</nav>",
    //     "",
    //     "<div class=\"content\">",
    //     "    <ul class=\"list\">",
    //     "        <li>",
    //     "            <a href=\"#\">",
    //     "                List item 1",
    //     "                <span class=\"chevron\"></span>",
    //     "            </a>",
    //     "        </li>",
    //     "        <li>",
    //     "            <a href=\"#\">",
    //     "                List item 2",
    //     "                <span class=\"chevron\"></span>",
    //     "                <span class=\"count\">2</span>",
    //     "            </a>",
    //     "        </li>",
    //     "        <li>",
    //     "            List item 3",
    //     "            <div class=\"toggle\">",
    //     "                <div class=\"toggle-handle\"></div>",
    //     "            </div>",
    //     "        </li>",
    //     "    </ul>",
    //     "</div>"
    // ].join("\n");

    codeArea.setValue($scope.prototypeCode);

    // $(".CodeMirror").css("border", "1px solid #0d0d0d");

    setTimeout(function () {
        new FingerBlast('.iphone-content');
    }, 100);
}

