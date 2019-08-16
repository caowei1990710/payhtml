(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('ManualCashinController', ManualCashinController);

  /** @ngInject */
  function ManualCashinController($scope, $log, $state, $rootScope, $interval, device, bankcard, bank, cashout, cashin, payment, alertify, $timeout) {
    var vm = this;
    vm.cancelLists = ['银行信息错误', '客人要求取消'];
    vm.deviceList = [];
    vm.bankList = [];
    vm.bankTypeList = [];
    vm.cardstatus;
    vm.query = {};
    vm.cancelItem = {};
    vm.run = true;
    vm.countNo = 10;
    vm.cashoutItems = [];
    $scope.destory;
    //$('#Extras').slideUp();
    //vm.getDeviceBankRelations = bankcard.getDeviceBankRelations;
    //if (!$rootScope.device) {
    //  $state.go('login');
    //  return;
    //}
    $scope.$on('$destroy', function () {
      $scope.destory = true;
    });
    $scope.$on('changtabar', function (event, data) {
      $scope.destory = (data != "手工付款");
      if (!$scope.destory) {
        $scope.getCountround();
      }
    });
    bankcard.getUserBankRelations($rootScope.user);
    bankcard.on('relieveDeviceBankRelations', function (data) {
      if (vm.cardstatus == 0) {
        vm.cardstatus == 1;
        vm.todo = "签出";
        if (!vm.begin)
          $scope.getCountround();
        $scope.destory = false;
      } else if (vm.cardstatus == 1) {
        vm.show = false;
        vm.cardstatus == 0;
        vm.cardOrder = undefined;
        vm.todo = "签入";
        $scope.destory = true;
      }
      //bankcard.getDeviceBankRelations($rootScope.device.id);
      bankcard.getUserBankRelations($rootScope.user);
    })
    cashout.on('getCashoutAndUserId', function (data) {
      //data.items = undefined;nl
      vm.cardOrder = data.items;
      if (data.items)
        vm.show = false;
      for (var i = 0; i < vm.querys.length; i++) {
        vm.querys[i].check = false;
        vm.querys[i].paymentamount = '';
        vm.querys[i].handCredit = '';
        vm.querys[i].src_balance = '';
      }
    })
    bankcard.on('getUserBankRelations', function (data) {
      vm.cardstatus = data.cardstatus;
      //vm.bankList = data.items
      $rootScope.paybankList = data.items;
      if (vm.cardstatus == 0) {
        vm.show = false;
        vm.todo = "签入";
        vm.cardOrder = undefined;
        $scope.destory = true;
      } else if (vm.cardstatus == 1) {
        vm.show = true;
        $scope.getCountround();
        $scope.destory = false;
        cashout.getCashoutAndUserId($rootScope.user);
        vm.todo = "签出";
      }
      //vm.bankList = data.items;
      vm.bankList = data.items;
      $rootScope.paybankList = data.items;
      vm.querys = data.items;
      if (vm.querys) {
        for (var i = 0; i < vm.querys.length; i++) {
          if ($rootScope.debug)
            vm.querys[i].inputCredit = vm.querys[i].credit;
        }
      }
      //vm.query = data.items[0];
    })
    $scope.getCountround = function () {
      vm.begin = true;
      if (vm.cardOrder) {
        return
      }
      $timeout(function () {
        vm.countNo--;
        if ($scope.destory)
          return;
        if (vm.countNo < 1) {
          vm.countNo = 10;
          cashout.getCashoutAndUserId($rootScope.user);
        }
        $scope.getCountround();
      }, 1000)
    }
    vm.getCredit = function (e) {
      bankcard.loadingBankCard(1, 1, {bankCard: vm.querys[e].bankCard});
    }
    bankcard.on('loadingBankCard', function (data) {
      vm.banklist = data.items;
      //angular.forEach(vm.querys, function (item, index) {
      //  if (vm.querys[index].bankCard == data.items[0].bankCard) {
      //    if(vm.querys[index].paymentamount && vm.querys[index].handCredit)
      //    vm.querys[index].src_balance = data.items[0].credit - vm.querys[index].paymentamount - vm.querys[index].handCredit;
      //  }
      //});
      //data.items[0].credit = vm.querys[]
    });
    vm.setCredit = function (e) {
      angular.forEach(vm.querys, function (item, index) {
        if (angular.isUndefined(vm.banklist)) {
          return;
        }
        if (vm.querys[index].bankCard == vm.banklist[0].bankCard) {
          if (vm.querys[index].paymentamount && vm.querys[index].handCredit)
             vm.querys[index].src_balance =(vm.banklist[0].credit - vm.querys[index].paymentamount - vm.querys[index].handCredit).toFixed(2);
            // vm.querys[index].src_balance =vm.banklist[0].credit - vm.querys[index].paymentamount - vm.querys[index].handCredit;
        }
      });
    }
    //$scope.getCountround();
    vm.deviceTask = function () {
      //if( vm.cardstatus == 1){
      //  var confirmDel = confirm("确认签出？");
      //  if(confirmDel){
      var items = [];
      for (var i = 0; i < vm.bankList.length; i++) {
        if (vm.bankList) {
          if ($('#query_' + i).is(':checked') || vm.cardstatus == 1) {
            //items[i] = vm.bankList[i];
            var item = {};
            if (!vm.bankList[i].inputCredit) {
              alertify.error($rootScope.lagconfig["未输入金额"]);
              return;
            }
            item.inputCredit = vm.bankList[i].inputCredit;
            //item.deviceId = $rootScope.device.id;
            item.transferStatus = vm.bankList[i].transferStatus;
            item.id = vm.bankList[i].id;
            items.push(item);
          }
        }
      }
      if (vm.cardstatus == 0) {
        bankcard.relieveDeviceBankRelations(items, 1);
      } else {
        var confirmDel = confirm("确认签出？");
        if (confirmDel)
          bankcard.relieveDeviceBankRelations(items, 0);
      }
      //  }
      //}
    }
    vm.finishTask = function () {
      var items = [];
      for (var i = 0; i < vm.querys.length; i++) {
        var item = {};
        item.src_bankcard = vm.querys[i].bankCard;
        item.dest_bankcard = vm.cardOrder.accountNo;
        item.handCredit = vm.querys[i].handCredit;
        item.paymentamount = vm.querys[i].paymentamount;
        item.src_balance = vm.querys[i].src_balance;
        item.operateUser = $rootScope.user.account;
        item.bonustask_id = vm.cardOrder.bonusTaskId;
        item.userId = $rootScope.user.id;
        //item.deviceId = $rootScope.device.id;
        if (vm.querys[i].check)
          items.push(item);
      }
      cashout.paymentCashout(items);
    }

    vm.getCashoutByDeviceId = cashout.getByDeviceId;
    cashout.on('getByDeviceId', function (data) {
      if (data.status == 200) {
        vm.cashoutList = data.items;
        vm.cashout = data.items[0];
      }
    })
    cashout.on('paymentCashout', function (data) {
      //$scope.getCountround();
      alertify.success($rootScope.lagconfig["操作成功"]);
      vm.cardOrder = undefined;
      vm.show = true;
      $scope.destory = false;
      $scope.getCountround();
      cashout.getCashoutAndUserId($rootScope.user);
    })
    cashout.on('getByCardNo', function (data) {
      vm.cardOrder = data.cashout;
      if (!data.task)
        cashout.execute(vm.cardOrder.id, vm.query.bankCard);
      else
      //vm.cardOrder = data.task;
        vm.taskId = data.task.transactionId;

    })

    vm.cancelTask = function () {
      vm.cancelItem.userId = $rootScope.user.id;
      vm.cancelItem.platformId = $rootScope.user.platformId;
      cashout.cancelCashoutAndUser(vm.cancelItem);
    }
    cashout.on('cancelCashoutAndUser', function (data) {
      cashout.getCashoutAndUserId($rootScope.user);
    })
  }
})();
