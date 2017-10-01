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


    Board.drawBoard(3,3)

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

var Board = function () {

    var exports = {}

    exports.drawSpace = function(colour, position) {

        ctx.fillStyle = colour
        ctx.fillRect(position[0], position[1], squareSize, squareSize)
    
    }

    exports.drawTile = function(tilePosition) {


        for(var i = 0; i < 3; i++) {

            for(var j = 0; j < 3; j++) {

                    var tilePixelPosition = [(squareSize*3 /*tileWidth*/ + /*padding*/tileSeparation)*tilePosition[0], (squareSize*3+tileSeparation)*tilePosition[1]]

                    var spacePosition = [tilePixelPosition[0] + i, tilePixelPosition[1] + j]
                    var spacePixelPosition = [tilePixelPosition[0] + i*squareSize, tilePixelPosition[1] + j*squareSize]

                    var colour = tileColours[(tilePosition[0] + tilePosition[1])%2]
                    this.drawSpace(colour, spacePixelPosition)

                if((i+j)%2 === 1) {

                    ctx.strokeStyle = 'rgb(255,255,255)'
                    ctx.lineWidth = 2
                    ctx.strokeRect(spacePixelPosition[0] + 5, spacePixelPosition[1] + 5, 40, 40)

                } 
                if(i === 1 && j === 1){
                    this.drawImage('images/minimalist planet.jpg', tilePixelPosition[0]+i*squareSize, tilePixelPosition[1]+j*squareSize, 2, squareSize, squareSize)
                }
            }
        }
    }

    exports.drawImage = function(image_src, X, Y, divisor, scaleX, scaleY) {
        var img = new Image();
        img.onload = function() {
            //            imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight
            ctx.drawImage(
                img, 
                (img.naturalWidth - img.naturalWidth/divisor)/2, 
                (img.naturalHeight - img.naturalHeight/divisor)/2, 
                img.naturalWidth/divisor, 
                img.naturalHeight/divisor, 
                X, 
                Y, 
                scaleX,
                scaleY)

        }
        img.src = image_src
    }

    exports.drawBoard = function (n, m) {
        var i;
        for(i = 0; i < n; i++) {
            var j;
            for(j = 0; j < m; j++) {
                //Board.drawTile((squareSize*3 /*tileWidth*/ + /*padding*/tileSeparation)*i, (squareSize*3+tileSeparation)*j)
                Board.drawTile([i, j])
            }
        }
    }

    return exports
}();

var Inputs = function () {

    var exports = {}

    var margin = 8      //the default margin/padding around the canvas in chrome
    exports.isInside = function (x, y, destX, destY, width, height) {
        return (x-margin >= destX && x-margin <= destX+width
                    && y-margin >= destY && y-margin <= destY+height)
    }

    return exports
}();
