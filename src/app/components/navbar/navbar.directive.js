(function () {
  'use strict';

  angular
    .module('pmsJs')
    .directive('navbar', navbar)
    .directive('dateChange', function ($compile, $log) {
      return {
        scope: {
          dt: '=ngModel'
        },
        restrict: 'AE',
        link: function (scope, element, attr) {
          scope.dt = new Date();
          scope.getDayClass = function (data) {
            var date = data.date,
              mode = data.mode;
            if (mode === 'day') {
              var dayToCheck = new Date(date).setHours(0, 0, 0, 0);
              for (var i = 0; i < vm.events.length; i++) {
                var currentDay = new Date(vm.events[i].date).setHours(0, 0, 0, 0);
                if (dayToCheck === currentDay) {
                  return scope.events[i].status;
                }
              }
            }
            return '';
          }
          scope.activate = function () {
            scope.mytime = new Date();
            scope.hstep = 1;
            scope.mstep = 15;

            scope.options = {
              hstep: [1, 2, 3],
              mstep: [1, 5, 10, 15, 25, 30]
            };

            scope.ismeridian = true;
            scope.toggleMode = function () {
              scope.ismeridian = !vm.ismeridian;
            };

            scope.update = function () {
              var d = new Date();
              d.setHours(14);
              d.setMinutes(0);
              scope.mytime = d;
            };
            scope.changed = function () {
              $log.log('Time changed to: ' + vm.mytime);
            };
            scope.clear = function () {
              scope.mytime = null;
            };
          }

          scope.activate();
          scope.inlineOptions = {
            customClass: scope.getDayClass,
            minDate: new Date(),
            showWeeks: true
          };
          scope.dateOptions = {
            dateDisabled: scope.disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
          };
          scope.today = function () {
            scope.dt = new Date();
          };
          scope.recordindex = {index: 1};
          scope.disabled = function (data) {
            var date = data.date,
              mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
          }
          scope.toggleMin = function () {
            scope.inlineOptions.minDate = scope.inlineOptions.minDate ? null : new Date();
            scope.dateOptions.minDate = scope.inlineOptions.minDate;
          };
          scope.toggleMin();
          scope.open = function () {
            scope.popup.opened = true;
          };
          scope.setDate = function (year, month, day) {
            scope.dt = new Date(year, month, day);
          };
          scope.clear = function () {
            scope.dt = null;
          };
          scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
          scope.format = scope.formats[0];
          scope.altInputFormats = ['M!/d!/yyyy'];
          scope.popup = {
            opened: false
          };
          var tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          var afterTomorrow = new Date();
          afterTomorrow.setDate(tomorrow.getDate() + 1);
          scope.events = [
            {
              date: tomorrow,
              status: 'full'
            },
            {
              date: afterTomorrow,
              status: 'partially'
            }
          ];
          var ele = '<input type="text" style="display: inline-block;width: 85%;margin-right: 15%" class="form-control" uib-datepicker-popup ng-model="dt" is-open="popup.opened" ng-click="open()"  datepicker-options="dateOptions" ng-required="true" close-text="Close" />';
          element.html(ele);
          $compile(element.contents())(scope);
        }
      }
    })

  /** @ngInject */
  function navbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
        creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true,
      link: function ($scope, $element, $attrs, ctrls) {
        console.log('ctrls:' + ctrls);
      }
    };

    return directive;

    /** @ngInject */
    function NavbarController($scope, $state, alertify, $rootScope, jQ, finditem, $timeout, getDefault, user, heartBeat, webSocketUrl) {
      var vm = this;
      //$scope.$watch($state.$current.url,function(newValue){
      //  console.log('newValue:'+newValue);
      //})
      //$rootScope.able = [[1], [1, 1], [1], [1, 1, 1], [1, 1, 1, 1], [1, 1, 1], [1], [1, 1, 1, 1, 1, 1]];
      //$rootScope.title = {["用户"]}
      vm.openMore = (window.localStorage.openMore == 'true');
      vm.setOpenmore = function () {
        window.localStorage.openMore = vm.openMore;
      }
      //window.localStorage.openMore = true;
      console.log('$rootScope.able:' + $rootScope.able);
      if (!$rootScope.able) {
        //console.log('window.sessionStorage.hash:' + window.sessionStorage.hash);
        $rootScope.beforeurl = window.sessionStorage.hash;
        $state.go('login');
        if (!window.sessionStorage.hash)
          alertify.error("请先登录");
        return;
      }
      if (!$rootScope.debug){
        heartBeat.on('heartBeat', function (data) {
          vm.currentTime = (new Date()).getTime();
          //心跳包
          $timeout(function () {
            if ((data.currentTime - vm.currentTime) / 1000 > 5) {
              $rootScope.ws.close();
              //$rootScope.ws = new WebSocket(webSocketUrl);
              //user.login({"loginName":$rootScope.username,"password":$rootScope.password});
            };
            $timeout(function () {
              heartBeat.heartBeat(vm.currentTime);
            }, 10000)
          });
        })
        heartBeat.heartBeat((new Date()).getTime());
      }
      vm.updatepwd = function () {
        $state.go('home.update');
        //jQ('#updateUser').modal('show');
      }

      $scope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
        window.sessionStorage.hash = newUrl;
        //if(event.currentScope.vm.default_titles)
        var stringList = event.currentScope.vm.titles;
        for (var i = 0; i < stringList.length; i++) {
          if (newUrl.indexOf(stringList[i].url.substring(5, stringList[i].url.length)) != -1) {
            event.currentScope.vm.index = i;
            return;
          }
        }
        //console.log('data:'+data);
      })
      vm.getDefault = function () {
        $rootScope.loading = true;
        $timeout(function () {
          $rootScope.loading = false;
        }, 4000)
        getDefault.getAllstrong();
      };

      vm.default_titles = [{
        content: $rootScope.lagconfig["用户"],
        url: "home.user",
        index: 0
      }, {content: $rootScope.lagconfig["提案列表"], url: "home.list", index: "9"}
        , {
          content: $rootScope.lagconfig["银行卡"],
          url: "home.bc", index: 1
        }, {
          content: $rootScope.lagconfig["收款"],
          url: "home.deposit", index: 3
        }
        , {content: $rootScope.lagconfig["付款"], url: "home.cashin", index: 4}, {
          content: $rootScope.lagconfig["匹配单号"],
          url: "home.match", index: 5
        }, {content: $rootScope.lagconfig["在线支付补单"], url: "home.onlinepay", index: 7}, {
          content: $rootScope.lagconfig["商户号"],
          url: "home.merchant", index: 2
        }, {
          content: $rootScope.lagconfig["报表"],
          url: "home.rp", index: 8
        }, {
          content: $rootScope.lagconfig["系统管理"],
          url: "home.sm", index: 6
        }];
      vm.titles = vm.default_titles;
      vm.titles = [];
      //angular.forEach(vm.default_titles, function (item, index) {
      //  angular.forEach($rootScope.able[item.index], function (item, index) {
      //    if ($rootScope.able[i][j] == 1) {
      //      vm.titles.push(vm.default_titles[i]);
      //      break;
      //    }
      //  });
      //});
      for (var i = 0; i < vm.default_titles.length; i++) {
        for (var j = 0; j < $rootScope.able[vm.default_titles[i].index].length; j++) {
          if ($rootScope.able[vm.default_titles[i].index][j] == 1) {
            vm.titles.push(vm.default_titles[i]);
            break;
          }
        }
      }
      vm.changeindex = function (e) {
        if (window.localStorage.openMore == 'true') {
          var desturl = "http://"+window.location.host +"/#/home/" + vm.default_titles[e].url.substring(vm.default_titles[e].url.indexOf('.') + 1, vm.default_titles[e].url.length);
          window.sessionStorage.hash = desturl;
          window.open(desturl);
        } else {
          vm.index = e;
          $state.go(vm.titles[e].url)
          $rootScope.url = vm.titles[e].url;
        }
        //window.open("http://localhost:3000/#/home/bc");
      }
      function logout() {
        window.localStorage.openMore = 'false';
        $state.go('login');
      }
      if (window.localStorage.openMore == 'true') {
        //var string = window.sessionStorage.hash;
        console.log('$rootScope.beforeurl:' + $rootScope.beforeurl);
        if (angular.isUndefined($rootScope.beforeurl)) {

        } else {
          var desturl = 'home.' + $rootScope.beforeurl.substring($rootScope.beforeurl.lastIndexOf('/') + 1, $rootScope.beforeurl.length);
          angular.forEach(vm.default_titles, function (item, index) {
            if (desturl == item.url) {
              $state.go(vm.titles[index].url)
              $rootScope.url = vm.titles[index].url;
            }
          });
        }
      }
      vm.addNew = function () {
        jQ('#editDevices').modal('hide');
      };
      vm.updateDevicenow = function () {
        jQ('#editDevice').modal('hide');
        if (vm.password == $rootScope.password) {
          localStorage['number'] = vm.deviceId;
          $rootScope.device = finditem.getById('id', localStorage['number'], $rootScope.devicelist);
          jQ('#editDevice').modal('hide');
        } else {
          alertify.error("权限密码错误。");
        }
      }
      vm.logout = logout;
    }
  }

})();
