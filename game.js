"use strict";

var Game = function () {


	var ShipEnum = {
                        RED:'rgb(255,0,0)',
                        BLUE:'rgb(0,0,255)',
                        GREEN:'rgb(0,255,0)',
                        ORANGE:'rgb(255,165,0)',
                        EMPTY:'rgba(0,0,0,0)'
                    }

	var game = function () {

		this.board = this.createBoard(3,3)
		this.ships = []

	}

	game.prototype.convertPosToPixelPos = function(position) {
		return [position[0]*squareSize + tileSeparation*Math.floor(this.position[0]/3), 
					position[1]*squareSize + tileSeparation*Math.floor(this.position[1]/3)]
	}

	//0 is empty, 
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

	game.drawTile = function (position) {
		var pixel_position = convertPosToPixelPos(position)
		Painter.drawTile(pixel_position)
	}

	game.drawShip = function (position) {
		var pixel_position = convertPosToPixelPos(position)
		Painter.drawShip(pixel_position)
	}



	 return {
        create: function () {
            
            return new game();
            
        }
    }

}();