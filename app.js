(function () {
  const IDS = CONTENT.id.sections.map(x => x.id);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const $ = (s, r = document) => r.querySelector(s);
  const params = new URLSearchParams(location.search);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches && params.get('motion') !== '1';
  if (reduced) document.documentElement.classList.add('rm');

  const App = window.App = { lang: params.get('lang') === 'en' ? 'en' : 'id', cur: '', cert: -1, lockUntil: 0 };
  const C = () => CONTENT[App.lang];
  const stage = $('#stage'), modal = $('#modal');
  const ORDER = ['intro', 'profil', 'isi', 'seksi'];
  const screenEl = n => $('[data-screen="' + n + '"]');
  const scrollEl = n => $('.scroll', screenEl(n));
  const nameOf = t => t.slice(1).split('/')[0], idOf = t => t.split('/')[1];

  // ───── router ─────
  function normalize(h) {
    h = (h || '').trim();
    if (h === '#intro' || h === '#profil' || h === '#isi') return h;
    const m = /^#seksi\/([a-z]+)$/.exec(h);
    return m && IDS.includes(m[1]) ? h : '#intro';
  }
  App.go = function (h, replace) {
    const t = normalize(h);
    if (location.hash !== t) { if (replace) history.replaceState(null, '', t); else location.hash = t; }
    show(t);
  };
  addEventListener('hashchange', () => {
    const t = normalize(location.hash);
    if (location.hash !== t) history.replaceState(null, '', t);
    show(t);
  });

  function show(t) {
    if (App.cur === t) return;
    const prev = App.cur;
    App.cur = t;
    closeCert(true);
    const name = nameOf(t), ai = ORDER.indexOf(name);
    fill(name, idOf(t));
    // layar ditumpuk berurutan: yang sudah dilewati di atas (under), yang belum menunggu di bawah (below), yang aktif naik dari bawah
    document.querySelectorAll('[data-screen]').forEach(s => {
      const i = ORDER.indexOf(s.dataset.screen), on = i === ai;
      s.classList.toggle('on', on); s.classList.toggle('under', i < ai); s.classList.toggle('below', i > ai);
      s.inert = !on; s.setAttribute('aria-hidden', on ? 'false' : 'true');
    });
    scrollEl(name).scrollTop = 0;
    if (name === 'seksi' && prev && nameOf(prev) === 'seksi') {
      const sec = $('.sec', scrollEl('seksi'));
      if (sec) sec.classList.add(IDS.indexOf(idOf(t)) > IDS.indexOf(idOf(prev)) ? 'in-up' : 'in-down');
    }
    document.body.dataset.screenNow = name;
    document.querySelectorAll('#dots button').forEach((b, i) => b.setAttribute('aria-current', String(i === Math.min(ai, 2))));
    const sc = screenEl(name); sc.tabIndex = -1; sc.focus({ preventScroll: true });
  }

  // maju (+1) atau mundur (-1) satu langkah menurut urutan layar; false jika tak ada tujuan atau masih dalam jeda
  App.nav = function (dir) {
    const t = App.cur, name = nameOf(t);
    let to = null;
    if (name === 'seksi') { const i = IDS.indexOf(idOf(t)) + dir; to = i < 0 ? '#isi' : i >= IDS.length ? null : '#seksi/' + IDS[i]; }
    else if (name === 'isi' && dir > 0) to = '#seksi/' + IDS[0];  // dari daftar isi, scroll lanjut ke seksi pertama
    else { const i = ORDER.indexOf(name) + dir; to = i < 0 || i > 2 ? null : '#' + ORDER[i]; }
    if (!to || Date.now() < App.lockUntil) return false;
    App.lockUntil = Date.now() + (reduced ? 0 : 900);
    App.go(to);
    return true;
  };

  App.setLang = function (l) {
    App.lang = l === 'en' ? 'en' : 'id';
    document.documentElement.lang = App.lang;
    document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === App.lang)));
    if (App.cur) { const t = App.cur; fill(nameOf(t), idOf(t)); if (App.cert >= 0) renderCert(); }
    document.title = (App.lang === 'en' ? 'Portfolio ' : 'Portofolio ') + C().name;
  };

  // ───── layar ─────
  const icon = {
    mail: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    wa: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.7-5.2A8.5 8.5 0 1 1 21 11.5Z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8a4.5 4.5 0 0 1-2-2l.8-1-1-2z"/></svg>'
  };
  const screens = {
    intro() {
      const c = C();
      return '<div class="intro-wrap"><i class="blob ib"></i><h1 class="intro-title">' + esc(c.ui.intro) + '<span class="dot"></span></h1></div>' +
        '<div class="intro-foot"><span>' + esc(c.name) + '</span><span class="hint">' + (App.lang === 'en' ? 'scroll down' : 'scroll ke bawah') + ' <i aria-hidden="true">↓</i></span><span>© ' + new Date().getFullYear() + '</span></div>';
    },
    profil() {
      const c = C(), e = c.edu[0];
      const contacts = c.contacts.map((k, i) => {
        const inner = '<span class="gi">' + (i === 0 ? icon.mail : i === 1 ? icon.pin : icon.wa) + '</span><span class="gl">' + esc(k.href ? k.label : k.value) + '</span>';
        return k.href ? '<a class="glass" href="' + esc(k.href) + '"' + (k.href.startsWith('http') ? ' target="_blank" rel="noopener"' : '') + ' title="' + esc(k.value) + '">' + inner + '</a>'
          : '<span class="glass" title="' + esc(k.value) + '">' + inner + '</span>';
      }).join('');
      const sw = c.skills.map(s => '<span class="chip">' + esc(s) + '</span>').join('');
      return '<div class="pf"><div class="pf-photo"><div class="ph-wrap"><img src="' + c.photo + '" alt="' + esc(c.fullName) + '"></div></div>' +
        '<div class="pf-text"><p class="eyebrow r" style="--i:0">' + esc(c.ui.hello) + '</p><h1 class="pf-name r" style="--i:1">' + esc(c.name) + '</h1>' +
        '<p class="pf-head r" style="--i:2">' + esc(c.headline) + '</p>' +
        '<div class="pf-cols"><div class="r" style="--i:3"><h2>' + esc(c.ui.about) + '</h2><p>' + esc(c.tx.aboutText) + '</p></div>' +
        '<div class="r" style="--i:4"><h2>' + esc(c.ui.edu) + '</h2><p>' + esc(e.title) + ' · ' + esc(e.year) + '</p>' +
        '<h2>' + esc(c.ui.skills) + '</h2><div class="chips">' + sw + '</div></div></div>' +
        '<div class="pf-foot r" style="--i:5"><div class="glass-row">' + contacts + '</div><a class="cta" href="#isi" data-go="#isi">' + esc(c.ui.explore) + ' <span aria-hidden="true">→</span></a></div></div></div>';
    },
    isi() {
      const c = C();
      return '<div class="toc"><div class="toc-l"><h1 class="toc-title">' + esc(c.ui.toc) + '</h1><a class="ghost" href="#profil" data-go="#profil">← ' + esc(c.ui.profile) + '</a></div>' +
        '<nav class="toc-grid">' + c.sections.map((s, i) => '<a class="card" href="#seksi/' + s.id + '" data-card="' + s.id + '" style="--i:' + i + '"><span class="card-n">' + s.num + '</span><span class="card-l">' + esc(s.label) + '</span></a>').join('') + '</nav></div>';
    },
    seksi(id) {
      const c = C(), idx = IDS.indexOf(id), s = c.sections[idx];
      const nav = '<nav class="sec-nav">' + (idx > 0 ? '<button type="button" class="ghost" data-prev data-go="#seksi/' + IDS[idx - 1] + '">← ' + esc(c.ui.prev) + '</button>' : '<span></span>') +
        '<button type="button" class="ghost mid" data-go="#isi">' + esc(c.ui.back) + '</button>' +
        (idx < IDS.length - 1 ? '<button type="button" class="ghost" data-next data-go="#seksi/' + IDS[idx + 1] + '">' + esc(c.ui.next) + ' →</button>' : '<span></span>') + '</nav>';
      return '<article class="sec"><header class="sec-head"><span class="sec-n">' + s.num + '</span><h1>' + esc(s.title) + '</h1></header><div class="sec-body">' + body[id](c) + '</div>' + nav + '</article>';
    }
  };
  const pts = a => '<ul>' + a.map(p => '<li>' + esc(p) + '</li>').join('') + '</ul>';
  const work = c => c.work.map((x, i) => '<article class="g-card work r" style="--i:' + i + '"><div><p class="meta">' + esc(x.period) + '</p><h3>' + esc(x.role) + '</h3><p class="org">' + esc(x.org) + '</p>' + pts(x.points) + '</div>' +
    '<div class="gal">' + x.imgs.map(u => '<img src="' + u + '" alt="" loading="lazy">').join('') + '</div></article>').join('');
  const body = {
    kerja: work,
    pendidikan: c => c.edu.map((x, i) => '<article class="g-card edu r" style="--i:' + i + '"><div><p class="meta">' + esc(x.year) + '</p><h3>' + esc(x.title) + '</h3></div></article>').join(''),
    sertifikasi: c => c.certs.map((x, i) => '<button type="button" class="g-card cert r" style="--i:' + i + '" data-cert="' + i + '"><span class="kind">' + esc(x.kind) + '</span><h3>' + esc(x.title) + '</h3><p class="org">' + esc(x.issuer) + '</p><span class="more">' + esc(c.tx.detail) + ' →</span></button>').join(''),
    teknis: c => '<ol class="list r">' + c.technical.map((t, i) => '<li style="--i:' + i + '"><b>' + String(i + 1).padStart(2, '0') + '</b><span>' + esc(t) + '</span></li>').join('') + '</ol>',
    personal: c => '<ol class="list r">' + c.personal.map((t, i) => '<li style="--i:' + i + '"><b>' + String(i + 1).padStart(2, '0') + '</b><span>' + esc(t) + '</span></li>').join('') + '</ol>'
  };
  function fill(name, id) { scrollEl(name).innerHTML = screens[name](id); }

  // ───── modal sertifikat ─────
  function renderCert() {
    const c = C(), x = c.certs[App.cert], n = c.certs.length;
    modal.innerHTML = '<div class="m-back" data-close></div><div class="m-card" role="document"><button type="button" class="m-x" data-close aria-label="' + esc(c.ui.close) + '">×</button>' +
      '<div class="m-photo"><p>' + esc(c.tx.noPhoto) + '</p></div><div class="m-info"><span class="kind">' + esc(x.kind) + '</span><h3 id="mTitle">' + esc(x.title) + '</h3>' +
      '<p class="org">' + esc(c.tx.issuedBy) + ': ' + esc(x.issuer) + '</p><p class="org">' + esc(c.tx.holder) + ': ' + esc(c.fullName) + '</p><p class="m-desc">' + esc(x.desc) + '</p>' +
      '<div class="m-nav"><button type="button" class="ghost" data-step="-1">← ' + esc(c.tx.prev) + '</button><span>' + (App.cert + 1) + ' / ' + n + '</span><button type="button" class="ghost" data-step="1">' + esc(c.tx.next) + ' →</button></div></div></div>';
    const probe = new Image(), at = App.cert;
    probe.onload = () => { if (App.cert === at) { const ph = $('.m-photo', modal); if (ph) ph.innerHTML = '<img src="' + esc(x.imgSrc) + '" alt="' + esc(x.title) + '">'; } };
    probe.src = x.imgSrc;
  }
  const lockBackdrop = v => { stage.inert = v; $('#bar').inert = v; $('#dots').inert = v; };
  function openCert(i) { App.opener = document.activeElement; App.cert = i; renderCert(); modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); lockBackdrop(true); const b = $('.m-x', modal); if (b) b.focus(); }
  function closeCert() {
    if (App.cert < 0 && !modal.classList.contains('open')) return;
    App.cert = -1; modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); lockBackdrop(false);
    const o = App.opener; App.opener = null; if (o && o.isConnected) o.focus();
  }
  const stepCert = d => { const n = C().certs.length; App.cert = (App.cert + d + n) % n; renderCert(); const b = $('.m-x', modal); if (b) b.focus(); };

  // ───── event ─────
  document.addEventListener('click', e => {
    const t = e.target;
    const card = t.closest('[data-card]');
    if (card) { e.preventDefault(); App.go('#seksi/' + card.dataset.card); return; }
    const lg = t.closest('[data-lang]'); if (lg) { App.setLang(lg.dataset.lang); return; }
    const ct = t.closest('[data-cert]'); if (ct) { openCert(+ct.dataset.cert); return; }
    if (t.closest('[data-close]')) { closeCert(); return; }
    const st = t.closest('[data-step]'); if (st) { stepCert(+st.dataset.step); return; }
    const g = t.closest('[data-go]'); if (g) { e.preventDefault(); App.go(g.dataset.go); return; }
    if (t.closest('[data-screen="intro"]') && App.cur === '#intro') App.go('#profil');
  });
  document.addEventListener('keydown', e => {
    if (modal.classList.contains('open')) {
      if (e.key === 'Escape') closeCert(); else if (e.key === 'ArrowLeft') stepCert(-1); else if (e.key === 'ArrowRight') stepCert(1);
      else if (e.key === 'Tab') {
        const f = [...modal.querySelectorAll('button')], a = document.activeElement;
        if (e.shiftKey && (a === f[0] || !modal.contains(a))) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && (a === f[f.length - 1] || !modal.contains(a))) { e.preventDefault(); f[0].focus(); }
      }
    } else if ((e.key === 'Enter' || e.key === ' ') && App.cur === '#intro') { e.preventDefault(); App.go('#profil'); }
  });

  // ───── scroll antar layar ─────
  const cur = () => scrollEl(nameOf(App.cur));
  const edge = dir => { const e = cur(); return dir > 0 ? e.scrollTop + e.clientHeight >= e.scrollHeight - 2 : e.scrollTop <= 1; };
  let lastScroll = 0, acc = 0, accAt = 0, touchY = 0, touchEdge = null;
  document.addEventListener('scroll', () => { lastScroll = Date.now(); }, true);
  document.addEventListener('wheel', e => {
    if (modal.classList.contains('open') || e.ctrlKey || !e.deltaY) return;
    const dir = e.deltaY > 0 ? 1 : -1;
    if (!edge(dir) || Date.now() - lastScroll < 450) { acc = 0; return; }   // masih menggulir isi layar, atau baru sampai di ujung
    if (Date.now() - accAt > 500) acc = 0;
    accAt = Date.now(); acc += Math.abs(e.deltaY);
    if (acc >= 60) { acc = 0; App.nav(dir); }
  }, { passive: true });
  addEventListener('touchstart', e => { touchY = e.touches[0].clientY; touchEdge = { up: edge(-1), down: edge(1) }; }, { passive: true });
  addEventListener('touchend', e => {
    if (modal.classList.contains('open') || !touchEdge) return;
    const dy = e.changedTouches[0].clientY - touchY;
    if (Math.abs(dy) < 60) return;
    const dir = dy < 0 ? 1 : -1;
    if ((dir > 0 ? touchEdge.down : touchEdge.up) && edge(dir)) App.nav(dir);
  }, { passive: true });
  document.addEventListener('keydown', e => {
    if (modal.classList.contains('open') || e.altKey || e.ctrlKey || e.metaKey) return;
    const dir = e.key === 'ArrowDown' || e.key === 'PageDown' ? 1 : e.key === 'ArrowUp' || e.key === 'PageUp' ? -1 : 0;
    if (dir && edge(dir) && Date.now() - lastScroll >= 450) App.nav(dir);
  });

  // ───── mulai ─────
  App.setLang(App.lang);
  const start = normalize(location.hash);
  if (location.hash !== start) history.replaceState(null, '', start);
  show(start);
})();
