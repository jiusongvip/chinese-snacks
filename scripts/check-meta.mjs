import http from 'http';
import fs from 'fs';

const snacks = JSON.parse(fs.readFileSync('d:/workspace/website/chinese-snacks/src/data/snacks.json', 'utf8'));

const get = p =>
  new Promise((res, rej) => {
    http.get({ host: 'localhost', port: 4324, path: p }, r => {
      let d = '';
      r.on('data', c => (d += c));
      r.on('end', () => res(d));
    }).on('error', rej);
  });

let bad = 0;
for (const s of snacks) {
  const h = await get('/snacks/' + s.id);
  const desc = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  // broken patterns: sentence cut mid-word producing dangling fragments
  const broken = /(\. \w+ \w{1,4} )/.test(desc) || /(\. \w{1,2} [A-Z])/.test(desc) || desc.length < 60 || desc.length > 200;
  const endsAbr = /(du| th| b| cr| wi| f)$/.test(desc.split(' ').pop());
  if (broken || endsAbr) {
    bad++;
    console.log('BROKEN:', s.id.padEnd(18), 'len:', desc.length, '|', desc.slice(0, 110));
  }
}
console.log('\nchecked', snacks.length, 'detail pages; broken descriptions:', bad);
