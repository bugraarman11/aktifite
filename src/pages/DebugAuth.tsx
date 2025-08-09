import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DebugAuth() {
  const [email, setEmail] = useState("");

  const checkEnv = () => {
    console.log("VITE_SUPABASE_URL =", import.meta.env.VITE_SUPABASE_URL);
    console.log("VITE_SUPABASE_ANON_KEY length =", import.meta.env.VITE_SUPABASE_ANON_KEY?.length);
  };

  const testOtp = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // BURASI Supabase Studio → Auth Settings → Redirect URLs ile birebir eşleşmeli
        emailRedirectTo: "http://localhost:5173", 
        shouldCreateUser: true,
      },
    });
    console.log("OTP error:", error);
  };

  const testPW = async () => {
    // Geçici password akışı — Providers → Email'de "Email + Password" açık olmalı
    const pwd = "Test1234!";
    const signUp = await supabase.auth.signUp({ email, password: pwd });
    console.log("signUp:", signUp.error || signUp.data);
    const signIn = await supabase.auth.signInWithPassword({ email, password: pwd });
    console.log("signIn:", signIn.error || signIn.data);
  };

  const whoAmI = async () => {
    const s = await supabase.auth.getSession();
    console.log("session:", s.data.session);
  };

  const ensureProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { console.log("no user"); return; }
    const { error } = await supabase.from("profiles").upsert({ id: user.id }, { onConflict: "id" });
    console.log("upsert profile error:", error);
  };

  return (
    <div style={{ padding: 16 }}>
      <h3>Debug Auth</h3>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@mail.com" />
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button onClick={checkEnv}>Check ENV</button>
        <button onClick={testOtp}>Test Magic Link</button>
        <button onClick={testPW}>Test Password Flow</button>
        <button onClick={whoAmI}>Who am I</button>
        <button onClick={ensureProfile}>Ensure Profile</button>
      </div>
      <p>Sonuçlar için DevTools Console & Network'e bak.</p>
    </div>
  );
}
