const tone = require('tonegenerator');

class MelodyQueue
{
    constructor() {
        this.queue = [];
    }
    enqueue(duration, ...sounds) {
        let tones = [];
        for (let sound of sounds) {
            tones.push(tone({ freq: sound, lengthInSecs: duration, volume: tone.MAX_8 }));
        }
        for (let i = 0; i < tones[0].length; ++i) {
            let sound = tones[0][i];
            for (let j = 1; j < tones.length; ++j) {
                sound += tones[j][i];
            }
            this.queue.push(sound);
        }
    }
    getQueue() {
        return this.queue;
    }
}

module.exports = MelodyQueue;