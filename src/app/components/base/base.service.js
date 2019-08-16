(function () {
  'use strict';

  angular
    .module('pmsJs')
    .service('base', base);

  /** @ngInject */
  function base($log, $window, $timeout, $state, alertify, webSocketUrl, requestDatas, responseCallbacks, $rootScope,$filter) {
    // console.log('webSocketUrl:'+webSocketUrl);
    var packageData = {
      service: '',
      functionName: '',
      data: {},
      dialog: ''
    };

    if (window.webSocketUrl)
      webSocketUrl = window.webSocketUrl;
    $rootScope.ws = new WebSocket(webSocketUrl);
    var canalertify = false;
    $rootScope.debug = true;
    $rootScope.ws.onopen = function (evt) {
      // $log.info('onopen: ' + angular.toJson(evt));
      // $log.info(webSocketUrl + ' Connected.');
      var list = requestDatas;
      var sortedList = list.sort(function (a, b) {
        return a.priority - b.priority;
      });
      var filteredList = sortedList.filter(function (tmp) {
        delete tmp.priority;
        $rootScope.ws.send(angular.toJson(tmp));
        $log.log('REQUEST ON CONNECTED: ' + angular.toJson(tmp));
        return false;
      });
      //if ($rootScope.user){
      //  ws.send('{"service":"user","functionName":"login","data":{"item":{"loginName":"'+$rootScope.user.userName+'","password":"'+$rootScope.user.pwd+'"}},"dialog":""}');
      //  //{"service":"user","functionName":"login","data":{"item":{"loginName":"admin","password":"123456"}},"dialog":""}
      //}
      requestDatas = filteredList;
    };

    $rootScope.ws.onclose = function (evt) {
      $log.info('onclose: ' + angular.toJson(evt));
      //delete $window.sessionStorage.token;
      delete $window.sessionStorage.playerId;

      $timeout(function () {
        if ($rootScope.ws.readyState == 3) {
          $log.info('三秒后自动重连。。。');
        }
      }, 1000);
      $timeout(function () {
        if ($rootScope.ws.readyState == 3) {
          $log.info('二秒后自动重连。。。');
        }
      }, 2000);
      $timeout(function () {
        if ($rootScope.ws.readyState == 3) {
          $log.info('一秒后自动重连。。。');
        }
      }, 3000);
      $timeout(function () {
        if ($rootScope.ws.readyState == 3) {
          $log.info('自动重连中。。。');
          var oldWs = $rootScope.ws;
          $rootScope.ws = new WebSocket(webSocketUrl);
          $rootScope.ws.onopen = oldWs.onopen;
          $rootScope.ws.onclose = oldWs.onclose;
          $rootScope.ws.onmessage = oldWs.onmessage;
          $rootScope.ws.onerror = oldWs.onerror;
        }
      }, 4000);

      // var confirm = $window.confirm("连接已断开，是否刷新当前页？");
      // if (confirm) {
      //     var oldWs = ws;
      //     ws = new WebSocket(webSocketUrl);
      //     ws.onopen = oldWs.onopen;
      //     ws.onclose = oldWs.onclose;
      //     ws.onmessage = oldWs.onmessage;
      //     ws.onerror = oldWs.onerror;
      // }
      $log.info('Disconnected.');
    };

    $rootScope.ws.onmessage = function (evt) {
      if ($rootScope.debug)
        $log.debug('onmessage: ' + evt.data);
      var response = angular.fromJson(evt.data);
      if (response.functionName.indexOf("update") != -1 || response.functionName.indexOf("delete") != -1)
        $rootScope.loading = false;
      var list = responseCallbacks;
      var list2 = responseCallbacks;
      var count = list.length;
      if (response.data.status != 200) {
        $timeout(function () {
          $rootScope.loading = false;
        }, 1000)
        if (response.data.status == 101) {
          if (window.confirmDel)
            return;
          alertify.error($rootScope.lagconfig["账号已在其他地方登陆."]);
          $state.go('login');
          window.confirmDel = true;
          $timeout(function(){
            window.confirmDel = false
            ;
          },2000)
          //window.confirmDel = confirm("您的账号已在别的地方登陆.");
          //if (window.confirmDel) {
          //  window.location.reload()
          //};
          //return;
        } else if ($rootScope.lagconfig[response.data.status])
          alertify.error($rootScope.lagconfig[response.data.status]);
        else{
          alertify.error($filter('itemTolish')(response.data.errorMsg));
        }
          //alertify.error(response.data.errorMsg);
      } else {
        if (packageData.dialog) {
          alertify.success($rootScope.lagconfig["操作成功"]);
        }
        var notalerty = [{"service": "device", "functionName": "list"}, {
          "service": "platform",
          "functionName": "getPlatformList"
        }, {"service": "bank", "functionName": "get"}]
        if (canalertify && $rootScope.lagconfig) {
          //alertify.success($rootScope.lagconfig["操作成功"]);
          canalertify = false;
          $timeout(function () {
            canalertify = true;
          }, 3000)
        }
        //for(var i = 0 ; i< notalerty.length ; i++){
        //  if(response.service == notalerty[i].service && response.functionName == notalerty[i].functionName){
        //    break;gain s
        //  }sdf
        //  if(i == notalerty.length-1){
        //    alertify.success("操作成功");
        //  }
        //}
        for (var i = 0; i < count; i++) {
          var tmp = list[i];
          if (tmp && (tmp.funcName == response.functionName && tmp.service == response.service)) {
            if ($rootScope.debug)
              // $log.debug('onmessage callback: ' + (angular.toJson(tmp)));
            if (tmp.loopAll) {
              // tmp.callback.apply(this, [response.data]);
              applyCallback(tmp, this, [response.data]);
            } else {
              $timeout(function () {
                // tmp.callback.apply(this, [response.data]);
                applyCallback(tmp, this, [response.data]);
              });
              if (tmp.once) {
                list2.splice(i, 1);
              }
              break;
            }
          }
        }
        responseCallbacks = list2;
      }
      // for (var k = 0; k < count; k++) {
      //     $log.debug(angular.fromJson(angular.toJson(list2[k])));
      // }
    }

    function applyCallback(obj, context, dataList) {
      $timeout(function () {
        obj.callback.apply(context, dataList);
      });
    }

    $rootScope.ws.onerror = function (evt) {
      $log.error('onerror: ' + evt.data);
    };

    function sendRequest(funcName, data, priority) {
      if (!funcName) {
        $log.error('funcName is empty.');
        return;
      }
      if (!data) {
        $log.error('data is empty.');
        return;
      }
      if (data.item) {
        for (var sProp in data.item) {
          if (!data.item[sProp]) {
            data.item[sProp] = undefined;
          }
        }
        //if ($rootScope.user)
        //  data.item["platformId"] = $rootScope.user.platformId;

      }
      var pacData = angular.fromJson(angular.toJson(packageData));
      pacData.token = localStorage['token'];
      if ($rootScope.user)
        pacData.account = $rootScope.user.account;
      pacData.functionName = funcName;
      pacData.data = data;
      pacData.service = this.serviceName;
      if (pacData.functionName.indexOf("update") != -1) {
        $rootScope.loading = true;
        packageData.dialog = true;
      } else {
        packageData.dialog = false;
      }
      //if(pacData.functionName == "updateBankCardCredit" && pacData.service == "bankcard" delete)
      //  pacData.token = undefined;
      //if (!$rootScope.loading) {
      //  if (!$rootScope.beginTimer) {
      //    $rootScope.beginTimer = (new Date()).getTime();
      //    $rootScope.loading = true;
      //  } else {
      //    $rootScope.endTimer = (new Date()).getTime();
      //    if ($rootScope.endTimer - $rootScope.beginTimer > 2000) {
      //      $rootScope.beginTimer = (new Date()).getTime();
      //      $rootScope.loading = true;
      //    }
      //  }
      //  $timeout(function () {
      //    $rootScope.loading = false;
      //  }, 5000);
      //}
      if (priority) {
        pacData.priority = priority;
      } else {
        pacData.priority = 999;
      }

      if ($rootScope.ws.readyState == 0) {
        // var list = requestDatas;
        // var filteredList = list.filter(function(tmp) {
        //     return tmp.functionName != funcName;
        // })
        // filteredList.unshift(pacData);
        // requestDatas = filteredList;
        requestDatas.unshift(pacData);
      } else if ($rootScope.ws.readyState == 1) {
        delete pacData.priority;
        if (pacData.functionName.indexOf("delete") != -1 || pacData.functionName.indexOf("cancel") != -1) {
          var confirmDel = confirm("确认删除？");
          if (confirmDel) {
            //$rootScope.loading = true;
            $rootScope.ws.send(angular.toJson(pacData));
            if ($rootScope.debug)
              $log.debug('sendRequest: ' + angular.toJson(pacData));
          }
        } else {
          $rootScope.ws.send(angular.toJson(pacData));
          if ($rootScope.debug)
            $log.debug('sendRequest: ' + angular.toJson(pacData));
        }
      } else {
        //var confirm = $window.confirm("连接已断开，是否刷新当前页？");
        //if (confirm) {
        var oldWs = $rootScope.ws;
        $rootScope.ws = new WebSocket(webSocketUrl);
        $rootScope.ws.onopen = oldWs.onopen;
        $rootScope.ws.onclose = oldWs.onclose;
        $rootScope.ws.onmessage = oldWs.onmessage;
        $rootScope.ws.onerror = oldWs.onerror;
        //}
        //$log.info('Disconnected.');
      }
      $timeout(function () {
        $rootScope.loading = false;
      }, 3000)
    }

    function addListener(funcName, callback, loopAll) {
      // var list = responseCallbacks;
      // responseCallbacks = list.filter(function(tmp) {
      //     return tmp.funcName != funcName;
      // })
      responseCallbacks.unshift({
        service: this.serviceName,
        funcName: funcName,
        callback: callback,
        loopAll: loopAll
      });
    }

    function addOnceListener(funcName, callback) {
      // var list = responseCallbacks;
      // responseCallbacks = list.filter(function(tmp) {
      //     return tmp.funcName != funcName;
      // })

      responseCallbacks.unshift({
        service: this.serviceName,
        funcName: funcName,
        callback: callback,
        once: true
      });
    }

    this.emit = sendRequest;
    this.on = addListener;
    this.once = addOnceListener;
  }
})();
