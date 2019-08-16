(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('transLateformcontroller', transLateformcontroller);

  /** @ngInject */
  function transLateformcontroller($rootScope, $filter, alertify, $scope, $log, $state, cashin, payment, device, transactionTask, jQ) {
    var vm = this;
    vm.query = {};
    vm.chang_status;
    vm.size = 500;
    vm.loadingTrank = function (page) {
      //transactionTask.queryTransferTaskReq(page, 8, {
      //  status: vm.query.status,
      //  startDate: vm.query.begintimer,
      //  endDate: vm.query.endtimer,
      //  platformId: vm.query.platformId
      //  //startDate: "2009-10-12 00:00:00",
      //  //endDate: "2016-10-14 00:00:00"
      //})
      if (vm.query.bankCard) {
        vm.query.srcbankcard = "[" + '"' + vm.query.bankCard.bankCard + '"' + "]";
      }
      else {
        vm.query.srcbankcard = "[";
        angular.forEach($rootScope.allbanklist, function (item, index) {
          vm.query.srcbankcard += '"' + item.bankCard + '"';
          if (index != $rootScope.allbanklist.length - 1)
            vm.query.srcbankcard += ",";
        });
        vm.query.srcbankcard += "]";
      }
      transactionTask.queryTransferTaskReq(page, vm.size, vm.query);
      //vm.query;
      //console.log(vm.query);
    }
    $scope.$on('changtabar', function (event, data) {
      if (data == "转账任务")
        vm.loadingTrank(1);
    });
    transactionTask.on('queryTransferTaskReq', function (data) {
      vm.translateList = data.items;
      angular.forEach(vm.translateList, function (item, index) {
        //console.log('index:'+index);
        item.createtime = $filter('dateFormate')(item.createtime);
      })
      vm.page = data.page;
      vm.total = data.total;
      vm.size = data.size;
    })
    transactionTask.on("receiveTransferTaskReq", function (data) {
      vm.editTask.lockstate = vm.chang_status;
      vm.loadingTrank(1);
      //if(vm.editTask.lockstate)
    })
    vm.finishTask = function (index, status) {
      if (index != -1) {
        jQ('#edittran').modal('show');
        vm.editTask = vm.translateList[index];
        if (!vm.editTask.operate_user)
          vm.editTask.operate_user = $rootScope.user.account;
      }
      if (status == 0) {
        jQ('#edittran').modal('hide');
      }
      if (status != -1) {
        vm.chang_status = status;
        if (vm.chang_status == 2) {
          if (!vm.editTask.handCredit) {
            return;
          }
          jQ('#edittran').modal('hide');
        }
        status += "";
        transactionTask.receiveTransferTaskReq({
          "transaction_id": vm.editTask.transaction_id,
          "operateuser": $rootScope.user.account,
          "operatestatus": status,
          "amount": vm.editTask.amount,
          "handCredit": vm.editTask.handCredit
        });
      }
    }
  }
})();
