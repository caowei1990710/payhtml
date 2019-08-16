(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('thridyOutputController', thridyOutputController);
  /** @ngInject */
  function thridyOutputController($scope, $timeout, bankcard, $rootScope, $state, httpRequest, $filter, jQ) {
    var vm = this;
    vm.query = {
      "page": "1",
      "size": "500",
      "beginTime": "0",
      "endTime": "0",
      "fromBank": "",
      "destBank": "",
      "depositNumber": "",
      "platfrom": "",
      "fromBankType": ""
    };
    vm.sizePerPage = 500;
    vm.page = 1;
    vm.totalSum = 0;
    vm.nowSum = 0;
    vm.payfee = 0;
    vm.getDate = function (data) {
      vm.recrodList = data.data;
      // vm.DepositList = data;
      for (var i = 0; i < data.data.length; i++) {
        vm.recrodList[i].createTime = $filter('dateFormate')(vm.recrodList[i].createTime);
      }
      vm.total = data.totalnumber;
      vm.totalSum = data.totalamount
      vm.nowSum = data.pageamount
      $scope.$digest();
    }
    vm.get = function (page) {
      httpRequest.get("output?page=" + page + "&size=" + vm.sizePerPage + "&platfrom=" + vm.query.platfrom + "&fromBank=" + vm.query.fromBank + "&destBank=" + vm.query.destBank + "&depositNumber=" + vm.query.depositNumber + "&fromBankType=" + vm.query.fromBankType + "&beginTime=" + new Date(vm.query.beginTime).getTime() + "&endTime=" + new Date(vm.query.endTime).getTime(), vm.getDate);
      // httpRequest.get("deposit?page=1&size=10&state=" + vm.query.state + "&beginTime=" + new Date(vm.query.beginTime).getTime() + "&endTime=" + new Date(vm.query.endTime).getTime() + "&beginTranstime=0&endTranstime=0&beginExcuteTime=0&endExcuteTime=0&wechatName=" + vm.query.wechatName + "&depositNumber=&billNo=", vm.getDate)
    }
    vm.create = function () {
      httpRequest.post("output", {"fromBank": "15602216040", "destBank": "622114578965", "amount": "100"});
    }
    // $scope.$watch("",function (data) {
    //   if(angular.isUndefined(data))
    //
    // })
    vm.getBankCard = function (data) {
      if (data.code == 200) {
        // alertify.success(data.msg);
        if (data.data.length > 0) {
          vm.bankType = data.data[0].type;
          vm.bankAmount = data.data[0].amount;
          // if (vm.bankType == 1) {
          //   vm.destbankCard = data.data[0].belongbankCard;
          //   vm.destblur();
          // }
          $scope.$digest();
        }
        else
          alertify.error("绑定银行卡错误");
      } else
        alertify.error(data.msg);
    }
    vm.outList = function () {
      var url = "exportcashout?page=" + 1 + "&size=" + vm.sizePerPage + "&platfrom=" + vm.query.platfrom + "&fromBank=" + vm.query.fromBank + "&destBank=" + vm.query.destBank + "&depositNumber=" + vm.query.depositNumber + "&fromBankType=" + vm.query.fromBankType + "&beginTime=" + new Date(vm.query.beginTime).getTime() + "&endTime=" + new Date(vm.query.endTime).getTime();
      window.open(window.url + url)
    }
    vm.getdestBankCard = function (data) {
      if (data.code == 200) {
        // alertify.success(data.msg);
        if (data.data.length > 0) {
          vm.destbankType = data.data[0].type;
          vm.destbankAmount = data.data[0].amount;
          $scope.$digest();
        }
        // httpRequest.post("wechatitem", vm.createBankForm, vm.result);
        else
          alertify.error("绑定银行卡错误");
      } else
        alertify.error(data.msg);
    }
    vm.blur = function (data) {
      // console.log("市区焦点");
      httpRequest.get("wechat?name=" + vm.fromBank + "&platfrom=&type=&state=&page=1&size=10", vm.getBankCard)
    }
    vm.destblur = function (data) {
      httpRequest.get("wechat?name=" + vm.destbankCard + "&platfrom=&type=&state=&page=1&size=10", vm.getdestBankCard)
    }
    vm.createResult = function (data) {
      jQ('#createTask').modal('hide');
      if (data.code == 200)
        alertify.success(data.msg);
      else
        alertify.error(data.msg);
    }
    vm.createTransferTaskBankCard = function () {
      httpRequest.post("output", {
        "fromBankType": vm.bankType,
        "fromBank": vm.fromBank,
        "destBank": vm.destbankCard,
        "destBankType": vm.destbankType,
        "amount": vm.translatecredit,
        "payfee": vm.payfee,
        "createUser": $rootScope.user.name
      }, vm.createResult);
    }
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
