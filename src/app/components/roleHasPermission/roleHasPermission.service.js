(function () {
  'use strict';

  angular
    .module('pmsJs')
    .service('roleHasPermission', roleHasPermission);

  /** @ngInject */
  function roleHasPermission($window, base) {
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
    angular.extend(roleHasPermission.prototype, base);
    var vm = this;
    vm.serviceName = 'roleHasPermission';
    vm.get = function (roleId) {
      vm.emit('get', {
        item: {
          roleId: roleId
        }
      })
    }
    //vm.on('update',function(data){
    //  vm.get();
    //})
    vm.add = function(roleId,permissionIds){
      vm.emit('update', {
        item: {
          roleId: roleId,
          permissionIds:permissionIds
        }
      })
    }
  }
})();
