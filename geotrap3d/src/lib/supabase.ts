// Konfigurasi opsional Supabase (sinkronisasi hasil tes ke cloud).
// Isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY di file .env.local.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabaseClient: SupabaseClient | null =
  SUPABASE_URL && SUPABASE_ANON_KEY ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

export async function syncAssessmentToSupabase(row: {
  student_code: string;
  test_type: string;
  score: number;
  correct_count: number;
  duration_sec: number;
}): Promise<void> {
  if (!supabaseClient) return;
  try {
    await supabaseClient.from("student_assessments").insert([row]);
  } catch (err) {
    console.warn("Supabase sync skipped:", err);
  }
}
