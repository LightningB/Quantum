"use strict";

var Player = function () {

    var player = function (game, name) {

        this.name = name != undefined ? setName(name) : "Player";
        this.ships = {}
        this.game = game
    }

    player.prototype.setName = function (name) {

        this.name = name;

    }

    player.prototype.moveShip = function (ship_index, position) {
        
        this.game.moveShip(ships[ship_index], position)

    }

    return {
        create: function () {
            return new player();
        }
    }
}();
