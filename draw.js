"use strict";

var Painter = function () {
	var exports = {}


	var squareSize = 50
	var tileSeparation = 10
	var innerSquarePadding = 1

	var tileColours = ['rgb(30, 144, 255)', 'rgb(0, 191, 255)']

	var ship_pixel_padding = 6



	exports.drawSquare = function (position, colour, orthogonal) {

		ctx.fillStyle = colour
        ctx.fillRect(position[0], position[1], squareSize, squareSize)

		if(orthogonal) {

			ctx.strokeStyle = 'rgb(255,255,255)'
			ctx.lineWidth = 2
			ctx.strokeRect(position[0] + 5, position[1] + 5, 40, 40)

		}

	}

	exports.drawSquareByBoardPosition = function (position) {

		var pixelPosition = [(squareSize)*position[0] + Math.floor((position[0]/3))*tileSeparation,
								(squareSize)*position[1] + Math.floor((position[1]/3))*tileSeparation]

		var colour = tileColours[(position[0] + position[1])%2]

		Painter.drawSquare(pixelPosition, colour)

	}

	exports.drawTile = function (position) {

		for(var i = 0; i < 3; i++) {

            for(var j = 0; j < 3; j++) {

				var tilePixelPosition = [(squareSize*3 /*tileWidth*/ + /*padding*/tileSeparation)*position[0], (squareSize*3+tileSeparation)*position[1]]

				var squarePosition = [tilePixelPosition[0] + i, tilePixelPosition[1] + j]
				var squarePixelPosition = [tilePixelPosition[0] + i*squareSize, tilePixelPosition[1] + j*squareSize]

                var colour = tileColours[(position[0] + position[1])%2]
                Painter.drawSquare(squarePixelPosition, colour, (i+j)%2 === 1)

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
