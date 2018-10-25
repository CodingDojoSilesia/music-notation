const durations = require('./durations.js');
const MelodyQueue = require('./MelodyQueue.js');
const parser = require('./MelodyParser.js');
const waveGenerator = require('./WaveGenerator.js');
const note = require('./note.js');

class MelodyGenerator {
    fromString(melodyString) {
        // put your code here


        let melody = new MelodyQueue();
        melody.enqueueTone(durations.Q, note('A4'));
 
        parser.parse(melodyString, melody);

        return melody;
    }

    getNotesArray(notes) {
        return notes.map((n) => note(n));
    }


}

module.exports = new MelodyGenerator(); 