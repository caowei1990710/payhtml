(function() {
    'use strict';

    angular
        .module('pmsJs')
        .controller('TransactionMonitoringController', TransactionMonitoringController);

    /** @ngInject */
    function TransactionMonitoringController($log, bankcard, cardTypeList) {
        var vm = this;

        function loadingTransferTask(page) {
            bankcard.emit('loadingTransferTask', {
                size: 10,
                page: page
            });
        }
        vm.loadingTransferTask = loadingTransferTask;
        //loadingTransferTask(1);
        bankcard.on('loadingTransferTask', function(data) {
            if (data.status == 200) {
                vm.transactionList = data.items;
                vm.page = data.page;
                vm.size = data.size;
                vm.total = data.total;
            }
        });

        function getBankCardBalance(bankcardNo) {
            bankcard.emit('getBankCardBalance', {
                item: {
                    bankcardNo: bankcardNo
                }
            });
        }
        vm.getBankCardBalance = getBankCardBalance;
        bankcard.on('getBankCardBalance', function(data) {
            if (data.status == 200) {
                vm['balance' + data.bankcardNo] = data.balance;
            }
        });
    }
})();
