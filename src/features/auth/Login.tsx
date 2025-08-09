// örn. src/features/auth/Login.tsx
import { useState } from "react";
import { loginWithEmail } from "./api";

export default function Login() {
  const [email, setEmail] = useState("");
  const send = async () => {
    await loginWithEmail(email);
    alert("Magic link mailine geldi ✉️");
  };
  return (
    <div>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@mail.com" />
      <button onClick={send}>Giriş linki gönder</button>
    </div>
  );
}
