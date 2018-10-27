const durations = require('../src/durations.js');
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

// test('getNotesArray(["A4"]) should returns note("A4")', () => {
//     let notes = MelodyGenerator.getNotesArray(['A4']);
//     expect(notes).toEqual([note('A4')]);
// });

// test('getNotesArray(["A4", "B4"]) should returns A4 and B4 notes', () => {
//     let notes = MelodyGenerator.getNotesArray(['A4', 'B4']);
//     expect(notes).toEqual([note('A4'), note('B4')]);
// });

// test('MelodyGenerator.fromString("note(A4, Q)") should plays note(A4, Q)', () => {
//     MelodyGenerator.fromString('note(A4, Q)');
//     let melodyQueue = MelodyQueue.mock.instances[0];
//     (
//         expect(melodyQueue.enqueueTone)
//         .toHaveBeenCalledWith(durations.Q, note('A4'))
//     );
// });

test('MelodyGenerator.parseLine("play note(C4, H)") should return C4 and H', () => {
    let result = MelodyGenerator.parseLine('note(C4, H)');
    expect(result[0][0]).toEqual("H");
    expect(result[0][1]).toEqual("C4");
});

test('MelodyGenerator.parseLine("play note(G4, Q) | note(E4, Q) | note(E4, Q)") should return G4 and Q, E4 and Q, E4 and Q', () => {
    let result = MelodyGenerator.parseLine('play note(G4, Q) | note(E4, Q) | note(E4, Q)');
    expect(result[0][0]).toEqual("Q");
    expect(result[0][1]).toEqual("G4");
    expect(result[1][0]).toEqual("Q");
    expect(result[1][1]).toEqual("E4");
    expect(result[2][0]).toEqual("Q");
    expect(result[2][1]).toEqual("E4");
});

test('MelodyGenerator.parseLine("play repeat 3 times note(G4, Q)") should return G4 and Q, G4 and Q, G4 and Q', () => {
    let result = MelodyGenerator.parseLine('play repeat 3 times note(G4, Q)');
    expect(result[0][0]).toEqual("Q");
    expect(result[0][1]).toEqual("G4");
    expect(result[1][0]).toEqual("Q");
    expect(result[1][1]).toEqual("G4");
    expect(result[2][0]).toEqual("Q");
    expect(result[2][1]).toEqual("G4");
});

test('MelodyGenerator.parseLine("play repeat 3 times noteA") should return HT, C4 and E,...', () => {
    MelodyGenerator.parseLine('define noteA is pause(HT) | note(C4, E)');
    let result = MelodyGenerator.parseLine('play repeat 3 times noteA');
    expect(result[0][0]).toEqual("HT");
    expect(result[1][0]).toEqual("E");
    expect(result[1][1]).toEqual("C4");
    expect(result[2][0]).toEqual("HT");
    expect(result[3][0]).toEqual("E");
    expect(result[3][1]).toEqual("C4");
    expect(result[4][0]).toEqual("HT");
    expect(result[5][0]).toEqual("E");
    expect(result[5][1]).toEqual("C4");
});
