"use client";

// LAYAR 1: Login dengan kode siswa (tanpa email / kata sandi).
import { useState, type FormEvent } from "react";

interface Props {
  onLogin: (code: string) => void;
}

export default function LoginScreen({ onLogin }: Props) {
  const [code, setCode] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleaned = code.trim().toUpperCase();
    if (!cleaned) return;
    onLogin(cleaned);
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-6 py-8 bg-gradient-to-b from-slate-50 via-white to-blue-50/30">
      <div className="pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[11px] font-bold tracking-wide uppercase mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          Media Pembelajaran Interaktif 3D
        </div>

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-lg shadow-blue-600/20 mb-5">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">GeoTrap 3D</h1>
        <p className="text-sm text-slate-500 mt-2 leading-relaxed">
          Eksplorasi keliling &amp; luas <span className="font-semibold text-slate-700">persegi panjang</span> serta{" "}
          <span className="font-semibold text-slate-700">trapesium</span> untuk meningkatkan kemampuan{" "}
          <span className="font-semibold text-blue-600">Literasi Matematika</span>.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 my-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
          <label htmlFor="input-student-code" className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Kode Identitas Siswa
          </label>
          <input
            type="text"
            id="input-student-code"
            placeholder="Ketik kode (misal: S01)"
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-3.5 text-lg font-mono font-bold uppercase tracking-widest bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none transition"
          />
          <p className="text-[11px] text-slate-400">Tanpa email atau kata sandi. Gunakan kode dari guru/peneliti.</p>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.99] text-white font-bold rounded-2xl shadow-md shadow-blue-600/20 transition flex items-center justify-center gap-2 text-sm"
        >
          <span>Masuk ke Ruang Belajar</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </form>

      <div className="p-3.5 rounded-2xl bg-slate-100/80 border border-slate-200/70 flex items-center justify-between text-xs text-slate-600">
        <span>Kode Uji Coba Cepat:</span>
        <button
          type="button"
          onClick={() => setCode("S01")}
          className="font-mono font-bold px-3 py-1 bg-white border border-slate-300 rounded-lg text-blue-700 hover:bg-blue-50 transition"
        >
          S01
        </button>
      </div>
    </div>
  );
}
