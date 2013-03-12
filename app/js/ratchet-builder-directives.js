var rbDirect = angular.module("ratchet-builder-directives", []);

rbDirect.directive("iphoneWindow", function ($compile) {

    var linker = function (scope, element, attrs) {

        var compiler = {
            "jade": {
                "compile": function (src) {
                    var compiled = jade.compile(src);
                    element.html(compiled());
                    $compile(element.contents())(scope);
                }
            },
            "htmlmixed": {
                "compile": function (src) {
                    element.html(src);
                    $compile(element.contents())(scope);
                }
            }
        };

        scope.$on("update-iwindow", function (event) {
            var activeCodeArea = angular.element($(".tab-pane.active code-area")),
                srcCode = activeCodeArea.scope().prototypeCode;
            compiler[activeCodeArea.scope().mode].compile(srcCode);
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

rbDirect.directive("codeArea", function ($compile) {

    var linker = function (scope, element, attrs) {

        scope.code = {
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

        var _getCMMode = function () {
            return $("#cm-mode").hasClass("active") ? "jade" : "htmlmixed";
        };

        scope.mode = _getCMMode();

        var cm = CodeMirror(element[0], {
            theme : "lesser-dark",
            mode: scope.mode,
            indentUnit: 4,
            tabSize: 4,
            indentWithTabs: false,
            smartIndent: false,
            lineNumbers: true,
            matchBrackets : true
        });

        cm.setValue(scope.code[scope.mode]);
        scope.prototypeCode = cm.getValue();

        scope.$on("cm-mode-change", function () {
            scope.mode = _getCMMode();
            cm.setValue(scope.code[scope.mode]);
            scope.prototypeCode = cm.getValue();
        });

        scope.$on("tab-change", function () {
            cm.refresh();
        });

        cm.on("change", function () {
            setTimeout(
                function () {
                    if (element.find(".cm-error").length === 0) {
                        scope.prototypeCode = cm.getValue();
                        scope.code[scope.mode] = scope.prototypeCode;
                        scope.$emit("code-change");
                    }
                },
                100);
        });
    };

    return {
        restrict: "E",
        replace: true,
        link: linker,
        scope: {
            content: '='
        }
    };
});

