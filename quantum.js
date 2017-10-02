"use strict";


var ctx;
var canvas;

var DirectionEnum = {
                        UP:1,
                        DOWN:2,
                        LEFT:3,
                        RIGHT:4,
                        NONE:0
                    }

var squareSize = 50
var tileSeparation = 10
var innerSquarePadding = 1

var tileColours = ['rgb(30, 144, 255)', 'rgb(0, 191, 255)']


$(document).ready(function(){

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');


    var game = Game.create(3, 3)
    console.log("game created")
    console.log(game.board)

    game.addShips([
                    Ship.create('rgb(255,0,0)', [0,0], 5),
                    Ship.create('rgb(255,0,0)', [4,5], 3),
                    Ship.create('rgb(255,0,0)', [3,2], 1),
                    Ship.create('rgb(255,0,0)', [2,1], 2),
                    Ship.create('rgb(255,0,0)', [0,5], 4),
                    Ship.create('rgb(255,0,0)', [7,8], 6)
                ])

    Painter.drawBoard(game)
    Inputs.initialiseShipMovementArrows(game)




});


var Inputs = function () {

    var exports = {}

    var margin = 8      //the default margin/padding around the canvas in chrome
    exports.isInside = function (x, y, destX, destY, width, height) {
        return (x-margin >= destX && x-margin <= destX+width
                    && y-margin >= destY && y-margin <= destY+height)
    }

    exports.initialiseShipMovementArrows = function (game) {

        canvas.addEventListener('mousedown', function (e) {

            var i
            for(i = 0; i < game.ships.length; i++) {    //1 should be 6, just testing
                var curr = game.ships[i]
                if(Inputs.isInside(e.clientX, e.clientY, curr.pixel_position[0], curr.pixel_position[1], 38, 38)) {
                    switch (curr.isArrow(e.clientX, e.clientY)) {

                        case DirectionEnum.UP:
                            //console.log("UP");
                            curr.move([curr.position[0], curr.position[1]-1]);
                            break;

                        case DirectionEnum.DOWN:
                            //console.log("DOWN");
                            curr.move([curr.position[0], curr.position[1]+1]);
                            break;

                        case DirectionEnum.LEFT:
                            //console.log("LEFT");
                            curr.move([curr.position[0]-1, curr.position[1]]);
                            break;

                       case DirectionEnum.RIGHT:
                            //console.log("RIGHT");
                            curr.move([curr.position[0]+1, curr.position[1]]);
                            break;

                        case DirectionEnum.NONE:
                            //console.log("NONE");
                    }
                }
            }
        })

    }

    return exports
}();
