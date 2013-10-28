var gamejs = require('gamejs'),
    conf = require('./conf'),
    TileMap = require('gramework').tilemap.TileMap,
    extend = gamejs.utils.objects.extend,
    scenes = require('gramework').scenes,
    Physics = require('gramework').physics.Physics,
    player = require('./player'),
    Emitter = require('gramework').particles.Emitter;

// Container for the entire game.
var Game = exports.Game = function() {
    this.paused = false;

    this.scene = new scenes.Scene({
        width:1600,
        height:1200
    });
    this.physics = new Physics({
        element: document.getElementById('gjs-canvas'),
        gravity: 9.8,
        debug: false
    });

    this.map = new TileMap('./images/maps/tutorial.tmx', this.physics.world);

    // Spawn points
    var spawns = this.map.tiles.filter(function(tile) {
        if (Object.keys(tile.properties).length === 0) return;
        if (tile.properties.spawn) return true;
    });

    // Starting point. Lame approach for now
    var start = spawns.filter(function(tile) {
        if (tile.properties.spawn === 'start') return true;
    })[0];

    // Setup player.
    // TODO: The Tile could provide additional functions to make getting x/y a
    // bit more clear. This also only incorporates the topleft of the tile, not
    // center.
    this.player = new player.Player({
        scale: 1,
        height: 32,
        width: 32,
        x: 250,
        y: 250,
        collisionRect: {width: 20, height:30},
        spriteSheet: [conf.Images.player, {height:32, width:32}],
        animations: {
            'static': [0]
        }
    });
    this.player.setPhysics(this.physics);
    this.scene.pushActor(this.player);

    this.scene.pushLayer(this.map);
    this.scene.camera.follow(this.player.realRect);
    this.emitter = new Emitter({x:250,y:250},{
        rate: 60,
        maxParticles: 100
    });
    this.scene.pushElement(this.emitter);
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
    if (dt > 1000 / 3) dt = 1000 / 3;
    this.scene.update(dt);
    this.physics.update(dt);
};
