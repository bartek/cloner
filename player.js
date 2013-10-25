var gamejs = require('gamejs'),
    extend = gamejs.utils.objects.extend,
    input = require('gramework').input,
    Actor = require('gramework').actors.Actor;

var imgfy = function(imgPath) {
    return gamejs.image.load(imgPath);
};

// TODO: Move.
var globals = {
    BOX2D_SCALE: 1.0
};

var Player = exports.Player = function() {
    Player.superConstructor.apply(this, arguments);
    this.image = imgfy(conf.Images.player);
    this.controller = new input.GameController();
    this.speed = 5000; // 10,000 is pretty quick.
};
extend(Player, Actor);

Player.prototype.update = function(dt) {
    Actor.prototype.update.call(this, dt);

    this.angle = this.controller.angle();
    if (typeof this.angle !== "undefined") {
        var pos = this.moveUnit(dt);
        this.rect.x = pos.x;
        this.rect.y = pos.y;
    }
};

Player.prototype.moveUnit = function(dt) {
    // TODO: Silly naming. Fix.
    this.body.body.ApplyForce(this.velVector, this.body.body.GetWorldCenter());
    this.body.body.SetLinearDamping(1.5);

    this.velVector.x = Math.cos(this.angle) * this.speed * (dt / 1000);

    var x = (this.body.body.GetPosition().x * globals.BOX2D_SCALE) - this.image.getSize()[0] * 0.5;
    var y = (this.body.body.GetPosition().y * globals.BOX2D_SCALE) - this.image.getSize()[1] * 0.5;
    return {x: x, y: y};
};


Player.prototype.event = function(ev) {
    this.controller.handle(ev);
};
