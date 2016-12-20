/**
 * Created by Jordan on 10/7/2016.
 */
angular.module('myApp')
    .factory('SocketService', ['$q', '$http', '$window', '$rootScope', 'PlayService', function ($q, $http, $window, $rootScope, PlayService) {


        var service = {};
        service.socket = function () {
            var socket = io.connect();
            return {
                on: function (eventName, callback) {
                    socket.on(eventName, function () {
                        var args = arguments;
                        $rootScope.$apply(function () {
                            callback.apply(socket, args);
                        });
                    });
                },
                emit: function (eventName, data, callback) {
                    socket.emit(eventName, data, function () {
                        var args = arguments;
                        $rootScope.$apply(function () {
                            if (callback) {
                                callback.apply(socket, args);
                            }
                        });
                    })
                }
            };
        };
        return service;

    }]);