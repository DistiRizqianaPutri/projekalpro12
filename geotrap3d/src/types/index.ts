// Tipe data yang dipakai di seluruh aplikasi GeoTrap 3D.

export type TestType = "pretest" | "posttest";

export type Screen = "login" | "dashboard" | "assessment" | "workspace";

/** Satu soal pilihan ganda pada Pre-Test / Post-Test. */
export interface AssessmentQuestion {
  id: string;
  process: string;
  context: string;
  prompt: string;
  /** Diagram SVG (teks) atau null jika soal tanpa gambar. */
  svgDiagram: string | null;
  options: string[];
  correctIndex: number;
}

export interface Assessment {
  title: string;
  badgeClass: string;
  subtitle: string;
  questions: AssessmentQuestion[];
}

export interface LearningModule {
  id: string;
  slug: string;
  title: string;
  badge: string;
  description: string;
}

export type HintAction = "NONE" | "SHOW_HEIGHT" | "SHOW_PYTHAGORAS" | "ANIMATE_SLICE";

export interface Hint {
  level: number;
  text: string;
  action: HintAction;
}

export interface ThreeParams {
  shape: "rectangle" | "trapezoid";
  topWidth: number;
  bottomWidth: number;
  height: number;
  hideHeightInitially: boolean;
  allowSliceTransform: boolean;
}

/** Soal isian pada ruang eksplorasi 3D. */
export interface ModuleQuestion {
  question_id: string;
  literacy_process: string;
  context_text: string;
  known_data: { label: string; value: string; color: string }[];
  question_prompt: string;
  correct_answer: number;
  unit: string;
  three_js_params: ThreeParams;
  hints: Hint[];
  reflection: {
    prompt: string;
    options: string[];
    correct_index: number;
  };
}

/** Catatan satu kali percobaan menjawab di ruang 3D. */
export interface AttemptLog {
  timestamp: string;
  student_code: string;
  question_id: string;
  submitted_answer: number;
  is_correct: boolean;
  hints_used_count: number;
  time_spent_sec: number;
}

export interface ItemResult {
  question_id: string;
  process: string;
  selected_index: number | null;
  is_correct: boolean;
}

export interface TestResult {
  timestamp: string;
  score: number;
  correct_count: number;
  total_questions: number;
  duration_sec: number;
  items: ItemResult[];
}

/** Hasil tes per kode siswa, misalnya { S01: { pretest: {...}, posttest: {...} } } */
export type TestResults = Record<string, Partial<Record<TestType, TestResult>>>;
