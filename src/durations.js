const BMP = 120; // determines beats per minute
const METRUM = 4; // with metrum and BMP we can compute duration of note
const N = 60 / BMP * METRUM;

module.exports = {
    N: N, // time of one note
    N2: N * 2, // two notes
    N3: N * 3, // three notes
    N4: N * 4, // four notes
    H: N / 2, // half note
    Q: N / 4, // quarter note
    E: N / 8, // one eighth note
    S: N / 16, // one sixteenth note
    T: N / 32, // one thirty-second note
    HT: N / 64 // one sixty-fourth note
};

