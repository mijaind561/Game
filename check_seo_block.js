const fs = require('fs');
const path = require('path');

let insideSideRail = 0;
let insideScript = 0;
let unknown = 0;

for (let i = 1; i <= 100; i++) {
    const file = path.join(__dirname, 'games', 'game' + i, 'index.html');
    if (!fs.existsSync(file)) continue;
    const text = fs.readFileSync(file, 'utf8');
    
    if (text.includes('</script><div class="adsense-seo-block"')) {
        if (text.includes('adsbygoogle = window.adsbygoogle || []).push({});</script><div class="adsense-seo-block"')) {
            insideSideRail++;
        } else {
            insideScript++;
        }
    } else {
        unknown++;
    }
}
console.log(`Inside Side Rail: ${insideSideRail}`);
console.log(`Attached to Audio Script: ${insideScript}`);
console.log(`Unknown: ${unknown}`);
