(function () {
  'use strict';

  angular
    .module('pmsJs')
    .service('matchingcashintask', matchingcashintask);

  /** @ngInject */
  function matchingcashintask($window, base) {
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
    angular.extend(matchingcashintask.prototype, base);
    var vm = this;
    vm.serviceName = 'matchingCashInTask';
    vm.queryAutoMatching = queryAutoMatching;
    function queryAutoMatching(page, item,size) {
      vm.emit('queryAutoMatching', {
        page: page,
        size: size,
        item: item
      })
    }
    vm.queryMatchingCashIn = queryMatchingCashIn;
    function queryMatchingCashIn(page,item,size){
      vm.emit('queryMatchingCashIn', {
        page: page,
        size: size,
        item: item
      })
    }
    //查询匹配目标的list
    vm.queryMatchDepositList = queryMatchDepositList;
    function queryMatchDepositList(page,item){
      vm.emit('queryMatchDepositList', {
        page: page,
        size: 10,
        item: item
      })
    }
    vm.manualMatchingReq = manualMatchingReq;
    function manualMatchingReq(item){
      vm.emit('manualMatchingReq',{
       item:item
      });
    }
  }
})();
