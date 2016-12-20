/**
 * Created by Jordan on 10/7/2016.
 */
angular.module('myApp')
    .factory('PlayService', ['$q', '$http', '$window', '$rootScope', function ($q, $http, $window, $rootScope) {

        var service = {};
        var board;
        service.initGame = function () {



            var game = new Chess();
            var moved = false;
            var onDragStart = function(source, piece, position, orientation) {
                if (game.game_over() === true || moved ||
                    (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
                    (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
                    return false;
                }
            };

            var onDrop = function(source, target) {
                // see if the move is legal
                var move = game.move({
                    from: source,
                    to: target,
                    promotion: 'q' // NOTE: always promote to a queen for example simplicity
                });

                // illegal move
                if (move === null) return 'snapback';
                else moved = true;
            };



            var cfg = {
                draggable: true,
                position: 'start',
                onDragStart: onDragStart,
                onDrop: onDrop
            };
            board = ChessBoard('board', cfg);

        };
        service.getBoard = function(){
          return board;
        };


        return service;
    }]);
