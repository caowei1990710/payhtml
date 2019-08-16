(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('listItemController', listItemController);

  /** @ngInject */
  function listItemController( $log, $rootScope, proposal, $filter) {
    var vm = this;
    vm.query = {};
    proposal.on('queryProposal', function (data) {
      vm.proposalList = data.items;
      angular.forEach(vm.proposalList, function (item, index) {
        //console.log('index:'+index);
        item.createTime = $filter('dateFormate')(item.createTime);
        //item.lastLockTime = $filter('dateFormate')(item.lastLockTime);
        //bankcard.getBankCardDayAmount({'bankcardNo': item.bankCard});
      })
      vm.size = vm.proposalList.length;
    });
    vm.flush = function () {
      proposal.queryProposal(vm.query);
      //console.log('123');
    }
    vm.queryList = function () {
      //var typelist = $("input:checkbox[name='types']:checked");
      //if (typelist.length) {
      //  vm.query.type = '[';
      //  angular.forEach(typelist, function (item, index) {
      //    vm.query.type += typelist[index].value;
      //    if (index != typelist.length - 1)
      //      vm.query.type += ',';
      //  })
      //  vm.query.type += ']';
      //} else {
      //  vm.query.type = undefined;
      //}
      //if (vm.query.inputType)
      //  vm.query.type = '[' + vm.query.inputType + ']';
      //vm.query = '[0]';
      proposal.queryProposal(vm.query);
    };
    proposal.queryProposal(vm.query);
  }
})();
