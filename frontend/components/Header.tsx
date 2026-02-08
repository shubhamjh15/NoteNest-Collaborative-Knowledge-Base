"use client";

interface HeaderProps {
  title?: string;
  /** When true, shows a search input that can be focused with / shortcut */
  showSearch?: boolean;
}

export default function Header({ title = "Dashboard", showSearch = false }: HeaderProps) {
  return (
    <header
      className="flex items-center gap-4 border-b p-4"
      style={{
        background: "var(--color-background)",
        borderColor: "var(--color-border-light)",
      }}
    >
      <h1
        className="text-lg font-semibold shrink-0"
        style={{ color: "var(--color-text-primary)" }}
      >
        {title}
      </h1>
      {showSearch && (
        <input
          type="search"
          data-shortcut="search"
          placeholder="Search notes…"
          aria-label="Search notes"
          className="max-w-xs w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1"
          style={{
            borderColor: "var(--color-border-light)",
            color: "var(--color-text-primary)",
            background: "var(--color-background)",
            fontSize: "var(--font-size-sm)",
          }}
        />
      )}
    </header>
  );
}
