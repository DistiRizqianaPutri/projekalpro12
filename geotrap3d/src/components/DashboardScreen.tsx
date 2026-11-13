"use client";

// LAYAR 2: Dashboard alur penelitian (Pre-Test → Eksplorasi 3D → Post-Test).
import { MODULES } from "@/data/modules";
import { QUESTIONS } from "@/data/questions";
import type { AttemptLog, TestResults, TestType } from "@/types";

interface Props {
  studentCode: string;
  attemptLogs: AttemptLog[];
  testResults: TestResults;
  onLogout: () => void;
  onStartAssessment: (type: TestType) => void;
  onOpenModule: (slug: string) => void;
  onExportCSV: () => void;
}

export default function DashboardScreen({
  studentCode,
  attemptLogs,
  testResults,
  onLogout,
  onStartAssessment,
  onOpenModule,
  onExportCSV,
}: Props) {
  const studentTests = testResults[studentCode] ?? {};
  const preScore = studentTests.pretest ? studentTests.pretest.score : null;
  const postScore = studentTests.posttest ? studentTests.posttest.score : null;

  let gainText = "—";
  let gainBadge = preScore !== null ? "Sedang Belajar" : "Tahap Awal";
  if (preScore !== null && postScore !== null) {
    const diff = postScore - preScore;
    gainText = diff >= 0 ? `+${diff}` : `${diff}`;
    gainBadge = diff > 0 ? "Meningkat" : "Terevaluasi";
  }

  const participantCount = Object.keys(testResults).length;

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      {/* Top Bar */}
      <header className="bg-white px-5 py-4 border-b border-slate-200/80 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            3D
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 text-sm leading-tight">GeoTrap 3D</h1>
            <p className="text-[11px] text-slate-500">Alur Belajar &amp; Evaluasi</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 font-mono text-xs font-bold rounded-full border border-blue-200">
            {studentCode}
          </span>
          <button onClick={onLogout} title="Ganti Kode Siswa" className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </button>
        </div>
      </header>

      <main className="p-4 space-y-5 flex-1 overflow-y-auto">
        {/* Ringkasan Skor Pre-Test vs Post-Test */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white p-4 rounded-2xl shadow-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">Progres Literasi Matematika</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/10 text-slate-200">{gainBadge}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-sm">
              <p className="text-[10px] text-slate-300 uppercase font-semibold">Pre-Test</p>
              <p className="text-xl font-extrabold font-mono mt-0.5">{preScore ?? "—"}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-sm">
              <p className="text-[10px] text-slate-300 uppercase font-semibold">Post-Test</p>
              <p className="text-xl font-extrabold font-mono mt-0.5">{postScore ?? "—"}</p>
            </div>
            <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-xl p-2.5">
              <p className="text-[10px] text-emerald-200 uppercase font-semibold">Peningkatan</p>
              <p className="text-xl font-extrabold font-mono text-emerald-300 mt-0.5">{gainText}</p>
            </div>
          </div>
        </div>

        {/* TAHAP 1: PRE-TEST */}
        <section className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Tahap 1 • Asesmen Awal</h2>
            {preScore !== null ? (
              <span className="text-[11px] font-bold text-emerald-600">Selesai ({preScore}/100)</span>
            ) : (
              <span className="text-[11px] font-semibold text-amber-600">Wajib Dikerjakan</span>
            )}
          </div>
          <button
            onClick={() => onStartAssessment("pretest")}
            className="w-full text-left bg-white p-4 rounded-2xl border-2 border-amber-200/80 hover:border-amber-400 shadow-sm transition active:scale-[0.99] flex items-center justify-between gap-3"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-bold text-sm">
                PRE
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Pre-Test Literasi Matematika</h3>
                <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                  5 soal diagnostik awal tanpa bantuan visual 3D (Formulate, Employ, Interpret).
                </p>
              </div>
            </div>
            <span className="text-amber-600 font-bold text-sm shrink-0">Mulai →</span>
          </button>
        </section>

        {/* TAHAP 2: EKSPLORASI 3D */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Tahap 2 • Eksplorasi Media 3D</h2>
            <span className="text-[11px] text-slate-400">Bertahap (3 Modul)</span>
          </div>
          <div className="space-y-2.5">
            {MODULES.map((m) => {
              const qId = QUESTIONS[m.slug].question_id;
              const solved = attemptLogs.some(
                (l) => l.student_code === studentCode && l.question_id === qId && l.is_correct
              );
              return (
                <button
                  key={m.id}
                  onClick={() => onOpenModule(m.slug)}
                  className={`w-full text-left bg-white p-4 rounded-2xl border ${
                    solved ? "border-emerald-300 bg-emerald-50/20" : "border-slate-200/90"
                  } hover:border-blue-500 shadow-xs transition active:scale-[0.99]`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        solved ? "bg-emerald-100 text-emerald-800" : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {solved ? "✓ Selesai" : m.badge}
                    </span>
                    <span className="text-xs text-blue-600 font-bold">Eksplorasi 3D →</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{m.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-snug">{m.description}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* TAHAP 3: POST-TEST */}
        <section className="space-y-2 pb-2">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Tahap 3 • Evaluasi Akhir</h2>
            {postScore !== null ? (
              <span className="text-[11px] font-bold text-emerald-600">Selesai ({postScore}/100)</span>
            ) : (
              <span className="text-[11px] font-semibold text-indigo-600">Setelah Belajar</span>
            )}
          </div>
          <button
            onClick={() => onStartAssessment("posttest")}
            className="w-full text-left bg-white p-4 rounded-2xl border-2 border-indigo-200/80 hover:border-indigo-500 shadow-sm transition active:scale-[0.99] flex items-center justify-between gap-3"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 font-bold text-sm">
                POST
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Post-Test Literasi Matematika</h3>
                <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                  5 soal evaluasi setara untuk mengukur peningkatan pemahaman setelah eksplorasi 3D.
                </p>
              </div>
            </div>
            <span className="text-indigo-600 font-bold text-sm shrink-0">Mulai →</span>
          </button>
        </section>
      </main>

      {/* Footer Export Data Penelitian */}
      <footer className="p-4 bg-white border-t border-slate-200/80">
        <button
          onClick={onExportCSV}
          className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
          <span>Unduh Rekap Pre-Test, Latihan &amp; Post-Test (.CSV)</span>
        </button>
        <p className="text-[11px] text-center text-slate-400 mt-1.5">
          {attemptLogs.length} latihan 3D &amp; {participantCount} peserta tes tersimpan
        </p>
      </footer>
    </div>
  );
}
