(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('UpdateController', UpdateController);

  /** @ngInject */
  function UpdateController($rootScope, user,$state) {
    $rootScope.loading = false;
    var vm = this;
    if (!$rootScope.user)
      return;
    vm.user = {
      id:$rootScope.operator.id,
      userId: $rootScope.user.id,
      operatorName: $rootScope.user.account,
      loginName:$rootScope.user.loginName,
    }
    //vm.user.id = $rootScope.user.id;
    //vm.user.userName = $rootScope.user.userName;
    //angular.extend({
    //  vm..id:$rootScope.user.id,
    //  userName:$rootScope.user.username
    //},base);
    user.on('updateOperatorPassword',function(data){
      $state.go('login');
    })
    vm.updatePwd = function () {
      user.updateOperatorPassword(vm.user);
    }
  }
})();
