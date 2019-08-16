/**
 * Created by snsoft on 28/7/2018.
 */
/**
 * Created by snsoft on 28/7/2018.
 */
/**
 * Created by snsoft on 28/7/2018.
 */
(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('secondController', secondController);

  /** @ngInject */
  function secondController($scope, $timeout, httpRequest, $rootScope, $state, loc_language_cn, $filter, $stateParams) {
    var vm = this;
    vm.query = {
      "state": "",
      "wechatName": "",
      "depositNumber": "",
      "type": "",
      "platfrom": "",
      "userRemark": "",
      "remark": ""
    };
    $timeout(function () {
      vm.defaultbegin = vm.query.beginTime;
      vm.defaultend = vm.query.endTime;
    }, 1000);
    vm.sizePerPage = 500;
    vm.outputsize = 500;
    vm.page = 1;
    vm.detailpage = 1;
    vm.totalSum = 0;
    vm.nowSum = 0;
    vm.bankIndex = $stateParams.id;
    console.log("id:" + $stateParams.id);
    // vm.bankindex = $stateParams.id;
    vm.getDate = function (data) {
      vm.DepositList = data.data;
      if (data.data == undefined)
        return
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
    vm.getDetailResult = function (data) {
      vm.DetailList = data.data;
      for (var i = 0; i < vm.DetailList.length; i++) {
        vm.DetailList[i].createTime = $filter('dateFormate')(vm.DetailList[i].createTime);
        if (vm.DetailList[i].type == 'cominput' || vm.DetailList[i].type == 'cominputfee')
          vm.DetailList[i].realMoney = (vm.DetailList[i].befroeMoney + vm.DetailList[i].lockMoney).toFixed(2);
        else
          vm.DetailList[i].realMoney = (vm.DetailList[i].befroeMoney).toFixed(2);
        // if()
      }
      vm.Detailtotal = data.totalnumber;
      vm.DetailtotalSum = data.totalamount
      vm.DetailnowSum = data.pageamount
      $scope.$digest();
    }
    vm.outDepositList = function () {
      window.open(window.url + "exportdetail?page=1&size=" + vm.outputsize + "&type=" + vm.query.type + "&remark=" + vm.query.remark + "&account=&platfrom=" + $rootScope.user.id + "&beginTime=" + new Date(vm.query.beginSelect).getTime() + "&endTime=" + new Date(vm.query.endSelect).getTime())
    }
    vm.result = function (data) {
      alert(data.msg);
      if (data.code == 200) {

        // alertify.success(data.msg);
        vm.updateDeposit = angular.copy(vm.DepositList[vm.index]);
        vm.updateDeposit.state = "EXECUTED";
        httpRequest.put("deposit", vm.updateDeposit);
      }
      // else
      //   alertify.error(data.msg);
    }
    vm.updateBefore = function (index) {
      vm.index = index;
      if (vm.DepositList[vm.index].userRemarkedit) {
        vm.DepositList[vm.index].userRemark = vm.DepositList[vm.index].userRemarkedit;
        httpRequest.put("deposit", vm.DepositList[vm.index], vm.rebuild)
      } else
        httpRequest.get("sysdeposit?depositNumber=" + vm.DepositList[vm.index].depositNumber + "&platfrom=" + vm.DepositList[vm.index].platfrom, vm.result);
      // if()

    }
    vm.rebuild = function (data) {
      httpRequest.get("sysdeposit?depositNumber=" + vm.DepositList[vm.index].depositNumber + "&platfrom=" + vm.DepositList[vm.index].platfrom, vm.result);
    }
    vm.getAgent = function (data) {
      httpRequest.get("deposit?page=" + vm.page + "&size=" + vm.sizePerPage + "&state=" + vm.query.state + "&beginTime=0&endTime=0&beginTranstime=" + new Date(vm.query.beginTime).getTime() + "&endTranstime=" + new Date(vm.query.endTime).getTime() + "&beginExcuteTime=0&endExcuteTime=0&platfrom=" + data.data[0].id + "&wechatName=" + vm.query.wechatName + "&depositNumber=" + vm.query.depositNumber + "&billNo=", vm.getDate)
    }
    vm.outList = function () {
      var url = "exportdeposit?page=1&size=10000&state=" + vm.query.state + "&beginTime=0&endTime=0&beginTranstime=" + new Date(vm.query.beginTime).getTime() + "&endTranstime=" + new Date(vm.query.endTime).getTime() + "&beginExcuteTime=0&endExcuteTime=0&platfrom=" + $rootScope.user.id + "&wechatName=" + vm.query.wechatName + "&depositNumber=" + vm.query.depositNumber + "&billNo=";
      window.open(window.url + url);
    }
    $timeout(function () {
      vm.get(1);
    }, 2000)
    vm.getDetail = function (page) {
      vm.detailpage = page;
      httpRequest.get("userreportlist?page=" + page + "&size=" + vm.sizePerPage + "&remark=" + vm.query.remark + "&type=" + vm.query.type + "&account=&platfrom=" + $rootScope.user.id + "&beginTime=" + new Date(vm.query.beginSelect).getTime() + "&endTime=" + new Date(vm.query.endSelect).getTime(), vm.getDetailResult)
    }
    vm.get = function (page) {
      vm.page = page;
      if (vm.query.state == "" && vm.query.wechatName == "" && vm.query.userRemark == "" && vm.query.depositNumber == "" && vm.query.beginTime == vm.defaultbegin && vm.query.endTime == vm.defaultend) {
        // if (vm.query.platfrom == "")
        //   httpRequest.get("cachedepositrecord", vm.getDate)
        // else {
        //   for (var i = 0; i < $rootScope.platfromlist.length; i++) {
        //     if ($rootScope.platfromlist[i]["id"] == vm.query.platfrom) {
        //       vm.platfromvalue = $rootScope.platfromlist[i]["name"];
        //       break;
        //     }
        //   }
        httpRequest.get("cachedepositrecord?platfrom=" + $rootScope.user.name, vm.getDate);
        // }
      } else {
        httpRequest.get("deposit?page=" + page + "&size=" + vm.sizePerPage + "&state=" + vm.query.state + "&userRemark=" + vm.query.userRemark + "&beginTime=0&endTime=0&beginTranstime=" + new Date(vm.query.beginTime).getTime() + "&endTranstime=" + new Date(vm.query.endTime).getTime() + "&beginExcuteTime=0&endExcuteTime=0&platfrom=" + $rootScope.user.id + "&wechatName=" + vm.query.wechatName + "&depositNumber=" + vm.query.depositNumber + "&billNo=", vm.getDate)
      }
    }
    $scope.$emit("childChange", 1)
  }
})();
