(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('firstController', firstController);

  /** @ngInject */
  function firstController($scope, $rootScope, $filter, httpRequest) {
    var vm = this;
    vm.lastLoginTime = $filter('dateFormate')(parseInt($rootScope.user.lastLoginTime));
    vm.state = $filter('nameTovalue')($rootScope.user.state, "id", "name", $rootScope.banktypecardstatus);
    //banktypecardstatus
    //http://zhifukaui111.info:8081/deposit?page=1&size=1&state=&beginTime=0&endTime=0&beginTranstime=0&endTranstime=0&beginExcuteTime=0&endExcuteTime=0&platfrom=1&wechatName=&depositNumber=&billNo=
    vm.getReposit = function () {
      httpRequest.get("deposit?page=1&size=1&state=&beginTime=0&endTime=0&beginTranstime=0&endTranstime=0&beginExcuteTime=0&endExcuteTime=0&platfrom=" + $rootScope.user.id + "&wechatName=&depositNumber=&billNo=", vm.getDate)
    }
    vm.getDate = function (data) {
      vm.moneyfirst = data.data[0];
    }
    vm.outResult = function (data) {
      vm.outfirst = data.data[0];
    }
    vm.getOutput = function () {
      httpRequest.get("cashoutproposal?page=1&size=1&state=&beginTime=0&endTime=0&state=&platfrom=" + $rootScope.user.id, vm.outResult);
    }
    $scope.$emit("childChange", 0)
    vm.getReposit();
    vm.getOutput();
  }
})();
