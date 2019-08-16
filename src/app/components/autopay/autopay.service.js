(function () {
  'use strict';

  angular
    .module('pmsJs')
    .service('autopay', autopay);

  /** @ngInject */
  function autopay($window, base) {
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
    angular.extend(autopay.prototype, base);
    var vm = this;
    vm.serviceName = 'autopay';
    function autoPayment(item,page,size) {
      vm.emit('autoPayment', {
        item: item,
        page: page,
        size: size
      });
    }
    vm.autoPaymentTrans = function(page,size,query){
      vm.emit('autoPaymentTrans', {
        page: page,
        size: size,
        item: query,
      });
    }
    vm.autoPayment = autoPayment;
  }
})();
