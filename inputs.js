"use strict";

var Inputs = function () {

    var exports = {}

    var margin = 8      //the default margin/padding around the canvas in chrome
    exports.isInside = function (x, y, destX, destY, width, height) {
        return (x-margin >= destX && x-margin <= destX+width
                    && y-margin >= destY && y-margin <= destY+height)
    }

    exports.initialiseShipMovementArrows = function (game) {

        canvas.addEventListener('mousedown', function (e) {

            var i
            for(i = 0; i < game.ships.length; i++) {    //1 should be 6, just testing
                var curr = game.ships[i]

                var pixel_position = Utilities.calculateShipPixelPosition(curr)

                if(Inputs.isInside(e.clientX, e.clientY, pixel_position[0], pixel_position[1], shipSize, shipSize)) {
                    switch (Inputs.isArrow(e.clientX, e.clientY, curr)) {

                        case DirectionEnum.UP:
                            game.moveShip(curr, [curr.position[0], curr.position[1]-1]);
                            break;

                        case DirectionEnum.DOWN:
                            game.moveShip(curr, [curr.position[0], curr.position[1]+1]);
                            break;

                        case DirectionEnum.LEFT:
                            game.moveShip(curr, [curr.position[0]-1, curr.position[1]]);
                            break;

                       case DirectionEnum.RIGHT:
                            game.moveShip(curr, [curr.position[0]+1, curr.position[1]]);
                            break;

                        case DirectionEnum.NONE:
                    }
                }
            }
        })

    }

    exports.isArrow = function (x,y, ship) {

        var pixel_position = Utilities.calculateShipPixelPosition(ship)

        var arrowPadding = (shipSize)/2 - arrowPoint

        if(Inputs.isInside(x,y - arrowPadding,pixel_position[0] + (shipSize/2 - arrowSize), pixel_position[1], arrowSize*2, arrowSize)) {
            return DirectionEnum.UP
        }
        else if(Inputs.isInside(x,y + arrowPadding,pixel_position[0] + (shipSize/2 - arrowSize), pixel_position[1] + (shipSize - arrowSize), arrowSize*2, arrowSize)) {
            return DirectionEnum.DOWN
        }
        else if(Inputs.isInside(x - arrowPadding,y,pixel_position[0], pixel_position[1] + (shipSize/2 - arrowSize), arrowSize, arrowSize*2)) {
            return DirectionEnum.LEFT
        }
        else if(Inputs.isInside(x + arrowPadding,y,pixel_position[0] + (shipSize - arrowSize) ,pixel_position[1] + (shipSize/2 - arrowSize), arrowSize, arrowSize*2)) {
            return DirectionEnum.RIGHT
        } else {
            return DirectionEnum.NONE
        }
    }

    return exports
}();