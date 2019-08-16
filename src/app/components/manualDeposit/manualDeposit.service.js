(function () {
  'use strict';

  angular
    .module('pmsJs')
    .service('manualDeposit', manualDeposit);

  /** @ngInject */
  function manualDeposit($window, base) {
    angular.extend(manualDeposit.prototype, base);
    var vm = this;
    vm.serviceName = 'manualDeposit';

    function list(page, size) {
      vm.emit('list', {
        page: page,
        size: size
      });
    }

    vm.list = list;
    function querryDeposit(page, size, item) {
      if (!item) {
        item = {};
      }
      vm.emit('querryDeposit', {
        item:item,
        "size": size,
        "page": page
      });
    }

    vm.updateDeposit = updateDeposit;
    function updateDeposit(item) {
      vm.emit('updateDeposit', {
        item: item
      })
    }

    vm.querryDeposit = querryDeposit;
    vm.cancellationDeposit = function(depositId){
      vm.emit('cancellationDeposit', {
        depositId: depositId
      });
    }
    function add(input) {
      vm.emit('add', {
        item: input
      });
    }

    vm.add = add;

    function update(input) {
      vm.emit('update', {
        item: input
      });
    }

    vm.update = update;
  }
})();
