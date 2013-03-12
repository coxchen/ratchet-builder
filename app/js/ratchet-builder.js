var rbApp = angular.module("ratchet-builder", ["ratchet-builder-directives"]);


function PrototypeCtrl ($scope, $rootScope, $window) {

    $scope.mode = "jade";

    var iphone = $(".iphone"),
        dockingOffset = ($(window).height() + 20 + $(".docs-masthead").height() - iphone.height())/2;
    iphone.css({top: Math.round(dockingOffset)});

    var codeArea  = CodeMirror.fromTextArea( document.getElementById("code"), {
            // theme : "eclipse",
            theme : "lesser-dark",
            mode: $scope.mode,
            indentUnit: 4,
            tabSize: 4,
            indentWithTabs: false,
            smartIndent: false,
            lineNumbers: true,
            matchBrackets : true
        });

    codeArea.on("change", function () {
        setTimeout(
            function () {
                if ($(".cm-error").length === 0) {
                    $scope.prototypeCode = codeArea.getValue();
                    $scope.code[$scope.mode] = $scope.prototypeCode;
                    $rootScope.$broadcast("update-iwindow");
                }
            },
            100);
    });

    var cmModeToggle = $("#cm-mode");

    cmModeToggle.on("toggle", function () {
        if (cmModeToggle.hasClass("active")) {
            $scope.mode = "jade";
        } else {
            $scope.mode = "htmlmixed";
        }
        console.log("# mode: " + $scope.mode);

        codeArea.setOption("mode", $scope.mode);
        codeArea.setValue($scope.code[$scope.mode]);

        // $rootScope.$broadcast("update-iwindow");
    });

    $scope.code = {
        "jade": [
            "header.bar-title",
            "    a.button(href=\"#\") Left",
            "    h1.title Title",
            "    a.button(href=\"#\") Right",
            "\nnav.bar-tab",
            "    ul.tab-inner",
            "        li.tab-item.active",
            "            a",
            "                i.icon-compass",
            "                .tab-label Tab 1",
            "        li.tab-item",
            "            a",
            "                i.icon-user",
            "                .tab-label Tab 2",
            "\n.content.content-padded",
            "    ul.list",
            "        li some list item"
        ].join("\n"),
        "htmlmixed": [
            "<header class=\"bar-title\">",
            "    <a class=\"button\" href=\"#\">Left</a>",
            "    <h1 class=\"title\">Title</h1>",
            "    <a class=\"button\" href=\"#\"><i class=\"icon-cog\"></i></a>",
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
            "                <span class=\"count\">2</span>",
            "            </a>",
            "        </li>",
            "        <li>",
            "            List item 3",
            "            <div class=\"toggle\">",
            "                <div class=\"toggle-handle\"></div>",
            "            </div>",
            "        </li>",
            "    </ul>",
            "</div>"
        ].join("\n")
    };

    $scope.prototypeCode = $scope.code[$scope.mode];
    codeArea.setValue($scope.prototypeCode);

    // $(".CodeMirror").css("border", "1px solid #0d0d0d");

    setTimeout(function () {
        new FingerBlast('.iphone-content');
        new FingerBlast('.ratchet-component');
    }, 100);
}

