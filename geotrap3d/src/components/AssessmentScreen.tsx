"use client";

// LAYAR 3: Mesin Pre-Test & Post-Test (pilihan ganda) beserta ringkasan hasilnya.
import { useRef, useState } from "react";
import { ASSESSMENTS } from "@/data/assessments";
import { calcNGain, calcScore } from "@/lib/scoring";
import type { TestResult, TestType } from "@/types";

interface Props {
  testType: TestType;
  studentCode: string;
  /** Hasil pre-test siswa ini (untuk perbandingan saat post-test). */
  preTestResult?: TestResult;
  onFinish: (result: TestResult) => void;
  onBack: () => void;
}

const LETTERS = ["A", "B", "C", "D"];

export default function AssessmentScreen({ testType, studentCode, preTestResult, onFinish, onBack }: Props) {
  const test = ASSESSMENTS[testType];
  const total = test.questions.length;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => new Array(total).fill(null));
  const [result, setResult] = useState<TestResult | null>(null);
  const startTimeRef = useRef(Date.now());

  const q = test.questions[currentIdx];
  const isLast = currentIdx === total - 1;

  const selectOption = (optIdx: number) => {
    setAnswers((prev) => prev.map((a, i) => (i === currentIdx ? optIdx : a)));
  };

  const finish = () => {
    let correctCount = 0;
    const items = test.questions.map((question, idx) => {
      const isRight = answers[idx] === question.correctIndex;
      if (isRight) correctCount++;
      return {
        question_id: question.id,
        process: question.process,
        selected_index: answers[idx],
        is_correct: isRight,
      };
    });

    const finalResult: TestResult = {
      timestamp: new Date().toISOString(),
      score: calcScore(correctCount, total),
      correct_count: correctCount,
      total_questions: total,
      duration_sec: Math.round((Date.now() - startTimeRef.current) / 1000),
      items,
    };
    setResult(finalResult);
    onFinish(finalResult);
  };

  const next = () => {
    if (answers[currentIdx] === null) {
      alert("Pilih salah satu jawaban (A, B, C, atau D) terlebih dahulu.");
      return;
    }
    if (isLast) finish();
    else setCurrentIdx((i) => i + 1);
  };

  const prev = () => {
    if (currentIdx > 0) setCurrentIdx((i) => i - 1);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      {/* Header Tes */}
      <header className="bg-white px-4 py-3 border-b border-slate-200 flex items-center justify-between sticky top-0 z-20">
        <button onClick={onBack} className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1">
          ← Batal
        </button>
        <div className="text-center">
          <span
            className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full ${test.badgeClass}`}
          >
            {test.title}
          </span>
        </div>
        <span className="font-mono text-xs font-bold text-slate-700">
          {currentIdx + 1} / {total}
        </span>
      </header>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-200">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / total) * 100}%` }}
        />
      </div>

      <main className="p-4 flex-1 overflow-y-auto space-y-4">
        {result ? (
          <ResultSummary
            testType={testType}
            studentCode={studentCode}
            result={result}
            preTestResult={preTestResult}
            onBack={onBack}
          />
        ) : (
          <>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {q.process}
                </span>
                <span className="font-mono text-[11px] text-slate-400">{q.id}</span>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">{q.context}</p>

              {q.svgDiagram && (
                <div
                  className="bg-slate-50 border border-slate-200/80 rounded-xl p-2"
                  // Diagram SVG berasal dari bank soal sendiri (bukan input pengguna), jadi aman dirender.
                  dangerouslySetInnerHTML={{ __html: q.svgDiagram }}
                />
              )}

              <p className="text-sm font-bold text-slate-900 pt-1">{q.prompt}</p>
            </div>

            <div className="space-y-2">
              {q.options.map((opt, idx) => {
                const isSelected = answers[currentIdx] === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => selectOption(idx)}
                    className={`w-full text-left p-3.5 rounded-2xl border-2 transition flex items-start gap-3 ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/70 text-blue-950 font-semibold shadow-xs"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                        isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {LETTERS[idx]}
                    </span>
                    <span className="text-xs leading-relaxed pt-0.5">{opt}</span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </main>

      {/* Navigasi Bawah Tes (disembunyikan setelah selesai) */}
      {!result && (
        <footer className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={prev}
            disabled={currentIdx === 0}
            className="px-4 py-3 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold disabled:opacity-40"
          >
            ← Sebelumnya
          </button>
          <button
            onClick={next}
            className={`flex-1 py-3 ${
              isLast ? "bg-emerald-600 hover:bg-emerald-700" : "bg-blue-600 hover:bg-blue-700"
            } text-white text-xs font-bold rounded-xl shadow-sm transition`}
          >
            {isLast ? "Selesai & Lihat Hasil ✓" : "Soal Berikutnya →"}
          </button>
        </footer>
      )}
    </div>
  );
}

// ---------------------------------------------------------------
// Ringkasan hasil tes
// ---------------------------------------------------------------
function ResultSummary({
  testType,
  studentCode,
  result,
  preTestResult,
  onBack,
}: {
  testType: TestType;
  studentCode: string;
  result: TestResult;
  preTestResult?: TestResult;
  onBack: () => void;
}) {
  const test = ASSESSMENTS[testType];
  const showComparison = testType === "posttest" && preTestResult;

  let delta = 0;
  let nGainText = "";
  if (showComparison) {
    delta = result.score - preTestResult.score;
    const nGain = calcNGain(preTestResult.score, result.score);
    nGainText = nGain !== null ? nGain.toFixed(2) : "1.00";
  }

  return (
    <>
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center space-y-3">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${test.badgeClass}`}>
          {test.title} SELESAI
        </span>
        <p className="text-xs text-slate-500">Skor Literasi Matematika Kamu ({studentCode})</p>
        <div className="text-5xl font-extrabold font-mono text-slate-900 py-1">{result.score}</div>
        <p className="text-xs font-semibold text-slate-600">
          Menjawab benar <strong>{result.correct_count}</strong> dari <strong>{result.total_questions}</strong> soal (
          {result.duration_sec} detik)
        </p>
      </div>

      {showComparison && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-2">
          <p className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider">Analisis Peningkatan (Pre vs Post)</p>
          <div className="grid grid-cols-3 gap-2 text-center pt-1">
            <div className="bg-white p-2 rounded-xl border border-emerald-100">
              <p className="text-[10px] text-slate-500">Pre-Test</p>
              <p className="font-mono font-bold text-slate-800">{preTestResult.score}</p>
            </div>
            <div className="bg-white p-2 rounded-xl border border-emerald-100">
              <p className="text-[10px] text-slate-500">Post-Test</p>
              <p className="font-mono font-bold text-indigo-700">{result.score}</p>
            </div>
            <div className="bg-emerald-600 text-white p-2 rounded-xl">
              <p className="text-[10px] text-emerald-100">N-Gain</p>
              <p className="font-mono font-bold">{nGainText}</p>
            </div>
          </div>
          <p className="text-[11px] text-emerald-800 text-center pt-1">
            Selisih skor: <strong>{delta >= 0 ? `+${delta}` : delta} poin</strong>
          </p>
        </div>
      )}

      <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
        <p className="text-xs font-bold text-slate-800">Rincian Per Aspek Literasi Matematika:</p>
        {result.items.map((item, i) => (
          <div
            key={item.question_id}
            className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 last:border-none"
          >
            <span className="text-slate-600">
              {i + 1}. {item.process}
            </span>
            <span className={`font-bold ${item.is_correct ? "text-emerald-600" : "text-red-500"}`}>
              {item.is_correct ? "✓ Benar" : "✗ Perlu Latihan"}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={onBack}
        className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-2xl shadow-sm transition"
      >
        {testType === "pretest" ? "Lanjut ke Eksplorasi Media 3D →" : "Kembali ke Beranda Utama →"}
      </button>
    </>
  );
}
