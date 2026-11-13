"use client";

// LAYAR 4: Ruang eksplorasi 3D interaktif (pengelolaan cognitive load).
// Berisi kanvas 3D, soal literasi ringkas, petunjuk bertahap (faded scaffolding), dan refleksi.
import { useRef, useState, type FormEvent } from "react";
import dynamic from "next/dynamic";
import type { AttemptLog, ModuleQuestion } from "@/types";

// Three.js hanya berjalan di browser, jadi kanvas dimuat tanpa server-side rendering.
const ThreeShapeCanvas = dynamic(() => import("./ThreeShapeCanvas"), { ssr: false });

interface Props {
  question: ModuleQuestion;
  studentCode: string;
  onSubmitAttempt: (log: AttemptLog) => void;
  onBack: () => void;
}

const BTN_BASE = "text-xs px-2.5 py-1.5 rounded-lg font-semibold border transition";
const BTN_OFF = `${BTN_BASE} bg-slate-50 text-slate-600 border-slate-200`;

export default function WorkspaceScreen({ question, studentCode, onSubmitAttempt, onBack }: Props) {
  const params = question.three_js_params;

  const [showHeight, setShowHeight] = useState(!params.hideHeightInitially);
  const [showPythagoras, setShowPythagoras] = useState(false);
  const [slice, setSlice] = useState(0);
  const [resetSignal, setResetSignal] = useState(0);

  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<{ correct: boolean } | null>(null);
  const [showReflection, setShowReflection] = useState(false);
  const [reflectionPick, setReflectionPick] = useState<number | null>(null);
  const [unlockedHintLevel, setUnlockedHintLevel] = useState(0);
  const startTimeRef = useRef(Date.now());

  const unlockNextHint = () => {
    if (unlockedHintLevel >= 3) return;
    const hint = question.hints[unlockedHintLevel];
    if (hint.action === "SHOW_PYTHAGORAS") setShowPythagoras(true);
    else if (hint.action === "SHOW_HEIGHT") setShowHeight(true);
    else if (hint.action === "ANIMATE_SLICE") setSlice(1);
    setUnlockedHintLevel((lvl) => lvl + 1);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const val = parseFloat(answer);
    if (isNaN(val)) return;

    const isCorrect = Math.abs(val - question.correct_answer) < 0.01;
    setFeedback({ correct: isCorrect });
    if (isCorrect) setShowReflection(true);

    onSubmitAttempt({
      timestamp: new Date().toISOString(),
      student_code: studentCode,
      question_id: question.question_id,
      submitted_answer: val,
      is_correct: isCorrect,
      hints_used_count: unlockedHintLevel,
      time_spent_sec: Math.round((Date.now() - startTimeRef.current) / 1000),
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <header className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between bg-white sticky top-0 z-10">
        <button onClick={onBack} className="text-xs font-bold text-slate-600 hover:text-slate-900">
          ← Beranda
        </button>
        <span className="text-[11px] font-bold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100">
          {question.literacy_process}
        </span>
        <span className="font-mono text-xs font-bold text-slate-700">{studentCode}</span>
      </header>

      {/* KANVAS 3D */}
      <section className="bg-slate-50 border-b border-slate-200 flex flex-col">
        <div className="relative w-full h-[245px]">
          <ThreeShapeCanvas
            params={params}
            showHeight={showHeight}
            showPythagoras={showPythagoras}
            slice={slice}
            resetSignal={resetSignal}
          />
          <span className="absolute top-2.5 left-3 text-[10px] font-semibold bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-slate-500 border border-slate-200/80 shadow-xs pointer-events-none">
            Sentuh &amp; geser untuk memutar 3D
          </span>
        </div>

        {/* Kontrol Visual Anti-Clutter */}
        <div className="px-3 py-2 bg-white border-t border-slate-100 flex flex-wrap items-center justify-between gap-1.5">
          <button
            onClick={() => setShowHeight((v) => !v)}
            className={showHeight ? `${BTN_BASE} bg-red-50 text-red-700 border-red-200` : BTN_OFF}
          >
            Garis Tinggi (t)
          </button>

          {params.shape === "trapezoid" && (
            <button
              onClick={() => setShowPythagoras((v) => !v)}
              className={showPythagoras ? `${BTN_BASE} bg-purple-50 text-purple-700 border-purple-200` : BTN_OFF}
            >
              Segitiga Pythagoras
            </button>
          )}

          <button
            onClick={() => setResetSignal((n) => n + 1)}
            className="text-xs px-2.5 py-1.5 rounded-lg font-semibold bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
          >
            Reset Sudut
          </button>
        </div>

        {/* Slider Pembuktian Rumus (Germane Load) */}
        {params.allowSliceTransform && (
          <div className="px-4 py-2.5 bg-amber-50/90 border-t border-amber-200/70 flex items-center gap-3">
            <span className="text-[11px] font-bold text-amber-900 whitespace-nowrap">Ubah ke Persegi Panjang:</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.02}
              value={slice}
              onChange={(e) => setSlice(parseFloat(e.target.value))}
              className="w-full accent-amber-600 h-1.5 bg-amber-200 rounded-lg cursor-pointer"
            />
          </div>
        )}
      </section>

      {/* KARTU SOAL LITERASI MATEMATIKA */}
      <section className="p-4 flex-1 space-y-4 overflow-y-auto">
        <div className="bg-slate-50/90 p-4 rounded-2xl border border-slate-200/90 space-y-2.5">
          <p className="text-sm text-slate-700 leading-snug">{question.context_text}</p>

          <div className="space-y-1.5 pt-2 border-t border-slate-200/80">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Data Ukuran (Sesuai Warna Garis 3D):
            </p>
            <div className="space-y-1">
              {question.known_data.map((d) => (
                <div key={d.label} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 font-medium text-slate-700">
                    <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: d.color }} />
                    {d.label}
                  </span>
                  <span className="font-mono font-bold text-slate-900">{d.value}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm font-bold text-slate-900 pt-1.5">{question.question_prompt}</p>
        </div>

        {/* Form Jawaban */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="number"
              step="any"
              placeholder="Ketik angka..."
              required
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full px-3.5 py-3 border-2 border-slate-200 rounded-xl font-mono font-bold text-base focus:border-blue-600 focus:outline-none"
            />
            <span className="absolute right-3.5 top-3.5 text-xs font-bold text-slate-400">{question.unit}</span>
          </div>
          <button
            type="submit"
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-sm active:scale-[0.98]"
          >
            Periksa
          </button>
        </form>

        {/* Umpan Balik */}
        {feedback && (
          <div
            className={`p-3.5 rounded-xl border text-xs leading-relaxed font-semibold ${
              feedback.correct
                ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            {feedback.correct
              ? `Tepat sekali! Jawabanmu benar (${question.correct_answer} ${question.unit}).`
              : "Belum tepat. Periksa kembali ukuran pada gambar 3D atau buka Petunjuk Bertahap."}
          </div>
        )}

        {/* Refleksi Penalaran */}
        {showReflection && (
          <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200 space-y-2.5">
            <p className="text-xs font-extrabold text-indigo-950">Refleksi Penalaran Literasi Matematika:</p>
            <p className="text-xs text-indigo-900 leading-snug">{question.reflection.prompt}</p>
            <div className="space-y-1.5 pt-1">
              {question.reflection.options.map((opt, idx) => {
                const picked = reflectionPick === idx;
                const isRight = idx === question.reflection.correct_index;
                let cls = "w-full text-left text-xs p-2.5 rounded-xl border bg-white text-slate-700 border-indigo-100";
                if (reflectionPick === null) cls += " hover:border-indigo-300 transition";
                if (picked) {
                  cls = isRight
                    ? "w-full text-left text-xs p-2.5 rounded-xl border bg-emerald-600 text-white border-emerald-600 font-semibold"
                    : "w-full text-left text-xs p-2.5 rounded-xl border bg-amber-100 text-amber-900 border-amber-300";
                }
                return (
                  <button key={idx} type="button" onClick={() => setReflectionPick(idx)} className={cls}>
                    {opt}
                  </button>
                );
              })}
            </div>
            <button
              onClick={onBack}
              className="w-full mt-2 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition"
            >
              Selesai &amp; Kembali ke Beranda →
            </button>
          </div>
        )}

        {/* Petunjuk Bertahap (Faded Scaffolding) */}
        <div className="pt-1">
          {unlockedHintLevel < 3 && (
            <button
              onClick={unlockNextHint}
              className="w-full py-2.5 px-4 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition"
            >
              Butuh Petunjuk Bertahap? (Buka Tahap {unlockedHintLevel + 1} dari 3)
            </button>
          )}
          <div className="mt-2.5 space-y-2">
            {question.hints.slice(0, unlockedHintLevel).map((hint) => (
              <div key={hint.level} className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-slate-800">
                <span className="font-bold text-amber-800">Petunjuk {hint.level}: </span>
                {hint.text}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
