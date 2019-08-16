(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('rpItemController', rpItemController);

  /** @ngInject */
  function rpItemController($rootScope, user, creditlog, $filter,$scope) {
    $rootScope.loading = false;
    var vm = this;
    vm.sizePerPage = 500;
    $scope.$on('changtabar', function (event, data) {
      if (data == "报表") {
        creditlog.getCreditLogListReq(vm.query, 1, vm.sizePerPage);
      }
    });
    // var date = new Date();
    // var year = date.getFullYear(),
    //   mon = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
    //   day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
    //   nowDate = year + "-" + mon + "-" + day;
    vm.query = {};
    if (!$rootScope.user)
      return;
    vm.user = {
      id: $rootScope.user.id,
      userName: $rootScope.user.userName
    }
    vm.loadingBankCard = function (page) {
      vm.page = page;
      creditlog.getCreditLogListReq(vm.query, vm.page, vm.sizePerPage);
    }
    creditlog.on('getCreditLogListReq', function (data) {
      vm.recordlist = data.items;
      angular.forEach(vm.recordlist, function (item, index) {
        item.createtime = $filter('dateFormate')(item.createtime);
      });
      vm.page = data.page;
      //vm.sizePerPage = data.size;
      vm.total = data.total;
      vm.totalsum = data.totalsum;
      vm.Subtotal = data.Subtotal;
    })

    //vm.user.id = $rootScope.user.id;
    //vm.user.userName = $rootScope.user.userName;
    //angular.extend({
    //  vm..id:$rootScope.user.id,r
    //  userName:$rootScope.user.username
    //},base);
    //vm.updatePwd = function () {
    //  user.updateUserPassword(vm.user);
    //}
  }
})();
