(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('thirdyLoginController', thirdyLoginController);

  /** @ngInject */
  function thirdyLoginController($log, $rootScope, $state, alertify, jQ, loc_language_cn, loc_language_en, transfer, getDefault, $scope, httpRequest) {
    var vm = this;
    $("body").bind('click', function () {
      $("body").trigger('defaultbg');
    });
    vm.user = {};
    window.localStorage.user = {};
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
    vm.gotolist = function (data) {
      if (data.code == 200){
        $state.go('thirdyhome.thirdyuser');
      }
      else
        alertify.error(data.msg)
    }
    vm.create = function (data, msg) {
      if (data) {
        httpRequest.get("getAuthictor?code=" + msg + "&secret=TFXUBPDON6SSVHPP", vm.gotolist)
      }
    }
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
    vm.result = function (data) {
      if (data.code == 200) {
        alertify.success(data.msg);
        var pormptresult = alertify.prompt("请输入谷歌验证码", vm.create);
        window.localStorage.id = data.data.id;
        window.localStorage.createrUser = data.data.createrUser;
        window.localStorage.crateTime = data.data.crateTime;
        window.localStorage.lastLoginIp = data.data.lastLoginIp;
        window.localStorage.lastLoginTime = data.data.lastLoginTime;
        window.localStorage.name = data.data.name;
        window.localStorage.password = data.data.password;
        window.localStorage.remark = data.data.remark;
        window.localStorage.role = data.data.role;
        window.localStorage.state = data.data.state;
        // $rootScope.user = data.data;
      } else
        alertify.error(data.msg);
    }
    $("#queryLogin").bind("keydown", function (e) {
      // 兼容FF和IE和Opera
      var theEvent = e || window.event;
      var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
      if (code == 13)
        vm.login();
    });
    vm.login = function () {
      httpRequest.post("userlogin", {"name": vm.user.loginName, "password": vm.user.password}, vm.result)
      // if (vm.user.loginName == "tony" && vm.user.password == "abcd1234")
      //   $state.go('thirdyhome.thirdyaccount');
      // else
      //   alertify.error("用户名或密码错误")
    };
  }
})();
