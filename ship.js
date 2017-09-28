"use strict";

var Ship = function () {

    var arrowPoint = 17
    var arrowSize = 7

    var ship = function (colour, position, type) {
        this.type = type
        this.position = position //2 length int array
        this.pixel_position = [position[0]*50 + 6 + 20*Math.floor(position[0]/3),
                                position[1]*50 + 6 + 20*Math.floor(position[1]/3)]
        this.colour = colour
    }

    ship.prototype.move = function (position) {

        Board.drawTile(this.position[0], this.position[1])
        this.position = position;
        this.pixel_position = [this.position[0]*50 + 6 + 20*Math.floor(this.position[0]/3),
                                this.position[1]*50 + 6 + 20*Math.floor(this.position[1]/3)]
        this.draw()

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

    ship.prototype.drawArrows = function () {
        ctx.save()
        ctx.translate(this.pixel_position[0] + 19 /*ship centre offset*/,
            this.pixel_position[1] + 19)

        ctx.fillStyle = 'rgba(0,0,0,0.5)'
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
        ctx.fillRect(this.pixel_position[0], this.pixel_position[1], 38, 38)
        this.drawNumbers()
        this.drawArrows()

        // ctx.fillStyle = 'rgba(0,255,0,0.5)'
        // ctx.fillRect(this.pixel_position[0], this.pixel_position[1], 38, 38)

    }

    ship.prototype.isArrow = function (x,y) {

        if(Inputs.isInside(x,y,this.pixel_position[0] + 11,this.pixel_position[1] + 2,14,7)) {
             return DirectionEnum.UP
        }
        else if(Inputs.isInside(x,y,this.pixel_position[0] + 11,this.pixel_position[1] + 29,14,7)) {
             return DirectionEnum.DOWN
        }
        else if(Inputs.isInside(x,y,this.pixel_position[0] + 2,this.pixel_position[1] + 11,7,14)) {
             return DirectionEnum.LEFT
        }
        else if(Inputs.isInside(x,y,this.pixel_position[0] + 29,this.pixel_position[1] + 11,7,14)) {
             return DirectionEnum.RIGHT
        } else {
            return DirectionEnum.NONE
        }
    }

    ship.prototype.initialiseArrows = function () {

        canvas.addEventListener('mousedown', function (e) {

            var i
            for(i = 0; i < 6; i++) {
                var curr = ships[i]
                if(Inputs.isInside(e.clientX, e.clientY, curr.pixel_position[0], curr.pixel_position[1], 38, 38)) {
                    switch (curr.isArrow()) {
                        case DirectionEnum.UP: console.log("UP"); break;
                        case DirectionEnum.DOWN: console.log("DOWN"); break;
                        case DirectionEnum.LEFT: console.log("LEFT"); break;
                        case DirectionEnum.RIGHT: console.log("RIGHT"); break;
                        case DirectionEnum.NONE: console.log("NONE"); break;
                    }

                    console.log("x: " + e.clientX + " y: " + e.clientY)
                    console.log("x-bounds: " + curr.pixel_position[0] + "-" + (curr.pixel_position[0]+38))
                    console.log("y-bounds: " + curr.pixel_position[1] + "-" + (curr.pixel_position[1]+38))

                }
            }
        })
    }

    return {
        create: function (colour, position, type) {
            
            var new_ship = new ship(colour, position, type);
            new_ship.draw()
            new_ship.initialiseArrows()
            
            return new_ship
        }
    }
}();
