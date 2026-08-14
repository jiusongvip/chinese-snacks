import http from 'http';
import fs from 'fs';

const snacks = JSON.parse(fs.readFileSync('d:/workspace/website/chinese-snacks/src/data/snacks.json', 'utf8'));

function get(p) {
  return new Promise((res, rej) => {
    http.get({ host: 'localhost', port: 4324, path: p }, r => {
      let d = '';
      r.on('data', c => (d += c));
      r.on('end', () => res(d));
    }).on('error', rej);
  });
}

const refs = {};
let ok = 0;
const bad = [];
for (const s of snacks) {
  const h = await get('/snacks/' + s.id);
  const hasNote = h.includes("Editor's Field Note");
  const faceoff = h.indexOf('Snack Face-Off');
  const vsName = faceoff > -1 ? (h.slice(faceoff, faceoff + 900).match(/vs\.\s*([^<]{2,60})</) || [])[1] : null;
  if (!hasNote) bad.push(s.id + ':no-note');
  if (faceoff > -1) {
    if (!vsName) bad.push(s.id + ':no-vs-name');
    refs[vsName] = refs[vsName] || [];
    refs[vsName].push(s.id);
  }
  ok++;
}
const dups = Object.entries(refs).filter(([, v]) => v.length > 1);
if (dups.length) bad.push('DUP: ' + dups.map(([k, v]) => k + '<-' + v.join(',')).join('; '));
console.log('checked', ok, 'pages; issues:', bad.length ? bad.join(' | ') : 'NONE');
process.exit(bad.length ? 1 : 0);
