import sharp from "sharp";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1024">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stop-color="#b91c1c"/><stop offset="50%" stop-color="#ea580c"/><stop offset="100%" stop-color="#f59e0b"/>
</linearGradient></defs>
<rect width="1536" height="1024" fill="url(#g)"/>
<circle cx="1250" cy="220" r="160" fill="#ffffff" opacity="0.12"/>
<circle cx="260" cy="830" r="220" fill="#ffffff" opacity="0.10"/>
<circle cx="700" cy="500" r="320" fill="#ffffff" opacity="0.06"/>
<text x="768" y="440" font-family="Georgia, serif" font-size="86" font-weight="bold" fill="#ffffff" text-anchor="middle">Chinese Snacks</text>
<text x="768" y="560" font-family="Georgia, serif" font-size="56" fill="#ffe4c4" text-anchor="middle">to Bring Home</text>
<text x="768" y="660" font-family="Arial, sans-serif" font-size="32" fill="#fff7ed" opacity="0.85" text-anchor="middle">What locals actually buy — brands, prices, where to find them</text>
</svg>`;

sharp(Buffer.from(svg))
  .webp({ quality: 85 })
  .toFile("public/images/blog/bring-home-picks.webp")
  .then((i) => console.log("OK", i.width + "x" + i.height, i.size + "B"))
  .catch((e) => console.error("ERR", e.message));
