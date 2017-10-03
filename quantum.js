"use strict";


var ctx;
var canvas;

var DirectionEnum = {
                        UP:1,
                        DOWN:2,
                        LEFT:3,
                        RIGHT:4,
                        NONE:0
                    }

var ShipEnum = {
                    RED:'rgb(255,0,0)',
                    BLUE:'rgb(0,0,255)',
                    GREEN:'rgb(0,255,0)',
                    ORANGE:'rgb(255,165,0)',
                    EMPTY:'rgba(0,0,0,0)'
                }

$(document).ready(function(){

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');


    var game = Game.create(3, 3)
    console.log(game.board)

    // game.addShips([Ship.create(ross.colour, [4,5], 3)
    //                 Ship.create(ShipEnum.RED, [0,0], 5),
    //                 Ship.create(ShipEnum.BLUE, [5,2], 1),
    //                 Ship.create(ShipEnum.ORANGE, [2,7], 2),
    //                 Ship.create(ShipEnum.GREEN, [0,5], 4),
                    
    //             ])

    Inputs.initialiseShipMovementArrows(game)

    var elliot = Player.create(game,"Elliot", ShipEnum.GREEN)
    elliot.addShips( [ elliot.createShip( [7,8], 6), elliot.createShip( [0,5], 4) ] )

    var ross = Player.create(game,"Ross", ShipEnum.RED)
    ross.addShips( [ ross.createShip( [4,5], 3 ), ross.createShip( [0,0], 5) ])

    var brandon = Player.create(game,"Brandon", ShipEnum.BLUE)
    brandon.addShips( [ brandon.createShip([5,2], 1) ] )

    var will = Player.create(game,"Will", ShipEnum.ORANGE)
    will.addShips( [ will.createShip( [2,7], 2 ) ] )


    game.addPlayer(elliot)
    game.addPlayer(ross)
    game.addPlayer(brandon)
    game.addPlayer(will)

    console.log(game)

    Painter.drawBoard(game)





});
