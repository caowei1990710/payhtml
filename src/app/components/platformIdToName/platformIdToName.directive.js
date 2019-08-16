(function() {
    'use strict';

    angular
        .module('pmsJs')
        .directive('platformIdToName', platformIdToName);

    /** @ngInject */
    function platformIdToName() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/components/platformIdToName/platformIdToName.html',
            scope: {
                ngModel: '=',
            },
            controller: PlatformIdToNameController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function PlatformIdToNameController($rootScope,$log, $timeout, $scope, platform) {
            var vm = this;
            vm.ngModel;

            function getPlatformList() {
                platform.emit('getPlatformList', {});
            }
            getPlatformList();

            platform.once('getPlatformList', function(data) {
                if (data.status == 200) {
                    for (var i in data.items) {
                        var tmp = data.items[i];
                        if (tmp.id == vm.ngModel) {
                            vm.name = tmp.name;
                            break;
                        }
                    }
                }
            });
        }
    }

})();
