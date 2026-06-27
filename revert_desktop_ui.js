const fs = require('fs');
const path = require('path');

const gamesDir = path.join(__dirname, 'games');
let fixedCount = 0;

for (let i = 1; i <= 100; i++) {
    const fileLoc = path.join(gamesDir, 'game' + i, 'index.html');
    if (fs.existsSync(fileLoc)) {
        let content = fs.readFileSync(fileLoc, 'utf8');
        
        // Find the SEO block exactly
        const seoRegex = /<div class="adsense-seo-block"[\s\S]*?<\/p>\s*<\/div>/;
        const match = content.match(seoRegex);
        
        if (match) {
            const seoBlockText = match[0];
            
            // Remove it from wherever it currently is
            content = content.replace(seoRegex, '');
            
            // Find the bottom ad container which always starts with <div class="max-w-[820px]
            // We want to place the SEO block right above it.
            const bottomAdRegex = /<div class="max-w-\[820px\]/;
            
            if (bottomAdRegex.test(content)) {
                content = content.replace(bottomAdRegex, seoBlockText + '\n\n  <div class="max-w-[820px]');
                fs.writeFileSync(fileLoc, content, 'utf8');
                fixedCount++;
            } else {
                console.log(`Game ${i}: Could not find bottom ad container to attach SEO block.`);
            }
        } else {
            console.log(`Game ${i}: Could not find SEO block.`);
        }
    }
}

console.log(`[DESKTOP UI FIX] Reverted and cleaned layout for ${fixedCount} games.`);
