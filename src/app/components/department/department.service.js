(function () {
  'use strict';

  angular
    .module('pmsJs')
    .service('department', department);

  /** @ngInject */
  function department($window, base,$rootScope) {
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
    angular.extend(department.prototype, base);
    var vm = this;
    vm.serviceName = 'department';
    vm.get = getDepart;
    function getDepart() {
      vm.emit('get', {})
    }
    vm.on('add',function(data){
      $rootScope.loading = true;
      vm.get();
    })
    vm.on('delete',function(data){
      vm.get();
    })
    vm.add = function (item) {
      vm.emit('add', {
        item:{
          name: item.name,
          parentId: item.id
        }
      })
    }
    vm.delete = function(item){
      vm.emit('delete', {
        item:{
          id: item.id
        }
      })
    }
  }
})();
