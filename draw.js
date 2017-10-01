"use strict";

var Painter = function () {
	var exports = {}


	var tileColours = ['rgb(30, 144, 255)', 'rgb(0, 191, 255)']

	var ship_pixel_padding = 6



	exports.drawSquare = function (position, colour) {

		ctx.fillStyle = colour
        ctx.fillRect(position[0], position[1], spaceSize, spaceSize)
    
	}

	exports.drawTile = function (position) {



	}

	exports.drawShip = function (position) {

		// add the padding for the ship size
		position = [position[0] + ship_pixel_padding, position[1] + ship_pixel_padding]
	}

	return exports

}();