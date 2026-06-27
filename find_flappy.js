const fs = require('fs');
const path = require('path');
const gamesDir = path.join(__dirname, 'games');

for(let i=1; i<=100; i++) {
    let p = path.join(gamesDir, 'game'+i, 'index.html');
    if(fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf8');
        if(content.includes('Flappy Paper Plane') || content.toLowerCase().includes('flappy') || content.toLowerCase().includes('paper plane')) {
            console.log('Flappy Paper Plane is game ' + i);
        }
    }
}
