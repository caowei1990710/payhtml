(function () {
  'use strict';

  angular
    .module('pmsJs')
    .service('proposal', proposal);

  /** @ngInject */
  function proposal(base) {
    var vm = this;
    angular.extend(proposal.prototype, base);
    vm.serviceName = 'proposal';
    vm.queryProposal = function (item) {
      vm.emit('queryProposal', {
        item: item
      })
    };
    vm.setTopupProposalStatus = function (item) {
      vm.emit('setTopupProposalStatus', {
        "depositId": "26509753117",
        "orderStatus": "1",
        "proposalId": "u276045",

      })
    }
    //vm.getProposalList = function (item) {
    //  vm.emit('getProposalList', {
    //    queryId: '1234',
    //    platformId: '1',
    //    startTime: '2016-07-12 12:20:30',
    //    endTime: '2016-07-13 12:00:00',
    //    pageNum: 1,
    //    pageSize: 10
    //  })
    //}
    //vm.setBonusProposalStatus = function (item) {
    //
    //}
    //vm.getProposalById = function(item){
    //  vm.emit('getProposalById', {
    //    proposalId: item.proposalId
    //  })
    //}
  }
})();
