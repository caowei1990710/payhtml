(function () {
  'use strict';
// <input id="hello" style="width: 150px" ng-model="deposit.select.startTime" class="laydate-icon" ng-click="deposit.chooseDate('hello')">
  angular
    .module('pmsJs')
    .directive('selectList', function ($compile, device, $rootScope, $timeout, $filter) {
      return {
        scope: {
          data: '=ngModel',
          name: '@',
          type: '@',
          dispaly: '@',
          id: '@',
          canselect: '@',
          selectid: '@',
          change: '=',
          bewidth: '@'
        },
        restrict: 'AE',
        link: function (scope, element, attr) {
          var ele = '<select ng-model = "data"'
          var delay = 0;
          if (!$rootScope[scope.name]) {
            delay = 2000;
          }
          if (!scope.id) {
            scope.id = 'id';
          }
          if (scope.selectid) {
            scope.$on('selectdisable', function (e, data, type) {
              console.log(data);
              $('#' + data.id).attr('disabled', data.result)
              //e.currentScope.element.eq(0).attr('disable',data.result);
            });
          }
          if (scope.canselect == 1) {
            var ele = '<select ng-model = "data" disabled'
          } else if (scope.selectid) {
            var ele = '<select ng-model = "data" id="' + scope.selectid + '"'
          }
          if (scope.bewidth)
            ele += ' style="width:' + scope.bewidth + 'px"';
          ele += '>';
          scope.element = element;
          scope.$watch('canselect', function (newValue, oldValue, scope) {
            if (angular.isUndefined(newValue))
              return;
            if (!angular.isUndefined(scope.change))
              scope.change();
          })
          scope.$watch('data', function (newValue, oldValue, scope) {
            if (angular.isUndefined(newValue))
              return;
            if (!angular.isUndefined(scope.change))
              scope.change();
          })
          if (!scope.dispaly)
            scope.dispaly = 'name';
          $timeout(function () {
            if ($rootScope[scope.name]) {
              if (scope.type == 1)
                ele += '<option></option>';
              else if (!scope.data)
                scope.data = $rootScope[scope.name][0][scope.id] + ""
              if ($rootScope[scope.name][0][scope.id] == "-1")
                console.log("scope.data:" + scope.data);
              for (var i = 0; i < $rootScope[scope.name].length; i++) {
                ele += '<option value="' + $rootScope[scope.name][i][scope.id] + '">' + $filter('itemTolish')($rootScope[scope.name][i][scope.dispaly]) + '</option>';
              }
            }
            ele += '</select>';
            element.html(ele);
            $compile(element.contents())(scope);

          }, delay);
          //scope.$watch('data', function (newValue, oldValue, scope) {
          //  if (newValue)
          //    scope.data = newValue;
          //  else
          //    scope.data = undefined;
          //})
          //scope.$watch('newdata', function (newValue, oldValue, scope) {
          //  if (newValue)
          //    scope.data = newValue;
          //  else
          //    scope.data = undefined;
          //})
        }
      }
    })
    .directive('clickButton', function ($compile, $rootScope) {
      return {
        scope: {
          href: "@",
          click: "=",
          data: "=",
          value: "@",
          index: "@",
          clickvalue: "="
        },
        restrict: 'AE',
        link: function (scope, element, attr) {

          if ($rootScope.lagconfig)
            var ele = '<button style="margin-left:5px" class="departmentbutton btn btn-primary" ng-click="create()"';
          if (scope.href)
            ele += 'href="#' + scope.href + '" target="_self" role="button" data-toggle="modal" data-original-title=""';
          ele += 'class="btn btn-primary">';
          if ($rootScope.lagconfig)
            ele += '<icon-title value="' + scope.value + '" default = "1" select="user.roleindex == 0"  dewidth="155"></icon-title>'
          ele += '</button>';
          element.html(ele);
          scope.create = function (e) {
            if (angular.isFunction(scope.click))
              if (!angular.isUndefined(scope.clickvalue))
                scope.click(-1, scope.clickvalue)
              else
                scope.click()
          }
          $compile(element.contents())(scope);
        }
      }
    })
    .directive('createButton', function ($compile, $rootScope) {
      return {
        scope: {
          href: "@",
          click: "=",
          data: "="
        },
        restrict: 'AE',
        link: function (scope, element, attr) {
          var ele = ' <button class="departmentbutton btn btn-primary" ng-click="create()" href="#' + scope.href + '" target="_self"role="button" data-toggle="modal" data-original-title=""class="btn btn-primary">' +
            $rootScope.lagconfig['创建'] + '</button>';
          element.html(ele);
          scope.create = function () {
            if (angular.isFunction(scope.click));
            scope.click()
          }
          $compile(element.contents())(scope);
        }
      }

    })
    .directive('deleteButton', function ($compile, $rootScope) {
      return {
        scope: {
          href: "@",
          click: "=",
          data: "="
        },
        restrict: 'AE',
        link: function (scope, element, attr) {
          var ele = ' <button class="departmentbutton btn btn-primary" ng-click="create()" href="#' + scope.href + '" target="_self"role="button" ng-disabled="!data" data-toggle="modal" data-original-title=""class="btn btn-primary">' +
            $rootScope.lagconfig['删除'] + '</button>';
          element.html(ele);
          scope.create = function () {
            if (angular.isFunction(scope.click));
            scope.click()
          }
          $compile(element.contents())(scope);
        }
      }

    })
    .directive('updateButton', function ($compile, $rootScope) {
      return {
        scope: {
          href: "@",
          click: "=",
          data: "="
        },
        restrict: 'AE',
        link: function (scope, element, attr) {
          var ele = ' <button class="departmentbutton btn btn-primary" ng-click="create()" href="#' + scope.href + '" target="_self"role="button" ng-disabled="!data" data-toggle="modal" data-original-title=""class="btn btn-primary">' +
            $rootScope.lagconfig['更新'] + '</button>';
          element.html(ele);
          scope.create = function () {
            if (angular.isFunction(scope.click));
            scope.click()
          }
          $compile(element.contents())(scope);
        }
      }
    })
    .directive('textCopye', function ($timeout) {
      return {
        scope: {
          selectid: "@",
          selecttext: "="
        },
        restrict: 'A',
        link: function (scope, element, attr) {
          var element = element;
          element.id = scope.selectid;
          element.after("<div class='textcopy'><div><span id='" + scope.selectid + "_container'><button id='" + scope.selectid + "_button'><b>复制</b></button></span></div></div>");
          //window.clip = null;
          //$("body").bind('click', function () {
          //  $("body").trigger('defaultbg');
          //})
          scope.$on('onFinishRender', function (e) {

          });

          $timeout(function () {
            scope.clip = new ZeroClipboard.Client();
            scope.clip.setHandCursor(true);
            scope.clip.addEventListener('mouseOver', function (client) {
              // update the text on mouse over
              scope.clip.setText(scope.selecttext);
            });

            scope.clip.addEventListener('complete', function (client, text) {
              //debugstr("Copied text to clipboard: " + text );
              $('#' + client.domElement.id).parent().parent().parent().prev().css('color', 'red')
              //alert("该地址已经复制，你可以使用Ctrl+V 粘贴。");
            });
            scope.clip.glue(scope.selectid + '_button', scope.selectid + '_container');
          }, 1000)
        }
      }
    })
    .directive('dateSelect', function ($compile) {
      return {
        scope: {
          data: '=ngModel',
          selectid: '@',
          model: '@',
          init: '@',
          bewidth: '@'
        },
        restrict: 'AE',
        link: function (scope, element, attr) {
          var ele = '<input type="text" style="width:';
          if (!scope.bewidth)
            ele += '136';
          else
            ele += scope.bewidth;
          ele += 'px" id="' + scope.selectid + '" ng-model= "data" class="laydate-icon" ng-click="chooseDate()">'
          element.html(ele);
          $compile(element.contents())(scope);
          if (scope.init == 1) {
            var date = new Date();
            var year = date.getFullYear(),
              mon = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
              day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
              nowDate = year + "-" + mon + "-" + day;
            scope.data = new Date((new Date(nowDate)).getTime()).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
          } else if (scope.init == 2) {
            var date = new Date();
            var year = date.getFullYear(),
              mon = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
              day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
              nowDate = year + "-" + mon + "-" + day;
            //new Date((new Date(value)).getTime() + 8 * 3600 * 1000)
            scope.data = new Date((new Date(nowDate)).getTime() + 48 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
          } else {
            var date = new Date();
            // var year = date.getFullYear(),
            //   mon = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
            //   day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
            //   nowDate = year + "-" + mon + "-" + day;
            //new Date((new Date(value)).getTime() + 8 * 3600 * 1000)
            scope.data = new Date((new Date()).getTime() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
          }
          //scope.setTime = function(){
          //  console.log("时间改变了")
          //  scope.data = $('#'+scope.selectid).val();
          //}
          //if ($('#laydate_clear')[0]) {
          //
          //}
          scope.chooseDate = function () {
            laydate({
              elem: '#' + scope.selectid, format: 'YYYY-MM-DD hh:mm:ss',
              min: '2009-06-16 23:59:59', //设定最小日期为当前日期
              max: '2099-06-16 23:59:59', //最大日期
              istime: true,
              istoday: false,
              choose: function (datas) {
                scope.data = datas;
                scope.$apply();
              }
            });
            $('#laydate_clear').bind('click', function () {
              scope.data = undefined;
            })
          }
        }
      }
    })
    .directive('timeClock', function ($compile, $timeout) {
      return {
        scope: {
          begintime: '=',
          // minute: '@'
        },
        restrict: 'AE',
        link: function (scope, element, attr) {
          // scope.time = parseInt(scope.minute) * 60;
          scope.timepSub = '05:00';
          var ele = '<span style="color: red">{{timepSub}}</span>';
          element.html(ele);
          $compile(element.contents())(scope);
          scope.Subtract = function () {
            scope.timepSub = '';
            var second = 300 - parseInt((new Date()).getTime() / 1000 - (new Date(scope.begintime).getTime() / 1000));
            if (second < 0) {
              second *= -1;
              scope.timepSub += "-";
            }
            if (Math.abs(second) / 60 > 59) {
              scope.timepSub = '超時';
              return;
            } else {
              scope.timepSub += (second / 60 < 10) ? '0' + parseInt(second / 60) : parseInt(second / 60);
              scope.timepSub += ":";
              scope.timepSub += (second % 60 < 10) ? '0' + parseInt(second % 60) : parseInt(second % 60);
              $timeout(function () {
                scope.Subtract()
              }, 1000);
            }
          }
          scope.Subtract();
        }
      }
    })
    .directive('iconTitle', function ($compile, $rootScope) {
      return {
        scope: {
          index: '@',
          value: '@',
          select: '=',
          default: '@',
          dewidth: '@',
          innervalue: '='
        },
        restrict: 'AE',
        link: function (scope, element, attr) {
          var length;
          var ele = '<div class="ng-binding" style="position: relative;line-height:50px;width: 60%;padding-left: 20%;height: 50px"> <i style="left: ';
          if (scope.value) {
            length = scope.value.length;
            var value = scope.value;
          } else {
            length = scope.innervalue.length;
            var value = scope.innervalue;
          }
          if (value == '账号管理' || value == '银行类型')
            scope.index = 3;
          else if (value == '转账提醒')
            scope.index = 4;
          else if (value == '商户号')
            scope.index = 5;
          else if (value == '手工收款' || value == '手工付款' || value == '手动匹配')
            scope.index = 6;
          else if (value == '收款明细' || value == '补录流水')
            scope.index = 7;
          else if (value == '自动付款' || value == '报表统计')
            scope.index = 8;
          else if (value == '转账任务' || value == '收付款设置' || value == '调整余额')
            scope.index = 9;
          else if (value == '付款详情')
            scope.index = 10;
          else if (value == '自动匹配')
            scope.index = 11;
          else if (value == '支付补单')
            scope.index = 12;
          else if (value == '商户类型')
            scope.index = 13;
          else if (value == '删除' || value == '取消')
            scope.index = 14;
          else if (value == '创建' || value == '确定' || value == '签入' || value == '签出')
            scope.index = 15;
          else if (value == '更新' || value == '同步')
            scope.index = 16;
          ele += (50 - (170 - scope.dewidth) * 2 - (length - 2) * 7);
          ele += 'px;top: 9px;background: url(assets/images/icon.png) no-repeat;width: 34px;height: 34px;background-size:1700% 200%;position: absolute;background-position: -' + 34 * scope.index + 'px -' + 34 * scope.default + 'px;display: none;"></i>';
          if ($rootScope.lagconfig) {
            if (scope.value)
              ele += $rootScope.lagconfig[scope.value];
            else
              ele += $rootScope.lagconfig[scope.innervalue];
          }

          ele += '</div>';
          element.html(ele);
          scope.element = element;
          scope.$watch('select', function (newValue, oldValue, scope) {
            if (angular.isUndefined(newValue))
              return;
            if (newValue) {
              scope.element.eq(0).find('i').eq(0).css('background-position-y', '-34px');
              scope.element.eq(0).css('color', '#288BE0');
            }
            else {
              scope.element.eq(0).find('i').eq(0).css('background-position-y', '0px');
              scope.element.eq(0).css('color', '#ffffff');
            }

          });
          $compile(element.contents())(scope);
        }
      }
    })
    .directive('typeStyle', function ($compile, $filter, $rootScope) {
      return {
        scope: {
          value: "=",
          list: "@"
        },
        restrict: 'AEC',
        link: function (scope, element, attr) {
          //scope.value.nameTovalue();bankCardStatus
          //{name: "执行中", id: "PENDING"},
          //{name: "自动审核", id: "SUBMITTED"},
          //{name: "取消", id: "CANCEL"},
          //{name: "审计", id: "AUDITED"},
          //{name: "已完成", id: "EXECUTED"}
          scope.element = element;
          var listenr = scope.$watch('value', function (newValue, oldValue, scope) {
            if (angular.isUndefined(newValue)) {
              return;
            }
            scope.content = $filter('nameTovalue')(newValue + "", 'id', 'name', $rootScope[scope.list]);
            var ele;
            switch (newValue) {
              case 'CANCEL':
              case 'DEPRECATED':
              case 'LOCK':
              // case 'DISABLED':
              case 1:
                ele = '<span class="badge badge-warning">{{content  | itemTolish}}</span>';
                break;
              case 'NORMAL':
              case 'Normal':
              case 'NOMATCHING':
              case 'PENDING':
              case 'SUBMITTED':
              case 'AUDITED':
              case 'ENABLED':
              case 'BEGINING':
              case 0:
                ele = '<span class="badge badge-success">{{content  | itemTolish}}</span>';
                break;
              case 'Disable':
              case 'EXECUTED':
              // case 'DISABLED':
              case 'WITHROWING':
              case 2:
                ele = '<span class="badge badge-important">{{content  | itemTolish}}</span>';
                break;
              default:
                ele = '<span class="badge badge-info">{{content  | itemTolish}}</span>';
                break;
            }

            scope.element.html(ele);
            $compile(scope.element.contents())(scope);
          });
          //var classArray = attr.class + " badge-info";
          //$(this).attr('class', classArray);
        }
      }
    })
    .directive('incluChange', function ($compile) {
      return {
        scope: {
          click: "=",
          data: "=",
          showclass: "@",
          index: '=ngModel'
        },
        restrict: "AE",
        link: function (scope, element, attr) {
          var ele = "";
          if (angular.isUndefined(scope.index)) {
            scope.index = 0;
          }
          //scope.index = 0;
          ele += '<ul id="title">' +
            '<li ng-repeat="item in data track by $index" ng-click="changeindex($index)">' +
            '<a ng-class={true:"{{showclass}}hover",false:"{{showclass}}"}[index==$index]>' +
            '{{item.content}}</a></li></ul>';
          element.html(ele);
          $compile(element.contents())(scope);
          scope.changeindex = function (e) {
            //scope.index = e;
            if (angular.isFunction(scope.click)) {
              scope.click(e);
            }
          }
        }
      }
    })
    .directive('alertPovper', function (finditem, $rootScope) {
      return {
        scope: {
          html: "=",
          type: "@"
        },
        restrict: "AE",
        link: function (scope, element, attr) {
          element.each(function () {
            var element = $(this);
            //var txt = element.html();
            scope.getHtml = function (id) {
              switch (scope.type) {
                case "merchat":
                  var item = finditem.getById('displayName', id, $rootScope.limitlist);
                  if (!item) {
                    return '';
                  }
                  return '<div><label>名称:' + item.displayName + '</label><label>日总限额:' + item.dayTransaction + '</label><label>玩家单日限额:' + item.transactionForPlayerOneDay + '</label><label>单笔限额:' + item.limitPerTransaction + '</label></div>';
                  break;
                case "accountManage":
                  var item = finditem.getById('id', id, $rootScope.merchantlists);
                  if (!item) {
                    return '';
                  }
                  return '<div><label>网关地址:' + item.merchantAddress + '</label><label>商户号:' + item.merchantNo + '</label><label>平台:' + item.platform + '</label></div>';
                  break;
                default:
                  break;
              }

            }
            element.popover({
              trigger: 'manual',
              placement: 'top', //top, bottom, left or right
              title: '',
              html: 'true',
              content: scope.getHtml(scope.html),
            }).on("click", function (event, ele) {
              var _this = this;
              $(this).popover("show");
              event.stopPropagation();
              //$(this).siblings(".popover").on("mouseleave", function () {
              //  $(_this).popover('hide');
              //});
            }).on("mouseleave", function () {
              var _this = this;
              setTimeout(function () {
                if (!$(".popover:hover").length) {
                  $(_this).popover("hide")
                }
              }, 100);
            });
          });

        }
      }
    })
    .directive('moveChange', function ($timeout, $log, $filter) {
      return {
        scope: {
          data: "=",
          list: "=ngModel",
          color: "@"
        },
        restrict: "AE",
        link: function (scope, element, attr) {
          scope.element = element;

          scope.$watch('data', function (newValue, oldValue, scope) {
            if (angular.isUndefined(newValue)) {
              return;
            }
            if (!scope.beginTimer) {
              scope.beginTimer = (new Date()).getTime();

            } else {
              scope.endTimer = (new Date()).getTime();
              if (scope.endTimer - scope.beginTimer < 1000) {
                console.log('时间过短');
                return;
              }
              scope.beginTimer = (new Date()).getTime();
            }
            //console.log("data:" + newValue);
            var alltop = scope.element.offset().top;
            var allheight = scope.element.height();
            var eachheight = allheight / scope.element.children().length;
            for (var i = 0; i < scope.element.children().length; i++) {
              scope.element.children().eq(i).css('transition', "all 0.3s ease-in 0.3s");
              scope.element.children().eq(i).css('background-color', "");
              for (var j = 0; j < scope.element.children().children().length; j++) {
                scope.element.children().eq(i).children().eq(j).css('color', '');
              }
            }
            //for(var i = 0 ; i < scope.element.children().length ; i++){
            //scope.element.children().eq(newValue).css('background-color', "#457e88");
            scope.element.children().eq(newValue).css('background-color', scope.color);
            //scope.element.children().eq(newValue).css('z-index', '20');
            for (var i = 0; i < scope.element.children().children().length; i++) {
              scope.element.children().eq(newValue).children().eq(i).css('color', 'white');
            }
            //if(newValue < 3){
            //  scope.element.children().eq(newValue).css("transition", "all 0.3s ease-in 0.3s");
            //}
            scope.element.children().eq(newValue).css("transform", "matrix(1, 0, 0, 1, 0, -" + eachheight * newValue + ")");//transition: linear 2s;
            $timeout(function () {
              for (var i = 0; i < newValue; i++) {
                scope.element.children().eq(i).css('transition', "all 0.5s ease-in 0.5s");
                scope.element.children().eq(i).css("transform", "matrix(1, 0, 0, 1, 0, " + eachheight + ")");//transition: linear 2s;
              }
              $timeout(function () {
                var desty = scope.list[newValue];
                scope.list.splice(newValue, 1);
                //scope.element.children().eq(newValue).css('background-color', "");
                //scope.element.children().eq(0).css('background-color', "#457e88");
                //scope.list.push(desty);
                scope.list.splice(0, 0, desty)
                for (var i = 0; i < newValue + 1; i++) {
                  //scope.element.children().eq(newValue).css('z-index', '');
                  scope.element.children().eq(i).css("transition", "all 0s ease-in 0s");
                  scope.element.children().eq(i).css("transform", "matrix(1, 0, 0, 1, 0, 0)");//transition: linear 2s;
                  scope.data = undefined;
                }
              }, 1000);
              //$timeout(function(){
              //  //scope.index = 0;
              //},1000)
            }, 500)
            //}
          });
          //$log.error('index:'+scope.click);
          //scope.element = element;
          //scope.$watch('data', function (newValue, oldValue, scope) {
          //if (angular.isUndefined(newValue)&& newValue.length==0) {
          //  return;
          //}
          //$timeout(function(){
          //  var ele = angular.copy(element);
          //  if ($('#table_copy').attr('id'))
          //    element.parent().children()[2].remove()
          //  ele.attr('id', 'table_copy');
          //  ele.css('position', 'absolute');
          //  ele.css('top', '0px');
          //  element.parent().append(ele);
          //  for (var i = 0; i < ele.find('tr').length; i++) {
          //    ele.find('tr')[i].click = function () {
          //      alert('0');
          //    }
          //  }
          //},1000)
          //})

        }
      }
    })
    .directive('listChange', function ($compile, $timeout) {
      return {
        scope: {
          data: "=ngModel",
          model: '='
        },
        restrict: 'AE',
        link: function (scope, element, attr) {
          var elem, elem_copy;
          var star = false;
          var keyindex = 0;
          var temp = '<div style="position: relative"><ul id="change" style="display: inline-block;padding-left: 0px">';
          temp += '<li class="accountcontent" style="padding: 0px 8%;text-align: center"><label class="accountcontentli textwhite">游戏大厅</label  class="accountcontentli textwhite"><label style="width: 33%;text-align: center">游戏状态</label><label  class="accountcontentli textwhite" style="width: 33%;text-align: center">游戏额度</label></li>';
          temp += '<li ng-repeat="item in model track by $index" id = "li_{{$index}}" style="padding: 0 8%;" class="accountcontent" ng-click="click($index,$event)"><label class="accountcontentli textyellow">{{item.name}}</label><label class="accountcontentli textyellow">{{item.type}}</label><label class="accountcontentli textyellow">{{item.money}}</label></li>';
          temp += '</ul> <ul id="change_copy" style="position:absolute;top: 0px;left:0px;display: inline-block;padding-left: 0px;visibility: hidden">';
          temp += '<li class="accountcontent" style="visibility: hidden"><label class="accountcontentli textwhite">游戏大厅</label><label  class="accountcontentli textwhite">游戏状态</label><label  class="accountcontentli textwhite">游戏额度</label></li>';
          temp += '<li ng-repeat="item in model track by $index" id = "sli_{{$index}}" class="accountcontent" style="visibility: hidden;background: #f4a214;padding: 0 8%" ng-click="click($index,$event)"><label class="accountcontentli" style="color: #e4dfdf">{{item.name}}</label><label class="accountcontentli" style="color: #e4dfdf">{{item.type}}</label><label class="accountcontentli" style="color: #e4dfdf">{{item.money}}</label></li>';
          //});
          temp += '</ul>';
          element.html(temp);
          $compile(element.contents())(scope);
          scope.data = scope.model[keyindex];
          $timeout(function () {
            elem = angular.element('#change li:eq(1)');
            elem_copy = angular.element('#change_copy li:eq(1)');
            elem_copy.css('visibility', 'visible');
            elem.css('visibility', 'hidden');
          }, 500);
          var listener = scope.$watch('data.money', function (newValue, oldValue, scope) {
            if (angular.isUndefined(newValue)) {
              return;
            }
            if (parseInt(newValue) > 0) {
              angular.element('#acountplanor').css('visibility', 'visible');
              angular.element('#accountout >div').animate({'margin-top': '-90px'}, 1000)
              //angular.element('#accountout').animate({"background-position": '0px -90px'}, 1000);
            }
            else {
              angular.element('#acountplanor').css('visibility', 'hidden');
              //angular.element('#acountpla').css('visibility', 'hidden');
              angular.element('#accountout >div').animate({'margin-top': '0px'}, 1000)
              //angular.element('#accountout').animate({"background-position": '0px 0px'}, 1000);
            }
          });
          element.on('$destroy', function () {
            if (listener && angular.isFunction(listener)) {
              listener();
            }
            ;
          });
          scope.click = function (e, q) {
            if (star) {
              return;
            } else {
              star = true;
            }
            keyindex = e;
            scope.data = scope.model[e];
            var id = q.currentTarget.id;
            var eles = angular.element("#change");
            var eles_copy = angular.element("#change_copy");
            eles_copy.css('visibility', 'visible');
            angular.element('#s' + id).css('visibility', 'visible');
            elem_copy.css('visibility', 'hidden');
            elem.css('visibility', 'visible');
            $timeout(function () {
              scope.scorll(e, id, eles);
              scope.scorll(e, "s" + id, eles_copy);
            }, 100)
          }
          scope.scorll = function (e, id, eles) {
            var newlist = [];
            var topdefa = eles.offset().top;
            var ele = angular.element("#" + id);
            var eachtop = parseInt(eles.height() / eles.children().size());
            var top = ele.offset().top;
            e = (top - topdefa) / eachtop;
            for (var i = 1; i < eles.children().size(); i++) {
              var element = angular.element("#" + eles.children().get(i).id);
              if (element.offset().top < ele.offset().top) {
                element.css("transform").indexOf(',');
                newlist.push(element);
              }
            }
            if (ele.css("transform").lastIndexOf(',') != -1) {
              var length = (parseInt(ele.css("transform").substring(ele.css("transform").lastIndexOf(',') + 1, ele.css("transform").lastIndexOf(')'))) - (e.toFixed(0) - 1) * eachtop);
              ele.css("transform", "matrix(1, 0, 0, 1, 0, " + length + ")");
            } else {
              ele.css("transform", "matrix(1, 0, 0, 1, 0, -" + (e.toFixed(0) - 1) * eachtop + ")");
            }
            $timeout(function () {
              //ele.css(" background","#59271b");
              angular.forEach(newlist, function (item, key) {
                if (item.css("transform").lastIndexOf(',') != -1) {
                  var length = (parseInt(item.css("transform").substring(item.css("transform").lastIndexOf(',') + 1, item.css("transform").lastIndexOf(')'))) + eachtop);
                  item.css("transform", "matrix(1, 0, 0, 1, 0, " + length + ")");
                } else {
                  item.css("transform", "matrix(1, 0, 0, 1, 0, " + eachtop + ")");
                }
                angular.element("#change_copy").css('visibility', 'hidden');
                if (id.indexOf("s") == -1) {
                  elem = ele;
                } else {
                  elem_copy = ele;
                }
              });
              $timeout(function () {
                star = false;
              }, 1000)
            }, 200)
          }

        }
      }
    })
    .directive('onFinishRender', function ($timeout) {
      return {
        restrict: 'A',
        link: function (scope, element, attr) {
          if (scope.$last === true) {
            $timeout(function () {
              scope.$emit('onFinishRender');
            });
          }
        }
      };
    })
    .directive('selectRole', function ($compile, roleHasPermission, $rootScope, $state) {
      return {
        scope: {
          model: '=ngModel',
          typeid: '='
        },
        restrict: "AE",
        link: function (scope, element, attr) {
          scope.data = $rootScope.permissionlist;
          scope.$watch('typeid', function (newValue, oldValue, scope) {
            if (angular.isUndefined(newValue))
              return;
            roleHasPermission.get(newValue);//roleHasPermission.data

          });
          scope.clickindex = function (e) {
            scope.index = e;
            scope.roleitem = scope.data[e].children;
          }
          roleHasPermission.on('get', function (data) {
            //if ($state.current.name =="login") {
            //  if ($rootScope.gotomain) {
            //    $state.go('home.main');
            //  }
            //} else {
            var newValue = data.items;
            scope.rolelist = angular.copy(scope.data);
            if (!newValue)
              return;
            for (var i = 0; i < newValue.length; i++) {
              if (newValue[i].level == 1) {
                for (var j = 0; j < scope.rolelist.length; j++) {
                  //scope.rolelist[j].check = false;
                  if (newValue[i].id == scope.rolelist[j].id)
                    scope.rolelist[j].check = true;
                }
              }
              if (newValue[i].level == 2) {
                for (var j = 0; j < scope.rolelist.length; j++) {
                  for (var k = 0; k < scope.rolelist[j].children.length; k++) {
                    //scope.rolelist[j].children[k].check = false;
                    if (newValue[i].id == scope.rolelist[j].children[k].id)
                      scope.rolelist[j].children[k].check = true;
                  }
                }
              }
            }
            scope.clickindex(0);
            //}
          });
          // ng-class="{defalutcolor:user.index== $index}" ng-class={true:"defalutcolor",false:"whitebg"}[index == $index]
          var temp =
            '<div style="width:657px;height:394px;;position: relative;float: right;background: #EAF7FF;margin: 20px 17px;" on-finish-render><div style="margin: 50px;text-align: left;">' +
            '<div style="line-height: 40px" ng-repeat="item in roleitem">' +
            '<input type="checkbox"' +
            'id="{{item.parentId}}_{{item.id}}" ng-change="changother(item.parentId)" ng-model="rolelist[index].children[$index].check"><span>{{item.name | itemTolish}}</span></div></div>' +
            '<click-button style="position: absolute;right:20px;bottom:20px" click="updateRleable" value="确定"></click-button>' +
            //'<button type="submit" ng-click="updateRleable()" style="position: absolute;right: 20px;bottom: 50px;"' +
            //'role="button" data-toggle="modal" data-original-title="" ' +
            //'class="btn btn-primary departmentbutton">{{$root.lagconfig["确定"]}}</button>' +
            '</div>' + '<ul style="padding-top: 15px;width: 143px">' +
            '<li class="textcenter useroleli"' +
            'ng-repeat="item in data" style="line-height: 40px" ng-click="clickindex($index)" ng-class="{userolelihover:index == $index}">' +
            '<input class="no-margin" type="checkbox" id="{{item.parentId}}_{{item.id}}" ng-model="rolelist[$index].check" disabled><span> {{item.name | itemTolish}}</span></li> </ul>';

          //scope.$on('onFinishRender', function (e) {
          //  scope.setRole(scope.model);
          //});
          //scope.setRole = function (e) {
          //  for (var i = 0; i < e.length; i++) {
          //    if(e[i].parentId)
          //      $('#' + e[i].parentId + "_" + e[i].id).attr("checked", 'true')
          //    else
          //      $('#_'+ e[i].id).attr("checked", 'true')
          //  }
          //};
          scope.changother = function (e) {
            var valule = false;
            for (var i = 0; i < scope.rolelist[scope.index].children.length; i++) {
              //$('#_' + e).attr("checked", 'false');
              if (scope.rolelist[scope.index].children[i].check) {
                valule = true;
                break;
              }
            }
            scope.rolelist[scope.index].check = valule;
            //$('#_' + e).attr("checked", valule);
          }
          //scope.index;
          //for(var i = 0; i < scope.roleitem.length; i++){
          //  //if($('#_'+e))
          //}
          //var ele = e.target;

          //console.log("唤醒别的");
          scope.updateRleable = function () {
            //console.log(scope.rolelist);
            var destory = [];
            for (var i = 0; i < scope.rolelist.length; i++) {
              if (scope.rolelist[i].check) {
                destory.push(scope.rolelist[i].id);
              }
              for (var j = 0; j < scope.rolelist[i].children.length; j++) {
                if (scope.rolelist[i].children[j].check)
                  destory.push(scope.rolelist[i].children[j].id);
              }
            }
            roleHasPermission.add(scope.typeid, destory);
          };
          scope.$watch('model', function (newValue, oldValue, scope) {
            if (angular.isUndefined(newValue))
              return;
            //for (var i = 0; i < newValue.length; i++) {
            //  for (var j = 0; j < scope.rolelist.length; j++) {
            //
            //    for(var k = 0; k < scope.rolelist[j].children.length; k++){
            //
            //    }
            //    scope.rolelist[j].check = true;
            //  }
            //}
            //for(var i = 0 ; i < scope.rolelist.length ; j++){
            //  scope.rolelist[i].check = false;
            //  for(var j = 0; j < scope.rolelist[i].children.length;j++){
            //    scope.rolelist[i].children[j].check = false;
            //  }
            //}

            //scope.setRole(newValue);
            //for(var i = 0; i < e.length ;i++){
            //  $('#'+ e.parentId+"_"+ e.id).attr("checked",'true')
            //}
          });
          element.html(temp);
          $compile(element.contents())(scope);
        }
      }
    })
    .directive('deparatMent', function ($rootScope, $compile, $timeout, user) {
      return {
        scope: {
          data: "=",
          model: "=ngModel"
        },
        restrict: 'AEC',
        link: function (scope, element, attr, ctrls) {
          scope.element = element;
          console.log('ctrls:' + ctrls);
          var listenr = scope.$watch('data', function (newValue, oldValue, scope) {
            if (angular.isUndefined(newValue)) {
              return;
            }
            var times = 0;
            var changsize = 0;
            scope.numbers = [];
            element.attr('id', 'li_' + changsize);
            var content = '<div style="height: auto;width: 100%;"><div class="department">';
            scope.getContent = function (data) {
              if (data && data.length == 0) {
                return;
              }
              //content +='<div id="collapse_' + changsize+'" class="accordion no-margin padding-left: 20px;">';
              content += '<ul id="collapse_' + changsize + '">';
              //content += '<ul>';
              changsize++;
              times++;
              for (var i = 0; i < data.length; i++) {
                //element.append();
                //content += '<li>'+data[i].name ng-class="{defalutcolor:' + data[i].id + '==numbers[0]}"  style="padding: 10px" ;
                content += '<li ng-click="scroll($event)" parent="' + data[i].id + '_' + data[i].parentId + '" style="line-height: 60px;text-align: left" id= "' + changsize + '"><div style="padding-left: ' + times * 20 + 'px" id="div_' + changsize + '" ng-class="{departmentlihover:' + data[i].id + '==numbers[0]}">';
                if (data[i].children && data[i].children.length > 0)
                  content += '<img ng-click="extend($event)" src="assets/images/plus.png" style="width: 22px;padding-right: 10px">';
                else
                  content += '<img style="width: 32px;">';
                content += data[i].name;
                content += '</div>';
                scope.getContent(data[i].children);
                if (i == data.length - 1)
                  times--;
                content += "</li>";
              }
              content += '</ul>'

              //console.log("changsize:"+changsize);
              //element.append(content,$('#li_'+changsize));
              //scope.getContent(data.children);
            }
            scope.getNumbers = function (e) {
              if (e)
                scope.numbers.push(e.getAttribute('parent').split('_')[0]);
              if (!e || !e.children[1]) {
                return;
              }
              for (var i = 0; i < e.children[1].children.length; i++) {
                if (e.children[1].children)
                  scope.getNumbers(e.children[1].children[i]);
              }
              scope.getNumbers()
            };
            //scope.$watch('numbers', function (newValue, oldValue, scope){})
            scope.getContent(newValue);
            content += '</div>';
            scope.extend = function (e) {
              var ele = e.target.parentElement;
              ele = ele.parentElement;
              if (ele.children.length > 0) {
                e.stopPropagation();
                if ($('#collapse_' + ele.id).css('display') == 'block') {
                  ele.children[0].children[0].src = "assets/images/add.png";
                } else {
                  ele.children[0].children[0].src = "assets/images/plus.png";
                }
                $('#collapse_' + ele.id).slideToggle("fast");
                //}
              }
            }
            scope.array = function boolTest(a, b) {
              if (a.length != b.length) return false;
              for (var i = 0; i < a.length; i++) {
                if (a[i] != b[i]) return false;
              }
              return true;
            }
            scope.scroll = function (e) {
              var ele = e.target;
              e.stopPropagation();
              if (!ele.getAttribute('parent'))
                ele = ele.parentElement;
              var number = ele.getAttribute('parent').split('_');
              //for(var i = 0; i < ele.parentElement.children.length ; i++){
              //  ele.parentElement.children[i].style.background = '';
              //}
              //ele.style.background='#457e88';
              //for(var i = 0 ; i < number.length;i++){
              var oldnumbers = scope.numbers;
              scope.numbers = [];
              scope.getNumbers(ele);
              if (number[1] == "undefined")
                number[1] = undefined
              scope.model = {id: number[0], parentId: undefined, hasChild: ele.children.length, numbers: scope.numbers};
              if (!scope.array(scope.numbers, oldnumbers))
                user.queryUser({departmentId: scope.numbers}, 1, 500);
            }
            scope.element.html(content);
            $compile(scope.element.contents())(scope);
            //$timeout(function () {
            //  for (var i = 0; i < $('#collapse_0').eq('0').children().length; i++) {
            //    $('#collapse_0').eq('0').children().eq(i).eq(0).trigger('click');
            //  }
            //})
          })
        }
      }
    })
    .directive('changListitem', function ($compile, $filter) {
      return {
        scope: {
          data: "=",
          model: "=ngModel",
          type: "@",
          ids: "@",
          empty: "@",
          outside: "@"
        },
        restrict: 'AEC',
        link: function (scope, element, attr) {
          scope.index = 0;
          scope.newdata = $filter('valueToitem')(scope.data, scope.type, "");
          scope.changindex = function (e, event) {
            scope.index = e;
            $("#" + scope.ids).next().css('visibility', 'hidden');
            $("#" + scope.ids).val(scope.newdata[scope.index][scope.type]);
            event.stopPropagation();
            scope.model = scope.newdata[scope.index][scope.type];
            //console.log("index:"+scope.index);
          }
          scope.$watch('data', function (newValue, oldValue, scope) {
            if (angular.isUndefined(newValue))
              return;
            scope.newdata = newValue;
          })
          scope.$watch('model', function (newValue, oldValue, scope) {
            if (angular.isUndefined(newValue)) {
              return;
            }
            for (var i = 0; i < scope.data.length; i++) {
              if (scope.data[i].id == newValue) {
                scope.value = scope.data[i][scope.type];
                scope.index = i;
              }
            }
          })
          var content = "<input style='width: 200px' ng-model='value' id=" + scope.ids + " type='text'><div style='visibility: hidden;position: absolute;border: 1px solid #666666;text-align: center;vertical-align: middle'><ul style='max-height: 100px;overflow: auto;background: white;'><li ng-repeat='item in newdata' style='height: 30px' ng-click='changindex($index,$event)' ng-class='{colorhover:index ==$index}'>{{item[type]}}</li></ul>";
          content += "<div  style='background: #a6548e;display: none'><button ng-click='sure($event)'>确定</button><button ng-click='cancel($event)'>取消</button></div></div>"
          element.html(content);
          $compile(element.contents())(scope);
          $("#" + scope.ids).bind('click', function (e) {
            $("#" + scope.ids).next().css('width', $("#" + scope.ids).width() + 'px');
            //if(scope.outside == 1)
            $("#" + scope.ids).next().offset({
              left: $("#" + scope.ids).offset().left,
              top: $("#" + scope.ids).offset().top + 30
            });
            //$("#" + scope.ids).next().offset.left = $("#" + scope.ids).offset().left;
            //$("#" + scope.ids).next().offset.top = $("#" + scope.ids).offset().top+50;
            $("#" + scope.ids).next().css('visibility', 'visible');
            e.stopPropagation();
          });
          $("body").bind('defaultbg', function (event) {
            if ($("#" + scope.ids).next().css('visibility') == "hidden")
              return;
            $("#" + scope.ids).next().css('visibility', 'hidden');
            if (scope.empty == 0) {
              $("#" + scope.ids).val("");
              scope.model = "";
            }
          });
          element.bind('input propertychange', function () {
            //console.log('改变:' + $("#" + scope.ids).val());
            scope.newdata = $filter('valueToitem')(scope.data, scope.type, $("#" + scope.ids).val());
            scope.$digest();
          });
        }
      }
    })
    .directive('showImage', [function () {
      return {
        restrict: 'A',
        scope: {
          url: '='
        },
        link: function (scope, element, attrs) {
          scope.img = new Image();
          var imgSrc = scope.url;
          scope.img.src = imgSrc;
          scope.img.style.float = "right"
          $(element).append(scope.img);
          scope.$watch('url', function (newValue, oldValue, scope) {
            if (angular.isUndefined(newValue)) {
              scope.img.src = "";
              return;
            }
            scope.img.src = scope.url;
          })

        }
      }
    }])
    .directive('selectChangelist', function ($compile) {
        return {
          scope: {
            data: "=",
            dispaly: '@',
            model: "=ngModel",
            type: "@"
          },
          restrict: 'AE',
          link: function (scope, element, attr) {
            //scope.$watch('model', function (newValue, oldValue, scope) {
            //  if (angular.isUndefined(newValue) || newValue == null)
            //    return;
            //  angular.forEach(scope.data, function (item, index) {
            //    if (item.id == scope.model) {
            //      scope.item = item;
            //    }
            //  });
            //  scope.model = newValue.id;
            //})
            if (scope.dispaly == '1')
              var ele = "<select ng-model='item' ng-options='item.username for item in data'></select>";
            else
              var ele = "<select ng-model='item' ng-options='item.name for item in data'></select>";
            element.html(ele);
            $compile(element.contents())(scope);
            scope.$watch('item', function (newValue, oldValue, scope) {
              if (angular.isUndefined(newValue) || newValue == null)
                return;
              scope.model = newValue.id;
            })
            if (!angular.isUndefined(scope.type)) {
              scope.$watch('model', function (newValue, oldValue, scope) {
                if (angular.isUndefined(newValue) || newValue == null)
                  return;
                angular.forEach(scope.data, function (item, index) {
                  if (item[scope.type] == (scope.model + "")) {
                    scope.item = item;
                  }
                })
              })
            }
          }
        }
      }
    )
    .directive('reFlush', function ($compile, $timeout) {
      return {
        scope: {
          flush: "&"
        },
        restrict: 'AE',
        link: function (scope, element, attr) {
          scope.select = '0';
          scope.able = true;
          var ele = '<span>{{$root.lagconfig["自动刷新"]}}:</span><select ng-model="select" style="width: 50px"><option value="0">是</option><option value="1">否</option></select>';
          var reflush = scope.$watch('select', function (newValue, oldValue, scope) {
            scope.able = (newValue == '0');
          });
          scope.aroundflush = function () {
            if (!scope.stop) {
              if (scope.able)
                scope.flush()();
              $timeout(function () {
                scope.aroundflush()
              }, 10000)
            }
          };
          scope.aroundflush();
          element.on('$destroy', function () {
            scope.stop = true;
            if (reflush && angular.isFunction(reflush)) {
              reflush();
            }
            ;
          });
          element.html(ele);
          $compile(element.contents())(scope);
        }
      }
    })
    .directive('selectMore', function ($compile, $timeout) {
      return {
        scope: {
          model: '=ngModel',
          data: '=',
          attrid: '@'
        },
        restrict: 'AE',
        link: function (scope, element, attr) {
          var ele = '<select id="' + scope.attrid + '" class="js-example-basic-single" multiple="multiple"><option ng-repeat="item in data track by $index" value="{{item.id}}">{{item.name}}</option></select>';
          element.html(ele);
          $compile(element.contents())(scope);
          $timeout(function () {
            $("#" + scope.attrid).select2();
          })
          $("#" + scope.attrid).bind("change", function () {
            var list = $("#" + scope.attrid).select2("data");
            if (list.length > 0) {
              scope.model = '[';
              angular.forEach(list, function (item, index) {
                scope.model += item.id;
                if (index != list.length - 1)
                  scope.model += ',';
              });
              scope.model += ']';
              //console.log('scope.model:'+scope.model);
            } else {
              scope.model = undefined;
            }
          });
        }
      }
    })
    .animation('.repeat-animation', function () {
      return {
        enter: function (element, done) {
          var width = element.width();
          element.css({
            position: 'relative',
            left: -10,
            opacity: 0
          });
          element.animate({
            left: 0,
            opacity: 1
          }, done);
        },
        leave: function (element, done) {
          element.css({
            position: 'relative',
            left: 0,
            opacity: 1
          });
          element.animate({
            left: -10,
            opacity: 0
          }, done);
        },
        move: function (element, done) {
          element.css({
            left: "2px",
            opacity: 0.5
          });
          element.animate({
            left: "0px",
            opacity: 1
          }, done);
        }
      };
    })
    .animation('.hide-animation', function () {
      return {
        beforeAddClass: function (element, className, done) {
          if (className === 'ng-hide') {
            element.animate({
              opacity: 0
            }, 500, done);
          } else {
            done();
          }
        },
        removeClass: function (element, className, done) {
          if (className === 'ng-hide') {
            element.css('opacity', 0);
            element.animate({
              opacity: 1
            }, 500, done);
          } else {
            done();
          }
        }
      };
    })
    .animation('.show-animation', function () {
      return {
        beforeAddClass: function (element, className, done) {
          if (className === 'ng-hide') {
            element.slideUp();
            //element.css({
            //  top: '-600px'
            //}),
            //  element.animate({
            //    opacity: 0,
            //    top: -600
            //  }, 5000, done);
          } else {
            done();
          }
        },
        removeClass: function (element, className, done) {
          if (className === 'ng-hide') {
            element.css({display: 'none'})
            element.slideDown();
            //element.css({opacity: 0, top: '0px'});
            //  element.animate({
            //    opacity: 1,
            //    top: 600
            //  }, 5000, done);
          } else {
            done();
          }
        }
      };
    })

    //.animation('.view-slide-in', function () {
    //  return {
    //    enter: function (element, done) {
    //      element.css({
    //          opacity: 0.5,
    //          position: "absolute",
    //          top: "0px",
    //          left: "500px"
    //        })
    //        .animate({
    //          top: 0,
    //          left: 0,
    //          opacity: 1
    //        }, 500, done);
    //    },
    //    leave: function (element, done) {
    //      element.css({
    //          opacity: 0.5,
    //          position: "absolute",
    //          top: "0px",
    //          left: " 0px"
    //        })
    //        .animate({
    //          top: -20,
    //          left: -500,
    //          opacity: 1
    //        }, 500, done);
    //    }
    //  };
    //})
    .animation('.view-slide-in', function () {
      return {
        enter: function (element, done) {
          element.css({
            opacity: 0,
            position: "absolute",
            top: "0px",
            left: "0px"
          })
            .animate({
              top: 0,
              left: 0,
              opacity: 1
            }, 500, done);
        },
        leave: function (element, done) {
          element.css({
            opacity: 0.5,
            position: "absolute",
            top: "0px",
            left: "0px"
          })
            .animate({
              top: 0,
              left: 0,
              opacity: 0
            }, 500, done);
        }
      };
    })
    //.directive('domDis', function () {
    //  return {
    //    restrict: 'AE',
    //    link: function (scope, element, attr) {
    //      scope.$on('$destroy', function () {
    //        console.log('销毁了');
    //      });
    //    }
    //  }
    //})
    .directive('fromStryle', function ($compile, $rootScope, $filter, $timeout) {
      return {
        scope: {
          list: "=ngModel",
          data: "=",
          index: '='
        },
        restrict: "AE",
        link: function (scope, element, attr) {
          //element.parent().parent().append("<div style='position: absolute;left: 50%;'>暂无数据</div>")
          //element.attr("ng-class","acolor:index == $index")
          scope.element = element;
          scope.copyid = (Math.random() * 1000).toFixed(0);
          var listner = scope.$watch('list', function (newValue, oldValue, scope) {
            // if (!angular.isUndefined(oldValue)) {
            //   $timeout(function () {
            //     $('#copy_'+scope.copyid).css('width',scope.thead.width()+'px')
            //   },500);
            //   return;
            // }
            if (newValue && newValue.length > 0) {
              $rootScope.loading = false;
              $timeout(function () {
                scope.setTitle();
              }, 500)
            }
            //(scope.element.parent().parent().children().eq(2)).css('display', 'none');
            else
            // $rootScope.loading = true;
              $rootScope.loading = false;
            //(scope.element.parent().parent().children().eq(2)).css('display', '');
          });
          if (!scope.data)
            return;
          $timeout(function () {
            for (var i = 0; i < element.children().length; i++) {
              if (scope.data[i]) {
                (element.children().eq(i)).attr("value", scope.data[i].id);
                (element.children().eq(i)).css('cursor', 'pointer');
                (element.children().eq(i)).bind('click', function () {
                  var order = this.getAttribute('order');
                  console.log('order:' + order)
                  this.setAttribute('order', !(order == "true"));
                  var orderBy = $filter("orderBy");
                  scope.list = orderBy(scope.list, this.getAttribute('value'), order == "true");
                  scope.index = undefined;
                  scope.$apply();
                })
              }
            }
          }, 2000);
          scope.$on('$destroy', function () {
            if (listner && angular.isFunction(listner)) {
              listner();
            }
            ;
          });
          scope.setTitle = function () {
            scope.randth = Math.ceil(Math.random() * 10000);
            scope.thead = angular.element(scope.element);
            scope.top = scope.thead.offset().top;
            scope.tableelement = '';
            //while(true){
            //  if()
            //}
            if (!scope.thead.width()) {
              return;
            }
            // var scroll_top;
            // scroll_top = (document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop);
            // //if (document.body.scrollTop)  //非标准写法,chrome能识别
            // //  scroll_top = document.body.scrollTop;
            // //else  //标准写法
            // //  scroll_top = document.documentElement.scrollTop;
            // $('#copy_' + scope.copyid).remove();
            // angular.element(scope.element.parent().parent().parent()).append('<div id="copy_' + scope.copyid + '" style="position: fixed;height: ' + scope.thead.height() + 'px;width:' + scope.thead.width() + 'px;background: #eaf7ff;top: ' + (scope.top - scroll_top) + 'px;"><table class="table"><thead id=' + scope.randth + '>' + angular.copy(scope.thead).html() + '</thead></table></div>');
            // angular.element(scope.element.parent().parent().parent()).removeChild($('#copy_' + scope.copyid));
            // $timeout(function () {
            //   var thlist = angular.element('#' + scope.randth).find('th');
            //   var delist = angular.element(scope.element).find('th');
            //   for (var i = 0; i < delist.length; i++) {
            //     thlist.eq(i).css('width', delist.eq(i).width() + 'px');
            //     thlist.eq(i).attr('id', 'th_' + i);
            //     thlist.eq(i).bind('click', function (event) {
            //       var id = event.target.id;
            //       delist.eq(id.substring(3, id.length)).click();
            //     });
            //   }
            //   //angular.forEach(thlist, function (item, index) {
            //   //  item.css('width',delist.eq(index).width()+'px');
            //   //});
            // }, 100);
          }
          //$timeout(function () {
          //  scope.setTitle();
          //  //angular.element('#' + randth);
          //}, 4000)
          scope.$on('to-child', function (event, data) {
            if (event.currentScope.top - data.top < 0)
              return;
            $('#' + event.currentScope.randth).parent().parent().css('top', event.currentScope.top - data.top + 'px');
            //console.log('top:' + (event.currentScope.top - data.top) + 'data:' + data);
          })
          //var scroll_bar = scope.element.parent().parent();//表格的id
          //var bar_head = scope.element.parent().parent().eq(0);//表头
          //var bar_height = bar_head.height();//表头高
          //scroll_bar.append();
          //var sroll_header = scroll_bar.clone().attr('id', 'bb');//更改复制的表格id
          //$('.tabbleout').scroll(function () {
          //  var scroll_top = $('body').scrollTop() - scroll_bar.offset().top;//判断是否到达窗口顶部
          //
          //  if (scroll_top > 0) {
          //    $('body').append('<div id="shelter"></div>');//复制的表格所在的容器
          //    $("#shelter").css({
          //      'height': bar_height,
          //      'position': 'fixed',
          //      'top': '0',
          //      'overflow': 'hidden',
          //      'width': '980px',
          //      'margin': '0 auto',
          //      'left': '0',
          //      'right': '0',
          //      'border-bottom': '1px solid #c8c8c8'
          //    });
          //    sroll_header.appendTo('#shelter');
          //    $('#shelter table').removeClass(); //删除table原来有的默认class，防止margin,padding等值影响样式
          //    $('#shelter table').css({'width': '980px', 'background-color': '#f0f0f0', 'margin': '0 auto'});
          //    $('#shelter table tr th').css('height', bar_height);//此处可以自行发挥
          //    $('#shelter table tr td').css({'padding': '20px', 'text-align': 'center'});
          //
          //    $('#shelter').show();
          //
          //  } else {
          //    $('#shelter').hide();
          //  }
          //});
          //scope.$watch('$root.loading', function (newValue, oldValue, scope) {
          //  if (angular.isUndefined(newValue)) {
          //    return;
          //  }
          //  if (newValue) {
          //    console.log('请求网络');
          //    //scope.element.parent().parent().append(' <div  class="loading"> <div class="cashin-cd"> </div></div>');
          //  }else{
          //    $("div").detach(".loading")
          //  }
          //
          //})
          //element.bind('click',function(e){
          //  scope.index = e;
          //  if(scope.click)
          //    scope.click(e);
          //}),
          ////element.attr("ng-click","click($index)"),
          //scope.onclick = function(e){
          //  console.log("e:"+e);
          //  scope.index = e;
          //  if(scope.click)
          //    scope.click(e);
          //};
          //var element = '<table class="table"><thead><tr>';
          //for(var i = 0 ; i < scope.datas.length; i++){
          //  element+="<th>"+$rootScope.lagconfig[scope.datas[i].id]+"</th>";
          //}
          //element += '</tr></thead></tbody><tr style="outline: none" ng-repeat="item in model" ng-class="{acolor:index == $index}" ng-click="onclick($index)">';
          //for(var i = 0 ; i < scope.datas.length; i++){
          //  element+='<td ng-class="{colorwhite:index == $index}">"+scope.datas[i].value+"</td>';
          //}
          //  element += '</tr></tbody></table>';
        }
      }
    })
    .directive('imgTobase64', function ($compile) {
      return {
        scope: {
          model: '=ngModel',
          eleid: '@'
        },
        restrict: "AE",
        link: function (scope, element, attr) {
          if (!angular.isUndefined(scope.eleid))
          // eleid = scope.eleid
            var temp = '<input type="file" id=' + scope.eleid + ' fileread="model">' +
              '<img id="preview"/>';
          else
            var temp = '<input type="file" id="browse" fileread="model">' +
              '<img id="preview"/>'
          element.html(temp);
          $compile(element.contents())(scope);
        }
      }
    })
    .directive("fileread", function (alertify) {
      return {
        scope: {
          fileread: "="
        },
        link: function (scope, element, attributes) {
          element.bind("change", function (changeEvent) {
            var reader = new FileReader();
            scope.alertify = alertify;
            reader.onload = function (loadEvent) {
              scope.$apply(function () {
                // if (loadEvent.target.result.length / 1024 > 50)
                //   scope.alertify.error('图片过大');
                // else
                scope.fileread = loadEvent.target.result;
              });
            }
            reader.readAsDataURL(changeEvent.target.files[0]);
          });
        }
      }
    })
    .directive('pageNumber', function ($compile) {
      return {
        scope: {
          model: '=ngModel',
        },
        restrict: "AE",
        link: function (scope, element, attr) {
          scope.model = "500";
          var numberlist = [8, 10, 50, 100, 250, 500];
          var temp = '<select ng-model="model" style="width: 80px">';
          angular.forEach(numberlist, function (item, index) {
            //if(numberlist[index] == 500)
            //  temp += '<option selected = selected>' + numberlist[index] + '</option>';
            //else
            temp += '<option>' + numberlist[index] + '</option>';
          });
          temp += '</select>';
          element.html(temp);
          $compile(element.contents())(scope);
        }
      }
    })
    .factory('getDefault', function (httpRequest, user, merchant, device, platform, bankcard, actionType, bank, $rootScope, tranState, cardTypeList, payTypelist, bankTypeCardStatus, bankCardStatus, cashoutType, autopayState, userole, merchantType, gateWay, transLimit, paymentType, deviceType, merchantStatus, merchantPurpose, listStates, listTypes, proposeList,
                                     depositstatus, merchantTotals, popusalTypes, bankList, proposalState, depositState, platfromList, rplistType, userrplistType, originList, flushState, googleEnable, payTypes, mobileTypes, getBankType, payitemTypes, proposalType, monthType,canPayState,payBanktypes) {
      return {
        getAllstrong: function () {
          $rootScope.transtate = tranState;
          $rootScope.depositstate = depositState;
          $rootScope.proposalstate = proposalState;
          $rootScope.cardtype = cardTypeList;
          $rootScope.paytypelist = payTypelist;
          $rootScope.banktypecardstatus = bankTypeCardStatus;
          $rootScope.bankcardstatus = bankCardStatus;
          $rootScope.cashouttype = cashoutType;
          $rootScope.autopaystate = autopayState;
          $rootScope.userole = userole;
          $rootScope.paymenttype = paymentType;
          $rootScope.devicetype = deviceType;
          $rootScope.merchantstatus = merchantStatus;
          $rootScope.merchantpurpose = merchantPurpose;
          $rootScope.actiontype = actionType;
          $rootScope.liststates = listStates;
          $rootScope.listtypes = listTypes;
          $rootScope.proposelist = proposeList;
          $rootScope.depositstatus = depositstatus;
          $rootScope.merchanttotals = merchantTotals;
          $rootScope.popusaltypes = popusalTypes;
          $rootScope.banklist = bankList;
          $rootScope.platfromlist = platfromList;
          $rootScope.rplisttype = rplistType;
          $rootScope.userrplisttype = userrplistType;
          $rootScope.originlist = originList;
          $rootScope.flushstate = flushState;
          $rootScope.googleenable = googleEnable;
          $rootScope.paytypes = payTypes;
          $rootScope.getbanktype = getBankType;
          $rootScope.canpaystate = canPayState;
          $rootScope.mobiletypes = mobileTypes;
          $rootScope.payitemtypes = payitemTypes;
          $rootScope.proposaltype = proposalType;
          $rootScope.monthtype = monthType;
          $rootScope.paybanktypes = payBanktypes;
        }
      }
    })
    .factory('finditem', function () {
      return {
        getById: function (type, value, list) {
          if (!list) {
            return '';
          }
          for (var i = 0; i < list.length; i++) {
            if (list[i][type] == value)
              return list[i];

          }
        }
      }
    })
    .factory('httpRequest', function (alertify) {
      // var ipAddress = "http://192.168.11.128:8081/";
      // var ipAddress = "http://10.10.44.55:8081/";
      // var ipAddress = "http://10.10.45.147:8081/";
      var ipAddress = window.url;
      // var ipAddress = "http://midpaydemo.com:8080/";
      return {
        get: function (url, todo) {
          $.ajax({
            type: 'GET',
            // url: "http://192.168.11.128:8081/" + url,
            url: ipAddress + url,
            success: function (data) {
              todo(data);
            },
            error: function (data) {

            }
          });
        },
        post: function (url, data, todo) {
          $.ajax({
            type: 'POST',
            url: ipAddress + url,
            data: data,
            success: function (data) {
              if (angular.isFunction(todo))
                todo(data);
            },
            error: function (data) {
              alertify.success(data.msg);
            }
            // dataType: dataType
          });
        },
        put: function (url, data, todo) {
          $.ajax({
            type: 'PUT',
            url: ipAddress + url,
            data: data,
            success: function (data) {
              if (angular.isFunction(todo))
                todo(data);
            },
            error: function (data) {
              alertify.success(data.msg);
            }
            // dataType: dataType
          });
        },
        delete: function (url, todo) {
          $.ajax({
            type: "delete",
            contentType: "application/json",
            dataType: "json",
            url: ipAddress + url,
            data: data,
            success: function (data) {
              if (angular.isFunction(todo))
                todo(data);
            },
            error: function (data) {
              alertify.success(data.msg);
            }
            // dataType: dataType
          });
        },
      }
    })
    .filter('dateFormate', function () {
      return function (value) {
        if (angular.isUndefined(value) || value == '' || value == null) {
          return '';
        }
        if (angular.isFunction(value.indexOf)) {
          if (!(value.indexOf('PM') == -1 || value.indexOf('AM') == -1)) {
            return value;
          }
        }
        return (new Date((new Date(value)).getTime() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, ''));
      }
    })
    .filter('bankTolength', function () {
      return function (value, char) {
        if (value.indexOf(char) == -1) {
          return value;
        }
        return value.substring(0, value.indexOf(char) + 1);
      }
    })
    .filter('toFix', function () {
      return function (value) {
        return value.toFixed(2);
      }
    })
    .factory('transfer', function () {
      return {
        stringtoArray: function (value) {
          if (!value) {
            value = "#0,#0,0,#0,#0,0,0,#0,0,0,0,#0,0,0,#0,#0,0,0,0,0,0,";
          }
          var dest = [];
          var new_item = value.split("#")
          for (var i = 1; i < new_item.length; i++) {
            dest[i - 1] = [];
            var new_item_list = new_item[i].split(",");
            for (var j = 0; j < new_item_list.length - 1; j++) {
              dest[i - 1][j] = parseInt(new_item_list[j]);
            }
            //console.log(dest);
          }
          return dest;
        },
        arraytoString: function (all) {
          var able = ""
          //var item =  [[1], [1, 1], [1], [1, 1, 1], [1, 1, 1, 1], [1, 1, 1], [1], [1, 1, 1, 1, 1, 1]];
          for (var i = 0; i < all.length; i++) {
            able += "#";
            for (var j = 0; j < all[i].length; j++) {
              able += all[i][j] + ","
              //if(all[i][j])
            }
          }
          return able;
        }
      }
    })
    .filter('nameTovalue', function () {
      return function (value, name, type, list) {
        if (!list || !value) {
          return '';
        }
        for (var i = 0; i < list.length; i++) {
          if (list[i][name] == value) {
            return list[i][type]
          }
        }
      }
    })
    .filter('bankFormal', function () {
      return function (value) {
        if (angular.isUndefined(value)) {
          return '';
        }
        //var desvalue = value.substring(0, 4) + " " + value.substring(4, 8) + " " + value.substring(8, 12) + " " + value.substring(12, 16) + " " + value.substring(16, value.length);
        return value;
      }
    })
    .filter('stringLeng', function () {
      return function (value, length) {
        if (angular.isUndefined(value)) {
          return '';
        }
        if (!length)
          length = 10;
        if (value != null && value.length > 20)
          value = value.substring(0, length) + "...";
        return value;
      }

    })
    .filter('valueToitem', function () {
      return function (value, name, item) {
        if (angular.isUndefined(value)) {
          return '';
        }
        var oldvalue = [];
        for (var i = 0; i < value.length; i++) {
          if (value[i][name].indexOf(item) != -1) {
            //value.splice(name);
            oldvalue.push(value[i]);
          }
        }
        if (!oldvalue.length) {
          oldvalue.push(value[0]);
        }
        return oldvalue;
      }
    })

    .filter('itemTolish', function ($rootScope) {
      return function (value) {
        if (angular.isUndefined($rootScope.lagconfig[value])) {
          return value;
        }
        return $rootScope.lagconfig[value];
        //var desvalue = value.substring(0, 4) + " " + value.substring(4, 8) + " " + value.substring(8, 12) + " " + value.substring(12, 16) + " " + value.substring(16, value.length);
        //return desvalue;
      }
    });
  /** @ngInject */
})();
