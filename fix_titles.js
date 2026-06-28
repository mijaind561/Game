const fs = require('fs');
const path = require('path');

['9', '10'].forEach(gameNum => {
    let file = path.join(__dirname, 'games', 'game' + gameNum, 'index.html');
    let content = fs.readFileSync(file, 'utf8');

    if (gameNum === '9') {
        content = content.replace(
            /<div class="text-4xl font-bold font-heading text-white drop-shadow-\[0_0_15px_rgba\(34,211,238,0\.8\)\] animate-pulse mb-4">CYBER NEON FORGE<\/div>/,
            '<div class="text-3xl md:text-4xl font-bold font-heading text-white text-center px-4 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-pulse mb-4">CYBER NEON FORGE</div>'
        );
    } else if (gameNum === '10') {
        content = content.replace(
            /<div class="text-4xl font-bold font-heading text-white drop-shadow-\[0_0_15px_rgba\(34,211,238,0\.8\)\] animate-pulse mb-4">ORBIT VELOCITY DEFENDER<\/div>/,
            '<div class="text-2xl md:text-4xl font-bold font-heading text-white text-center px-4 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-pulse mb-4">ORBIT VELOCITY DEFENDER</div>'
        );
    }

    fs.writeFileSync(file, content, 'utf8');
});
console.log("Fixed title overflow for Game 9 and 10.");
