var gamejs = require('gamejs');
var config = require('../config');

exports.Director = function() {
	var onAir = false;
	var currentScene = null;
	this.nextScene = null;

	function tick(msDuration) {
		if (!onAir) return;

		gamejs.event.get().forEach(function(event){
			currentScene.handleEvent(event);
		});
        if (msDuration > 1000/30) {
            msDuration = 1000/30;
        }

		currentScene.update(msDuration);
		currentScene.draw(display);		
		return;
	};

	this.start = function(scene) {
		onAir = true;
		this.replaceScene(scene);
		return;
	};

	this.replaceScene = function(scene) {
        currentScene = scene;
    };

    this.getScene = function() {
        return currentScene;
    };

    this.setNext = function(nextScene) {
    	this.nextScene = nextScene;
    }

    this.startNext = function() {
    	this.start(this.nextScene);
    }

    var display = this.display = gamejs.display.setMode([config.WIDTH * config.SCALE, config.HEIGHT * config.SCALE], gamejs.display.DISABLE_SMOOTHING);
    //var display = gamejs.display.setMode([config.WIDTH * config.SCALE, config.HEIGHT * config.SCALE]);
	if (config.DEBUG) {
	}
	
    gamejs.time.fpsCallback(tick, this, 60);
    return this;
};
