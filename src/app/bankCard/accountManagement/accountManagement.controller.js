(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('AccountManagementController', AccountManagementController);

  /** @ngInject */
  function AccountManagementController($log, user, alertify, jQ, cardTypeList, $timeout, $filter, bankCardStatus, $rootScope, bankcard, $scope) {
    var vm = this;
    //vm.bankList = [];
    vm.platformList = ["代理1","代理2"];
    vm.bankTypeList = [];
    vm.editBankForm = {};
    vm.bankCardCredit = {};
    vm.cardTypeList = cardTypeList;
    vm.bankCardStatus = bankCardStatus;
    vm.platformlist = $rootScope.platformlist;
    vm.query = {};
    vm.createBankForm = {};
    //vm.createBankForm.user = {};
    vm.sizePerPage = 500;
    //vm.selecttype = false;
    vm.otherbankType = [{id: 'BACKUP', name: '平台备用金卡'}, {id: 'DEPOSIT', name: '收款卡'}, {id: 'PAYMENT', name: '付款卡'},{id: 'DOWNPLAY', name: '下发卡'}];
    vm.normalbankType = [{id: 'DOWNPLAY', name: '下发卡'}, {id: 'BACKUPMONEY', name: '备用金卡'}, {
      id: 'FORMONEY',
      name: '待用金卡'
    }];
    //vm.pluslist = [{id: 'DELETE_DEPOSIT_RECORD', name: '註銷'}, {id: 'MANUAL', name: '手动'}, {
    //  id: 'QUOTA_TRIAL',
    //  name: '測試額度'
    //}, {id: 'INTEREST', name: '利息'}, {
    //  id: 'CHARGE_FEE',
    //  name: '月費/短信費'
    //}, {id: 'RETURN_PAYFEE', name: '返回手续费'}, {id: 'PAYFEE_ADJUSTMENT', name: '付款手续费调整'}, {
    //  id: 'DATA_ADJUSTMENT',
    //  name: '丢失/数值调整'
    //}, {id: 'IPS', name: 'IPS下发'}];
    //vm.addlist = [{id: 'CASHIN', name: '收款'}, {id: 'UNCLAIMED', name: '提交未认领存款'}, {
    //  id: 'TRANSFER',
    //  name: '转账'
    //}, {id: 'TRANSFERPAYFEE', name: '转账手续费'}, {id: 'PAYFEE', name: '付款手续费'}, {
    //  id: 'PAYMENT',
    //  name: '付款'
    //}, {id: 'BUSINESSPAY', name: '业务支出'}, {id: 'BUSINESSPAYPAYFEE', name: '业务支出手续费'}, {
    //  id: 'CANCEL UNCLAIMED',
    //  name: '取消未认领提案'
    //}, {
    //  id: 'EXCUTEUNCLAIMED',
    //  name: '执行未认领存款提案'
    //}];
    vm.addlist = [{id: 'MANUAL', name: '手动'}, {
      id: 'QUOTA_TRIAL',
      name: '測試額度'
    }, {id: 'INTEREST', name: '利息'}, {
      id: 'CHARGE_FEE',
      name: '月費/短信費'
    }, {id: 'RETURN_PAYFEE', name: '返回手续费'}, {id: 'PAYFEE_ADJUSTMENT', name: '付款手续费调整'}, {
      id: 'DATA_ADJUSTMENT',
      name: '丢失/数值调整'
    }, {id: 'IPS', name: 'IPS下发'}];
    vm.pluslist = [{id: 'MANUAL', name: '手动'}, {
      id: 'QUOTA_TRIAL',
      name: '測試額度'
    }, {
      id: 'CHARGE_FEE',
      name: '月費/短信費'
    },  {id: 'PAYFEE_ADJUSTMENT', name: '付款手续费调整'}, {
      id: 'DATA_ADJUSTMENT',
      name: '丢失/数值调整'
    }, {id: 'IPS', name: 'IPS下发'}];
    vm.actionlist = {};
    vm.bccardtype = vm.otherbankType;
    $rootScope.bccardtype = $rootScope.cardtype;
    user.queryUser({}, 1, 1000);
    //user.on('queryUser', function (data) {
    //  $rootScope.userlists = data.items;
    //  //vm.total = data.total;
    //})
    //merchant.getMerchantList(1, {}, 1000);
    //merchant.on('getMerchantList', function (data) {
    //  $rootScope.merchantlists = data.items;
    //  //$rootScope.merchantlists = data.items;
    //})
    $rootScope.plusormultilist = [{id: '-1', name: '减去'}, {id: '1', name: '增加'}];
    //platform.once('getPlatformList', function (data) {
    //  if (data.status == 200) {
    //    vm.platformList = data.items;
    //    for (var i in data.items) {
    //      var tmp = data.items[i];
    //      vm['platformList' + tmp.id] = tmp;
    //    }
    //  }
    //});
    //user.queryUser({'platformId': vm.platformlist[0]}, 1, 1000);
    function loadingBankCard(page, shwoloading) {
      vm.page = page;
      //var query = {
      //  bankId: vm.query.bankId,
      //  bankCard: vm.query.bankCard,
      //  platformId: vm.query.platformId,
      //  type: vm.query.type,
      //  flag: vm.query.flag
      //};
      bankcard.loadingBankCard(vm.page, vm.sizePerPage, vm.query, shwoloading);
    }

    vm.getAlluser = function () {
      vm.createBankForm.platformId;
    }
    vm.changeBnaktype = function (e) {
      if (e)
        vm.bccardtype = vm.otherbankType;
      else
        vm.bccardtype = vm.normalbankType;
    }
    bankcard.on('getBankCardDayAmount', function (data) {
      angular.forEach(vm.bankList, function (item, index) {
        //console.log('index:'+index);
        if (item.bankCard == data.item.bankCard) {
          item.transactionForToday = data.item.credit;
        }
      })
    });
    vm.loadingBankCard = loadingBankCard;
    loadingBankCard(1, vm.sizePerPage);
    bankcard.on('loadingBankCard', function (data) {
      if (data.status == 200) {
        vm.bankList = data.items;
        angular.forEach(vm.bankList, function (item, index) {
          //console.log('index:'+index);
          item.createDate = $filter('dateFormate')(item.createDate);
          item.lastLockTime = $filter('dateFormate')(item.lastLockTime);
          bankcard.getBankCardDayAmount({'bankcardNo': item.bankCard});
        })
        vm.page = data.page;
        vm.sizePerPage = data.size;
        vm.total = data.total;
        if (vm.bankindex != undefined);
        vm.editBankForm = angular.copy(vm.bankList[vm.bankindex]);
      }
    });
    $scope.$watch('bc.createBankForm.bankId', function (newValue, oldValue, scope) {
      if (angular.isUndefined(newValue))
        return;//DEPOSIT selecttype
      if (newValue == "170") {
        scope.bc.createBankForm.type = "DEPOSIT";
        scope.$broadcast('selectdisable', {id: 'selecttype', result: true});
        //scope.bc.selecttype = false;
      }
      else {
        //scope.bc.selecttype = true;
        scope.$broadcast('selectdisable', {id: 'selecttype', result: false});
      }
      //else
      //  scope.valuelist = scope.addlist;
    })
    $scope.$watch('bc.editBankForm.bankId', function (newValue, oldValue, scope) {
      if (angular.isUndefined(newValue))
        return;//DEPOSIT selecttype
      if (newValue == "170") {
        scope.bc.editBankForm.type = "DEPOSIT";
        scope.$broadcast('selectdisable', {id: 'edittype', result: true});
        //scope.bc.selecttype = false;
      }
      else {
        //scope.bc.selecttype = true;
        scope.$broadcast('selectdisable', {id: 'edittype', result: false});
      }
      //else
      //  scope.valuelist = scope.addlist;
    })
    user.on('queryUser', function (data) {
      if (!$rootScope.userlists)
        $rootScope.userlists = data.items;
      vm.userdatas = data.items;
      //vm.total = data.total;
    })
    $scope.$watch('bc.createBankForm.platformId', function (newValue, oldValue, scope) {
      if (angular.isUndefined(newValue)) {
        vm.bccardtype = angular.copy($rootScope.cardtype);
      } else {
        if (newValue == "-1")
          vm.bccardtype = vm.normalbankType;
        else
          vm.bccardtype = vm.otherbankType;
        user.queryUser({'platformId': newValue}, 1, 1000);
      }
    })
    $scope.$watch('bc.editBankForm.platformId', function (newValue, oldValue, scope) {
      if (angular.isUndefined(newValue)) {
        vm.bccardtype = angular.copy($rootScope.cardtype);
      } else {
        if (newValue == "-1")
          vm.bccardtype = vm.normalbankType;
        else
          vm.bccardtype = vm.otherbankType;
        user.queryUser({'platformId': newValue}, 1, 1000);
      }
    })
    function createBankCard() {
      //var item = {
      //    bankId: vm.createBankForm.id,
      //    bankCard: vm.createBankForm.bankCard,
      //    cardName: vm.createBankForm.cardName,
      //    telephone: vm.createBankForm.telephone,
      //    platformId: vm.createBankForm.platformId,
      //    type: vm.createBankForm.type,
      //    credit: vm.createBankForm.credit,
      //    promptCredit:vm.createBankForm.promptCredit,
      //    flag: vm.createBankForm.flag,
      //    deviceId:vm.createBankForm.deviceId
      //}
      //vm.createBankForm.lastLockTime = $filter('dateFormate')(vm.createBankForm.downTime);
      if (vm.createBankForm.bankId != "170") {
        vm.createBankForm.image = undefined;
      }
      bankcard.createBankCard(vm.createBankForm);
      //bankcard.emit('createBankCard', {
      //    item: item
      //});
    }

    /*    $scope.$watch('bc.editBankForm.action', function (newValue, oldValue, scope) {
     if (angular.isUndefined(newValue))
     return;
     if(newValue =="-1")
     scope.valuelist = scope.pluslist;
     else
     scope.valuelist = scope.addlist;
     })*/
    vm.setAction = function () {
      if (vm.bankCardCredit.action == "-1")
        vm.valuelist = vm.pluslist;
      else
        vm.valuelist = vm.addlist;
      vm.valueitem = vm.valuelist[0];
    }
    vm.createBankCard = createBankCard;
    bankcard.on('createBankCard', function (data) {
      $rootScope.loading = false;
      alertify.success($rootScope.lagconfig["操作成功"]);
      jQ('#createBank').modal('hide');
      vm.createBankForm = {};
      loadingBankCard(vm.page);
    });
    vm.showeditMoney = function () {
      if (vm.bankindex > -1)
        jQ('#editMoney').modal('show');
      else
        alertify.error($rootScope.lagconfig['请先选择银行卡']);
    }
    function editBank(index) {
      //vm.bankItem = id;
      vm.bankindex = index;
      vm.editBankForm = angular.copy(vm.bankList[index]);
      if (vm.editBankForm.user)
        vm.editBankForm.user.id = vm.editBankForm.user.id + "";
      if (vm.editBankForm.merchant)
        vm.editBankForm.merchant.id = vm.editBankForm.merchant.id + "";
      vm.bankCardCredit.action = "-1";
      vm.editBankForm.lastLockTime = $filter('dateFormate')(vm.editBankForm.lastLockTime);
      /* for(var i = 0;i < vm.bankTypeList.length; i++){
       if(id == vm.bankTypeList[i].id){
       vm.bankItem = vm.bankTypeList[i];
       break;
       }
       }
       var tmp = vm.bankList[index];
       if (tmp && tmp.bankId == id) {
       vm.editBankForm = tmp;
       }*/
      return index;
    }

    vm.showeditBank = function () {
      if (vm.bankindex > -1)
        jQ('#editBank').modal('show');
      else
        alertify.error($rootScope.lagconfig['请先选择银行卡']);
    }
    vm.editBank = editBank;
    function updateBankCard() {
      jQ('#editBank').modal('hide');
      jQ('#editMoney').modal('hide');
      vm.editBankForm.lastLockTime = $filter('dateFormate')(vm.editBankForm.lastLockTime);
      if (vm.editBankForm.merchant && vm.editBankForm.merchant.id == "") {
        vm.editBankForm.merchant = undefined;
      }
      bankcard.updateBankCard(vm.editBankForm);
    }

    vm.updateBankCard = updateBankCard;
    vm.updateCreate = function () {
      vm.bankCardCredit.bankCard = vm.editBankForm.bankCard;
      vm.bankCardCredit.credit = parseInt(vm.bankCardCredit.action) * (vm.bankCardCredit.money);
      vm.bankCardCredit.type = vm.valueitem.id;
      vm.bankCardCredit.operator = $rootScope.user.account;
      bankcard.updateBankCardCredit(vm.bankCardCredit);
    };
    bankcard.on('updateBankCard', function (data) {
      if (data.status == 200) {
        loadingBankCard(1);
      }
    });
    bankcard.on('updateBankCardCredit', function (data) {
      if (data.status == 200) {
        jQ('#editMoney').modal('hide');
        loadingBankCard(1);
      }
    });
    //$(function (){
    //  $("[data-toggle='popover']").popover();
    //});
  }
})();
