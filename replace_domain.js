const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

function findTextFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        if (filePath.includes('.git') || filePath.includes('node_modules')) return;
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(findTextFiles(filePath));
        } else if (filePath.endsWith('.html') || filePath.endsWith('.xml') || filePath.endsWith('.css') || filePath.endsWith('.js')) {
            results.push(filePath);
        }
    });
    return results;
}

const files = findTextFiles(rootDir);
let modified = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    content = content.replace(/gamiday\.com/gi, 'gamiday.com');
    content = content.replace(/GamiDay/g, 'GamiDay');
    content = content.replace(/gamiday/g, 'gamiday');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        modified++;
    }
});

console.log(`Successfully replaced domain name in ${modified} files.`);
