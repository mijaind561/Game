const fs = require('fs');
const path = require('path');
const gamesDir = path.join(__dirname, 'games');

for(let i=1; i<=100; i++) {
    let p = path.join(gamesDir, 'game'+i, 'index.html');
    if(fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf8');
        if(content.includes('Jo Jo Run') || content.includes('Jo Jo')) {
            console.log('Jo Jo Run is game ' + i);
        }
    }
}
