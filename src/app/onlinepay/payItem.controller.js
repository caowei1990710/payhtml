/**
 * Created by DEV-02 on 11/7/2016.
 */
(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('payItemController', payItemController);

  /** @ngInject */
  function payItemController(onlinePay, $rootScope, $filter, $scope, $timeout, alertify) {
    var vm = this;
    vm.countNo = 10;
    vm.pagesize = 500;
    vm.query = {
      //proposalId: 'u275974',
      //platformId: '1',
      //merchantName:'saoma010'
    };
    $scope.$on('$destroy', function () {
      $scope.destory = true;
    });
    $scope.getCountround = function () {
      $timeout(function () {
        vm.countNo--;
        if ($scope.destory)
          return;
        if (vm.countNo == 0) {
          vm.countNo = 10;
          vm.querylist(vm.page);
        }
        $scope.getCountround();
      }, 1000)
    }
    $scope.getCountround();
    vm.querylist = function (page) {
      onlinePay.getOnLineCashin(vm.query, page, vm.pagesize);
    }
    vm.querylist(1);
    onlinePay.on('getOnLineCashin', function (data) {
      vm.onlinelist = data.items;
      angular.forEach(vm.onlinelist, function (item, index) {
        //console.log('index:'+index);
        item.createTime = $filter('dateFormate')(item.createTime);
      })
      //var orderBy = cancePluRedOnLineCashin $filter("orderBy");
      //vm.onlinelist = orderBy(vm.onlinelist, "singleFlag", true);
      vm.page = data.page;
      //vm.pagesize = data.size;
      vm.total = data.total;
      //vm.size = data.size;
    });
    vm.updatePay = function (e) {
      var confirmDel = confirm("确认补单？");
      if (confirmDel) {
        onlinePay.upOnLineCashin(vm.onlinelist[e].requestId);
      }
    }
    vm.cancePluRedOnLineCashin = function (e) {
      var confirmDel = confirm("确认取消么？");
      if (confirmDel) {
        onlinePay.cancePluRedOnLineCashin(vm.onlinelist[e].requestId);
      }
    }
    onlinePay.on('upOnLineCashin', function () {
      alertify.success($rootScope.lagconfig["操作成功"]);
      vm.querylist(1);
    });
  }
})();
