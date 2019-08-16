(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('shunpayHomeAccount', shunpayHomeAccount);
  /** @ngInject */
  function shunpayHomeAccount($scope, $timeout, httpRequest, $rootScope, alertify, $state, getDefault) {
    var vm = this;
    vm.showedit = false;
    vm.withraw = false;
    vm.showcashout = false;
    vm.withrawitem = {};
    vm.updateUser = {};
    vm.withrawitem = {};
    vm.user = angular.copy($rootScope.user);
    vm.showeditpwdwindow = false;
    vm.showeditBank = function () {
      vm.user = angular.copy($rootScope.user);
      vm.withraw = false;
      vm.showcashout = false;
      vm.showedit = true;
      vm.showeditpwdwindow = false;
    }
    vm.getUser = function (data) {
      if (data.code == 200) {
        alertify.success(data.msg);
        $rootScope.user = data.data[0];
        vm.user = angular.copy($rootScope.user);
        $scope.$digest();
      } else
        alertify.error(data.msg);
    }
    vm.reflush = function () {
      httpRequest.get("/agent?name=" + $rootScope.user.name + "&type=&state=&page=1&size=10", vm.getUser)
    }
    vm.showWithred = function () {
      if ($rootScope.user.paySafe == 'on') {
        var pormptresult = alertify.prompt("输入谷歌验证码", vm.setWithrowed);
      } else
        var cashoutresult = alertify.prompt("请输入取款密码", vm.gotopayCashout);
      // vm.user = angular.copy($rootScope.user);
    }
    vm.setToWithred = function (data) {
      if (data.code == 200) {
        $timeout(function () {
          var cashoutresult = alertify.prompt("请输入取款密码", vm.gotopayCashout);
        }, 2000);

      } else
        alertify.error("谷歌验证码错误");
    }
    vm.gotopayCashout = function (data, msg) {
      if (msg == $rootScope.user.payword) {
        vm.gotoWithred();
        $scope.$digest();
      } else
        alertify.error("取款密码错误");
    }
    vm.setWithrowed = function (data, msg) {
      httpRequest.get("/getAuthictor?code=" + msg + "&secret=" + $rootScope.user.paySecret, vm.setToWithred);
    }
    vm.gotoWithred = function () {
      vm.withraw = true;
      vm.showedit = false;
      vm.showcashout = false;
      vm.showeditpwdwindow = false;
    }
    vm.setChange = function (data) {
      if (data.code == 200) {
        var newvalue = "off";
        if ($rootScope.user.paySafe == 'off')
          newvalue = 'on'
        httpRequest.put("agent", {
          "id": vm.user.id,
          "paySafe": newvalue
        }, vm.result)
      } else
        alertify.error("谷歌验证码错误");
    }
    vm.setRight = function (data, msg) {
      httpRequest.get("/getAuthictor?code=" + msg + "&secret=" + $rootScope.user.paySecret, vm.setChange);
    }
    vm.change = function () {
      var pormptresult = alertify.prompt("输入谷歌验证码", vm.setRight);
    }
    vm.result = function (data) {
      vm.withraw = false;
      vm.showedit = false;
      vm.showcashout = false;
      vm.showeditpwdwindow = false;
      if (data.code == 200) {
        alertify.success(data.msg);
        $rootScope.user = data.data;
        $scope.$digest();
      } else
        alertify.error(data.msg);
    }
    vm.showcahout = function () {
      vm.withraw = false;
      vm.showedit = false;
      vm.showcashout = true;
      vm.showeditpwdwindow = false;
    }
    vm.update = function () {
      vm.user.crateTime = undefined;
      httpRequest.put("agent", {
        "id": vm.user.id,
        "bankCardType": vm.user.bankCardType,
        "bankCard": vm.user.bankCard,
        "bankCardName": vm.user.bankCardName,
      }, vm.result)
    }
    vm.showeditpwd = function (data) {
      vm.showeditpwdwindow = true;
      vm.showcashout = false;
      vm.showedit = false;
      vm.withraw = false;
    }
    vm.withresult = function (data) {
      if (data.code == 200) {
        alertify.success(data.msg);
        $scope.$digest();
      } else
        alertify.error(data.msg);
    }
    vm.withrawCreate = function () {
      vm.showedit = false;
      vm.withraw = false;
      vm.withrawitem.bankDest = vm.user.bankCard;
      vm.withrawitem.destType = vm.user.bankCardType;
      vm.withrawitem.destName = vm.user.bankCardName;
      vm.withrawitem.platfrom = vm.user.id;
      vm.withrawitem.angentName = vm.user.name;
      vm.withrawitem.createUser = vm.user.name;
      vm.withrawitem.remark = $rootScope.user.name;
      if (window.secured == '0')
        vm.withrawitem.sign = hex_md5($rootScope.user.name + vm.user.bankCard + $rootScope.user.sign);
      else
        vm.withrawitem.sign = '-999';
      httpRequest.post("cashoutproposal", vm.withrawitem, vm.withresult);
    }
    vm.editpwd = function () {
      httpRequest.post("agent", vm.user, vm.result)
    }
    vm.logout = function () {
      window.localStorage.clear();
      $state.go('shunpaylogin');
    }
    vm.updateCashoutpwd = function () {
      if ($rootScope.user.payword != vm.updateUser.oldcashoutpwd)
        alertify.error("旧密码错误");
      else if (angular.isUndefined(vm.updateUser.newcashoutpwd)) {
        alertify.error("新密码不能为空");
      } else if (vm.updateUser.newcashoutpwd.length < 6) {
        alertify.error("新密码格式不对");
      }
      else if (vm.updateUser.newcashoutpwd != vm.updateUser.suercashoutpwd)
        alertify.error("确认新密码");
      else if (vm.updateUser.newcashoutpwd == $rootScope.user.payword) {
        alertify.error("新旧密码不能相同");
      } else {
        // $rootScope.user.password = vm.updateUser.newpwd;
        httpRequest.put("agent", {"id": vm.user.id, "payword": vm.updateUser.newcashoutpwd}, vm.result)
      }
    }
    vm.updatepwd = function () {
      if ($rootScope.user.password != vm.updateUser.oldpwd)
        alertify.error("旧密码错误");
      else if (angular.isUndefined(vm.updateUser.newpwd)) {
        alertify.error("新密码不能为空");
      } else if (vm.updateUser.newpwd.length < 6) {
        alertify.error("新密码格式不对");
      }
      else if (vm.updateUser.newpwd != vm.updateUser.suerpwd)
        alertify.error("确认新密码");
      else if (vm.updateUser.newpwd == $rootScope.user.password) {
        alertify.error("新旧密码不能相同");
      } else {
        // $rootScope.user.password = vm.updateUser.newpwd;
        httpRequest.put("agent", {"id": vm.user.id, "password": vm.updateUser.newpwd}, vm.result)
      }
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
