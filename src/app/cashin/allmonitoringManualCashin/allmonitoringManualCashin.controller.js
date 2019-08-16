(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('AllMonitoringManualCashinController', AllMonitoringManualCashinController);

  /** @ngInject */
  function AllMonitoringManualCashinController($scope,$log, $state, cashin, payment, device, $rootScope, creditlog, $filter) {
    var vm = this;
    $rootScope.loading = false;
    vm.size = 500;
    var vm = this;
    vm.query = {};
    $scope.$on('changtabar', function (event, data) {
     if(data == "总支出明细")
      //if (!$scope.destory) {
        vm.loadingBankCard(1);
      //}
    });
    if (!$rootScope.user)
      return;
    vm.user = {
      id: $rootScope.user.id,
      userName: $rootScope.user.userName
    }
    vm.loadingBankCard = function (page) {
      if (vm.query.inputbankCard)
        vm.query.bankCard = "["+vm.query.inputbankCard+"]";
      else
        vm.query.bankCard = undefined;
      //else {
      //  vm.query.bankCard = "[";
      //  angular.forEach($rootScope.allbanklist,function(item,index){
      //    vm.query.bankCard += item.bankCard;
      //    if(index != $rootScope.allbanklist.length)
      //      vm.query.bankCard += ",";
      //  });
      //  vm.query.bankCard += "]";
      //}
      vm.page = page;
      //vm.query.receiveBankCard = undefined;
      creditlog.getCreditLogByBankListReq(vm.query, vm.page, vm.size);
    }

    creditlog.on('getCreditLogByBankListReq', function (data) {
      vm.recordlist = data.items;
      angular.forEach(vm.recordlist, function (item, index) {
        item.createtime = $filter('dateFormate')(item.createtime);
      });
      vm.page = data.page;
      vm.size = data.size+"";
      vm.total = data.total;
      vm.totalsum = data.totalsum;
      vm.Subtotal = data.Subtotal;
    })
    creditlog.getCreditLogListReq(vm.query, vm.page, vm.size);
  }
})();
