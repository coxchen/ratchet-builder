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