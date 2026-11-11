import { usePagination } from "../hooks/usePagination";
import type { ResultListProps } from "../interfaces/lookup.props";
import { ResultPager } from "./ResultPager";

const ROWS_PER_PAGE = 6;

export function ResultList({ view }: ResultListProps) {
  const pagination = usePagination(view.rows, ROWS_PER_PAGE);

  return (
    <div className="flex flex-col">
      {view.caption && (
        <p className="m-0 px-5 pb-1 pt-4 text-sm text-muted-foreground">
          {view.caption}
        </p>
      )}
      <ul className="m-0 list-none p-0">
        {pagination.items.map((row, index) => (
          <li
            key={pagination.from + index}
            className={`flex items-center justify-between gap-4 border-t border-border px-5 py-3.5 ${view.caption ? "" : "first:border-t-0"}`}
          >
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="text-base font-semibold">{row.main}</span>
              {row.sub && (
                <span className="text-sm text-muted-foreground">{row.sub}</span>
              )}
            </div>
            {row.right && (
              <span className="flex-none text-right font-display text-[17px] font-semibold">
                {row.right}
              </span>
            )}
          </li>
        ))}
      </ul>
      {view.rows.length === 0 && (
        <p className="m-0 px-5 pb-5 text-sm text-muted-foreground">
          No results for those details.
        </p>
      )}
      <ResultPager pagination={pagination} noun="results" />
    </div>
  );
}
