var gamejs = require('gamejs');

var playsound = exports.playsound = function(sound, loop) {
    var toLoop = loop || false;
    audio = new gamejs.mixer.Sound(sound);
    audio.play(toLoop);
    console.log(sound);
    console.log(toLoop);
};