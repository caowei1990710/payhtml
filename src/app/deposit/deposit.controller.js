(function() {
    'use strict';

    angular
        .module('pmsJs')
        .controller('DepositController', DepositController);

    /** @ngInject */
    function DepositController($scope,$log, $state, heartBeat ) {
        var vm = this;
        function detecting() {
          heartBeat .emit('detecting', {
                name: vm.username
            });
        }
        vm.detecting = detecting;

      heartBeat .on('detecting', function(data) {
            if (data.status == 200) {
                alert("Test ok.");
            }
        });
    }
})();
