const durations = require('./durations.js');
const MelodyQueue = require('./MelodyQueue.js');
const waveGenerator = require('./WaveGenerator.js');
const note = require('./note.js');

//Global variables that are accessible to all
let melody = new MelodyQueue();
let macros = new Map(); // In case a macro needs to be defined
const regex1 = /repeat (\d) times (.+)/; // Regex for repeat commands
const regex2 = /((note\(|pause\()((.{2,3})(;(\w\w))*)(,\s?([A-Z]))?\))/; //Regex for notes, pauses
const regex3 = /define (\w+) is (.+)/;  //Regex for defining macros
const regex4 = /(play )?(.+)/; // Regex for playing non-repeating macros

class MelodyGenerator
{

	parseMacro(lineString) {
		// define mel01 is pause(HT) | note(E5, E)
		const parsedMacro = regex3.exec(lineString); 
		const macroName = parsedMacro[1];
		const line = parsedMacro[2].split("|");
		let macroNotes = [];

		for(let i=0; i < line.length; i++) {
				macroNotes = [...macroNotes, ...this.parseSound(line[i])];
		}
		macros.set(macroName, macroNotes);

	}

	parseSound(soundString) {
		let soundTest = regex2.test(soundString); // Is it a note/pause? (It could be a repeat)
		let sound = regex2.exec(soundString);
		

		// [2] contains 'pause' or 'note'
		// [3] is the note letter(s) or duration of the pause
		// [8] is the duration of a note command
		
		if(regex1.test(soundString)) { // In case of repeat commands, we'll need a loop
			//extract repeat command: get times, and note/macro
			let noteArray = [];
			const repeat = regex1.exec(soundString);
			// [1] is number of times
			// [2] is the note or macro

			
			const repeatSound = this.parseSound(repeat[2].trim());  //RECURSION!
			// loop X times through the given note or macro
			// console.log(repeat, macros.get(repeat));

			for (let i = 0; i < parseInt(repeat[1]); i++) {
				noteArray = [...noteArray, ...repeatSound]; 
			}

			return noteArray;

		} else if (soundTest && sound[2] === 'note(') { //it must be just a plain old note
			let noteArray = sound[3].split(";");
			// let noteString = "durations[" + sound[8] + "],";

			// for(let i=0; i < noteArray.length; i++){
			// 	noteString += " note('" + noteArray[i] + "'),";
			// }

			// noteString = noteString.slice(0, -1);
			// console.log(noteString);
			// melody.enqueueTone(...noteString);
			// console.log(noteArray);

			return [[sound[8], ...noteArray]];

		} else if (soundTest && sound[2] === 'pause(') { // if it's a pause, then... pause, obviously
			return [[sound[3]]];

		} else if (macros.has(regex4.exec(soundString)[2].trim())) { // It must be a macro

			return macros.get(regex4.exec(soundString)[2].trim()); 
		}
	}

	parseLine(lineString) {

		if(regex1.test(lineString) || regex2.test(lineString) || regex3.test(lineString) || regex4.test(lineString)) {

			let notesArray = [];

			if(lineString.startsWith('define')) {
					this.parseMacro(lineString); // Adds the macro to the map
					return null;
			} else {
				let line = lineString.split("|"); //split line by vertical bars into individual sounds

				for(let i=0; i < line.length; i++) {
					// Extract the sound out of the array
					// notesArray.push(this.parseSound(line[i]));
					// console.log(line[i]);
					notesArray = [...notesArray, ...this.parseSound(line[i].trim())];
				}
			return notesArray;	
			}
		}

		return null;		
	}

    fromString(melodyString) {

        //  Split by lines, trim
        const melodyLines = melodyString.trim().split("\n");

        // Loop thru all the lines
        for(let i=0; i < melodyLines.length; i++) {
        	// Extract an array of just notes or pauses
        	let notesArray = this.parseLine(melodyLines[i]);
        	if(notesArray !== null && notesArray !== undefined && notesArray[0] !== undefined) {
	        	// console.log(notesArray);
	        	//Add each note to the queue
	        	for(let j=0; j < notesArray.length; j++){
	        		if(notesArray[j].length === 1) {
	        			melody.enqueuePause(durations[notesArray[j][0]]);
	        			// console.log('pause');
	        		} else if(notesArray[j].length === 2) {
	        			// console.log("enqueueTone(durations." + notesArray[j][0] + ", note('" + notesArray[j][1]+ "'));");
	        			melody.enqueueTone(durations[notesArray[j][0]], note(notesArray[j][1]));
	        		} else if(notesArray[j].length === 3) {
	        			// console.log("enqueueTone(durations." + notesArray[j][0] + ", note('" + notesArray[j][1]+ "'), note(" + notesArray[j][2] + "));");
	        			melody.enqueueTone(durations[notesArray[j][0]], note(notesArray[j][1]), note(notesArray[j][2]));
	        		} else if(notesArray[j].length === 4) {
	        			// console.log("enqueueTone(durations." + notesArray[j][0] + ", note('" + notesArray[j][1]+ "'), note(" + notesArray[j][2] + "), note(" + notesArray[j][3] + "));");
	        			melody.enqueueTone(durations[notesArray[j][0]], note(notesArray[j][1]), note(notesArray[j][2]), note(notesArray[j][3]));
	        		}
        		}
        	}
        }

        return melody;
    }

    getNotesArray(notes) {
        return notes.map((n) => note(n));
    }
}

module.exports = new MelodyGenerator();
