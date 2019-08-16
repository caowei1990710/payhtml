(function() {
    'use strict';

    angular
        .module('pmsJs')
        .directive('merchantTypeDropdown', merchantTypeDropdown);

    /** @ngInject */
    function merchantTypeDropdown() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/merchantTypeDropdown/merchantTypeDropdown.html',
            scope: {
                ngModel: '=',
                ngDisabled: '=',
                name: '='
            },
            controller: MerchantTypeDropdownController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function MerchantTypeDropdownController($log, $timeout, $scope, merchantType) {
            var vm = this;
            vm.ngModel;
            vm.ngDisabled;
            vm.name;

            // function getMerchantTypeList() {
            //     merchant.emit('getMerchantTypeList', {});
            // }
            // getMerchantTypeList();
            // merchant.once('getMerchantTypeList', function(data) {
            //     if (data.status == 200) {
            //         vm.list = data.items;
            //     }
            // });

            function getMerchantTypeList() {
                merchantType.emit('get', {});
            }
            getMerchantTypeList();
            merchantType.once('get', function(data) {
                if (data.status == 200) {
                    vm.list = data.items;
                    var tmp = vm.ngModel;
                    vm.ngModel = undefined;
                    $timeout(function() {
                        vm.ngModel = tmp;
                    });
                }
            });
        }
    }

})();