(function() {
    'use strict';

    angular
        .module('pmsJs')
        .service('merchant', merchant);

    /** @ngInject */
    function merchant($window, base) {
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
        angular.extend(merchant.prototype, base);
        var vm = this;
        vm.serviceName = 'merchant';
        vm.getMerchantList = function (page, query,size) {
          vm.emit('getMerchantList', {
            page: page,
            size: size,
            item: query
          });
        }
    }
})();
