const durations = require('./durations.js');
const note = require('./note.js');

class MelodyParser {

    //interface method: song - text song, melody - MelodyQueue
    parse(song, melody) {

        //reset melody queue
        melody.queue = [];

        this.melody = melody;

        //palse to melody
        let lines = this.lines(song);
        console.log('Preparing.');
        this.prepareCommands(lines);
        console.log('Building melody...');

        melody = this.buildMelody();
        console.log('Parsing complete...');

    }

    //split to lines and cleanup - rid of unwanted spaces
    lines(sng) {
        //reset parser
        this.defines = [];
        this.plays = [];
        this.sounds = [];

        //initial cleaning

        // make single space separator
        while (sng !== (sng = sng.replace(/  /g, ' '))) {};

        sng = sng.replace(/\( /g, '(');
        sng = sng.replace(/ \(/g, '(');
        sng = sng.replace(/ \)/g, ')');
        sng = sng.replace(/ ,/g, ',');
        sng = sng.replace(/, /g, ',');
        sng = sng.replace(/ ;/g, ';');
        sng = sng.replace(/; /g, ';');
        sng = sng.split("\n");
        console.log(sng);
        //make duration separator ready for split, return cleaned song definition
        return sng;
    }

    prepareCommands(lins) {

        let comm = [];

        // as 'define' not always occurs as first, sort at the begining would be gr8
        // but warn information wouldn't be working properly.

        let plays = []; // let's store at first pass
        let cLean = '';
        console.log('Parsing defines...');

        for (let l = 0; l < lins.length; l++) {

            // additional cleaning
            lins[l] = lins[l].trim();

            //separate commands
            comm = lins[l].split(' ');

            switch (comm[0]) {
                case 'define':
                    this.defines = Object.assign(this.defines, this.parseCommandDefine(comm));
                    break;

                case 'play':
                    plays.push(comm);
                    break;

                default:
                    console.log(`WARN: Command not recognized or empty line (${l+1}). `)

                    break;
            }
        }
        console.log('Parsing notes...');
        for (let p = 0; p < plays.length; p++) {
            this.parseCommandPlay(plays[p]);
        }
    }

    //parse definitions (aka macros)
    parseCommandDefine(comm) {
        let defs = [];

        let name = comm[1];
        for (let i = 3; i < comm.length; i++) {
            if (comm[i] !== '|') { // ignore pipe separator
                if (defs[name] === undefined) defs[name] = []; // init array
                defs[name].push(comm[i]); //add a note to definition
            }
        }

        return defs;
    }

    //parse notes and repeats
    parseCommandPlay(comm) {

        for (let i = 1; i < comm.length; i++) {
            let cm = comm[i];
            if (cm === 'repeat') {
                let times = parseInt(comm[i + 1]);
                for (let n = 0; n < times; n++) {
                    this.addNote(comm[i + 3]);
                }
                i += 3;
            } else {
                if (comm[i] !== '|') this.addNote(comm[i]);
            }
        }

    }

    //add note - check if it is macro first
    addNote(comm) {
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