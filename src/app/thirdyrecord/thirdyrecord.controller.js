(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('thirdyRecordController', thirdyRecordController);
  /** @ngInject */
  function thirdyRecordController($scope, $rootScope, httpRequest, alertify, $filter) {
    var vm = this;
    var pormptresult;
    vm.manualForm = {"createUser": $rootScope.user.name};
    vm.result = function (data) {
      alertify.success(data.msg);
      vm.manualForm.amount = "";
      vm.manualForm.depositNumber = "";
      vm.manualForm.payAccount = "";
      vm.manualForm.nickName = "";
      vm.manualForm.note = "";
      $scope.$digest();
    }
    vm.now = $filter('dateFormate')(new Date().getTime());
    vm.manualForm.date = (vm.now.split(" ")[0]).split("-")[1] + (vm.now.split(" ")[0]).split("-")[2];
    vm.manualForm.time = vm.now.split(" ")[1].split(":")[0] + vm.now.split(" ")[1].split(":")[1];
    vm.doubleCreate = function () {
      pormptresult = alertify.prompt("麻烦确定订单号", vm.create);
      //.success("", vm.create);
      // vm.create();
    }
    vm.setDepositNumber = function () {
      vm.manualForm.depositNumber = (new Date()).getTime() + "";
    }
    vm.create = function (data, msg) {
      if (!data || msg != vm.manualForm.depositNumber) {
        if (data)
          alertify.error("两次输入的订单号不一致");
        return;
      }
      // console.log("pormptresult:" + pormptresult)
      vm.manualForm.tranTime = new Date(vm.manualForm.date + " " + vm.manualForm.time).getTime();
      var id = vm.manualForm.wechatName;
      var platfrom = "";
      if (Math.abs(vm.manualForm.tranTime - new Date().getTime()) > 24 * 60 * 60 * 1000) {
        alertify.error("时间相差过大");
        return
      }
      for (var i = 0; i < $rootScope.allbanklist.length; i++) {
        if ($rootScope.allbanklist[i].wechatName == vm.manualForm.wechatName) {
          id = $rootScope.allbanklist[i].id;
          platfrom = $rootScope.allbanklist[i].plaftfrom;
          break
        }
      }
      vm.manualForm.platfrom = platfrom;
      // vm.manualForm.depositNumber = id + (vm.manualForm.amount * 100 + "").replace(".", "") + new Date(vm.manualForm.tranTime).getTime();
      httpRequest.post("deposit", vm.manualForm, vm.result);
    }
    // var url = "wechat?name=&type=1&state=&page=1&size=500&platfrom=";
    var url = "getPayout?page=1&size=500";
    vm.setDefault = function (data) {
      $rootScope.allbanklist = data.data;
    }
    httpRequest.get(url, vm.setDefault);
    $scope.$watch("thirdyrecord.manualForm.wechatName", function (data) {
      console.log("data:" + data);
      if (angular.isUndefined($rootScope.allbanklist))
        return;
      for (var i = 0; i < $rootScope.allbanklist.length; i++) {
        if ($rootScope.allbanklist[i].wechatName == data) {
          vm.manualForm.platfrom = $rootScope.allbanklist[i].plaftfrom;
          break;
        }
      }
    })
    $scope.$watch("thirdyrecord.manualForm.date", function (data) {
      if (angular.isUndefined(data))
        return;
      var isMatch = data.match(/^[0-9]\d{3}$/);
      if (isMatch != null) {
        vm.manualForm.date = "2019-" + data.substring(0, 2) + "-" + data.substring(2, 4);
      }
    })
    $scope.$watch("thirdyrecord.manualForm.time", function (data) {
      if (angular.isUndefined(data))
        return;
      var isMatch = data.match(/^[0-9]\d{3}$/);
      if (isMatch != null) {
        vm.manualForm.time = data.substring(0, 2) + ":" + data.substring(2, 4) + ":00";
      }
    })
    //if($rootScope.password == '123456'){
    //  $state.go('home.update');
    //}
    //var vm = this;
    //$('.downloading:eq(0)').css('width',$('.contentdiv').offset().left+'px');
    //$('.downloading:eq(1)').css('width',$('.contentdiv').offset().left+'px');
    //window.onresize = function(){
    //  $('.downloading:eq(0)').css('width',$('.contentdiv').offset().left+'px');
    //  //$('.downloading:eq(0)').css('width',$('.container').css('margin-left'));
    //  $('.downloading:eq(1)').css('width',$('.contentdiv').offset().left+'px');
    //}
  }
})();
