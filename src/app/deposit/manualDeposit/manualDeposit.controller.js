(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('ManualDepositController', ManualDepositController);

  /** @ngInject */
  function ManualDepositController($scope, $rootScope, alertify, manualDeposit, bankcard,autopay) {
    var vm = this;
    //vm.transTypes = [{name: "ATM", value: "ATM"}, {name: "网银转账", value: "网银转账"}, {
    //  name: "现金在柜台汇款",
    //  value: "CASHCOUNTER"
    //}, {name: "电话转账", value: "PHONEPAYMENT"}, {name: "跨行转账", value: "CROSS"}, {
    //  name: "支付宝",
    //  value: "ALIPAYDIRECT"
    //}, {name: "OTHERS", value: "OTHERS"}];
    //vm.transType = vm.transTypes[0];
    //manualDeposit.querryDeposit(1, 10, {});
    //manualDeposit.on('querryDeposit', function (data) {
    //  vm.item = data.items[0];
    //});
    vm.manualForm = {
      //'receiveBankCard': '342342123',
      //'platformName': '2',
      //'customerId': '123456',
      ///* ATM("ATM"),
      // NETPAY("网银转账(line money transfer)"),
      // CASHCOUNTER("现金在柜台汇款(Over the counter cash remittance)"),
      // PHONEPAYMENT("电话转账(phone money transfer)"),
      // CROSS("跨行转账(Cross)"),
      // ALIPAYDIRECT("支付宝(Alipay)"),
      // OTHERS("OTHERS")*/
      //'createtime':'2016-01-01 12:39:22',
      //'amount':'3000',
      //'handCharge':'30',
      //'paymentType':'ATM',
      //'payer': 'aname',
      //'depositAddress': 'chongqing',
      //'remark': '12345',
      //'balance': 2000,
      'userAccount': $rootScope.username
    }
    $scope.$on('changtabar', function (event, data) {
      if (data == "手工收款") {
        if (vm.manualForm.receiveBankCard){
          manualDeposit.querryDeposit(1, 1, {"receiveBankCard": vm.manualForm.receiveBankCard});
          autopay.autoPaymentTrans(1,1,{"srcbankcard":vm.manualForm.receiveBankCard,"status":"1"})
        }
        else{
          $rootScope.item = undefined;
          $rootScope.transitem = undefined;
        }
      }
    });

    vm.setbankType = function (e) {
      vm.manualForm.type = e.value;
    }
    autopay.on("autoPaymentTrans",function(data){
      $rootScope.transitem = data.items[0];
    });
    $scope.$watch('deposit.manualForm.receiveBankCard', function (newValue) {
      if (newValue){
        manualDeposit.querryDeposit(1, 1, {"receiveBankCard": newValue});
        autopay.autoPaymentTrans(1,1,{"srcbankcard":newValue,"status":"1"})
      }else{
        $rootScope.item = undefined;
        $rootScope.transitem = undefined;
      }
    })
    manualDeposit.on('add', function (data) {
      alertify.success($rootScope.lagconfig["操作成功"]);
      vm.manualForm = {"receiveBankCard": vm.manualForm.receiveBankCard};
      manualDeposit.querryDeposit(1, 1, {"receiveBankCard": vm.manualForm.receiveBankCard});
      bankcard.getBankCardByUser($rootScope.user);
    })
    vm.create = function (e) {
      manualDeposit.add(e);
    }

  }
})();
