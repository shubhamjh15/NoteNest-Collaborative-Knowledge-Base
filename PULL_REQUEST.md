# Pull Request: Fix "Create Your First Note" Flow with Functional Placeholder Implementation #32

## Summary

This PR fixes the "Create Your First Note" flow end-to-end and implements a **functional placeholder** for note creation on the Notes page: users can create, view, and delete notes with **local state and localStorage persistence** until the backend is available. The landing-page CTA now correctly opens the create-note experience on the Notes page.

## Issue

Closes #32 – Fix "Create Your First Note" Flow with Functional Placeholder Implementation.

**Problem:** The "Create Your First Note" button on the landing page did not lead to a working create flow. The Notes page needed a concrete, usable create experience (modal, validation, success feedback) and a way to open it when coming from the landing CTA.

**Solution:** Implement a full create-note flow on the Notes page (modal with title + optional content, validation, success message, Esc to close) and wire the landing "Create Your First Note" button to `/notes?new=1` so the Notes page opens the create modal automatically. Use localStorage as a placeholder store so created notes persist and the flow is fully functional without the backend.

## Changes

### 1. Landing page → Notes with create modal

- **Landing page:** The "Create Your First Note" button now navigates to **`/notes?new=1`** (with loading state and accessibility attributes).
- **Notes page:** On mount, if the URL has **`?new=1`**, the create-note modal is opened automatically. The query param is then removed via `history.replaceState` so a refresh does not reopen the modal.

Result: Clicking "Create Your First Note" on the home page takes the user to the Notes page with the create modal already open.

### 2. Create Note modal (Notes page)

- **Trigger:** Opened by:
  - Visiting `/notes?new=1` (e.g. from the landing CTA).
  - Clicking the header **Create Note** button.
  - Clicking **Create Your First Note** in the empty state when there are no notes.
- **Form:**
  - **Title** (required), max length 200 characters, with live character count and validation messages.
  - **Content** (optional), multiline textarea.
- **Validation:** Title required; title length ≤ 200; inline error message and `aria-invalid` / `aria-describedby` for accessibility.
- **Submit:** Creates a note (id from `Date.now()`, title, optional content), appends it to local state, saves to localStorage, closes the modal, restores focus to the Create Note button, and shows a **success message** (“Note created”) that auto-dismisses after 2 seconds.
- **Close:** Cancel button, backdrop click, or **Escape** key (via existing `shortcut-esc` listener). Focus is restored to the Create Note button on close. Submit is disabled while creating to avoid double submit.

Modal is implemented as an accessible dialog (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`).

### 3. Functional placeholder: notes in localStorage

- **Storage key:** `notenest-notes`.
- **Shape:** Array of `{ id: number, title: string, content?: string }`.
- **Load:** On Notes page load, notes are read from localStorage (with safe parse and type checks). If none exist, seed data (e.g. two placeholder notes) is used so the page is never empty on first run; these are then persisted on first save.
- **Save:** Whenever the notes array changes (after create or delete), it is written back to localStorage.
- **Create:** New note is added to state (and thus persisted). No API call; this is the placeholder behavior until the backend is connected.
- **Delete:** Delete removes the note from state (and from the view modal if that note is open); persistence is updated via the same effect.

This gives a fully working “create your first note” experience and list management without backend dependency.

### 4. View Note and list behavior

- **List:** Each note shows title and a short content preview (or “No content”); click opens a **View Note** modal with full title and content and a close (X) button. Escape closes the view modal.
- **Delete:** Delete control on each note (and in view modal if present) removes the note from the list and from localStorage.
- **Empty state:** When there are no notes, the empty state shows “Create Your First Note” and opens the same create modal.

### 5. Notes route and loading

- **Route:** `frontend/app/notes/page.tsx` wraps the Notes page in `<Suspense>` with a `<Loading fullPage message="Loading…" />` fallback so the notes view loads without layout shift.

## Files changed

| File | Change |
|------|--------|
| `frontend/app/page.tsx` | "Create Your First Note" button navigates to `/notes?new=1`. |
| `frontend/app/notes/notes.tsx` | Create modal (open from `?new=1`, header, empty state); title/content form with validation; submit → local state + localStorage; success message; Esc/backdrop/cancel to close; focus restore; View Note modal; delete; localStorage load/save and seed data. |
| `frontend/app/notes/page.tsx` | Notes route with Suspense and Loading fallback. |

## Testing

- **Landing → Create flow:** From the landing page, click “Create Your First Note” → should navigate to `/notes` and open the create modal. URL should not keep `?new=1` after open. Refresh should not reopen the modal.
- **Create note:** In the modal, submit with empty title → see “Title is required”. Enter a title (and optionally content), submit → modal closes, “Note created” appears, note appears in the list. Reload page → note still there (localStorage).
- **Esc / Cancel / backdrop:** Escape or Cancel or click outside closes the create modal and returns focus to Create Note.
- **Empty state:** With no notes, “Create Your First Note” opens the same modal; after creating one note, list view shows it and the empty state is gone.
- **View / Delete:** Click a note → view modal. Delete from list or view modal → note removed and list/localStorage updated.
- **Accessibility:** Create modal has dialog role and labels; title field has error and hint linked; focus is restored on close.

## Checklist

- [x] Landing “Create Your First Note” goes to `/notes?new=1` and Notes page opens create modal when `?new=1` is present.
- [x] Create modal: title (required, max 200), optional content, validation, submit, success message, Esc/cancel/backdrop close, focus restore.
- [x] Notes persisted in localStorage (`notenest-notes`); create/delete update list and storage.
- [x] View Note modal and delete from list (and from view modal) work with local state.
- [x] Notes route uses Suspense + Loading for initial load.
- [x] No new linter errors; behavior is consistent and safe (guards for localStorage, escape key, submit state).
