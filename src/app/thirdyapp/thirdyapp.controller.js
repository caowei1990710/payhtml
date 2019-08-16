(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('thirdyAppController', thirdyAppController);
  /** @ngInject */
  function thirdyAppController($scope, $timeout, bankcard, $rootScope,$state,loc_language_cn) {
    var vm = this;
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
