const tone = require('tonegenerator');
const SAMPLING_FREQUENCY = 44100;
const SILENCE = 128;

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
			}).map(val => val + SILENCE));
        }
		let volume = this.queue.length > 0 ? this.queue[this.queue.length - 1] : 0;
		for (let i = 0; i < SAMPLING_FREQUENCY * this.autopause; ++i) {
			if (volume > SILENCE) {
				volume--;
			} else if (volume < SILENCE) {
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
                sound = 2 * (sound + tones[j][i]) - sound * tones[j][i] / SILENCE - SILENCE * 2;
            }
            this.queue.push(sound);
        }
    }
    enqueuePause(duration) {
		let volume = this.queue.length > 0 ? this.queue[this.queue.length - 1] : 0;
        for (let i = 0; i < SAMPLING_FREQUENCY * duration; ++i) {
			if (volume > SILENCE) {
				volume--;
			} else if (volume < SILENCE) {
				volume++;
			}
            this.queue.push(volume);
        }
    }
}

module.exports = MelodyQueue;
