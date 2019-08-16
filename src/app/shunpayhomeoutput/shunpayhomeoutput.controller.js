(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('shunpayHomeOutputController', shunpayHomeOutputController);
  /** @ngInject */
  function shunpayHomeOutputController($scope, $timeout, httpRequest, $rootScope, $state, $filter) {
    var vm = this;
    vm.query = {"page": "1", "size": "500", "state": ""};
    vm.sizePerPage = 10;
    vm.page = 1;
    vm.totalSum = 0;
    vm.nowSum = 0;
    vm.getDate = function (data) {
      vm.recrodList = data.data;
      // vm.DepositList = data;
      for (var i = 0; i < data.data.length; i++) {
        vm.recrodList[i].createTime = $filter('dateFormate')(vm.recrodList[i].createTime);
        vm.recrodList[i].finshTime = $filter('dateFormate')(vm.recrodList[i].finshTime);
      }
      vm.total = data.totalnumber;
      vm.totalSum = data.totalamount
      vm.nowSum = data.pageamount
      $scope.$digest();
    }
    vm.get = function (page) {
      httpRequest.get("cashoutproposal?page=" + page + "&size=" + vm.query.size + "&state="+vm.query.state+"&beginTime=" + new Date(vm.query.beginTime).getTime() + "&endTime=" + new Date(vm.query.endTime).getTime() + "&state=&platfrom=" + $rootScope.user.id, vm.getDate);
      // httpRequest.get("deposit?page=1&size=10&state=" + vm.query.state + "&beginTime=" + new Date(vm.query.beginTime).getTime() + "&endTime=" + new Date(vm.query.endTime).getTime() + "&beginTranstime=0&endTranstime=0&beginExcuteTime=0&endExcuteTime=0&wechatName=" + vm.query.wechatName + "&depositNumber=&billNo=", vm.getDate)
    }
    vm.create = function () {
      httpRequest.post("output", {"fromBank": "15602216040", "destBank": "622114578965", "amount": "100"});
    }

  }
})();
