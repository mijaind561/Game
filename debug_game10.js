const fs = require('fs');
const path = require('path');
const gamesDir = path.join(__dirname, 'games');

// 1. Fix Mojibake everywhere
let count = 0;
for (let i = 1; i <= 100; i++) {
    const fileLoc = path.join(gamesDir, `game${i}`, 'index.html');
    if (fs.existsSync(fileLoc)) {
        let content = fs.readFileSync(fileLoc, 'utf8');
        let original = content;
        
        // These are Windows-1252 misinterpretations of UTF-8 encoded characters.
        // Left Arrow: E2 86 90 -> â† or —€
        // Right Arrow: E2 86 92 -> â†’ or –¶
        // Heart/Life: E2 99 A5 -> â™¥ or ©
        
        content = content.replace(/—€/g, '&larr;');
        content = content.replace(/–¶/g, '&rarr;');
        content = content.replace(/©/g, '&hearts;');
        
        if (content !== original) {
            fs.writeFileSync(fileLoc, content, 'utf8');
            count++;
        }
    }
}
console.log(`[PASS]: Mojibake replaced in ${count} files.`);

// 2. Check Game 10 script for errors
const g10 = path.join(gamesDir, 'game10', 'index.html');
let g10c = fs.readFileSync(g10, 'utf8');
const scriptMatch = g10c.match(/<script>([\s\S]*?)<\/script>/g);
if (scriptMatch && scriptMatch.length > 1) {
    // The second script block is the main game logic
    let mainScript = scriptMatch[1].replace(/<script>|<\/script>/g, '');
    try {
        // Just parsing it
        new Function(mainScript);
        console.log('[PASS]: Game 10 main script parsed successfully without syntax errors.');
    } catch(e) {
        console.log('[ERROR]: Game 10 syntax error: ' + e.message);
    }
}
