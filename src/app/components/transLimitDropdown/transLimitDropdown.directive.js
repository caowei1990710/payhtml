(function() {
    'use strict';

    angular
        .module('pmsJs')
        .directive('transLimitDropdown', transLimitDropdown);

    /** @ngInject */
    function transLimitDropdown() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/transLimitDropdown/transLimitDropdown.html',
            scope: {
                ngModel: '=',
                ngDisabled: '=',
                name: '=',
                selectedMerchant: '='
            },
            controller: TransLimitDropdownController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function TransLimitDropdownController($log, $timeout, $scope, transLimit) {
            var vm = this;
            vm.ngModel;
            vm.ngDisabled;
            vm.name;
            vm.selectedMerchant;

            $scope.$watch(function() {
                return vm.selectedMerchant;
            }, function() {
                vm.list = [];
                getLimitByMerchantId();
            })

            function getLimitByMerchantId() {
                if (vm.selectedMerchant) {
                    transLimit.emit('getByMerchantId', {
                        item: {
                            merchantId: vm.selectedMerchant
                        }
                    });
                }
            }
            getLimitByMerchantId();
            transLimit.on('getByMerchantId', function(data) {
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