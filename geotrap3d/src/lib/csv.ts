// Ekspor rekap data penelitian (Pre-Test, latihan 3D, Post-Test) ke file CSV.
import type { AttemptLog, TestResults } from "@/types";
import { calcNGain } from "./scoring";

const HEADERS = [
  "Kode_Siswa",
  "Skor_PreTest",
  "Benar_PreTest",
  "Durasi_PreTest_Detik",
  "Skor_PostTest",
  "Benar_PostTest",
  "Durasi_PostTest_Detik",
  "Selisih_Skor",
  "N_Gain",
  "Total_Percobaan_Latihan_3D",
  "Total_Hint_Dipakai",
];

/** Menyusun isi CSV. Mengembalikan null jika belum ada data sama sekali. */
export function buildResearchCSV(testResults: TestResults, attemptLogs: AttemptLog[]): string | null {
  const allCodes = new Set([...Object.keys(testResults), ...attemptLogs.map((a) => a.student_code)]);
  if (allCodes.size === 0) return null;

  const rows = Array.from(allCodes).map((code) => {
    const pre = testResults[code]?.pretest;
    const post = testResults[code]?.posttest;
    const studentAttempts = attemptLogs.filter((a) => a.student_code === code);
    const totalHints = studentAttempts.reduce((sum, item) => sum + item.hints_used_count, 0);
    const nGain = pre && post ? calcNGain(pre.score, post.score) : null;

    return [
      code,
      pre ? pre.score : "",
      pre ? `${pre.correct_count}/${pre.total_questions}` : "",
      pre ? pre.duration_sec : "",
      post ? post.score : "",
      post ? `${post.correct_count}/${post.total_questions}` : "",
      post ? post.duration_sec : "",
      pre && post ? post.score - pre.score : "",
      nGain !== null ? nGain.toFixed(3) : "",
      studentAttempts.length,
      totalHints,
    ];
  });

  return [HEADERS.join(","), ...rows.map((r) => r.join(","))].join("\n");
}

/** Mengunduh CSV di browser. */
export function downloadCSV(content: string): void {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `data_penelitian_literasi_matematika_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
