"use client";

// Komponen utama: mengatur pindah layar dan menyimpan data siswa.
// Alur: Login → Dashboard → (Pre-Test | Eksplorasi 3D | Post-Test) → Dashboard.
import { useEffect, useState } from "react";
import LoginScreen from "./LoginScreen";
import DashboardScreen from "./DashboardScreen";
import AssessmentScreen from "./AssessmentScreen";
import WorkspaceScreen from "./WorkspaceScreen";
import { QUESTIONS } from "@/data/questions";
import { loadAttemptLogs, loadTestResults, saveAttemptLogs, saveTestResults } from "@/lib/storage";
import { syncAssessmentToSupabase } from "@/lib/supabase";
import { buildResearchCSV, downloadCSV } from "@/lib/csv";
import type { AttemptLog, Screen, TestResult, TestResults, TestType } from "@/types";

export default function GeoTrapApp() {
  const [screen, setScreen] = useState<Screen>("login");
  const [studentCode, setStudentCode] = useState("");
  const [attemptLogs, setAttemptLogs] = useState<AttemptLog[]>([]);
  const [testResults, setTestResults] = useState<TestResults>({});
  const [activeTest, setActiveTest] = useState<TestType>("pretest");
  const [activeModuleSlug, setActiveModuleSlug] = useState<string | null>(null);

  // Muat data tersimpan setelah halaman terbuka di browser
  useEffect(() => {
    setAttemptLogs(loadAttemptLogs());
    setTestResults(loadTestResults());
  }, []);

  const goToDashboard = () => setScreen("dashboard");

  const handleLogin = (code: string) => {
    setStudentCode(code);
    setScreen("dashboard");
  };

  const handleLogout = () => {
    setStudentCode("");
    setScreen("login");
  };

  const handleStartAssessment = (type: TestType) => {
    setActiveTest(type);
    setScreen("assessment");
  };

  const handleOpenModule = (slug: string) => {
    if (!QUESTIONS[slug]) return;
    setActiveModuleSlug(slug);
    setScreen("workspace");
  };

  const handleFinishAssessment = (result: TestResult) => {
    const updated: TestResults = {
      ...testResults,
      [studentCode]: { ...testResults[studentCode], [activeTest]: result },
    };
    setTestResults(updated);
    saveTestResults(updated);

    // Sinkronisasi opsional ke Supabase
    void syncAssessmentToSupabase({
      student_code: studentCode,
      test_type: activeTest,
      score: result.score,
      correct_count: result.correct_count,
      duration_sec: result.duration_sec,
    });
  };

  const handleSubmitAttempt = (log: AttemptLog) => {
    const updated = [...attemptLogs, log];
    setAttemptLogs(updated);
    saveAttemptLogs(updated);
  };

  const handleExportCSV = () => {
    const csv = buildResearchCSV(testResults, attemptLogs);
    if (!csv) {
      alert("Belum ada data Pre-Test, Latihan, maupun Post-Test yang tersimpan.");
      return;
    }
    downloadCSV(csv);
  };

  return (
    <div className="app-shell min-h-screen max-w-md mx-auto bg-white flex flex-col relative overflow-hidden">
      {screen === "login" && <LoginScreen onLogin={handleLogin} />}

      {screen === "dashboard" && (
        <DashboardScreen
          studentCode={studentCode}
          attemptLogs={attemptLogs}
          testResults={testResults}
          onLogout={handleLogout}
          onStartAssessment={handleStartAssessment}
          onOpenModule={handleOpenModule}
          onExportCSV={handleExportCSV}
        />
      )}

      {screen === "assessment" && (
        <AssessmentScreen
          key={activeTest}
          testType={activeTest}
          studentCode={studentCode}
          preTestResult={testResults[studentCode]?.pretest}
          onFinish={handleFinishAssessment}
          onBack={goToDashboard}
        />
      )}

      {screen === "workspace" && activeModuleSlug && (
        <WorkspaceScreen
          key={activeModuleSlug}
          question={QUESTIONS[activeModuleSlug]}
          studentCode={studentCode}
          onSubmitAttempt={handleSubmitAttempt}
          onBack={goToDashboard}
        />
      )}
    </div>
  );
}
