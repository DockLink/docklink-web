"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { SUPABASE_NOT_CONFIGURED } from "@/lib/supabase/env";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const supabase = createBrowserSupabaseClient();
    if (!supabase) {
      setError(SUPABASE_NOT_CONFIGURED);
      return;
    }

    setPending(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setPending(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    const next = searchParams.get("next");
    router.push(next?.startsWith("/admin") ? next : "/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <Input
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
