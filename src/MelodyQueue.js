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
        if (this.autopause > 0) {
            this.enqueuePause(this.autopause);
        }
        let sampleLimit = this.getLimit(tones);
        this.combiningTonesAndPushToQueue(tones, sampleLimit);

    }

    combiningTonesAndPushToQueue(tones, sampleLimit) {
        for (let sample = 0; sample < sampleLimit; ++sample) {
            let sound = tones[0][sample];
            for (let toneIndex = 1; toneIndex < tones.length; ++toneIndex) {
                let newSound = tones[toneIndex][sample];
                sound = 2 * (sound + newSound) - sound * newSound / SILENCE - SILENCE * 2;
            }
            sound = this.transformSound(sound, sample, sampleLimit)
            this.queue.push(sound);
        }
    }

    transformSound(sound, sample, sampleLimit) {
        let withoutOffsetSound = sound - SILENCE;
        let time = sample / sampleLimit;
        let amplitude = this.getAmplitudeToTransform(time);

        return (withoutOffsetSound * amplitude) + SILENCE;
    }

    getAmplitudeToTransform(time, stop) {
        if (time < 0.05) { return time / 0.05; }
        if (time < 0.5) { return time / -0.8725 + 1.071; }
        if (time < 1.0) { return time / -2.0 + 0.75; }
        return 0;
    }

    getLimit(tones) {
		let limit = tones[0].length;
		for (let j = 1; j < tones.length; ++j) {
			if (tones[j].length < limit) {
				limit = tones[j].length;
			}
		}
        return limit;
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
