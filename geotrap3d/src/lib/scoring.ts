// Perhitungan skor tes dan N-Gain.

/** Skor 0–100 dari banyak jawaban benar. */
export function calcScore(correctCount: number, total: number): number {
  return Math.round((correctCount / total) * 100);
}

/**
 * N-Gain = (post − pre) / (100 − pre).
 * Jika skor pre-test sudah 100, N-Gain tidak dapat dihitung (pembagi nol), sehingga mengembalikan null.
 */
export function calcNGain(pre: number, post: number): number | null {
  if (pre >= 100) return null;
  return (post - pre) / (100 - pre);
}
