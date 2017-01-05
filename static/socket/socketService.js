/**
 * Created by Jordan on 10/7/2016.
 */
angular.module('myApp')
    .factory('SocketService', ['$q', '$http', '$window', '$rootScope', 'PlayService', function ($q, $http, $window, $rootScope, PlayService) {

        var conn;
        var service = {};
        service.connectToSocket = function () {
            conn = new WebSocket('ws://onlinechesspro.com:8080');
            var defer = $q.defer();

            conn.onopen = function (e) {
                console.log("Connection established! " + e);
                defer.resolve();
            };
            return defer.promise;
        };
        service.send = function () {
            conn.send(PlayService.getPosition());
        };
        service.sendConnect = function () {
            conn.send("connected");
        };
        
        service.onMessage = function () {
            var defer = $q.defer();
            conn.onmessage = function (e) {
                
                return defer.resolve(JSON.parse(e.data));

            };
            return defer.promise;
        };

        return service;

    }]);