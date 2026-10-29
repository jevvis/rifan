// Pemeriksa data ORDER 8 (Rifan): paritas kunci ID/EN, lima seksi berurutan, path gambar ada, isi sesuai CV.
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const win = {}; vm.runInNewContext(fs.readFileSync(path.join(root, 'data.js'), 'utf8'), { window: win });
const C = win.CONTENT; let bad = 0; const fail = m => { console.log('GAGAL:', m); bad++; };
const keys = (o, p = '') => Array.isArray(o) ? o.flatMap((v, i) => keys(v, p + '[' + i + ']')).concat(p + '.length=' + o.length)
  : o && typeof o === 'object' ? Object.keys(o).flatMap(k => keys(o[k], p + '.' + k)) : [p];
const a = keys(C.id), b = new Set(keys(C.en));
a.filter(k => !b.has(k)).forEach(k => fail('kunci ID tanpa EN: ' + k));
[...b].filter(k => !a.includes(k)).forEach(k => fail('kunci EN tanpa ID: ' + k));
const order = ['kerja', 'pendidikan', 'sertifikasi', 'teknis', 'personal'];
['id', 'en'].forEach(l => { if (C[l].sections.map(s => s.id).join() !== order.join()) fail('urutan seksi ' + l); });
const ex = p => fs.existsSync(path.join(root, p));
[...C.id.work.flatMap(w => w.imgs), ...C.id.certs.map(c => c.imgSrc), C.id.photo, C.id.photo2].forEach(p => { if (!ex(p)) fail('gambar tidak ada: ' + p); });
// jumlah butir sesuai CV
const n = (x, k, v) => { if (x !== v) fail(k + ' = ' + x + ', seharusnya ' + v); };
n(C.id.work.length, 'pengalaman kerja', 2); n(C.id.work[0].points.length, 'butir AHB', 3); n(C.id.work[1].points.length, 'butir Rimba', 2);
n(C.id.edu.length, 'pendidikan', 2); n(C.id.technical.length, 'kemampuan teknis', 10); n(C.id.personal.length, 'kemampuan personal', 7); n(C.id.certs.length, 'sertifikat+dokumen', 5);
const ct = C.id.contacts.map(c => c.value + ' ' + c.href).join(' ');
if (!/jrrifan5@gmail\.com/.test(ct) || !/Dusun Wulu Utara/.test(ct) || !/6282249100794/.test(ct)) fail('kontak tidak sesuai CV');
const all = JSON.stringify(C);
if (/hafizah|apoteker|farmasi|linkedin|kariadi|organisasi/i.test(all)) fail('sisa isi template (Hafizah/farmasi/LinkedIn/organisasi)');
console.log(bad ? 'GAGAL (' + bad + ')' : 'OK'); process.exit(bad ? 1 : 0);
