(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('thirdyUserController', thirdyUserController);
  /** @ngInject */
  function thirdyUserController($filter, $scope, $timeout, jQ, httpRequest, $rootScope, $state, loc_language_cn, alertify) {
    var vm = this;
    vm.createBankForm = {};
    vm.editBankForm = {};
    vm.thirdyaccount = {};
    vm.totalSum = 0;
    vm.bankindex = -1;
    vm.sizePerPage = 10;
    vm.page = 1;
    vm.query = {"name": "", "create": ""};
    vm.setDefault = function (data) {
      vm.bankList = data.data;
      vm.totalSum = data.totalnumber;
      for (var i = 0; i < data.data.length; i++) {
        vm.bankList[i].crateTime = $filter('dateFormate')(vm.bankList[i].crateTime);
        vm.bankList[i].lastLoginTime = $filter('dateFormate')(vm.bankList[i].lastLoginTime);
      }
      $scope.$digest();
    }
    vm.get = function (page) {
      var url = "user?page=" + page + "&size=" + vm.sizePerPage + "&name=" + vm.query.name + "&create=" + vm.query.create;
      httpRequest.get(url, vm.setDefault)
    }
    vm.editBank = function (index) {
      // vm.bankindex = index;
      if (vm.bankindex == -1)
        alertify.error("请重新选择");
      else
        vm.edituseritem = angular.copy(vm.bankList[vm.bankindex]);
      jQ('#updateUser').modal('show');
    }
    vm.result = function (data) {
      jQ('#userRole').modal('hide');
      if (data.code == 200) {
        alertify.success(data.msg);
      } else
        alertify.error(data.msg);
    }
    vm.edituser = function () {
      httpRequest.post("user", vm.edituseritem, vm.updateResult);
    }
    vm.updateResult = function (data) {
      jQ('#updateUser').modal('hide');
      if (data.code == 200) {
        alertify.success(data.msg);
      } else
        alertify.error(data.msg);
      vm.get(1);
    }
    vm.createnewuser = function () {
      vm.creatuseritem.createrUser = "tony";
      httpRequest.post("user", vm.creatuseritem, vm.result);
    }
    // vm.result = function (data) {
    //
    //   alertify.success(data.msg);
    // }
    vm.createBankCard = function () {
      httpRequest.post("wechatitem", vm.createBankForm, vm.result);
    }
    vm.updateBankCard = function () {
      jQ('#editBank').modal('hide');

      // httpRequest.put("wechatitem", vm.editBankForm, vm.result);
    }
    vm.showeditBank = function () {
      jQ('#editBank').modal('show');
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
