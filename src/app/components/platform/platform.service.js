(function() {
    'use strict';

    angular
        .module('pmsJs')
        .service('platform', platform);

    /** @ngInject */
    function platform($window, base) {
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
        angular.extend(platform.prototype, base);
        var vm = this;
        vm.serviceName = 'platform';

        function getPlatformList() {
            vm.emit('getPlatformList', {});
        }
        vm.getPlatformList = getPlatformList;
    }
})();