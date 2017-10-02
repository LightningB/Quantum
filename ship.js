"use strict";

var Ship = function () {

    var arrowPoint = 17
    var arrowSize = 7
    var paddingSize = 2
    var shipSize = 38

    var ship = function (colour, position, type) {
        this.type = type
        this.position = position //2 length int array
        this.calculate_pixel_position()
        this.colour = colour
    }

    ship.prototype.calculate_pixel_position = function () {
         this.pixel_position = [this.position[0]*squareSize + 6 + tileSeparation*Math.floor(this.position[0]/3),
                                    this.position[1]*squareSize + 6 + tileSeparation*Math.floor(this.position[1]/3)]
    }

    ship.prototype.move = function (position) {

        //also test for centre tile spaces (planets)

        Painter.drawSquareByBoardPosition(this.position)

        this.position = position;
        this.calculate_pixel_position()
        Painter.drawShip(this)


    }

    ship.prototype.reconfigure = function () {
        this.type = Math.floor((Math.random() * 6) + 1);
    }

    ship.prototype.combatRoll = function () {
        return Math.floor((Math.random() * 6) + 1);
    }

    ship.prototype.isArrow = function (x,y) {

        if(Inputs.isInside(x,y,this.pixel_position[0] + (shipSize/2 - arrowSize), this.pixel_position[1] + paddingSize, arrowSize*2, arrowSize)) {
            return DirectionEnum.UP
        }
        else if(Inputs.isInside(x,y,this.pixel_position[0] + (shipSize/2 - arrowSize), this.pixel_position[1] + (shipSize - paddingSize - arrowSize), arrowSize*2, arrowSize)) {
            return DirectionEnum.DOWN
        }
        else if(Inputs.isInside(x,y,this.pixel_position[0] + paddingSize, this.pixel_position[1] + (shipSize/2 - arrowSize), arrowSize, arrowSize*2)) {
            return DirectionEnum.LEFT
        }
        else if(Inputs.isInside(x,y,this.pixel_position[0] + (shipSize - paddingSize - arrowSize) ,this.pixel_position[1] + (shipSize/2 - arrowSize), arrowSize, arrowSize*2)) {
            return DirectionEnum.RIGHT
        } else {
            return DirectionEnum.NONE
        }
    }


    return {
        create: function (colour, position, type) {

            return new ship(colour, position, type);

        }
    }
}();
