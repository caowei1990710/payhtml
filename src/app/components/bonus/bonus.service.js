(function () {
  'use strict';

  angular
    .module('pmsJs')
    .service('bonus', bonus);

  /** @ngInject */
  function bonus($window, base) {
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
    angular.extend(bonus.prototype, base);
    var vm = this;
    vm.serviceName = 'bonus';
    //提款提案
    vm.applyBonus = function (item) {
      vm.emit('applyBonus', {
        proposalId: item.proposalId,
        platformId: item.platformId,
        bonusId: item.bonusId,
        amount: item.amount,
        bankTypeId: item.bankTypeId,
        accountName: item.accountName,
        accountType: item.accountType,
        accountCity: item.accountCity,
        accountNo: item.accountNo,
        bankAddress: item.bankAddress,
        bankName: item.bankName,
        phone: item.phone,
        email: item.email
      });
    }
    vm.getBonusList = function (item) {
      vm.emit('getBonusList', {
        queryId: "1234"
      });
    }
  }
})();
