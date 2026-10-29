// Isi CV Rifan (ORDER 8/rifan/CV_RIFAN.pdf). Jangan ubah teks di sini tanpa mengubah CV.
(function () {
  const IDS = ['kerja', 'pendidikan', 'sertifikasi', 'teknis', 'personal'];
  const NAV = {
    id: ['Pengalaman Kerja', 'Pendidikan', 'Sertifikasi', 'Teknis', 'Personal'],
    en: ['Work Experience', 'Education', 'Certificates', 'Technical', 'Personal']
  };
  const SEC_TITLE = {
    id: ['Pengalaman Kerja', 'Pendidikan', 'Sertifikasi & Pelatihan', 'Kemampuan Teknis', 'Kemampuan Personal'],
    en: ['Work Experience', 'Education', 'Certifications & Training', 'Technical Skills', 'Personal Skills']
  };
  const UI = {
    id: { toc: 'DAFTAR ISI', hello: 'Halo, saya', about: 'Tentang Saya', edu: 'Pendidikan', skills: 'Keahlian', back: 'Daftar Isi', next: 'Berikutnya', prev: 'Sebelumnya', start: 'Mulai', profile: 'Profil', lang: 'Bahasa', close: 'Tutup', detail: 'Lihat detail', explore: 'Lihat Daftar Isi', intro: 'PORTOFOLIO' },
    en: { toc: 'TABLE OF CONTENT', hello: 'Hello, I am', about: 'About Me', edu: 'Education', skills: 'Skills', back: 'Contents', next: 'Next', prev: 'Previous', start: 'Start', profile: 'Profile', lang: 'Language', close: 'Close', detail: 'View details', explore: 'See Contents', intro: 'PORTFOLIO' }
  };
  const TX = {
    id: {
      aboutText: 'Operator Excavator dengan pengalaman kerja 2 tahun di bidang operasional alat berat untuk mendukung kegiatan produksi di area pertambangan. Memahami penerapan Standar Keselamatan dan Kesehatan Kerja (K3) dalam operasional alat berat. Memiliki lisensi K3 operator excavator dari Kementerian Ketenagakerjaan RI serta sertifikat pelatihan operator excavator. Berkomitmen mengoperasikan alat berat secara bertanggung jawab untuk mendukung pencapaian target produksi.',
      detail: 'Lihat detail', close: 'Tutup', prev: 'Sebelumnya', next: 'Berikutnya', issuedBy: 'Diterbitkan oleh', holder: 'Atas nama',
      noPhoto: 'Foto dokumen asli akan ditampilkan di sini setelah diunggah.'
    },
    en: {
      aboutText: 'Excavator Operator with 2 years of work experience in heavy equipment operations supporting production activities in mining areas. Understands the application of Occupational Safety and Health (K3) standards in heavy equipment operations. Holds an excavator operator K3 license from the Ministry of Manpower of the Republic of Indonesia as well as an excavator operator training certificate. Committed to operating heavy equipment responsibly to support the achievement of production targets.',
      detail: 'View details', close: 'Close', prev: 'Previous', next: 'Next', issuedBy: 'Issued by', holder: 'Holder',
      noPhoto: 'The photo of the original document will be shown here once uploaded.'
    }
  };
  // foto kerja: Anugrah = foto hutan berhelm, selfie kabin, 5 foto lokasi (sesuai chat klien); selebihnya Rimba
  const ahb = [1, 2, 3, 4, 5, 6, 7].map(n => 'assets/foto/kerja-ahb-' + n + '.jpg');
  const rimba = [1, 2, 3, 4, 5].map(n => 'assets/foto/kerja-rimba-' + n + '.jpg');
  const certFiles = ['sert-k3', 'sert-exa', 'sert-ach', 'sk-ahb', 'sk-rimba'];
  const D = {
    id: {
      headline: 'Operator Excavator — 2 Tahun Pengalaman di Operasional Alat Berat | Lisensi K3 Kemnaker RI | Area Pertambangan',
      skills: ['Operator Excavator', 'P2H', 'K3'],
      work: [
        ['Nov 2025 – Okt 2026', 'Operator Excavator', 'PT. ANUGRAH HARISMA BARAKAH (AHB) — Malapulu, Kabaena Selatan', ahb, [
          'Mengoperasikan excavator untuk mendukung kegiatan operasional dan pencapaian target produksi di area kerja (site).',
          'Melakukan Pemeriksaan dan Perawatan Harian (P2H) sebelum dan sesudah pengoperasian untuk memastikan kondisi serta kelayakan unit.',
          'Menerapkan prosedur operasional dan keselamatan kerja selama pengoperasian alat berat.']],
        ['Sep 2023 – Okt 2024', 'Operator Excavator', 'PT. RIMBA PERKASA UTAMA — Kutai Kartanegara, Kalimantan Timur', rimba, [
          'Mengoperasikan unit Komatsu PC 200-10 MO CE dan Hitachi Zaxis 210 F untuk mendukung kegiatan produksi.',
          'Mendukung pencapaian target produksi harian dengan memperhatikan standar operasional prosedur (SOP) dan keselamatan kerja.']]
      ],
      edu: [['2020 – 2023', 'SMA Negeri 1 Talaga Raya'], ['2017 – 2020', 'SMPN 1 Atap 28 Buteng']],
      certs: [
        ['LISENSI', 'Lisensi K3 & Surat Keterangan Operator K3 Excavator (Pesawat Angkat dan Angkut)', 'Kementerian Ketenagakerjaan RI', 'Lisensi K3 dan surat keterangan operator K3 excavator (pesawat angkat dan angkut) dari Kementerian Ketenagakerjaan RI. Berlaku hingga 2030.'],
        ['SERTIFIKAT', 'Sertifikat Pelatihan dan Sertifikasi Operator Excavator', 'PT Exa Brilian Wijaya / Exa Institute', 'Sertifikat pelatihan dan sertifikasi operator excavator dari PT Exa Brilian Wijaya / Exa Institute (2025).'],
        ['SERTIFIKAT', 'Certificate of Achievement: Excavator Heavy Equipment Training Activities', 'Exa Institute Samarinda', 'Certificate of Achievement untuk kegiatan pelatihan alat berat excavator dari Exa Institute Samarinda (2025).'],
        ['DOKUMEN', 'Surat Keterangan Pengalaman Kerja — PT. Anugrah Harisma Barakah (AHB)', 'PT. Anugrah Harisma Barakah (AHB)', 'Surat keterangan pengalaman kerja sebagai Operator Excavator di PT. Anugrah Harisma Barakah (AHB), Malapulu, Kabaena Selatan.'],
        ['DOKUMEN', 'Surat Keterangan Pengalaman Kerja — PT. Rimba Perkasa Utama', 'PT. Rimba Perkasa Utama', 'Surat keterangan pengalaman kerja sebagai Operator Excavator di PT. Rimba Perkasa Utama, Kutai Kartanegara, Kalimantan Timur.']
      ],
      technical: ['Pengoperasian Excavator', 'Pemeriksaan dan Perawatan Harian (P2H)', 'Pemeriksaan Kesiapan dan Kelayakan Unit', 'Pemeriksaan Kondisi Alat Berat Sebelum Pengoperasian', 'Pemahaman Prosedur Pengoperasian Alat Berat', 'Penerapan Keselamatan dan Kesehatan Kerja (K3)', 'Pemeliharaan Kebersihan dan Kondisi Unit', 'Pengoperasian Alat Berat di Area Kerja (Site)', 'Koordinasi dengan Tim Operasional di Lapangan', 'Kepatuhan terhadap Instruksi Kerja dan Prosedur Keselamatan'],
      personal: ['Bekerja secara individu maupun dalam tim', 'Cepat beradaptasi dengan lingkungan kerja yang dinamis', 'Komunikasi yang baik', 'Teliti, disiplin, dan fokus dalam menyelesaikan pekerjaan', 'Semangat belajar dan kemauan untuk berkembang', 'Bertanggung jawab terhadap tugas dan pekerjaan yang diberikan', 'Mampu menerima arahan, kritik, dan masukan untuk perbaikan kerja'],
      contactLabels: ['EMAIL', 'DOMISILI', 'WHATSAPP']
    },
    en: {
      headline: 'Excavator Operator — 2 Years of Heavy Equipment Operations Experience | K3 License (Ministry of Manpower RI) | Mining Sites',
      skills: ['Excavator Operator', 'P2H', 'K3'],
      work: [
        ['Nov 2025 – Oct 2026', 'Excavator Operator', 'PT. ANUGRAH HARISMA BARAKAH (AHB) — Malapulu, South Kabaena', ahb, [
          'Operated excavators to support operations and the achievement of production targets at the work site.',
          'Carried out Daily Inspection and Maintenance (P2H) before and after operation to ensure the condition and fitness of the unit.',
          'Applied operating and work safety procedures while operating heavy equipment.']],
        ['Sep 2023 – Oct 2024', 'Excavator Operator', 'PT. RIMBA PERKASA UTAMA — Kutai Kartanegara, East Kalimantan', rimba, [
          'Operated Komatsu PC 200-10 MO CE and Hitachi Zaxis 210 F units to support production activities.',
          'Supported daily production targets while observing standard operating procedures (SOP) and work safety.']]
      ],
      edu: [['2020 – 2023', 'SMA Negeri 1 Talaga Raya'], ['2017 – 2020', 'SMPN 1 Atap 28 Buteng']],
      certs: [
        ['LICENSE', 'K3 License & K3 Excavator Operator Certificate (Lifting Equipment and Hoisting)', 'Ministry of Manpower of the Republic of Indonesia', 'K3 license and K3 excavator operator certificate (lifting equipment and hoisting) from the Ministry of Manpower of the Republic of Indonesia. Valid until 2030.'],
        ['CERTIFICATE', 'Excavator Operator Training and Certification', 'PT Exa Brilian Wijaya / Exa Institute', 'Excavator operator training and certification certificate from PT Exa Brilian Wijaya / Exa Institute (2025).'],
        ['CERTIFICATE', 'Certificate of Achievement: Excavator Heavy Equipment Training Activities', 'Exa Institute Samarinda', 'Certificate of Achievement for excavator heavy equipment training activities from Exa Institute Samarinda (2025).'],
        ['DOCUMENT', 'Work Experience Certificate — PT. Anugrah Harisma Barakah (AHB)', 'PT. Anugrah Harisma Barakah (AHB)', 'Work experience certificate as an Excavator Operator at PT. Anugrah Harisma Barakah (AHB), Malapulu, South Kabaena.'],
        ['DOCUMENT', 'Work Experience Certificate — PT. Rimba Perkasa Utama', 'PT. Rimba Perkasa Utama', 'Work experience certificate as an Excavator Operator at PT. Rimba Perkasa Utama, Kutai Kartanegara, East Kalimantan.']
      ],
      technical: ['Excavator Operation', 'Daily Inspection and Maintenance (P2H)', 'Unit Readiness and Fitness Inspection', 'Heavy Equipment Condition Check Before Operation', 'Understanding of Heavy Equipment Operating Procedures', 'Application of Occupational Safety and Health (K3)', 'Maintaining Unit Cleanliness and Condition', 'Heavy Equipment Operation at the Work Site', 'Coordination with the Field Operations Team', 'Compliance with Work Instructions and Safety Procedures'],
      personal: ['Works both individually and in a team', 'Adapts quickly to dynamic work environments', 'Good communication', 'Meticulous, disciplined, and focused in completing work', 'Eager to learn and willing to develop', 'Responsible for assigned tasks and work', 'Able to accept direction, criticism, and feedback for work improvement'],
      contactLabels: ['EMAIL', 'LOCATION', 'WHATSAPP']
    }
  };
  const build = L => {
    const d = D[L];
    return {
      tx: TX[L], ui: UI[L],
      name: 'Rifan', fullName: 'Rifan',
      headline: d.headline,
      photo: 'assets/foto-profil.png',
      photo2: 'assets/foto-profil2.png',
      sections: IDS.map((id, i) => ({ id, num: '0' + (i + 1), label: NAV[L][i], title: SEC_TITLE[L][i] })),
      work: d.work.map(([period, role, org, imgs, points]) => ({ period, role, org, imgs, points })),
      edu: d.edu.map(([year, title]) => ({ year, title })),
      certs: d.certs.map(([kind, title, issuer, desc], i) => ({ kind, title, issuer, desc, imgSrc: 'assets/sertifikat/' + certFiles[i] + '.jpg' })),
      technical: d.technical,
      personal: d.personal,
      skills: d.skills,
      contacts: [
        { label: d.contactLabels[0], value: 'jrrifan5@gmail.com', href: 'mailto:jrrifan5@gmail.com' },
        { label: d.contactLabels[1], value: 'Dusun Wulu Utara', href: '' },
        { label: d.contactLabels[2], value: '0822 4910 0794', href: 'https://wa.me/6282249100794' }
      ]
    };
  };
  window.CONTENT = { id: build('id'), en: build('en') };
})();
