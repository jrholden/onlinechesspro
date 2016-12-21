/**
 * Created by Jordan on 10/7/2016.
 */
angular.module('myApp')
    .factory('SocketService', ['$q', '$http', '$window', '$rootScope', 'PlayService', function ($q, $http, $window, $rootScope, PlayService) {

        var conn = new WebSocket('ws://onlinechesspro.com:8080');
        var service = {};
        service.connectToSocket = function () {

            conn.onopen = function (e) {
                console.log("Connection established! " + e);
            };
        };
        service.send = function () {
            conn.send(PlayService.getPosition());
            if (PlayService.whatTurn()) {
                PlayService.setTurn(false);
            } else {
                PlayService.setTurn(true);
            }
        };
        service.onMessage = function () {
            var defer = $q.defer();
            conn.onmessage = function (e) {
                console.log(e.data);
                if (PlayService.whatTurn()) {
                    PlayService.setTurn(false);
                } else {
                    PlayService.setTurn(true);
                }
                return defer.resolve(e);

            };
            return defer.promise;
        };

        return service;

    }]);