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

$(document).ready(function(){

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');

    canvas.width = $(window).width()
    canvas.height = document.documentElement.clientHeight


    Board.drawBoard(3,3)

    ships = [
                    Ship.create('rgb(255,0,0)', [0,0], 5),
                    Ship.create('rgb(255,0,0)', [4,5], 3),
                    Ship.create('rgb(255,0,0)', [3,2], 1),
                    Ship.create('rgb(255,0,0)', [2,1], 2),
                    Ship.create('rgb(255,0,0)', [0,5], 4),
                    Ship.create('rgb(255,0,0)', [7,8], 6)
                ]
   
});

var Board = function () {

    var exports = {}

    exports.drawTile = function(x,y) {

        var colours = ['rgb(30, 144, 255)', 'rgb(0, 191, 255)']

        var i;
        for(i = 0; i < 3; i++) {

            var j;
            for(j = 0; j < 3; j++) {

                    ctx.fillStyle = colours[(i+j)%2]
                    ctx.fillRect(x+i*50, y+j*50, 50, 50)

                if(i !== 1 || j !== 1) {

                    ctx.strokeStyle = 'rgb(255,255,255)'
                    ctx.lineWidth = 2
                    ctx.strokeRect(x+i*50 + 5, y+j*50 + 5, 40, 40)

                } else {
                    this.drawImage('images/minimalist planet.jpg', x+i*50, y+j*50, 2, 50, 50)
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
                Board.drawTile((150 /*tileWidth*/ + /*padding*/20)*i, (150+20)*j)
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
