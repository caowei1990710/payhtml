(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('RpController', RpController);

  /** @ngInject */
  function RpController($rootScope, user) {
    $rootScope.loading = false;
    var vm = this;
    if (!$rootScope.user)
      return;
    vm.user = {
      id: $rootScope.user.id,
      userName: $rootScope.user.userName
    }
    //vm.user.id = $rootScope.user.id;
    //vm.user.userName = $rootScope.user.userName;
    //angular.extend({
    //  vm..id:$rootScope.user.id,
    //  userName:$rootScope.user.username
    //},base);
    //vm.updatePwd = function () {
    //  user.updateUserPassword(vm.user);
    //}
  }
})();
