// Generate smaller responsive variants: snacks/blog/city images -> 400w; hero -> 480w; packaged stay 640
const sharp = require('D:/workspaces/website/chinese-snacks/node_modules/sharp');
const fs = require('fs');
const path = require('path');
const root = 'D:/workspaces/website/chinese-snacks/public/images';
const jobs = [];
function walk(dir, targetW, q) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) { walk(p, targetW, q); continue; }
    if (!f.name.endsWith('.webp')) continue;
    jobs.push({ src: p, w: targetW, q });
  }
}
walk(path.join(root, 'snacks'), 400, 68);
walk(path.join(root, 'blog'), 400, 68);
for (const c of ['beijing', 'chengdu', 'chongqing', 'guangzhou', 'shanghai', 'xian']) {
  jobs.push({ src: path.join(root, c + '.webp'), w: 400, q: 68 });
}
// hero: 480w variant
jobs.push({ src: path.join(root, 'hero.webp'), w: 480, q: 70 });

(async () => {
  for (const j of jobs) {
    const dir = path.dirname(j.src);
    const ext = path.basename(j.src, '.webp');
    const out = path.join(dir, ext + '-' + j.w + '.webp');
    const buf = await sharp(j.src).resize({ width: j.w, withoutEnlargement: true }).webp({ quality: j.q }).toBuffer();
    fs.writeFileSync(out + '.tmp', buf);
    fs.rmSync(out, { force: true });
    fs.renameSync(out + '.tmp', out);
    console.log(path.relative(root, out), Math.round(buf.length / 1024) + 'KB');
  }
  console.log('DONE', jobs.length, 'variants');
})();
