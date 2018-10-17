const durations = require('./durations.js');
const MelodyQueue = require('./MelodyQueue.js');
const waveGenerator = require('./WaveGenerator.js');
const note = require('./note.js');

class MelodyGenerator {
    constructor() {
        this.functions = new Map();
    }
    fromString(melodyString) {
        let lines = melodyString.split('\n');
        let objs = lines.map((line) => this.parse(line));

        let melody = new MelodyQueue();
        return this.eval(melody, objs);
    }

    eval(melody, objs) {
        objs.forEach((obj) => {
            if (obj === null) {
                return;
            }
            if (obj.type === 'play') {
                this.evalElements(melody, obj.elements);
            } else if (obj.type === 'define') {
                this.functions.set(obj.name, obj.elements);
            }
        });

        return melody;
    }

    evalElements(melody, objs) {
        objs.forEach((obj) => this.evalElement(melody, obj));
    }

    evalElement(melody, obj) {
        if (obj.type === 'note') {
            const duration = durations[obj.time];
            const notes = obj.notes.map((n) => note(n));
            melody.enqueueTone(duration, notes);
        } else if (obj.type === 'pause') {
            const duration = durations[obj.time];
            melody.enqueuePause(duration);
        } else if (obj.type === 'repeat') {
            const times = obj.times;
            for(let i=0; i < times; i++) {
                this.evalElement(melody, obj.body);
            }
        } else if (obj.type === 'function') {
            const elements = this.functions.get(obj.name);
            this.evalElements(melody, elements);
        }
    }

    parse(line) {
        line = line.trim();
        return (
            this.parseDefine(line)
            || this.parseMusic(line)
            || null
        );
    }

    parseDefine(line) {
        const match = line.match(/^define\s*(\w+)\s*is\s*(.+)$/);
        if (!match) {
            return null;
        }
        return {
            type: 'define',
            name: match[1],
            elements: this._parseElements(match[2])
        }
    }

    parseMusic(line) {
        const match = line.match(/^play\s*(.+)$/);
        if (!match) {
            return null;
        }
        return {
            type: 'play',
            elements: this._parseElements(match[1])
        }
    }

    _parseElements(line) {
        const notes = line.split('|');
        return notes.map(this.parseSingleNote.bind(this));
    }

    parseSingleNote(strNote) {
        strNote = strNote.trim();
        return (
            this.matchRepeat(strNote)
            || this.matchNote(strNote)
            || this.matchPause(strNote)
            || this.matchFunc(strNote)
            || null
        );
    }

    matchRepeat(strNote) {
        const match = strNote.match(/^repeat\s*(\d+)\s*times\s*(.+)$/);
        if (!match) {
            return null;
        }
        return {
            type: 'repeat',
            times: parseInt(match[1]) || 0,
            body: this.parseSingleNote(match[2])
        };
    }

    matchNote(strNote) {
        const match = strNote.match(/^note\(([\w#;]+)\s*,\s*(\w)\)$/);
        if (!match) {
            return null;
        }
        return {
            type: 'note',
            notes: match[1].split(/\s*;\s*/),
            time: match[2]
        };
    }

    matchPause(strNote) {
        const match = strNote.match(/^pause\((\w+)\)$/);
        if (!match) {
            return null;
        }

        return {
            type: 'pause',
            time: match[1],
        }
    }

    matchFunc(strNote) {
        const match = strNote.match(/^[a-zA-Z_]\w+$/);
        if (!match) {
            return null;
        }

        return {
            type: 'function',
            name: match[0]
        };
    }
}

module.exports = new MelodyGenerator();
