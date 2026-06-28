const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'games', 'game88', 'index.html');
let content = fs.readFileSync(targetFile, 'utf8');

// 1. Add dragging state variables
content = content.replace('let ball, pins, phase, pDir, pVal, isOver, score, t;', 'let ball, pins, phase, pDir, pVal, isOver, score, t;\n        let isDragging=false, sx=0, sy=0, mx=0, my=0;');

// 2. Fix init
content = content.replace("phase = 'aim'; pDir = 1; pVal = 0; score = 0; isOver=false; updateScoreUI(0); t=0; loop();", "phase = 'aim'; score = 0; isOver=false; updateScoreUI(0); t=0; isDragging=false; loop();");

// 3. Fix the draw loop
const loopRegex = /if\(phase === 'aim'\) \{[\s\S]*?\} else if \(phase === 'power'\) \{[\s\S]*?\} else if \(phase === 'roll'\) \{/;
const newLoop = `if (phase === 'aim' && isDragging) {
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)'; ctx.setLineDash([5, 5]); ctx.lineWidth = 2; ctx.beginPath();
                ctx.moveTo(ball.x, ball.y);
                let tvx = (sx - mx)*0.2, tvy = (sy - my)*0.2;
                ctx.lineTo(ball.x + tvx*20, ball.y + tvy*20);
                ctx.stroke(); ctx.setLineDash([]); ctx.lineWidth = 1;
            } else if (phase === 'roll') {`;
content = content.replace(loopRegex, newLoop);

// 4. Update instructional text
content = content.replace('Time your click to release the bowling ball along the pendulum swing angle.', 'Click, drag backwards from the ball, and release to throw.');

// 5. Replace event listeners
const listenRegex = /canvas\.addEventListener\('mousedown', \(\) => \{[\s\S]*?\}\);/;
const newListeners = `canvas.addEventListener('mousedown', (e) => {
            if(phase === 'aim') {
                const r = canvas.getBoundingClientRect();
                const cx = e.clientX - r.left, cy = e.clientY - r.top;
                if(Math.hypot(cx - ball.x, cy - ball.y) < 40) {
                    isDragging = true; sx = cx; sy = cy; mx = cx; my = cy;
                }
            }
        });
        canvas.addEventListener('mousemove', (e) => {
            if(isDragging && phase === 'aim') {
                const r = canvas.getBoundingClientRect();
                mx = e.clientX - r.left; my = e.clientY - r.top;
            }
        });
        canvas.addEventListener('mouseup', () => {
            if(isDragging && phase === 'aim') {
                ball.vx = (sx - mx)*0.2; ball.vy = (sy - my)*0.2;
                phase = 'roll'; isDragging = false;
            }
        });
        canvas.addEventListener('touchstart', (e) => {
            if(phase === 'aim') {
                const r = canvas.getBoundingClientRect();
                const touch = e.touches[0];
                const cx = touch.clientX - r.left, cy = touch.clientY - r.top;
                if(Math.hypot(cx - ball.x, cy - ball.y) < 40) {
                    isDragging = true; sx = cx; sy = cy; mx = cx; my = cy; e.preventDefault();
                }
            }
        }, {passive: false});
        canvas.addEventListener('touchmove', (e) => {
            if(isDragging && phase === 'aim') {
                const r = canvas.getBoundingClientRect();
                const touch = e.touches[0];
                mx = touch.clientX - r.left; my = touch.clientY - r.top; e.preventDefault();
            }
        }, {passive: false});
        canvas.addEventListener('touchend', (e) => {
            if(isDragging && phase === 'aim') {
                ball.vx = (sx - mx)*0.2; ball.vy = (sy - my)*0.2;
                phase = 'roll'; isDragging = false; e.preventDefault();
            }
        }, {passive: false});`;
content = content.replace(listenRegex, newListeners);

fs.writeFileSync(targetFile, content, 'utf8');

console.log("[MECHANICS REWRITTEN]: Drag-to-aim basketball mechanics injected for Game 88");
