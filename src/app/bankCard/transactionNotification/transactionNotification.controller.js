(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('TransactionNotificationController', TransactionNotificationController);

  /** @ngInject */
  function TransactionNotificationController($scope,$log,$rootScope, alertify, jQ, cardTypeList, $filter ,bankcard,transactionTask) {
    var vm = this;
    vm.cardTypeList = cardTypeList;
    vm.createTaskForm = {};
    //vm.changindex = function(){
    //  console.log("e:"+e);
    //}
    function createTask(index, id) {
      vm.createTaskForm = vm.notificationList[index];
      vm.subAlertLoadingBankCard();
    }

    vm.createTask = createTask;

    function createTransferTaskBankCard() {
      if( !vm.translatecredit){
        alertify.error($rootScope.lagconfig['输入的格式不正确']);
        return
      }
      if(parseInt(vm.translatecredit)>parseInt(vm.createTaskForm.credit)){
        alertify.error($rootScope.lagconfig['麻烦留点']);
        return
      }
      if(!vm.receiveBank){
        alertify.error($rootScope.lagconfig['请选择银行卡']);
        return
      }
      var input = {
        receiveBankId: vm.receiveBank.bankId,
        receiveBankCard: vm.receiveBank.bankCard,
        receiveCardName: vm.receiveBank.cardName,
        receiveBalance: vm.translatecredit,
        handCredit:0,
        limitCredit: vm.receiveBank.promptCredit,
        receivePlatformId: vm.receiveBank.platformId,
        sendPlatformId: vm.createTaskForm.platformId,
        remark: vm.createTaskForm.type,
        sendBankId: vm.createTaskForm.bankId,
        sendBankCard: vm.createTaskForm.bankCard,
        sendCardName: vm.createTaskForm.cardName,
        "creator": $rootScope.username
      };
      jQ('#createTask').modal('hide');
      transactionTask.emit('createTransferTaskBankCard', {
        item: input
      });
    }

    vm.createTransferTaskBankCard = createTransferTaskBankCard;
    transactionTask.on('createTransferTaskBankCard', function (data) {
      if (data.status == 200) {
        jQ('#createTask').modal('hide');
        bankcard.createTransfReminder(vm.page, 500);
      }
    });
    function subAlertLoadingBankCard() {
      bankcard.emit('subAlertLoadingBankCard', {
        page: 1,
        size: 20,
        "item": {"bankCardNo": vm.createTaskForm.bankCard}
      });
    }
    // bankcard.on('getBankCardDayAmount',function(data){
    //   angular.forEach(vm.bankList,function(item,index){
    //     //console.log('index:'+index);
    //     if(item.bankCard == data.bankCard){
    //       item.transactionForToday = data.credit;
    //     }
    //   })
    // });
    vm.subAlertLoadingBankCard = subAlertLoadingBankCard;
    bankcard.on('subAlertLoadingBankCard', function (data) {
      if (data.status == 200) {
        vm.page = data.page;
        vm.subList = data.items;
        angular.forEach(vm.subList,function(item,index){
          item.createDate =  $filter('dateFormate')(item.createDate );
          bankcard.getBankCardDayAmount({'bankcardNo':item.bankCard});
        })
      }
    });
    bankcard.on('createTransfReminder', function (data) {
      vm.transize = data.size;
      vm.notificationList = data.items;
      angular.forEach(vm.notificationList,function(item,index){
        item.createDate = $filter('dateFormate')(item.createDate );
      })
    })
    $scope.$on('changtabar', function (event, data) {
      if(data == "转账提醒")
      //if (!$scope.destory) {
        bankcard.createTransfReminder(1, 10);
      //}
    });

    function selectReceiver(index, id) {
      vm.receiveBank = vm.subList[index];
      vm.index = index;
    }

    vm.selectReceiver = selectReceiver;
  }
})();
