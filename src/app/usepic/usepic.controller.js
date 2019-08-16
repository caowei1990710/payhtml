/**
 * Created by snsoft on 28/8/2018.
 */
(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('usepicController', usepicController);
  /** @ngInject */
  function usepicController($scope, $timeout, httpRequest, $rootScope, $state, loc_language_cn, getDefault, $filter) {
    var vm = this;
    vm.sizePerPage = 500;
    vm.page = 1;
    vm.totalSum = 0;
    vm.query = {"name": "", "nickName": "", "qurl": "", "amount": 0}
    // for (var i = 0; i < $rootScope.allbanklist.length; i++) {
    //   if ($rootScope.allbanklist[i].wechatName == vm.manualForm.wechatName) {
    //     id = $rootScope.allbanklist[i].id;
    //     platfrom = $rootScope.allbanklist[i].plaftfrom;
    //     break
    //   }
    // }
    var url = "getPayout?page=1&size=500";
    vm.setDefault = function (data) {
      $rootScope.allbanklist = data.data;
    }
    httpRequest.get(url, vm.setDefault);
    vm.setContent = function (data) {
      vm.bankList = data.data;
      for (var i = 0; i < vm.bankList.length; i++) {
        vm.bankList[i].creatTime = $filter('dateFormate')(vm.bankList[i].creatTime);
        vm.bankList[i].overTime = $filter('dateFormate')(vm.bankList[i].overTime);
        vm.bankList[i].lastUsetime = $filter('dateFormate')(vm.bankList[i].lastUsetime);
      }
      vm.totalSum = data.totalnumber;
      console.log(data);
    }
    vm.get = function (page) {
      $rootScope.loading = true;
      $timeout(function () {
        $rootScope.loading = false;
      }, 500);
      var nickName = "";
      var qrurl = "";
      if (vm.query.nickName == "不可用")
        nickName = "123"
      else
        nickName = ""
      if(vm.query.qrurl=="没有")
        qrurl="default"
      else if(vm.query.qrurl=="赋值")
        qrurl="0"
      //http://zhifukaui111.info:8081/wechatitem?name=&ip=&type=id&state=&page=1&size=1000&note=1&amount=0&nickName=
      var url = "wechatitem?name=" + vm.query.name +
        "&amount=" + vm.query.amount + "&nickName=" + nickName + "&ip=&type=id&state=&qrurl=" + qrurl + "&page=" + vm.page + "&size=" + vm.sizePerPage + "&note=1";
      httpRequest.get(url, vm.setContent)
    }
  }
})();
