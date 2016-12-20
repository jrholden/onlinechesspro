/**
 * Created by Jordan on 10/7/2016.
 */

'use strict';

angular.module('myApp')
    .controller('PlayCtrl', ['$scope', '$http','PlayService','SocketService', PlayController]);

function PlayController($scope, $http, PlayService, SocketService) {
    console.log("I'm Play");

    $scope.playGame = function(){
        PlayService.initGame();
    };

    SocketService.on(init)

    //console.log(PlayService.getBoard().fen());
    $scope.playGame();
    console.log(PlayService.getBoard().fen());
}
