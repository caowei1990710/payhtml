(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('DeviceController', DeviceController);

  /** @ngInject */
  function DeviceController($log, alertify, jQ, platform, device, $rootScope) {
    var vm = this;

    vm.page = 1;
    vm.sizePerPage = 10;
    vm.sizePerPageFromResponse = 10;
    vm.deviceList = [];
    vm.platformList = [];
    vm.createDeviceitem = {};
    vm.editDeviceForm = {};

    vm.getPlatformList = platform.getPlatformList;
    vm.getPlatformList();
    platform.once('getPlatformList', function (data) {
      if (data.status == 200) {
        vm.platformList = data.items;
        for (var i in data.items) {
          var tmp = data.items[i];
          vm['platformList' + tmp.id] = tmp;
        }
      }
    });

    vm.getDevicelist = device.list;
    vm.getDevicelist(vm.page, vm.sizePerPage);
    device.on('list', function (data) {
      if (data.status == 200) {
        vm.deviceList = data.items;
        vm.page = data.page;
        vm.total = data.total;
        vm.sizePerPageFromResponse = data.size;
      }
    })

    function addDevice() {
      if (vm.createDeviceitem.password == $rootScope.password) {
        var input = {
          name: vm.createDeviceitem.name,
          platformId: vm.createDeviceitem.platformId,
          password: vm.createDeviceitem.password
        };
        device.add(input);
      }else{
        jQ('#createDeviceitem').modal('hide');
        alertify.error("权限密码错误。");
      }
    }

    vm.addDevice = addDevice;
    device.on('add', function (data) {
      if (data.status == 200) {
        jQ('#createDeviceitem').modal('hide');
        vm.getDevicelist(1, vm.sizePerPage);
      }
    });

    function editDevice(index, id) {
      var tmp = vm.deviceList[index];
      if (tmp && tmp.id == id) {
        vm.editDeviceForm = tmp;
        jQ('#editDeviceitem').modal('show');
      }
    }

    vm.editDevice = editDevice;

    function updateDevice() {
      if (vm.editDeviceForm.password == $rootScope.password) {
        var input = {
          id: vm.editDeviceForm.id,
          name: vm.editDeviceForm.name,
          platformId: vm.editDeviceForm.platformId,
        };
        device.update(input);
      } else {
        jQ('#editDeviceitem').modal('hide');
        alertify.error("权限密码错误。");
      }
    }

    vm.updateDevice = updateDevice;
    device.on('update', function (data) {
      if (data.status == 200) {
        jQ('#editDeviceitem').modal('hide');
        vm.getDevicelist(1, vm.sizePerPage);
      }
    });
  }
})();
