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
		let volume = this.queue.length > 0 ? this.queue[this.queue.length - 1] : 0;
		for (let i = 0; i < global.SamplingFrequency * this.autopause; ++i) {
			if (volume > 0) {
				volume--;
			} else if (volume < 0) {
				volume++;
			}
            this.queue.push(volume);
        }
		let limit = tones[0].length;
		for (let j = 1; j < tones.length; ++j) {
			if (tones[j].length < limit) {
				limit = tones[j].length;
			}
		}
        for (let i = 0; i < limit; ++i) {
            let sound = tones[0][i];
            for (let j = 1; j < tones.length; ++j) {
                sound += tones[j][i];
            }
            this.queue.push(sound);
        }
    }
    enqueuePause(duration) {
		let volume = this.queue.length > 0 ? this.queue[this.queue.length - 1] : 0;
        for (let i = 0; i < global.SamplingFrequency * duration; ++i) {
			if (volume > 0) {
				volume--;
			} else if (volume < 0) {
				volume++;
			}
            this.queue.push(volume);
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