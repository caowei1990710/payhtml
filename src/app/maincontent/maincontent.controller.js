/**
 * Created by snsoft on 28/7/2018.
 */
(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('mainContentController', mainContentController);

  /** @ngInject */
  function mainContentController(httpRequest, $rootScope, $state, loc_language_cn, getDefault, $timeout, $scope) {
    var vm = this;
    vm.reflush = function (data) {
      if (data.data[0])
        $rootScope.user.amount = data.data[0].amount;
    }
    vm.flush = function () {
      httpRequest.get("agent?name=" + $rootScope.user.name + "&type=&state=&page=1&size=10", vm.reflush);
      $timeout(function () {
        vm.flush();
      }, 5000);
    }
    $scope.$on("childChange", function (e, value) {
      if (!angular.isUndefined(value))
        vm.colorselect(value)
      console.log(value);
    })
    if (angular.isUndefined(window.localStorage.role)) {
      $rootScope.user = {};
      $state.go("shunpaylogin");
      return;
    } else {
      if (angular.isUndefined($rootScope.user))
        $rootScope.user = {};
      if (!angular.isUndefined(window.localStorage.id) && window.localStorage.id != "null")
        $rootScope.user.id = window.localStorage.id;
      if (!angular.isUndefined(window.localStorage.createrUser) && window.localStorage.createrUser != "null")
        $rootScope.user.createrUser = window.localStorage.createrUser;
      if (!angular.isUndefined(window.localStorage.crateTime) && window.localStorage.crateTime != "null")
        $rootScope.user.crateTime = window.localStorage.crateTime;
      if (!angular.isUndefined(window.localStorage.lastLoginIp) && window.localStorage.lastLoginIp != "null")
        $rootScope.user.lastLoginIp = window.localStorage.lastLoginIp;
      if (!angular.isUndefined(window.localStorage.lastLoginTime) && window.localStorage.lastLoginTime != "null")
        $rootScope.user.lastLoginTime = window.localStorage.lastLoginTime;
      if (!angular.isUndefined(window.localStorage.name) && window.localStorage.name != "null")
        $rootScope.user.name = window.localStorage.name;
      if (!angular.isUndefined(window.localStorage.password) && window.localStorage.password != "null")
        $rootScope.user.password = window.localStorage.password;
      if (!angular.isUndefined(window.localStorage.remark) && window.localStorage.remark != "null")
        $rootScope.user.remark = window.localStorage.remark;
      if (!angular.isUndefined(window.localStorage.role) && window.localStorage.role != "null")
        $rootScope.user.role = window.localStorage.role;
      if (!angular.isUndefined(window.localStorage.amount) && window.localStorage.amount != "null")
        $rootScope.user.amount = window.localStorage.amount;
      if (!angular.isUndefined(window.localStorage.lockMoney) && window.localStorage.lockMoney != "null")
        $rootScope.user.lockMoney = window.localStorage.lockMoney;
      if (!angular.isUndefined(window.localStorage.amontfee) && window.localStorage.amontfee != "null")
        $rootScope.user.amontfee = window.localStorage.amontfee;
      if (!angular.isUndefined(window.localStorage.bankCardType) && window.localStorage.bankCardType != "null")
        $rootScope.user.bankCardType = window.localStorage.bankCardType;
      if (!angular.isUndefined(window.localStorage.bankCardName) && window.localStorage.bankCardName != "null")
        $rootScope.user.bankCardName = window.localStorage.bankCardName;
      if (!angular.isUndefined(window.localStorage.bankCard) && window.localStorage.bankCard != "null")
        $rootScope.user.bankCard = window.localStorage.bankCard;
      if (!angular.isUndefined(window.localStorage.payfee) && window.localStorage.payfee != "null")
        $rootScope.user.payfee = window.localStorage.payfee;
      if (!angular.isUndefined(window.localStorage.sign) && window.localStorage.sign != "null")
        $rootScope.user.sign = window.localStorage.sign;
      if (!angular.isUndefined(window.localStorage.callbackurl) && window.localStorage.callbackurl != "null")
        $rootScope.user.callbackurl = window.localStorage.callbackurl;
      if (!angular.isUndefined(window.localStorage.paySafe) && window.localStorage.paySafe != "null")
        $rootScope.user.paySafe = window.localStorage.paySafe;
      if (!angular.isUndefined(window.localStorage.paySecret) && window.localStorage.paySecret != "null")
        $rootScope.user.paySecret = window.localStorage.paySecret;//payword
      if (!angular.isUndefined(window.localStorage.payword) && window.localStorage.payword != "null")
        $rootScope.user.payword = window.localStorage.payword;
      if (!angular.isUndefined(window.localStorage.state) && window.localStorage.state != "null")
        $rootScope.user.state = window.localStorage.state;
      vm.flush();
    }
    vm.changtabs = [{"text": "账户明细", "link": "shunpayhome.shunpayhomeaccount"}, {
      "text": "收款记录",
      "link": "shunpayhome.shunpayhomerecord"
    }, {"text": "提现记录", "link": "shunpayhome.shunpayhomeoutput"}, {
      "text": "报表记录",
      "link": "shunpayhome.shunpayhomereportlist"
    }]
    vm.selected = vm.changtabs[0];
    // vm.colorselect(0)
    getDefault.getAllstrong();
    $rootScope.lagconfig = loc_language_cn;
    vm.changTab = function (index) {
      vm.selected = vm.changtabs[index];
      $state.go(vm.selected.link)
    }
    vm.colorselect = function (i) {
      switch (i) {
        case 0:
          $("#first").css("background", "#C59F60");
          $("#second").css("background", "transparent");
          $("#thirdy").css("background", "transparent");
          $("#forth").css("background", "transparent");
          $("#five").css("background", "transparent");
          $("#secondlist").css("display", "none");
          $("#thirdylist").css("display", "none");
          $("#forthlist").css("display", "none");
          $("#fivelist").css("display", "none");
          break;
        case 1:
          $("#first").css("background", "transparent");
          $("#second").css("background", "#C59F60");
          $("#thirdy").css("background", "transparent");
          $("#forth").css("background", "transparent");
          $("#five").css("background", "transparent");
          $("#secondlist").css("display", "inline-block");
          $("#thirdylist").css("display", "none");
          $("#forthlist").css("display", "none");
          $("#fivelist").css("display", "none");
          break;
        case 2:
          $("#first").css("background", "transparent");
          $("#second").css("background", "transparent");
          $("#thirdy").css("background", "#C59F60");
          $("#forth").css("background", "transparent");
          $("#five").css("background", "transparent");
          $("#secondlist").css("display", "none");
          $("#thirdylist").css("display", "inline-block");
          $("#forthlist").css("display", "none");
          $("#fivelist").css("display", "none");
          break;
        case 3:
          $("#first").css("background", "transparent");
          $("#second").css("background", "transparent");
          $("#thirdy").css("background", "transparent");
          $("#forth").css("background", "#C59F60");
          $("#five").css("background", "transparent");
          $("#secondlist").css("display", "none");
          $("#thirdylist").css("display", "none");
          $("#forthlist").css("display", "inline-block");
          $("#fivelist").css("display", "none");
          break;
        case 4:
          $("#first").css("background", "transparent");
          $("#second").css("background", "transparent");
          $("#thirdy").css("background", "transparent");
          $("#forth").css("background", "transparent");
          $("#five").css("background", "#C59F60");
          $("#secondlist").css("display", "none");
          $("#thirdylist").css("display", "none");
          $("#forthlist").css("display", "none");
          $("#fivelist").css("display", "inline-block");
          break;
      }
    }
    vm.logout = function () {
      window.localStorage.clear();
      $state.go('tologin');
    }
    vm.goOther = function (i) {
      switch (i) {
        case 1:
          // vm.colorselect(0);
          if ($('#select_more').is(':checked'))
            window.open(window.location.origin + "/#/maincontent/first/0");
          else
            $state.go('maincontent.first', {'id': '0'});
          break
        case 2:
        case 3:
          // vm.colorselect(1);
          if ($('#select_more').is(':checked'))
            window.open(window.location.origin + "/#/maincontent/second/0");
          else
            $state.go('maincontent.second', {'id': '0'});
          break;
        case 4:
        case 5:
          vm.colorselect(2);
          if ($('#select_more').is(':checked'))
            window.open(window.location.origin + "/#/maincontent/three/1");
          else
            $state.go('maincontent.three', {'id': '1'});
          break;
        case 6:
          // vm.colorselect(2);
          if ($('#select_more').is(':checked'))
            window.open(window.location.origin + "/#/maincontent/three/2");
          else
            $state.go('maincontent.three', {'id': '2'});
          break;
        case 8:
        // $state.go('maincontent.four', {'id': '1'});
        // break;
        case 9:
          vm.colorselect(3);
          if ($('#select_more').is(':checked'))
            window.open(window.location.origin + "/#/maincontent/four/1");
          else
            $state.go('maincontent.four', {'id': '1'});
          break;
        case 10:
          vm.colorselect(3);
          if ($('#select_more').is(':checked'))
            window.open(window.location.origin + "/#/maincontent/four/2");
          else
            $state.go('maincontent.four', {'id': '2'});
          break;
        case 11:
          vm.colorselect(3);
          if ($('#select_more').is(':checked'))
            window.open(window.location.origin + "/#/maincontent/four/3");
          else
            $state.go('maincontent.four', {'id': '3'});
          break;
        case 12:
          if ($('#select_more').is(':checked'))
            window.open(window.location.origin + "/#/maincontent/second/1");
          else
            $state.go('maincontent.second', {'id': '1'});
          break;
        case 18:
          vm.colorselect(4);
          break;
        default:
          break;
      }
      // alert(i);
    }
    //$rootScope.allbanklist
    var url = "wechat?name=&type=&state=&page=1&size=10";
    vm.setDefault = function (data) {
      $rootScope.allbanklist = data;
    }
    httpRequest.get(url, vm.setDefault)
    vm.setPlatlist = function (data) {
      $rootScope.platfromlist = data.data;
    }
    httpRequest.get("agent?page=1&size=100", vm.setPlatlist);
    vm.colorselect(0);
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
