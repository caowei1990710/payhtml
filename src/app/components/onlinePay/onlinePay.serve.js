(function() {
  'use strict';

  angular
    .module('pmsJs')
    .service('onlinePay', onlinePay);

  /** @ngInject */
  function onlinePay($window, base) {
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
    angular.extend(onlinePay.prototype, base);
    var vm = this;
    vm.serviceName = 'onlinePay';
    vm.getOnLineCashin = function(item,page,size){
      vm.emit('getOnLineCashin',{
        item: item,
        page:page,
        size:size
      })
    }
    vm.getOnLineCashinSum = function(item,page,size){
      vm.emit('getOnLineCashinSum',{
        item: item,
        page:page,
        size:size
      })
    }
    vm.upOnLineCashin = function(requestId){
      vm.emit('upOnLineCashin',{
        requestId: requestId
      })
    }
    vm.cancePluRedOnLineCashin = function(requestId){
      vm.emit('cancePluRedOnLineCashin',{
        requestId: requestId
      })
    }
  }
})();
