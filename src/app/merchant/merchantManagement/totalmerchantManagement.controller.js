(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('totalmerchantManagementController', totalmerchantManagementController);

  /** @ngInject */
  function totalmerchantManagementController($scope, onlinePay, $filter) {
    $scope.$on('changtabar', function (event, data) {
        if (data == "商户统计")
          vm.loading(1);
      }
    );
    var vm = this;
    vm.sizePerPage = 500;
    vm.query = {'status': 'SUCCESS'};
    vm.loading = function (page) {
      vm.page = page;
      onlinePay.getOnLineCashinSum(vm.query, vm.page, vm.sizePerPage);
    }
    onlinePay.on('getOnLineCashinSum', function (data) {
      vm.onlineList = data.items;
      // vm.sizePerPage = data.size;
      vm.total = data.total;
      vm.totalsum = data.totalsum;
      vm.Subtotal = data.Subtotal;
      angular.forEach(vm.onlineList, function (item, index) {
        //console.log('index:'+index);
        item.createTime = $filter('dateFormate')(item.createTime);
        item.processTime = $filter('dateFormate')(item.processTime);
        //item.lastLockTime = $filter('dateFormate')(item.lastLockTime);
        //bankcard.getBankCardDayAmount({'bankcardNo': item.bankCard});
      })
    })
  }
})
();
