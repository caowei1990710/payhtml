(function() {
    'use strict';

    angular
        .module('pmsJs')
        .directive('cardTypeToName', cardTypeToName);

    /** @ngInject */
    function cardTypeToName() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/components/cardTypeToName/cardTypeToName.html',
            scope: {
                ngModel: '=',
            },
            controller: CardTypeToNameController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function CardTypeToNameController($log, cardTypeList) {
            var vm = this;
            vm.ngModel;

            for (var i in cardTypeList) {
                var tmp = cardTypeList[i];
                if (tmp.code == vm.ngModel) {
                    vm.name = tmp.text;
                }
            }
        }
    }

})();