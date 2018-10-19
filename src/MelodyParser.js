const durations = require('./durations.js');
const note = require('./note.js');

class MelodyParser {
    constructor() {
        this.defines = [];
        this.plays = [];
        this.sounds = [];
    }

    //interface function
    parse(song, melody) {
        melody.queue = [];
        this.melody = melody
        let lines = this.lines(song);
        this.defines = this.parseCommandDefine(lines);
        this.plays = this.parseCommandPlay(lines);
        
        melody = this.buildMelody();
    }

    //split to lines and cleanup - rid of unwanted spaces
    lines(sng) {
        return sng.replace(new RegExp(', ', "g"), ',').split("\n")
    }

    //parse definitions (aka macros)
    parseCommandDefine(lins) {
        let comm = [];
        let defs = [];

        for (let l = 0; l < lins.length; l++) {
            comm = lins[l].split(' ');
            if (comm[0] == 'define') {
                let name = comm[1];
                for (let i = 3; i < comm.length; i++) {
                    if (i % 2) {
                        if (defs[name] === undefined) defs[name] = [];
                        defs[name].push(comm[i]);
                    }
                }
            }
        }
        return defs;
    }

    //parse notes and repeats
    parseCommandPlay(lins) {
        let comm = [];
        let defs = [];

        for (let l = 0; l < lins.length; l++) {
            comm = lins[l].split(' ');
            if (comm[0] == 'play') {
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
     buildMelody() {
         for (let i = 0; i < this.sounds.length; i++) {
             let snd = this.sounds[i].split('(');

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
                     this.melody.enqueueTone(durations[duration], nt)
                     break;
                 case 'pause':
                     let pause = snd[1].split(')')[0];
                     this.melody.enqueuePause(durations[pause]);

                     break;

                 default:
                     break;
             }
         }

     }
}

module.exports = new MelodyParser();