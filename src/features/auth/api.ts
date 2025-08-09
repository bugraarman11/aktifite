// örn. src/features/auth/api.ts
import { supabase } from "../../lib/supabase";

export async function loginWithEmail(email: string) {
  const { error } = await supabase.auth.signInWithOtp({ email });
  if (error) throw error;
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export function onAuthChange(cb: () => void) {
  return supabase.auth.onAuthStateChange(() => cb());
}
