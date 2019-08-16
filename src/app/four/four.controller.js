(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('fourController', fourController);

  /** @ngInject */
  function fourController($scope,$rootScope, httpRequest, $stateParams, $state) {
    var vm = this;
    vm.changepwd = {"oldpwd": "", "newpwd": "", "repwd": ""};
    vm.changepaypwd = {"oldpwd": "", "newpwd": "", "repwd": ""};

    vm.result = function (data) {
      alert(data.msg);
      window.localStorage.clear();
      $state.go('tologin');
      // if (data.code == 200)
      //   alertify.success(data.msg);
      // else
      //   alertify.error(data.msg);
    }
    vm.display = function (i) {
      vm.bankindex = i;
      switch (i) {
        case 1:
          $('#changepwd').addClass('on');
          $('#changpaypwd').removeClass('on')
          $('#changegoogle').removeClass('on')
          break;
        case 2:
          $('#changepwd').removeClass('on');
          $('#changpaypwd').addClass('on')
          $('#changegoogle').removeClass('on')
          break;
        case 3:
          $('#changepwd').removeClass('on');
          $('#changpaypwd').removeClass('on')
          $('#changegoogle').addClass('on')
          break;
        default:
          break;
      }
    }
    vm.display(parseInt($stateParams.id));
    vm.changpwd = function () {
      if (vm.bankindex == 1) {
        if (vm.changepwd.oldpwd == "" || vm.changepwd.newpwd == "" || vm.changepwd.repwd == "")
          alert("信息不全");
        else if ($rootScope.user.password != vm.changepwd.oldpwd)
          alert("原始密码错误");
        else if (vm.changepwd.newpwd != vm.changepwd.repwd)
          alert("确定密码错误");
        else if (vm.changepwd.oldpwd == vm.changepwd.newpwd)
          alert("新旧密码不能相同");
        else
          httpRequest.put("agent", {"id": $rootScope.user.id, "password": vm.changepwd.newpwd}, vm.result)
      } else if (vm.bankindex == 2) {
        if (vm.changepaypwd.oldpwd == "" || vm.changepaypwd.newpwd == "" || vm.changepaypwd.repwd == "")
          alert("信息不全");
        else if ($rootScope.user.payword != vm.changepaypwd.oldpwd)
          alert("原始密码错误");
        else if (vm.changepaypwd.newpwd != vm.changepaypwd.repwd)
          alert("确定密码错误");
        else if (vm.changepaypwd.oldpwd == vm.changepaypwd.newpwd)
          alert("新旧密码不能相同");
        else
          httpRequest.put("agent", {"id": $rootScope.user.id, "payword": vm.changepaypwd.newpwd}, vm.result)
      }
    }
    // vm.changepaypwd = function () {
    //   if (vm.changepaypwd.oldpwd == "" || vm.changepaypwd.newpwd == "" || vm.changepaypwd.repwd == "")
    //     alert("信息不全");
    //   else if ($rootScope.user.password != vm.changepaypwd.oldpwd)
    //     alert("原始密码错误");
    //   else if (vm.changepaypwd.newpwd != vm.changepaypwd.repwd)
    //     alert("确定密码错误");
    //   else if (vm.changepaypwd.oldpwd == vm.changepaypwd.newpwd)
    //     alert("新旧密码不能相同");
    //   httpRequest.put("agent", {"id": $rootScope.user.id, "payword": vm.changepaypwd.newpwd}, vm.result)
    // }
    $scope.$emit("childChange", 3)
  }
})();
