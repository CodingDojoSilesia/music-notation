/*
 * BMP wyznacza liczbę uderzeń w ciągu minuty, wraz z metrum pozwala wyliczyć liczbę nut, półnut, ćwierćnut w ciągu
 * minuty, jak również długość taktu. Zastosowano popularne metrum 4/4.
 */
global.BMP = 120;
global.N = 60 / global.BMP * 4; // Czas trwania nuty w sekundach
global.H = global.N / 2; // Czas trwania półnuty w sekundach
global.Q = global.N / 4; // Czas trwania ćwierćnuty w sekundach
global.E = global.N / 8; // Czas trwania ósemki w sekundach
/*
 * Założono częstotliwość próbkowania równą 44100 Hz, co oznacza, że każda sekunda odpowiada tablicy 
 * N bitowych integer-ów oraz 8-bitowy rozmiar, który wyznacza głośność dzwięku.
 */

const MelodyQueue = require('./src/MelodyQueue.js');
const WaveGenerator = require('./src/WaveGenerator.js');
const note = require('./src/note.js');

let melody = new MelodyQueue();
melody.enqueue(global.Q, note('G4'));
melody.enqueue(global.Q, note('E4'));
melody.enqueue(global.Q, note('E4'));
melody.enqueue(global.Q, note('F4'));
melody.enqueue(global.Q, note('D4'));
melody.enqueue(global.Q, note('D4'));
melody.enqueue(global.Q, note('C4'));
melody.enqueue(global.Q, note('E4'));
melody.enqueue(global.Q, note('G4'));

WaveGenerator.save('./test.wav', melody);
