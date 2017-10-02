"use strict";

var squaresInTile = 3

var Game = function () {

	var game = function (N, M) {

		this.xlimit = N*3
		this.ylimit = M*3
		this.board = this.createBoard(N, M)

		this.players = []
		this.ships = []

		//Painter.drawBoard(this)

	}

	game.prototype.createBoard = function (N,M) {

		var board = []

		for(var i = 0; i < N; i++) {

			board.push([])

			for(var j = 0; j < M; j++) {

				board[i].push([Tile.create([i,j])])

			}

		}

		return board
	}

	game.prototype.addShips = function (ships) {

		for(var i = 0; i < ships.length; i++) {
			this.ships.push(ships[i])
		}

	}

	game.prototype.moveShip = function (ship, position) {

		if(Utilities.isInBounds(position, this.xlimit, this.ylimit)) {

			if(!Utilities.isPlanet(position)) {

				ship.move(position)

			} else {

				console.log("can't move into planet")

			}

		} else {

				console.log("can't move out of bounds")

			}

	}

	return {
        create: function (N, M) {

            return new game(N, M);

        }
    }

}();
