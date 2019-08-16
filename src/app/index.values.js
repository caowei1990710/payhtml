(function() {
    'use strict';

    angular
        .module('pmsJs')
        .value('requestDatas', [])
        .value('responseCallbacks', [])
         // .value('webSocketUrl', 'ws://payserver.pms8.me:8220/pss')
       .value('webSocketUrl', 'ws://101.78.133.219:7010/pss')
        //.value('webSocketUrl', 'ws://papi99.pms8.me:8220/pss')
        // .value('webSocketUrl', 'ws://payserver.pms8.me:8220/pss')
        //.value('webSocketUrl', 'ws://192.168.12.116:8080/pss')
        //.value('webSocketUrl', 'ws://192.168.12.116:8080/pss')
        //.value('webSocketUrl', 'ws://aeson.neweb.me:9036/pss')
        // .value('webSocketUrl', 'ws://192.168.12.106:8080/pss')
        //.value('webSocketUrl', 'ws://10.167.11.229:7010/pss')
        //.value('webSocketUrl', 'ws://192.168.10.142:7010/pss')
        //.value('webSocketUrl', 'ws://192.168.12.106:7010/pay_server/pss')
        //.value('webSocketUrl', 'ws://192.168.12.106:8080/acc')
        //.value('webSocketUrl', 'ws://101.78.133.212:8566/acc')
        //.value('webSocketUrl', 'ws://192.168.12.106:7010/payment/pss')
        //.value('webSocketUrl', 'ws://192.168.12.106:7010/pay_server/pss')
        .value('uploadFileUrl', 'http://aeson.neweb.me:9036/http/pss/merchantImgUpload')
        //.value('uploadFileUrl', 'http://lan.neweb.me')
        //.value('imgUrl', 'http://img99.neweb.me/img99/pms')
        //.value('imgUrl', 'http://aeson.neweb.me:9036')
        // .value('webSocketUrl', 'ws://paymentsystemserver99.neweb.me:9038/pss')
        // .value('webSocketUrl', 'ws://192.168.10.140:9036/pss')
        // .value('webSocketUrl', 'ws://192.168.10.180:8080/pay_server/pss')
        // .value('webSocketUrl', 'ws://192.168.13.122:8080/pss')
        // .value('webSocketUrl', 'ws://192.168.17.40:8081/pay/pss')
        .value('webSocket', undefined);
})();
//
