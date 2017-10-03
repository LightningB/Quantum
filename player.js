"use strict";

var Player = function () {

    var player = function (game, name, colour) {

       (name != undefined) ? this.setName(name) : "Player";
        this.ships = []
        this.game = game
        this.colour = colour
    }



    player.prototype.setName = function (name) {

        this.name = name;

    }

    player.prototype.moveShip = function (ship_index, position) {
        
        this.game.moveShip(ships[ship_index], position)

    }

    player.prototype.createShip = function (position, type) {

        return Ship.create(this.colour, position, type)

    }

    player.prototype.addShips = function (ships) {

        for(var i = 0; i < ships.length; i++) {

            this.ships.push(ships[i])

        }

    }



    return {
        create: function (game, name, colour) {
            return new player(game, name, colour);
        }
    }
}();
