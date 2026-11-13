// Soal interaktif tiap modul 3D, beserta petunjuk bertahap dan refleksi.
import type { ModuleQuestion } from "@/types";

export const QUESTIONS: Record<string, ModuleQuestion> = {
  "persegi-panjang": {
    question_id: "q-pp-01",
    literacy_process: "Employ (Menerapkan)",
    context_text: "Sebuah karton prakarya dipotong berbentuk persegi panjang.",
    known_data: [
      { label: "Panjang (p)", value: "10 cm", color: "#2563EB" },
      { label: "Lebar (l)", value: "5 cm", color: "#DC2626" }
    ],
    question_prompt: "Berapakah luas permukaan karton tersebut (dalam cm²)?",
    correct_answer: 50,
    unit: "cm²",
    three_js_params: {
      shape: "rectangle",
      topWidth: 10,
      bottomWidth: 10,
      height: 5,
      hideHeightInitially: false,
      allowSliceTransform: false
    },
    hints: [
      { level: 1, text: "Perhatikan kotak satuan pada permukaan 3D. Luas adalah banyaknya persegi satuan yang menutupi bidang.", action: "NONE" },
      { level: 2, text: "Kalikan sisi panjang (garis biru = 10 cm) dengan sisi lebar (garis merah = 5 cm).", action: "SHOW_HEIGHT" },
      { level: 3, text: "Luas = p × l = 10 × 5 = 50 cm².", action: "SHOW_HEIGHT" }
    ],
    reflection: {
      prompt: "Jika karton dipotong menjadi dua bagian sama besar, bagaimana luas total kedua potongan dibanding luas awal?",
      options: [
        "Tetap sama (50 cm²), karena tidak ada bagian karton yang terbuang",
        "Bertambah besar karena jumlah sisinya bertambah",
        "Berkurang setengahnya"
      ],
      correct_index: 0
    }
  },
  "prasyarat-pythagoras": {
    question_id: "q-trap-01",
    literacy_process: "Formulate (Merumuskan)",
    context_text: "Potongan papan kayu berbentuk trapesium sama kaki belum diketahui tingginya.",
    known_data: [
      { label: "Sisi sejajar atas (a)", value: "6 cm", color: "#2563EB" },
      { label: "Sisi sejajar bawah (b)", value: "12 cm", color: "#2563EB" },
      { label: "Sisi miring (c)", value: "5 cm", color: "#059669" }
    ],
    question_prompt: "Tentukan tinggi (t) trapesium tersebut (dalam cm) sebelum menghitung luasnya!",
    correct_answer: 4,
    unit: "cm",
    three_js_params: {
      shape: "trapezoid",
      topWidth: 6,
      bottomWidth: 12,
      height: 4,
      hideHeightInitially: true,
      allowSliceTransform: true
    },
    hints: [
      { level: 1, text: "Nyalakan tombol 'Segitiga Pythagoras' di bawah gambar 3D. Perhatikan segitiga siku-siku di sisi kanan!", action: "SHOW_PYTHAGORAS" },
      { level: 2, text: "Alas segitiga siku-siku kecil di pinggir adalah (12 - 6) : 2 = 3 cm, dan sisi miringnya 5 cm.", action: "SHOW_PYTHAGORAS" },
      { level: 3, text: "Gunakan Pythagoras: t = √(5² - 3²) = √(25 - 9) = √16 = 4 cm.", action: "SHOW_HEIGHT" }
    ],
    reflection: {
      prompt: "Mengapa kita perlu mencari garis tinggi (t) yang tegak lurus (90°) dan tidak langsung memakai sisi miring 5 cm?",
      options: [
        "Karena jarak tegak lurus antar sisi sejajar adalah tinggi trapesium yang menentukan luas",
        "Karena sisi miring hanya dipakai untuk menghitung keliling",
        "Keduanya benar"
      ],
      correct_index: 2
    }
  },
  "trapesium-literasi": {
    question_id: "q-trap-02",
    literacy_process: "Employ & Interpret",
    context_text: "Sebuah taman sekolah berbentuk trapesium sama kaki akan ditanami rumput penuh.",
    known_data: [
      { label: "Sisi sejajar atas (a)", value: "6 m", color: "#2563EB" },
      { label: "Sisi sejajar bawah (b)", value: "10 m", color: "#2563EB" },
      { label: "Tinggi taman (t)", value: "4 m", color: "#DC2626" }
    ],
    question_prompt: "Berapakah luas rumput yang dibutuhkan untuk menutupi seluruh taman (dalam m²)?",
    correct_answer: 32,
    unit: "m²",
    three_js_params: {
      shape: "trapezoid",
      topWidth: 6,
      bottomWidth: 10,
      height: 4,
      hideHeightInitially: false,
      allowSliceTransform: true
    },
    hints: [
      { level: 1, text: "Coba geser slider 'Ubah ke Persegi Panjang' di bawah gambar 3D untuk melihat mengapa rumus luas trapesium bekerja!", action: "ANIMATE_SLICE" },
      { level: 2, text: "Jumlahkan kedua sisi sejajar (a + b = 6 + 10), kalikan dengan tinggi (t = 4), lalu bagi 2.", action: "SHOW_HEIGHT" },
      { level: 3, text: "Luas = ((6 + 10) × 4) : 2 = (16 × 4) : 2 = 64 : 2 = 32 m².", action: "SHOW_HEIGHT" }
    ],
    reflection: {
      prompt: "Saat potongan segitiga trapesium digeser membentuk persegi panjang, panjang barunya adalah rata-rata dari 6 m dan 10 m, yaitu...",
      options: [
        "8 meter, sehingga 8 m × 4 m = 32 m²",
        "16 meter, sehingga 16 m × 4 m = 64 m²",
        "4 meter, sehingga 4 m × 4 m = 16 m²"
      ],
      correct_index: 0
    }
  }
};
