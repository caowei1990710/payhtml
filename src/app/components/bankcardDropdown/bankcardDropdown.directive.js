(function() {
    'use strict';

    angular
        .module('pmsJs')
        .directive('bankcardDropdown', bankcardDropdown);

    /** @ngInject */
    function bankcardDropdown() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/components/bankcardDropdown/bankcardDropdown.html',
            scope: {
                ngModel: '=',
                ngDisabled: '=',
                name: '='
            },
            controller: BankcardDropdownController,
            controllerAs: 'vm',
            bindToController: true,
        };

        return directive;

        /** @ngInject */
        function BankcardDropdownController($log, $timeout, $scope, bank) {
            var vm = this;
            vm.ngModel;
            vm.ngDisabled;
            vm.name;

            function getBankTypeList() {
                bank.emit('get', {});
            }
            getBankTypeList();
            bank.on('get', function(data) {
                if (data.status == 200) {
                    vm.list = data.items;
                    var tmp = vm.ngModel;
                    vm.ngModel = undefined;
                    $timeout(function() {
                        vm.ngModel = tmp;
                    });
                }
            }, true);
        }
    }

})();