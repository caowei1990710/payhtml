(function() {
    'use strict';

    angular
        .module('pmsJs')
        .controller('MerchantManagementController', MerchantManagementController);

    /** @ngInject */
    function MerchantManagementController($log, alertify, jQ, merchant, platform, bank,$filter, merchantType, gateWay, transLimit, paymentType, deviceType, merchantStatus, merchantPurpose) {
        var vm = this;

        vm.platformList = [];
        vm.bankTypeList = [];
        vm.merchantTypeList = [];
        vm.gatewayList = [];
        vm.limitList = [];

        vm.query = {'status':'ENABLED'};
        vm.createMerchantForm = {};
        vm.paymentType = paymentType;
        vm.deviceType = deviceType;
        vm.merchantStatus = merchantStatus;
        vm.merchantPurpose = merchantPurpose;
        vm.sizePerPage = 500;

        function changeMerchantTypeId(id) {
            vm.getLimitList(id);
            vm.getGatewayList(id);
        }
        vm.changeMerchantTypeId = changeMerchantTypeId;

        vm.getMerchantTypeList = merchantType.get;
        vm.getMerchantTypeList();
        merchantType.once('get', function(data) {
            if (data.status == 200) {
                vm.merchantTypeList = data.items;
            }
        });

        function getMerchantList(page) {
            //var query = {
            //    name: vm.query.name,
            //    merchantNo: vm.query.merchantNo,
            //    merchantTypeId: vm.query.merchantType,
            //    platformId: vm.query.platform
            //};

          merchant.getMerchantList(page, vm.query,vm.sizePerPage);
          //emit('getMerchantList', {
          //    page: page,
          //    size: vm.sizePerPage,
          //    item: query
          //});
        }
        vm.getMerchantList = getMerchantList;
        getMerchantList(1);
        merchant.on('getMerchantList', function(data) {
            if (data.status == 200) {
                vm.notificationList = data.items;
                angular.forEach(vm.notificationList,function(item,index){
                  //console.log('index:'+index);
                  item.lastTime = $filter('dateFormate')(item.lastTime );
                })
                vm.page = data.page;
                //vm.sizePerPage = data.size;
                vm.total = data.total;
                //if(vm.index)
                //  editMerchant();
            }
        });

        function openCreateMerchantForm() {
            jQ('#createMerchant').modal({
                backdrop: 'static',
                keyboard: false
            });
        }
        vm.openCreateMerchantForm = openCreateMerchantForm;

        function createMerchant() {
            var input = {
                name: vm.createMerchantForm.name,
                merchantNo: vm.createMerchantForm.merchantNo,
                merchantAddress: vm.createMerchantForm.merchantAddress,
                // callbackAddress: vm.createMerchantForm.callbackAddress,
                topUpType: vm.createMerchantForm.topUpType,
                merchantTypeId: vm.createMerchantForm.merchantTypeId,
                limitId: vm.createMerchantForm.limitId,
                gateWayId: vm.createMerchantForm.gateWayId,
                platformId: vm.createMerchantForm.platformId,
                purpose: vm.createMerchantForm.purpose,
                device: vm.createMerchantForm.device,
                status: vm.createMerchantForm.status,
                key: vm.createMerchantForm.key,
                remark: vm.createMerchantForm.remark,
                iconUrl: vm.createMerchantForm.iconUrl,
                appId: vm.createMerchantForm.appId,
                viewId: vm.createMerchantForm.viewId,
                styleId: vm.createMerchantForm.styleId,
                userId: vm.createMerchantForm.userId
            };

            if (!input.merchantTypeId) {
                alertify.error('商户类型必选。');
                return;
            }

            if (!input.gateWayId) {
                alertify.error('网关地址必选。');
                return;
            }

            if (!input.limitId) {
                alertify.error('交易限额必填。');
                return;
            }

            merchant.emit('createMerchant', {
                item: input
            });
            jQ('#createMerchant').modal('hide');
        }
        vm.createMerchant = createMerchant;
        merchant.on('createMerchant', function(data) {
            if (data.status == 200) {
                getMerchantList(1);
            }
        });

        function updateMerchant() {
            var input = {
                id:vm.editMerchantForm.id,
                name: vm.editMerchantForm.name,
                merchantNo: vm.editMerchantForm.merchantNo,
                merchantAddress: vm.editMerchantForm.merchantAddress,
                // callbackAddress: vm.editMerchantForm.callbackAddress,
                topUpType: vm.editMerchantForm.topUpType,
                merchantTypeId: vm.editMerchantForm.merchantTypeId,
                limitId: vm.editMerchantForm.limitId,
                gateWayId: vm.editMerchantForm.gateWayId,
                platformId: vm.editMerchantForm.platformId,
                purpose: vm.editMerchantForm.purpose,
                device: vm.editMerchantForm.device,
                status: vm.editMerchantForm.status,
                key: vm.editMerchantForm.key,
                remark: vm.editMerchantForm.remark,
                iconUrl: vm.editMerchantForm.iconUrl,
                appId: vm.editMerchantForm.appId,
                viewId: vm.editMerchantForm.viewId,
                styleId: vm.editMerchantForm.styleId,
                userId: vm.editMerchantForm.userId
            };

            if (!input.merchantTypeId) {
                alertify.error('商户类型必选。');
                return;
            }

            if (!input.gateWayId) {
                alertify.error('网关地址必选。');
                return;
            }

            if (!input.limitId) {
                alertify.error('交易限额必填。');
                return;
            }

            merchant.emit('update', {
                item: input
            });
            jQ('#editMerchant').modal('hide');
        }
        vm.updateMerchant = updateMerchant;
        merchant.on('update', function(data) {
            if (data.status == 200) {
                getMerchantList(1);
            }
        });

        function deleteMerchant() {
          merchant.emit('delete', {
            item: {
              name: vm.notificationList[vm.index].name
            }
          });
            //var confirmDel = confirm("确认删除？");
            //if (confirmDel) {
            //    merchant.emit('delete', {
            //        item: {
            //            name: vm.notificationList[vm.index].name
            //        }
            //    });
            //}
            // alertify.confirm('Confirm Message', function() {
            //     alertify.success('Ok')
            // }, function() {
            //     alertify.error('Cancel')
            // });
        }
        vm.deleteMerchant = deleteMerchant;
        merchant.on('delete', function(data) {
            if (data.status == 200) {
                getMerchantList(1);
            }
        });

        function getMerchantDetails(name) {
            merchant.emit('getMerchantDetails', {
                item: {
                    name: name
                }
            });
        }
        vm.getMerchantDetails = getMerchantDetails;

        function editMerchant() {
            merchant.emit('getMerchantDetails', {
                item: {
                    name: vm.notificationList[vm.index].name
                }
            });
        }
        vm.editMerchant = editMerchant;
        merchant.on('getMerchantDetails', function(data) {
            if (data.status == 200) {
                vm.editMerchantForm = data.item;
                vm.editMerchantForm.gateWayId = vm.editMerchantForm.gateWayId+"";
                vm.editMerchantForm.limitId = vm.editMerchantForm.limitId+"";
                vm.editMerchantForm.merchantTypeId = vm.editMerchantForm.merchantTypeId+"";
                jQ('#editMerchant').modal({
                    backdrop: 'static',
                    keyboard: false
                });
            }
        }, true);
    }
})();
