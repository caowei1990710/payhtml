(function() {
    'use strict';

    angular
        .module('pmsJs')
        .service('randomId', randomId);

    /** @ngInject */
    function randomId() {
        var vm = this;

        function get() {
            return new Date().getTime() + Math.random().toString(36).substr(2, 5);
        }
        vm.get = get;
    }
})();