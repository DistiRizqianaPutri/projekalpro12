# GeoTrap 3D

Platform pembelajaran dan asesmen **literasi matematika SMP** untuk materi keliling dan luas **persegi panjang** serta **trapesium**, dengan visualisasi 3D interaktif (Three.js).

Alur penelitian: **Pre-Test → Eksplorasi Media 3D (3 modul) → Post-Test**, lengkap dengan perhitungan N-Gain dan unduhan rekap data (.CSV).

## Cara Menjalankan

Pastikan [Node.js](https://nodejs.org) versi 18.18 atau lebih baru sudah terpasang.

```bash
npm install      # pasang semua library (sekali saja)
npm run dev      # jalankan aplikasi
```

Buka `http://localhost:3000` di browser.

Perintah lain:

| Perintah | Fungsi |
| --- | --- |
| `npm run build` | Membuat versi siap online |
| `npm run start` | Menjalankan hasil build |
| `npm run lint` | Memeriksa penulisan kode |
| `npm test` | Menjalankan tes perhitungan skor & CSV |

## Supabase (Opsional)

Hasil tes selalu tersimpan di browser (localStorage). Agar juga tersimpan ke Supabase:

1. Salin `.env.example` menjadi `.env.local`.
2. Isi `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Buat tabel `student_assessments` dengan kolom `student_code`, `test_type`, `score`, `correct_count`, `duration_sec`.

## Struktur Folder

```
src/
├── app/
│   ├── layout.tsx            Kerangka halaman, font, judul
│   ├── page.tsx              Halaman utama
│   └── globals.css           Gaya tambahan (scrollbar, slider)
├── components/
│   ├── GeoTrapApp.tsx        Pengatur layar & penyimpanan data
│   ├── LoginScreen.tsx       Layar 1: login kode siswa
│   ├── DashboardScreen.tsx   Layar 2: dashboard alur belajar
│   ├── AssessmentScreen.tsx  Layar 3: Pre-Test / Post-Test + hasil
│   ├── WorkspaceScreen.tsx   Layar 4: ruang eksplorasi 3D
│   └── ThreeShapeCanvas.tsx  Objek 3D (Three.js)
├── data/
│   ├── assessments.ts        Bank soal Pre-Test & Post-Test
│   ├── modules.ts            Daftar modul 3D
│   └── questions.ts          Soal, petunjuk & refleksi tiap modul
├── lib/
│   ├── storage.ts            Simpan/baca data di browser
│   ├── supabase.ts           Koneksi Supabase (opsional)
│   ├── scoring.ts            Hitung skor & N-Gain
│   └── csv.ts                Ekspor rekap data penelitian
└── types/
    └── index.ts              Tipe data TypeScript
```

Untuk mengubah atau menambah soal, cukup edit file di folder `src/data/`.
