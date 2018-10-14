require('../src/globals.js');
const MelodyQueue = require('../src/MelodyQueue.js');
const waveGenerator = require('../src/WaveGenerator.js');
const MelodyGenerator = require('../src/MelodyGenerator.js');
const note = require('../src/note.js');

// https://jestjs.io/docs/en/using-matchers
// https://jestjs.io/docs/en/es6-class-mocks

jest.mock('../src/MelodyQueue.js');

beforeEach(() => {
    MelodyQueue.mockClear();
});

test('getNotesArray(["A4"]) should returns note("A4")', () => {
    let notes = MelodyGenerator.getNotesArray(['A4']);
    expect(notes).toEqual([note('A4')]);
});

test('getNotesArray(["A4", "B4"]) should returns A4 and B4 notes', () => {
    let notes = MelodyGenerator.getNotesArray(['A4', 'B4']);
    expect(notes).toEqual([note('A4'), note('B4')]);
});
/*
    MelodyGenerator.fromString('note(A4, Q)');
    let melodyQueue = MelodyQueue.mock.instances[0];
    (
        expect(melodyQueue.enqueueTone)
        .toHaveBeenCalledWith(global.Q, [note('A4')])
    );
*/

test('parse("note(A4, Q)")', () => {
    let data = MelodyGenerator.parse('note(A4, Q)');
    expect(data).toEqual({
        type: 'music',
        elements: [
            {type: 'note', notes: ['A4'], time: 'Q'}
        ]
    });
});

test('parse("note(A4;B4;C4, Q)")', () => {
    let data = MelodyGenerator.parse('note(A4;B4;C4, Q)');
    expect(data).toEqual({
        type: 'music',
        elements: [
            {type: 'note', notes: ['A4','B4','C4'], time: 'Q'}
        ]
    });
});
