/**
 * Created by Jordan on 10/7/2016.
 */
angular.module('myApp')
    .factory('PlayService', ['$q', '$http', '$window', '$rootScope', function ($q, $http, $window, $rootScope) {

        var service = {};
        var board, moved, cfg, status, currPlayer;
        var player1 = true;
        service.initGame = function (startOfGame, postition, player, turn) {

            var defer = $q.defer();
            var game = new Chess();
            currPlayer = player;
            moved = false;
            if (startOfGame && player === "black") {
                moved = true;
            }
            var onDragStart = function (source, piece, position, orientation) {
                if (game.game_over() === true || moved ||
                    (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
                    (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
                    return false;

                }
            };

            var onDrop = function (source, target) {
                // see if the move is legal
                var move = game.move({
                    from: source,
                    to: target,
                    promotion: 'q' // NOTE: always promote to a queen for example simplicity
                });

                moved = true;
                return defer.resolve();
                
            };

            if (startOfGame) {
                console.log("Board should default to new");
                cfg = {
                    draggable: true,
                    orientation: player,
                    position: 'start',
                    onDragStart: onDragStart,
                    onDrop: onDrop
                };

            } else {
                cfg = {
                    draggable: true,
                    orientation: player,
                    position: postition,
                    onDragStart: onDragStart,
                    onDrop: onDrop
                };
            }
            board = new ChessBoard('board', cfg);
            game.setTurn(turn);
            return defer.promise;
        };

        service.getStatus = function () {
            return status;
        };
        service.whatTurn = function () {
            return player1;
        };
        service.setTurn = function (whatPlayer) {

        };
        service.getPosition = function () {
            return board.fen();
        };
        service.getCurrPlayer = function () {
            console.log(currPlayer);
            return currPlayer;
        };
        service.hasMoved = function () {
            return moved;
        };


        return service;
    }])
;
