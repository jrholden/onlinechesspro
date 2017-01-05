/**
 * Created by Jordan on 10/7/2016.
 */

'use strict';

angular.module('myApp')
    .controller('PlayCtrl', ['$scope', '$http', 'PlayService', 'SocketService', PlayController]);

function PlayController($scope, $http, PlayService, SocketService) {
    console.log("I'm Play");
    $scope.gameFound = true;
    $scope.gameSearch = true;
    $scope.loadMessage = "Searching For Your Game!";

    $scope.fen = "";
    $scope.play = true;
    $scope.turn = "w";
    
    $scope.playGame = function () {

        PlayService.initGame($scope.play, $scope.fen, $scope.player, $scope.turn).then(function (data) {
            
            SocketService.send();


        });
        SocketService.onMessage().then(function (e) {

            console.log("Message from: "+e.player);
            if(e.msg !== "disconnect") {
                if (e.player === "black") {
                    $scope.turn = "w";
                } else {
                    $scope.turn = "b";
                }

                $scope.fen = e.msg;

                $scope.play = false;
                $scope.playGame();
            }else{
                $scope.loadMessage = "Your Opponent has left!";
                $scope.gameFound = false;
                
            }
        });

    };
    
    $scope.findGame = function () {
        $scope.gameSearch = false;
        SocketService.connectToSocket().then(function () {
            console.log("Connected!");
            SocketService.onMessage().then(function (e) {

                if (e.msg === "connected") {
                    
                    if (e.player === "black") {
                        $scope.player = "white";
                        console.log("sending to black");
                        SocketService.sendConnect();
                    }else{
                        $scope.player = "black";
                    }
                    
                    $scope.gameSearch = true;
                    $scope.gameFound = true;
                    $scope.playGame();
                }
            });

        });
    };

}
