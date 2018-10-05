const tone = require('tonegenerator');

class MelodyQueue
{
    constructor(autopause = 0, shape = 'sine') {
		this.autopause = autopause;
		this.shape = shape;
        this.queue = [];
    }
	setAutoPause(duration) {
		this.autopause = duration;
	}
    enqueueTone(duration, ...frequencies) {
        let tones = [];
		if (Array.isArray(frequencies[0])) {
			frequencies = frequencies[0];
		}
        for (let frequency of frequencies) {
            tones.push(tone({
				freq: frequency,
				lengthInSecs: duration,
				volume: 30,
				rate: global.SamplingFrequency,
				shape: this.shape
			}));
        }
		for (let i = 0; i < global.SamplingFrequency * this.autopause; ++i) {
            this.queue.push(0);
        }
        for (let i = 0; i < tones[0].length; ++i) {
            let sound = tones[0][i];
            for (let j = 1; j < tones.length; ++j) {
                sound += tones[j][i];
            }
            this.queue.push(sound);
        }
    }
    enqueuePause(duration) {
        for (let i = 0; i < global.SamplingFrequency * duration; ++i) {
            this.queue.push(0);
        }
    }
	mix(melodyQueue) {
		let newMelodyQueue = new MelodyQueue();
		const limit = melodyQueue.queue.length > this.queue.length ? melodyQueue.queue.length : this.queue.length;
		for (let i = 0; i < limit; ++i) {
			let sound = 0;
			if (i < melodyQueue.queue.length) {
				sound += melodyQueue.queue[i];
			}
			if (i < this.queue.length) {
				sound += melodyQueue.queue[i];
			}
			newMelodyQueue.push(sound);
		}
		return newMelodyQueue;
	}
}

module.exports = MelodyQueue;