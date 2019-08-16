/**
 * Created by snsoft on 27/7/2018.
 */
(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('toLoginController', toLoginController);

  /** @ngInject */
  function toLoginController($log, $rootScope, httpRequest, permission, $state, alertify, jQ, loc_language_cn, loc_language_en, transfer, getDefault, $timeout, finditem, $scope, heartBeat) {
    var vm = this;
    vm.destimgSrc = "";
    vm.secured = window.secured;
    $("body").bind('click', function () {
      $("body").trigger('defaultbg');
    });
    vm.user = {};
    //vm.user = {};
    //document.body.bind('click')
    //$timeout(function () {
    //  user.queryOperator({"loginName": "admin"});
    //}, 5000)
    vm.languages = [{id: "cn", name: "中文"}, {id: "en", name: "english"}];
    $rootScope.language = vm.languages[0];
    $rootScope.lagconfig = loc_language_cn;
    //vm.ablediff = [9, 12, 14, 15, 17, 21, 23];
    vm.ablelist = {};
    vm.gotomain = false;
    //[1], [1, 1], [1], [1, 1, 1], [1, 1, 1, 1], [1, 1, 1], [1], [1, 1, 1, 1, 1, 1]];
    localStorage["language"] = 'cn';
    jQ('#setDevice').modal('show');
    $scope.$on('$destroy', function () {
      $rootScope.reflush = undefined;
      if ($rootScope.reflush && angular.isFunction($rootScope.reflush)) {
        $rootScope.reflush();
      }
      ;
    });
    //permission
    permission.on('get', function (data) {
      $rootScope.permissionlist = data.items;
    });
    //切换语言
    vm.setlag = function () {
      if ($rootScope.language.id == "cn") {
        localStorage["language"] = 'cn';
        $rootScope.lagconfig = loc_language_cn;
      }
      else {
        $rootScope.lagconfig = loc_language_en;
        localStorage["language"] = 'en';
      }
    }
    vm.reflushsrc = function () {
      vm.getImg();
    }
    vm.result = function (data) {

      if (data.code == 200) {
        // alertify.success(data.msg);
        $state.go('maincontent.first', {'id': '0'});
        // $state.go('shunpayhome.shunpayhomeaccount');
        $rootScope.user = data.data;
        window.localStorage.id = data.data.id;
        window.localStorage.createrUser = data.data.createrUser;
        window.localStorage.crateTime = data.data.crateTime;
        window.localStorage.lastLoginIp = data.data.lastLoginIp;
        window.localStorage.lastLoginTime = data.data.lastLoginTime;
        window.localStorage.name = data.data.name;
        window.localStorage.password = data.data.password;
        window.localStorage.payword = data.data.payword;
        window.localStorage.remark = data.data.remark;
        window.localStorage.role = data.data.role;
        window.localStorage.state = data.data.state;
        window.localStorage.amount = data.data.amount;
        window.localStorage.lockMoney = data.data.lockMoney;
        window.localStorage.amontfee = data.data.amontfee;
        window.localStorage.bankCardType = data.data.bankCardType;
        window.localStorage.bankCardName = data.data.bankCardName;
        window.localStorage.bankCard = data.data.bankCard;
        window.localStorage.payfee = data.data.payfee;
        window.localStorage.sign = data.data.sign;
        window.localStorage.callbackurl = data.data.callbackurl;
        window.localStorage.paySafe = data.data.paySafe;
        window.localStorage.paySecret = data.data.paySecret;
      }
      else
        alert(data.msg);
    }
    vm.imgresult = function (data) {
      vm.imgsrc = "data:image/png;base64," + data.data;
      vm.destimgSrc = data.msg;
    }
    vm.getImg = function () {
      httpRequest.get("images/imagecode", vm.imgresult)
    }
    vm.getImg();
    vm.login = function () {
      if (vm.secured != '0')
        httpRequest.post("angentlogin", {"name": vm.user.loginName, "password": vm.user.password}, vm.result)
      else if (vm.srcpwd == vm.destimgSrc)
        httpRequest.post("angentlogin", {"name": vm.user.loginName, "password": vm.user.password}, vm.result)
      // httpRequest.get("images/imagecode", vm.result)
      else
        alert("验证码错误");
      // httpRequest.post("angentlogin", {"name": vm.user.loginName, "password": vm.user.password}, vm.result)
    };
    $("#queryLogin").bind("keydown", function (e) {
      // 兼容FF和IE和Opera
      var theEvent = e || window.event;
      var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
      if (code == 13)
        vm.login();
    });
  }
})();
