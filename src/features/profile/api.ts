import { supabase } from "../../lib/supabase";
export async function ensureProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("No user");
  await supabase.from("profiles").upsert({ id: user.id }, { onConflict: "id" });
}