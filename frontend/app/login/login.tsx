"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, AlertCircle, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Please enter a valid email address";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setErrors({});
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (email === "error@example.com") {
        setErrors({ general: "Invalid email or password. Please try again." });
        setIsSubmitting(false);
        return;
      }
      window.location.href = "/dashboard";
    } catch {
      setErrors({ general: "Something went wrong. Please try again later." });
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6"
      style={{
        background: "var(--color-background)",
        backgroundImage: "linear-gradient(135deg, rgba(59, 130, 246, 0.06) 0%, transparent 25%, transparent 75%, rgba(139, 92, 246, 0.06) 100%)",
      }}
    >
      <div className="w-full max-w-[420px]">
        {/* Back to Home */}
        <div className="mb-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-90"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>
        </div>

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="no-underline">
            <h1
              className="font-bold text-2xl sm:text-3xl m-0 transition-colors"
              style={{
                background: "linear-gradient(135deg, var(--color-info) 0%, #8b5cf6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              NoteNest
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
              Collaborative Knowledge Base for Teams
            </p>
          </Link>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl border p-6 sm:p-8"
          style={{
            background: "var(--color-background)",
            borderColor: "var(--color-border-light)",
            boxShadow: "0 4px 24px -4px rgba(0,0,0,0.08), 0 1px 3px 0 rgba(0,0,0,0.04)",
          }}
        >
          <h2 className="text-xl font-semibold text-center m-0 mb-1" style={{ color: "var(--color-text-primary)" }}>
            Welcome back
          </h2>
          <p className="text-sm text-center mb-7" style={{ color: "var(--color-text-secondary)" }}>
            Sign in to your account to continue
          </p>

          {errors.general && (
            <div
              className="flex items-center gap-2.5 rounded-xl border p-3.5 text-sm mb-5"
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.08)",
                borderColor: "var(--color-error)",
                color: "var(--color-error)",
              }}
            >
              <AlertCircle style={{ width: 18, height: 18, flexShrink: 0 }} />
              <span>{errors.general}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: "var(--color-text-primary)" }}>
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 shrink-0" style={{ color: "var(--color-text-muted)" }} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors({ ...errors, email: undefined }); }}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border pl-10 pr-4 py-3 text-sm outline-none box-border transition-colors focus:ring-2 focus:ring-offset-1 focus:ring-[var(--color-info)]"
                  style={{
                    borderColor: errors.email ? "var(--color-error)" : "var(--color-border-light)",
                    backgroundColor: "var(--color-background)",
                    color: "var(--color-text-primary)",
                  }}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="flex items-center gap-1.5 mt-1.5 text-xs" style={{ color: "var(--color-error)" }}>
                  <AlertCircle style={{ width: 14, height: 14 }} />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs font-medium hover:opacity-90" style={{ color: "var(--color-info)" }}>
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 shrink-0" style={{ color: "var(--color-text-muted)" }} />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors({ ...errors, password: undefined }); }}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border pl-10 pr-4 py-3 text-sm outline-none box-border transition-colors focus:ring-2 focus:ring-offset-1 focus:ring-[var(--color-info)]"
                  style={{
                    borderColor: errors.password ? "var(--color-error)" : "var(--color-border-light)",
                    backgroundColor: "var(--color-background)",
                    color: "var(--color-text-primary)",
                  }}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
              </div>
              {errors.password && (
                <p id="password-error" className="flex items-center gap-1.5 mt-1.5 text-xs" style={{ color: "var(--color-error)" }}>
                  <AlertCircle style={{ width: 14, height: 14 }} />
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl py-3 px-4 text-sm font-medium border-0 flex items-center justify-center gap-2 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-info)] disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                background: "linear-gradient(135deg, var(--color-info) 0%, #8b5cf6 100%)",
                color: "white",
              }}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <><Loader2 style={{ width: 16, height: 16, animation: "spin 1s linear infinite" }} />Signing in...</>
              ) : (
                <>Sign in<ArrowRight style={{ width: 16, height: 16 }} /></>
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t" style={{ borderColor: "var(--color-border-light)" }} /></div>
            <div className="relative flex justify-center text-xs"><span className="px-3" style={{ backgroundColor: "var(--color-background)", color: "var(--color-text-muted)" }}>or continue with</span></div>
          </div>

          <button
            type="button"
            className="w-full rounded-xl border py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-info)]"
            style={{
              borderColor: "var(--color-border-light)",
              color: "var(--color-text-primary)",
              backgroundColor: "var(--color-background)",
            }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
        </div>

        <p className="mt-6 text-center text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium hover:opacity-90 no-underline" style={{ color: "var(--color-info)" }}>Sign up</Link>
        </p>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
