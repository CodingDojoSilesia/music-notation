const frequenciesMap = {
    'C4': 261.63,
    'C#4': 277.18,
    'D4': 293.66,
    'D#4': 311.13,
    'E4': 329.63,
    'F4': 349.23,
    'F#4': 369.99,
    'G4': 392,
    'G#4': 415.3,
    'A4': 440,
    'A#4': 466.16,
    'B4': 493.88
};

module.exports = function (note) {
    return frequenciesMap[note];
};
