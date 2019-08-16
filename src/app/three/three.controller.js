/**
 * Created by snsoft on 28/7/2018.
 */
(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('threeController', threeController);

  /** @ngInject */
  function threeController($scope, $timeout, httpRequest, $rootScope, $state, $filter, $stateParams) {
    var vm = this;
    vm.query = {"page": "1", "size": "500", "state": ""};
    vm.sizePerPage = 10;
    vm.page = 1;
    vm.totalSum = 0;
    vm.withrawitem = {};
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

    vm.changeStyle = function (i) {
      vm.bankindex = i;
      switch (i) {
        case 1:
          $('#outputlist').addClass('on')
          $('#outputsend').removeClass('on')
          break;
        case 2:
          $('#outputlist').removeClass('on')
          $('#outputsend').addClass('on')
          break;
        default:
          break;
      }
    }
    vm.outList = function () {
      var url = "exportcashout?page=1&size=10000&state=" + vm.query.state + "&beginTime=" + new Date(vm.query.beginTime).getTime() + "&endTime=" + new Date(vm.query.endTime).getTime() + "&state=&platfrom=" + $rootScope.user.id;
      window.open(window.url + url)
    }
    vm.withresult = function (data) {
      alert(data.msg);
      if (data.code == 200) {
        vm.changeStyle(1);
        vm.get(1);
      }
      // else
      vm.withrawitem = {};
    }
    vm.changeStyle(parseInt($stateParams.id));
    vm.get = function (page) {
      httpRequest.get("cashoutproposal?page=" + page + "&size=" + vm.query.size + "&state=" + vm.query.state + "&beginTime=" + new Date(vm.query.beginTime).getTime() + "&endTime=" + new Date(vm.query.endTime).getTime() + "&state=&platfrom=" + $rootScope.user.id, vm.getDate);
      // httpRequest.get("deposit?page=1&size=10&state=" + vm.query.state + "&beginTime=" + new Date(vm.query.beginTime).getTime() + "&endTime=" + new Date(vm.query.endTime).getTime() + "&beginTranstime=0&endTranstime=0&beginExcuteTime=0&endExcuteTime=0&wechatName=" + vm.query.wechatName + "&depositNumber=&billNo=", vm.getDate)
    }
    vm.create = function () {
      httpRequest.post("output", {"fromBank": "15602216040", "destBank": "622114578965", "amount": "100"});
    }
    $timeout(function () {
      vm.get(1);
    }, 2000)
    vm.clear = function () {
      vm.withrawitem = {};
    }
    vm.setToWithred = function () {
      if (vm.withrawitem.destType == null || vm.withrawitem.destName == null || vm.withrawitem.bankDest == null || vm.withrawitem.amount == null || vm.withrawitem.payword == null) {
        alert("提款信息不全");
        return
      }
      if (vm.withrawitem.payword != $rootScope.user.payword) {
        alert("取款密码错误");
        return
      }
      // vm.showedit = false;
      // vm.withraw = false;
      // vm.withrawitem.bankDest = vm.user.bankCard;
      // vm.withrawitem.destType = vm.user.bankCardType;
      // vm.withrawitem.destName = vm.user.bankCardName;
      // vm.withrawitem.platfrom = vm.user.id;
      // vm.withrawitem.angentName = vm.user.name;
      // vm.withrawitem.createUser = vm.user.name;
      // vm.withrawitem.remark = $rootScope.user.name;
      vm.withrawitem.platfrom = $rootScope.user.id;
      vm.withrawitem.angentName = $rootScope.user.name;
      vm.withrawitem.createUser = $rootScope.user.name;
      vm.withrawitem.remark = $rootScope.user.name;
      if (window.secured == '0')
        vm.withrawitem.sign = hex_md5($rootScope.user.name + vm.user.bankCard + $rootScope.user.sign);
      else
        vm.withrawitem.sign = '-999';
      httpRequest.post("cashoutproposal", vm.withrawitem, vm.withresult);
    }
    vm.getResult = function (data) {
      if (data.code == 200)
        vm.setToWithred();
      else
        alert("谷歌验证码" + data.msg);
    }
    vm.withrawCreate = function () {
      if ($rootScope.user.paySafe == 'on') {
        httpRequest.get("/getAuthictor?code=" + vm.withrawitem.google + "&secret=" + $rootScope.user.paySecret, vm.getResult);
      } else
        vm.setToWithred();
    }
    $scope.$emit("childChange", 2)
  }
})();
