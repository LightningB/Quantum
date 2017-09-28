"use strict";

var Ship = function () {

    var ship = function (colour, position, type) {
        this.type = type
        this.position = position //2 length int array
        this.pixel_position = [position[0]*50 + 6 + 20*Math.floor(position[0]/3),
                                position[1]*50 + 6 + 20*Math.floor(position[1]/3)]
        this.colour = colour
    }

    ship.prototype.move = function (position) {

        Helpers.drawTile(this.position[0], this.position[1])
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

    ship.prototype.draw = function () {

        ctx.fillStyle = this.colour
        ctx.fillRect(this.pixel_position[0], this.pixel_position[1], 38, 38)
        this.drawNumbers()
    }

    return {
        create: function (colour, position, type) {
            var new_ship = new ship(colour, position, type);
            new_ship.draw()
            return new_ship
        }
    }
}();
