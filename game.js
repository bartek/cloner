var gamejs = require('gamejs'),
    extend = gamejs.utils.objects.extend;
var Actor = require('./gramework/actors').Actor();

var Player = function() {
    Player.superConstructor.apply(this, arguments);
};
extend(Player, Actor);

// Container for the entire game.
var Game = exports.Game = function() {
    this.paused = false;
    this.player = new Player(this);
};
