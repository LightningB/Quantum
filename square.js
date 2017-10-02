"use strict";

var Square = function () {

	var square = function (position) {

		this.position = position
		this.orthogonal = Utilities.isOrthogonal(position)
		this.planet = Utilities.isPlanet(position)
		this.ship = ShipEnum.EMPTY

	}

	square.prototype.containedShip = function () {

		return this.ship

	}

	return {
		create: function (position) {

			return new square(position)

		}
	}

}();