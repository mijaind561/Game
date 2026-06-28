const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'games', 'game9', 'index.html');
let content = fs.readFileSync(targetFile, 'utf8');

const regex = /<\/style>/;
const newMedia = `
@media (max-width: 1024px) {
    .adsense-side-rail.right-rail {
        display: none !important;
    }
}
</style>
`;

if (regex.test(content)) {
    content = content.replace(regex, newMedia.trim());
    fs.writeFileSync(targetFile, content, 'utf8');
    console.log("[RESPONSIVE LOCK]: Mobile sidebar extraction completed for Game 9");
} else {
    console.log("Style block not found.");
}
