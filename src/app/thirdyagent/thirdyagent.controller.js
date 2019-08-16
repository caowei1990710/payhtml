(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('thirdyAgentController', thirdyAgentController);
  /** @ngInject */
  function thirdyAgentController($scope, $timeout, jQ, httpRequest, $rootScope, $filter, $state, loc_language_cn) {
    var vm = this;
    vm.createBankForm = {};
    vm.editBankForm = {};
    vm.thirdyaccount = {};
    vm.createAgentitem = {"payBanktype": "3", "payType": "2"};
    vm.totalSum = 0;
    vm.totalamount = 0;
    vm.pageamount = 0;
    vm.sizePerPage = 500;
    vm.page = 1;
    vm.query = {
      "name": "",
      "agentName": "",
      "state": ""
    };
    vm.get = function (page) {
      // var url = "wechat?name=" + (angular.isUndefined(vm.query.name) ? "" : vm.query.name) + "&type=" + (angular.isUndefined(vm.query.type) ? "" : vm.query.type) + "&state=" + (angular.isUndefined(vm.query.state) ? "" : vm.query.state) + "&page=1&size=10"
      var url = "agent?name=" + vm.query.name + "&type&create=&agentName=" + vm.query.agentName + "&state=" + vm.query.state + "&page=" + page + "&size=" + vm.sizePerPage;
      httpRequest.get(url, vm.setDefault)
    }
    vm.setPayQr = function (data) {
      var url = "getQr?value=" + data;
      httpRequest.get(url, vm.setResult)
    }
    vm.setResult = function (data) {
      vm.get(1);
    }
    vm.setDefault = function (data) {
      vm.bankList = data.data;
      for (var i = 0; i < data.data.length; i++) {
        vm.bankList[i].crateTime = $filter('dateFormate')(vm.bankList[i].crateTime);
        vm.bankList[i].lastLoginTime = $filter('dateFormate')(vm.bankList[i].lastLoginTime);
      }
      vm.totalSum = data.totalnumber;
      vm.totalamount = data.totalamount;
      vm.pageamount = data.pageamount;
      $scope.$digest();
    }
    vm.result = function (data) {
      jQ('#createBank').modal('hide');
      alertify.success(data.msg);
    }
    vm.update = function (index) {
      vm.itemAgent = angular.copy(vm.bankList[index]);
      if (vm.itemAgent.proposalLockTime < 10)
        vm.itemAgent.proposalLockTime = 10;
      var pormptresult = alertify.prompt("请输入谷歌验证码", vm.create);
    }
    vm.create = function (data, msg) {
      if (data) {
        vm.itemAgent.code = msg;
        httpRequest.post("updatesagent", vm.itemAgent, vm.updateAgent)
      }
    }
    vm.createBankCard = function () {
      httpRequest.post("wechatitem", vm.createBankForm, vm.result);
    }
    vm.updateBankCard = function () {
      jQ('#editBank').modal('hide');
      httpRequest.put("wechatitem", vm.editBankForm, vm.result);
    }
    vm.showeditBank = function () {
      jQ('#editBank').modal('show');
    }
    vm.updateAgent = function (data) {
      jQ('#updatePlatform').modal('hide');
      jQ('#createPlatform').modal('hide');
      if (data.code == 200) {
        alertify.success(data.msg);
      } else
        alertify.error(data.msg);
      vm.get(1);
    }
    vm.createAgent = function () {
      httpRequest.post("updatesagent", vm.createAgentitem, vm.updateAgent)
    }
    vm.editAgentupdate = function () {
      httpRequest.post("updatesagent", vm.editAgent, vm.updateAgent)
    }
    vm.editBank = function (index) {
      vm.bankindex = index;
      vm.editBankForm = angular.copy(vm.bankList[index]);
    }
    vm.showeditAgent = function () {
      vm.editAgent = angular.copy(vm.bankList[vm.bankindex]);
      jQ('#updatePlatform').modal('show');
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
