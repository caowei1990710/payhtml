(function() {
    'use strict';

    angular
        .module('pmsJs')
        .service('bank', bank);

    /** @ngInject */
    function bank($window, base) {
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
        angular.extend(bank.prototype, base);
        var vm = this;
        vm.serviceName = 'bank';

        function get() {
            vm.emit('get', {});
        }
        vm.get = get;
    }
})();
