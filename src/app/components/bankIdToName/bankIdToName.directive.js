(function() {
    'use strict';

    angular
        .module('pmsJs')
        .directive('bankIdToName', bankIdToName);

    /** @ngInject */
    function bankIdToName() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/components/bankIdToName/bankIdToName.html',
            scope: {
                ngModel: '=',
            },
            controller: BankIdToNameController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function BankIdToNameController($log, $timeout, $scope, bank) {
            var vm = this;
            vm.ngModel;

            function getBankTypeList() {
                bank.emit('get', {});
            }
            getBankTypeList();
            bank.on('get', function(data) {
                if (data.status == 200) {
                    for (var i in data.items) {
                        var tmp = data.items[i];
                        if (tmp.id == vm.ngModel) {
                            vm.name = tmp.name;
                            break;
                        }
                    }
                }
            }, true);
        }
    }

})();