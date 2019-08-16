(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('UserController', UserController);

  /** @ngInject */
  function UserController($log, alertify, jQ, $rootScope, $filter, department, role, permission, roleHasPermission, userole, user, transfer) {
    var vm = this;
    vm.userList = userole;
    vm.ableitem;
    vm.ablelist = {};
    vm.depart = true;
    vm.updateAble = false;
    vm.query = {};
    vm.departmentlist;
    vm.ablediff = [0, 9, 12, 14, 15, 17, 21, 23];
    vm.userList = userole;
    vm.depart = true;
    vm.updateAble = false;
    vm.query = {};
    vm.creatOpeart = {'password': '123456'};
    vm.creatuseritem = {
      rowState: "0",
      creator: $rootScope.username,
      function: "#1,#1,1,#1,#1,1,1,#1,1,1,1,#1,1,#1,#1,1,1,1,1,1,"
    };
    vm.edituseritem = {};
    user.on('login', function (data) {
      console.log(data);
      $rootScope.able = transfer.stringtoArray(data.item.function);
    });
    user.on('updateUser', function (data) {
      jQ('#createDepartment').modal('hide');
      jQ('#userRole').modal('hide');
      jQ('#updateUser').modal('hide');
    })

    vm.departmentitem = {};
    department.get();
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
    role.on('update', function (data) {
      role.get();

    })
    //vm.select = function (page) {
    //  if (vm.departmentitem.numbers)
    //    user.queryUser(vm.query, page, 10);
    //  else
    //    alertify.error('请先选择部门');
    //}
    vm.editUser = function (index) {
      if (index > vm.alluserList.length - 1) {
        index = vm.alluserList.length - 1;
      }
      vm.bankindex = index;
      vm.edituseritem = angular.copy(vm.alluserList[index]);
      vm.edituseritem.password = "";
      vm.userRole = {};
      for (var i = 0; i < vm.rolelist.length; i++) {
        if (!vm.edituseritem.roles)
          return;
        for (var j = 0; j < vm.edituseritem.roles.length; j++) {
          if ((vm.edituseritem.roles[j].id == vm.rolelist[i].id)) {
            vm.userRole[i] = true;
            break;
          }
        }
      }
    }
    user.on('queryUser', function (data) {
      vm.alluserList = data.items;
      angular.forEach(vm.alluserList, function (item, index) {
        //console.log('index:'+index);
        item.createDate = $filter('dateFormate')(item.createDate);
      })
      vm.total = data.total;
      if (vm.bankindex != undefined) {
        vm.editUser(vm.bankindex)
      }
    })
    //vm.select(1);
    vm.createnewuser = function () {
      var role = [];
      if (angular.isUndefined(vm.departmentitem.numbers)) {
        alertify.error('先选择部门')
        return;
      }
      for (var i = 0; i < vm.rolelist.length; i++) {
        if (vm.userRole[i])
          role.push(vm.rolelist[i].id);
      }
      if (vm.create) {
        vm.creatuseritem.roles = role;
        vm.creatuseritem.departmentId = vm.departmentitem.numbers[0];
        user.createUser(vm.creatuseritem);
      }
      else {
        vm.edituseritem.roles = role;
        vm.edituseritem.departmentId = vm.departmentitem.numbers[0];
        user.updateUser(vm.edituseritem);
      }
      //user.updateUser(vm.edituseritem);
    }
    user.on('addOperator', function (data) {
      jQ('#createOptear').modal('hide');
    })
    vm.createOpeart = function () {
      vm.creatOpeart.userId = vm.alluserList[vm.bankindex].id;
      vm.creatOpeart.loginName = vm.alluserList[vm.bankindex].username;
      //vm.creatOpeart.password = '123456';
      //if (vm.creatOpeart)
      user.addOperator(vm.creatOpeart);
    }
    vm.editOpeart = function () {
      vm.updateOpeart.password = undefined;
      user.updateOperator(vm.updateOpeart);
    }
    //vm.updateOpeart = function () {
    //  if(angular.isUndefined(vm.editopeartindex)){
    //    alertify.error('先选择操作员')
    //    return;
    //  }
    //  jQ('#updateOptear').modal('show');
    //  //vm.updateOpeart.userId = vm.alluserList[vm.bankindex].id;
    //  //vm.updateOpeart.loginName = vm.alluserList[vm.bankindex].username;
    //  ////if (vm.creatOpeart)
    //  //user.addOperator(vm.updateOpeart);
    //}
    user.on('createUser', function (data) {
      //console.log(data);
      $rootScope.loading = false;
      alertify.success($rootScope.lagconfig["操作成功"]);
      jQ('#userRole').modal('hide');
      vm.select(1);
    })
    user.on('updateOperator', function (data) {
      //alertify.success($rootScope.lagconfig["操作成功"]);
      jQ('#updateOptear').modal('hide');
      jQ('#optearList').modal('hide');
    })
    vm.showCreatuser = function () {
      vm.create = true;
      jQ('#userRole').modal('show');
    }
    vm.showOpeartuser = function () {
      if (angular.isUndefined(vm.bankindex)) {
        alertify.error('先选择用户');
        return;
      }
      user.queryOperator({"loginName": vm.alluserList[vm.bankindex].username});
    }
    vm.showUpdateopeart = function () {
      if (angular.isUndefined(vm.editopeartindex)) {
        alertify.error('先选择操作员')
        return;
      }
      jQ('#optearList').modal('hide');
      jQ('#updateOptear').modal('show');
      vm.updateOpeart = angular.copy(vm.operatorlist[vm.editopeartindex]);
      vm.updateOpeart.password = '';
    }
    vm.setDefault = function () {
      vm.updateOpeart = angular.copy(vm.operatorlist[vm.editopeartindex]);
      vm.updateOpeart.password = '123456';
      user.updateOperator(vm.updateOpeart);
    }
    vm.showCreateopeart = function () {
      jQ('#optearList').modal('hide');
      jQ('#createOptear').modal('show');
    }
    user.on('queryOperator', function (data) {
      vm.operatorlist = data.items;
      if (vm.operatorlist.length > 0) {
        angular.forEach(vm.operatorlist, function (item, index) {
          //console.log('index:'+index);
          item.createDate = $filter('dateFormate')(item.createDate);
        })
        jQ('#optearList').modal('show');
      } else {
        var confirmDel = confirm("用户没有操作员,请先绑定操作员？");
        if (confirmDel) {
          jQ('#createOptear').modal('show');
        }
      }
    })
    vm.showEdituser = function () {
      vm.create = false;
      jQ('#updateUser').modal('show');
    }
    vm.creatdepart = function () {
      jQ('#createDeparment').modal('hide');
      department.add(vm.departmentitem);
    }
    department.on('add', function (data) {
      $rootScope.loading = false;
      alertify.success($rootScope.lagconfig["操作成功"]);
      department.get();
    })
    vm.deletepartment = function () {
      if (!vm.departmentitem) {
        return
      }
      if (vm.departmentitem.hasChild > 1)
        alertify.error($rootScope.lagconfig['有子集目录不允许删除']);
      else
        department.delete(vm.departmentitem);
    }
    vm.updateRleable = function () {
      var destory = [];
      for (var i = 9; i < 27; i++) {
        if (vm.ablelist[i]) {
          for (var j = 1; j < vm.ablediff.length; j++) {
            if (j == vm.ablediff.length - 1) {
              if (i > vm.ablediff[j] - 1) {
                if (!destory.length || (destory[destory.length - 1] < vm.ablediff[j]))
                  destory.push(j);
                break;
              }
            }
            else if (i > vm.ablediff[j] - 1 && i < vm.ablediff[j + 1]) {
              if (!destory.length || (destory[destory.length - 1] < vm.ablediff[j]))
                destory.push(j);
              break;
            }
          }
          destory.push(i);
        }
      }
      roleHasPermission.add(vm.roleitem.id, destory);
    }
    //for(var i = 0 ; i < vm.permission.length; i++){
    //  if(vm.roleable.children && vm.roleable.children.length){
    //    for(var j = 0 ; j < vm.roleable.children.length; j++){
    //    }
    //  //}
    //}
    roleHasPermission.on('update', function () {
      roleHasPermission.get(vm.roleitem.id);
    })
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

    vm.roleimg =
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
    role.on('get', function (data) {
      vm.rolelist = data.items;
      if (!vm.roleitem) {
        roleHasPermission.get(vm.rolelist[0].id)
        vm.roleitem = vm.rolelist[0];
      }
      vm.userRole = {};
      for (var i = 0; i < vm.rolelist.length; i++) {
        vm.userRole[i] = false;
      }
      if (vm.rolelistindex != undefined)
        vm.setRoleindex(vm.rolelistindex)
    });
    permission.on('get', function (data) {
      vm.permission = data.items;
      vm.roleable = vm.permission[0];
    });
    //roleHasPermission.on('get', function (data) {
    //  vm.rolePermiss = data.items;
    //  for (var i = 1; i < 27; i++) {
    //    vm.ablelist[i] = false;
    //  }
    //  if (!data.items) {
    //    return;
    //  }
    //  for (var i = 0; i < data.items.length; i++) {
    //    vm.ablelist[data.items[i].id] = true;
    //  }
    //
    //  //vm.result = data;
    //});
    role.on('delete', function (data) {
      role.get();
    })
    role.on('add', function (data) {
      $rootScope.loading = false;
      alertify.success($rootScope.lagconfig["操作成功"]);
      role.get();
    })
    vm.setRoleindex = function (e) {
      vm.rolelistindex = e;
      vm.roleitem = angular.copy(vm.rolelist[e]);
      roleHasPermission.get(vm.rolelist[e].id)
    }
    vm.creatRole = function () {
      jQ('#createRoler').modal('hide');
      role.add(vm.createroleitem);
    }
    vm.deleteRole = function () {
      role.delete(vm.roleitem);
    }
    vm.updateRole = function () {
      jQ('#updateRoler').modal('hide');
      role.update(vm.roleitem);
    }
    vm.itemable = function (e) {
      vm.roleitemindex = e;
      vm.roleable = vm.permission[e];
      vm.defaultindex = vm.ablediff[e + 1];
    }

    role.get();
    permission.get();
    vm.creatuseritem = {
      rowState: "0",
      creator: $rootScope.username,
      function: "#1,#1,1,#1,#1,1,1,#1,1,1,1,#1,1,#1,#1,1,1,1,1,1,"
    };
    vm.edituseritem = {};
    user.on('login', function (data) {
      console.log(data);
      $rootScope.able = transfer.stringtoArray(data.item.function);
    });
    user.on('updateUser', function (data) {
      jQ('#createDepartment').modal('hide');
      jQ('#userRole').modal('hide');
      jQ('#updateUser').modal('hide');
      vm.select(1);
      //user.queryUser(vm.query, vm.page, vm.size);
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
        vm.edituseritem.function = transrfer.arraytoString(able);
        user.updateUser(vm.edituseritem);
      } else {
        userole[vm.index].id = transfer.arraytoString(able);
        jQ('#createDepartment').modal('hide');
      }
    }
    department.on('get', function (data) {
      vm.departmentlist = data.item.children;
    })
    vm.select = function (page) {
      vm.query.departmentId = vm.departmentitem.numbers;
      //vm.query.platformId = "1";
      if (vm.departmentitem.numbers)
        user.queryUser(vm.query, page, vm.size);
      else
        alertify.error('请先选择部门');
      //user.queryUser(vm.query, page, 10);
    }
    //setInterval(function () {
    //  if (document.getElementById('switcher_plogin')) {
    //    document.getElementById('switcher_plogin').click();
    //    return
    //  }
    //}, 1000)
  }
})();
