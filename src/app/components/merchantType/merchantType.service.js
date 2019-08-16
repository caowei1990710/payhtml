(function() {
    'use strict';

    angular
        .module('pmsJs')
        .service('merchantType', merchantType);

    /** @ngInject */
    function merchantType($window, base) {
        // "create",
        // "get",
        // "update",
        // "captcha",
        // "login",
        // "logout",
        // "isLogin",
        // "getSMSCode",
        // "updatePaymentInfo",
        // "updatePassword",
        // "updateSMSSetting",
        // "isValidUsername",
        // "authenticate"
        angular.extend(merchantType.prototype, base);
        var vm = this;
        vm.serviceName = 'merchantType';

        function get() {
            vm.emit('get', {});
        }
        vm.get = get;
    }
})();