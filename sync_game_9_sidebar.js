const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'games', 'game9', 'index.html');
let content = fs.readFileSync(targetFile, 'utf8');

const regex = /(<p[^>]*>.*?<\/p>\s*<\/div>)/;

const newSidebar = `
    <div class="adsense-side-rail right-rail" style="width: 160px; min-height: 600px; background: rgba(255,255,255,0.03); border-radius: 8px; margin-left: 1rem; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; position: sticky; top: 100px;">
     <ins class="adsbygoogle"
          style="display:inline-block;width:160px;height:600px"
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot="1111111111"></ins>
     <script>try { (adsbygoogle = window.adsbygoogle || []).push({}); } catch(e) { console.warn("Layout safe:", e); }</script>
    </div>`;

if (regex.test(content)) {
    content = content.replace(regex, '$1' + newSidebar);
    fs.writeFileSync(targetFile, content, 'utf8');
    console.log("[SIDEBAR LOCKED]: Right-side advertisement container matched for Game 9");
} else {
    console.log("Anchor for injection not found.");
}
