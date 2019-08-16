(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('thirdyPicController', thirdyPicController);

  /** @ngInject */
  function thirdyPicController($rootScope, httpRequest, $scope, $timeout) {
    var vm = this;
    vm.query = {"belongbank": "", "realname": "", "wechatId": "", "ip": "", "flush": "1", "platfrom": ""};
    vm.width = 10;
    vm.height = 5;
    vm.picture = 1;
    vm.setDefault = function (data) {
      $rootScope.loading = false;
      vm.bankList = data.data;
      $scope.$digest();
    }
    vm.get = function (page) {
      $rootScope.loading = true;
      $timeout(function () {
        $rootScope.loading = false;
      }, 500);
      var url = "getQrplatfrom";
      httpRequest.get(url, vm.setDefault)
    }
    vm.back = function () {
      vm.picture = 1;
    }
    // vm.setPic = function (data) {
    //   vm.picture = 2;
    // }
    vm.update = function (index) {
      // var url = "createimg?wechatName=" + vm.bankList[index].wechatName;
      httpRequest.put("wechatpic", vm.picturelist[index], vm.reflush);
    }
    vm.reflush = function (data) {
      if (data.code == 200)
        vm.create(vm.index);
    }
    vm.defualt = function (data) {
      if (data.data != null) {
        vm.picturelist = data.data;
        for (var i = 0; i < vm.picturelist.length; i++) {
          vm.picturelist[i].src = "http://zhifudemo.com/images/" + vm.bankList[vm.index].wechatName + "/" + vm.picturelist[i].imageName + ".jpg";
        }
        $scope.$digest();
      }
    }
    vm.create = function (index) {
      var url = "createimg?wechatName=" + vm.bankList[index].wechatName;
      httpRequest.get(url, vm.defualt)
    }
    vm.get(1);
    vm.select = function (index) {
      vm.index = index;
      vm.picture = 2;
      var url = "wechatitem?name=" + vm.bankList[index].wechatName + "&ip=&type=&state&page=1&size=500&amount=0&nickName=";
      httpRequest.get(url, vm.defualt)
    }
  }
})();
