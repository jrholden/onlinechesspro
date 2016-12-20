/**
 * Created by Jordan on 10/7/2016.
 */

'use strict';

angular.module('myApp')
    .controller('PlayCtrl', ['$scope', '$http', PlayController]);

function PlayController($scope, $http) {
    console.log("I'm Play");
    var status = "";
    $scope.status = "";

    $scope.game = new Chess();
    $scope.statusEl = status;
    $scope.fenEl = $scope.fen;
    $scope.pgnEl = $scope.pgn;

// do not pick up pieces if the game is over
// only pick up pieces for the side to move
    var onDragStart = function (source, piece, position, orientation) {
        if ($scope.game.game_over() === true ||
            ($scope.game.turn() === 'w' && piece.search(/^b/) !== -1) ||
            ($scope.game.turn() === 'b' && piece.search(/^w/) !== -1)) {
            return false;
        }
    };

    var onDrop = function (source, target) {
        // see if the move is legal
        var move = $scope.game.move({
            from: source,
            to: target,
            promotion: 'q' // NOTE: always promote to a queen for example simplicity
        });

        // illegal move
        if (move === null) return 'snapback';

        $scope.updateStatus();
    };

// update the board position after the piece snap
// for castling, en passant, pawn promotion
    var onSnapEnd = function () {
        $scope.board.position($scope.game.fen());
    };

    $scope.updateStatus = function () {


        var moveColor = 'White';
        if ($scope.game.turn() === 'b') {
            moveColor = 'Black';
        }

        // checkmate?
        if ($scope.game.in_checkmate() === true) {
            status = 'Game over, ' + moveColor + ' is in checkmate.';
        }

        // draw?
        else if ($scope.game.in_draw() === true) {
            status = 'Game over, drawn position';
        }

        // game still on
        else {
            status = moveColor + ' to move';

            // check?
            if ($scope.game.in_check() === true) {
                status += ', ' + moveColor + ' is in check';
            }
        }

        $scope.statusEl = status;
        $scope.fenEl = $scope.fen;
        $scope.pgnEl = $scope.pgn;
        $scope.isStatus = false;
        $scope.setStatus(status);
        
    };
    $scope.setStatus = function (status) {
        console.log(status);
        $scope.isStatus = true;
        $scope.status = status;
        

    };
    var cfg = {
        draggable: true,
        position: 'start',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd
    };
    $scope.board = ChessBoard('board', cfg);

    $scope.updateStatus();
    
}
