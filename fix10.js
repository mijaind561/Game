const fs = require('fs');
const path = require('path');
let f10 = path.join(__dirname, 'games', 'game10', 'index.html');
let c10 = fs.readFileSync(f10, 'utf8');
c10 = c10.replace('<div class="text-gray-400 text-sm text-center">Use A and D or Left and Right arrows to navigate grid.</div>', '<div class="text-gray-400 text-sm text-center hidden md:block">Left arrow right arrow A D to grid navigate.</div>');
c10 = c10.replace('<p class="text-gray-400 text-sm mt-4 text-center">Use A and D or Left and Right arrows to navigate grid.</p>', '<p class="text-gray-400 text-sm mt-4 text-center hidden md:block">Left arrow right arrow A D to grid navigate.</p>');
fs.writeFileSync(f10, c10, 'utf8');
