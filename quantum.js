"use strict";


var ctx;
var canvas;

$(document).ready(function(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    console.log(ctx)

    // Board.drawTile(0,0)
    // Board.drawTile(170,0)
    Board.drawBoard(3,3)
    //Board.drawImage('images/earth_flag.png')
    var player = Player.create()
    var ship1 = Ship.create('rgb(255,0,0)', [0,0], 5)
    var ship2 = Ship.create('rgb(255,0,0)', [4,5], 3)
    var ship3 = Ship.create('rgb(255,0,0)', [3,2], 1)
    var ship4 = Ship.create('rgb(255,0,0)', [2,0], 2)
    var ship5 = Ship.create('rgb(255,0,0)', [0,5], 4)
    var ship6 = Ship.create('rgb(255,0,0)', [7,8], 6)

    ctx.fillStyle = 'rgba(255,0,0,0.5)'
    ctx.fillRect(500, 0, 100, 50)

    canvas.addEventListener('mousedown', function (e) {
        if(Inputs.isInside(e.clientX, e.clientY, 500, 0, 100, 50)) {
            ship6.move([ship6.position[0]-1, ship6.position[1]])
        }
    })
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

    exports.isInside = function (x, y, destX, destY, width, height) {
        return (e.clientX >= destX && e.clientX <= destX+width
                    && e.clientY >= destY && e.clientY <= destY+height)
    }

    return exports
}
