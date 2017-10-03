"use strict";

var Tile = function () {

	var tile = function (position, planetImage) {

		this.position = position
		this.squares = this.createSquares()
		this.planetImage = (planetImage != undefined) ? planetImage : 'images/minimalist planet.jpg';

	}

	tile.prototype.createSquares = function () {

		var tile = []

		for(var i = 0; i < 3; i++) {

			tile.push([])

			for(var j = 0; j < 3; j++) {

				tile[i].push(Square.create( [ this.position[0]+i, this.position[1]+j ] ))

			}

		}

		return tile

	}

	return {
		create: function (position) {

			return new tile(position)

		}
	}

}();