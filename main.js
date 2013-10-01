var gamejs = require('gamejs'),
    Dispatcher = require('./dispatcher').Dispatcher,
    Game = require('./game').Game;
    conf = require('./conf');

var main = function() {
    var dispatch = new Dispatcher();
    var game = new Game();
    dispatch.push(game);

    var mainSurface = gamejs.display.getSurface();
    gamejs.display.setMode([800, 600]);

    gamejs.onTick(function(dt) {
        dispatch.update(dt);
        dispatch.draw(mainSurface);
    }, this, conf.globals.fps);

    gamejs.onEvent(function(ev) {
        dispatch.event(ev);
    });
};

var images = Object.keys(conf.Images).map(function(img) {
    return conf.Images[img];
});
gamejs.preload(images);
gamejs.ready(main);
