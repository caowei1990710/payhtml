(function() {
    'use strict';

    angular
        .module('pmsJs')
        .service('permission', permission);

    /** @ngInject */
    function permission($window, base) {
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
        angular.extend(permission.prototype, base);
        var vm = this;
        vm.serviceName = 'permission';
        vm.get = function(){
          vm.emit('get', {});
        }
    }
})();
