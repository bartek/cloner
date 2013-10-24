var gamejs = require('gamejs'),
    conf = require('./conf'),
    TileMap = require('gramework').tilemap.TileMap,
    extend = gamejs.utils.objects.extend,
    scenes = require('gramework').scenes,
    player = require('./player');

// Container for the entire game.
var Game = exports.Game = function() {
    this.paused = false;

    this.scene = new scenes.Scene({width:800,height:600,physics:true});
    this.player = new player.Player({
        scale: 1,
        height: 32,
        width: 32,
        x:200,
        y:25,
        spriteSheet: [conf.Images.player, {height:32, width:32}],
        animations: {
            'static': [0]
        }
    });
    this.scene.pushActor(this.player);
    this.map = new TileMap('./images/maps/tutorial.tmx', this.scene.physics.world);
    this.scene.pushLayer(this.map);
    this.scene.camera.follow(this.player);
};

Game.prototype.draw = function(surface) {
    this.scene.draw(surface);
};

Game.prototype.event = function(ev) {
    this.scene.event(ev);
};

Game.prototype.update = function(dt) {
    this.scene.update(dt);
};
