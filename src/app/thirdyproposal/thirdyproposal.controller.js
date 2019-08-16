(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('thirdyProposalController', thirdyProposalController);

  /** @ngInject */
  function thirdyProposalController($scope, httpRequest, $filter, $rootScope, $timeout) {
    var vm = this;
    vm.pay = false;
    vm.page = 1;
    vm.query = {"platfrom": "1", "state": "", "flush": "1"};
    vm.payitemone = {};
    vm.payitem = {};
    vm.payoneCan = false;
    vm.paytwoCan = false;
    vm.payitemtwo = {};
    vm.totalSum = 0;
    vm.sizePerPage = 100;
    vm.item;
    vm.payitem.payonefee = 0;
    vm.createBankForm = {
      "bankDest": "123456789",
      "destName": "张三",
      "amount": "100",
      "destType": "工商银行",
      "remark": "test",
      "platfrom": "2",
      "angentName": "BAIBO"
    };
    vm.getList = function () {
      vm.get(1);
      if (vm.query.flush == "0") {
        $timeout(function () {
          vm.getList();
        }, 10000)
      }
    }
    // $scope.$on("$destroy", function () {
    //   //清除配置,不然scroll会重复请求
    //   vm.query.flush = undefined;
    // })
    vm.query = {"page": "1", "size": "10", "bankDest": "", "state": "BEGINING"};
    vm.result = function (data) {
      // if (data.code == 200)
      //   vm.pay = false;
      if (data.data.length > 0) {
        var utterThis = new window.SpeechSynthesisUtterance(data.data[0].remark + '需要提款');
        window.speechSynthesis.speak(utterThis);
      }
      vm.outList = function () {
        var url = "exportcashout?page=1&state=" + vm.query.state + "&platfrom=" + ((vm.query.platfrom == undefined) ? "" : vm.query.platfrom) + "&size=100&bankDest=" + ((vm.query.bankDest == undefined) ? "" : vm.query.bankDest) + "&beginTime=" + new Date(vm.query.beginTime).getTime() + "&endTime=" + new Date(vm.query.endTime).getTime();
        window.open(window.url + url)
      }
      vm.bankList = data.data;
      vm.total = data.totalnumber;
      vm.nowSum = data.pageamount;
      vm.totalSum = data.totalamount
      alertify.success(data.msg);
      for (var i = 0; i < vm.bankList.length; i++) {
        vm.bankList[i].createTime = $filter('dateFormate')(vm.bankList[i].createTime);
        vm.bankList[i].finshTime = $filter('dateFormate')(vm.bankList[i].finshTime);
      }
      $scope.$digest();
    };
    vm.getOneBankCard = function (data) {
      vm.payoneCan = false;
      if (data.code == 200) {
        // alertify.success(data.msg);
        if (data.data.length > 0) {
          vm.payoneCan = true;
          vm.payone = data.data[0];
          $scope.$digest();
        }
        else
          alertify.error("绑定银行卡错误");
      }
      else
        alertify.error(data.msg);
    }
    vm.getTwoBankCard = function (data) {
      vm.paytwoCan = false;
      if (data.code == 200) {
        // alertify.success(data.msg);
        if (data.data.length > 0) {
          vm.paytwoCan = true;
          vm.paytwo = data.data[0];
        }
        // httpRequest.post("wechatitem", vm.createBankForm, vm.result);
        else
          alertify.error("绑定银行卡错误");
      }
      else
        alertify.error(data.msg);
    }
    vm.finishresult = function (data) {
      if (data.code == 200) {
        vm.payone = {};
        vm.payitem.payoneBankcard = "";
        // alertify.success(data.msg);
        vm.goback();
      }
      else
        alertify.error(data.msg);

    }
    vm.getPayone = function () {
      httpRequest.get("wechat?name=" + vm.payitem.payoneBankcard + "&platfrom=&type=0&state=&page=1&size=100", vm.getOneBankCard)
    }
    vm.getPaytwo = function () {
      httpRequest.get("wechat?name=" + vm.payitemtwo.paytwoBankcard + "&platfrom=&type=0&state=&page=1&size=100", vm.getTwoBankCard)
    }

    vm.create = function () {
      httpRequest.post("cashoutproposal", vm.createBankForm, vm.result);
    }
    vm.goback = function () {
      vm.pay = false;
      vm.get(1);
    }
    vm.topay = function (i) {
      // var result = confirm("确认付款码？");
      // console.log(result);
      // if (result) {
      vm.pay = true;
      vm.item = angular.copy(vm.bankList[i]);
      // }
    }
    vm.update = function (i) {
      var result = confirm("确认执行码？");
      if (result) {
        vm.item = angular.copy(vm.bankList[i]);
        var pormptresult = alertify.prompt("请输入谷歌验证码", vm.updateitem);
      }
    }
    vm.updateitem = function (data, msg) {
      if (data) {
        httpRequest.get("updateProposal?depositNumber=" + vm.item.id + "&code=" + msg,vm.coderesult);
      }
    }
    vm.coderesult = function (data) {
      if (data.code == 200)
        alertify.success(data.msg);
      else
        alertify.error(data.msg);
    }
    vm.payal = function () {
      // var result = confirm("确认完成码？");
      // console.log(result);
      // if (!result)
      //   return;
      $rootScope.loading = true;
      $timeout(function () {
        $rootScope.loading = false;
      }, 500);
      if (parseFloat(vm.payitem.payonefee) + parseFloat(vm.payitem.tranonemoney) > parseFloat(vm.payone.amount))
        return alertify.error("金额不符合");
      if (vm.item.amount != vm.payitem.tranonemoney)
        return alertify.error("付款金额不对");
      // if ($("#paytwocheck").is(":checked") && vm.paytwo) {
      //   if (parseFloat(vm.payitem.paytwofee) + parseFloat(vm.payitem.trantwomoney) > parseFloat(vm.paytwo.amount))
      //     return alertify.error("金额不符合");
      // }
      vm.payitem.translatAmount = vm.item.amount;
      vm.payitem.platfrom = vm.item.platfrom;
      vm.payitem.propsalNumber = vm.item.id;
      vm.payitem.destBankCard = vm.item.bankDest;
      vm.payitem.createUser = $rootScope.user.name;
      httpRequest.post("finishpropoasl", vm.payitem, vm.finishresult);
      // vm.item.state = "EXECUTED";
      // vm.item.finshTime = new Date().getTime();
      // httpRequest.post("cashoutproposal", vm.item, vm.result);
    }
    // vm.goback()
    vm.cancel = function () {
      var result = confirm("确认取消码？");
      console.log(result);
      if (!result)
        return;
      $rootScope.loading = true;
      $timeout(function () {
        $rootScope.loading = false;
      }, 500);
      vm.item.state = "CANCEL";
      vm.item.remark = vm.payitem.remark;
      vm.item.finshTime = new Date().getTime();

      httpRequest.post("cashoutproposal", vm.item, vm.cancelresult);
    }
    vm.cancelresult = function (data) {
      if (data.code == 200) {
        vm.payone = {};
        vm.payitem.payoneBankcard = "";
        // alertify.success(data.msg);
        vm.goback();
      }
      else
        alertify.error(data.msg);
    }
    vm.get = function (page) {
      $rootScope.loading = true;
      $timeout(function () {
        $rootScope.loading = false;
      }, 500);
      httpRequest.get("cashoutproposal" + "?page=" + page + "&state=" + vm.query.state + "&platfrom=" + ((vm.query.platfrom == undefined) ? "" : vm.query.platfrom) + "&size=100&bankDest=" + ((vm.query.bankDest == undefined) ? "" : vm.query.bankDest) + "&beginTime=" + new Date(vm.query.beginTime).getTime() + "&endTime=" + new Date(vm.query.endTime).getTime(), vm.result)
    }
  }
})();
