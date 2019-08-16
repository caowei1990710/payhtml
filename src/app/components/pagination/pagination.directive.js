(function () {
  'use strict';

  angular
    .module('pmsJs')
    .directive('pagination', pagination);

  /** @ngInject */
  function pagination() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/pagination/pagination.html',
      scope: {
        page: '=',
        total: '=',
        trigger: '&',
        size:'=',
        left:'@'
      },
      controller: PaginationController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function PaginationController($scope) {
      var vm = this;
      vm.page = 1;
      vm.page = parseInt(vm.page);
      vm.prepage = undefined;
      vm.nextpage = vm.page + 1;
      //if (!vm.size)
      //vm.size = 8;
      vm.total = 1;
      vm.totalPage = 1;
      $scope.$watch(function () {
        return vm.total;
      }, function () {
        updateList();
      })
      //$scope.$watch('page',function(newValue, oldValue, scope) {
      //  if(angular.isUndefined(newValue))
      //    return;
      //  //vm.page =
      //  if (vm.page > 1) {
      //    vm.prepage = parseInt(no) - 1;
      //  } else {
      //    vm.prepage = undefined;
      //  }
      //  if (vm.page > 2) {
      //    vm.perprepage = parseInt(no) - 2;
      //  }
      //  if (vm.totalPage > 2) {
      //    vm.nextnextpage = parseInt(no) + 2;
      //  }
      //  if (vm.page < vm.totalPage) {
      //    vm.nextpage = parseInt(no) + 1;
      //  } else {
      //    vm.nextpage = undefined;
      //  }
      //  updateList();
      //});
      $scope.$watch(function () {
        return vm.page;
      }, function () {

        updateList();
      })
      //if(vm.page > 2){
      //  vm.perprepage = parseInt(no) - 2;
      //}
      //if(vm.totalPage > 2){
      //  vm.nextnextpage = parseInt(no) + 2;
      //}
      $scope.$watch(function () {
        return vm.size;
      }, function () {
        updateList();
      })
      $scope.$watch("size", function (newValue, oldValue, scope) {
        if (angular.isUndefined(newValue))
          return;
        updateList();
      })
      function updateList() {
        vm.totalPage = Math.ceil(vm.total / vm.size);
        if (vm.totalPage == 0) {
          vm.totalPage = 1;
        }
        if (vm.page > 1) {
          vm.prepage = parseInt(vm.page) - 1;
        } else {
          vm.prepage = undefined;
        }
        if (vm.page > 2) {
          vm.perprepage = parseInt(vm.page) - 2;
        }else{
          vm.perprepage = undefined;
        }
        if (vm.totalPage > 2) {
          vm.nextnextpage = parseInt(vm.page) + 2;
        }else{
          vm.nextnextpage = undefined;
        }
        if (vm.page < vm.totalPage) {
          vm.nextpage = parseInt(vm.page) + 1;
        } else {
          vm.nextpage = undefined;
        }
        var list = [];
        for (var i = 0; i < vm.totalPage; i++) {
          list[i] = i;
        }
        initNextPrevClass(list);
        vm.pageItems = list;

      }

      updateList();
      vm.updateList = updateList;

      function changePage(no) {

        if (no == 'next') {
          no = parseInt(vm.page) + 1;
        } else if (no == 'prev') {
          no = parseInt(vm.page) - 1;
        }
        if (no >= 1 && no <= vm.totalPage) {
          vm.page = no;
          //if(vm.page > 1){
          //  vm.prepage = parseInt(no) - 1;
          //}else{
          //  vm.prepage = undefined;
          //}
          //if(vm.page > 2){
          //  vm.perprepage = parseInt(no) - 2;
          //}
          //if(vm.totalPage > 2){
          //  vm.nextnextpage = parseInt(no) + 2;
          //}
          //if(vm.page < vm.totalPage){
          //  vm.nextpage = parseInt(no) + 1;
          //}else{
          //  vm.nextpage = undefined;
          //}
          //vm.nextpage = parseInt(no) + 1;
          vm.trigger({
            page: no
          });
          //updateList();
        }
        initNextPrevClass();
        //$scope.$apply();
      }

      vm.changePage = changePage;

      function initNextPrevClass(list) {
        if (list && list.length < 2) {
          vm.classPrev = 'disabled';
          vm.classNext = 'disabled';
        } else {
          if (vm.page == 1) {
            vm.classPrev = 'disabled';
          } else {
            vm.classPrev = '';
          }
          if (vm.page == vm.totalPage) {
            vm.classNext = 'disabled';
          } else {
            vm.classNext = '';
          }
        }
      }

      function getCurrentClass(no) {
        if (vm.page == no) {
          return "active";
        }
      }

      vm.getCurrentClass = getCurrentClass;
    }
  }

})();
