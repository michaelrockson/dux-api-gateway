import type { ResultPagerProps } from "../interfaces/lookup.props";

const BUTTON =
  "min-h-10 rounded-lg border border-border bg-card px-3.5 text-sm font-medium hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-card";

export function ResultPager({ pagination, noun }: ResultPagerProps) {
  const { page, pageCount, from, to, total, setPage } = pagination;
  if (pageCount <= 1) return null;

  return (
    <nav
      aria-label="Pages"
      className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-3"
    >
      <span className="text-sm text-muted-foreground">
        {from}–{to} of {total} {noun}
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={BUTTON}
        >
          Previous
        </button>
        <span className="text-sm text-muted-foreground">
          Page {page} of {pageCount}
        </span>
        <button
          type="button"
          onClick={() => setPage(page + 1)}
          disabled={page === pageCount}
          className={BUTTON}
        >
          Next
        </button>
      </div>
    </nav>
  );
}
