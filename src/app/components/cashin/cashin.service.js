(function() {
    'use strict';

    angular
        .module('pmsJs')
        .service('cashin', cashin);

    /** @ngInject */
    function cashin($window, base) {
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
        angular.extend(cashin.prototype, base);
        var vm = this;
        vm.serviceName = 'cashin';
    }
})();