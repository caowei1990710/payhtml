(function () {
  'use strict';

  angular
    .module('pmsJs')
    .service('role', role);

  /** @ngInject */
  function role($window, base,$rootScope) {
    // "create",
    // "get",
    // "update",
    // "captcha",
    // "login",
    // "logout",
    // "isLogin",
    // "getSMSCode",
    // "updatePaymentInfo",
    // "updatePassword",
    // "updateSMSSetting",
    // "isValidUsername",
    // "authenticate"
    angular.extend(role.prototype, base);
    var vm = this;
    vm.serviceName = 'role';
    vm.get = function () {
      vm.emit('get', {});
    }
    vm.add = function (item) {
      $rootScope.loading = true;
      vm.emit('add', {
        item: {
          name: item.name,
          description: item.description
        }
      })
    }
    vm.update = function (item) {
      vm.emit('update', {
        item: {
          id: item.id,
          name: item.name,
          description: item.description
        }
      })
    }
    vm.delete = function (item) {
      vm.emit('delete', {
        item: {
          id: item.id
        }
      })
    }
  }
})();
