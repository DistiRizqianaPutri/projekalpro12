// Bank soal Pre-Test & Post-Test (paralel dan terukur).
// Mengukur 3 aspek Mathematical Literacy: Formulate, Employ, Interpret.
import type { Assessment, TestType } from "@/types";

export const ASSESSMENTS: Record<TestType, Assessment> = {
  pretest: {
    title: "PRE-TEST LITERASI MATEMATIKA",
    badgeClass: "bg-amber-100 text-amber-800",
    subtitle: "Kerjakan secara mandiri tanpa bantuan 3D untuk memetakan pemahaman awalmu.",
    questions: [
      {
        id: "PRE-01",
        process: "Formulate (Merumuskan)",
        context: "Sebuah bingkai foto kayu berbentuk persegi panjang memiliki ukuran panjang 12 cm dan lebar 8 cm.",
        prompt: "Jika sekeliling tepi bingkai akan dipasangi pita hias, berapakah panjang pita minimal yang diperlukan?",
        svgDiagram: `
          <svg viewBox="0 0 240 110" class="w-full h-28 mx-auto">
            <rect x="45" y="20" width="150" height="70" fill="#FEF9C3" stroke="#2563EB" stroke-width="2.5" rx="2"/>
            <text x="120" y="14" text-anchor="middle" font-size="11" font-weight="bold" fill="#1E293B">p = 12 cm</text>
            <text x="203" y="58" text-anchor="start" font-size="11" font-weight="bold" fill="#DC2626">l = 8 cm</text>
          </svg>
        `,
        options: ["20 cm", "40 cm", "96 cm", "48 cm"],
        correctIndex: 1
      },
      {
        id: "PRE-02",
        process: "Employ (Menerapkan)",
        context: "Selembar kertas lipat berbentuk trapesium memiliki dua sisi sejajar dengan panjang 7 cm dan 13 cm, serta tinggi 5 cm.",
        prompt: "Berapakah luas permukaan kertas trapesium tersebut?",
        svgDiagram: `
          <svg viewBox="0 0 240 115" class="w-full h-28 mx-auto">
            <polygon points="75,22 165,22 195,90 45,90" fill="#FEF9C3" stroke="#2563EB" stroke-width="2.5"/>
            <line x1="75" y1="22" x2="75" y2="90" stroke="#DC2626" stroke-width="2" stroke-dasharray="4"/>
            <polyline points="75,82 83,82 83,90" fill="none" stroke="#DC2626" stroke-width="1.5"/>
            <text x="120" y="15" text-anchor="middle" font-size="11" font-weight="bold" fill="#2563EB">a = 7 cm</text>
            <text x="120" y="105" text-anchor="middle" font-size="11" font-weight="bold" fill="#2563EB">b = 13 cm</text>
            <text x="80" y="60" text-anchor="start" font-size="11" font-weight="bold" fill="#DC2626">t = 5 cm</text>
          </svg>
        `,
        options: ["35 cm²", "50 cm²", "65 cm²", "100 cm²"],
        correctIndex: 1
      },
      {
        id: "PRE-03",
        process: "Formulate & Employ (Prasyarat Tinggi)",
        context: "Sebuah taman hias berbentuk trapesium sama kaki memiliki sisi sejajar atas 8 m, sisi sejajar bawah 14 m, dan sisi miring 5 m.",
        prompt: "Berapakah luas taman hias tersebut?",
        svgDiagram: `
          <svg viewBox="0 0 240 115" class="w-full h-28 mx-auto">
            <polygon points="80,22 160,22 195,90 45,90" fill="#FEF9C3" stroke="#2563EB" stroke-width="2.5"/>
            <text x="120" y="15" text-anchor="middle" font-size="11" font-weight="bold" fill="#2563EB">8 m</text>
            <text x="120" y="105" text-anchor="middle" font-size="11" font-weight="bold" fill="#2563EB">14 m</text>
            <text x="53" y="54" text-anchor="end" font-size="11" font-weight="bold" fill="#059669">5 m</text>
            <text x="187" y="54" text-anchor="start" font-size="11" font-weight="bold" fill="#059669">5 m</text>
          </svg>
        `,
        options: ["44 m²", "55 m²", "32 m²", "88 m²"],
        correctIndex: 0
      },
      {
        id: "PRE-04",
        process: "Employ (Konteks Gabungan)",
        context: "Sebuah lantai ruang kelas berbentuk persegi panjang berukuran 8 m × 6 m akan ditutup ubin. Di salah satu sudut terdapat panggung kecil berbentuk trapesium dengan sisi sejajar 2 m dan 4 m serta tinggi 2 m yang tidak perlu diubin.",
        prompt: "Berapakah luas lantai yang akan dipasangi ubin?",
        svgDiagram: null,
        options: ["48 m²", "42 m²", "36 m²", "54 m²"],
        correctIndex: 1
      },
      {
        id: "PRE-05",
        process: "Interpret & Evaluate (Menafsirkan)",
        context: "Rina menghitung luas trapesium sama kaki (sisi sejajar 6 cm dan 10 cm, sisi miring 5 cm, tinggi 4 cm) dengan cara mengalikan rata-rata sisi sejajar dengan sisi miring: ((6 + 10) : 2) × 5 = 40 cm².",
        prompt: "Manakah pernyataan evaluasi yang paling tepat terhadap langkah Rina?",
        svgDiagram: null,
        options: [
          "Benar, karena sisi miring dan tinggi memiliki fungsi yang sama dalam luas",
          "Salah, seharusnya dikalikan tinggi 4 cm (hasil 32 cm²) karena luas diukur tegak lurus antar sisi sejajar",
          "Salah, seharusnya semua sisi dijumlahkan saja (6 + 10 + 5 + 5 = 26 cm²)",
          "Benar, asalkan trapesiumnya sama kaki"
        ],
        correctIndex: 1
      }
    ]
  },
  posttest: {
    title: "POST-TEST LITERASI MATEMATIKA",
    badgeClass: "bg-indigo-100 text-indigo-800",
    subtitle: "Evaluasi akhir setelah menggunakan GeoTrap 3D. Terapkan konsep yang telah kamu pelajari!",
    questions: [
      {
        id: "POST-01",
        process: "Formulate (Merumuskan)",
        context: "Sebuah papan mading kelas berbentuk persegi panjang memiliki panjang 15 dm dan lebar 9 dm.",
        prompt: "Jika sekeliling tepi papan mading akan dipasangi lis aluminium, berapa panjang lis minimal yang dibutuhkan?",
        svgDiagram: `
          <svg viewBox="0 0 240 110" class="w-full h-28 mx-auto">
            <rect x="45" y="20" width="150" height="70" fill="#E0E7FF" stroke="#2563EB" stroke-width="2.5" rx="2"/>
            <text x="120" y="14" text-anchor="middle" font-size="11" font-weight="bold" fill="#1E293B">p = 15 dm</text>
            <text x="203" y="58" text-anchor="start" font-size="11" font-weight="bold" fill="#DC2626">l = 9 dm</text>
          </svg>
        `,
        options: ["24 dm", "48 dm", "135 dm", "67,5 dm"],
        correctIndex: 1
      },
      {
        id: "POST-02",
        process: "Employ (Menerapkan)",
        context: "Sebuah ubin keramik dekoratif berbentuk trapesium memiliki dua sisi sejajar 8 cm dan 14 cm, serta jarak tegak lurus antar sisi sejajar (tinggi) 6 cm.",
        prompt: "Berapakah luas permukaan satu ubin keramik tersebut?",
        svgDiagram: `
          <svg viewBox="0 0 240 115" class="w-full h-28 mx-auto">
            <polygon points="75,22 165,22 195,90 45,90" fill="#E0E7FF" stroke="#2563EB" stroke-width="2.5"/>
            <line x1="75" y1="22" x2="75" y2="90" stroke="#DC2626" stroke-width="2" stroke-dasharray="4"/>
            <polyline points="75,82 83,82 83,90" fill="none" stroke="#DC2626" stroke-width="1.5"/>
            <text x="120" y="15" text-anchor="middle" font-size="11" font-weight="bold" fill="#2563EB">a = 8 cm</text>
            <text x="120" y="105" text-anchor="middle" font-size="11" font-weight="bold" fill="#2563EB">b = 14 cm</text>
            <text x="80" y="60" text-anchor="start" font-size="11" font-weight="bold" fill="#DC2626">t = 6 cm</text>
          </svg>
        `,
        options: ["44 cm²", "66 cm²", "84 cm²", "132 cm²"],
        correctIndex: 1
      },
      {
        id: "POST-03",
        process: "Formulate & Employ (Prasyarat Tinggi)",
        context: "Atap bagian depan sebuah gazebo berbentuk trapesium sama kaki dengan sisi sejajar atas 6 m, sisi sejajar bawah 18 m, dan panjang sisi miring 10 m.",
        prompt: "Tentukan luas bagian atap gazebo berbentuk trapesium tersebut!",
        svgDiagram: `
          <svg viewBox="0 0 240 115" class="w-full h-28 mx-auto">
            <polygon points="85,22 155,22 195,90 45,90" fill="#E0E7FF" stroke="#2563EB" stroke-width="2.5"/>
            <text x="120" y="15" text-anchor="middle" font-size="11" font-weight="bold" fill="#2563EB">6 m</text>
            <text x="120" y="105" text-anchor="middle" font-size="11" font-weight="bold" fill="#2563EB">18 m</text>
            <text x="56" y="54" text-anchor="end" font-size="11" font-weight="bold" fill="#059669">10 m</text>
            <text x="184" y="54" text-anchor="start" font-size="11" font-weight="bold" fill="#059669">10 m</text>
          </svg>
        `,
        options: ["120 m²", "96 m²", "72 m²", "192 m²"],
        correctIndex: 1
      },
      {
        id: "POST-04",
        process: "Employ (Konteks Gabungan)",
        context: "Selembar karton persegi panjang berukuran 10 cm × 7 cm dipotong bagian dalamnya membentuk lubang trapesium dengan sisi sejajar 4 cm dan 6 cm serta tinggi 3 cm.",
        prompt: "Berapakah luas sisa karton di luar lubang trapesium tersebut?",
        svgDiagram: null,
        options: ["70 cm²", "55 cm²", "40 cm²", "15 cm²"],
        correctIndex: 1
      },
      {
        id: "POST-05",
        process: "Interpret & Evaluate (Menafsirkan)",
        context: "Sebuah trapesium dipotong bagian segitiga siku-siku di ujung kanannya lalu digeser menempel ke sisi kiri hingga membentuk persegi panjang utuh dengan lebar sama dengan tinggi trapesium.",
        prompt: "Kesimpulan matematis mana yang terbukti dari perubahan bentuk tersebut?",
        svgDiagram: null,
        options: [
          "Keliling trapesium selalu sama dengan keliling persegi panjang baru",
          "Luas trapesium sama dengan luas persegi panjang yang panjangnya merupakan rata-rata kedua sisi sejajar ((a + b) : 2)",
          "Tinggi trapesium berubah menjadi lebih pendek saat digeser",
          "Sisi miring trapesium menjadi panjang persegi panjang"
        ],
        correctIndex: 1
      }
    ]
  }
};
