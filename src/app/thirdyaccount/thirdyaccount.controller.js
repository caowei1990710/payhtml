(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('thirdyAccountController', thirdyAccountController);
  /** @ngInject */
  function thirdyAccountController($scope, $timeout, jQ, httpRequest, $rootScope, $state, loc_language_cn) {
    var vm = this;
    vm.createBankForm = {"type": "1", "creatUser": $rootScope.user.name, "hightlimit": "50000", "payBanktype": "3"};
    vm.editBankForm = {};
    vm.thirdyaccount = {};
    vm.totalSum = 0;
    vm.sizePerPage = 500;
    // if ($rootScope.user.name == "test1")
    //   $rootScope.originlist.push({id: '11', name: '组11'});
    vm.page = 1;
    vm.query = {
      "belongbank": "",
      "realname": "",
      "wechatId": "",
      "ip": "",
      "flush": "1",
      "platfrom": "",
      "banktype": "",
      "paytype": "",
      "payBanktype": ""
    };
    vm.clear = {
      "dayamount": "0",
      "state": "NORMAL",
      "lowlimit": "0",
      "daylimit": "50000",
      "autowithrow": "50000",
      "hightlimit": "50000",
      "daysucces": "0",
      "daynumber": "0",
      "nosucces": "0"
    };
    vm.get = function (page) {
      $rootScope.loading = true;
      $timeout(function () {
        $rootScope.loading = false;
      }, 500);
      var url = "wechat?name=" + (angular.isUndefined(vm.query.name) ? "" : vm.query.name) + "&belongbank=" + vm.query.belongbank + "&ip=" + vm.query.ip + "&realname" + vm.query.realname + "&type=" + (angular.isUndefined(vm.query.type) ? "" : vm.query.type) + "&state=" + (angular.isUndefined(vm.query.state) ? "" : vm.query.state) + "&page=" + vm.page + "&size=" + vm.sizePerPage + "&paytype=" + vm.query.paytype+ "&payBanktype=" + vm.query.payBanktype + "&platfrom=" + vm.query.platfrom + "&banktype=" + vm.query.banktype + "&wechatId=" + vm.query.wechatId
      httpRequest.get(url, vm.setDefault)
    }
    vm.getList = function () {
      vm.get(1);
      if (vm.query.flush == "0") {
        $timeout(function () {
          vm.getList();
        }, 10000)
      }
    }
    vm.setDefault = function (data) {
      // $rootScope.loading = false;
      vm.bankindex = -1;
      vm.bankList = data.data;
      vm.totalSum = data.totalnumber;
      vm.moneySum = data.totalamount;
      vm.nowSum = data.pageamount;
      vm.allNot();
      $scope.$digest();
    }
    $rootScope.valuelist = [{"id": "add", "name": "增加"}, {"id": "less", "name": "减少"}];
    vm.createresult = function (data) {
      jQ('#editMoney').modal('hide');
      jQ('#createBank').modal('hide');
      if (data.msg.indexOf("UK_6iqp2bk69cnykmmvh1hykr1f7") == -1)
        alertify.success(data.msg);
      else
        alertify.error("账号已存在")
      vm.get(vm.page);
      if (data.code == 200) {
        var formData = new FormData();
        formData.append("file", $("#editimg")[0].files[0]);
        formData.append("fileName", vm.editBankForm.ip.replace(".", "") + ".jpg");
        $.ajax({
          url: window.url,
          type: 'post',
          data: formData,
          processData: false,
          contentType: false,
          success: function (msg) {
            // if(msg.code==200)
            //   alertify.success("创建成功")
            // else
            //   alertify.success("")
          }
        });
      }
      vm.createBankForm = {"type": "1"};
    }
    vm.result = function (data) {
      jQ('#editMoney').modal('hide');
      jQ('#createBank').modal('hide');
      vm.createBankForm = {"type": "1", "bankType": "0"};
      if (data.msg.indexOf("UK_6iqp2bk69cnykmmvh1hykr1f7") == -1)
        alertify.success(data.msg);
      else
        alertify.error("账号已存在")
      vm.get(vm.page);
    }
    $scope.$watch("thirdyaccount.query.flush", function (e) {
      // console.log(e);
      if (angular.isUndefined(e))
        return;
      // if(e==0)
    })
    vm.getBankCard = function (data) {
      if (data.code == 200) {
        // alertify.success(data.msg);
        if (data.data.length > 0)
          httpRequest.post("wechatitem", vm.createBankForm, vm.result);
        else
          alertify.error("绑定银行卡错误");
      } else
        alertify.error(data.msg);
    }
    vm.outList = function () {
      var url = "export?name=" + (angular.isUndefined(vm.query.name) ? "" : vm.query.name) + "&belongbank=" + vm.query.belongbank + "&ip=" + vm.query.ip + "&realname" + vm.query.realname + "&type=" + (angular.isUndefined(vm.query.type) ? "" : vm.query.type) + "&state=" + (angular.isUndefined(vm.query.state) ? "" : vm.query.state) + "&page=" + vm.page + "&size=" + vm.sizePerPage + "&platfrom=" + vm.query.platfrom + "&wechatId=" + vm.query.wechatId;
      window.open(window.url + url);
      // httpRequest.get(url)
    }
    vm.createBankCard = function () {
      for (var i = 0; i < vm.createBankForm.wechatName.length; i++) {
        if (vm.createBankForm.wechatName.substring(i, i + 1).match(/[\u4e00-\u9fa5]/)) {
          alertify.error("账号不能有汉字");
          return;
        }
      }
      if (vm.createBankForm.bankType == undefined)
        vm.createBankForm.bankType = '0';
      if (vm.createBankForm.belongKsname == undefined)
        vm.createBankForm.belongKsname = '';
      // if (vm.createBankForm.type == 1)
      //   httpRequest.get("wechat?name=" + vm.createBankForm.belongbankCard + "&type=0&belongbank=" + vm.query.belongbank + "&realname" + vm.query.realname + "&state=&page=1&size=" + vm.sizePerPage, vm.getBankCard)
      // else
      httpRequest.post("wechatitem", vm.createBankForm, vm.result);
    }
    $scope.$watch("thirdyaccount.editBankForm.src", function (e) {
      if (angular.isUndefined(e))
        return;
      $('#editimage').attr("src", e);
      var fd = new FormData();
      fd.append("img", $('#editimg')[0].files[0]);
      fd.append("showapi_appid", "52742");
      fd.append("showapi_sign", "0a0cb926b6eb43a3b977d382c5689d77");
      fd.append("showapi_timestamp", "");
      fd.append("showapi_sign_method", "md5");
      fd.append("showapi_res_gzip", "0");
      fd.append("handleImg", "1");
      $.ajax({
        url: 'http://route.showapi.com/887-2',
        type: 'POST',
        data: fd,
        dataType: 'json',
        method: 'POST',
        cache: false,
        processData: false,
        contentType: false
      }).done(function (ret) {

        if (ret.showapi_res_body.retText) {
          vm.editBankForm.qrurl = ret.showapi_res_body.retText;
        } else {
          alertify.error($rootScope.lagconfig["无法识别图片中的二维码，请重新上传"]);
          vm.editBankForm.src = "";
          vm.editBankForm.qrurl = "";
        }
        $scope.$digest();
      });
    })
    vm.updateBankCard = function () {
      jQ('#editBank').modal('hide');

      httpRequest.put("wechatitem", vm.editBankForm, vm.createresult);
    }
    vm.showeditBank = function () {
      jQ('#editBank').modal('show');
      vm.editBankForm.bankType = vm.editBankForm.bankType + "";
    }
    vm.delete = function () {
      if (angular.isUndefined(vm.bankList[vm.bankindex].id))
        return
      httpRequest.delete("wechatitem?id=" + vm.bankList[vm.bankindex].id);
    }
    vm.editBank = function (index) {
      vm.bankindex = index;
      vm.editBankForm = angular.copy(vm.bankList[index]);
      $('#editimg').val("");
      vm.editBankForm.payType = vm.bankList[index].payType + "";
      vm.editBankForm.payBanktype = vm.bankList[index].payBanktype + "";
      // if (vm.bankList[index].plaftfrom != 2)
      //   vm.editBankForm.img = window.imgurl + "small/" + vm.editBankForm.wechatName.replace(".", "") + ".jpg";
      // else
      vm.editBankForm.img = window.imgurl + "" + vm.editBankForm.ip.replace(".", "") + ".jpg";
    }
    vm.selectAll = function () {
      for (var i = 0; i < vm.bankList.length; i++) {
        $("#id_" + i).attr("checked", true)
      }
    }
    vm.allNot = function () {
      // vm.bankCopyList = [];
      for (var i = 0; i < vm.bankList.length; i++) {
        $("#id_" + i).attr("checked", false)
      }
    }
    vm.clearAll = function () {
      vm.bankCopyList = [];
      // vm.bankCopyList = angular.copy(vm.bankList);
      for (var i = 0; i < vm.bankList.length; i++) {
        if ($("#id_" + i).is(':checked') == true)
          vm.bankCopyList.push(vm.bankList[i]);
      }
      if (vm.bankCopyList.length > 100) {
        jQ('#clearAll').modal('hide');
        alertify.error("操作数据太多");
        return;
      }
      if (vm.bankCopyList.length == 0) {
        jQ('#clearAll').modal('hide');
        alertify.error("未选择数据");
      }
      for (var i = 0; i < vm.bankCopyList.length; i++) {
        if ($('#amountcheck').is(':checked'))
          vm.bankCopyList[i].dayamount = vm.clear.dayamount;
        if ($('#statecheck').is(':checked'))
          vm.bankCopyList[i].state = vm.clear.state;
        if ($('#limitcheck').is(':checked'))
          vm.bankCopyList[i].daylimit = vm.clear.daylimit;
        if ($('#withrowcheck').is(':checked'))
          vm.bankCopyList[i].autowithrow = vm.clear.autowithrow;
        if ($('#wechatId').is(':checked'))
          vm.bankCopyList[i].wechatId = vm.clear.wechatId;
        if ($('#platfrom').is(':checked'))
          vm.bankCopyList[i].plaftfrom = vm.clear.platfrom;
        if ($('#lowlimit').is(':checked'))
          vm.bankCopyList[i].lowlimit = vm.clear.platfrom;
        if ($('#platfrom').is(':checked'))
          vm.bankCopyList[i].plaftfrom = vm.clear.platfrom;
        if ($('#lowlimit').is(':checked'))
          vm.bankCopyList[i].lowlimit = vm.clear.lowlimit;
        if ($('#hightlimit').is(':checked'))
          vm.bankCopyList[i].hightlimit = vm.clear.hightlimit;
        if ($('#paytypecheck').is(':checked'))
          vm.bankCopyList[i].payType = vm.clear.payType;
        if ($('#daysucces').is(':checked'))
          vm.bankCopyList[i].daysucces = vm.clear.payType;
        if ($('#daynumber').is(':checked'))
          vm.bankCopyList[i].daynumber = vm.clear.payType;
        if ($('#nosucces').is(':checked'))
          vm.bankCopyList[i].nosucces = vm.clear.payType;
        // vm.bankList[i].state = 0;
        // vm.bankList[i].state = "NORMAL";
        httpRequest.put("wechatitem", vm.bankCopyList[i], vm.clearDefault);
      }
      console.log("清空今日收款");
    }
    vm.clearDefault = function () {
      vm.get(1);
      jQ('#clearAll').modal('hide');
    }
    vm.showClear = function () {
      jQ('#clearAll').modal('show');
    }
    vm.showeditMoney = function () {
      jQ('#editMoney').modal('show');
      // vm.moneyUpdate = angular.copy(vm.bankList[index]);
    }
    vm.updateCreate = function () {
      vm.moneyUpdate.name = vm.editBankForm.wechatName;
      if (vm.moneyUpdate.type == "less")
        vm.moneyUpdate.changeamount = 0 - vm.moneyUpdate.changeamount;
      vm.moneyUpdate.platfrom = vm.editBankForm.plaftfrom;
      vm.moneyUpdate.createUser = $rootScope.user.name;
      httpRequest.post("moneychange", vm.moneyUpdate, vm.result);
    }
    $scope.$on("$destroy", function () {
      //清除配置,不然scroll会重复请求
      vm.query.flush = undefined;
    })
    // $scope.$watch('thirdyaccount.createBankForm.type', function (data) {
    //   console.log(data);
    //   if (data == 0) {
    //
    //   }
    // })
    //if($rootScope.password == '123456'){
    //  $state.go('home.update');
    //}
    //var vm = this;
    //$('.downloading:eq(0)').css('width',$('.contentdiv').offset().left+'px');
    //$('.downloading:eq(1)').css('width',$('.contentdiv').offset().left+'px');
    //window.onresize = function(){
    //  $('.downloading:eq(0)').css('width',$('.contentdiv').offset().left+'px');
    //  //$('.downloading:eq(0)').css('width',$('.container').css('margin-left'));
    //  $('.downloading:eq(1)').css('width',$('.contentdiv').offset().left+'px');
    //}
  }
})();
