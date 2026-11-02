import { Suspense } from "react";
import LoginForm from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-[20px] border border-line bg-white p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">DocLink</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink">DocLink CMS</h1>
        <p className="mt-2 mb-8 text-sm text-muted">Sign in with the seeded admin account.</p>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
