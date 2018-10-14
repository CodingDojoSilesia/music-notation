require('./globals.js');
const MelodyQueue = require('./MelodyQueue.js');
const waveGenerator = require('./WaveGenerator.js');
const note = require('./note.js');

class MelodyGenerator {
    fromString(melodyString) {
        let lines = melodyString.split('\n');
        let objs = lines.map((line) => parse(line));
    }

    getNotesArray(notes) {
        return notes.map((n) => note(n));
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
        const match = strNote.match(/^note\(([\w;]+)\s*,\s*(\w)\)$/);
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
        const match = strNote.match(/^[a-zA-Z]+$/);
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
