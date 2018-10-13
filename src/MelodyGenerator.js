require('./globals.js');
const MelodyQueue = require('./MelodyQueue.js');
const waveGenerator = require('./WaveGenerator.js');
const note = require('./note.js');

class MelodyGenerator {
    fromString(melodyString) {
        let lines = melodyString.split('\n');
        let objs = lines.map((line) => eval(line));
    }

    getNotesArray(notes) {
        return notes.map((n) => note(n));
    }

    eval(line) {
        let match = line.match(/note\(([\w;]+)\s*,\s*(\w)\)/);
        if (!match) {
            return;
        }

        return {
            type: 'music',
            elements: [
                {
                    type: 'note',
                    notes: match[1].split(/\s*;\s*/),
                    time: match[2]
                }
            ]
        };
    }
}

module.exports = new MelodyGenerator();
