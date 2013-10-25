var gamejs = require('gamejs'),
    conf = require('./conf'),
    TileMap = require('gramework').tilemap.TileMap,
    extend = gamejs.utils.objects.extend,
    scenes = require('gramework').scenes,
    Physics = require('gramework').physics.Physics,
    player = require('./player');

// Container for the entire game.
var Game = exports.Game = function() {
    this.paused = false;

    this.scene = new scenes.Scene({
        width:800,
        height:600
    });
    this.physics = new Physics({
        element: document.getElementById('gjs-canvas'),
        gravity: 20,
        debug: false
    });

    this.player = new player.Player({
        scale: 1,
        height: 32,
        width: 32,
        x:290,
        y:250,
        spriteSheet: [conf.Images.player, {height:32, width:32}],
        animations: {
            'static': [0]
        }
    });
    this.player.setPhysics(this.physics);
    this.scene.pushActor(this.player);
    this.map = new TileMap('./images/maps/tutorial.tmx', this.physics.world);
    this.scene.pushLayer(this.map);
    this.scene.camera.follow(this.player);
};

Game.prototype.draw = function(surface) {
    this.scene.draw(surface);
    this.physics.draw(surface);
};

Game.prototype.event = function(ev) {
    this.scene.event(ev);
    this.player.event(ev);
};

Game.prototype.update = function(dt) {
    this.scene.update(dt);
    this.physics.update(dt);
};
