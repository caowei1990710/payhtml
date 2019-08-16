(function() {
    'use strict';

    angular
        .module('pmsJs')
        .directive('cardStatusToName', cardStatusToName);

    /** @ngInject */
    function cardStatusToName() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/components/cardStatusToName/cardStatusToName.html',
            scope: {
                ngModel: '=',
            },
            controller: CardStatusToNameController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function CardStatusToNameController($log, bankCardStatus,$rootScope) {
            var vm = this;
            vm.ngModel;

            for (var i in bankCardStatus) {
                var tmp = bankCardStatus[i];
                if (tmp.code == vm.ngModel) {
                    vm.name = $rootScope.lagconfig[tmp.text];
                }
            }
        }
    }

})();
