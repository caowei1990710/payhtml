(function () {
  'use strict';

  angular
    .module('pmsJs')
    .service('cashout', cashout);

  /** @ngInject */
  function cashout($window, base) {
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
    angular.extend(cashout.prototype, base);
    var vm = this;
    vm.serviceName = 'cashout';
    vm.getCashoutAndDeviceId = getCashoutAndDeviceId;
    function getCashoutAndDeviceId(item, user) {
      vm.emit('getCashoutAndDeviceId', {
        item: {
          user: item
        }
      })
    }

    vm.getCashoutAndUserId = function (item) {
      vm.emit('getCashoutAndUserId', {
        item: {

          user: {
            id: item.id,
            username: item.username,
            platformId: item.platformId
          }
        }
      })
    }
    function getByDeviceId(id) {
      vm.emit('getByDeviceId', {
        item: {
          deviceId: id
        }
      })
    }

    vm.getByDeviceId = getByDeviceId;
    function getByCardNo(cardNo) {
      vm.emit('getByCardNo', {
        item: {
          cardNo: cardNo
        }
      })
    }

    vm.getByCardNo = getByCardNo;
    function execute(cashoutId, bankcardNo) {
      vm.emit('execute', {
        item: {
          cashoutId: cashoutId,
          bankcardNo: bankcardNo
        }
      })
    }

    vm.execute = execute;
    function cancel(cashoutId, taskId) {
      vm.emit('cancel', {
        item: {
          cashoutId: cashoutId,
          taskId: taskId
        }
      })
    }

    vm.paymentCashout = paymentCashout;
    function paymentCashout(item) {
      vm.emit('paymentCashout', {
        items: item
      })
    }

    vm.cancelCashoutAndUser = cancelCashoutAndDeviceId;
    function cancelCashoutAndDeviceId(item) {
      vm.emit('cancelCashoutAndUser', {
        item: item
      })
    }

    //cashoutId: 4, //付款记录ID
    //  bankCardId: 2, //银行卡ID
    //  taskId: 3, //付款任务ID
    //  status: 'EXECUTED',
    //  credit: 10000 //银行卡余额

    vm.cancel = cancel;
    function upStatus(cashoutId, bankCardId, taskId, status, credit) {
      vm.emit('upStatus', {
        item: {
          cashoutId: cashoutId,
          bankCardId: bankCardId,
          taskId: taskId,
          status: status,
          credit: credit
        }
      })
    }

    vm.upStatus = upStatus;
  }
})();
