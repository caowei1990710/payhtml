(function () {
  'use strict';

  angular
    .module('pmsJs')
    .service('bankcard', bankcard);

  /** @ngInject */
  function bankcard($window, base,$rootScope) {
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
    // "isValidUsername",createTransfReminder
    // "authenticate"
    angular.extend(bankcard.prototype, base);
    var vm = this;
    vm.serviceName = 'bankcard';
    vm.getBankCardByUser = function(item){
      vm.emit('getBankCardByUser',{
        item:{
          user:item
        }
      })
    }

    function loadingBankCard(page, size, query,showloading) {
      vm.emit('loadingBankCard', {
        page: page,
        size: size,
        item: query
      },'',showloading);
    }

    vm.updateBankCardCredit = function (item) {
      vm.emit('updateBankCardCredit', {
        item: item
      })
    }
    vm.createBankCard = function (item) {
      $rootScope.loading = true;
      vm.emit('createBankCard', {
        item: item
      });
    }
    //vm.getBankcardList = function(item){
    //  vm.emit('getBankcardList',{
    //    queryId:'1234',
    //    platformId:'1'
    //  })
    //}
    //vm.getBankTypeList = function(item){
    //  vm.emit('getBankTypeList',{
    //    queryId:'1234',
    //  })
    //}
    //vm.getBankcard = function(){
    //  vm.emit('getBankcard',{
    //    queryId:'1234',
    //    accountNumber:'6212261913000987225'
    //  })
    //}
    vm.getBankCardDayAmount = function(item){
      vm.emit('getBankCardDayAmount', {
        item:item
      });
    }
    vm.createTransfReminder = createTransfReminder;
    function createTransfReminder(page, size,query) {
      vm.emit('createTransfReminder', {
        page: page,
        size: size,
        item:query
      });
    }

    vm.getUserBankRelations = function (item) {
      vm.emit('getUserBankRelations', {
        item: {
          user: item
        }
      });
    }
    vm.cardDepositList = cardDepositList;
    function cardDepositList() {
      vm.emit('cardDepositList', {});
    }

    vm.loadingBankCard = loadingBankCard;

    function updateBankCard(input,showloading) {
      vm.emit('updateBankCard', {
        item: input
      },'',showloading);
    }

    vm.updateBankCard = updateBankCard;

    function getByDeviceId(id) {
      vm.emit('getByDeviceId', {
        item: {
          deviceId: id
        }
      });
    }

    vm.getDeviceBankRelations = getDeviceBankRelations;
    function getDeviceBankRelations(id) {
      vm.emit('getDeviceBankRelations', {
        item: {
          deviceId: id
        }
      });
    }

    //vm.updateBankCardCredit = updateBankCardCredit;
    //function updateBankCardCredit(item){
    //  vm.emit('getDeviceBankRelations', {
    //    item:item
    //  });
    //}
    vm.relieveDeviceBankRelations = relieveDeviceBankRelations;
    function relieveDeviceBankRelations(allitems,status) {
      //var items = "[";
      //for (var i = 0; i < allitems.length; i++) {
      //  items += '{"inputCredit":' + allitems[i].inputCredit + ',"deviceId":' + deviceid + ",transferStatus:" + status + ",id:" + allitems[i].id + '}';
      //  if (i < allitems.length - 1) {
      //    items += ',';
      //  }
      //}
      //items += ']';
      vm.emit('relieveDeviceBankRelations',{
        items:allitems,
        cardstatus:status
      })
    }

    vm.getByDeviceId = getByDeviceId;

    function updateState(id, state, deviceId) {
      vm.emit('updateState', {
        item: {
          id: id,
          state: state,
          deviceId: deviceId
        }
      });
    }

    vm.updateState = updateState;
  }
})();
