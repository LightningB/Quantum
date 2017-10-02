"use strict";

var Painter = function () {
	var exports = {}


	var squareSize = 50
	var tileSeparation = 10
	var innerSquarePadding = 1

	var tileColours = ['rgb(30, 144, 255)', 'rgb(0, 191, 255)']

	var ship_pixel_padding = 6



	exports.drawSquare = function (position, colour) {

		ctx.fillStyle = colour
        ctx.fillRect(position[0], position[1], squareSize, squareSize)

	}

	exports.drawTile = function (position) {

		for(var i = 0; i < 3; i++) {

            for(var j = 0; j < 3; j++) {

				var tilePixelPosition = [(squareSize*3 /*tileWidth*/ + /*padding*/tileSeparation)*position[0], (squareSize*3+tileSeparation)*position[1]]

				var spacePosition = [tilePixelPosition[0] + i, tilePixelPosition[1] + j]
				var spacePixelPosition = [tilePixelPosition[0] + i*squareSize, tilePixelPosition[1] + j*squareSize]

                var colour = tileColours[(position[0] + position[1])%2]
                Painter.drawSquare(spacePixelPosition, colour)

                if((i+j)%2 === 1) {

                    ctx.strokeStyle = 'rgb(255,255,255)'
                    ctx.lineWidth = 2
                    ctx.strokeRect(spacePixelPosition[0] + 5, spacePixelPosition[1] + 5, 40, 40)

                }
                if(i === 1 && j === 1){
                    Painter.drawImage('images/minimalist planet.jpg', tilePixelPosition[0]+i*squareSize, tilePixelPosition[1]+j*squareSize, 2, squareSize, squareSize)
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

	// might not be necessary, haven't decided whether ships should draw themselves yet (probably not though)
	exports.drawShip = function (position) {

		// add the padding for the ship size
		position = [position[0] + ship_pixel_padding, position[1] + ship_pixel_padding]
	}

	exports.drawBoard = function (n, m) {

        for(var i = 0; i < n; i++) {

            for(var j = 0; j < m; j++) {

                Painter.drawTile([i, j])

            }
        }
    }

	return exports

}();
