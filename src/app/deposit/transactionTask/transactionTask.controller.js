(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('TransactionTaskController', TransactionTaskController);

  /** @ngInject */
  function TransactionTaskController($scope, bankCardStatus, manualDeposit, $filter, jQ, $rootScope) {
    var vm = this;
    vm.bankCardStatus = bankCardStatus;
    vm.select = {userAccount: $rootScope.username};
    vm.pagesize = 500;
    //vm.select =  {"startTime": "2015-10-02 12:39:22", "endTime": "2016-05-02 12:39:22", "payer": "an", "paymentType": "ATM", "userAccount": "tes", "receiveBankCard": "1"}
    vm.getTranList = function (page) {
      if (vm.select.BankCard)
        vm.select.receiveBankCard = vm.select.BankCard.bankCard;
      manualDeposit.querryDeposit(page, vm.pagesize, vm.select);
      //if (vm.index)
      //  vm.tranListitem = angular.copy(vm.tranList[e]);
    };
    $scope.$on('changtabar', function (event, data) {
      if (data == "收款明细")
        vm.getTranList(1);
    });
    //manualDeposit.querryDeposit(1, 10, {"userAccount": vm.user.username});
    //vm.getTranList(1);
    vm.clickItem = function (e) {
      vm.index = e;
      vm.tranListitem = angular.copy(vm.tranList[e]);
      vm.tranListitem.depositTime = $filter('dateFormate')(vm.tranListitem.depositTime);
    }
    vm.editItem = function () {
      //vm.tranList.depositAddress = "北京";
      //vm.tranList[vm.index].depositTime =$filter('dateFormate')(vm.tranList[vm.index].depositTime);
      manualDeposit.updateDeposit(vm.tranListitem);
      jQ('#editDepositlist').modal('hide');
    }
    manualDeposit.on('updateDeposit', function (data) {
      manualDeposit.querryDeposit(vm.page, vm.pagesize, {});
    })
    manualDeposit.on('querryDeposit', function (data) {
      vm.page = data.page;
      $rootScope.item = data.items[0];
      vm.tranList = data.items;
      angular.forEach(vm.tranList, function (item, index) {
        //console.log('index:'+index);
        item.depositTime = $filter('dateFormate')(item.depositTime);
      })
      vm.transactionpage = data.page;
      vm.transactiontotal = data.total;
      if (vm.index != undefined)
        vm.tranListitem = vm.tranList[vm.index];
    });
  }
})();
