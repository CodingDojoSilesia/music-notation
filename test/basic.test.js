require('../src/globals.js');
const MelodyQueue = require('../src/MelodyQueue.js');
const waveGenerator = require('../src/WaveGenerator.js');
const MelodyGenerator = require('../src/MelodyGenerator.js');
const note = require('../src/note.js');

const assert = require('chai').assert;
// https://www.chaijs.com/api/assert/
const sinon = require('sinon');
// https://sinonjs.org/releases/v6.3.4/spies/
// https://sinonjs.org/

describe('MelodyGenerator.getNotesArray', () => {
    it('getNotesArray(["A4"]) should returns note("A4")', () => {
        let notes = MelodyGenerator.getNotesArray(['A4']);
        assert.deepEqual(notes, [note('A4')]);
    });

    it('getNotesArray(["A4", "B4"]) should returns A4 and B4 notes', () => {
        let notes = MelodyGenerator.getNotesArray(['A4', 'B4']);
        assert.deepEqual(notes, [note('A4'), note('B4')]);
    });
});

describe('MelodyGenerator.fromString', () => {
    let enqueueTone = null;
    beforeEach(() => {
        enqueueTone = sinon.spy(MelodyQueue.prototype, 'enqueueTone');
    });

    after(() => {
        MelodyQueue.prototype.enqueueTone.restore();
    })

    it('should plays note(A4, Q)', () => {
        MelodyGenerator.fromString('note(A4, Q)');
        assert(
            enqueueTone.calledWith(global.Q, [note('A4')])
        );
    });
});
