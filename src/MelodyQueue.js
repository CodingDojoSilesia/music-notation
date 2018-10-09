const tone = require('tonegenerator');

const silence = 128;

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
			}).map(val => val + silence));
        }
		let volume = this.queue.length > 0 ? this.queue[this.queue.length - 1] : 0;
		for (let i = 0; i < global.SamplingFrequency * this.autopause; ++i) {
			if (volume > silence) {
				volume--;
			} else if (volume < silence) {
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
                sound = 2 * (sound + tones[j][i]) - sound * tones[j][i] / silence - silence * 2;
            }
            this.queue.push(sound);
        }
    }
    enqueuePause(duration) {
		let volume = this.queue.length > 0 ? this.queue[this.queue.length - 1] : 0;
        for (let i = 0; i < global.SamplingFrequency * duration; ++i) {
			if (volume > silence) {
				volume--;
			} else if (volume < silence) {
				volume++;
			}
            this.queue.push(volume);
        }
    }
}

module.exports = MelodyQueue;