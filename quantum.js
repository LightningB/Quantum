"use strict";


var ctx;
var canvas;
var ships;

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

    canvas.width = $(window).width()
    canvas.height = document.documentElement.clientHeight


    Painter.drawBoard(3,3)

    ships = [
                    Ship.create('rgb(255,0,0)', [0,0], 5),
                    /*Ship.create('rgb(255,0,0)', [4,5], 3),
                    Ship.create('rgb(255,0,0)', [3,2], 1),
                    Ship.create('rgb(255,0,0)', [2,1], 2),
                    Ship.create('rgb(255,0,0)', [0,5], 4),
                    Ship.create('rgb(255,0,0)', [7,8], 6)*/
                ]

    var game = Game.create()
    console.log("game created")
    console.log(game.board)

});


var Inputs = function () {

    var exports = {}

    var margin = 8      //the default margin/padding around the canvas in chrome
    exports.isInside = function (x, y, destX, destY, width, height) {
        return (x-margin >= destX && x-margin <= destX+width
                    && y-margin >= destY && y-margin <= destY+height)
    }

    return exports
}();
