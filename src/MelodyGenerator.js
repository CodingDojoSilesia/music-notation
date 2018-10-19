const durations = require('./durations.js');
const MelodyQueue = require('./MelodyQueue.js');
const waveGenerator = require('./WaveGenerator.js');
const note = require('./note.js');

class MelodyGenerator {
    fromString(melodyString) {
        // put your code here
        this.defines = [];
        this.sounds = [];
        let step1 = melodyString.replace(new RegExp(', ', "g"), ',').split("\n");

        for (let i = 0; i < step1.length; i++) {
            this.parse(step1[i]);
        }

        let melody = new MelodyQueue();
        this.buildMelody(melody, this.sounds);

        return melody;
    }

    getNotesArray(notes) {
        return notes.map((n) => note(n));
    }


    //pare a line
    parse(line) {
        let command = line.split(' ');

        switch (command[0]) {
            case 'play':
                this.parseCommandPlay(command);
                break;
            case 'define':
                this.parseCommandDefine(command);
                break;

            default:
                break;
        }

    }

    //parse notes and repeats
    parseCommandPlay(comm) {
        for (let i = 1; i < comm.length; i++) {
            let cm = comm[i];
            if (cm === 'repeat') {
                let times = parseInt(comm[i + 1]);
                for (let n = 0; n < times; n++) {
                    this.add(comm[i + 3]);
                }
                i += 3;
            } else {
                if (comm[i] !== '|') this.add(comm[i]);
            }
        }
    }

    //parse definitions (aka macros)
    parseCommandDefine(comm) {
        let name = comm[1];

        for (let i = 3; i < comm.length; i++) {
            if (i % 2) {
                if (this.defines[name] === undefined) this.defines[name] = [];
                this.defines[name].push(comm[i]);
            }
        }
    }

    //add note - check if it is macro first
    add(comm) {
        let out = this.checkMacro(comm);
        if (Array.isArray(out)) {
            for (let i = 0; i < out.length; i++) {
                this.sounds.push(out[i]);
            }
        } else {
            this.sounds.push(out);
        }
    }

    // replace macro with notes, no macro - just return a single note
    checkMacro(comm) {
        if (this.defines[comm] !== undefined) return this.defines[comm];
        return comm;
    }

    //build melody based on the parsed file
    buildMelody(melody, sounds) {
        for (let i = 0; i < sounds.length; i++) {
            let snd = sounds[i].split('(');

            switch (snd[0]) {
                case 'note':
                    let play = snd[1].split(')')[0].split(';');
                    let noteDur = play[play.length - 1].split(',');
                    let duration = noteDur[1];
                    let nt = [];

                    for (let j = 0; j < play.length - 1; j++) {
                        nt.push(note(play[j]));
                    }
                    nt.push(note(noteDur[0]));
                    melody.enqueueTone(durations[duration], nt)
                    break;
                case 'pause':
                    let pause = snd[1].split(')')[0];
                    melody.enqueuePause(durations[pause]);

                    break;

                default:
                    break;
            }
        }

    }
}

module.exports = new MelodyGenerator();