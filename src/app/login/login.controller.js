(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($log, $rootScope, $window, permission, $state, alertify, jQ, user, loc_language_cn, loc_language_en, transfer, getDefault, $timeout, finditem, $scope, roleHasPermission, heartBeat) {
    var vm = this;
    $("body").bind('click', function () {
      $("body").trigger('defaultbg');
    });
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
    //$rootScope.password = "123456";
    //vm.user = {
    //  "loginName": "admin",
    //  "password": "admin"
    //}
    jQ('#setDevice').modal('show');
    //getDefault.getAllstrong();
    //等待获取缓存然后判断是否有设备
    //$rootScope.$on('reflush',function(event,data){
    //  console.log(data);
    //  $timeout(function () {
    //    if (localStorage['number'] &&(finditem.getById('id', localStorage['number'], $rootScope.devicelist)))
    //      $rootScope.device = finditem.getById('id', localStorage['number'], $rootScope.devicelist);
    //    else
    //      jQ('#setDevice').modal('show');
    //  })
    //});
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
    //$rootScope.reflush = function () {
    //  //console.log('回调了');
    //  $timeout(function () {
    //    if (localStorage['number'] && (finditem.getById('id', localStorage['number'], $rootScope.devicelist)))
    //      $rootScope.device = finditem.getById('id', localStorage['number'], $rootScope.devicelist);
    //    else
    //      jQ('#setDevice').modal('show');
    //  })
    //};
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
    vm.getOperator = function () {
      if (angular.isUndefined(vm.user))
        return;
      user.queryOperator({"loginName": vm.user.loginName});
    }
    //if (window.sessionStorage.loginName)
    //  user.queryOperator({"loginName": window.sessionStorage.loginName});
    $timeout(function () {
      vm.getOperator();
    }, 2500);
    vm.setDevice = function () {
      if (vm.password == $rootScope.password) {
        localStorage['number'] = vm.deviceId;
        $rootScope.device = finditem.getById('id', localStorage['number'], $rootScope.devicelist);
        jQ('#setDevice').modal('hide');
      } else {
        alertify.error($rootScope.lagconfig["权限密码错误"]);
      }
    }
    if (window.localStorage.openMore == 'true') {
      $timeout(function () {
          vm.user = {
            'operatorName': window.sessionStorage.operatorName,
            loginName: window.sessionStorage.loginName,
            password: window.sessionStorage.password
          };
          if (window.sessionStorage.operatorName && 'undefined' != window.sessionStorage.operatorName) {
            //return;
            $rootScope.loading = true;
            user.login(vm.user);
          } else {
            window.sessionStorage.openMore = 'false';
          }
        }
        , 1500);
    }
    vm.login = function () {
      $rootScope.loading = true;
      if (!$rootScope.operator) {
        alertify.error($rootScope.lagconfig["请选择操作员"]);
        return;
      }
      vm.user.operatorName = $rootScope.operator.operatorName;
      user.login(vm.user);
    };
    user.on('queryOperator', function (data) {
      vm.operatorlist = data.items;
    })
    roleHasPermission.on('get', function (data) {
      $rootScope.permissionlist;
      if (!$rootScope.able)
        return;
      var itemlist = data.items;
      for (var k = 0; k < itemlist.length; k++) {
        if (itemlist[k].level == 2) {
          for (var i = 0; i < $rootScope.permissionlist.length; i++) {
            for (var j = 0; j < $rootScope.permissionlist[i].children.length; j++) {
              if ($rootScope.permissionlist[i].children[j].id == itemlist[k].id)
                $rootScope.able[i][j] = 1;
            }
          }
        }
      }
      //for (var i = 1; i < 27; i++) {
      //  vm.ablelist[i] = false;
      //}
      //if (!data.items) {
      //  return;
      //}
      //for (var i = 0; i < data.items.length; i++) {
      //  vm.ablelist[data.items[i].id] = true;
      //}
      //for (var i = 9; i < 27; i++) {
      //  if (vm.ablelist[i]) {
      //    for (var j = 1; j < vm.ablediff.length; j++) {
      //      if (j == vm.ablediff.length - 1) {
      //        if (i > vm.ablediff[j] - 1) {
      //          $rootScope.able[j][i - vm.ablediff[j]] = 1;
      //        }
      //      }
      //      else if (i > vm.ablediff[j] - 1 && i < vm.ablediff[j + 1]) {
      //        if($rootScope.able[j])
      //          $rootScope.able[j][i - vm.ablediff[j]] = 1;
      //      }
      //    } window.sessionStorage.user,window.sessionStorage.pwd
      //  }
      //}
      vm.beginroles++;
      //$(document).scrollTop(150);
      if (vm.beginroles == vm.roles) {
        if ($rootScope.password == '123456')
          $state.go('update');
        else
          $state.go('home.main');
      }
    });
    //if ('http://localhost:3000/#/login'!= window.sessionStorage.hash) {
    //  $rootScope.loading = true;
    //  user.login({loginName: window.sessionStorage.user, password: window.sessionStorage.pwd});
    //}
    user.on('login', function (data) {
      $rootScope.able = [[0], [0, 0], [0], [0, 0], [0, 0, 0, 0], [0, 0], [0, 0, 0, 0], [0], [0], [0]];
      $rootScope.authenticated = true;
      $rootScope.username = vm.user.loginName;
      $rootScope.password = vm.user.password;
      localStorage['token'] = data.token;
      //window.location.token = data.token;
      $rootScope.user = data.item;
      //if ($rootScope.operator)
      //  $rootScope.user.account = $rootScope.operator.operatorName;
      //else
      //  $rootScope.user.account = vm.user.loginName;
      getDefault.getAllstrong();
      permission.get();
      window.sessionStorage.loginName = vm.user.loginName;
      window.sessionStorage.password = vm.user.password;
      window.sessionStorage.operatorName = vm.user.operatorName;
      $rootScope.user.account = vm.user.operatorName;
      //user.addOperator({"operatorName":"test","userId":$rootScope.user.id,"loginName":$rootScope.username});
      $timeout(function () {
        $rootScope.isAcc = (vm.user.loginName.indexOf('admin') == -1);
        //$(document).scrollTop(150);
        if(!$rootScope.isAcc){
          $rootScope.able = [[1], [1, 1], [1,1], [0, 0, 1], [0, 0, 0, 0, 1, 1], [1, 1], [1, 1, 1, 1], [1], [1], [1]];
          $state.go('home.main');
        } else if (!data.item.roles) {
          $rootScope.able = [[1], [1, 1], [1], [0, 0, 1], [0, 0, 0, 0, 1, 1], [1, 1], [1, 1, 1, 1], [1], [1], [1]];
          alertify.success($rootScope.lagconfig["登录成功"]);
          //if ('http://localhost:3000/#/login'!= window.sessionStorage.hash)
          //  window.location.href =  window.sessionStorage.hash
          //else
          if ($rootScope.password == '123456')
            $state.go('update');
          else
            $state.go('home.main');
        } else {
          vm.beginroles = 0;
          vm.roles = data.item.roles.length;
          for (var i = 0; i < data.item.roles.length; i++) {
            //if (i == data.item.roles.length - 1)
            //  vm.gotomain = true;
            roleHasPermission.get(data.item.roles[i].id)
            //$rootScope.getFuc = true;
          }
          //$rootScope.able = transfer.stringtoArray(data.item.function)
        }
      }, 3000)
    });
  }
})();
