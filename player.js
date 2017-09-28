"use strict";

var Player = function () {

    var player = function () {
        this.name = "";
        this.ships = {}
    }

    player.prototype.setName = function (name) {
        this.name = name;
    }

    player.prototype.move = function (ship_index, position) {
        //gets ship and makes it move
    }

    return {
        create: function () {
            return new player();
        }
    }
}();
