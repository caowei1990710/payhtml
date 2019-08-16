(function() {
    'use strict';

    angular
        .module('pmsJs')
        .service('device', device);

    /** @ngInject */
    function device($window, base) {
        // "create",
        // "get",
        // "update",
        // "captcha",
        // "login",
        // "logout",
        // "isLogin",
        // "getSMSCode",
        // "updatePaymentInfo",
        // "updatePassword",
        // "updateSMSSetting",
        // "isValidUsername",
        // "authenticate"
        angular.extend(device.prototype, base);
        var vm = this;
        vm.serviceName = 'device';

        function list(page, size) {
            vm.emit('list', {
                page: page,
                size: size
            });
        }
        vm.list = list;

        function add(input) {
            vm.emit('add', {
                item: input
            });
        }
        vm.add = add;

        function update(input) {
            vm.emit('update', {
                item: input
            });
        }
        vm.update = update;

        function getById(id){
          vm.emit('getById',{
            item:{
              id:id
            }
          })
        }
        vm.getById = getById;
    }
})();
