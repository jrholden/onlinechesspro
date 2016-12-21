/**
 * Created by Jordan on 10/7/2016.
 */
angular.module('myApp')
    .factory('PlayService', ['$q', '$http', '$window', '$rootScope', function ($q, $http, $window, $rootScope) {

        var service = {};
        var board, moved, cfg, status;
        var player1 = true;
        service.initGame = function (startOfGame, postition) {

            var defer = $q.defer();
            var game = new Chess();
            moved = false;
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

                cfg = {
                    draggable: true,
                    position: 'start',
                    onDragStart: onDragStart,
                    onDrop: onDrop
                };
                board = new ChessBoard('board', cfg);
            } else {
                cfg = {
                    draggable: true,
                    position: postition,
                    onDragStart: onDragStart,
                    onDrop: onDrop
                };
                board = new ChessBoard('board', cfg);
                if (!service.whatTurn()) {
                    game.setTurn("b");
                    status = "Blacks Turn";
                    console.log("Blacks Turn");
                } else {
                    game.setTurn("w");
                    status = "Whites Turn";
                    console.log("Whites Turn");
                }
            }
            return defer.promise;
        };

        service.getStatus = function () {
            return status;
        };
        service.whatTurn = function () {
            return player1;
        };
        service.setTurn = function (whatPlayer) {
            player1 = whatPlayer;
        };
        service.getPosition = function () {
            return board.fen();
        };
        service.hasMoved = function () {
            return moved;
        };


        return service;
    }])
;
