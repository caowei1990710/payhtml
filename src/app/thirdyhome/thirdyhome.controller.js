(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('thirdyHomeController', thirdyHomeController);
  /** @ngInject */
  function thirdyHomeController($scope, $timeout, httpRequest, $rootScope, $state, loc_language_cn, getDefault) {
    var vm = this;
    $rootScope.user = {};
    if (angular.isUndefined(window.localStorage.role)) {
      $state.go("thirdylogin");
      return;
    } else {
      $rootScope.user.id = window.localStorage.id;
      $rootScope.user.createrUser = window.localStorage.createrUser;
      $rootScope.user.crateTime = window.localStorage.crateTime;
      $rootScope.user.lastLoginIp = window.localStorage.lastLoginIp;
      $rootScope.user.lastLoginTime = window.localStorage.lastLoginTime;
      $rootScope.user.name = window.localStorage.name;
      $rootScope.user.password = window.localStorage.password;
      $rootScope.user.remark = window.localStorage.remark;
      $rootScope.user.role = window.localStorage.role;
      $rootScope.user.state = window.localStorage.state;
    }
    if ($rootScope.user.role != "admin") {
      vm.changtabs = [{"text": "账号管理", "link": "thirdyhome.thirdyaccount"}, {
        "text": "补录流水",
        "link": "thirdyhome.thirdyrecord"
      }, {"text": "充值记录", "link": "thirdyhome.thirdyrplist"}, {
        "text": "提现记录",
        "link": "thirdyhome.thridyoutput"
      }, {"text": "提现提案", "link": "thirdyhome.thirdyproposal"}, {
        "text": "付款提案",
        "link": "thirdyhome.proposal"
      }, {"text": "报表统计", "link": "thirdyhome.thridyinput"}]
      $state.go("thirdyhome.thirdyaccount");
    } else {
      vm.changtabs = [{"text": "用户管理", "link": "thirdyhome.thirdyuser"}, {
        "text": "游戏方管理",
        "link": "thirdyhome.thirdyagent"
      },
        //   {
        //   "text": "图片管理",
        //   "link": "thirdyhome.thirdypic"
        // },
        {
          "text": "可用图片",
          "link": "thirdyhome.usepic"
        }, {
          "text": "提案列表",
          "link": "thirdyhome.proposal"
        }, {
          "text": "检测报表",
          "link": "thirdyhome.thirdywrongreport"
        }];
      $state.go("thirdyhome.thirdyuser");
    }

    vm.selected = vm.changtabs[0];
    getDefault.getAllstrong();
    $('title').text(vm.selected.text);
    $rootScope.lagconfig = loc_language_cn;
    vm.changTab = function (index) {
      vm.selected = vm.changtabs[index];
      $('title').text(vm.selected.text);
      $state.go(vm.selected.link)
    }
    //$rootScope.allbanklist
    var url = "wechat?name=&type=1&state=&page=1&size=10";
    vm.setDefault = function (data) {
      $rootScope.allbanklist = data.data;
    }
    vm.logout = function () {
      window.localStorage.clear();
      $state.go('thirdylogin');
    }
    httpRequest.get(url, vm.setDefault)
    vm.setPlatlist = function (data) {
      $rootScope.platfromlist = data.data;
      // $rootScope.platfromlist.push({id: "9999", name: "未匹配"});
    }
    httpRequest.get("agent?page=1&size=500&state=NORMAL", vm.setPlatlist)

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
