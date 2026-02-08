"use client";

import { useEffect } from "react";

/**
 * Returns true if the event target is a focusable form control or editable region.
 * Shortcuts should not fire when the user is typing.
 */
function isTypingElement(target: EventTarget | null): boolean {
  if (!target || !(target instanceof HTMLElement)) return false;
  const tagName = target.tagName.toLowerCase();
  const role = target.getAttribute?.("role") ?? "";
  const editable = target.getAttribute?.("contenteditable") === "true";
  if (editable) return true;
  if (tagName === "input" || tagName === "textarea" || tagName === "select") return true;
  if (role === "textbox" || role === "searchbox") return true;
  return false;
}

/**
 * Global keyboard shortcuts for NoteNest (power-user UX).
 * - / → Focus search input (when available)
 * - N → Focus or trigger create-note action (when available)
 * - Esc → Close overlay / clear focus
 *
 * Shortcuts do not fire when focus is inside input, textarea, select, or contenteditable.
 */
export function useKeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTypingElement(e.target)) return;

      switch (e.key) {
        case "/": {
          e.preventDefault();
          const search = document.querySelector<HTMLElement>('[data-shortcut="search"]');
          if (search) {
            search.focus();
          }
          break;
        }
        case "n":
        case "N": {
          // Don't trigger if Ctrl/Cmd is held (e.g. Ctrl+N is new window)
          if (e.ctrlKey || e.metaKey) return;
          e.preventDefault();
          const createNote = document.querySelector<HTMLElement>('[data-shortcut="create-note"]');
          if (createNote) {
            if (createNote.tagName === "A") {
              createNote.focus();
            } else {
              createNote.focus();
              createNote.click();
            }
          }
          break;
        }
        case "Escape": {
          // Allow other handlers to run first; then blur and dispatch for overlays
          window.dispatchEvent(new CustomEvent("shortcut-esc"));
          (document.activeElement as HTMLElement)?.blur?.();
          break;
        }
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, []);
}
