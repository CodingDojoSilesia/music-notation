const fs = require('fs');
require('./src/globals.js');
const MelodyQueue = require('./src/MelodyQueue.js');
const waveGenerator = require('./src/WaveGenerator.js');
const note = require('./src/note.js');
const melodyGenerator = require('./src/MelodyGenerator.js');

waveGenerator.save('./song1.wav', melodyGenerator.fromString(fs.readFileSync('./songs/song1.txt', 'utf8')));
waveGenerator.save('./song2.wav', melodyGenerator.fromString(fs.readFileSync('./songs/song2.txt', 'utf8')));
waveGenerator.save('./song3.wav', melodyGenerator.fromString(fs.readFileSync('./songs/song3.txt', 'utf8')));
