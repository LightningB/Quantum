"use strict";

var Utilities = function () {

    var exports = {}

    exports.isOrthogonal = function (position) {

        var X = ((position[0] - Painter.getTileOriginFromPosition(position)[0]))
        var Y = ((position[1] - Painter.getTileOriginFromPosition(position)[1]))

        return (Math.abs(X-Y) === 1)

    }

    exports.isPlanet = function (position) {

        var tileOrigin = Painter.getTileOriginFromPosition(position)

        return (position[0] == tileOrigin[0]+1 && position[1] == tileOrigin[1]+1)

    }


    exports.isInBounds = function (position, xlimit, ylimit) {

        var x = position[0]
        var y = position[1]

        var x0 = x >= 0 
        var xlim = x < xlimit 
        var y0 = y >= 0 
        var ylim = y < ylimit

        return x0 && xlim && y0 && ylim

    }

    
    exports.calculateShipPixelPosition = function (ship) {

        return [ship.position[0]*squareSize + (squareSize - innerSquareSize)/2 + squareSize/50 + tileSeparation*Math.floor(ship.position[0]/3),
                                    ship.position[1]*squareSize + (squareSize - innerSquareSize)/2 + squareSize/50 + tileSeparation*Math.floor(ship.position[1]/3)]
    
    }

    return exports

}();