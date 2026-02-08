"use client";

import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

/**
 * Renders nothing; registers global keyboard shortcuts when mounted.
 * Include once in the app layout so shortcuts work across all pages.
 */
export default function KeyboardShortcuts() {
  useKeyboardShortcuts();
  return null;
}
