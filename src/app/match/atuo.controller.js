(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('autoMatchController', autoMatchController);

  /** @ngInject */
  function autoMatchController($scope,$timeout, matchingcashintask) {
    var vm = this;
    vm.query = {};
    //vm.pagesize = 10;
    vm.sizePerPage = 500;
    vm.toSelect = function (page) {
      vm.page = page;
      matchingcashintask.queryAutoMatching(page, vm.query, vm.sizePerPage);
    }
    matchingcashintask.on('queryAutoMatching', function (data) {
      vm.automatchlists = data.items;
      vm.total = data.total;
      vm.page = data.page;
      vm.sizePerPage = data.size;
    })
    //$scope.$on('changtabar', function (event, data) {
    //  if (data == "自动匹配")
      //if (!$scope.destory) {
    vm.toSelect(1);
      //}
    //});
  }
})();
