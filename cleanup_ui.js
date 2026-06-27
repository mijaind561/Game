const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        if (file === '.git' || file === 'node_modules') return;
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if(file.endsWith('.html')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(__dirname);
let changedCount = 0;

for (let file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // 1. Remove the "Built with..." component completely
    const builtWithRegex = /<p[^>]*>\s*Built with\s*<svg[\s\S]*?<\/svg>\s*using HTML5, Canvas API &amp; Vanilla JavaScript\s*<\/p>/g;
    content = content.replace(builtWithRegex, '');

    // 2. Fix the about-us.html article count (100+ -> 51)
    if (file.endsWith('about-us.html')) {
        content = content.replace('Our blog features 100+ articles', 'Our blog features 51 articles');
        
        // Target the specific UI stat block
        const statRegex = /<div class="([^"]*)">100\+<\/div>\s*<p class="([^"]*)">Articles<\/p>/g;
        content = content.replace(statRegex, '<div class="$1">51</div>\n          <p class="$2">Articles</p>');
    }

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        changedCount++;
    }
}
console.log(`[UX Cleanup] Successfully removed 'Built with' component and updated article counts across ${changedCount} files.`);
