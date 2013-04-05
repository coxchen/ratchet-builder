var rbDirect = angular.module("ratchet-builder-directives", []);

rbDirect.directive("iphoneWindow", function ($compile) {

    var linker = function (scope, element, attrs) {

        var compiler = {
            "jade": {
                "compile": function (src, aScope) {
                    var compiled = jade.compile(src);
                    element.html(compiled());
                    $compile(element.contents())(aScope);
                }
            },
            "htmlmixed": {
                "compile": function (src, aScope) {
                    element.html(src);
                    $compile(element.contents())(aScope);
                }
            }
        };

        var newScope = null;

        scope.$on("update-iwindow", function (event) {
            var activeCodeArea = angular.element($(".tab-pane.active code-area")),
                srcCode = activeCodeArea.scope().prototypeCode;

            if (newScope) newScope.$destroy();
            newScope = scope.$new(true);
            compiler[activeCodeArea.scope().mode].compile(srcCode, newScope);

            var jsonArea = angular.element($("api-json")),
                providedJSON = jsonArea.scope().json;

            for (var key in providedJSON) {
                newScope[key] = providedJSON[key];
            }

            scope.$apply();
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
                "    h1.title {{myTitle}}",
                "    a.button(href=\"#\")",
                "        i(ng-class=\"rightBtn\")",
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
                "        li(ng-repeat=\"item in items\")",
                "            span {{item.name}}",
                "            span.count {{item.count}}",
                "        li some other list item",
                "            span.chevron"
            ].join("\n"),
            "htmlmixed": [
                "<header class=\"bar-title\">",
                "    <a class=\"button\" href=\"#\">Left</a>",
                "    <h1 class=\"title\">{{myTitle}}</h1>",
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

        cm.addKeyMap({
            Tab: function (cm) {
                var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
                cm.replaceSelection(spaces, "end", "+input");
            }
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

rbDirect.directive("apiJson", function ($compile, $http) {

    var linker = function (scope, element, attrs) {

        var cm = CodeMirror(element[0], {
            theme : "lesser-dark",
            mode: {name: "javascript", json: true},
            indentUnit: 4,
            tabSize: 4,
            indentWithTabs: false,
            smartIndent: true,
            lineNumbers: true,
            matchBrackets : true,
            autoClearEmptyLines : true
        });

        var defaultJSON = {
            "myTitle": "Title Bar",
            "rightBtn": "icon-edit",
            "items": [
                {"name": "item 1", "count": 3},
                {"name": "item 2", "count": 4}
            ]
        };

        cm.setValue(jsl.format.formatJson(JSON.stringify(defaultJSON)));
        scope.json = jsl.parser.parse(cm.getValue());

        cm.on("change", function () {
            setTimeout(
                function () {
                    try {
                        var parseResult = jsl.parser.parse(cm.getValue());
                        scope.json = parseResult;
                        scope.$emit("json-change");
                    } catch (parseException) {
                        // console.log(parseException.message);
                    }
                },
                100);
        });

        scope.$on("test-api", function () {
            console.log(scope.$parent.api);

            var urlStr = scope.$parent.api;
            $http({method: "GET", url: urlStr}).
                success(function (data, status, headers, config) {
                    var jsonStr = JSON.stringify(data),
                        formattedJSON = jsl.format.formatJson(jsonStr);
                    cm.setValue(formattedJSON);
                }).
                error(function (data, status, headers, config) {
                    console.log("# got some error");
                });
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

