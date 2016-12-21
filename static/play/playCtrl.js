/**
 * Created by Jordan on 10/7/2016.
 */

'use strict';

angular.module('myApp')
    .controller('PlayCtrl', ['$scope', '$http', 'PlayService', 'SocketService', PlayController]);

function PlayController($scope, $http, PlayService, SocketService) {
    console.log("I'm Play");

    $scope.play = true;
    $scope.fen = "";
    SocketService.connectToSocket();
    $scope.playGame = function () {

        PlayService.initGame($scope.play, $scope.fen).then(function (data) {

            SocketService.send();


        });
        SocketService.onMessage().then(function (e) {

            $scope.play = false;
            $scope.fen = e.data;
            $scope.playGame();
        });
    };

    $scope.playGame();
}
