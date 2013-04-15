var rbServ = angular.module('ratchet-builder-services', []);

rbServ.factory('render', [function () {
    return {
        jade: function (src) {
            var compiled = jade.compile(src);
            return compiled();
        },
        htmlmixed: function (src) {
            return src;
        }
    };
}]);

rbServ.factory('codeSnippet', [function () {
    return {
        page1: {
            jade: [
                "header.bar-title",
                "    h1.title Page 1",
                "\n.content",
                "    ul.list",
                "        li",
                "            a(href=\"page2.html\") Page 2",
                "            span.chevron"
            ].join("\n"),
            htmlmixed: [
                "<header class=\"bar-title\">",
                "    <h1 class=\"title\">Page 1</h1>",
                "</header>",
                "",
                "<div class=\"content\">",
                "    <ul class=\"list\">",
                "        <li>",
                "            <a href=\"page2.html\">",
                "                Page 2",
                "                <span class=\"chevron\"></span>",
                "            </a>",
                "        </li>",
                "    </ul>",
                "</div>"
            ].join("\n")
        },
        page2: {
            jade: [
                "header.bar-title",
                "    a.button-prev(href=\"page1.html\") Page 1",
                "    h1.title Page 2",
                "\n.content",
                "    ul.list",
                "        li(ng-repeat=\"item in items\")",
                "            span {{item.name}}",
                "            span.count {{item.count}}",
                "        li some other list item"
            ].join("\n"),
            htmlmixed: [
                "<header class=\"bar-title\">",
                "    <a class=\"button-prev\" href=\"page1.html\">Page 1</a>",
                "    <h1 class=\"title\">Page 2</h1>",
                "</header>",
                "",
                "<div class=\"content\">",
                "    <ul class=\"list\">",
                "        <li ng-repeat=\"item in items\">",
                "            <span>{{item.name}}</span>",
                "            <span class=\"count\">2</span>",
                "        </li>",
                "        <li>",
                "            some other list item",
                "        </li>",
                "    </ul>",
                "</div>"
            ].join("\n")
        }
    };
}]);

