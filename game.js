var gamejs = require('gamejs'),
    conf = require('./conf'),
    TileMap = require('gramework').tilemap.TileMap,
    extend = gamejs.utils.objects.extend,
    scenes = require('gramework').scenes,
    player = require('./player');
    Physics = require('gramework').physics.Physics;

// Container for the entire game.
var Game = exports.Game = function() {
    this.paused = false;
    this.physics = new Physics();
    this.player = new player.Player({
        physics: this.physics,
        scale: 1,
        height: 32,
        width: 32,
        x:25,
        y:25,
        spriteSheet: [conf.Images.player, {height:32, width:32}],
        animations: {
            'static': [0]
        }
    });
    this.scene = new scenes.Scene({width:800,height:600});
    this.scene.pushActor(this.player);
    this.map = new TileMap('./images/maps/tutorial.tmx');
    this.scene.pushLayer(this.map);
};

Game.prototype.draw = function(surface) {
    this.scene.draw(surface);
};

Game.prototype.update = function(dt) {
    this.physics.step(dt / 1000);
    this.scene.update(dt);
};
