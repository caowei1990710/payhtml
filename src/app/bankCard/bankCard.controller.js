(function() {
  'use strict';

  angular
    .module('pmsJs')
    .controller('BankCardController', BankCardController);

  /** @ngInject */
  function BankCardController(bankcard,$state) {
    var vm = this;
    //vm.todo = function(index){
    //  if(index == 0){
    //    bankcard.loadingBankCard(1,500,{});
    //  }else{
    //    bankcard.createTransfReminder(1, 500,{});
    //  }
    //};
  }
})();
