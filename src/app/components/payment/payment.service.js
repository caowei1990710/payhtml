(function() {
    'use strict';

    angular
        .module('pmsJs')
        .service('payment', payment);

    /** @ngInject */
    function payment($window, base) {
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
        angular.extend(payment.prototype, base);
        var vm = this;
        vm.serviceName = 'payment';
        //存款提案
        vm.requestManualBankCard = function(item){
          vm.emit('requestManualBankCard',{
            proposalId:item.proposalId,
            platformId:item.platformId,
            userName:item.userName,
            realName:item.realName,
            amount:item.amount,
            ip:item.ip,
            depositMethod:item.depositMethod,
            bankTypeId:item.bankTypeId,
            bankCardNo:item.bankCardNo,
            provinceId:item.provinceId,
            cityId:item.cityId,
            districtId:item.districtId,
            groupBankcardList:item.groupBankcardList
          })
        }
    }
})();
