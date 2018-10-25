const parser = require('../src/MelodyParser.js');

const testCase = 
`define OutroD is pause(HT) | note(F4;C4, E)
define OutroE is pause(HT) | note(B3;E4, H)
play repeat 7 times noteA | noteB
play repeat 3 times noteA | noteB`;

// test comma-space cleanup
test('lines("A4, A5") should returns ["A4,A5"]', () => {
    let lines = parser.lines("A4, A5")[0];
    expect(lines).toEqual("A4,A5");
});

// test lines split
test('lines("A4, A5\\nA2, A3") should returns ["A4,A5", "A2,A3"]', () => {
    let lines = parser.lines("A4, A5\nA2, A3");
    expect(lines[0]).toEqual("A4,A5");
    expect(lines[1]).toEqual("A2,A3");
});

//test defines interpretation simple
test("Check for defines (simple)", () => {
    let lines = parser.lines('define melodyA is pause(HT) | note(E4, Q) | note(G4, Q) | note(A4, H)');
    let defs = parser.parseCommandDefine(lines[0].split(' '));
    expect(defs['melodyA']).toEqual(['pause(HT)', 'note(E4,Q)', 'note(G4,Q)', 'note(A4,H)']);
});

//test defines interpretation based on testCase
test("Check for defines (testCase)", () => {
    let lines = parser.lines(testCase);
    let defs = parser.parseCommandDefine(lines[0].split(' '));
    expect(defs['OutroD']).toEqual(['pause(HT)', 'note(F4;C4,E)']);
});

//test checkMacro function
test("Check for checkMacro (testCase)", () => {
    let lines = parser.lines(testCase);

    parser.defines = parser.parseCommandDefine(lines[0].split(' '));
    let macro = parser.checkMacro(parser.defines['OutroD']);
    expect(macro).toEqual(['pause(HT)', 'note(F4;C4,E)']);
});

//test parseCommandDefine and parseCommandPlay functions
test("test parseCommandDefine and parseCommandPlay", () => {
    let lines = parser.lines(testCase);
    parser.prepareCommands(lines);
   
   expect(parser.sounds).toEqual(['noteA',
       'noteA',
       'noteA',
       'noteA',
       'noteA',
       'noteA',
       'noteA',
       'noteB',
       'noteA',
       'noteA',
       'noteA',
       'noteB'
   ]);
});