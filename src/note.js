/**
 * Wartości pochodzą z:
 * https://pages.mtu.edu/~suits/notefreqs.html
 * środkowe C to C4
 */


let frequencies = {};
const baseFrequency = 440;
const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
let offset = (-notes.length * 8) / 2 - 9;
for (let i = 0; i <= 8; ++i) {
	for (let j = 0; j < notes.length; ++j) {
		frequencies[notes[j] + i] = baseFrequency * Math.pow(1.059463094359, offset++);
	}
}

module.exports = function (note) {
    return frequencies[note];
};
