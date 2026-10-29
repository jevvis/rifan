# ORDER 8 (Rifan) — TEMPLATE 3 disesuaikan CV Implementation Plan

> **Untuk pelaksana:** gunakan superpowers:executing-plans. Langkah memakai kotak centang.

**Goal:** Situs portofolio statis gaya TEMPLATE 3 untuk Rifan (Operator Excavator), isi hanya dari `ORDER 8\rifan\CV_RIFAN.pdf` dan foto di folder itu; daftar isi mengikuti bagian CV.

**Architecture:** Salinan TEMPLATE 3 (HTML/CSS/JS biasa, tanpa build). `data.js` memegang seluruh isi ID/EN; `app.js` dibuat tidak lagi memakai daftar seksi yang ditulis mati, melainkan `CONTENT.sections`.

**Tech Stack:** HTML, CSS, JS; Python (PIL, rembg, PyMuPDF) untuk foto; Node untuk `cek/cek-konten.js`; Chrome untuk uji visual.

**Spec:** permintaan pemilik di chat + `TEMPLATE 3/DESAIN.md`.

## Global Constraints
- Isi teks hanya dari CV; typo CV dirapikan seperlunya ("Memiliki Memahami" → "Memahami"; "komunikasi" → "Komunikasi"); tidak menambah klaim.
- Kunci ID dan EN harus sama (`cek-konten.js`).
- Daftar isi 5 kartu mengikuti CV: 01 Pengalaman Kerja, 02 Pendidikan, 03 Sertifikasi & Pelatihan, 04 Kemampuan Teknis, 05 Kemampuan Personal. Tidak ada Organisasi dan tidak ada Software (tidak ada di CV).
- Kontak: jrrifan5@gmail.com, 082249100794 (WhatsApp), Dusun Wulu Utara.
- Penentuan foto dari chat klien: Anugrah = foto hutan berhelm (2) + selfie kabin + 5 foto lokasi + surat keterangan AHB; "selebihnya Rimba" = foto 14–18 + surat keterangan Rimba Perkasa Utama.

## Review Focus
- Pendidikan SMA/SMP tanpa foto dan tanpa IPK: kartu tidak boleh punya gambar rusak atau "IPK" kosong.
- Foto dokumen miring di atas meja kayu: harus dipotong ke kertas.
- Seksi tanpa Software: kartu software tidak boleh muncul kosong.
- Lensa foto profil: dua foto harus bertumpuk rapi.
- HP 360 px: galeri foto kerja tanpa scroll horizontal.

### Task 1: Foto (aset)
**Files:** Create `assets/foto/*`, `assets/sertifikat/*`, `assets/foto-profil.png`, `assets/foto-profil2.png`
**Produces:** `kerja-ahb-1..8.jpg`, `kerja-rimba-1..5.jpg`, `sert-k3.jpg`, `sert-exa.jpg`, `sert-ach.jpg`, `sk-ahb.jpg`, `sk-rimba.jpg` (maks 1400 px, JPG 82); profil memakai foto paspor (tanpa latar merah) dan foto kedua berhelm, dipotong dengan kotak yang sama.
- [ ] Ubah ukuran dan simpan; potong dokumen ke kertas; hapus latar profil dengan rembg.
- [ ] Verifikasi: semua berkas ada dan terbuka (dicek `cek-konten.js`).

### Task 2: Isi (`data.js`) dan pemeriksa
**Files:** Rewrite `data.js`; modify `cek/cek-konten.js`
**Produces:** `CONTENT[lang]` dengan `sections` (5), `work[]` `{period, role, org, loc, img[], points[]}`, `edu[]` `{year,title,school}`, `certs[]`, `technical[]`, `personal[]`, `skills[]` (chip profil), `contacts[]` (email, domisili, WhatsApp).
- [ ] Ubah `cek-konten.js` dulu (5 seksi, gambar `work[].imgs`) dan pastikan GAGAL.
- [ ] Tulis `data.js`; `node cek/cek-konten.js` → OK.

### Task 3: Render (`app.js`, `style.css`, `index.html`)
**Produces:** `IDS` dari `CONTENT.id.sections`; `body.kerja/pendidikan/sertifikasi/teknis/personal`; galeri foto kerja; kartu pendidikan tanpa gambar; ikon WhatsApp; modal sertifikat dengan "Atas nama: Rifan".
- [ ] Uji di Chrome: 5 kartu berurutan, tiap seksi terisi, gambar utuh, scroll antar seksi.

### Task 4: Uji visual desktop + HP + EN, lalu serahkan
- [ ] Screenshot 1280 dan 375 px, ID dan EN; periksa lensa dan modal; laporkan temuan ke pemilik.
