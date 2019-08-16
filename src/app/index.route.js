(function () {
  'use strict';

  angular
    .module('pmsJs')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        controller: 'HomeController',
        controllerAs: 'home'
      })
      .state('test', {
        url: '/app',
        templateUrl: 'app/test/test.html',
        controller: 'TestController',
        controllerAs: 'test'
      })
      .state('tologin', {
        url: '/tologin',
        templateUrl: 'app/tologin/tologin.html',
        controller: 'toLoginController',
        controllerAs: 'tologin'
      })

      .state('maincontent', {
        url: '/maincontent',
        templateUrl: 'app/maincontent/maincontent.html',
        controller: 'mainContentController',
        controllerAs: 'maincontent'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .state('home.bc', {
        url: '/bc',
        views: {
          'content': {
            templateUrl: 'app/bankCard/bankCard.html',
            controller: 'BankCardController',
            controllerAs: 'bc'
          },
          'am@home.bc': {
            templateUrl: 'app/bankCard/accountManagement/accountManagement.html',
            controller: 'AccountManagementController',
            controllerAs: 'bc'
          },
          'ms@home.bc': {
            templateUrl: 'app/bankCard/monitoringStatus/monitoringStatus.html',
            controller: 'MonitoringStatusController',
            controllerAs: 'bc'
          },
          'tn@home.bc': {
            templateUrl: 'app/bankCard/transactionNotification/transactionNotification.html',
            controller: 'TransactionNotificationController',
            controllerAs: 'bc'
          },
          'tm@home.bc': {
            templateUrl: 'app/bankCard/transactionMonitoring/transactionMonitoring.html',
            controller: 'TransactionMonitoringController',
            controllerAs: 'bc'
          }
        }
      })
      .state('home.cashin', {
        url: '/cashin',
        views: {
          'content': {
            templateUrl: 'app/cashin/cashin.html',
            controller: 'CashinController',
            controllerAs: 'cashin'
          },
          'mc@home.cashin': {
            templateUrl: 'app/cashin/manualCashin/manualCashin.html',
            controller: 'ManualCashinController',
            controllerAs: 'cashin'
          },
          'mmc@home.cashin': {
            templateUrl: 'app/cashin/monitoringManualCashin/monitoringManualCashin.html',
            controller: 'MonitoringManualCashinController',
            controllerAs: 'cashin'
          },
          'ammc@home.cashin': {
            templateUrl: 'app/cashin/allmonitoringManualCashin/allmonitoringManualCashin.html',
            controller: 'AllMonitoringManualCashinController',
            controllerAs: 'cashin'
          },
          'atp@home.cashin': {
            templateUrl: 'app/cashin/autoPayCashin/autoPayCashin.html',
            controller: 'autoPayController',
            controllerAs: 'cashin'
          },
          'tt@home.cashin': {
            templateUrl: 'app/cashin/transLateform/transLateform.html',
            controller: 'transLateformcontroller',
            controllerAs: 'cashin'
          },
          'att@home.cashin': {
            templateUrl: 'app/cashin/alltransLateform/alltransLateform.html',
            controller: 'alltransLateformcontroller',
            controllerAs: 'cashin'
          }
        }
      })
      .state('home.deposit', {
        url: '/deposit',
        views: {
          'content': {
            templateUrl: 'app/deposit/deposit.html',
            controller: 'DepositController',
            controllerAs: 'deposit'
          },
          'md@home.deposit': {
            templateUrl: 'app/deposit/manualDeposit/manualDeposit.html',
            controller: 'ManualDepositController',
            controllerAs: 'deposit'
          },
          'adm@home.deposit': {
            templateUrl: 'app/deposit/autoDepositMonitoring/autoDepositMonitoring.html',
            controller: 'AutoDepositMonitoringController',
            controllerAs: 'deposit'
          },
          'tt@home.deposit': {
            templateUrl: 'app/deposit/transactionTask/transactionTask.html',
            controller: 'TransactionTaskController',
            controllerAs: 'deposit'
          },
          'at@home.deposit': {
            templateUrl: 'app/deposit/alltransactionTask/alltransactionTask.html',
            controller: 'allTransactionTaskController',
            controllerAs: 'deposit'
          }
        }
      })
      .state('home.merchant', {
        url: '/merchant',
        views: {
          'content': {
            templateUrl: 'app/merchant/merchant.html',
            controller: 'MerchantController',
            controllerAs: 'merchant'
          },
          'mm@home.merchant': {
            templateUrl: 'app/merchant/merchantManagement/merchantManagement.html',
            controller: 'MerchantManagementController',
            controllerAs: 'merchant'
          }, 'mc@home.merchant': {
            templateUrl: 'app/merchant/merchantManagement/totalmerchantManagement.html',
            controller: 'totalmerchantManagementController',
            controllerAs: 'merchant'
          }
        }
      })
      .state('home.sm', {
        url: '/sm',
        views: {
          'content': {
            templateUrl: 'app/systemManagement/systemManagement.html',
            controller: 'SystemManagementController',
            controllerAs: 'sm'
          },
          'bt@home.sm': {
            templateUrl: 'app/systemManagement/bankType/bankType.html',
            controller: 'BankTypeController',
            controllerAs: 'sm'
          },
          'mt@home.sm': {
            templateUrl: 'app/systemManagement/merchantType/merchantType.html',
            controller: 'MerchantTypeController',
            controllerAs: 'sm'
          },
          'cio@home.sm': {
            templateUrl: 'app/systemManagement/cashInOut/cashInOut.html',
            controller: 'CashInOutController',
            controllerAs: 'sm'
          },
          'dm@home.sm': {
            templateUrl: 'app/systemManagement/device/device.html',
            controller: 'DeviceController',
            controllerAs: 'sm'
          }
        }
      })
      .state('update', {
        url: '/update',
        templateUrl: 'app/update/update.html',
        controller: 'UpdateController',
        controllerAs: 'update'
      })
      //.state('update',{
      //  views: {
      //
      //  }
      //})
      .state('home.user', {
        url: '/user',
        //templateUrl: 'app/login/login.html',
        //controller: 'UserController',
        //controllerAs: 'user'
        views: {
          'content': {
            templateUrl: 'app/user/user.html',
            controller: 'UserController',
            controllerAs: 'user'
          },
          'ul@home.user': {
            templateUrl: 'app/user/userlist/userlist.html',
            controller: 'UserListController',
            controllerAs: 'user'
          },
          'rl@home.user': {
            templateUrl: 'app/user/rolelist/rolelist.html',
            controller: 'RoleListController',
            controllerAs: 'user'
          },
          'pl@home.user': {
            templateUrl: 'app/user/platformlist/platformlist.html',
            controller: 'PlatformListController',
            controllerAs: 'user'
          }
        }
      })
      .state('home.match', {
        "url": '/match',
        views: {
          'content': {
            templateUrl: 'app/match/match.html',
            controller: 'MatchController',
            controllerAs: 'match'
          }
          , 'atp@home.match': {
            templateUrl: 'app/match/manualMatch.html',
            controller: 'manualMatchController',
            controllerAs: 'match'
          },
          'mc@home.match': {
            templateUrl: 'app/match/autoMatch.html',
            controller: 'autoMatchController',
            controllerAs: 'match'
          }
        }
      })
      .state('home.onlinepay', {
        "url": '/onlinepay',
        views: {
          'content': {
            templateUrl: 'app/onlinepay/onlinepay.html',
            controller: 'onlineController',
            controllerAs: 'online'
          }
          , 'atp@home.onlinepay': {
            templateUrl: 'app/onlinepay/payitem.html',
            controller: 'payItemController',
            controllerAs: 'online'
          }
        }

      })
      .state('home.main', {
        url: '/main',
        views: {
          'content': {
            templateUrl: 'app/main/main.html',
            controller: 'MainController',
            controllerAs: 'Main'
          }
        }
      })
      .state('home.update', {
        url: '/update',
        views: {
          'content': {
            templateUrl: 'app/update/update.html',
            controller: 'UpdateController',
            controllerAs: 'update'
          }
        }
      })
      .state('home.rp', {
        url: '/rp',
        views: {
          'content': {
            templateUrl: 'app/rp/rp.html',
            controller: 'RpController',
            controllerAs: 'rp'
          }
          , 'rtp@home.rp': {
            templateUrl: 'app/rp/rpitem.html',
            controller: 'rpItemController',
            controllerAs: 'rp'
          }
        }
      })
      .state('home.list', {
        url: '/list',
        views: {
          'content': {
            templateUrl: 'app/list/list.html',
            controller: 'listController',
            controllerAs: 'list'
          }
          , 'mc@home.list': {
            templateUrl: 'app/list/listItem.html',
            controller: 'listItemController',
            controllerAs: 'list'
          }
        }
      })
      .state('thirdylogin', {
        url: '/thirdylogin',
        templateUrl: 'app/thirdylogin/thirdylogin.html',
        controller: 'thirdyLoginController',
        controllerAs: 'thirdylogin'
      })
      .state('shunpaylogin', {
        url: '/shunpaylogin',
        templateUrl: 'app/shunpaylogin/shunpaylogin.html',
        controller: 'shunpayLoginController',
        controllerAs: 'shunpaylogin'
      })
      .state('shunpayhome', {
        url: '/shunpayhome',
        templateUrl: 'app/shunpayhome/shunpayhome.html',
        controller: 'shunpayHomeController',
        controllerAs: 'shunpayhome'
      })

      .state('thirdyhome', {
        url: '/thirdyhome',
        templateUrl: 'app/thirdyhome/thirdyhome.html',
        controller: 'thirdyHomeController',
        controllerAs: 'thirdyhome'
      })
      .state('shunpayhome.shunpayhomeaccount', {
        url: '/shunpayhomeaccount',
        views: {
          'content': {
            templateUrl: 'app/shunpayhomeaccount/shunpayhomeaccount.html',
            controller: 'shunpayHomeAccount',
            controllerAs: 'shunpayhomeaccount'
          }
        }
      })

      .state('shunpayhome.shunpayhomereportlist', {
        url: '/shunpayhomereportlist',
        views: {
          'content': {
            templateUrl: 'app/shunpayhomereportlist/shunpayhomereportlist.html',
            controller: 'shunpayHomeReportlist',
            controllerAs: 'shunpayhomereportlist'
          }
        }
      })
      .state('shunpayhome.shunpayhomeoutput', {
        url: '/shunpayhomeoutput',
        views: {
          'content': {
            templateUrl: 'app/shunpayhomeoutput/shunpayhomeoutput.html',
            controller: 'shunpayHomeOutputController',
            controllerAs: 'shunpayhomeoutput'
          }
        }
      })
      .state('shunpayhome.shunpayhomerecord', {
        url: '/shunpayhomerecord',
        views: {
          'content': {
            templateUrl: 'app/shunpayhomerecord/shunpayhomerecord.html',
            controller: 'shunpayHomeRecordController',
            controllerAs: 'shunpayhomerecord'
          }
        }
      })
      .state('thirdyhome.thirdyaccount', {
        url: '/thirdyaccount',
        views: {
          'content': {
            templateUrl: 'app/thirdyaccount/thirdyaccount.html',
            controller: 'thirdyAccountController',
            controllerAs: 'thirdyaccount'
          }
        }
      })
      .state('thirdyhome.thirdypic', {
        url: '/thirdypic',
        views: {
          'content': {
            templateUrl: 'app/thirdypicture/thirdypic.html',
            controller: 'thirdyPicController',
            controllerAs: 'thirdypic'
          }
        }
      })
      .state('thirdyhome.thirdyuser', {
        url: '/thirdyuser',
        views: {
          'content': {
            templateUrl: 'app/thirdyuser/thirdyuser.html',
            controller: 'thirdyUserController',
            controllerAs: 'thirdyuser'
          }
        }
      })
      .state('thirdyhome.thirdyagent', {
        url: '/thirdyagent',
        views: {
          'content': {
            templateUrl: 'app/thirdyagent/thirdyagent.html',
            controller: 'thirdyAgentController',
            controllerAs: 'thirdyagent'
          }
        }
      })
      .state('thirdyhome.thridyinput', {
        url: '/thridyinput',
        views: {
          'content': {
            templateUrl: 'app/thridyinput/thridyinput.html',
            controller: 'thridyInputController',
            controllerAs: 'thridyinput'
          }
        }
      })
      .state('thirdyhome.thridyoutput', {
        url: '/thridyoutput',
        views: {
          'content': {
            templateUrl: 'app/thridyoutput/thridyoutput.html',
            controller: 'thridyOutputController',
            controllerAs: 'thridyoutput'
          }
        }
      })
      .state('thirdyhome.thirdyrecord', {
        url: '/thirdyrecord',
        views: {
          'content': {
            templateUrl: 'app/thirdyrecord/thirdyrecord.html',
            controller: 'thirdyRecordController',
            controllerAs: 'thirdyrecord'
          }
        }
      })
      .state('thirdyhome.thirdyrplist', {
        url: '/thirdyrplist',
        views: {
          'content': {
            templateUrl: 'app/thirdyrplist/thirdyrplist.html',
            controller: 'thirdyRplistController',
            controllerAs: 'thirdyrplist'
          }
        }
      })
      .state('thirdyhome.proposal', {
        url: '/proposal',
        views: {
          'content': {
            templateUrl: 'app/proposal/proposal.html',
            controller: 'proposalController',
            controllerAs: 'thirdyproposal'
          }
        }
      })
      .state('thirdyhome.usepic', {
        url: '/usepic',
        views: {
          'content': {
            templateUrl: 'app/usepic/usepic.html',
            controller: 'usepicController',
            controllerAs: 'usepic'
          }
        }
      })
      .state('thirdyhome.thirdyproposal', {
        url: '/thirdyproposal',
        views: {
          'content': {
            templateUrl: 'app/thirdyproposal/thirdyproposal.html',
            controller: 'thirdyProposalController',
            controllerAs: 'thirdyproposal'
          }
        }
      })
      .state('thirdyhome.thirdywrongreport', {
        url: '/thirdywrongreport',
        views: {
          'content': {
            templateUrl: 'app/thirdywrongreport/thirdywrongreport.html',
            controller: 'thirdywrongreportController',
            controllerAs: 'thirdywrongreport'
          }
        }
      })
      .state('maincontent.first', {
        url: '/first/:id',
        views: {
          'content': {
            templateUrl: 'app/first/first.html',
            controller: 'firstController',
            controllerAs: 'first'
          }
        }
      })
      .state('maincontent.second', {
        url: '/second/:id',
        views: {
          'content': {
            templateUrl: 'app/second/second.html',
            controller: 'secondController',
            controllerAs: 'second'
          }
        }
      })
      .state('maincontent.three', {
        url: '/three/:id',
        views: {
          'content': {
            templateUrl: 'app/three/three.html',
            controller: 'threeController',
            controllerAs: 'three'
          }
        }
      })
      .state('maincontent.four', {
          url: '/four/:id',
          views: {
            'content': {
              templateUrl: 'app/four/four.html',
              controller: 'fourController',
              controllerAs: 'four'
            }
          }
        }
      )
      .state('thirdyhome.thirdyapp', {
        url: '/thirdyapp',
        views: {
          'content': {
            templateUrl: 'app/thirdyapp/thirdyapp.html',
            controller: 'thirdyAppController',
            controllerAs: 'thirdyapp'
          }
        }

      })
    ;
// $urlRouterProvider.otherwise('/shunpaylogin');
    $urlRouterProvider.otherwise('/tologin');
//     $urlRouterProvider.otherwise('/thirdylogin');
  }

})
();
