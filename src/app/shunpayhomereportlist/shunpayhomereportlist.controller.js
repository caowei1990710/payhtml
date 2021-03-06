(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('shunpayHomeReportlist', shunpayHomeReportlist);
  /** @ngInject */
  function shunpayHomeReportlist($scope, $timeout, bankcard, $rootScope, $state, httpRequest, $filter) {
    var vm = this;
    vm.totalSum = 0;
    vm.sizePerPage = 500;
    vm.query = {"type": "", "platfrom": "", "account": ""};
    vm.getDate = function (data) {
      // vm.DepositList = data;
      // for (var i = 0; i < data.length; i++) {
      //   vm.DepositList[i].tranTime = $filter('dateFormate')(vm.DepositList[i].tranTime);
      //   vm.DepositList[i].creatTime = $filter('dateFormate')(vm.DepositList[i].creatTime);
      //   vm.DepositList[i].excuteTime = $filter('dateFormate')(vm.DepositList[i].excuteTime);
      // }
      // $scope.$digest();
    }
    vm.result = function (data) {
      vm.reportlist = data.data;
      vm.total = data.totalnumber;
      vm.nowSum = data.pageamount;
      vm.totalSum = data.totalamount
      for (var i = 0; i < vm.reportlist.length; i++) {
        vm.reportlist[i].createTime = $filter('dateFormate')(vm.reportlist[i].createTime);
      }
      $scope.$digest();
    }
    vm.export = function (page) {
      window.open(window.url + "exportdetail?page=" + page + "&size=" + vm.sizePerPage + "&type=" + vm.query.type + "&account=&platfrom=" + $rootScope.user.id + "&beginTime=" + new Date(vm.query.beginTime).getTime() + "&endTime=" + new Date(vm.query.endTime).getTime());
    }
    vm.get = function (page) {
      httpRequest.get("userreportlist?page=" + page + "&size=" + vm.sizePerPage + "&type=" + vm.query.type + "&account=&platfrom=" + $rootScope.user.id + "&beginTime=" + new Date(vm.query.beginTime).getTime() + "&endTime=" + new Date(vm.query.endTime).getTime(), vm.result)
      // httpRequest.get("deposit?page=1&size=10&state=" + vm.query.state + "&beginTime=" + new Date(vm.query.beginTime).getTime() + "&endTime=" + new Date(vm.query.endTime).getTime() + "&beginTranstime=0&endTranstime=0&beginExcuteTime=0&endExcuteTime=0&wechatName=" + vm.query.wechatName + "&depositNumber=&billNo=", vm.getDate)
    }
    vm.get(1);
  }
})();
