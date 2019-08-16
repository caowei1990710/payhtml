(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('shunpayHomeRecordController', shunpayHomeRecordController);
  /** @ngInject */
  function shunpayHomeRecordController($scope, $timeout, httpRequest, $rootScope, $state, loc_language_cn, $filter) {
    var vm = this;
    vm.query = {"state": "", "wechatName": "", "depositNumber": "", "type": "", "inType": ""};
    vm.sizePerPage = 500;
    vm.page = 1;
    vm.totalSum = 0;
    vm.nowSum = 0;
    vm.getDate = function (data) {
      vm.DepositList = data.data;
      for (var i = 0; i < data.data.length; i++) {
        vm.DepositList[i].tranTime = $filter('dateFormate')(vm.DepositList[i].tranTime);
        vm.DepositList[i].creatTime = $filter('dateFormate')(vm.DepositList[i].creatTime);
        vm.DepositList[i].excuteTime = $filter('dateFormate')(vm.DepositList[i].excuteTime);
        vm.DepositList[i].payfee = $filter('toFix')(vm.DepositList[i].amount * $rootScope.user.payfee);
      }
      vm.total = data.totalnumber;
      vm.totalSum = data.totalamount
      vm.nowSum = data.pageamount
      $scope.$digest();
    }
    vm.result = function (data) {
      if (data.code == 200) {
        alertify.success(data.msg);
        vm.updateDeposit = angular.copy(vm.DepositList[vm.index]);
        vm.updateDeposit.state = "EXECUTED";
        httpRequest.put("deposit", vm.updateDeposit);
      }
      else
        alertify.error(data.msg);
    }
    vm.updateBefore = function (index) {
      vm.index = index;
      vm.DepositList[vm.index].userRemark = vm.DepositList[vm.index].userRemarkedit;
      httpRequest.put("deposit", vm.DepositList[vm.index], vm.rebuild)
    }
    vm.outList = function (data) {
      var url = "exportdeposit?page=1&size=100000&state=" + vm.query.state + "&beginTime=0&endTime=0&beginTranstime=" + new Date(vm.query.beginTime).getTime() + "&endTranstime=" + new Date(vm.query.endTime).getTime() + "&beginExcuteTime=0&endExcuteTime=0&wechatName=" + vm.query.wechatName;
      window.open(window.url + url);
    }
    vm.rebuild = function (data) {
      httpRequest.get("sysdeposit?depositNumber=" + vm.DepositList[vm.index].depositNumber + "&platfrom=" + vm.DepositList[vm.index].platfrom, vm.result);
    }
    vm.getAgent = function (data) {
      httpRequest.get("deposit?page=" + vm.page + "&size=" + vm.sizePerPage + "&state=" + vm.query.state + "&beginTime=0&endTime=0&beginTranstime=" + new Date(vm.query.beginTime).getTime() + "&endTranstime=" + new Date(vm.query.endTime).getTime() + "&beginExcuteTime=0&endExcuteTime=0&platfrom=" + data.data[0].id + "&wechatName=" + vm.query.wechatName + "&depositNumber=" + vm.query.depositNumber + "&billNo=", vm.getDate)
    }
    vm.get = function (page) {
      vm.page = page;
      // if ($rootScope.user.callbackurl == 'www.baidu.com') {
      //   httpRequest.get("agent?page=1&size=1&name=" + $rootScope.user.agentName, vm.getAgent);
      // }
      // else
      httpRequest.get("deposit?page=" + page + "&size=500&state=" + vm.query.state + "&beginTime=0&platfrom=" + vm.query.type + "&endTime=0&beginTranstime=" + new Date(vm.query.beginTime).getTime() + "&endTranstime=" + new Date(vm.query.endTime).getTime() + "&beginExcuteTime=0&endExcuteTime=0&angentName=" + $rootScope.user.name + "&inType=" + vm.query.inType + "&wechatName=" + vm.query.wechatName + "&depositNumber=" + vm.query.depositNumber + "&billNo=", vm.getDate)
    }
  }
})();
