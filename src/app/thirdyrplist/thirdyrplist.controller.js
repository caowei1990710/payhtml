(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('thirdyRplistController', thirdyRplistController);
  /** @ngInject */
  function thirdyRplistController($scope, $timeout, bankcard, $rootScope, $state, httpRequest, $filter) {
    var vm = this;
    var pormptresult;
    vm.query = {
      "state": "",
      "wechatName": "",
      "depositNumber": "",
      "ip": "",
      "platfrom": "",
      "flush": "1",
      "payType": "",
      "userRemark": "",
      "inType": "",
      "month": "-1"
    };
    $timeout(function () {
      vm.defaultbegin = vm.query.beginTime;
      vm.defaultend = vm.query.endTime;
    }, 1000);
    vm.sizePerPage = 500;
    vm.page = 1;
    vm.totalSum = 0;
    vm.nowSum = 0;
    vm.totalFeeSum = 0;
    vm.nowFeeSum = 0;
    vm.index;
    vm.updateDeposit;
    vm.allcollect;
    vm.getList = function () {
      vm.get(1);
      if (vm.query.flush == "0") {
        $timeout(function () {
          vm.getList();
        }, 10000)
      }
    }
    vm.editBank = function (index) {
      vm.bankindex = index;
    }
    vm.doubleDelete = function () {
      pormptresult = alertify.confirm("确定删除记录么", vm.results);
      //.success("", vm.create);
      // vm.create();
    }
    vm.results = function (data) {
      if (data)
        httpRequest.get("deletedeposit?depositNumber=" + vm.DepositList[vm.bankindex].depositNumber, vm.goResult)
      // console.log("data:"+data +" msg:"+msg);
    }
    // vm.delete = function () {
    //   pormptresult = alertify.prompt("麻烦确定订单号", vm.create);
    // }
    vm.doubleMatch = function () {
      pormptresult = alertify.prompt("请输入提案号", vm.match);
    }
    vm.doubleUpdate = function () {
      pormptresult = alertify.prompt("请输入提案号", vm.update);
    }
    vm.match = function (data, msg) {
      if (data)
      // httpRequest.get("updateDepositNomal?depositNumber=" + vm.DepositList[vm.bankindex].depositNumber + "&platfrom=" + msg, vm.goResult)
        httpRequest.get("matchProposal?depositNumber=" + vm.DepositList[vm.bankindex].depositNumber + "&proposalNumber=" + msg, vm.goResult)
    }
    vm.update = function (data, msg) {
      httpRequest.get("updateProposal?depositNumber=" + vm.DepositList[vm.bankindex].depositNumber + "&proposalNumber=" + msg, vm.goResult)
    }
    vm.editResult = function (data) {
      vm.get(1);
    }
    vm.goResult = function (data) {
      if (data.code == 200) {
        vm.editResult();
        alertify.success(data.msg);
      }
      else
        alertify.error(data.msg);
    }
    vm.editBefore = function (index) {
      if (vm.platfrom != vm.allcollect[0].id) {
        vm.DepositList[index].platfrom = vm.platfrom;
        httpRequest.post("updateDeposit", vm.DepositList[index], vm.editResult)
      }
      // httpRequest.post("updateDeposit", vm.DepositList[index], vm.editResult)
    }
    vm.outList = function (data) {
      var url = "exportdeposit?page=" + 1 + "&payType=" + vm.query.payType + "&size=" + vm.sizePerPage + "&state=" + vm.query.state + "&beginTime=0&endTime=0&beginTranstime=" + new Date(vm.query.beginTime).getTime() + "&endTranstime=" + new Date(vm.query.endTime).getTime() + "&beginExcuteTime=0&endExcuteTime=0&wechatName=" + vm.query.wechatName + "&depositNumber=" + vm.query.depositNumber + "&billNo=&platfrom=" + vm.query.platfrom + "&ip=" + vm.query.ip;
      window.open(window.url + url);
    }
    vm.getDate = function (data) {
      vm.DepositList = data.data;
      for (var i = 0; i < data.data.length; i++) {
        vm.DepositList[i].tranTime = $filter('dateFormate')(vm.DepositList[i].tranTime);
        vm.DepositList[i].creatTime = $filter('dateFormate')(vm.DepositList[i].creatTime);
        vm.DepositList[i].excuteTime = $filter('dateFormate')(vm.DepositList[i].excuteTime);
        // vm.DepositList[i].creatTime = $filter('dateFormate')(vm.DepositList[i].excuteTime);
        // vm.DepositList[i].edit = (vm.DepositList[i].platfrom == vm.allcollect[0].id);
      }
      vm.total = data.totalnumber;
      vm.totalSum = data.totalamount.toFixed(2);
      vm.nowSum = data.pageamount.toFixed(2);
      vm.total = data.totalnumber.toFixed(2);
      vm.totalFee = data.tranfeeamount.toFixed(2);
      vm.nowFee = data.pagetranfeeamount.toFixed(2);
      $scope.$digest();
    }
    //http://localhost:8081/agent?name=allcollect&type&create=&agentName=&state=&page=1&size=500
    vm.platfrom = function (data) {
      vm.allcollect = data.data;
    }
    vm.getAllcoll = function () {
      httpRequest.get("agent?name=allcollect&type&create=&agentName=&state=&page=1&size=500", vm.platfrom);
    }
    vm.getAllcoll();
    vm.get = function (page) {
      if (vm.query.month != "-1") {
        httpRequest.get("cachemonthdepositrecord?id=" + vm.query.platfrom + "&month=" + vm.query.month, vm.getDate)
      } else if (vm.query.wechatName == "" && vm.query.depositNumber == "" && vm.query.ip == "" && vm.query.inType == "" && vm.query.payType == "" && vm.query.beginTime == vm.defaultbegin && vm.query.endTime == vm.defaultend) {
        if (vm.query.state == "") {
          if (vm.query.platfrom == "")
            httpRequest.get("cachedepositrecord", vm.getDate)
          else {
            for (var i = 0; i < $rootScope.platfromlist.length; i++) {
              if ($rootScope.platfromlist[i]["id"] == vm.query.platfrom) {
                vm.platfromvalue = $rootScope.platfromlist[i]["name"];
                break;
              }
            }
            httpRequest.get("cachedepositrecord?platfrom=" + vm.platfromvalue, vm.getDate);
          }
        } else {
          httpRequest.get("cachedepositstate?state=" + vm.query.state, vm.getDate);
        }
      } else {
        $rootScope.loading = true;
        $timeout(function () {
          $rootScope.loading = false;
        }, 500);
        httpRequest.get("deposit?page=" + page + "&userRemark=" + vm.query.userRemark + "&payType=" + vm.query.payType + "&size=" + vm.sizePerPage + "&inType=" + vm.query.inType + "&state=" + vm.query.state + "&beginTranstime=0&endTranstime=0&beginTime=" + new Date(vm.query.beginTime).getTime() + "&endTime=" + new Date(vm.query.endTime).getTime() + "&beginExcuteTime=0&endExcuteTime=0&wechatName=" + vm.query.wechatName + "&depositNumber=" + vm.query.depositNumber + "&billNo=&platfrom=" + vm.query.platfrom + "&ip=" + vm.query.ip, vm.getDate)
      }
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
    $scope.$on("$destroy", function () {
      //清除配置,不然scroll会重复请求
      vm.query.flush = undefined;
    })
    vm.updateBefore = function (index) {
      vm.index = index;
      vm.DepositList[vm.index].note = vm.DepositList[vm.index].userRemark;
      // vm.DepositList[vm.index].userRemark = vm.DepositList[vm.index].userRemarkedit;
      // vm.DepositList[vm.index].userRemark = "Test2018090709344854314121447";
      httpRequest.put("deposit", vm.DepositList[vm.index], vm.rebuild)
    }
    vm.rebuild = function (index) {
      vm.index = index;
      // vm.DepositList[vm.index].callUrl = "http://www.jshunxing.com//merchant/sfpay/resultMMM2.jsp";
      // httpRequest.put("deposit", vm.DepositList[vm.index])
      httpRequest.get("sysdeposit?depositNumber=" + vm.DepositList[vm.index].depositNumber + "&platfrom=" + vm.DepositList[vm.index].platfrom, vm.result);
    }
    // vm.rebuild = function (index) {
    //   vm.index = index;
    //   httpRequest.get("sysdeposit?depositNumber=" + vm.DepositList[vm.index].depositNumber + "&platfrom=" + vm.DepositList[vm.index].platfrom, vm.result);
    // }
  }
})();
