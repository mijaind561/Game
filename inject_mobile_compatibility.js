const fs = require('fs');
const path = require('path');

const gamesDir = path.join(__dirname, 'games');

const mobileTouchPolyfill = `
// Mobile Touch-to-Mouse Polyfill
(function() {
    function touchToMouse(e) {
        if (e.target.tagName === 'CANVAS') {
            e.preventDefault();
        } else {
            return;
        }
        let type = '';
        if (e.type === 'touchstart') type = 'mousedown';
        if (e.type === 'touchmove') type = 'mousemove';
        if (e.type === 'touchend') type = 'mouseup';
        if (!type) return;
        
        let touch = e.changedTouches[0];
        let mouseEvent = new MouseEvent(type, {
            clientX: touch ? touch.clientX : 0,
            clientY: touch ? touch.clientY : 0,
            bubbles: true,
            cancelable: true
        });
        e.target.dispatchEvent(mouseEvent);
    }
    document.addEventListener('touchstart', touchToMouse, {passive: false});
    document.addEventListener('touchmove', touchToMouse, {passive: false});
    document.addEventListener('touchend', touchToMouse, {passive: false});
})();
`;

const keyboardProxyPolyfill = `
// Virtual Keyboard Proxy Hook
(function() {
    let proxy = document.createElement('input');
    proxy.type = 'text';
    proxy.id = 'mobile_keyboard_proxy';
    proxy.style.cssText = 'position:absolute; opacity:0; pointer-events:none; z-index:-10;';
    document.body.appendChild(proxy);
    
    let canvasElement = document.querySelector('canvas');
    if (canvasElement) {
        canvasElement.addEventListener('touchstart', () => {
            proxy.focus();
        });
        canvasElement.addEventListener('click', () => {
            proxy.focus();
        });
    }

    proxy.addEventListener('input', (e) => {
        let char = e.data;
        if (e.inputType === 'deleteContentBackward') char = 'Backspace';
        if (e.inputType === 'insertLineBreak') char = 'Enter';
        if (char) {
            window.dispatchEvent(new KeyboardEvent('keydown', { 'key': char }));
        }
        proxy.value = ''; // clear buffer
    });
})();
`;

const keyboardGameIds = [68, 81, 83, 84, 99];
let modifiedCount = 0;

for (let i = 1; i <= 100; i++) {
    const fileLoc = path.join(gamesDir, 'game' + i, 'index.html');
    if (fs.existsSync(fileLoc)) {
        let content = fs.readFileSync(fileLoc, 'utf8');
        
        // Prevent double injection
        if (!content.includes('Mobile Touch-to-Mouse Polyfill')) {
            const scriptEnd = '</script>';
            const endIdx = content.lastIndexOf(scriptEnd);
            
            if (endIdx !== -1) {
                let injectBlock = '\\n' + mobileTouchPolyfill;
                
                if (keyboardGameIds.includes(i)) {
                    injectBlock += '\\n' + keyboardProxyPolyfill;
                }
                
                const newContent = content.substring(0, endIdx) + injectBlock + '\\n' + content.substring(endIdx);
                fs.writeFileSync(fileLoc, newContent, 'utf8');
                console.log("[PASS]: Mobile compatibility layer injected into game" + i + "/index.html");
                modifiedCount++;
            }
        }
    }
}

console.log("[Overhaul Status] Successfully injected universal mobile compatibility loops into " + modifiedCount + " game engines.");
