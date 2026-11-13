// Penyimpanan data di browser (localStorage).
// Kunci penyimpanannya sama dengan versi HTML lama, jadi data lama tetap terbaca.
import type { AttemptLog, TestResults } from "@/types";

const ATTEMPTS_KEY = "geotrap_attempts";
const TESTS_KEY = "geotrap_tests";

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn("Gagal menyimpan ke localStorage:", err);
  }
}

export const loadAttemptLogs = (): AttemptLog[] => readJSON<AttemptLog[]>(ATTEMPTS_KEY, []);
export const saveAttemptLogs = (logs: AttemptLog[]): void => writeJSON(ATTEMPTS_KEY, logs);

export const loadTestResults = (): TestResults => readJSON<TestResults>(TESTS_KEY, {});
export const saveTestResults = (results: TestResults): void => writeJSON(TESTS_KEY, results);
