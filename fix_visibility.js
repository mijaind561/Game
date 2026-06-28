const fs = require('fs');
const path = require('path');

['9', '10'].forEach(gameNum => {
    let file = path.join(__dirname, 'games', 'game' + gameNum, 'index.html');
    let content = fs.readFileSync(file, 'utf8');

    if (gameNum === '9') {
        content = content.replace(
            /<div class="w-full grid grid-cols-2 gap-4 md:hidden opacity-70">/,
            '<div id="mobileControls" class="w-full grid grid-cols-2 gap-4 md:hidden opacity-70" style="display: none;">'
        );
    } else if (gameNum === '10') {
        content = content.replace(
            /<div class="w-full flex justify-center gap-8 md:hidden opacity-70 px-4">/,
            '<div id="mobileControls" class="w-full flex justify-center gap-8 md:hidden opacity-70 px-4" style="display: none;">'
        );
    }

    content = content.replace(
        /window\.hasStarted = true;/,
        'window.hasStarted = true;\n  if(document.getElementById(\'mobileControls\')) document.getElementById(\'mobileControls\').style.display = \'\';'
    );

    content = content.replace(
        /if\(document\.getElementById\('gameOver'\)\) document\.getElementById\('gameOver'\)\.style\.display = 'flex';/,
        'if(document.getElementById(\'gameOver\')) document.getElementById(\'gameOver\').style.display = \'flex\';\n      if(document.getElementById(\'mobileControls\')) document.getElementById(\'mobileControls\').style.display = \'none\';'
    );

    fs.writeFileSync(file, content, 'utf8');
});
console.log("Fixed mobile controls visibility timing for Game 9 and 10.");
