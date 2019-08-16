(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('AutoDepositMonitoringController', AutoDepositMonitoringController);

  /** @ngInject */
  function AutoDepositMonitoringController(alertify, cardTypeList, bank, platform, bankcard, $filter, $scope) {
    var vm = this;
    vm.query = {};
    vm.cardTypeList = cardTypeList;
    $scope.$watch('deposit.query', function (newValue, oldValue, scope) {
      console.log(vm.query);
      //vm.cardDepositList
      if (!newValue||!vm.cardDepositLists)
        return;

      vm.cardDepositList = angular.copy(vm.cardDepositLists);
      for (var i = 0; i < vm.cardDepositLists.length; i++) {
        vm.cardDepositList[i].bankCards = [];
        for (var j = 0; j < vm.cardDepositLists[i].bankCards.length; j++) {
          if (vm.cardDepositLists[i].bankCards[j]) {
            if (vm.query.bankId) {
              if (vm.cardDepositLists[i].bankCards[j].bankId != vm.query.bankId)
              continue;
            }
            if (vm.query.type) {
              if (vm.cardDepositLists[i].bankCards[j].type != vm.query.type)
              continue;
            }
            if (vm.platformId) {
              if (vm.cardDepositLists[i].bankCards[j].platformId != vm.query.platformId)
              continue;
            }
            vm.cardDepositList[i].bankCards.push(vm.cardDepositLists[i].bankCards[j]);
          }
        }

      }
      //if(vm.query.bankId) {
      //
      //}
      //if(vm.query.type)
      //if(vm.query.platformId)
      //var orderBy = $filter("orderBy");
      //vm.cardDepositList = orderBy(vm.cardDepositList, 'bankId', true)
      //$filter("")(vm.cardDepositList);
    }, true);
    bank.once('get', function (data) {
      if (data.status == 200) {
        vm.bankTypeList = data.items;
        for (var i in data.items) {
          var tmp = data.items[i];
          vm['bankTypeList' + tmp.id] = tmp;
        }
      }
    });
    platform.once('getPlatformList', function (data) {
      if (data.status == 200) {
        vm.platformList = data.items;
        for (var i in data.items) {
          var tmp = data.items[i];
          vm['platformList' + tmp.id] = tmp;
        }
      }
    });
    bankcard.once('cardDepositList', function (data) {
      if (data.status == 200) {
        vm.cardDepositLists = data.items;
        vm.cardDepositList = vm.cardDepositLists;
      }
    })
    bankcard.on('loadingBankCard', function (data) {
      if (data.status == 200) {
        vm.bankList = data.items;
        vm.page = data.page;
        vm.sizePerPageFromResponse = data.size;
        vm.total = data.total;
      }
    });
    function loadingBankCard(page) {
      var query = {
        bankId: vm.query.bankId,
        bankCard: vm.query.bankCard,
        platformId: vm.query.platformId,
        type: vm.query.type,
      };
      bankcard.loadingBankCard(page, vm.sizePerPage, query);
    }

    bank.get();
    vm.loadingBankCard = loadingBankCard;
    loadingBankCard(1);
    vm.getPlatformList = platform.getPlatformList;
    vm.getPlatformList();
    bankcard.cardDepositList();
  }
})();
