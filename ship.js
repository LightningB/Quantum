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

        if(position[0] >= 0 && position[0] < 9
                && position[1] >= 0 && position[1] < 9) {

            //also test for centre tile spaces (planets)

            Painter.drawSquareByBoardPosition(this.position)

            this.position = position;
            this.calculate_pixel_position()
            this.draw()

        }

    }

    ship.prototype.reconfigure = function () {
        this.type = Math.floor((Math.random() * 6) + 1);
    }

    ship.prototype.combatRoll = function () {
        return Math.floor((Math.random() * 6) + 1);
    }

    ship.prototype.drawNumbers = function () {

        ctx.save()
        ctx.translate(this.pixel_position[0] + 19 /*ship centre offset*/,
            this.pixel_position[1] + 19)

        ctx.fillStyle = 'rgb(255,255,255)'
        ctx.beginPath()

        if(this.type%2 === 1) {
            ctx.arc(0, 0, 3, 0*Math.PI,2*Math.PI)

            if(this.type >= 3) {
                ctx.arc(-9, 9, 3, 0*Math.PI,2*Math.PI)
                ctx.arc(9, -9, 3, 0*Math.PI,2*Math.PI)
                if(this.type >= 5) {
                    ctx.moveTo(-9,-9)
                    ctx.arc(-9, -9, 3, 0*Math.PI,2*Math.PI)
                    ctx.moveTo(9,9)
                    ctx.arc(9, 9, 3, 0*Math.PI,2*Math.PI)

                }
            }
        } else {
          ctx.moveTo(-9, 9)
          ctx.arc(-9, 9, 3, 0*Math.PI,2*Math.PI)
          ctx.moveTo(9,-9)
          ctx.arc(9,-9, 3, 0*Math.PI,2*Math.PI)

          if(this.type >= 4) {
            ctx.moveTo(-9, -9)
            ctx.arc(-9, -9, 3, 0*Math.PI,2*Math.PI)
            ctx.moveTo(9,9)
            ctx.arc(9,9, 3, 0*Math.PI,2*Math.PI)
          }
          if(this.type === 6) {
            ctx.moveTo(9, 0)
            ctx.arc(9, 0, 3, 0*Math.PI,2*Math.PI)
            ctx.moveTo(-9,0)
            ctx.arc(-9, 0, 3, 0*Math.PI,2*Math.PI)
          }

        }

        ctx.fill()
        ctx.restore()
    }

    ship.prototype.drawArrows = function (colour) {
        ctx.save()
        ctx.translate(this.pixel_position[0] + 19 /*ship centre offset*/,
            this.pixel_position[1] + 19)

        if(colour === undefined) { colour = 'rgba(0,0,0,0.5)'}

        ctx.fillStyle = colour
        ctx.beginPath()

        ctx.moveTo(-arrowPoint,0)
        ctx.lineTo(-(arrowPoint-arrowSize),arrowSize)
        ctx.lineTo(-(arrowPoint-arrowSize),-arrowSize)
        ctx.lineTo(-17,0)

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

    ship.prototype.draw = function () {

        ctx.fillStyle = this.colour
        ctx.fillRect(this.pixel_position[0], this.pixel_position[1], shipSize, shipSize)
        this.drawNumbers()
        this.drawArrows()

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
