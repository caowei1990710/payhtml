(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('MerchantTypeController', MerchantTypeController);

  /** @ngInject */
  function MerchantTypeController($log, $scope, $http, $timeout, Upload, uploadFileUrl, alertify, jQ, merchantType, gateWay, transLimit, $rootScope) {
    var vm = this;
    vm.createMerchantTypeForm = {};
    vm.editMerchantTypeForm = {};
    vm.createGatewayForm = {};
    vm.editGatewayForm = {};
    vm.createLimitForm = {};
    vm.editLimitForm = {};
    vm.selectedMerchantId;

    function getMerchantTypeList() {
      merchantType.emit('get', {});
    }

    getMerchantTypeList();
    merchantType.on('get', function (data) {
      if (data.status == 200) {
        // $rootScope.merchantId = data.items;
        vm.merchantTypeList = data.items;
        if (vm.selectedindex)
          vm.editMerchantTypeForm = angular.copy(vm.merchantTypeList[vm.selectedindex]);
      }
    });

    function addMerchantType() {
      var input = {
        name: vm.createMerchantTypeForm.name,
        code: vm.createMerchantTypeForm.code,
        iconUrl: vm.createMerchantTypeForm.iconUrl
      }
      merchantType.emit('add', {
        item: input
      });
    }

    vm.addMerchantType = addMerchantType;
    merchantType.on('add', function (data) {
      if (data.status == 200) {
        jQ('#creatMerchantType').modal('hide');
        getMerchantTypeList();
      }
    });


    function editMerchantType(index, id) {
      var merchantType = vm.merchantTypeList[index];
      if (merchantType.id == id) {
        vm.editMerchantTypeForm = merchantType;
      }
    }

    vm.editMerchantType = editMerchantType;

    function updateMerchantType() {
      var input = {
        id: vm.editMerchantTypeForm.id,
        name: vm.editMerchantTypeForm.name,
        code: vm.editMerchantTypeForm.code,
        iconUrl: vm.editMerchantTypeForm.iconUrl
      }
      merchantType.emit('update', {
        item: input
      });
    }

    vm.updateMerchantType = updateMerchantType;
    merchantType.on('update', function (data) {
      if (data.status == 200) {
        jQ('#editMerchantType').modal('hide');
        getMerchantTypeList();
      }
    });

    function deleteMerchantType() {
      merchantType.emit('delete', {
        item: {
          id: vm.merchantTypeList[vm.selectedindex].id
        }
      });
    }

    vm.deleteMerchantType = deleteMerchantType;
    merchantType.on('delete', function (data) {
      if (data.status == 200) {
        getMerchantTypeList();
      }
    });
    vm.editWay = function (e) {
      vm.wayindex = e;
      vm.editGatewayForm = angular.copy(vm.gatewayList[e])
      // vm.editGatewayForm = angular.copy(vm.gatewayList[e])
    }
    vm.itemMerchantType = function (e) {
      vm.selectedindex = e;
      vm.editMerchantTypeForm = angular.copy(vm.merchantTypeList[e]);
    }
    vm.editMit = function (e) {
      vm.limitindex = e;
      vm.editLimitForm = angular.copy(vm.limitList[e]);
    }
    function getGatewayByMerchantId() {
      gateWay.getAllgateway();
    }

    gateWay.on('getByMerchantId', function (data) {
      if (data.status == 200) {
        vm.gatewayList = data.items;
        if (vm.wayindex)
          vm.editGatewayForm = angular.copy(vm.gatewayList[vm.wayindex]);
      }
    });
    gateWay.on('getAllGateWay', function (data) {
      vm.gatewayList = data.items;
    });
    function addGateway() {
      if (angular.isUndefined(vm.createGatewayForm.merchantId)) {
        // alertify.error('请选择商户类型');
        alertify.error('请选择商户类型');
        return;
      }
      // var input = {
      //   merchantId: vm.createGatewayForm.merchantId,
      //   name: vm.createGatewayForm.name,
      //   address: vm.createGatewayForm.address
      // }
      gateWay.emit('add', {
        item: vm.createGatewayForm
      });
    }

    vm.addGateway = addGateway;
    gateWay.on('add', function (data) {
      if (data.status == 200) {
        jQ('#creatGateway').modal('hide');
        getGatewayByMerchantId();
        vm.createGatewayForm = {};
      }
    });

    function updateGateway() {
      //var input = {
      //  id: vm.editGatewayForm.id,
      //  name: vm.editGatewayForm.name,
      //  address: vm.editGatewayForm.address,
      //  merchantId: vm.selectedMerchantId
      //}
      gateWay.emit('update', {
        item: vm.editGatewayForm
      });
    }

    vm.updateGateway = updateGateway;
    gateWay.on('update', function (data) {
      if (data.status == 200) {
        jQ('#editGateway').modal('hide');
        getGatewayByMerchantId();
      }
    });

    function editGateway(index, id) {
      var gateway = vm.gatewayList[index];
      if (gateway.id == id) {
        vm.editGatewayForm = gateway;
      }
    }

    vm.editGateway = editGateway;

    function deleteGateway() {
      gateWay.emit('delete', {
        item: {
          id: vm.editGatewayForm.id
        }
      });
    }

    vm.deleteGateway = deleteGateway;
    gateWay.on('delete', function (data) {
      if (data.status == 200) {
        getGatewayByMerchantId();
      }
    });

    function getLimitByMerchantId() {
      transLimit.getAllTransLimit();
    }

    getLimitByMerchantId();
    getGatewayByMerchantId();
    transLimit.on('getAllTransLimit', function (data) {
      if (data.status == 200) {
        vm.limitList = data.items;
        if (vm.limitindex)
          vm.editLimitForm = angular.copy(vm.limitList[vm.limitindex]);
      }
    });

    function addLimit() {
      var input = {
        displayName: vm.createLimitForm.displayName,
        dayTransaction: vm.createLimitForm.dayTransaction,
        transactionForPlayerOneDay: vm.createLimitForm.transactionForPlayerOneDay,
        limitPerTransaction: vm.createLimitForm.limitPerTransaction,
        merchantId: vm.selectedMerchantId
      }
      transLimit.emit('add', {
        item: input
      });
    }

    vm.addLimit = addLimit;
    transLimit.on('add', function (data) {
      if (data.status == 200) {
        jQ('#createLimit').modal('hide');
        getLimitByMerchantId();
      }
    });

    function updateLimit() {
      transLimit.emit('update', {
        item: vm.editLimitForm
      });
      //if (vm.selectedMerchantId) {
      //  var input = {
      //    id: vm.editLimitForm.id,
      //    name: vm.editLimitForm.name,
      //    dailyTotalLimit: vm.editLimitForm.dailyTotalLimit,
      //    dailyPlayerLimit: vm.editLimitForm.dailyPlayerLimit,
      //    perTransLimit: vm.editLimitForm.perTransLimit,
      //    merchantId: vm.selectedMerchantId
      //  }
      //  transLimit.emit('update', {
      //    item: input
      //  });
      //}
    }

    vm.updateLimit = updateLimit;
    transLimit.on('update', function (data) {
      if (data.status == 200) {
        jQ('#editLimit').modal('hide');
        getLimitByMerchantId();
      }
    });

    function editLimit(index, id) {
      var limit = vm.limitList[index];
      if (limit.id == id) {
        vm.editLimitForm = limit;
      }
    }

    vm.editLimit = editLimit;

    function deleteLimit() {
      transLimit.emit('delete', {
        item: {
          id: vm.limitList[vm.limitindex].merchantlimitsId
        }
      });
    }

    vm.deleteLimit = deleteLimit;
    transLimit.on('delete', function (data) {
      if (data.status == 200) {
        getLimitByMerchantId();
      }
    });


  }
})();
