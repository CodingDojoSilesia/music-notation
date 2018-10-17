const durations = require('./src/durations.js');
const MelodyQueue = require('./src/MelodyQueue.js');
const note = require('./src/note.js');

let melody = new MelodyQueue();

// play note(A4, Q)
melody.enqueueTone(durations.Q, [note('A4')]);

// play note(A4;C4, H) - generuj równocześnie ton A4 i C4 przez czas równy trwaniu półnuty
melody.enqueueTone(durations.H, [note('A4'), note('C4')]);

// play note(A4;C4;B4, H) - generuj równocześnie ton A4, C4 oraz B4 przez czas równy trwaniu półnuty
melody.enqueueTone(durations.H, [note('A4'), note('C4'), note('B4')]);

// play note(A4, Q) | note(C4, Q) - generuj ton A4 a zaraz po nim ton C4, sekwencja tonów
melody.enqueueTone(durations.Q, [note('A4')]);
melody.enqueueTone(durations.Q, [note('C4')]);

// play note(A4, Q) | foo - generuj ton A4 a zaraz po sekwencje tonów zapisanych po funkcją o nazwie foo
melody.enqueueTone(durations.Q, [note('A4')]);
FunnyFuncGetNotesFrom('FOO');

// play pause(Q) | note(A4, Q) - generuj ton A4 po czasie równym trwaniu ćwierćnuty
melody.enqueuePause(durations.Q);
melody.enqueueTone(durations.Q, [note('A4')]);

// play repeat 3 times note(C4,Q) - trzykrotnie generuj ton C4 przez czas równy trwaniu ćwierćnuty
for(let i=0; i < 3; i++) {
    melody.enqueueTone(durations.Q, [note('C4')]);
}

// define melody is note(E4,Q) | note(E4,Q) - funkcja (makro) o nazwie melody
melody.enqueueTone(durations.Q, [note('E4')]);
melody.enqueueTone(durations.Q, [note('E4')]);
