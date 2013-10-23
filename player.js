var gamejs = require('gamejs'),
    extend = gamejs.utils.objects.extend,
    Actor = require('gramework').actors.Actor;

var imgfy = function(imgPath) {
    return gamejs.image.load(imgPath);
};

var Player = exports.Player = function() {
    Player.superConstructor.apply(this, arguments);
    this.image = imgfy(conf.Images.player);
};
extend(Player, Actor);