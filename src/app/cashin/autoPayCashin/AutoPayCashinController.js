(function() {
  'use strict';

  angular
    .module('pmsJs')
    .controller('autoPayController', autoPayController);

  /** @ngInject */
  function autoPayController($log,$filter, $state, heartBeat,autopay) {
    var vm = this;
    vm.query ={};
    vm.pagesize = 500;
    autopay.on('autoPayment', function (data) {
      if (data.status == 200) {
        vm.payList = data.items;
        vm.page = data.page;
        vm.sizePerPage = data.size;
        vm.total = data.total;
        angular.forEach(vm.payList,function(item,index){
          //console.log('index:'+index);
          item.createtime = $filter('dateFormate')(item.createtime );
        })
      }
    });
    vm.getPayment = function(page){
      autopay.autoPayment(vm.query,page,vm.pagesize);
    }
    vm.getPayment(1);
  }
})();
