(function() {
  'use strict';

  angular
    .module('pmsJs')
    .service('transactionTask', transactionTask);

  /** @ngInject */
  function transactionTask($window, base) {
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
    angular.extend(transactionTask.prototype, base);
    var vm = this;
    vm.serviceName = 'transactionTask';
    vm.queryTransferTaskReq = queryTransferTaskReq;
    function queryTransferTaskReq(page,size,query){
      vm.emit('queryTransferTaskReq', {
        page: page,
        size: size,
        item: query
      });
    }
    //vm.queryTransferTaskReq = function(page,size,query){
    //  vm.emit('queryTransferTaskReq', {
    //    page: page,
    //    size: size,
    //    item: query
    //  });
    vm.autoPaymentTrans = function(page,size,query){
      vm.emit('autoPaymentTrans', {
        page: page,
        size: size,
        item: query,
      });
    }
    vm.receiveTransferTaskReq = receiveTransferTaskReq;
    function receiveTransferTaskReq(item){
      vm.emit('receiveTransferTaskReq',{
        "item":{
          "transaction_id":item.transaction_id,
          "operateuser":item.operateuser,
          "operatestatus":item.operatestatus,
          "amount":item.amount,
          "handCredit":item.handCredit
        }
      })
    }
  }
})();
