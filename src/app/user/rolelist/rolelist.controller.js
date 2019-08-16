(function() {
    'use strict';

    angular
        .module('pmsJs')
        .controller('RoleListController', RoleListController);

    /** @ngInject */
    function RoleListController($log, alertify, jQ, role, permission, roleHasPermission) {
        var vm = this;
        vm.creation = {};
        vm.edition = {};
        vm.permissionList = [];
        vm.showSubPermission = false;
        vm.permissionSubListTitle = '';
        vm.permissionSubList = [];
        vm.selectedRoleId = '';
        vm.selectedPermsId = '';
        vm.showCreation = false;
        vm.showEdition = false;
        vm.perms = {};

        function addRole() {
            role.emit('add', {
                item: {
                    name: vm.creation.roleName,
                    description: vm.creation.roleDesc
                }
            });
        }
        vm.addRole = addRole;
        role.on('add', function(data) {
            if (data.status == 200) {
                jQ('#createRole').modal('hide');
            }
        });

        function updateRole() {
            role.emit('update', {
                item: {
                    id: vm.edition.roleId,
                    name: vm.edition.roleName,
                    description: vm.edition.roleDesc
                }
            });
        }
        vm.updateRole = updateRole;
        role.on('update', function(data) {
            if (data.status == 200) {
            }
        });

        function get() {
            role.emit('get', {
                item: {}
            });
        }
        get();
        role.on('get', function(data) {
            if (data.status == 200) {
                vm.roleList = data.items;
            }
        });

        function getPermission() {
            permission.emit('get', {
                item: {}
            });
        }
        getPermission();
        permission.on('get', function(data) {
            if (data.status == 200) {
                vm.permissionList = data.items;
            }
        });

        function changePermissionSubList(id, name, desc) {
            vm.selectedPermsId = id;
            vm.permissionSubListTitle = desc;
            vm.permissionSubList = vm['children' + name];
            vm.showSubPermission = true;
        }
        vm.changePermissionSubList = changePermissionSubList;

        function getRoleHasPermission(roleId, roleName, roleDesc) {
            vm.selectedPermsId = '';
            vm.permissionSubList = [];
            vm.permissionSubListTitle = '';
            vm.showSubPermission = false;
            vm.selectedRoleId = roleId;

            vm.edition.roleId = roleId;
            vm.edition.roleName = roleName;
            vm.edition.roleDesc = roleDesc;

            vm.perms = {};
            roleHasPermission.emit('get', {
                item: {
                    roleId: roleId
                }
            });
        }
        vm.getRoleHasPermission = getRoleHasPermission;
        //roleHasPermission.on('get', function(data) {
        //    if (data.status == 200) {
        //        for (var i = 0; i < data.items.length; i++) {
        //            var tmp = data.items[i];
        //            if (tmp) {
        //                vm.perms['checked' + tmp.id] = true;
        //            } else {
        //                vm.perms['checked' + tmp.id] = false;
        //            }
        //        }
        //    }
        //});

        function addOrDelRolePermission(permissionId) {
            var checked = vm.perms['checked' + permissionId];
            var funcName = 'add';
            if (!checked) {
                funcName = 'delete'
            }
            roleHasPermission.emit(funcName, {
                item: {
                    roleId: vm.selectedRoleId,
                    permissionIds: [
                        permissionId
                    ]

                }
            });
        }
        vm.addOrDelRolePermission = addOrDelRolePermission;
        roleHasPermission.on('add', function(data) {
            if (data.status == 200) {
            }
        });
        roleHasPermission.on('delete', function(data) {
            if (data.status == 200) {
            }
        });
    }
})();
