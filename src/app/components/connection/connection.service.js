(function() {
    'use strict';

    angular
        .module('pmsJs')
        .service('connection', connection);

    /** @ngInject */
    function connection($window, base) {
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
        angular.extend(connection.prototype, base);
        var vm = this;
        vm.serviceName = 'connection';
        vm.login = function (item) {
          vm.emit('login', {
            name: item.name,
            password: item.password
          });
        }
    }
})();
