var gamejs = require('gamejs'),
    conf = require('./conf'),
    TileMap = require('./gramework/tilemap').TileMap,
    Actor = require('./gramework/actors').Actor,
    extend = gamejs.utils.objects.extend;

var imgfy = function(imgPath) {
    return gamejs.image.load(imgPath);
};

var Player = function() {
    Player.superConstructor.apply(this, arguments);
    this.image = imgfy(conf.Images.player);
};
extend(Player, Actor);

// Container for the entire game.
var Game = exports.Game = function() {
    this.paused = false;
    this.player = new Player(this);
    this.map = new TileMap('./images/maps/tutorial.tmx');
};

Game.prototype.draw = function(surface) {
    this.map.draw(surface);
    this.player.draw(surface);
};

Game.prototype.update = function(dt) {
    //this.player.update(dt);
};
