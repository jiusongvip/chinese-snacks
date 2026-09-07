// Re-encode images from pristine git-history sources at lower quality + generate hero 640w
const sharp = require('D:/workspaces/website/chinese-snacks/node_modules/sharp');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const proj = 'D:/workspaces/website/chinese-snacks';
const root = path.join(proj, 'public/images');
const SRC_COMMIT = '86c41a7';

function gitFile(p) {
  return execSync(`git show ${SRC_COMMIT}:public/images/${p}`, { cwd: proj, maxBuffer: 50 * 1024 * 1024 });
}
async function out(buf, file, w, q, h) {
  const dest = path.join(root, file);
  let img = h ? sharp(buf).resize({ width: w, height: h }) : sharp(buf).resize({ width: w, withoutEnlargement: true });
  const b = await img.webp({ quality: q }).toBuffer();
  const tmp = dest + '.tmp';
  fs.writeFileSync(tmp, b);
  fs.rmSync(dest, { force: true });
  fs.renameSync(tmp, dest);
  console.log(file.padEnd(34), Math.round(b.length / 1024) + 'KB');
}
(async () => {
  const snacks = ['baocai', 'bingfen', 'cheong-fun', 'chuanchuan', 'congyoubing', 'dan-ta', 'dandannoodles', 'hongyou-chaoshou', 'jianbing', 'liangpi', 'malatang', 'mapo-doufu', 'roujiamo', 'shengjianbao', 'shrimp-dumplings', 'tanghulu', 'wonton-noodles', 'xiaolongbao', 'xiaomian', 'yangrou-paomo', 'yangrouchuan', 'zhajiangmian'];
  for (const s of snacks) {
    const buf = gitFile(`snacks/${s}.webp`);
    await out(buf, `snacks/${s}.webp`, 640, 55);
    await out(buf, `snacks/${s}-400.webp`, 400, 65);
  }
  const cities = ['beijing', 'chengdu', 'chongqing', 'guangzhou', 'shanghai', 'xian'];
  for (const c of cities) {
    const buf = gitFile(`${c}.webp`);
    await out(buf, `${c}.webp`, 640, 55);
    await out(buf, `${c}-400.webp`, 400, 65);
  }
  const blogs = ['best-time-to-eat', 'night-market-guide', 'order-no-mandarin', 'regional-flavors', 'tourist-trap'].filter(b => fs.existsSync(path.join(root, 'blog', b + '.webp')));
  for (const b of blogs) {
    let buf;
    try { buf = gitFile(`blog/${b}.webp`); } catch { buf = fs.readFileSync(path.join(root, 'blog', b + '.webp')); }
    await out(buf, `blog/${b}.webp`, 640, 55);
    await out(buf, `blog/${b}-400.webp`, 400, 65);
  }
  const hero = gitFile('hero.webp');
  await out(hero, 'hero.webp', 800, 62, 600);
  await out(hero, 'hero-640.webp', 640, 62, 480);
  await out(hero, 'hero-480.webp', 480, 65, 360);
  console.log('DONE');
})();
