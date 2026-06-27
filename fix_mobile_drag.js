const fs = require('fs');
const path = require('path');

const gamesDir = path.join(__dirname, 'games');
let fixedCount = 0;

for (let i = 1; i <= 100; i++) {
    const fileLoc = path.join(gamesDir, 'game' + i, 'index.html');
    if (fs.existsSync(fileLoc)) {
        let content = fs.readFileSync(fileLoc, 'utf8');
        
        // The issue is the redundant touchstart listener on toggleAudio 
        // which immediately triggers the mute toggle and stops propagation 
        // before the drag logic can handle the touch event. 
        // We will remove this line entirely. The browser's native simulated 
        // 'click' event (which has 0 delay thanks to the viewport meta tag) 
        // will perfectly handle tapping, exactly mirroring desktop mouse behavior.
        
        const targetOld = "audioBtn.addEventListener('touchstart', toggleAudio, {passive: false});";
        const targetNew = "/* removed conflicting touchstart */";
        
        if (content.includes(targetOld)) {
            content = content.replace(targetOld, targetNew);
            fs.writeFileSync(fileLoc, content, 'utf8');
            fixedCount++;
        }
    }
}

console.log(`[MOBILE DRAG FIX] Successfully removed conflicting touchstart listener for ${fixedCount} games.`);
