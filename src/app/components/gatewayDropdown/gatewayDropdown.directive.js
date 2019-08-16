(function() {
    'use strict';

    angular
        .module('pmsJs')
        .directive('gatewayDropdown', gatewayDropdown);

    /** @ngInject */
    function gatewayDropdown() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/gatewayDropdown/gatewayDropdown.html',
            scope: {
                ngModel: '=',
                ngDisabled: '=',
                name: '=',
                selectedMerchant: '='
            },
            controller: GatewayDropdownController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function GatewayDropdownController($log, $timeout, $scope, gateWay) {
            var vm = this;
            vm.ngModel;
            vm.ngDisabled;
            vm.name;
            vm.selectedMerchant;

            $scope.$watch(function() {
                return vm.selectedMerchant;
            }, function() {
                vm.list = [];
                getMerchantTypeList();
            })

            function getMerchantTypeList() {
                if (vm.selectedMerchant) {
                    gateWay.emit('getByMerchantId', {
                        item: {
                            merchantId: vm.selectedMerchant
                        }
                    });
                }
            }
            getMerchantTypeList();
            gateWay.on('getByMerchantId', function(data) {
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