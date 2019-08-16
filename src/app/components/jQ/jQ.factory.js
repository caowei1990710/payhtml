(function() {
    'use strict';

    angular
        .module('pmsJs')
        .factory('jQ', jQ);

    /** @ngInject */
    function jQ($window) {
        return $window.jQuery;
    }
})();