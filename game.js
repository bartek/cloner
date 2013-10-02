var gamejs = require('gamejs'),
    TileMap = require('./tilemap').TileMap,
    extend = gamejs.utils.objects.extend;

var imgfy = function(imgPath) {
    return gamejs.image.load(imgPath);
};

var Player = function() {
    Player.superConstructor.apply(this, arguments);
};
extend(Player, gamejs.sprite.Sprite);

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
    this.player.update(dt);
};
