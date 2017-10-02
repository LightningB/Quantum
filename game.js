"use strict";

var squaresInTile = 3

var Game = function () {

	var ShipEnum = {
                        RED:'rgb(255,0,0)',
                        BLUE:'rgb(0,0,255)',
                        GREEN:'rgb(0,255,0)',
                        ORANGE:'rgb(255,165,0)',
                        EMPTY:'rgba(0,0,0,0)'
                    }

	var game = function (N, M) {

		this.xlimit = N*3
		this.ylimit = M*3
		this.board = this.createBoard(N, M)
		this.ships = []

	}

	game.prototype.convertPosToPixelPos = function(position) {
		return [position[0]*squareSize + tileSeparation*Math.floor(this.position[0]/3),
					position[1]*squareSize + tileSeparation*Math.floor(this.position[1]/3)]
	}

	game.prototype.createBoard = function (N,M) {

		var board = []

		for(var i = 0; i < N; i++) {

			board.push([])

			for(var j = 0; j < M; j++) {

				board[i].push([ShipEnum.EMPTY,ShipEnum.EMPTY,ShipEnum.EMPTY])

			}

		}

		return board
	}

	game.prototype.drawBoard = function () {

		for(var i = 0; i < N; i++) {

			var tileRow = board[i]

			for(var j = 0; j < M; j++) {

				var tile = tileRow[j]


			}
		}
	}

	// game.prototype.drawTile = function (position) {
	// 	var pixel_position = convertPosToPixelPos(position)
	// 	Painter.drawTile(pixel_position)
	// }

	game.prototype.addShips = function (ships) {

		for(var i = 0; i < ships.length; i++) {
			this.ships.push(ships[i])
		}

	}

	game.prototype.moveShip = function (ship, position) {

		if(this.isInBounds(position)) {

			if(!this.isPlanet(position)) {

				ship.move(position)

			} else {

				console.log("can't move into planet")

			}

		} else {

				console.log("can't move out of bounds")

			}

	}

	game.prototype.isInBounds = function (position) {

		var x = position[0]
		var y = position[1]

        var x0 = x >= 0 
        var xlim = x < this.xlimit 
        var y0 = y >= 0 
        var ylim = y < this.ylimit

        return x0 && xlim && y0 && ylim

    }

    game.prototype.isPlanet = function (position) {

    	var tileOrigin = Painter.getTileOriginFromPosition(position)

        return (position[0] == tileOrigin[0]+1 && position[1] == tileOrigin[1]+1)

    }

	return {
        create: function (N, M) {

            return new game(N, M);

        }
    }

}();
