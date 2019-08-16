(function() {
    'use strict';

    angular
        .module('pmsJs')
        .service('transLimit', transLimit);

    /** @ngInject */
    function transLimit($window, base) {
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
        angular.extend(transLimit.prototype, base);
        var vm = this;
        vm.serviceName = 'transLimit';

        function getByMerchantId(merchantId) {
            vm.emit('getByMerchantId', {
                item: {
                    merchantId: merchantId
                }
            });
        }
        vm.getByMerchantId = getByMerchantId;
        function getAllTransLimit() {
          vm.emit('getAllTransLimit', {
            item: {}
          });
        }
        vm.getAllTransLimit = getAllTransLimit;
    }
})();
