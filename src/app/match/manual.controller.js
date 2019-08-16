(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('manualMatchController', manualMatchController);

  /** @ngInject */
  function manualMatchController($scope, $timeout, matchingcashintask, $filter, jQ, alertify, $rootScope) {
    var vm = this;
    vm.query = {};
    vm.depositquery = {};
    vm.pagesize = 500;
    vm.toSelect = function (page) {
      matchingcashintask.queryMatchingCashIn(page, vm.query, vm.pagesize);
    }
    vm.handfees = [{type: 0, value: '是'}, {type: 1, value: '否'}];
    //vm.handCharge = vm.handfees[0];
    matchingcashintask.on('queryMatchingCashIn', function (data) {
      vm.matchcashlist = data.items;
      angular.forEach(vm.matchcashlist, function (item, index) {
        //console.log('index:'+index);
        item.createTime = $filter('dateFormate')(item.createTime);
        item.depositTime = $filter('dateFormate')(item.depositTime);

      })
      vm.total = data.total;
      vm.page = data.page;
      vm.querysize = data.size;
    });
    $timeout(function () {
      vm.setDefault();
    }, 5000);
    $scope.$on('$destroy', function () {
      vm.relfush = true;
      //console.log('手工销毁');
    });
    vm.setDefault = function () {
      if (vm.relfush) {
        return
      }
      for (var i = 0; i < vm.matchcashlist.length; i++) {
        if (vm.matchcashlist[i].flag)
          continue
        vm.depositquery.requestId = vm.matchcashlist[i].requestId;
        vm.depositquery.proposalId = vm.matchcashlist[i].proposalId;
        matchingcashintask.queryMatchDepositList(1, vm.depositquery);
      }
      $timeout(function () {
        vm.setDefault();
      }, 10000)
    }
    matchingcashintask.on('queryMatchDepositList', function (data) {
      if (vm.click) {
        vm.matchdepositlist = data.items;
        angular.forEach(vm.matchdepositlist, function (item, index) {
          //console.log('index:'+index);
          item.createtime = $filter('dateFormate')(item.createtime);
          item.depositTime = $filter('dateFormate')(item.depositTime);
        })
        vm.depositpage = data.page;
        vm.deposittotal = data.total;
        vm.pagesize = data.size;
        vm.click = false;
        if (parseInt(vm.deposittotal)) {
          jQ('#matchWindow').modal('show');
          vm.depositquery.requestId = vm.matchcashlist[vm.bankindex].requestId;
          vm.depositquery.proposalId = vm.matchcashlist[vm.bankindex].proposalId;
        } else {
          var confirmDel = confirm($rootScope.lagconfig["银行卡没有符合条件的流水,请录入流水或者取消单号"]);
        }
        //if (confirmDel) {
        //  onlinePay.upOnLineCashin(vm.onlinelist[e].requestId);
        //}
      } else {
        for (var i = 0; i < data.items.length; i++) {
          if (vm.matchcashlist[i].proposalId == data.proposalId) {
            vm.matchcashlist[i].flag = (data.items.length > 0);
            vm.matchcashlist = $filter("orderBy")(vm.matchcashlist,"flag",false);
            break;
          }
        }
      }
    });
    //matchingcashintask.on('manualMatchingReq', function (data) {
    //  //jQ('#matchWindow').modal('hide');
    //  $('#match').css('transition', "all 0s ease-in 0s");
    //  $('#match').css('transform', 'rotate(0deg)');
    //})
    vm.clickindex = function (e) {
      vm.bankindex = e;
      vm.matchcashitem = [];
      vm.matchcashitem.push(vm.matchcashlist[e]);
      vm.depositquery.requestId = vm.matchcashlist[vm.bankindex].requestId;
      vm.depositquery.proposalId = vm.matchcashlist[vm.bankindex].proposalId;
      vm.queryMatchDepositList(1);
      vm.click = true;
    }
    vm.showMatch = function () {
      jQ('#matchWindow').modal('show');
      vm.depositquery.requestId = vm.matchcashlist[vm.bankindex].requestId;
      vm.depositquery.proposalId = vm.matchcashlist[vm.bankindex].proposalId;
    }
    vm.queryMatchDepositList = function (page) {
      matchingcashintask.queryMatchDepositList(page, vm.depositquery);
    }
    vm.toSelect(1);
    vm.depositMatch = function (e) {
      vm.despositindex = e;
      vm.depositItem = vm.matchdepositlist[e];
    }
    vm.matchItem = function () {
      if (!vm.matchcashitem) {
        alertify.error($rootScope.lagconfig['请先选择单号']);
        return;
      }
      jQ('#matchWindow').modal('show');
      vm.queryMatchDepositList(1);
    }
    vm.matchDeposit = function () {
      if (!vm.depositItem) {
        alertify.error($rootScope.lagconfig['请选择银行卡流水']);
        return;
      }
      $('#match').css('transition', "all 0.5s ease-in 0.5s");
      $('#match').css('transform', 'rotate(360deg)');
      //if (vm.handCharge.type)
      //  vm.handCharge = 0 + "";
      //else
      //  vm.handCharge = vm.depositItem.handCharge + "";vm.matchcashitem
      vm.manualMatchingReq({
        requestId: vm.matchcashitem[0].requestId,
        amount:vm.matchcashitem[0].amount,
        realName:vm.matchcashitem[0].realName,
        depositMethod:vm.matchcashitem[0].depositMethod,
        depositId: vm.depositItem.depositId,
        proposalId: vm.matchcashitem[0].proposalId,
        handCharge: vm.handCharge,
      })
      jQ('#matchWindow').modal('hide');
      vm.toSelect(1);
      //vm.queryMatchDepositList(1);
    }
    vm.manualMatchingReq = function (item) {
      //var item = {
      //  proposalId:listitem.proposalId,
      //  depositId:listitem.depositId
      //}
      matchingcashintask.manualMatchingReq(item);
    }
  }
})();
