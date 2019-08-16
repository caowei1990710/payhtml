(function () {
  'use strict';

  angular
    .module('pmsJs')
    .service('user', user);

  /** @ngInject */
  function user($window, base, $rootScope) {
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
    angular.extend(user.prototype, base);
    var vm = this;
    vm.serviceName = 'user';
    vm.login = login;
    function login(item) {
      vm.emit('login', {
        item: {
          loginName: item.loginName,
          password: item.password,
          operatorName: item.operatorName
        }
      })
    }

    vm.creatuser = createUser;
    function createUser(item) {
      vm.emit('createUser', {
        item: item
      })
    }

    vm.queryUser = queryUser;
    function queryUser(item, page, size) {
      vm.emit('queryUser', {
        item: item,
        page: page,
        size: size
      })
    }

    vm.queryOperator = function (item) {
      vm.emit('queryOperator', {
        item: item
      })
    }
    vm.addOperator = function (item) {
      vm.emit('addOperator', {
        item: item
      })
    }
    vm.updateOperator = function (item) {
      vm.emit('updateOperator', {
        item: item
      })
    }
    vm.createUser = createUser;
    function createUser(item) {
      $rootScope.loading = true;
      vm.emit('createUser', {
        item: item
      })
    }

    vm.updateUserPassword = updateUserPassword;
    function updateUserPassword(item) {
      vm.emit('updateUserPassword', {
        item: item
      })
    }
    vm.updateOperatorPassword = function updateOperatorPassword(item){
      vm.emit('updateOperatorPassword', {
        item: item
      })
    }
    vm.updateUser = updateUser;
    function updateUser(item) {
      vm.emit('updateUser', {
        //item:item
        item: {
          id: item.id,
          password: item.password,
          function: item.function,
          userName: item.username,
          nickName: item.nickname,
          roles: item.roles,
          platformId: item.platformId
          //departmentId:item.departmentId
        }
      })
    }
  }
})();
