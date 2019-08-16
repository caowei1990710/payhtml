(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('thirdywrongreportController', thirdywrongreportController);
  /** @ngInject */
  function thirdywrongreportController($filter, $scope, $timeout, jQ, httpRequest, $rootScope, $state, loc_language_cn, alertify) {
    var vm = this;
    vm.query = {
      "platfrom": "121",
      "days": "1"
    };
    //http://101.37.64.220:8081/unNormalreportlist?days=0&platfrom=121

    vm.setPlatlist = function (data) {
      console.log("data:" + data.data);
      vm.DetailList = data.data.data;
      for (var i = 0; i < vm.DetailList.length; i++) {
        vm.DetailList[i].createTime = $filter('dateFormate')(vm.DetailList[i].createTime);
        if (vm.DetailList[i].type == 'cominput' || vm.DetailList[i].type == 'cominputfee')
          vm.DetailList[i].realMoney = (vm.DetailList[i].befroeMoney + vm.DetailList[i].lockMoney).toFixed(2);
        else
          vm.DetailList[i].realMoney = (vm.DetailList[i].befroeMoney).toFixed(2);
        // if()
      }
      $scope.$digest;
      // $rootScope.platfromlist.push({id: "9999", name: "未匹配"});
    }
    vm.get = function () {
      httpRequest.get("unNormalreportlist?days=" + vm.query.days + "&platfrom=" + vm.query.platfrom, vm.setPlatlist)
    }
  }
})();
