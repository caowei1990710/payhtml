(function () {
  'use strict';

  angular
    .module('pmsJs')
    .service('heartBeat', heartBeat);

  /** @ngInject */
  function heartBeat($window, base, $timeout) {
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

    angular.extend(heartBeat.prototype, base);
    var vm = this;
    vm.serviceName = 'heartBeat';
    vm.heartBeat = function (time) {
      //vm.currentTime = (new Date()).getTime();
      vm.emit('heartBeat', {
        currentTime: time
      });
    }

  }
})();
