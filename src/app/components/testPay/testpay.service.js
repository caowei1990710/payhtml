(function() {
    'use strict';

    angular
        .module('pmsJs')
        .service('testpay', testpay);

    /** @ngInject */
    function testpay($window, base) {
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
        angular.extend(testpay.prototype, base);
        var vm = this;
        vm.serviceName = 'testpay';

        //function getPlatformList() {
        //    vm.emit('getPlatformList', {});
        //}
        //vm.getPlatformList = getPlatformList;
    }
})();
