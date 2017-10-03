"use strict";

var squareSize = 100
var tileSeparation = squareSize/5
var innerSquareSize = 4/5 * squareSize

var colours = ['rgb(30, 144, 255)', 'rgb(0, 191, 255)']

var arrowPoint = squareSize/3
var arrowSize = squareSize/7
var shipSize = innerSquareSize - (2*squareSize/50)
var numberSeparation = squareSize/5


var Painter = function () {
	var exports = {}


	exports.drawSquare = function (position, orthogonal) {

		if(orthogonal) {

			ctx.fillStyle = colours[1]
			ctx.fillRect(position[0], position[1], squareSize, squareSize)

			ctx.strokeStyle = 'rgb(255,255,255)'
			ctx.lineWidth = 2
			ctx.strokeRect(position[0] + (squareSize - innerSquareSize)/2, position[1] + (squareSize - innerSquareSize)/2, innerSquareSize, innerSquareSize)

		} else {

			ctx.fillStyle = colours[0]
			ctx.fillRect(position[0], position[1], squareSize, squareSize)

		}


	}

	exports.drawSquareByBoardPosition = function (position) {

		var pixelPosition = [(squareSize)*position[0] + Math.floor((position[0]/3))*tileSeparation,
								(squareSize)*position[1] + Math.floor((position[1]/3))*tileSeparation]


		Painter.drawSquare(pixelPosition, Painter.isOrthogonal(position))

	}

	exports.getTileOriginFromPosition = function (position) {

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


    exports.drawNumbers = function (ship) {

    	var pixel_position = Utilities.calculateShipPixelPosition(ship)
    	
        ctx.save()
        ctx.translate(pixel_position[0] + shipSize/2 /*ship centre offset*/,
            pixel_position[1] + shipSize/2)

        ctx.fillStyle = 'rgb(255,255,255)'
        ctx.beginPath()

        if(ship.type%2 === 1) {
            ctx.arc(0, 0, numberSeparation/3, 0*Math.PI,2*Math.PI)

            if(ship.type >= 3) {
            	ctx.moveTo(-numberSeparation, numberSeparation)
                ctx.arc(-numberSeparation, numberSeparation, numberSeparation/3, 0*Math.PI,2*Math.PI)
                ctx.moveTo(numberSeparation, -numberSeparation)
                ctx.arc(numberSeparation, -numberSeparation, numberSeparation/3, 0*Math.PI,2*Math.PI)
                if(ship.type >= 5) {
                    ctx.moveTo(-numberSeparation,-numberSeparation)
                    ctx.arc(-numberSeparation, -numberSeparation, numberSeparation/3, 0*Math.PI,2*Math.PI)
                    ctx.moveTo(numberSeparation,numberSeparation)
                    ctx.arc(numberSeparation, numberSeparation, numberSeparation/3, 0*Math.PI,2*Math.PI)

                }
            }
        } else {
          ctx.moveTo(-numberSeparation, numberSeparation)
          ctx.arc(-numberSeparation, numberSeparation, numberSeparation/3, 0*Math.PI,2*Math.PI)
          ctx.moveTo(numberSeparation,-numberSeparation)
          ctx.arc(numberSeparation,-numberSeparation, numberSeparation/3, 0*Math.PI,2*Math.PI)

          if(ship.type >= 4) {
            ctx.moveTo(-numberSeparation, -numberSeparation)
            ctx.arc(-numberSeparation, -numberSeparation, numberSeparation/3, 0*Math.PI,2*Math.PI)
            ctx.moveTo(numberSeparation,numberSeparation)
            ctx.arc(numberSeparation,numberSeparation, numberSeparation/3, 0*Math.PI,2*Math.PI)
          }
          if(ship.type === 6) {
            ctx.moveTo(numberSeparation, 0)
            ctx.arc(numberSeparation, 0, numberSeparation/3, 0*Math.PI,2*Math.PI)
            ctx.moveTo(-numberSeparation,0)
            ctx.arc(-numberSeparation, 0, numberSeparation/3, 0*Math.PI,2*Math.PI)
          }

        }

        ctx.fill()
        ctx.restore()
    }

    exports.drawArrows = function (ship, colour) {

    	var pixel_position = Utilities.calculateShipPixelPosition(ship)

        ctx.save()
        ctx.translate(pixel_position[0] + shipSize/2 /*ship centre offset*/,
            pixel_position[1] + shipSize/2)

        if(colour === undefined) { colour = 'rgba(0,0,0,0.5)'}

        ctx.fillStyle = colour
        ctx.beginPath()

        ctx.moveTo(-arrowPoint,0)
        ctx.lineTo(-(arrowPoint-arrowSize),arrowSize)
        ctx.lineTo(-(arrowPoint-arrowSize),-arrowSize)
        ctx.lineTo(-arrowPoint,0)

        ctx.moveTo(arrowPoint,0)
        ctx.lineTo((arrowPoint-arrowSize),arrowSize)
        ctx.lineTo((arrowPoint-arrowSize),-arrowSize)
        ctx.lineTo(arrowPoint,0)

        ctx.moveTo(0,-arrowPoint)
        ctx.lineTo(arrowSize,-(arrowPoint-arrowSize))
        ctx.lineTo(-arrowSize,-(arrowPoint-arrowSize))
        ctx.lineTo(0,-arrowPoint)

        ctx.moveTo(0,arrowPoint)
        ctx.lineTo(arrowSize,(arrowPoint-arrowSize))
        ctx.lineTo(-arrowSize,(arrowPoint-arrowSize))
        ctx.lineTo(0,arrowPoint)


        ctx.fill()
        ctx.restore()
    }


    exports.drawShip = function (ship) {

    	var pixel_position = Utilities.calculateShipPixelPosition(ship)

		ctx.fillStyle = ship.colour
	    ctx.fillRect(pixel_position[0], pixel_position[1], shipSize, shipSize)
	    
	    Painter.drawNumbers(ship)
	    Painter.drawArrows(ship)

    }

	exports.drawShips = function (game) {

		for(var i = 0; i < game.ships.length; i++) {
			Painter.drawShip(game.ships[i])
		}


        console.log("here")
        for(var k = 0; k < game.players.length; k++) {

           var player = game.players[k]

           for(var j = 0; j < player.ships.length; j++) {

                console.log("drawing player ship")
                Painter.drawShip(player.ships[j])

           }
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

		var X = ((position[0] - Painter.getTileOriginFromPosition(position)[0]))
		var Y = ((position[1] - Painter.getTileOriginFromPosition(position)[1]))

		return (Math.abs(X-Y) === 1)

	}

	return exports

}();
