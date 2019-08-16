(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('TestController', TestController);

  /** @ngInject */
  function TestController($rootScope, user, httpRequest, $timeout) {
    var vm = this;
    vm.index = 0;
    vm.result = [];
    vm.get = function () {
      // var url = "wechat?name=" + (angular.isUndefined(vm.query.name) ? "" : vm.query.name) + "&type=" + (angular.isUndefined(vm.query.type) ? "" : vm.query.type) + "&state=" + (angular.isUndefined(vm.query.state) ? "" : vm.query.state) + "&page=1&size=10"
      var url = "agent?name=&type&create=&agentName=&state=&page=1&size=500";
      httpRequest.get(url, vm.setDefault)
    }
    vm.setDefault = function (data) {
      vm.list = data.data;
      console.log(data);
    }
    vm.playDisable = function () {
      if (vm.index == vm.result.length)
        return;

      $timeout(function () {
        var sign = vm.list[vm.result[vm.index]].sign//商户签名
        var merchat = {
          "version": "1.0",
          "MerchaantNo": vm.list[vm.result[vm.index]].name,
          "type": "alapi",
          "amount": "100",
          "payer": "test"
        }
        merchat.sign = hex_md5(merchat.version + merchat.MerchaantNo + merchat.type + merchat.payer + sign);
        $.ajax({
          type: 'post',
          url: 'http://zhifukaui111.info:8081/midpay',
          data: merchat,
          success: function (data) {
            console.log(data);
            if (data.code != 200) {
              var utterThis = new window.SpeechSynthesisUtterance(vm.list[vm.result[vm.index]].name + '无可用账号');
              window.speechSynthesis.speak(utterThis);
            }
            vm.index++;
            vm.playDisable();
          },
          error: function (data) {
            vm.index++;
            vm.playDisable();
          }
        });
      }, 2000)
    }
    vm.get(1);
    httpRequest.get(url, vm.setDefault)
    vm.flush = function () {
      vm.result = [];
      for (var i = 0; i < vm.list.length; i++) {
        console.log($("#app_" + i).is(':checked'));
        if ($("#app_" + i).is(':checked'))
          vm.result.push(i);
      }
      console.log(vm.result);
      $timeout(function () {
        vm.flush();
      }, 20000);
      vm.index = 0;
      vm.playDisable();
    }
    vm.start = function () {
      vm.flush();
    }
    $timeout(function () {
      vm.start();
    }, 20000);
  }
})();
