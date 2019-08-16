(function() {
    'use strict';

    angular
        .module('pmsJs')
        .factory('myWebSocket', myWebSocket);

    /** @ngInject */
    function myWebSocket($log, webSocket, webSocketUrl) {
        $log.debug(webSocketUrl);
        if (webSocket == undefined) {
            var wsUri = webSocketUrl;
            webSocket = new WebSocket(wsUri);
        }
        return webSocket;
    }
})();