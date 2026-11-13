// Daftar modul eksplorasi 3D yang tampil di dashboard.
import type { LearningModule } from "@/types";

export const MODULES: LearningModule[] = [
  {
    id: "mod-01",
    slug: "persegi-panjang",
    title: "1. Keliling & Luas Persegi Panjang",
    badge: "Konsep Dasar",
    description: "Memahami satuan luas dan keliling dengan visualisasi grid 3D."
  },
  {
    id: "mod-02",
    slug: "prasyarat-pythagoras",
    title: "2. Bekal Mencari Tinggi Trapesium",
    badge: "Prasyarat Penting",
    description: "Menemukan tinggi tegak lurus (t) menggunakan segitiga siku-siku."
  },
  {
    id: "mod-03",
    slug: "trapesium-literasi",
    title: "3. Literasi Matematika: Trapesium",
    badge: "Tantangan Kontekstual",
    description: "Menerapkan rumus keliling dan luas trapesium pada masalah nyata."
  }
];
