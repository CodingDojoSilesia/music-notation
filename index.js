const fs = require('fs');
const process = require('process');

const melodyGenerator = require('./src/MelodyGenerator.js');
const waveGenerator = require('./src/WaveGenerator');

const inputFilepath = process.argv[2] || null;
const outputFilepath = process.argv[3] || 'out.wav';

if (inputFilepath === null) {
    process.stderr.write(
        'usage: node index.js INPUT_SONG_FILEPATH [WAV_OUTPUT_PATH]\n'
    );
    process.exit(1);
}

const data = fs.readFileSync(inputFilepath, 'utf8');
const output = melodyGenerator.fromString(data);
process.stderr.write(`Saving...\n`);
waveGenerator.save(outputFilepath, output);
process.stderr.write(`Song has been saved to ${outputFilepath}\n`);