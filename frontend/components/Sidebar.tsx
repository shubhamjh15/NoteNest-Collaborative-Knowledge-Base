"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const linkBase =
    "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200";
  const linkActive = {
    background: "rgba(59, 130, 246, 0.1)",
    color: "var(--color-info)",
  };
  const linkInactive = {
    color: "var(--color-text-secondary)",
  };

  return (
    <aside
      className="w-60 min-h-screen flex flex-col border-r shrink-0"
      style={{
        background: "var(--color-background)",
        borderColor: "var(--color-border-light)",
      }}
    >
      <div className="p-5 border-b" style={{ borderColor: "var(--color-border-light)" }}>
        <Link
          href="/"
          className="font-bold text-xl tracking-tight hover:opacity-90 transition-opacity"
          style={{ color: "var(--color-text-primary)" }}
          title="Back to home"
        >
          NoteNest
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        <Link
          href="/"
          className={`${linkBase} flex items-center gap-2`}
          style={pathname === "/" ? linkActive : linkInactive}
        >
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Home
        </Link>
        <Link
          href="/dashboard"
          className={linkBase}
          style={pathname === "/dashboard" ? linkActive : linkInactive}
        >
          Dashboard
        </Link>
        <Link
          href="/notes"
          className={linkBase}
          style={pathname === "/notes" ? linkActive : linkInactive}
        >
          Notes
        </Link>
      </nav>
      <div
        className="p-4 border-t flex items-center justify-center"
        style={{ borderColor: "var(--color-border-light)" }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
          style={{
            background: "var(--color-info)",
            color: "white",
          }}
          aria-hidden
        >
          N
        </div>
      </div>
    </aside>
  );
}
