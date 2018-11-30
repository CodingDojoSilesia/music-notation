const durations = require('./durations.js');
const MelodyQueue = require('./MelodyQueue.js');
const waveGenerator = require('./WaveGenerator.js');
const StringParser = require('./StringParser');
const note = require('./note.js');

class MelodyGenerator {
  fromString(melodyString) {
    const serializer = new StringParser(melodyString);
    const steps = serializer.getSteps();
    let melody = new MelodyQueue();
    steps.forEach(step => {
      if (step.notes) {
        melody.enqueueTone(durations[step.duration], step.notes.length > 1 ? this.getNotesArray(step.notes) : note(step.notes[0]));
      } else {
        melody.enqueuePause(durations[step.duration])
      }
    });
    return melody;
  }

  getNotesArray(notes) {
    return notes.map((n) => note(n));
  }
}

module.exports = new MelodyGenerator();
