(function () {
  'use strict';

  angular
    .module('pmsJs')
    .service('creditlog', creditlog);

  /** @ngInject */
  function creditlog($window, base, $rootScope) {
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
    angular.extend(creditlog.prototype, base);
    var vm = this;
    vm.serviceName = 'creditlog';
    vm.getCreditLogListReq = function (item, page, size) {
      vm.emit('getCreditLogListReq', {
        page: page,
        size: size,
        item: item
      })
    }
    vm.getCreditLogByBankListReq = function (item, page, size) {
      vm.emit('getCreditLogByBankListReq', {
        page: page,
        size: size,
        item: item
      })
    }
  }
})();
