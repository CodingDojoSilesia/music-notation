const header = require('waveheader');
const fs = require('fs');

class WaveGenerator
{
    save(filepath, melodyQueue) {
        let file = fs.createWriteStream(filepath);
        file.write(header(melodyQueue.queue.length, {bitDepth: 8}));
        let data = Uint8Array.from(melodyQueue.queue);
        let buffer = Buffer.from ? Buffer.from(data) : new Buffer(data);
        file.write(buffer);
        file.end();
    }
}

module.exports = new WaveGenerator();
