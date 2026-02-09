import { Suspense } from "react";
import NotesPage from "./notes";
import Loading from "@/components/Loading";

export default function NotesRoute() {
  return (
    <Suspense fallback={<Loading fullPage message="Loading…" />}>
      <NotesPage />
    </Suspense>
  );
}
