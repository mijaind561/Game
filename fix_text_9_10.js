const fs = require('fs');
const path = require('path');

// Game 9
let f9 = path.join(__dirname, 'games', 'game9', 'index.html');
let c9 = fs.readFileSync(f9, 'utf8');

c9 = c9.replace(/<div class="text-gray-400 text-sm text-center">.*?<\/div>/, '<div class="text-gray-400 text-sm text-center">Use Left and Right arrows to navigate grid.</div>');
c9 = c9.replace(/<p class="text-gray-400 text-sm mt-4 text-center">[\s\S]*?<\/p>/, '<p class="text-gray-400 text-sm mt-4 text-center">Use Left and Right arrows to navigate grid.</p>');

fs.writeFileSync(f9, c9, 'utf8');

// Game 10
let f10 = path.join(__dirname, 'games', 'game10', 'index.html');
let c10 = fs.readFileSync(f10, 'utf8');

c10 = c10.replace(/<div class="text-gray-400 text-sm text-center">.*?<\/div>/, '<div class="text-gray-400 text-sm text-center">Use A and D or Left and Right arrows to navigate grid.</div>');
c10 = c10.replace(/<p class="text-gray-400 text-sm mt-4 text-center">[\s\S]*?<\/p>/, '<p class="text-gray-400 text-sm mt-4 text-center">Use A and D or Left and Right arrows to navigate grid.</p>');

fs.writeFileSync(f10, c10, 'utf8');
console.log("Updated text for Game 9 and 10.");
