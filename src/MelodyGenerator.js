require('./globals.js');
const MelodyQueue = require('./MelodyQueue.js');
const waveGenerator = require('./WaveGenerator.js');
const note = require('./note.js');

class MelodyGenerator
{
    fromString(melodyString) {
        // put your code here
        let melody = new MelodyQueue();
        melody.enqueueTone(global.Q, [note('A4')]);
    }

    getNotesArray(notes) {
        return notes.map((n) => note(n));
    }
}

module.exports = new MelodyGenerator();
