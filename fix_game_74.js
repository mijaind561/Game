const fs = require('fs');
const fileLoc = 'c:/Users/taran/OneDrive/Desktop/games/games/game74/index.html';
const content = fs.readFileSync(fileLoc, 'utf8');
const lines = content.split('\n');

// we want to delete lines 130 to 170 (1-indexed)
// lines array is 0-indexed, so index 129 to 169
lines.splice(129, 41);

fs.writeFileSync(fileLoc, lines.join('\n'), 'utf8');
console.log('Fixed Game 74 layout');
