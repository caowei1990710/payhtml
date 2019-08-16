(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('HomeController', HomeController);
  /** @ngInject */
  function HomeController($scope, $timeout, bankcard, $rootScope,$state) {
    $(window).scroll(function () {
      var top;
      if (document.body.scrollTop) { //非标准写法,chrome能识别
        top = document.body.scrollTop;
      } else { //标准写法
        top = document.documentElement.scrollTop;
      }
      $scope.$broadcast("to-child", {
        'top': top
      });

    });
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
