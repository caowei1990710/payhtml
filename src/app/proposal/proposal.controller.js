(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('proposalController', proposalController);
  /** @ngInject */
  function proposalController($scope, $timeout, httpRequest, $rootScope, alertify, $state, $filter) {
    var vm = this;
    vm.sizePerPage = 100;
    vm.page = 1;
    vm.query = {
      "payAccont": "",
      "depositNumber": "",
      "platfrom": "",
      "state": "",
      "beginTime": 0,
      "endTime": 0,
      "flush": "1",
      "mobiletype": "",
      "getpaytype": "",
      "ip": "",
      "payType": "",
      "duanAmount": ""
  }
    ;
    vm.setContent = function (data) {
      vm.bankList = data.data;
      vm.totalSum = data.totalnumber;
      for (var i = 0; i < vm.bankList.length; i++) {
        vm.bankList[i].creatTime = $filter('dateFormate')(vm.bankList[i].creatTime);
        vm.bankList[i].overTime = $filter('dateFormate')(vm.bankList[i].overTime);
        vm.bankList[i].updateTime = $filter('dateFormate')(vm.bankList[i].updateTime);
      }
      $scope.$digest();
    }
    $timeout(function () {
      vm.defaultbegin = vm.query.beginTime;
      vm.defaultend = vm.query.endTime;
    }, 1000);
    vm.get = function (page) {
      vm.page = page;
      $rootScope.loading = true;
      $timeout(function () {
        $rootScope.loading = false;
      }, 500);
      if (vm.query.flush == "0") {
        $timeout(function () {
          vm.get(1);
        }, 10000)
      }
      var url = "getProposal?page=" + vm.page + "&size=" + vm.sizePerPage + "&beginTime=" + new Date(vm.query.beginTime).getTime() + "&endTime=" + new Date(vm.query.endTime).getTime() + "&payAccont=" + vm.query.payAccont + "&getpaytype=" + vm.query.getpaytype + "&mobiletype=" + vm.query.mobiletype + "&depositNumber=" + vm.query.depositNumber + "&ip=" + vm.query.ip + "&platfrom=" + vm.query.platfrom + "&payType=" + vm.query.payType + "&state=" + vm.query.state+ "&duanAmount=" + vm.query.duanAmount;
      if (vm.query.payAccont == "" && vm.query.depositNumber == "" && vm.query.state == "" && vm.query.duanAmount == "" && vm.query.getpaytype == "" && vm.query.mobiletype == "" && vm.query.ip == "" && vm.query.beginTime == vm.defaultbegin && vm.query.endTime == vm.defaultend && vm.query.payType == vm.defaultend) {//payType
        url = "cacheProposal?platfrom=" + vm.query.platfrom;
      }

      httpRequest.get(url, vm.setContent)
    }
    $scope.$on("$destroy", function () {
      //清除配置,不然scroll会重复请求
      vm.query.flush = undefined;
    })
  }
})();
