/*
 * BMP wyznacza liczbę uderzeń w ciągu minuty, wraz z metrum pozwala wyliczyć liczbę nut, półnut, ćwierćnut w ciągu
 * minuty, jak również długość taktu. Zastosowano popularne metrum 4/4.
 */
global.BMP = 120;
global.SamplingFrequency = 44100;
global.N = 60 / global.BMP * 4; // Czas trwania nuty w sekundach
global.H = global.N / 2; // Czas trwania półnuty w sekundach
global.Q = global.N / 4; // Czas trwania ćwierćnuty w sekundach
global.E = global.N / 8; // Czas trwania ósemki w sekundach
global.S = global.N / 16; // Czas trwania szesnastki w sekundach
/*
 * Założono częstotliwość próbkowania równą 44100 Hz, co oznacza, że każda sekunda odpowiada tablicy 
 * N bitowych integer-ów oraz 8-bitowy rozmiar, który wyznacza głośność dzwięku.
 */

const MelodyQueue = require('./src/MelodyQueue.js');
const WaveGenerator = require('./src/WaveGenerator.js');
const note = require('./src/note.js');

/*
 * `parse` powinno zwracać `MelodyQueue`.
 */
//WaveGenerator.save('./song1.wav', parse(fs.readFileSync('./songs/song1.txt', 'utf8')));
//WaveGenerator.save('./song2.wav', parse(fs.readFileSync('./songs/song2.txt', 'utf8')));
//WaveGenerator.save('./song3.wav', parse(fs.readFileSync('./songs/song3.txt', 'utf8')));

/*
let melody1 = new MelodyQueue();
melody1.enqueueTone(global.Q, note('G4'));
melody1.enqueueTone(global.Q, note('E4'));
melody1.enqueueTone(global.Q, note('E4'));
melody1.enqueueTone(global.Q, note('F4'));
melody1.enqueueTone(global.Q, note('D4'));
melody1.enqueueTone(global.Q, note('D4'));
melody1.enqueueTone(global.E, note('C4'));
melody1.enqueueTone(global.E, note('E4'));
melody1.enqueueTone(global.E, note('G4'));
WaveGenerator.save('./kotek.wav', melody1);

let melody2 = new MelodyQueue();
melody2.enqueueTone(global.H, note('C4'));
melody2.enqueueTone(global.H, note('G4'));
melody2.enqueueTone(global.E, note('F4'));
melody2.enqueueTone(global.E, note('E4'));
melody2.enqueueTone(global.E, note('D4'));
melody2.enqueueTone(global.H, note('C5'));
melody2.enqueueTone(global.H, note('G4'));
melody2.enqueueTone(global.E, note('F4'));
melody2.enqueueTone(global.E, note('E4'));
melody2.enqueueTone(global.E, note('D4'));
melody2.enqueueTone(global.H, note('C5'));
melody2.enqueueTone(global.H, note('G4'));
melody2.enqueueTone(global.E, note('F4'));
melody2.enqueueTone(global.E, note('E4'));
melody2.enqueueTone(global.E, note('F4'));
melody2.enqueueTone(global.H, note('D4'));
WaveGenerator.save('./starwars.wav', melody2);
*/