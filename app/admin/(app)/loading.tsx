import { Skeleton } from "@/components/admin/ui";

/*
  Shape of the page, not a spinner in the middle of it. Covers every route in
  the group, so navigating between admin pages never shows a blank frame.
*/
export default function AdminLoading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <div className="border-b border-[var(--line)] px-5 py-6 md:px-8">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="mt-3 h-4 w-full max-w-lg" />
      </div>

      <div className="px-5 py-6 md:px-8">
        <Skeleton className="mb-8 h-4 w-56" />
        <Skeleton className="mb-3 h-5 w-44" />
        <div className="border-t border-[var(--line)]">
          {[72, 88, 64, 80, 68].map((width, index) => (
            <div
              key={index}
              className="flex items-center gap-3 border-b border-[var(--line)] py-4"
            >
              <Skeleton className="h-4 w-4 shrink-0" />
              <Skeleton className="h-4" style={{ width: `${width}%` }} />
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}
