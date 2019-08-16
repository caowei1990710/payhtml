(function () {
  'use strict';

  angular
    .module('pmsJs')
    .service('gateWay', gateWay);

  /** @ngInject */
  function gateWay($window, base) {
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
    angular.extend(gateWay.prototype, base);
    var vm = this;
    vm.serviceName = 'gateWay';

    function getByMerchantId(merchantId) {
      vm.emit('getByMerchantId', {
        item: {
          merchantId: merchantId
        }
      });
    }

    vm.getByMerchantId = getByMerchantId;
    function getAllgateway() {
      vm.emit('getAllGateWay', {
        item: {}
      })
    }
    vm.getAllgateway = getAllgateway;
  }
})();
