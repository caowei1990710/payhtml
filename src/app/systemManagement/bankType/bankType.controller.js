(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('BankTypeController', BankTypeController);

  /** @ngInject */
  function BankTypeController($log, jQ, alertify, bank) {
    var vm = this;
    vm.createBankTypeForm = {};
    vm.editBankTypeForm = {};

    function getBankTypeList() {
      bank.emit('get', {});
    }

    getBankTypeList();
    bank.on('get', function (data) {
      vm.bankTypeList = data.items;
      if (vm.index)
        angular.copy(vm.bankTypeList[vm.index])
    });
    vm.edit = function editBank(e){
      vm.index = e;
      vm.editBankTypeForm = angular.copy(vm.bankTypeList[e])
    }
    function addBank() {
      var input = {
        name: vm.createBankTypeForm.name,
        code: vm.createBankTypeForm.code,
        logoUrl: vm.createBankTypeForm.logoUrl,
        priority: vm.createBankTypeForm.priority
      };
      bank.emit('add', {
        item: input
      });
    }

    vm.addBank = addBank;
    bank.on('add', function (data) {
      if (data.status == 200) {
        jQ('#createBankType').modal('hide');
        getBankTypeList();
      }
    });

    //function editBank(index, id) {
    //  var bank = vm.bankTypeList[index];
    //  if (bank.id == id) {
    //    vm.editBankTypeForm = bank;
    //  }
    //}

    //vm.editBank = editBank;

    function updateBank() {
      var input = {
        id: vm.editBankTypeForm.id,
        name: vm.editBankTypeForm.name,
        code: vm.editBankTypeForm.code,
        logoUrl: vm.editBankTypeForm.logoUrl,
        priority: vm.editBankTypeForm.priority
      };
      bank.emit('update', {
        item: input
      });
    }

    vm.updateBank = updateBank;
    bank.on('update', function (data) {
      if (data.status == 200) {
        jQ('#editBankType').modal('hide');
        getBankTypeList();
      }
    });

    function deleteBank() {
      bank.emit('delete', {
        item: {
          id: vm.bankTypeList[vm.index].id
        }
      });
      //var confirmDel = confirm("删除所属银行会导致以前创建的银行卡出异常,麻烦不要轻易删除？");
      //if (confirmDel) {
      //
      //};
    }

    vm.deleteBank = deleteBank;
    bank.on('delete', function (data) {
      if (data.status == 200) {
        getBankTypeList();
      }
    });
  }
})();
