(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('MonitoringManualCashinController', MonitoringManualCashinController);

  /** @ngInject */
  function MonitoringManualCashinController($scope,$log, $state, cashin, payment, device, $rootScope, creditlog, $filter) {
    var vm = this;
    $rootScope.loading = false;
    var vm = this;
    vm.size = 500;
    vm.query = {'action': 'PAYMENT', 'userName': $rootScope.user.account};
    if (!$rootScope.user)
      return;
    vm.user = {
      id: $rootScope.user.id,
      userName: $rootScope.user.userName
    }
    vm.loadingBankCard = function (page) {
      if (vm.query.receiveBankCard){
        vm.query.bankCard = "["+vm.query.receiveBankCard.bankCard+"]";
      } else {
        vm.query.bankCard = "[";
        angular.forEach($rootScope.paybankList,function(item,index){
          vm.query.bankCard += item.bankCard;
          if(index != $rootScope.allbanklist.length-1)
            vm.query.bankCard += ",";
        });
        vm.query.bankCard += "]";
      }
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
      //vm.sizePerPageFromResponse = data.size;
      vm.total = data.total;
      vm.totalsum = data.totalsum;
      vm.Subtotal = data.Subtotal;
    })
    $scope.$on('changtabar', function (event, data) {
      if(data == "支出明细")
        creditlog.getCreditLogListReq(vm.query, 1, vm.size);
    });
  }
})();
