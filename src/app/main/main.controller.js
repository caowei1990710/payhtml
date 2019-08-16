(function() {
  'use strict';

  angular
    .module('pmsJs')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout,$rootScope) {
    $(document).scrollTop(150);
    $rootScope.loading = false;
    var vm = this;
  }
})();
