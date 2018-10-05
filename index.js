/*
 * BMP wyznacza liczbę uderzeń w ciągu minuty, wraz z metrum pozwala wyliczyć liczbę nut, półnut, ćwierćnut w ciągu
 * minuty, jak również długość taktu. Zastosowano popularne metrum 4/4.
 */
global.BMP = 120;
global.SamplingFrequency = 44100;
global.N = 60 / global.BMP * 4; // Czas trwania nuty w sekundach
global.N2 = global.N * 2; // Czas trwania dwóch nut
global.N3 = global.N * 3; // Czas trwania trzech nut
global.N4 = global.N * 5; // Czas trwania pieciu nut
global.H = global.N / 2; // Czas trwania półnuty w sekundach
global.Q = global.N / 4; // Czas trwania ćwierćnuty w sekundach
global.E = global.N / 8; // Czas trwania ósemki w sekundach
global.S = global.N / 16; // Czas trwania szesnastki w sekundach
global.T = global.N / 32; // Czas trwania trzydziestkidwójki w sekundach
global.HT = global.N / 64; // Czas trwania sześćdziesięcioczwórki w sekundach
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

let melody3 = new MelodyQueue(global.HT);
melody3.setAutoPause(global.HT);
melody3.enqueueTone(global.E, note('C4'));
melody3.enqueueTone(global.E, note('C4'));
melody3.enqueueTone(global.E, note('C4'));
melody3.enqueueTone(global.E, note('C4'));
melody3.enqueueTone(global.E, note('C4'));
melody3.enqueueTone(global.E, note('C4'));
melody3.enqueueTone(global.E, note('C4'));
melody3.enqueueTone(global.E, note('C4'), note('E4'));
melody3.enqueueTone(global.E, note('C4'));
melody3.enqueueTone(global.E, note('C4'));
melody3.enqueueTone(global.E, note('C4'));
melody3.enqueueTone(global.E, note('C4'), note('E4'));
melody3.enqueueTone(global.E, note('C4'), note('E4'));
melody3.enqueueTone(global.E, note('C4'), note('E4'));
melody3.enqueueTone(global.E, note('C4'), note('E4'));
melody3.enqueueTone(global.E, note('C4'), note('E4'));
melody3.enqueueTone(global.E, note('C4'), note('E4'));
melody3.enqueueTone(global.E, note('C4'), note('E4'));
melody3.enqueueTone(global.E, note('C4'), note('E4'), note('G4'));
melody3.enqueueTone(global.E, note('C4'), note('E4'));
melody3.enqueueTone(global.E, note('C4'), note('E4'));
melody3.enqueueTone(global.E, note('C4'), note('E4'));
for (let i = 0; i < 14; ++i) {
	melody3.enqueueTone(i == 7 ? global.H : global.E, [note('B3'), note('D4'), note('E4')]);
}
melody3.setAutoPause(0);
melody3.enqueuePause(global.T);
melody3.enqueueTone(global.Q, note('E4'));
melody3.enqueueTone(global.Q, note('G4'));
melody3.enqueueTone(global.H, note('A4'));
melody3.enqueuePause(global.HT);
melody3.enqueueTone(global.Q, note('A4'));
melody3.enqueueTone(global.Q, note('B4'));
melody3.enqueueTone(global.H, note('E4'));
melody3.enqueuePause(global.HT);
melody3.enqueueTone(global.Q, note('E4'));
melody3.enqueueTone(global.Q, note('G4'));
melody3.enqueueTone(global.H, note('A4'));
melody3.enqueuePause(global.HT);
melody3.enqueueTone(global.Q, note('A4'));
melody3.enqueueTone(global.Q, note('B4'));
melody3.enqueueTone(global.H, note('E4'));
melody3.enqueuePause(global.HT);
melody3.enqueueTone(global.E, note('D4'));
melody3.enqueueTone(global.E, note('C4'));
melody3.enqueueTone(global.E, note('D4'));
melody3.enqueueTone(global.E, note('C4'));
melody3.enqueueTone(global.E, note('D4'));
melody3.enqueueTone(global.H, note('E4'));
melody3.setAutoPause(global.HT);
melody3.enqueueTone(global.E, note('C4'));
melody3.enqueueTone(global.E, [note('B3'), note('C4')]);
melody3.enqueueTone(global.E, [note('B3'), note('C4')]);
melody3.enqueueTone(global.E, [note('A3'), note('C4')]);
melody3.enqueueTone(global.E, [note('A3'), note('C4')]);
melody3.enqueueTone(global.E, [note('G3'), note('C4')]);
melody3.enqueueTone(global.E, [note('C4'), note('F4')]);
melody3.enqueueTone(global.H, [note('B3'), note('E4')]);
WaveGenerator.save('./rocky.wav', melody3);
*/
