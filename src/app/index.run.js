(function() {
  'use strict';

  angular
    .module('pmsJs')
    .run(runBlock)
    .run(runLoadingbar)
    .run(runValidator);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

  function runLoadingbar($rootScope, $timeout) {
    $rootScope.$on('$viewContentLoaded', function() {
      $timeout(function() {
        $rootScope.refresh = false;
      }, 1000)

    });
  }

  function runValidator($rootScope, $state) {
    $rootScope.authenticated = true;
    $rootScope.$on('$stateChangeStart', function(e, toState) {
      var isLoginPage = toState.name === "login"
      if (isLoginPage) {
        return;
      }

      if (!$rootScope.authenticated) {
        e.preventDefault();
        $state.go('login');
      }
    });
  }

})();
