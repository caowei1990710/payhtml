(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('UserListController', UserListController);

  /** @ngInject */
  function UserListController($log, alertify, jQ, $rootScope, department,role,permission,$filter, userole, user, transfer) {
    var vm = this;
    vm.userList = userole;
    vm.ableitem;
    vm.depart = true;
    vm.updateAble = false;
    vm.query = {};
    vm.creatuseritem = {
      rowState: "0",
      creator: $rootScope.username,
      function: "#1,#1,1,#1,#1,1,1,#1,1,1,1,#1,1,#1,#1,1,1,1,1,1,"
    };
    vm.edituseritem = {};
    vm.size = 10;
    user.on('login', function (data) {
      console.log(data);
      $rootScope.able = transfer.stringtoArray(data.item.function);
    });
    user.on('updateUser', function (data) {
      jQ('#createDepartment').modal('hide');
      jQ('#userRole').modal('hide');
      jQ('#updateUser').modal('hide');
    })
    vm.getPopuable = function () {
      var able = [];
      for (var i = 0; i < $rootScope.able.length; i++) {
        able[i] = [];
        for (var j = 0; j < $rootScope.able[i].length; j++) {
          if ($("#" + i + "_" + j).is(':checked'))
            able[i][j] = 1
          else
            able[i][j] = 0
        }
      }
      if (vm.updateAble) {
        vm.edituseritem.function = transfer.arraytoString(able);
        user.updateUser(vm.edituseritem);
      } else {
        userole[vm.index].id = transfer.arraytoString(able);
        jQ('#createDepartment').modal('hide');
      }
    }
    department.on('get',function (data) {
      vm.departmentlist = data.item.children;
    })
    vm.select = function (page) {
      user.queryUser(vm.query, page, 10);
    }
    vm.editUser = function (index) {
      vm.bankindex = index;
      vm.edituseritem = vm.alluserList[index];
    }
    user.on('queryUser', function (data) {
      vm.alluserList = data.items;
      angular.forEach(vm.alluserList,function(item,index){
        //console.log('index:'+index);
        item.createDate = $filter('dateFormate')(item.createDate );
      })
      vm.total = data.total;
    })
    role.on('get',function(data){
      vm.role = data;
    });
    permission.on('get',function(data){
      vm.permission = data;
    });
    vm.select(1);
    role.get();
    permission.get();
    vm.createnewuser = function () {
      if (vm.create)
        user.createUser(vm.creatuseritem);
      else
        user.updateUser(vm.edituseritem);
    }
    user.on('createUser', function (data) {
      //console.log(data);
      jQ('#userRole').modal('hide');
    })
    vm.showCreatuser = function () {
      vm.create = true;
      jQ('#userRole').modal('show');

    }
    vm.showEdituser = function () {
      vm.create = false;
      jQ('#updateUser').modal('show');
    }
    vm.login = function (username, pwd) {
      user.login(username, pwd);
    };
    vm.setAble = function (index, type) {
      if (type == 1) {
        vm.updateAble = false;
        vm.index = index;
        vm.ableitem = userole[index].id;
        jQ('#createDepartment').modal('show');
        var able = transfer.stringtoArray(userole[index].id);
      } else {
        vm.updateAble = true;
        jQ('#createDepartment').modal('show');
        var able = transfer.stringtoArray(vm.edituseritem.function);
      }
      vm.devlopindex = index;
      for (var i = 0; i < able.length; i++) {
        for (var j = 0; j < able[i].length; j++) {
          if (able[i][j] == 1)
            $("#" + i + "_" + j).attr("checked", true);
          else
            $("#" + i + "_" + j).attr("checked", false);
        }
      }
    }
    vm.setNew = function (item) {
      if (!item) {
        return "#0,#0,0,#0,#0,0,0,#0,0,0,0,#0,0,0,#0,#0,0,0,0,0,0,";
      }
      var dest = [];
      var new_item = item.split("#")
      for (var i = 1; i < new_item.length; i++) {
        dest[i - 1] = [];
        var new_item_list = new_item[i].split(",");
        for (var j = 0; j < new_item_list.length - 1; j++) {
          dest[i - 1][j] = parseInt(new_item_list[j]);
        }
        //console.log(dest);
      }
      return dest;
    }
  }
})();
