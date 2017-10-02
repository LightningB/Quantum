"use strict";

var Painter = function () {
	var exports = {}


	var squareSize = 50
	var tileSeparation = 10
	var innerSquarePadding = 1

	var colours = ['rgb(30, 144, 255)', 'rgb(0, 191, 255)']

	var ship_pixel_padding = 6



	exports.drawSquare = function (position, orthogonal) {

		if(orthogonal) {

			ctx.fillStyle = colours[1]
			ctx.fillRect(position[0], position[1], squareSize, squareSize)

			ctx.strokeStyle = 'rgb(255,255,255)'
			ctx.lineWidth = 2
			ctx.strokeRect(position[0] + 5, position[1] + 5, 40, 40)

		} else {

			ctx.fillStyle = colours[0]
			ctx.fillRect(position[0], position[1], squareSize, squareSize)

		}


	}

	exports.drawSquareByBoardPosition = function (position) {

		var pixelPosition = [(squareSize)*position[0] + Math.floor((position[0]/3))*tileSeparation,
								(squareSize)*position[1] + Math.floor((position[1]/3))*tileSeparation]

		var colour = tileColours[(position[0] + position[1])%2]

		Painter.drawSquare(pixelPosition, Painter.isOrthogonal(position))

	}

	exports.getTileFromPosition = function (position) {

		var tileX = (position[0] - Math.floor(position[0]%squaresInTile))
		var tileY = (position[1] - Math.floor(position[1]%squaresInTile))

		return [tileX, tileY]

	}

	exports.drawTile = function (position) {

		for(var i = 0; i < 3; i++) {

            for(var j = 0; j < 3; j++) {

				var tilePixelPosition = [(squareSize*3 /*tileWidth*/ + /*padding*/tileSeparation)*position[0], (squareSize*3+tileSeparation)*position[1]]

				var squarePosition = [tilePixelPosition[0] + i, tilePixelPosition[1] + j]
				var squarePixelPosition = [tilePixelPosition[0] + i*squareSize, tilePixelPosition[1] + j*squareSize]

                Painter.drawSquare(squarePixelPosition, (i+j)%2 === 1)

                if(i === 1 && j === 1){
                    Painter.drawImage('images/minimalist planet.jpg', squarePixelPosition[0], squarePixelPosition[1], 2, squareSize, squareSize)
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

	exports.drawShips = function (game) {

		for(var i = 0; i < game.ships.length; i++) {
			game.ships[i].draw()
		}

	}

	exports.drawBoard = function (game) {

        for(var i = 0; i < game.board.length; i++) {

            for(var j = 0; j < game.board[i].length; j++) {

                Painter.drawTile([i, j])

            }
        }

		Painter.drawShips(game)
    }

	exports.isOrthogonal = function (position) {

		var X = ((position[0] - Painter.getTileFromPosition(position)[0]))
		var Y = ((position[1] - Painter.getTileFromPosition(position)[1]))

		return (Math.abs(X-Y) === 1)

	}

	return exports

}();
