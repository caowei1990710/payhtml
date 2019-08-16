(function () {
  'use strict';

  angular
    .module('pmsJs')
    .directive('tabbar', tabbar);

  /** @ngInject */
  function tabbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/tabbar/tabbar.html',
      scope: {
        tabs: '=',
        todo: '=',
        index: '@'
      },
      controller: TabbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function TabbarController($state, $rootScope, $scope, getDefault,$timeout) {
      var vm = this;
      vm.tabs;
      vm.changtabs = [];
      var firstTab;
      var defaultTab;

      vm.changTab = function (index) {
        vm.selected = vm.changtabs[index];
        $scope.$broadcast('changtabar', vm.selected.text);
        $('title').text($rootScope.lagconfig[vm.selected.text]);
        //$scope.$on('to-parent', function(event,data) {
        //  console.log('ParentCtrl', data);	   //父级能得到值
        //});
        //$scope.$on('to-child', function(event,data) {
        //  console.log('ParentCtrl', data);	   //子级得不到值
        //});
        if (angular.isFunction(vm.todo))
          vm.todo(index);
      }
      //vm.changTab(0)
      if (!$rootScope.able) {
        return;
      }
      for (var i = 0; i < vm.tabs.length; i++) {
        if (vm.index == -1) {
            vm.changtabs.push(vm.tabs[i]);
        } else {
          if ($rootScope.able[vm.index][i] == 1) {
            vm.changtabs.push(vm.tabs[i]);
          }
        }
      }
      //vm.tabs = vm.changtabs;


      //getDefault.getAllstrong();
      $scope.$watch('$root.lagconfig', function (newValue, oldValue, scope) {
        if (angular.isUndefined(newValue)) {
          return;
        }
        for (var i = 0; i < vm.changtabs.length; i++) {
          vm.tabs[i].text = vm.tabs[i].text;
        }
      })
      for (var i = 0; i < vm.tabs.length; i++) {
        if ($rootScope.lagconfig) {
          vm.tabs[i].text = vm.tabs[i].text;
        }
        vm.selected = vm.changtabs[0];
        $('title').text($rootScope.lagconfig[vm.selected.text]);
        //var tab = vm.tabs[i];
        //if (i == 0) {
        //  firstTab = tab;
        //}
        //if (tab.default) {
        //  defaultTab = tab;
        //}
        //if (tab.name == $state.current.name) {
        //  vm.selected = tab;
        //  break;
        //}
      }
      //if (!vm.selected) {
      //  if (defaultTab) {base
      //    vm.selected = defaultTab;
      //  } else {
      //    vm.selected = firstTab;
      //  }
      //}
      $timeout(function () {
        $scope.$broadcast('changtabar', vm.selected.text);
      },1000);
      //$scope.$broadcast('changtabar', vm.selected.text);
    }
  }

})();
