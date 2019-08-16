(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('shunpayHomeController', shunpayHomeController);
  /** @ngInject */
  function shunpayHomeController(httpRequest, $rootScope, $state, loc_language_cn, getDefault) {
    var vm = this;
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

    }
    // vm.changtabs = [{"text": "账户明细", "link": "shunpayhome.shunpayhomeaccount"}, {
    //   "text": "收款记录",
    //   "link": "shunpayhome.shunpayhomerecord"
    // }, {"text": "提现记录", "link": "shunpayhome.shunpayhomeoutput"}, {
    //   "text": "报表记录",
    //   "link": "shunpayhome.shunpayhomereportlist"
    // }]
    vm.changtabs = [{
      "text": "收款记录",
      "link": "shunpayhome.shunpayhomerecord"
    }]
    vm.selected = vm.changtabs[0];
    getDefault.getAllstrong();
    $rootScope.lagconfig = loc_language_cn;
    vm.changTab = function (index) {
      vm.selected = vm.changtabs[index];
      $state.go(vm.selected.link)
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
    httpRequest.get("agent?page=1&size=100", vm.setPlatlist)
    vm.logout = function () {
      $state.go('shunpaylogin');
      window.localStorage.clear();
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
