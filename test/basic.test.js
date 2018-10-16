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

test('parse("play note(A4, Q)")', () => {
    const data = MelodyGenerator.parse('play note(A4, Q)');
    expect(data).toEqual({
        type: 'play',
        elements: [
            {type: 'note', notes: ['A4'], time: 'Q'}
        ]
    });
});

test('parse("note(A4;B4;C4, Q)")', () => {
    const data = MelodyGenerator.parse('play note(A4;B4;C4, Q)');
    expect(data).toEqual({
        type: 'play',
        elements: [
            {type: 'note', notes: ['A4','B4','C4'], time: 'Q'}
        ]
    });
});

test('parse("note(A4, Q) | note(B4, H)")', () => {
    const data = MelodyGenerator.parse('play note(A4, Q) | note(B4, H)');
    expect(data).toEqual({
        type: 'play',
        elements: [
            {type: 'note', notes: ['A4'], time: 'Q'},
            {type: 'note', notes: ['B4'], time: 'H'}
        ]
    });
});

test('parse("foo")', () => {
    const data = MelodyGenerator.parse('play foo');
    expect(data).toEqual({
        type: 'play',
        elements: [
            {type: 'function', name: 'foo'}
        ]
    });
});

test('parse("note(A4, Q) | foo")', () => {
    const data = MelodyGenerator.parse('play note(A4, Q) | foo');
    expect(data).toEqual({
        type: 'play',
        elements: [
            {type: 'note', notes: ['A4'], time: 'Q'},
            {type: 'function', name: 'foo'}
        ]
    });
});

test('parse("pause(Q) | note(A4, H)")', () => {
    const data = MelodyGenerator.parse('play pause(Q) | note(A4, H)')
    expect(data).toEqual({
        type: 'play',
        elements: [
            {type: 'pause', time: 'Q'},
            {type: 'note', notes: ['A4'], time: 'H'}
        ]
    })
});

test('parse("repeat 3 times note(C4, Q) | foobar")', () => {
    const data = MelodyGenerator.parse('play repeat 3 times note(C4, Q) | foobar')
    expect(data).toEqual({
        type: 'play',
        elements: [
            {
                type: 'repeat',
                times: 3,
                body: {type: 'note', notes: ['C4'], time: 'Q'}
            },
            {type: 'function', name: 'foobar'}
        ]
    });
});

test('parse("define socek is note(A4, Q) | foobar")', () => {
    const data = MelodyGenerator.parse('define socek is note(A4, Q) | foobar')
    expect(data).toEqual({
        type: 'define',
        name: 'socek',
        elements: [
            {type: 'note', notes: ['A4'], time: 'Q'},
            {type: 'function', name: 'foobar'}
        ]
    });
})
