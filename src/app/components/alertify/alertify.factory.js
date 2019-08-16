(function() {
    'use strict';

    angular
        .module('pmsJs')
        .factory('alertify', alertify);

    /** @ngInject */
    function alertify($window) {
        return $window.alertify;
    }
})();